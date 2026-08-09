"use client";

import { useEffect } from "react";

/**
 * Additive micro-interaction: gives existing call-to-action controls a
 * fluid, physics-based magnetic pull toward the cursor, then a spring back
 * to rest on leave. This is a ZERO-MARKUP enhancer - it mounts once, finds
 * the site's existing CTA elements by their current class names, and wires
 * pointer handlers directly. Nothing in the existing components/CSS needs
 * to change, and if this component is removed the CTAs simply behave as
 * they always did.
 *
 * Guardrails, matching the site's established conventions:
 *  - Runs ONLY on genuine pointer devices ((hover:hover) and (pointer:fine)).
 *    Touch devices already have the site-wide :active tap feedback and must
 *    never receive cursor-tracking transforms, so this bails immediately
 *    there - the same (hover:hover) boundary used everywhere else.
 *  - Respects prefers-reduced-motion: reduce - no magnetic motion at all.
 *  - Uses translate3d only (GPU-composited, no layout thrash), and never
 *    touches display/justify/align, so it can't collide with the documented
 *    `button { display:inline-flex }` centring gotcha.
 *  - Re-scans on route changes via a MutationObserver on <body>, so CTAs on
 *    client-navigated /work/* pages get enhanced too.
 */

const SELECTOR = [
    ".tf-btn-action", // "View project" CTA in Work cards
    ".work-arrow-link", // arrow overlay on work images
    ".back-link-btn", // "Back to Work/Blog" on detail pages
    "[data-magnetic]", // explicit opt-in for anything else
].join(",");

const STRENGTH = 0.35; // fraction of cursor offset the element travels
const MAX_SHIFT = 14; // px cap so large hit-areas don't slide too far

type Enhanced = HTMLElement & { __magneticCleanup?: () => void };

function enhance(el: Enhanced) {
    if (el.__magneticCleanup) return; // already wired

    let raf = 0;
    // Ensure a transition for the spring-back; the site's global
    // `transition: all 0.3s ease` already covers most of these, but set an
    // explicit transform transition so the release always eases cleanly.
    const prevTransition = el.style.transition;

    const move = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        const x = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, relX * STRENGTH));
        const y = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, relY * STRENGTH));
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            // No transition while actively tracking, so it feels 1:1 and
            // physical rather than laggy.
            el.style.transition = "transform 0s";
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    };

    const reset = () => {
        cancelAnimationFrame(raf);
        // Spring back with a soft, slightly overshooting ease.
        el.style.transition = "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)";
        el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointercancel", reset);

    el.__magneticCleanup = () => {
        cancelAnimationFrame(raf);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
        el.removeEventListener("pointercancel", reset);
        el.style.transition = prevTransition;
        el.style.transform = "";
        delete el.__magneticCleanup;
    };
}

export function MagneticButtons() {
    useEffect(() => {
        const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!pointerFine || reduced) return;

        const scan = () => {
            document.querySelectorAll<Enhanced>(SELECTOR).forEach(enhance);
        };
        scan();

        // Re-scan when the DOM changes (client-side route swaps, late-mounted
        // CTAs). Debounced to a single rAF so a burst of mutations costs one
        // pass, and only ever adds handlers to not-yet-enhanced elements.
        let pending = 0;
        const mo = new MutationObserver(() => {
            cancelAnimationFrame(pending);
            pending = requestAnimationFrame(scan);
        });
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            cancelAnimationFrame(pending);
            mo.disconnect();
            document.querySelectorAll<Enhanced>(SELECTOR).forEach((el) => el.__magneticCleanup?.());
        };
    }, []);

    return null;
}
