"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Two motion refinements that deliberately live OUTSIDE
// useScrollAnimations.ts rather than inside it:
//
// 1. Staggered reveals for grids and lists - items enter in sequence
//    rather than all at once.
// 2. A subtle parallax on the Work card imagery, for spatial depth.
//
// Kept separate because useScrollAnimations.ts carries several pieces of
// behaviour that are load-bearing and were expensive to get right (the
// Work section's live getBoundingClientRect scroll sync, the sticky
// offset handling, the restoration guards). Editing that file to add
// unrelated decoration is how those regress. This hook only ever adds
// its own triggers and cleans up exactly what it created.
//
// Everything here is scrub-tied rather than fire-once, so all of it is
// inherently reversible: scrolling back up plays the reveal backwards
// instead of leaving elements stranded in their finished state.

// Grids and lists that benefit from sequential entry. Deliberately does
// NOT include .wg-work .w-tag-list - those tags live inside the fixed,
// pinned card whose own swap animation is already driving opacity and
// transform on the way in, so a second staggered motion on top reads as
// two competing animations rather than one.
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

        /* ---------------- Parallax on Work card media ---------------- */
        // Desktop only. Below 992px .work-image is display:none anyway,
        // and parallax on a touch device is where this kind of effect
        // most reliably turns into jank for the least visual payoff.
        //
        // Safe to transform BOTH of these despite the Work section's
        // position:fixed card: .work-image is a SIBLING of .wg-work .wrap
        // (not an ancestor), and .w-image is a DESCENDANT of it. A
        // containing-block change from transform only ever propagates
        // downward, so neither can affect .wrap's own fixed positioning.
        // Transforming .wg-work or .sticky-item would break it - those
        // are ancestors, and are never touched here.
        const isDesktop = window.matchMedia("(min-width: 992px)").matches;
        if (isDesktop) {
            const parallaxTargets: { sel: string; shift: number }[] = [
                // The blurred image sitting behind the card's text is the
                // closest thing this layout has to background media, so it
                // takes the larger shift - depth reads strongest on the
                // layer furthest back.
                { sel: ".wg-work .w-image img", shift: 24 },
                // The foreground project shot moves less, so the two
                // layers separate rather than travelling together.
                { sel: ".wg-work .work-image img", shift: 12 },
            ];

            parallaxTargets.forEach(({ sel, shift }) => {
                document.querySelectorAll<HTMLElement>(sel).forEach((img) => {
                    touched.push(img);
                    // Scale slightly past the frame first, so translating
                    // never exposes an edge inside the overflow:hidden
                    // parent. 1.1 covers a +/-24px shift comfortably at
                    // every card size used here.
                    gsap.set(img, { scale: 1.1, transformOrigin: "center center" });

                    const tween = gsap.fromTo(
                        img,
                        { y: -shift },
                        {
                            y: shift,
                            ease: "none",
                            scrollTrigger: {
                                trigger: img.closest(".sticky-item") ?? img,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 1,
                            },
                        }
                    );
                    tweens.push(tween);
                    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
                });
            });
        }

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
