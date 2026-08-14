"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let pluginsRegistered = false;
function ensurePlugins() {
    if (pluginsRegistered) return;
    gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);
    pluginsRegistered = true;
}

/**
 * Sets up every scroll-triggered animation used on the homepage: split-text
 * headline reveals, the hand-drawn scribble under the hero, the "functional"
 * highlight sweep, the active-card tracking in the Work section, counters,
 * and several others further down this file. Runs once per page load
 * (guarded by hasRun below) and cleans up all its listeners and GSAP
 * triggers on unmount.
 *
 * The exact timing and trigger approach here matter more than they might
 * look - several pieces (the work section trigger in particular, and the
 * ScrollTrigger.refresh() call) were tuned against real mobile Safari
 * behaviour, not just desktop Chrome, so changes here are worth testing on
 * an actual phone rather than just a resized browser window.
 */
export function useScrollAnimations() {
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        ensurePlugins();

        const cleanups: Array<() => void> = [];
        const triggers: ScrollTrigger[] = [];

        /* ---------------- Split-text headline / paragraph animations ---------------- */
        const splitEls = document.querySelectorAll<HTMLElement>(".split-text");
        const splitInstances: SplitText[] = [];
        splitEls.forEach((el) => {
            const inner = el.querySelector("p, a") as HTMLElement | null;
            const target = inner ?? el;
            const hasClass = (c: string) => el.classList.contains(c);

            const split = new SplitText(target, {
                type: "words,chars",
                linesClass: "split-line",
            });
            splitInstances.push(split);
            let setItems: Element[] = split.chars;
            gsap.set(target, { opacity: 1, perspective: 400 });

            const settings: gsap.TweenVars = {
                scrollTrigger: {
                    trigger: target,
                    start: "top 86%",
                    toggleActions: "play none none reverse",
                },
                duration: 0.9,
                stagger: 0.02,
                ease: "power3.out",
            };

            if (hasClass("effect-fade")) settings.opacity = 0;

            if (hasClass("split-lines-transform") || hasClass("split-lines-rotation-x")) {
                split.revert();
                const lineSplit = new SplitText(target, {
                    type: "lines",
                    linesClass: "split-line",
                });
                splitInstances.push(lineSplit);
                setItems = lineSplit.lines;
                settings.opacity = 0;
                settings.stagger = 0.5;
                if (hasClass("split-lines-rotation-x")) {
                    settings.rotationX = -120;
                    settings.transformOrigin = "top center -50";
                } else {
                    settings.yPercent = 100;
                    settings.autoAlpha = 0;
                }
            }

            if (hasClass("effect-blur-fade")) {
                split.revert();
                const lineSplit = new SplitText(target, {
                    type: "lines",
                    linesClass: "split-line",
                });
                splitInstances.push(lineSplit);
                gsap.fromTo(
                    lineSplit.lines,
                    { opacity: 0, filter: "blur(10px)", y: 20 },
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: target,
                            start: "top 86%",
                            toggleActions: "play none none reverse",
                        },
                    },
                );
            } else {
                gsap.from(setItems, settings);
            }
        });

        /* ---------------- Scrolling effect (.scrolling-effect) ---------------- */
        document.querySelectorAll<HTMLElement>(".scrolling-effect").forEach((el) => {
            const delay = parseFloat(el.dataset.delay || "0");
            const settings: gsap.TweenVars = {
                scrollTrigger: {
                    trigger: el,
                    // Was 3 - a three-second catch-up, which reads as the
                    // element lagging behind the scroll rather than
                    // moving with it. 1.2 keeps the motion smoothed and
                    // clearly scroll-tied without the drift.
                    scrub: 1.2,
                    start: "30px bottom",
                    end: "bottom bottom",
                },
                duration: 0.8,
                ease: "power3.out",
                delay,
            };

            if (el.classList.contains("effectRight")) { settings.opacity = 0; settings.x = 80; }
            if (el.classList.contains("effectLeft"))  { settings.opacity = 0; settings.x = -80; }
            if (el.classList.contains("effectBottom")){ settings.opacity = 0; settings.y = 100; }
            if (el.classList.contains("effectTop"))   { settings.opacity = 0; settings.y = -80; }
            if (el.classList.contains("effectZoomIn")){ settings.opacity = 0; settings.scale = 0.4; }
            gsap.from(el, settings);
        });

        /* ---------------- effectFade ---------------- */
        document.querySelectorAll<HTMLElement>(".effectFade").forEach((el) => {
            const fromVars: gsap.TweenVars = { autoAlpha: 0 };
            const toVars: gsap.TweenVars = {
                autoAlpha: 1,
                duration: 1,
                ease: "power3.out",
            };
            let wrapper: HTMLElement | null = null;
            let startPush = "top 96%";
            const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
            toVars.delay = delay;

            if (el.classList.contains("fadeUp") && !el.classList.contains("no-div")) {
                wrapper = document.createElement("div");
                wrapper.classList.add("overflow-hidden");
                el.parentNode?.insertBefore(wrapper, el);
                wrapper.appendChild(el);
            }
            if (el.classList.contains("no-div")) wrapper = null;

            if (el.classList.contains("fadeUp"))          { fromVars.y = 50; toVars.y = 0; }
            else if (el.classList.contains("fadeDown"))   { fromVars.y = -50; toVars.y = 0; }
            else if (el.classList.contains("fadeLeft"))   { fromVars.x = -50; toVars.x = 0; }
            else if (el.classList.contains("fadeRight"))  { fromVars.x = 50; toVars.x = 0; }
            else if (el.classList.contains("fadeRotateX")) {
                fromVars.rotationX = 45; fromVars.yPercent = 100;
                fromVars.transformOrigin = "top center -50";
                toVars.rotationX = 0; toVars.yPercent = 0;
                toVars.transformOrigin = "top center -50";
                if (wrapper) wrapper.style.perspective = "400px";
            } else if (el.classList.contains("fadeZoom")) { fromVars.scale = 0.8; toVars.scale = 1; }

            if (el.classList.contains("view-visible")) startPush = "top 101%";

            gsap.set(el, fromVars);
            gsap.to(el, {
                ...toVars,
                scrollTrigger: {
                    trigger: el,
                    start: startPush,
                    toggleActions: "play none none reverse",
                },
            });
        });

        /* ---------------- Scroll line (timeline progress) ---------------- */
        if (document.querySelector(".scroll-down")) {
            gsap.set(".prg-line", { height: "0%" });
            gsap.to(".prg-line", {
                height: "100%",
                duration: 2,
                ease: "none",
                scrollTrigger: {
                    trigger: ".scroll-down",
                    start: "top 40%",
                    end: "bottom 30%",
                    scrub: true,
                },
            });
            document.querySelectorAll<HTMLElement>(".timeline-item").forEach((item) => {
                const t = ScrollTrigger.create({
                    trigger: item,
                    start: "top 30%",
                    onEnter: () => item.classList.add("active"),
                    onLeaveBack: () => item.classList.remove("active"),
                });
                triggers.push(t);
            });
        }

        /* ---------------- Tech progress bars ---------------- */
        gsap.utils.toArray<HTMLElement>(".progress-line").forEach((el) => {
            const progress = el.dataset.progress;
            gsap.fromTo(el, { width: "15%" }, {
                width: progress + "%",
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        });

        /* ---------------- Work / sticky-item sidebar active ----------------------
           Previously built on GSAP ScrollTrigger onEnter/onLeave/onEnterBack/
           onLeaveBack callbacks - fragile in practice, because those only fire
           on a boundary CROSSING event. If a crossing happened while suppressed
           (isClickScrolling, mid-jump) or was otherwise missed, nothing ever
           re-checked reality afterwards, so the sidebar/wrap classes could get
           stuck at whatever they were last set to.

           Two follow-up attempts at a plain-scroll-listener replacement both
           tried to precisely reproduce the original ScrollTrigger's absolute
           pixel math (natural element position vs. scroll offset) and both
           had their own bugs - live getBoundingClientRect() reads locked at
           the pinned value for the whole time an item is actually stuck, and
           offsetTop's reference frame turned out not to line up with
           window.scrollY the way assumed. Rather than a third attempt at that
           same style of fix, this uses a different strategy that doesn't
           depend on any absolute-position math being exactly right:

           On every scroll tick, check every item's LIVE getBoundingClientRect
           - which is always accurate for current on-screen position, no
           reference-frame ambiguity - and take the LAST one (highest index)
           whose top has reached the 132px line. A pinned item's top sits at
           132px for its whole pinned duration, which is fine: the moment the
           NEXT item's natural position also reaches 132px (which is what
           "stuck" sticky items do at the handoff point), it also satisfies
           the check and, being later, wins - so the fact that an earlier
           item is still trivially "satisfying" its own check no longer
           blocks recognising a later one, which is exactly what going
           first-match-wins got wrong twice already. The only extra piece
           needed is knowing when to show nothing at all (scrolled past the
           very last card into whatever follows Work) - checked only for
           that last card, via its own live bottom edge.                       */
        let isClickScrolling = false;
        let clickScrollTimer: ReturnType<typeof setTimeout> | null = null;
        const sidebar = document.querySelector(".sidebar-user");
        const works = document.querySelectorAll<HTMLElement>(".sticky-item");
        const workSection = document.querySelector<HTMLElement>(".section-work");
        if (sidebar && works.length) {
            const firstWork = works[0];
            const firstWrap = firstWork.querySelector(".wrap");
            const allWraps = Array.from(works)
                .map((w) => w.querySelector(".wrap"))
                .filter((el): el is Element => el !== null);

            let restoredAtScrollY: number | null = null;
            let restoredAtTime = 0;

            const syncSidebarToScroll = () => {
                // This entire mechanism is the desktop fixed-panel swap -
                // .sidebar-user and .wg-work .wrap only take position:fixed
                // from res(lg, min) up, and mobile has its own always-visible
                // card design that never needs this. styles.css already
                // carries a comment claiming a "window.innerWidth >= 992 gate
                // in useScrollAnimations.ts" for exactly this reason, but no
                // such gate actually existed here - .sidebar-user.active's
                // hide-transform is scoped to desktop only in styles.css, but
                // unscoped in the SCSS source (_section.scss), and the SCSS
                // compiles in after styles.css in globals.scss's @use order,
                // so at equal specificity it's the one that actually wins.
                // Below 992px this function toggling "active" was doing
                // nothing useful and risking exactly the hidden-card bug the
                // stale comment thought was already prevented. Restoring the
                // gate here rather than touching either stylesheet - the
                // SCSS/CSS split for this one rule is a separate, pre-existing
                // problem this task didn't touch.
                if (window.innerWidth < 992) return;
                // A click already set the correct end-state immediately (see
                // onAnchorClick below) - don't let a scroll tick mid-jump
                // undo that before the jump has actually settled.
                if (isClickScrolling) return;

                const rects = Array.from(works, (w) => w.getBoundingClientRect());
                let matchedIndex = -1;
                for (let idx = 0; idx < rects.length; idx++) {
                    if (rects[idx].top <= 132) matchedIndex = idx;
                }
                let matched: Element | null = null;
                if (matchedIndex !== -1) {
                    const isLastItem = matchedIndex === works.length - 1;
                    if (!isLastItem || rects[matchedIndex].bottom >= 68) {
                        matched = works[matchedIndex].querySelector(".wrap");
                    }
                }

                // Card 1 used to wait for the same top<=132 pin line as every
                // other card, but that line is where the FIRST item finishes
                // scrolling in - reaching it took a further ~370px of scroll
                // past the section heading, all of it with the profile card
                // still showing. That gap is very likely why reviewers never
                // registered the work cards as a thing to look at: nothing
                // marked the section as "entered" until they were already a
                // full screen deep into it. Cards 2 and 3 keep the pin-based
                // trigger untouched - by then the pattern is established and
                // the scroll-linked handoff is the point. This only pulls
                // card 1's reveal earlier, to when the section heading has
                // scrolled to the vertical middle of the viewport, which is
                // the same "you've arrived" moment the section's own
                // materialise-in animation uses.
                if (matched === null && workSection) {
                    const lastRect = rects[rects.length - 1];
                    const sectionRect = workSection.getBoundingClientRect();
                    const sectionArrived = sectionRect.top <= window.innerHeight * 0.5;
                    const notPastSection = lastRect.bottom > 0;
                    if (sectionArrived && notPastSection) {
                        matched = firstWrap;
                    }
                }

                // Confirmed live, on the real deployed site rather than
                // locally (images fetched over the network shift layout
                // noticeably later than local dev's near-instant static
                // assets do): a "Back to Work" restoration would correctly
                // activate a card, then a card image finishing loading a
                // couple of seconds later would nudge the sticky-item's
                // rendered position just enough that THIS check briefly
                // read "no match", clearing the very card that was just
                // (correctly) restored - even though the user never
                // touched the scroll position at all. Guard specifically
                // against that: right after a restoration activates a
                // card, remember the scrollY it happened at; if a later
                // sync comes back with no match while scrollY has barely
                // moved from that point, it's almost certainly the same
                // layout-shift artefact, not the user actually scrolling
                // away, so keep the restored card active instead of
                // clearing it. Any real scroll of more than a few px
                // clears this guard immediately and syncs normally.
                if (restoredAtScrollY !== null) {
                    const scrolledSince = Math.abs(window.scrollY - restoredAtScrollY);
                    const withinGraceWindow = Date.now() - restoredAtTime < 6000;
                    if (matched === null && scrolledSince < 40 && withinGraceWindow) {
                        return;
                    }
                    if (scrolledSince >= 40 || !withinGraceWindow) {
                        restoredAtScrollY = null;
                    }
                }

                // Same reasoning as the mobile fadeUp fix: a "Back to
                // Work" restoration already played its own scroll
                // animation to get here, so the card's own 0.3s
                // opacity/transform crossfade (see .wg-work .wrap and
                // .sidebar-user in styles.css) on top of that reads as
                // extra settling time rather than a real reveal - the
                // user already knows this card and is being returned to
                // it, not discovering it. Skip that transition just for
                // this specific toggle when a restoration is flagged as
                // active, so the card is simply there the instant the
                // scroll lands; ordinary scroll-driven swapping between
                // different project cards never sets this flag and keeps
                // its normal crossfade.
                const wRestore = window as unknown as { __suppressHashSyncUntil?: number };
                const isRestoring = !!wRestore.__suppressHashSyncUntil && Date.now() < wRestore.__suppressHashSyncUntil;
                if (isRestoring) {
                    sidebar.classList.add("no-entrance-anim");
                    allWraps.forEach((el) => el.classList.add("no-entrance-anim"));
                }

                sidebar.classList.toggle("active", matched !== null);
                allWraps.forEach((el) => el.classList.toggle("active", el === matched));
                if (matched !== null) {
                    restoredAtScrollY = window.scrollY;
                    restoredAtTime = Date.now();
                }

                if (isRestoring) {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            sidebar.classList.remove("no-entrance-anim");
                            allWraps.forEach((el) => el.classList.remove("no-entrance-anim"));
                        });
                    });
                }
            };

            let syncTicking = false;
            const onScrollSync = () => {
                if (syncTicking) return;
                syncTicking = true;
                requestAnimationFrame(() => {
                    syncTicking = false;
                    syncSidebarToScroll();
                });
            };
            window.addEventListener("scroll", onScrollSync, { passive: true });
            cleanups.push(() => {
                window.removeEventListener("scroll", onScrollSync);
            });

            // The one genuinely problematic moment: this hook can mount
            // and run before a pending cross-route restoration ("Back to
            // Work") has actually jumped the scroll position - calling
            // syncSidebarToScroll right now would read scrollY still at 0
            // and correctly, but wrongly, conclude nothing is active,
            // which used to require waiting out a long fixed suppression
            // window to correct. Skipping specifically this one call when
            // a restoration is flagged as pending fixes that without
            // needing to hold back every ordinary scroll-driven sync
            // behind the same delay - the real jump generally lands within
            // a frame or two, and the very next native scroll event (or,
            // failing that, one of the short safety-net checks below)
            // picks it up and activates the card almost immediately
            // instead of only after the full window elapses.
            const restorationPending = () => {
                const w = window as unknown as { __suppressHashSyncUntil?: number };
                return !!w.__suppressHashSyncUntil && Date.now() < w.__suppressHashSyncUntil;
            };
            if (!restorationPending()) {
                syncSidebarToScroll(); // correct state immediately, e.g. landing mid-page on load
            } else {
                // Short, closely-spaced safety net in case the restoration's
                // own jump doesn't happen to fire a native scroll event
                // (e.g. it lands at a position identical to the current
                // one) - each check is cheap and a no-op if a scroll event
                // already handled it first.
                [120, 300, 600, 1000].forEach((delay) => {
                    const t = setTimeout(syncSidebarToScroll, delay);
                    cleanups.push(() => clearTimeout(t));
                });
            }

            // Click-triggered nav (as opposed to organic wheel/touch scrolling)
            // jumps straight to a destination, skipping past the intermediate
            // scroll positions the sync above is keyed to - so relying on it
            // alone either flickers through cards never really visited, or (if
            // suppressed) leaves things stale until the next scroll tick. Since
            // a click always tells us the exact destination up front, set the
            // correct end-state directly, the instant the click happens.
            const onAnchorClick = (e: Event) => {
                const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href") ?? "";
                isClickScrolling = true;
                if (clickScrollTimer) clearTimeout(clickScrollTimer);

                if (href === "#work") {
                    // Always starts the reveal on the first card, regardless of
                    // which section you're arriving from.
                    sidebar.classList.add("active");
                    allWraps.forEach((el) => el.classList.remove("active"));
                    firstWrap?.classList.add("active");
                } else {
                    // Any destination other than Work: the profile card should
                    // be showing and no work card should be pinned, immediately -
                    // not once the animated scroll eventually gets there.
                    sidebar.classList.remove("active");
                    allWraps.forEach((el) => el.classList.remove("active"));
                }

                // Once this lifts, the very next scroll tick (Lenis fires scroll
                // events continuously through its own animated scrollTo, so
                // there's always one along shortly) re-syncs from live position -
                // this is just covering smoothScrollTo's default 1.2s animation
                // plus the same 500ms settle buffer used elsewhere in this
                // codebase (see suppressPassiveHashSync), so the sync can't fire
                // mid-flight and immediately undo the state just set above.
                clickScrollTimer = setTimeout(() => {
                    isClickScrolling = false;
                    // The click handler above set the active state directly
                    // via classList, bypassing syncSidebarToScroll entirely -
                    // so the grace-window guard inside it (restoredAtScrollY/
                    // restoredAtTime) was never armed for this click. Without
                    // it, if "#work" lands at a scroll position where no card
                    // yet strictly satisfies the top<=132 pinning threshold
                    // (landing at the section's heading rather than inside the
                    // pinned-card zone, for instance), this re-sync finds no
                    // match and reverts to the profile card a moment after
                    // correctly showing the first work card - the exact
                    // "flashes the work card, then shows the profile card"
                    // behaviour reported. Arming the same guard the organic
                    // path already uses fixes it the same way that path is
                    // already protected, rather than adding new logic: for
                    // 6 seconds (or until a real scroll of 40px+ happens),
                    // a "no match" result here is treated as the same
                    // landing-artefact case the restoration path handles,
                    // not a genuine departure from Work.
                    if (href === "#work") {
                        restoredAtScrollY = window.scrollY;
                        restoredAtTime = Date.now();
                    }
                    syncSidebarToScroll();
                }, 1700);
            };
            const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
            anchors.forEach((a) => a.addEventListener("click", onAnchorClick));
            cleanups.push(() => anchors.forEach((a) => a.removeEventListener("click", onAnchorClick)));
        }

        /* ---------------- Mobile work cards ----------------------------------
           Removed. This block added .in-view once per card with `once:true`
           and no onLeaveBack, so the mobile reveal played a single time and
           never reversed - the only section on mobile that was not
           scroll-linked. Work.tsx separately ran an IntersectionObserver
           setting the same class, so two one-way mechanisms were driving one
           animation. useSectionMaterialize now scrubs these cards exactly
           like every other section, which is bidirectional by construction
           and needs no back-nav restoration special-case: a scrubbed trigger
           derives its state from scroll position, so arriving at a card from
           "Back to Work" simply renders it at the position it belongs in
           rather than replaying a timed entrance. */

        /* ---------------- Flip Animation (gsap-anime-2) ---------------- */
        const flipContainer = document.querySelector(".gsap-anime-2");
        if (flipContainer) {
            const cards = document.querySelectorAll<HTMLElement>(".flip-image");
            const animateFlip = () => {
                if (!cards.length) return;
                const isMobile = window.innerWidth < 575;
                const cardW = 150;
                const cardH = 150;
                const parent = cards[0].parentElement;
                if (!parent) return;
                const centerX = parent.clientWidth / 2 - cardW / 2;
                const centerY = parent.clientHeight / 2 - cardH / 2;
                cards.forEach((card, i) => {
                    card.style.position = "absolute";
                    card.style.zIndex = String(i + 1);
                });
                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                    scrollTrigger: { trigger: ".gsap-anime-2", start: "top 80%", toggleActions: "play none none reverse" },
                });
                tl.to(cards, { x: centerX, y: centerY, opacity: 1, duration: 1, stagger: 0.1 })
                  .to(cards, {
                    x: (i: number) => {
                        if (i === 0) return centerX - (isMobile ? 150 : 225);
                        if (i === 1) return centerX - (isMobile ? 90 : 135);
                        if (i === 2) return centerX - (isMobile ? 30 : 45);
                        if (i === 3) return centerX + (isMobile ? 30 : 45);
                        if (i === 4) return centerX + (isMobile ? 90 : 135);
                        if (i === 5) return centerX + (isMobile ? 150 : 225);
                        return centerX;
                    },
                    y: (i: number) => {
                        if (i === 0) return centerY - 150; if (i === 1) return centerY - 90;
                        if (i === 2) return centerY - 30;  if (i === 3) return centerY + 30;
                        if (i === 4) return centerY + 90;  if (i === 5) return centerY + 150;
                        return centerY;
                    },
                    rotation: -10, rotateX: 4, rotateY: 10, duration: 1, ease: "power2.out", delay: 0.3,
                });
            };
            animateFlip();
            const onResize = () => { gsap.killTweensOf(".flip-image"); animateFlip(); };
            window.addEventListener("resize", onResize);
            cleanups.push(() => window.removeEventListener("resize", onResize));
        }

        /* ---------------- Draw SVG scribble ---------------- */
        // Strategy: use rAF to defer getTotalLength() until after the browser
        // has laid out and painted the SVG. On mobile Safari, synchronous
        // getTotalLength() can return 0 if called before the SVG renders.
        // The IntersectionObserver then toggles the is-drawn class as the
        // SVG scrolls in and out of view - both directions play through the
        // same CSS transition (stroke-dashoffset, a standard bidirectional
        // transition, not a one-shot keyframe animation), so it draws in on
        // entry and un-draws on exit, ready to draw in again next time the
        // person scrolls back to it rather than only ever playing once per
        // page load. Previously disconnected after the first trigger -
        // fine when the hero was the first thing on the page, but once the
        // welcome-reveal intro pushed it below a few screens of scroll, a
        // visitor scrolling back up past it and back down again reasonably
        // expects to see it draw in again, not sit there already-drawn.
        if (document.querySelector(".scribble-wrap")) {
            const path = document.getElementById("scribblePath") as unknown as SVGPathElement | null;
            const svg = document.querySelector(".scribble");
            if (path && svg) {
                let rafId = 0;
                const setup = () => {
                    const len = path.getTotalLength();
                    if (len === 0) {
                        // SVG not painted yet - retry next frame
                        rafId = requestAnimationFrame(setup);
                        return;
                    }
                    (svg as HTMLElement).style.setProperty("--len", String(len));
                    const io = new IntersectionObserver(
                        ([entry]) => {
                            svg.classList.toggle("is-drawn", entry.isIntersecting);
                        },
                        { threshold: 0.1 },
                    );
                    io.observe(svg);
                    cleanups.push(() => io.disconnect());
                };
                rafId = requestAnimationFrame(setup);
                cleanups.push(() => cancelAnimationFrame(rafId));
            }
        }

        /* ---------------- Counter ---------------- */
        const counterEls = document.querySelectorAll<HTMLElement>(".counter");
        if (document.body.classList.contains("counter-scroll") && counterEls.length) {
            const started = new WeakSet<HTMLElement>();
            const animateNumbers = (root: HTMLElement) => {
                root.querySelectorAll<HTMLElement>(".number").forEach((numEl) => {
                    const to = parseFloat(numEl.dataset.to || "0");
                    const speed = parseFloat(numEl.dataset.speed || "1000");
                    const obj = { v: 0 };
                    gsap.to(obj, {
                        v: to,
                        duration: speed / 1000,
                        ease: "power1.out",
                        onUpdate: () => { numEl.textContent = String(Math.round(obj.v)); },
                        onComplete: () => {
                            // Tiny scale-pop on landing so the count-up resolves
                            // with a beat rather than just stopping. Scoped to the
                            // .counter parent so the trailing "+" pops with the
                            // number. transform-origin left so it grows in place
                            // beside the left-aligned label rather than drifting.
                            const parent = root as HTMLElement;
                            gsap.fromTo(parent,
                                { scale: 1 },
                                { scale: 1.04, duration: 0.12, ease: "power2.out", transformOrigin: "left center",
                                  yoyo: true, repeat: 1 }
                            );
                        },
                    });
                });
            };
            counterEls.forEach((el) => {
                const t = ScrollTrigger.create({
                    trigger: el,
                    start: "top 95%",
                    once: true,
                    onEnter: () => { if (started.has(el)) return; started.add(el); animateNumbers(el); },
                });
                triggers.push(t);
            });
        }

        /* ---------------- Text-rotate circular text ---------------- */
        // Full text requested: DEV VYAS - PRODUCT - UI/UX - GRAPHIC -
        // DESIGNER & RESEARCHER - UK - (68 chars). Circle is resized to
        // 184px diameter (r=92) so all chars fit without upside-down
        // overflow - 68 chars gives each char slightly MORE room than the
        // previous 72-char string did, so the existing circle/font sizing
        // still fits comfortably without needing to be retuned.
        //
        // Each span's transform-origin sits at its own left edge (see
        // .text-rotate .text span in styles.css), so without correction a
        // character's LEFT edge - not its visual centre - lands exactly on
        // its rotation angle. Every char then trails off to the right of
        // its "true" position by its own width, which is invisible for
        // average-width letters but shows up as a noticeable gap after
        // narrow ones (I, l) where the next character's slot begins well
        // before that narrow glyph visually ends. translateX(-50%) shifts
        // each character left by half its own rendered width before the
        // rotation is applied, so its centre - not its edge - is what
        // lands on the angle, spacing every character evenly regardless
        // of its own width.
        document.querySelectorAll<HTMLElement>(".text-rotate .text").forEach((circularText) => {
            const text = "DEV VYAS - PRODUCT - UI/UX - GRAPHIC - DESIGNER & RESEARCHER - UK - ";
            const chars = text.split("");
            const degree = 360 / chars.length;
            circularText.innerHTML = "";
            chars.forEach((char, i) => {
                const span = document.createElement("span");
                span.textContent = char;
                span.style.transform = `rotate(${i * degree}deg) translateX(-50%)`;
                circularText.appendChild(span);
            });
        });

        /* ---------------- Active Class for intro title spans ---------------- */
        // Previously permanently locked once triggered (an early `if
        // (el.classList.contains("active")) return` skipped ever
        // re-checking) - fine when the hero was the first thing on the
        // page and this only ever needed to fire once, but with the
        // welcome-reveal intro now above it, someone scrolling back up
        // past the hero and back down again reasonably expects to see the
        // highlight sweep in again, not find it already there. Toggles now
        // instead: adds "active" (after the same 300ms delay as before,
        // for the same staggered feel) on entering view, removes it
        // immediately on fully leaving - the underlying CSS transition
        // (width, all 0.5s ease) handles the sweep smoothly in both
        // directions on its own, no extra animation code needed here.
        // "Leaving" uses a stricter, fully-out-of-view condition than
        // "entering" uses (past the 80% line) so the two don't sit right
        // next to each other - without that gap, hesitant scrolling
        // right at the entry line would flicker the highlight rapidly.
        const introSpans = document.querySelectorAll<HTMLElement>(".intro-title span");
        const pendingActivate = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
        const checkActive = () => {
            introSpans.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const entering = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
                const leaving = rect.bottom <= 0 || rect.top >= window.innerHeight;

                if (entering && !el.classList.contains("active") && !pendingActivate.has(el)) {
                    const timer = setTimeout(() => {
                        el.classList.add("active");
                        pendingActivate.delete(el);
                    }, 300);
                    pendingActivate.set(el, timer);
                } else if (leaving) {
                    const pending = pendingActivate.get(el);
                    if (pending) {
                        clearTimeout(pending);
                        pendingActivate.delete(el);
                    }
                    el.classList.remove("active");
                }
            });
        };
        if (introSpans.length) {
            window.addEventListener("scroll", checkActive);
            checkActive();
            cleanups.push(() => {
                window.removeEventListener("scroll", checkActive);
                introSpans.forEach((el) => {
                    const pending = pendingActivate.get(el);
                    if (pending) clearTimeout(pending);
                });
            });
        }

        /* ---------------- Wrap Active (.wrap-hover-award) ---------------- */
        const wrapAwards = document.querySelectorAll<HTMLElement>(".wrap-hover-award");
        const onScrollWrap = () => {
            wrapAwards.forEach((el) => {
                const rect = el.getBoundingClientRect();
                el.classList.toggle("active", rect.bottom > 0 && rect.top < window.innerHeight);
            });
        };
        if (wrapAwards.length) {
            window.addEventListener("scroll", onScrollWrap);
            onScrollWrap();
            cleanups.push(() => window.removeEventListener("scroll", onScrollWrap));
        }

        /* ---------------- Scroll-link active highlight (mobile menu only) -------- */
        const scrollLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-mobile-item a.scroll-link");
        const onScrollLink = () => {
            scrollLinks.forEach((a) => {
                const href = a.getAttribute("href");
                if (!href || href === "#") return;
                const target = document.querySelector<HTMLElement>(href);
                if (!target) return;
                const rect = target.getBoundingClientRect();
                const scrollPos = window.scrollY;
                const top = scrollPos + rect.top;
                const bottom = top + target.offsetHeight;
                if (scrollPos < bottom - 20 && scrollPos >= top - 20) a.classList.add("active");
                else a.classList.remove("active");
            });
        };
        if (scrollLinks.length) {
            document.addEventListener("scroll", onScrollLink, { passive: true });
            onScrollLink();
            cleanups.push(() => document.removeEventListener("scroll", onScrollLink));
        }

        /* ---------------- Refresh ScrollTrigger (exact original: 100ms) --------- */
        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
        cleanups.push(() => clearTimeout(refreshTimer));

        return () => {
            cleanups.forEach((fn) => fn());
            triggers.forEach((t) => t.kill());
            splitInstances.forEach((s) => s.revert());
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);
}
