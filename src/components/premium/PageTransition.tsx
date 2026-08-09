"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Seamless page-transition curtain between routes (home <-> /work/* <->
 * /blog/*). On each pathname change it plays a brief, GPU-composited wipe
 * that covers the hand-off, then lifts to reveal the new route.
 *
 * Why this is safe alongside the existing scroll machinery:
 *  - It is purely a visual overlay (a single fixed layer). It never scrolls,
 *    never calls Lenis, and never reads/writes the __suppressHashSyncUntil
 *    or lastActiveSection state that BackLink / useUrlHashSync own. It sits
 *    completely beside the restoration logic rather than inside it.
 *  - It keys off `usePathname()` only, so a same-page hash change (#work,
 *    #blog nav on the homepage) does NOT trigger a curtain - exactly the
 *    behaviour we want, since those are smooth in-page scrolls, not route
 *    swaps.
 *  - prefers-reduced-motion: reduce -> the curtain is disabled entirely and
 *    this renders nothing, so no motion and no covering layer.
 *  - pointer-events:none throughout, so it can never intercept a click even
 *    for the frame it's fading out.
 */

const COVER_MS = 420; // curtain sweeps in
const HOLD_MS = 80; // brief hold at full cover while the route paints
const REVEAL_MS = 520; // curtain lifts away

export function PageTransition() {
    const pathname = usePathname();
    const firstRender = useRef(true);
    const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        // Decide once whether the effect runs at all.
        setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    useEffect(() => {
        // Skip the very first mount - we don't want a curtain on initial
        // page load, only on subsequent client navigations.
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (!enabled) return;

        setPhase("cover");
        const t1 = setTimeout(() => setPhase("reveal"), COVER_MS + HOLD_MS);
        const t2 = setTimeout(() => setPhase("idle"), COVER_MS + HOLD_MS + REVEAL_MS);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [pathname, enabled]);

    if (!enabled || phase === "idle") return null;

    return (
        <div aria-hidden="true" className={`pt-curtain pt-${phase}`}>
            <span className="pt-mark">DV</span>
        </div>
    );
}
