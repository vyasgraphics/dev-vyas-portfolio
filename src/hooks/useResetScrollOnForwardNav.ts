"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { smoothScrollToTop } from "@/lib/smoothScroll";

/**
 * Fixes a sibling bug to the one useCrossRouteBackNav documents at length:
 * that one is about the browser's *back* button; this is about clicking a
 * perfectly ordinary forward link (e.g. a "View project" card on the
 * homepage) into a brand new route.
 *
 * Next's own <Link> already resets scroll on navigation by default (that's
 * what the scroll={false} escape hatch is *for* - it only makes sense to
 * suppress a reset that would otherwise happen). But Lenis is mounted once
 * at the root layout and stays alive across the route swap underneath it -
 * it never unmounts, so it never re-initialises. Next's reset calls the
 * raw browser scrollTo, which Lenis has no visibility into; on Lenis's very
 * next animation frame it reasserts whatever scroll position it still
 * privately remembers from the PAGE YOU JUST LEFT, silently snapping the
 * brand new page back down to roughly the old scroll depth. A work or blog
 * card clicked from deep in the homepage would land on whatever section of
 * the new page happened to sit at that same pixel offset - "Who It's For"
 * a few hundred px in for one page, something else entirely for another -
 * never actually broken in an obvious way, just landing somewhere that
 * looked plausible enough to not immediately register as wrong.
 *
 * Fix: explicitly tell Lenis to go to 0 through smoothScrollToTop (which
 * talks to Lenis directly, the same fix already used for the back-button
 * case) whenever the pathname changes via ordinary forward navigation.
 * Steps aside for two cases that already own the landing position
 * themselves: an in-flight back/forward restoration (useCrossRouteBackNav),
 * and a URL that arrived with a hash to land on (useUrlHashSync, homepage
 * only) - overwriting either of those with a hard reset-to-top would just
 * trade one wrong landing spot for another.
 */
export function useResetScrollOnForwardNav() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip the very first mount (initial page load) - that's a fresh
        // navigation from outside the app entirely (typed URL, refresh,
        // external link), not a route change Lenis could have stale state
        // for, and it may legitimately be arriving at a hash to land on.
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const w = window as unknown as { __crossRouteBackNavUntil?: number };
        if (w.__crossRouteBackNavUntil && Date.now() < w.__crossRouteBackNavUntil) return;
        if (window.location.hash) return;

        smoothScrollToTop({ immediate: true });
    }, [pathname]);
}
