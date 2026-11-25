"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Staggered reveals for grids and lists - items enter in sequence rather
// than all at once. Deliberately lives OUTSIDE useScrollAnimations.ts.
// (A parallax on the old Work card imagery used to live here too; it went
// with those cards on 25 Nov 2026, when Work became the WorkStack tilt
// stack, which has its own motion.)
//
// Kept separate because useScrollAnimations.ts carries several pieces of
// behaviour that are load-bearing and were expensive to get right (the
// sticky offset handling, the restoration guards). Editing that file to add
// unrelated decoration is how those regress. This hook only ever adds
// its own triggers and cleans up exactly what it created.
//
// Everything here is scrub-tied rather than fire-once, so all of it is
// inherently reversible: scrolling back up plays the reveal backwards
// instead of leaving elements stranded in their finished state.

// Grids and lists that benefit from sequential entry. The Work cards' tag
// lists are deliberately not here: each card already arrives with its own
// scroll-linked tilt (WorkStack.tsx), and a second staggered motion on top
// would read as two competing animations rather than one.
const STAGGER_GROUPS: { container: string; items: string }[] = [
    { container: ".award-list", items: ".award-item" },
    { container: ".tech-categories", items: ".tech-tool-pill" },
    // The organisations credibility band sits immediately below the hero,
    // so it is the first grid a visitor meets. Its container already had
    // .scrolling-effect, which faded the whole band as one block - the
    // pills now arrive left to right instead, matching the rhythm the
    // award and tech grids already have.
    { container: ".org-pill-row", items: ".org-pill" },
];

export function useStaggerReveal() {
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        const triggers: ScrollTrigger[] = [];
        const tweens: gsap.core.Tween[] = [];
        const touched: HTMLElement[] = [];

        /* ---------------- Staggered list/grid reveal ---------------- */
        STAGGER_GROUPS.forEach(({ container, items }) => {
            document.querySelectorAll<HTMLElement>(container).forEach((group) => {
                const els = Array.from(group.querySelectorAll<HTMLElement>(items));
                if (!els.length) return;
                touched.push(...els);

                const tween = gsap.fromTo(
                    els,
                    { opacity: 0, y: 28 },
                    {
                        opacity: 1,
                        y: 0,
                        ease: "power2.out",
                        duration: 0.6,
                        // 0.08s between items: enough to read as a
                        // sequence, short enough that a 10-item grid
                        // finishes well inside the scroll distance rather
                        // than trailing behind the user.
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: group,
                            start: "top 85%",
                            end: "top 45%",
                            scrub: 1,
                        },
                    }
                );
                tweens.push(tween);
                if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
            });
        });

        return () => {
            tweens.forEach((t) => t.kill());
            triggers.forEach((t) => t.kill());
            // Clear only what this hook set, so nothing is left in a
            // half-animated state if the component unmounts mid-scroll.
            touched.forEach((el) => {
                gsap.set(el, { clearProps: "opacity,transform" });
            });
        };
    }, []);
}
