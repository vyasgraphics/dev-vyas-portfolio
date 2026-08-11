"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// A "materialize" transition as each homepage section scrolls into view -
// blur and contrast settle to normal as the section reaches its resting
// position, inspired by a CSS scroll-driven-animation reference the
// person shared (a `blink` keyframe using `filter: blur() contrast()`
// driven by `animation-timeline`).
//
// Deliberately NOT the literal technique from that reference, for two
// concrete reasons rather than a vague "too risky":
//
// 1. The reference itself needs a JS polyfill for Firefox ("Scrolling
//    animations are not currently available in Firefox. This demo is
//    using a polyfill.") - real, current browser-support gap on a site
//    meant to work for any recruiter, on any browser, first try.
// 2. The reference's layout technique sets each section's content to
//    `position: fixed`, stacking every section's content on top of each
//    other in the same screen space. This site's Work section already
//    depends on `position: fixed` for its own card-swap (`.wg-work
//    .wrap`, pinned via the sticky mechanic in useScrollAnimations.ts) -
//    and CSS `filter` on any ancestor of a `position: fixed` element
//    changes what that element is positioned relative to. Wrapping Work
//    in this technique would silently break that mechanic. So this
//    effect is scoped to explicitly exclude #work below - the one
//    section it must never touch.
//
// Uses this site's existing GSAP + ScrollTrigger (already registered by
// useScrollAnimations.ts - this hook must run after that one in
// HomeShell so the plugin is guaranteed registered first) rather than
// CSS animation-timeline, so there's no new browser-support surface at
// all - if GSAP already works on the rest of this site, this works too.
// #home (the hero) is deliberately excluded - it now has its own
// dedicated, more elaborate load sequence (see useHeroLoadSequence.ts),
// so this generic blur/contrast treatment would be redundant there and
// risks visually competing with the more purpose-built entrance.
const MATERIALIZE_SELECTOR = "#organisations, #about, #education, #tech, #contact";

export function useSectionMaterialize() {
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        const sections = document.querySelectorAll<HTMLElement>(MATERIALIZE_SELECTOR);
        if (!sections.length) return;

        const triggers: ScrollTrigger[] = [];

        sections.forEach((section) => {
            gsap.set(section, { filter: "blur(6px) contrast(2.1)", opacity: 0.45 });

            const trigger = ScrollTrigger.create({
                trigger: section,
                start: "top 88%",
                end: "top 48%",
                scrub: 0.5,
                onUpdate: (self) => {
                    const p = self.progress;
                    gsap.set(section, {
                        filter: `blur(${6 * (1 - p)}px) contrast(${1 + 1.1 * (1 - p)})`,
                        opacity: 0.45 + 0.55 * p,
                    });
                },
                onLeaveBack: () => {
                    // Scrolling back up above the trigger resets to the
                    // blurred starting state, so scrolling back down
                    // re-plays the materialize rather than snapping
                    // straight to fully sharp.
                    gsap.set(section, { filter: "blur(6px) contrast(2.1)", opacity: 0.45 });
                },
            });
            triggers.push(trigger);
        });

        return () => {
            triggers.forEach((t) => t.kill());
            sections.forEach((section) => {
                gsap.set(section, { filter: "none", opacity: 1 });
            });
        };
    }, []);
}
