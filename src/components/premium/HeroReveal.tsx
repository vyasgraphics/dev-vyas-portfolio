"use client";

import { useEffect } from "react";

/**
 * Applies the animated sheen to the intro headline's accent word without
 * editing Intro.tsx's markup or fighting the existing GSAP entrance.
 *
 * The accent word is <span class="type-2 is-bg" style="color:var(--primary)">.
 * The existing effectFade / SplitText tweens in useIsakAnimations act on the
 * headline's own opacity/transform - they do NOT set background-clip or
 * -webkit-text-fill-color, so adding a class that drives those here can't
 * collide with them. We simply add the `hero-shimmer` class after mount so
 * the sheen begins once the intro has settled.
 *
 * Guarded for reduced-motion (the CSS also guards, but skipping the class add
 * avoids even the initial paint), and it clears the inline `color` the markup
 * sets so the gradient text-fill isn't overridden by it.
 */
export function HeroReveal() {
    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        const accent = document.querySelector<HTMLElement>(".intro-title .type-2.is-bg");
        if (!accent) return;

        // Let the intro's entrance animation land first, then light it up.
        const t = setTimeout(() => {
            // Inline color would win over the gradient text-fill; drop it so
            // the shimmer shows. The class keeps the same primary hue.
            accent.style.removeProperty("color");
            accent.classList.add("hero-shimmer");
        }, 700);

        return () => {
            clearTimeout(t);
            accent.classList.remove("hero-shimmer");
        };
    }, []);

    return null;
}
