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
//    other in the same screen space - a full layout rewrite of every
//    section for a transition effect.
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

// Work gets the same materialize feel piece by piece rather than on #work as
// a whole: #work is several screens tall (the tilt stack in WorkStack.tsx),
// so a single section-wide trigger would only fire once for all of it. The
// header (.sect-tag, .s-title, .s-desc) and the 01/03 counter
// (.vg-stack-head) each settle as they arrive. The counter
// was missed at first and stayed sharp while the heading above it was still
// blurred. Safe to filter: nothing inside the stack is position:fixed, and
// the filter is cleared once each piece has settled.
//
// The card deck itself is NOT in the list any more. Its first card already
// has its own scroll-linked entrance (tilt, rise and fade in WorkStack.tsx),
// and scrubbing a blur over three 3D-transformed image cards during that same
// entrance meant re-rendering the whole deck every frame: a visible stutter
// coming into and backing out of the section.

export function useSectionMaterialize() {
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        const sections = document.querySelectorAll<HTMLElement>(MATERIALIZE_SELECTOR);

        // Work header and counter, on desktop and mobile alike
        // (see the note above MATERIALIZE_SELECTOR).
        const workHeader = Array.from(
            document.querySelectorAll<HTMLElement>(
                "#work .sect-tag, #work .s-title, #work .s-desc, #work .vg-stack-head"
            )
        );
        if (!sections.length && !workHeader.length) return;

        const triggers: ScrollTrigger[] = [];

        // Phones and tablets get the opacity half of the effect only. These
        // targets are tall (#about alone is ~1750px on a phone), and
        // re-blurring an element that size on every scroll frame is what made
        // touch scrolling stutter on iPhone. The fade still reads as each
        // section arriving; the blur stays on desktop, where it is affordable.
        const lightweight = window.matchMedia("(max-width: 991px), (pointer: coarse)").matches;
        const startState: gsap.TweenVars = lightweight
            ? { opacity: 0.45 }
            : { filter: "blur(6px) contrast(2.1)", opacity: 0.45 };

        const materialize = (
            el: HTMLElement,
            trigger: HTMLElement,
            start: string,
            end: string
        ) => {
            gsap.set(el, startState);
            triggers.push(
                ScrollTrigger.create({
                    trigger,
                    start,
                    end,
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const p = self.progress;
                        if (p >= 1) {
                            // Cleared rather than left at blur(0px) contrast(1).
                            // Any filter value, even a no-op one, keeps the
                            // element on its own filtered layer for the rest
                            // of the visit - about 8000px of page on a phone -
                            // which the browser keeps re-rendering while you
                            // scroll. Same precedent as WorkCta.tsx. Opacity
                            // is set to 1, not cleared: .effectFade (the Work
                            // tag) defaults to opacity:0 in CSS, so clearing
                            // it would hide the tag. opacity:1 costs nothing.
                            gsap.set(el, { clearProps: "filter", opacity: 1 });
                            return;
                        }
                        gsap.set(
                            el,
                            lightweight
                                ? { opacity: 0.45 + 0.55 * p }
                                : {
                                      filter: `blur(${6 * (1 - p)}px) contrast(${1 + 1.1 * (1 - p)})`,
                                      opacity: 0.45 + 0.55 * p,
                                  }
                        );
                    },
                    onLeaveBack: () => {
                        // Scrolling back up above the trigger resets to the
                        // blurred starting state, so scrolling back down
                        // re-plays the materialize rather than snapping
                        // straight to fully sharp.
                        gsap.set(el, startState);
                    },
                })
            );
        };

        sections.forEach((section) => materialize(section, section, "top 88%", "top 48%"));

        // Work heading, intro line, counter and deck, each triggered by its
        // own arrival, like any other section's header.
        workHeader.forEach((el) => materialize(el, el, "top 88%", "top 48%"));

        return () => {
            triggers.forEach((t) => t.kill());
            sections.forEach((section) => {
                gsap.set(section, { filter: "none", opacity: 1 });
            });
            workHeader.forEach((el) => {
                gsap.set(el, { filter: "none", opacity: 1 });
            });
        };
    }, []);
}
