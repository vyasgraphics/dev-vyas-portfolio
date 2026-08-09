"use client";

import { useEffect } from "react";

/**
 * Adds a premium hover layer to the existing Work cards WITHOUT touching the
 * scroll-driven sticky animation that already runs on desktop (that logic
 * lives in useIsakAnimations and reads live getBoundingClientRect on every
 * tick - it is explicitly not to be regressed, so this stays entirely out of
 * its way).
 *
 * What it adds, on pointer devices only:
 *  - A soft radial "spotlight" that follows the cursor across the work image,
 *    driven by CSS custom properties (--mx/--my) so the paint work is a
 *    single compositor-friendly gradient, not per-frame DOM mutation.
 *  - A very subtle counter-parallax on the image itself (a few px) for depth.
 *
 * Everything is scoped to .wg-work .work-image and uses only transform +
 * CSS vars. On touch / reduced-motion it does nothing, leaving the existing
 * mobile IntersectionObserver fade untouched.
 */

const MAX_TILT = 6; // px of image counter-shift

type Card = HTMLElement & { __polishCleanup?: () => void };

function polish(card: Card) {
    if (card.__polishCleanup) return;
    const img = card.querySelector<HTMLElement>("img");
    let raf = 0;

    const move = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width; // 0..1
        const py = (e.clientY - rect.top) / rect.height; // 0..1
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            card.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
            card.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
            if (img) {
                const dx = (0.5 - px) * MAX_TILT;
                const dy = (0.5 - py) * MAX_TILT;
                img.style.transform = `scale(1.04) translate3d(${dx}px, ${dy}px, 0)`;
            }
        });
    };

    const enter = () => card.classList.add("is-spotlit");
    const leave = () => {
        cancelAnimationFrame(raf);
        card.classList.remove("is-spotlit");
        if (img) img.style.transform = "";
    };

    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);

    card.__polishCleanup = () => {
        cancelAnimationFrame(raf);
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
        card.classList.remove("is-spotlit");
        if (img) img.style.transform = "";
        delete card.__polishCleanup;
    };
}

export function WorkCardPolish() {
    useEffect(() => {
        const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!pointerFine || reduced) return;

        const scan = () => {
            document.querySelectorAll<Card>(".wg-work .work-image").forEach(polish);
        };
        scan();

        let pending = 0;
        const mo = new MutationObserver(() => {
            cancelAnimationFrame(pending);
            pending = requestAnimationFrame(scan);
        });
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(pending);
            mo.disconnect();
            document.querySelectorAll<Card>(".wg-work .work-image").forEach((c) => c.__polishCleanup?.());
        };
    }, []);

    return null;
}
