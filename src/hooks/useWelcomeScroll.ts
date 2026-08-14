"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ties the welcome screen to the scroll position, so getting from it to the
// hero feels like every other transition on this page rather than like two
// separate pages stacked on top of each other.
//
// Scrubbed, both directions, same as useSectionMaterialize - scroll back up
// and the welcome copy comes back exactly as it left. As the screen leaves,
// two things happen against the same progress value:
//
//   0.00 - 0.25  the "Scroll down" cue fades (it has done its job the moment
//                you start scrolling)
//   0.00 - 0.55  the copy fades and lifts
//   0.55 - 0.95  the fixed desktop chrome fades in
//
// Follows useSectionMaterialize's precedent of using ScrollTrigger WITHOUT
// calling registerPlugin - useScrollAnimations.ts is the single registration
// site (see CLAUDE.md), so this hook has to be called after it in HomeShell.
export function useWelcomeScroll() {
    useEffect(() => {
        const welcome = document.querySelector<HTMLElement>("#welcome");
        if (!welcome) return;

        const content = welcome.querySelector<HTMLElement>(".vg-welcome-inner");
        const cue = welcome.querySelector<HTMLElement>(".vg-welcome-scroll");
        const root = document.documentElement;

        // The chrome opacity travels as a CSS custom property rather than as
        // an inline style on the wrapper divs, and that is not a stylistic
        // preference. Those wrappers are React-rendered with a style object
        // literal, so every HomeShell re-render (useClock ticks one per
        // second) hands React a fresh object and it re-applies it, wiping any
        // inline value written from outside. The previous welcome screen hit
        // exactly this and worked around it by re-writing the style on every
        // motion-value change; driving a custom property React never touches
        // avoids the fight altogether.
        const setChrome = (v: number) => {
            root.style.setProperty("--vg-chrome-opacity", String(v));
            root.style.setProperty("--vg-chrome-pe", v > 0.6 ? "auto" : "none");
        };
        const clearChrome = () => {
            root.style.removeProperty("--vg-chrome-opacity");
            root.style.removeProperty("--vg-chrome-pe");
        };

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            // Nothing scroll-linked at all: the copy stays put and the chrome
            // stays where the CSS default leaves it (visible).
            return;
        }

        const desktop = window.matchMedia("(min-width: 992px)");

        // Only desktop hides the chrome. Below 992px the profile card is in
        // normal flow BELOW this screen so there is nothing overlapping to
        // hide, and the only fixed control left is the menu button, which
        // should stay reachable from the very first screen.
        const apply = (progress: number) => {
            const exit = Math.min(1, progress / 0.55);
            if (content) {
                gsap.set(content, { opacity: 1 - exit, y: -40 * exit });
            }
            if (cue) {
                gsap.set(cue, { opacity: 1 - Math.min(1, progress / 0.25) });
            }
            if (desktop.matches) {
                const chrome = Math.max(0, Math.min(1, (progress - 0.55) / 0.4));
                setChrome(chrome);
            } else {
                clearChrome();
            }
        };

        const trigger = ScrollTrigger.create({
            trigger: welcome,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            // onRefresh as well as onUpdate: a reload that restores a
            // scrolled position (browser back from a case study, or a
            // bookmarked "/#work") never fires onUpdate until the next
            // scroll, which would leave the desktop chrome faded out and
            // unclickable on arrival.
            onUpdate: (self) => apply(self.progress),
            onRefresh: (self) => apply(self.progress),
        });

        const onBreakpointChange = () => {
            if (!desktop.matches) clearChrome();
            apply(trigger.progress);
        };
        desktop.addEventListener("change", onBreakpointChange);

        return () => {
            trigger.kill();
            desktop.removeEventListener("change", onBreakpointChange);
            clearChrome();
            if (content) gsap.set(content, { opacity: 1, y: 0 });
            if (cue) gsap.set(cue, { opacity: 1 });
        };
    }, []);
}
