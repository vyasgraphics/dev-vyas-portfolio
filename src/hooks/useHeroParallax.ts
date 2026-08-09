"use client";

import { useEffect } from "react";

/**
 * Scroll parallax for the Hero, giving it a "planes at different depths"
 * feel WITHOUT ever double-transforming an element the entrance animations
 * already own.
 *
 * Critical safety rule this hook obeys:
 *   useIsakAnimations() already applies its own transform to the intro title
 *   spans, the counter, the circular badge (.text-rotate), and the scribble
 *   draw. Parallaxing any of those would fight that transform and corrupt
 *   both. So this hook ONLY moves:
 *     - a dedicated background depth layer (.hero-depth, rendered behind the
 *       content by HeroDepth.tsx) -> the FAR plane, drifts most
 *     - elements explicitly tagged data-parallax="<speed>" that the entrance
 *       hook does NOT touch
 *   The hero text/counter/badge are left completely alone -> the NEAR plane,
 *   effectively still.
 *
 * Reads scroll from the shared window.__lenis instance (same one exposed by
 * SmoothScroll's LenisExposer) so movement is perfectly in step with the
 * smooth scroll; falls back to window.scrollY if Lenis isn't ready yet.
 *
 * Guards, matching site conventions:
 *   - desktop only (>= 992px); mobile hero is top-down flow and stays flat
 *   - prefers-reduced-motion: reduce -> does nothing
 *   - translate3d only; single rAF loop; cancels cleanly on unmount
 */

type LenisLike = { scroll?: number; animatedScroll?: number };

function getScroll(): number {
    const w = window as unknown as { __lenis?: LenisLike };
    const l = w.__lenis;
    if (l) {
        // lenis exposes `animatedScroll` (current eased position) and `scroll`.
        if (typeof l.animatedScroll === "number") return l.animatedScroll;
        if (typeof l.scroll === "number") return l.scroll;
    }
    return window.scrollY || 0;
}

export function useHeroParallax() {
    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 992px)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!desktop || reduced) return;

        const depth = Array.from(document.querySelectorAll<HTMLElement>(".hero-depth [data-depth]"));
        const items = Array.from(document.querySelectorAll<HTMLElement>("#home [data-parallax]"));
        if (!depth.length && !items.length) return;

        let raf = 0;
        let running = true;

        const apply = () => {
            const y = getScroll();

            // Far plane: multiple orbs each with their own depth factor.
            for (const el of depth) {
                const factor = parseFloat(el.dataset.depth || "0");
                el.style.transform = `translate3d(0, ${(y * factor).toFixed(1)}px, 0)`;
            }
            // Tagged near-ish items (only ones the entrance hook doesn't move).
            for (const el of items) {
                const speed = parseFloat(el.dataset.parallax || "0");
                el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
            }
        };

        // Drive off a rAF loop rather than the scroll event, so it stays
        // smooth even while Lenis is easing between positions.
        const loop = () => {
            if (!running) return;
            apply();
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            depth.forEach((el) => (el.style.transform = ""));
            items.forEach((el) => (el.style.transform = ""));
        };
    }, []);
}
