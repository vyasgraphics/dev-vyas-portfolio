"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

// A one-time, sequential entrance for the hero the moment the page loads -
// separate from the sitewide scroll-triggered reveals in
// useScrollAnimations.ts (.effectFade, .scrolling-effect, .split-text),
// because this needs to fire on MOUNT regardless of scroll position, not
// when scrolled into view. No ScrollTrigger/SplitText/ScrollToPlugin
// needed here at all - just plain GSAP core tweens on a timeline, so this
// doesn't touch the registerPlugin ordering the other hooks depend on.
//
// Targets elements by their existing, stable selectors (matching how
// useScrollAnimations.ts already queries the DOM) rather than adding new
// classNames to Intro.tsx or converting it to a client component for refs.
//
// Sequence, adapted from a 3-stage "headline -> subheading -> nav/CTA"
// spec to what's actually in this hero (no literal nav or CTA button
// live inside the Intro section itself - those are the sidebar/profile
// card, separate components):
//   0.00s  headline (h1.intro-title) fades in, rises 20px
//   0.35s  author line (name + role) fades in underneath it - "a beat
//          later", within the 0.25-0.5s window asked for
//   0.75s  stats + location line settle in together
//   1.00s  discipline tag marquee, last to arrive
//
// .intro-author and .box-counter previously carried .effectFade.fadeUp
// (the sitewide scroll-reveal system) - removed from the JSX in favour
// of this dedicated sequence, since the hero sits at the top of the page
// and that scroll trigger would fire at effectively the same moment as
// this one, animating the same properties on the same elements twice.
export function useHeroLoadSequence() {
    useEffect(() => {
        const stage = document.querySelector<HTMLElement>("#home");
        if (!stage) return;

        const headline = stage.querySelector<HTMLElement>(".intro-title");
        const author = stage.querySelector<HTMLElement>(".intro-author");
        const counters = stage.querySelector<HTMLElement>(".box-counter");
        const client = stage.querySelector<HTMLElement>(".intro-client");
        const discipline = stage.querySelector<HTMLElement>("#intro-discipline-wrap");

        const targets = [headline, author, counters, client, discipline].filter(
            (el): el is HTMLElement => el !== null
        );
        if (!targets.length) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        // Calm, restrained easing throughout - power2.out rather than
        // anything with overshoot/bounce, and comfortably long durations
        // (0.8-1s) rather than the snappy 0.2-0.3s used for click/hover
        // feedback elsewhere - this is a first-impression moment, not a
        // response to input.
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        if (headline) {
            tl.fromTo(headline, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0);
        }
        if (author) {
            tl.fromTo(author, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.35);
        }
        const detailTargets = [counters, client].filter((el): el is HTMLElement => el !== null);
        if (detailTargets.length) {
            tl.fromTo(
                detailTargets,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
                0.75
            );
        }
        if (discipline) {
            tl.fromTo(discipline, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0);
        }

        return () => {
            tl.kill();
        };
    }, []);
}
