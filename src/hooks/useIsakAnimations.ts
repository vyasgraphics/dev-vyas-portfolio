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
 * Exact port of the original Isak template's animation hook.
 * Any deviation from the original breaks mobile - particularly the work
 * section trigger approach and the simple 100ms ScrollTrigger.refresh().
 */
export function useIsakAnimations() {
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
                    toggleActions: "play none none none",
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
                            toggleActions: "play none none none",
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
                    scrub: 3,
                    toggleActions: "play none none none",
                    start: "30px bottom",
                    end: "bottom bottom",
                    once: true,
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
                    toggleActions: "play none none none",
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
        if (sidebar && works.length) {
            const firstWork = works[0];
            const firstWrap = firstWork.querySelector(".wrap");
            const allWraps = Array.from(works)
                .map((w) => w.querySelector(".wrap"))
                .filter((el): el is Element => el !== null);

            const syncSidebarToScroll = () => {
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
                sidebar.classList.toggle("active", matched !== null);
                allWraps.forEach((el) => el.classList.toggle("active", el === matched));
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
            cleanups.push(() => window.removeEventListener("scroll", onScrollSync));
            syncSidebarToScroll(); // correct state immediately, e.g. landing mid-page on load

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
                    syncSidebarToScroll();
                }, 1700);
            };
            const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
            anchors.forEach((a) => a.addEventListener("click", onAnchorClick));
            cleanups.push(() => anchors.forEach((a) => a.removeEventListener("click", onAnchorClick)));
        }

        /* ---------------- Mobile work cards fade-in (mobile only, < 992px) ---- */
        if (window.innerWidth < 992) {
            works.forEach((work) => {
                const t = ScrollTrigger.create({
                    trigger: work,
                    start: "top 85%",
                    once: true,
                    onEnter: () => work.classList.add("in-view"),
                });
                triggers.push(t);
            });
        }

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
        // The IntersectionObserver then waits for the SVG to scroll into view
        // before adding the is-drawn class which triggers the CSS transition.
        if (document.querySelector(".scribble-wrap")) {
            const path = document.getElementById("scribblePath") as unknown as SVGPathElement | null;
            const svg = document.querySelector(".scribble");
            if (path && svg) {
                let rafId = 0;
                const setup = () => {
                    const len = path.getTotalLength();
                    if (len === 0) {
                        // SVG not painted yet — retry next frame
                        rafId = requestAnimationFrame(setup);
                        return;
                    }
                    (svg as HTMLElement).style.setProperty("--len", String(len));
                    const io = new IntersectionObserver(
                        ([entry]) => {
                            if (entry.isIntersecting) {
                                svg.classList.add("is-drawn");
                                io.disconnect();
                            }
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
        const introSpans = document.querySelectorAll<HTMLElement>(".intro-title span");
        const checkActive = () => {
            introSpans.forEach((el) => {
                if (el.classList.contains("active")) return;
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                    setTimeout(() => el.classList.add("active"), 300);
                }
            });
        };
        if (introSpans.length) {
            window.addEventListener("scroll", checkActive);
            checkActive();
            cleanups.push(() => window.removeEventListener("scroll", checkActive));
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
