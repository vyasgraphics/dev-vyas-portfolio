"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/nav";
import { smoothScrollTo, suppressPassiveHashSync, cleanHash, resolveScrollTarget } from "@/lib/smoothScroll";

/**
 * Keeps the URL hash in sync with what's actually on screen, matching how
 * well-built one-page sites behave in the real world:
 *
 * - Arriving with a hash already in the URL (a shared or bookmarked link,
 *   or an in-page link like "← Back to Work" pointing at /#work) lands you
 *   on that section, not at the top of the page.
 * - As you scroll, the URL quietly updates to reflect the current section
 *   (via replaceState, so it never floods browser history - nobody wants to
 *   press "back" once per section they scrolled past).
 *
 * Browser back/forward handling lives separately in useCrossRouteBackNav,
 * mounted once at the root layout rather than here - this hook only runs
 * while the homepage is mounted, which isn't reliable for a concern that
 * needs to work even when you're several routes away (e.g. on a work detail
 * page) and then press back.
 */
export function useUrlHashSync() {
    const pathname = usePathname();

    // Hash landing. Keyed on pathname so this re-runs on every navigation
    // TO the homepage - not just the first mount. Returning to "/" can
    // restore the homepage from Next's router cache without remounting
    // this component at all, so a mount-only effect would never fire.
    //
    // sessionStorage (written directly by BackLink and every other nav
    // link's onClick, via smoothScrollTo's pushHistory option) is checked
    // first and is the reliable source here - it's under our own control,
    // unlike window.location.hash, which depends on Next.js's client-side
    // router correctly propagating the hash portion of a Link's href
    // through a cross-route navigation. That dependency proved unreliable
    // in practice, which is exactly why "← Back to Work/Blog" kept landing
    // on the homepage top instead of the right section.
    useEffect(() => {
        if (pathname !== "/") return;

        // useCrossRouteBackNav already owns this exact navigation (an
        // actual browser back/forward via popstate) - see its comments for
        // why running both was an unnecessary race. Only step aside for
        // that specific case; a fresh Link click or a bookmarked/shared
        // "/#work" URL never sets this flag, so this effect still does its
        // normal job for those.
        const w = window as unknown as { __crossRouteBackNavUntil?: number };
        if (w.__crossRouteBackNavUntil && Date.now() < w.__crossRouteBackNavUntil) {
            return;
        }

        const stored = sessionStorage.getItem("lastActiveSection");
        const hash = cleanHash(stored ? `#${stored.replace(/^#/, "")}` : window.location.hash);
        if (!hash || hash === "#") return;
        sessionStorage.removeItem("lastActiveSection");

        // Cover the whole landing sequence up front (retry loop waiting
        // for the target to exist, plus the eventual scroll) - not just
        // once smoothScrollTo below actually runs. See suppressPassiveHashSync.
        suppressPassiveHashSync(2000);

        // For #work, restore to the specific card that was clicked into.
        // For #blog, the same happens but mobile-only (see
        // resolveScrollTarget); other sections always restore to the
        // section top.
        const preferredTarget = resolveScrollTarget(hash);

        let attempts = 0;
        let frame = 0;
        const settleTimers: number[] = [];
        const tryScroll = () => {
            const target = document.querySelector(preferredTarget) || document.querySelector(hash);
            if (target) {
                history.replaceState(null, "", hash);
                smoothScrollTo(target as HTMLElement, { immediate: true });
                settleTimers.push(window.setTimeout(() => {
                    const t2 = document.querySelector(preferredTarget) || document.querySelector(hash);
                    if (t2) smoothScrollTo(t2 as HTMLElement, { immediate: true });
                }, 500));
                settleTimers.push(window.setTimeout(() => {
                    const t3 = document.querySelector(preferredTarget) || document.querySelector(hash);
                    if (t3) smoothScrollTo(t3 as HTMLElement, { immediate: true });
                }, 1000));
                return;
            }
            if (attempts++ < 40) {
                frame = requestAnimationFrame(tryScroll);
            }
        };
        frame = requestAnimationFrame(tryScroll);
        return () => {
            cancelAnimationFrame(frame);
            settleTimers.forEach(window.clearTimeout);
        };
    }, [pathname]);

    useEffect(() => {
        const sections = navItems
            .map((item) => ({
                href: item.href,
                el: document.querySelector(item.href) as HTMLElement | null,
            }))
            .filter((s): s is { href: string; el: HTMLElement } => s.el !== null);

        if (!sections.length) return;

        // Passive sync: as the active section changes during normal
        // scrolling, quietly update the URL without creating history
        // entries or fighting the user's scroll.
        let currentHash = cleanHash(window.location.hash) || "#home";
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;

                // A deliberate, destination-driven scroll is in flight
                // (a nav click, a "Back to Work/Writing" link, or a
                // cross-route restoration) - it already knows exactly
                // where it's going. Computing "current section" from
                // whatever transient position that scroll happens to be
                // passing through right now, and overwriting the URL with
                // it, is exactly what caused those to intermittently land
                // back at #home. See suppressPassiveHashSync.
                const w = window as unknown as { __suppressHashSyncUntil?: number };
                if (w.__suppressHashSyncUntil && Date.now() < w.__suppressHashSyncUntil) return;

                // Guard against writing during an in-flight navigation away
                // from the homepage. A scroll-to-0 can fire as part of a
                // route transition (e.g. Next.js's own default scroll
                // handling when following a Link to a different page) while
                // this listener is still briefly attached - without this
                // check that would get misread as "user scrolled to Home"
                // and overwrite the correct departure hash (e.g. "#work")
                // with "#home" right before the new route takes over, which
                // is exactly what the back button was then restoring to.
                if (window.location.pathname !== "/") return;

                const scrollY = window.scrollY + window.innerHeight / 3;
                let active = "#home";
                for (const { href, el } of sections) {
                    if (el.offsetTop <= scrollY) active = href;
                }
                if (active !== currentHash) {
                    currentHash = active;
                    history.replaceState(null, "", active);
                    sessionStorage.setItem("lastActiveSection", active);
                }
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
}
