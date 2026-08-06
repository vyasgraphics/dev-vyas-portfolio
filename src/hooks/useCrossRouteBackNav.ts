"use client";

import { useEffect } from "react";
import { smoothScrollTo, smoothScrollToTop, suppressPassiveHashSync, cleanHash, resolveScrollTarget } from "@/lib/smoothScroll";

/**
 * Fixes a real, confirmed bug: pressing the browser's back button after
 * visiting a work/blog detail page landed on the homepage TOP instead of
 * back at the section you were viewing (e.g. Work).
 *
 * Root cause #1: the previous implementation's back/forward handling lived
 * inside HomeShell, which only exists on the "/" route - so the moment you
 * navigate to /work/dissertation, that listener is torn down entirely
 * along with the rest of the homepage. Pressing back then races against
 * whether Next.js remounts the homepage fully or restores it from its own
 * router cache, and against the browser's own native scroll-restoration,
 * which doesn't coordinate with Lenis's virtualised scroll at all. Any of
 * these three could "win" and leave you at the top.
 *
 * Root cause #2 (the one that made the fix for #1 still not work): this
 * hook was positioning the page with the browser's raw window.scrollTo /
 * element.scrollIntoView. The site runs Lenis for smooth scrolling, which
 * maintains its OWN internal notion of the current scroll position and
 * pushes it to the page on every one of its own render frames. A scroll
 * performed through the raw browser APIs is invisible to Lenis - so on the
 * very next frame after we jump to the target section, Lenis's render loop
 * reasserts whatever position IT still thinks is current and silently
 * snaps the page straight back. Routing through smoothScrollTo (which
 * talks to Lenis directly) keeps Lenis's internal state in sync with the
 * jump, so it has no stale position to snap back to.
 *
 * Fix: a SINGLE handler mounted once at the root layout, so it's alive for
 * the entire session regardless of route, disables the browser's own
 * scroll-restoration (avoiding it fighting Lenis), and - since Next may not
 * have finished swapping the route back to the homepage the instant
 * popstate fires - retries briefly until the target section actually
 * exists in the DOM before positioning to it.
 *
 * Root cause #3 (found after users kept reporting this even with #1 and #2
 * fixed): two separate mechanisms were both trying to restore position on
 * the exact same back-navigation - this hook's popstate handler, AND
 * useUrlHashSync's pathname-change effect (which exists for a genuinely
 * different case: landing on "/" via a fresh Link/deep-link, where no
 * popstate happens at all). On an actual back-navigation, pathname also
 * changes back to "/", so both fired at once, independently reading and
 * consuming the same sessionStorage key - an unnecessary race between two
 * uncoordinated retry loops. A short-lived flag on window (set here,
 * checked and cleared in useUrlHashSync) lets that hook step aside for the
 * specific window where this one is already handling it.
 *
 * Root cause #4 (a third mechanism, this one always running): useUrlHashSync
 * also runs a *passive* scroll-sync effect that continuously watches scroll
 * position to keep the URL quietly in sync during organic scrolling. It has
 * no notion of "a deliberate restoration is currently under way" - so while
 * this hook's retry loop is still travelling toward its target, the passive
 * tracker can independently compute whatever section happens to be under
 * the fold at that transient instant (often still Home) and overwrite the
 * URL/sessionStorage with it, undoing the correct destination this hook had
 * just set. suppressPassiveHashSync (see smoothScroll.ts) pauses that
 * tracker for the duration of the restoration so it can't race this hook -
 * the same mechanism that also fixes ordinary nav clicks and "Back to
 * Work/Writing" links intermittently landing on #home.
 */
const BACK_NAV_FLAG_MS = 2000;

export function useCrossRouteBackNav() {
    useEffect(() => {
        if (typeof window === "undefined" || !("history" in window)) return;

        const previousRestoration = history.scrollRestoration;
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }

        const settleTimers: Array<ReturnType<typeof setTimeout>> = [];

        const positionTo = (hash: string, preferredTarget: string) => {
            if (!hash || hash === "#") {
                smoothScrollToTop({ immediate: true });
                return true;
            }
            const target = document.querySelector(preferredTarget) || document.querySelector(hash);
            if (target) {
                // Written explicitly rather than trusting whatever the
                // browser already has for this history entry - see
                // useUrlHashSync for why (an occasional malformed
                // concatenated hash from Next's own Link handling).
                history.replaceState(null, "", hash);
                smoothScrollTo(target as HTMLElement, { immediate: true });
                return true;
            }
            return false;
        };

        const restoreToHash = (hash: string, preferredTarget: string, attemptsLeft = 30) => {
            if (positionTo(hash, preferredTarget)) {
                // The immediate scroll call now has a double-rAF gap inside
                // it (to let Lenis recalculate page dimensions after the
                // route swap). Two follow-up corrections at 500ms and 1000ms
                // act as a belt-and-suspenders safety net in case anything
                // nudges the position again after that - e.g. a late image
                // load shifting layout, or Next's own internal scroll reset.
                settleTimers.push(setTimeout(() => positionTo(hash, preferredTarget), 500));
                settleTimers.push(setTimeout(() => positionTo(hash, preferredTarget), 1000));
                return;
            }
            if (attemptsLeft > 0) {
                settleTimers.push(setTimeout(() => restoreToHash(hash, preferredTarget, attemptsLeft - 1), 50));
            }
        };

        const onPopState = () => {
            // Clear any pending settle-correction from a previous
            // back-navigation - if the user backs/forwards again quickly,
            // an old timer firing after the new restoration would
            // incorrectly snap the page back to the previous target.
            settleTimers.forEach(clearTimeout);
            settleTimers.length = 0;

            // Same reasoning as BackLink: cover the whole restoration
            // window (route swap + retry loop + eventual scroll) up front,
            // not just once restoreToHash's own smoothScrollTo call fires.
            suppressPassiveHashSync(2500);

            // sessionStorage is written exclusively by our own code (see
            // useUrlHashSync and smoothScrollTo) and is never touched by
            // Next.js's router or any other browser mechanism, so it can't
            // be corrupted by a routing side effect the way the URL hash
            // was - prefer it, and only fall back to the hash if it's
            // genuinely unset (e.g. the very first back-navigation of a
            // fresh session, before any section has been recorded yet).
            const stored = sessionStorage.getItem("lastActiveSection");
            const hash = cleanHash(stored || window.location.hash);

            // Resolved once, up front - if a specific card was clicked
            // into (see Work.tsx/Blog.tsx), land back on that card. Doing
            // this once here (rather than inside positionTo, which runs
            // repeatedly across retries and the settle-correction) matters
            // because resolveScrollTarget consumes the stored slug on
            // read - resolving it fresh on every call would lose it after
            // the first successful positioning, and the settle-correction
            // would then fall back to just the section top.
            const preferredTarget = resolveScrollTarget(hash);

            // See "Root cause #3" above - claim this navigation so
            // useUrlHashSync's own pathname-change effect steps aside
            // rather than racing this one. Cleared automatically after a
            // couple of seconds as a safety net, in case something here
            // throws or a future edit removes the explicit clear.
            const w = window as unknown as { __crossRouteBackNavUntil?: number };
            w.__crossRouteBackNavUntil = Date.now() + BACK_NAV_FLAG_MS;

            restoreToHash(hash, preferredTarget);
        };
        window.addEventListener("popstate", onPopState);

        return () => {
            window.removeEventListener("popstate", onPopState);
            settleTimers.forEach(clearTimeout);
            if ("scrollRestoration" in history) {
                history.scrollRestoration = previousRestoration;
            }
        };
    }, []);
}
