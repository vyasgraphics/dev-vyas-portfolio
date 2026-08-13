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
//    changes what that element is positioned relative to.
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

// Work gets the same materialize feel, but never on #work itself (or
// .wg-work, or .sticky-item) - all three are ANCESTORS of .wg-work .wrap,
// which is position:fixed on desktop, and `filter` on any ancestor of a
// fixed element gives it a new containing block, breaking the card pin.
// Instead this targets .work-image and .work-content directly (queried
// per .sticky-item below): both are visible card content, neither is an
// ancestor of .wrap (.work-image is .wrap's sibling inside .wg-work;
// .work-content is .wrap's own child, so filter on it can't affect
// .wrap's containing block upward). Same precedent already used for the
// hover-glow effect just above this section's CSS (box-shadow on
// .wg-work, scale on .work-image, never a transform/filter on .wg-work
// or .wrap). The section heading/description (.sect-tag, .s-desc) also
// get it, since neither sits above .wrap either.

export function useSectionMaterialize() {
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        const sections = document.querySelectorAll<HTMLElement>(MATERIALIZE_SELECTOR);

        // Work materialize now runs on mobile too. It was originally
        // desktop-only because `filter` on an ancestor of a position:fixed
        // element gives it a new containing block, and .wg-work .wrap is
        // fixed - but that rule is itself scoped to min-width:992px, so
        // below that there is no fixed element to break. Mobile previously
        // had a separate one-way fade-up instead (an IntersectionObserver
        // in Work.tsx plus a `once:true` ScrollTrigger in
        // useScrollAnimations, both adding the same .in-view class); that
        // played once, never reversed, and was the only section on mobile
        // not scroll-linked, which is exactly what read as "not smooth,
        // not both directions" next to every other section's scrub. Both
        // one-way mechanisms are gone and this scrubbed one replaces them.
        const workHeader = Array.from(
            document.querySelectorAll<HTMLElement>("#work .sect-tag, #work .s-desc")
        );
        const workCards = Array.from(
            document.querySelectorAll<HTMLElement>("#work .sticky-item")
        );
        if (!sections.length && !workHeader.length && !workCards.length) return;

        const triggers: ScrollTrigger[] = [];

        const materialize = (
            el: HTMLElement,
            trigger: HTMLElement,
            start: string,
            end: string
        ) => {
            gsap.set(el, { filter: "blur(6px) contrast(2.1)", opacity: 0.45 });
            triggers.push(
                ScrollTrigger.create({
                    trigger,
                    start,
                    end,
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const p = self.progress;
                        gsap.set(el, {
                            filter: `blur(${6 * (1 - p)}px) contrast(${1 + 1.1 * (1 - p)})`,
                            opacity: 0.45 + 0.55 * p,
                        });
                    },
                    onLeaveBack: () => {
                        // Scrolling back up above the trigger resets to the
                        // blurred starting state, so scrolling back down
                        // re-plays the materialize rather than snapping
                        // straight to fully sharp.
                        gsap.set(el, { filter: "blur(6px) contrast(2.1)", opacity: 0.45 });
                    },
                })
            );
        };

        sections.forEach((section) => materialize(section, section, "top 88%", "top 48%"));

        // Work heading/description ("Selected Work" + intro line) sit once,
        // above .work-list, outside every .sticky-item - safe to treat like
        // any other section's header, triggered off #work itself entering.
        workHeader.forEach((el) => materialize(el, el, "top 88%", "top 48%"));

        // Work cards: same visual settle, but the trigger is each
        // .sticky-item (one per project) rather than #work as a whole.
        // #work is tall - one sticky-item per project, each roughly a
        // viewport - so a single #work-wide trigger would only materialize
        // once for the entire section; per-card triggers make every
        // project card re-play the same settle as it becomes the active
        // sticky card, matching the "each thing settles as it arrives"
        // feel of the other sections rather than a one-shot version.
        workCards.forEach((card) => {
            const targets = card.querySelectorAll<HTMLElement>(".work-image, .work-content");
            targets.forEach((el) => materialize(el, card, "top 88%", "top 48%"));
        });

        return () => {
            triggers.forEach((t) => t.kill());
            sections.forEach((section) => {
                gsap.set(section, { filter: "none", opacity: 1 });
            });
            workHeader.forEach((el) => {
                gsap.set(el, { filter: "none", opacity: 1 });
            });
            workCards.forEach((card) => {
                card.querySelectorAll<HTMLElement>(".work-image, .work-content").forEach((el) => {
                    gsap.set(el, { filter: "none", opacity: 1 });
                });
            });
        };
    }, []);
}
