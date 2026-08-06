/**
 * Centralised scroll helper. The site runs Lenis for buttery-smooth
 * scrolling on wheel/touch input - but any code that calls the browser's
 * native `element.scrollIntoView()` or `window.scrollTo()` bypasses Lenis
 * entirely, and the two engines end up fighting each other, which shows up
 * as a visible stutter or a scroll that "fights back" when a nav link is
 * clicked mid-animation.
 *
 * Every hash-link / nav click in the app should go through this helper so
 * there is exactly one scroll engine driving the page at all times.
 */

type LenisLike = {
  scrollTo: (
    target: string | number | HTMLElement,
    opts?: Record<string, unknown>
  ) => void;
  resize?: () => void;
};

// Pauses useUrlHashSync's passive "which section is under the fold right
// now" tracker for a window of time. That tracker exists to quietly keep
// the URL in sync during ORGANIC scrolling - but it has no notion of "a
// deliberate navigation to a specific destination is currently in
// flight", so left unchecked it also fires during the transient scroll
// positions any programmatic scroll passes through on its way to the
// target (e.g. still near Home a frame after a click, or mid-animation
// passing through intervening sections), computes whatever section is
// under the fold AT THAT INSTANT, and overwrites the just-set correct
// destination with it - this is what caused nav clicks and "Back to
// Writing/Work" to intermittently land back at #home. Every deliberate
// scroll in this file routes through here so the pause is automatic;
// only extends the deadline, never shortens an already-longer one, so
// overlapping calls (e.g. a click during an in-flight restoration) can't
// cut a longer pause short.
export function suppressPassiveHashSync(ms: number) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __suppressHashSyncUntil?: number };
  w.__suppressHashSyncUntil = Math.max(w.__suppressHashSyncUntil ?? 0, Date.now() + ms);
}

// Defensive sanitizer: extracts a single clean "#word-ish" token from a
// string that might be malformed - e.g. a stray concatenated "#home#blog"
// (seen coming out of Next.js's own Link navigation on certain cross-route
// transitions where the href carries both a pathname change and a hash).
// A value like that isn't just wrong, it's an invalid CSS selector -
// document.querySelector("#home#blog") never matches anything, which is
// what silently stranded restoration attempts at the top of the page.
// Every hash this file reads before using it as a selector goes through
// here first.
export function cleanHash(raw: string | null | undefined): string {
  if (!raw) return "";
  const match = raw.match(/#[A-Za-z0-9_-]+/);
  return match ? match[0] : "";
}

// The specific-item sessionStorage keys written by Work.tsx and Blog.tsx
// when a card is clicked into, and read back here to decide whether a
// restoration should land on a precise card rather than just the section.
const ITEM_STORAGE_KEY: Record<string, string> = {
  "#work": "lastWorkItemSlug",
  "#blog": "lastBlogItemSlug",
};
const ITEM_ID_PREFIX: Record<string, string> = {
  "#work": "work-item-",
  "#blog": "blog-item-",
};

// Upgrades a section-level hash ("#work") to a specific card's selector
// ("#work-item-dissertation") if the person arrived at the detail page by
// clicking that specific card - consumed once per restoration, so a later
// visit to the section via a plain nav click (no specific card involved)
// isn't affected by a stale value.
export function resolveScrollTarget(hash: string): string {
  const key = ITEM_STORAGE_KEY[hash];
  if (!key || typeof window === "undefined") return hash;
  const slug = sessionStorage.getItem(key);
  sessionStorage.removeItem(key);
  if (!slug) return hash;
  return `#${ITEM_ID_PREFIX[hash]}${slug}`;
}

function getLenis(): LenisLike | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { __lenis?: LenisLike };
  return w.__lenis ?? null;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function smoothScrollTo(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number; center?: boolean; pushHistory?: string; immediate?: boolean }
) {
  const el =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;

  // Explicit clicks (as opposed to the passive scroll-driven sync) update
  // the URL immediately via pushState, so the back button returns to
  // wherever the person was before they clicked - matching how a real
  // multi-page site would behave, even though this is a single page.
  if (options?.pushHistory) {
    history.pushState(null, "", options.pushHistory);
    sessionStorage.setItem("lastActiveSection", options.pushHistory);
    // Cover the animated scroll about to run below (default 1.2s) plus a
    // buffer, so the passive tracker doesn't second-guess this destination
    // while still travelling toward it.
    suppressPassiveHashSync((options?.duration ?? 1.2) * 1000 + 500);
  }

  // Centering computes an offset so the element lands in the middle of the
  // viewport rather than flush against the top - used for content that
  // expands in place (e.g. an accordion opening), where "top" would often
  // leave the newly-revealed content mostly or entirely below the fold.
  let offset = options?.offset ?? 0;
  if (options?.center) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    if (rect.height < viewportHeight) {
      offset = -(viewportHeight - rect.height) / 2;
    } else {
      // Content taller than the viewport can't be meaningfully centered -
      // the formula below would produce a large offset trying to anyway.
      // Align to the top with a little breathing room instead.
      offset = -24;
    }
  }

  const lenis = getLenis();
  if (options?.immediate) {
    // Covers the couple of settle frames after any instant/programmatic
    // jump, regardless of whether Lenis is mounted (e.g. on mobile, where
    // it deliberately isn't) - defence in depth alongside the upstream
    // suppression calls in useCrossRouteBackNav/useUrlHashSync, which
    // cover the longer retry-loop window before this point is even reached.
    suppressPassiveHashSync(800);
  }
  if (lenis) {
    if (options?.immediate) {
      // lenis.resize() recalculates scroll dimensions via a ResizeObserver
      // callback, which is inherently asynchronous - calling scrollTo on
      // the very next line fires before the new dimensions are committed,
      // so Lenis still measures the page at the old (short detail page)
      // height and silently clamps the target position near zero.
      // Two rAF frames gives the observer enough time to flush the real
      // full homepage height before the scroll position is set.
      lenis.resize?.();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lenis.scrollTo(el, {
            offset,
            duration: 0,
            immediate: true,
          });
        });
      });
      return;
    }
    lenis.scrollTo(el, {
      offset,
      duration: options?.duration ?? 1.2,
      immediate: options?.immediate ?? false,
    });
  } else {
    // Fallback for the brief window before Lenis mounts, or if it's ever
    // removed (e.g. prefers-reduced-motion, where Lenis is intentionally
    // not mounted at all - so this jumps instantly rather than animating).
    el.scrollIntoView({
      behavior: options?.immediate || prefersReducedMotion() ? "auto" : "smooth",
      block: options?.center ? "center" : "start",
    });
  }
}

export function smoothScrollToTop(options?: { duration?: number; immediate?: boolean }) {
  suppressPassiveHashSync(options?.immediate ? 800 : (options?.duration ?? 1.2) * 1000 + 500);
  const lenis = getLenis();
  if (lenis) {
    if (options?.immediate) {
      lenis.resize?.();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lenis.scrollTo(0, { duration: 0, immediate: true });
        });
      });
      return;
    }
    lenis.scrollTo(0, { duration: options?.duration ?? 1.2, immediate: false });
  } else {
    window.scrollTo({
      top: 0,
      behavior: options?.immediate || prefersReducedMotion() ? "auto" : "smooth",
    });
  }
}