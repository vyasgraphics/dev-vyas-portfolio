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
 * Port of gsapAnimation.js + main.js + animation-change-text.js (vanilla, no jQuery).
 * Run once after page DOM is ready inside a "use client" page component.
 */
export function useIsakAnimations() {
    const hasRun = useRef(false);

    useEffect(() => {
        // Guard against React StrictMode double-invocation
        if (hasRun.current) return;
        hasRun.current = true;

        ensurePlugins();

        // Respect the OS-level "reduce motion" preference: speed the whole
        // GSAP timeline up dramatically so every entrance/reveal animation
        // still runs (so nothing ends up permanently invisible or broken)
        // but resolves close to instantly, rather than playing full-length.
        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            gsap.globalTimeline.timeScale(30);
        }

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

            if (
                hasClass("split-lines-transform") ||
                hasClass("split-lines-rotation-x")
            ) {
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
        document
            .querySelectorAll<HTMLElement>(".scrolling-effect")
            .forEach((el) => {
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

                if (el.classList.contains("effectRight")) {
                    settings.opacity = 0;
                    settings.x = 80;
                }
                if (el.classList.contains("effectLeft")) {
                    settings.opacity = 0;
                    settings.x = -80;
                }
                if (el.classList.contains("effectBottom")) {
                    settings.opacity = 0;
                    settings.y = 100;
                }
                if (el.classList.contains("effectTop")) {
                    settings.opacity = 0;
                    settings.y = -80;
                }
                if (el.classList.contains("effectZoomIn")) {
                    settings.opacity = 0;
                    settings.scale = 0.4;
                }
                gsap.from(el, settings);
            });

        /* ---------------- effectFade fadeUp/fadeDown/fadeLeft/fadeRight/fadeZoom/fadeRotateX ---------------- */
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

            if (
                el.classList.contains("fadeUp") &&
                !el.classList.contains("no-div")
            ) {
                wrapper = document.createElement("div");
                wrapper.classList.add("overflow-hidden");
                el.parentNode?.insertBefore(wrapper, el);
                wrapper.appendChild(el);
            }
            if (el.classList.contains("no-div")) wrapper = null;

            if (el.classList.contains("fadeUp")) {
                fromVars.y = 50;
                toVars.y = 0;
            } else if (el.classList.contains("fadeDown")) {
                fromVars.y = -50;
                toVars.y = 0;
            } else if (el.classList.contains("fadeLeft")) {
                fromVars.x = -50;
                toVars.x = 0;
            } else if (el.classList.contains("fadeRight")) {
                fromVars.x = 50;
                toVars.x = 0;
            } else if (el.classList.contains("fadeRotateX")) {
                fromVars.rotationX = 45;
                fromVars.yPercent = 100;
                fromVars.transformOrigin = "top center -50";
                toVars.rotationX = 0;
                toVars.yPercent = 0;
                toVars.transformOrigin = "top center -50";
                if (wrapper) wrapper.style.perspective = "400px";
            } else if (el.classList.contains("fadeZoom")) {
                fromVars.scale = 0.8;
                toVars.scale = 1;
            }

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
            document
                .querySelectorAll<HTMLElement>(".timeline-item")
                .forEach((item) => {
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
            gsap.fromTo(
                el,
                { width: "15%" },
                {
                    width: progress + "%",
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );
        });

        /* ---------------- Work / sticky-item sidebar active ---------------- */
        let isClickScrolling = false;
        let clickScrollTimer: ReturnType<typeof setTimeout> | null = null;
        const sidebar = document.querySelector(".sidebar-user");
        const workItems = document.querySelectorAll<HTMLElement>(".sticky-item");
        if (sidebar && workItems.length && window.innerWidth >= 992) {
            const items = Array.from(workItems)
                .map((work) => ({ el: work, wrap: work.querySelector<HTMLElement>(".wrap") }))
                .filter((i): i is { el: HTMLElement; wrap: HTMLElement } => i.wrap !== null);

            // A single, unified detection of which item is active, using
            // IntersectionObserver rather than polling on every scroll
            // frame. The previous version used GSAP's onUpdate, which fires
            // on every single scroll frame across a deliberately wide
            // range, and inside it called getBoundingClientRect() on 3
            // elements AND mutated their classes in the same cycle - a
            // read-then-write-then-read-again pattern that forces the
            // browser to recompute layout synchronously, repeatedly, for
            // as long as the user keeps scrolling. On a lower-powered
            // mobile device that is exactly the kind of thing that makes
            // scrolling feel completely locked up, which is what was
            // reported. IntersectionObserver is natively optimized by the
            // browser - it only fires when an element's intersection with
            // the observed line actually changes, never continuously - so
            // it gives the same "which item is at this line right now"
            // answer with none of the per-frame cost.
            const TRIGGER_LINE = 132; // matches .sticky-item's sticky "top" offset

            // Track which items are currently intersecting the trigger band
            // purely from what the browser reports - never re-querying
            // getBoundingClientRect ourselves, which would reintroduce the
            // exact per-frame layout cost this change exists to eliminate.
            const intersecting = new Set<number>();

            const updateFromEntries = (entries: IntersectionObserverEntry[]) => {
                if (isClickScrolling) return;

                entries.forEach((entry) => {
                    const idx = items.findIndex((it) => it.el === entry.target);
                    if (idx === -1) return;
                    if (entry.isIntersecting) intersecting.add(idx);
                    else intersecting.delete(idx);
                });

                // Prefer the LAST (highest index) currently-intersecting
                // item, matching actual visual stacking order for the rare
                // case where two briefly overlap.
                let activeIndex = -1;
                items.forEach((_, i) => {
                    if (intersecting.has(i)) activeIndex = i;
                });

                items.forEach((item, i) => {
                    item.wrap.classList.toggle("active", i === activeIndex);
                });
                sidebar.classList.toggle("active", activeIndex !== -1);
            };

            // A 1px-tall observation band at exactly the sticky trigger
            // line, created via rootMargin. At most one item overlaps this
            // band at a time, so intersection changes map directly onto
            // "which card should be active right now".
            const io = new IntersectionObserver(updateFromEntries, {
                rootMargin: `-${TRIGGER_LINE}px 0px -${Math.max(window.innerHeight - TRIGGER_LINE - 1, 0)}px 0px`,
                threshold: 0,
            });
            // observe() itself triggers an initial callback reporting each
            // element's true current intersection state, so the work
            // section renders correctly even when the page loads already
            // scrolled partway through it (e.g. arriving via #work) - no
            // separate manual "run once" call is needed.
            items.forEach((item) => io.observe(item.el));
            cleanups.push(() => io.disconnect());

            const onAnchorClick = (e: Event) => {
                isClickScrolling = true;
                if (clickScrollTimer) clearTimeout(clickScrollTimer);

                // Special case: navigating to #home should ALWAYS show the
                // profile card immediately - don't wait for the observer to
                // catch up, since updates are suppressed below while
                // isClickScrolling is true (which would otherwise leave the
                // sidebar stuck hidden after a nav-panel jump).
                const target = e.currentTarget as HTMLAnchorElement;
                const href = target?.getAttribute("href");
                if (href === "#home" || href === "#") {
                    items.forEach((item) => item.wrap.classList.remove("active"));
                    sidebar.classList.remove("active");
                    intersecting.clear();
                }

                clickScrollTimer = setTimeout(() => {
                    isClickScrolling = false;
                    // Safety net: re-sync in case the destination wasn't #home
                    // but the click still happened while inside the work range.
                    // Re-derive from each item's actual current position rather
                    // than trusting stale intersection state accumulated while
                    // updates were suppressed.
                    intersecting.clear();
                    items.forEach((item, i) => {
                        const rect = item.el.getBoundingClientRect();
                        if (rect.top <= TRIGGER_LINE && rect.bottom > TRIGGER_LINE) {
                            intersecting.add(i);
                        }
                    });
                    let resynced = -1;
                    items.forEach((_, i) => {
                        if (intersecting.has(i)) resynced = i;
                    });
                    items.forEach((item, i) => {
                        item.wrap.classList.toggle("active", i === resynced);
                    });
                    sidebar.classList.toggle("active", resynced !== -1);
                }, 800);
            };
            const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
            anchors.forEach((a) => a.addEventListener("click", onAnchorClick));
            cleanups.push(() =>
                anchors.forEach((a) => a.removeEventListener("click", onAnchorClick))
            );

            /* Reliability fix: portrait images inside each .wrap can finish loading
               after the initial ScrollTrigger calculation, shifting document height
               and desyncing trigger points. Watch the work-list for size changes
               and refresh ScrollTrigger whenever it settles. */
            const workList = document.querySelector(".work-list");
            if (workList && "ResizeObserver" in window) {
                let resizeDebounce: ReturnType<typeof setTimeout> | null = null;
                const ro = new ResizeObserver(() => {
                    if (resizeDebounce) clearTimeout(resizeDebounce);
                    resizeDebounce = setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 150);
                });
                ro.observe(workList);
                cleanups.push(() => {
                    ro.disconnect();
                    if (resizeDebounce) clearTimeout(resizeDebounce);
                });
            }
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
                    scrollTrigger: {
                        trigger: ".gsap-anime-2",
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });
                tl.to(cards, {
                    x: centerX,
                    y: centerY,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                }).to(cards, {
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
                        if (i === 0) return centerY - 150;
                        if (i === 1) return centerY - 90;
                        if (i === 2) return centerY - 30;
                        if (i === 3) return centerY + 30;
                        if (i === 4) return centerY + 90;
                        if (i === 5) return centerY + 150;
                        return centerY;
                    },
                    rotation: -10,
                    rotateX: 4,
                    rotateY: 10,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.3,
                });
            };
            animateFlip();
            let flipResizeDebounce: ReturnType<typeof setTimeout> | null = null;
            const onResize = () => {
                if (flipResizeDebounce) clearTimeout(flipResizeDebounce);
                flipResizeDebounce = setTimeout(() => {
                    gsap.killTweensOf(".flip-image");
                    animateFlip();
                }, 150);
            };
            window.addEventListener("resize", onResize);
            cleanups.push(() => {
                window.removeEventListener("resize", onResize);
                if (flipResizeDebounce) clearTimeout(flipResizeDebounce);
            });
        }

        /* ---------------- Draw SVG scribble (replays every time #home is visible) ---------------- */
        if (document.querySelector(".scribble-wrap")) {
            const path = document.getElementById(
                "scribblePath",
            ) as unknown as SVGPathElement | null;
            const svg = document.querySelector<HTMLElement>(".scribble");
            if (path && svg) {
                const len = path.getTotalLength();
                svg.style.setProperty("--len", String(len));

                let replayTimer: ReturnType<typeof setTimeout> | null = null;
                let wasVisible = false;

                const triggerReplay = () => {
                    if (replayTimer) clearTimeout(replayTimer);
                    svg.classList.remove("is-drawn");
                    void svg.offsetWidth; // force reflow so removal is committed
                    replayTimer = setTimeout(() => {
                        svg.classList.add("is-drawn");
                    }, 30);
                };

                // Use scroll position to detect every entry into the home section
                const homeSection = document.getElementById("home");
                if (homeSection) {
                    const io = new IntersectionObserver(
                        ([entry]) => {
                            if (entry.isIntersecting && !wasVisible) {
                                wasVisible = true;
                                triggerReplay();
                            } else if (!entry.isIntersecting) {
                                wasVisible = false;
                            }
                        },
                        { threshold: 0.15 },
                    );
                    io.observe(homeSection);
                    cleanups.push(() => io.disconnect());
                }

                // Also handle nav anchor clicks to #home
                const homeAnchors = document.querySelectorAll<HTMLAnchorElement>(
                    'a[href="#home"], a[href="#"], [data-nav="home"]'
                );
                const onHomeClick = () => {
                    setTimeout(triggerReplay, 400);
                };
                homeAnchors.forEach((a) => a.addEventListener("click", onHomeClick));
                cleanups.push(() =>
                    homeAnchors.forEach((a) => a.removeEventListener("click", onHomeClick))
                );

                // Trigger once on load
                triggerReplay();

                cleanups.push(() => {
                    if (replayTimer) clearTimeout(replayTimer);
                });
            }
        }

        /* ---------------- Counter ---------------- */
        const counterEls = document.querySelectorAll<HTMLElement>(".counter");
        if (
            document.body.classList.contains("counter-scroll") &&
            counterEls.length
        ) {
            const started = new WeakSet<HTMLElement>();
            const animateNumbers = (root: HTMLElement) => {
                root.querySelectorAll<HTMLElement>(".number").forEach(
                    (numEl) => {
                        const to = parseFloat(numEl.dataset.to || "0");
                        const speed = parseFloat(numEl.dataset.speed || "1000");
                        const obj = { v: 0 };
                        gsap.to(obj, {
                            v: to,
                            duration: speed / 1000,
                            ease: "power1.out",
                            onUpdate: () => {
                                numEl.textContent = String(Math.round(obj.v));
                            },
                        });
                    },
                );
            };
            counterEls.forEach((el) => {
                const t = ScrollTrigger.create({
                    trigger: el,
                    start: "top 95%",
                    once: true,
                    onEnter: () => {
                        if (started.has(el)) return;
                        started.add(el);
                        animateNumbers(el);
                    },
                });
                triggers.push(t);
            });
        }

        /* ---------------- Text-rotate circular text ---------------- */
        document
            .querySelectorAll<HTMLElement>(".text-rotate .text")
            .forEach((circularText) => {
                const text = "Product Designer · UI/UX Designer · Graphic Designer · UK · ";
                const chars = text.split("");
                const degree = 360 / chars.length;
                circularText.innerHTML = "";
                chars.forEach((char, i) => {
                    const span = document.createElement("span");
                    span.textContent = char;
                    span.style.transform = `rotate(${i * degree}deg)`;
                    circularText.appendChild(span);
                });
            });

        /* ---------------- Active Class for intro title spans ---------------- */
        const introSpans =
            document.querySelectorAll<HTMLElement>(".intro-title span");
        const runCheckActive = () => {
            introSpans.forEach((el) => {
                if (el.classList.contains("active")) return;
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                    setTimeout(() => el.classList.add("active"), 300);
                }
            });
        };
        let checkActiveTicking = false;
        const checkActive = () => {
            if (checkActiveTicking) return;
            checkActiveTicking = true;
            requestAnimationFrame(() => {
                checkActiveTicking = false;
                runCheckActive();
            });
        };
        if (introSpans.length) {
            window.addEventListener("scroll", checkActive, { passive: true });
            runCheckActive();
            cleanups.push(() =>
                window.removeEventListener("scroll", checkActive),
            );
        }

        /* ---------------- Wrap Active (.wrap-hover-award) ---------------- */
        const wrapAwards =
            document.querySelectorAll<HTMLElement>(".wrap-hover-award");
        const runScrollWrap = () => {
            wrapAwards.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const inView = rect.bottom > 0 && rect.top < window.innerHeight;
                el.classList.toggle("active", inView);
            });
        };
        let scrollWrapTicking = false;
        const onScrollWrap = () => {
            if (scrollWrapTicking) return;
            scrollWrapTicking = true;
            requestAnimationFrame(() => {
                scrollWrapTicking = false;
                runScrollWrap();
            });
        };
        if (wrapAwards.length) {
            window.addEventListener("scroll", onScrollWrap, { passive: true });
            runScrollWrap();
            cleanups.push(() =>
                window.removeEventListener("scroll", onScrollWrap),
            );
        }

        /* ---------------- Scroll-link active highlight (mobile menu only) ----------------
           The desktop sidebar's nav links are already actively managed by
           DesktopSidebar's own React state (activeHref) with its own scroll
           listener. This vanilla-JS highlighter used to ALSO target those
           same elements via a completely different position formula - two
           independent systems fighting to set the same "active" class on
           the same DOM nodes, which produces flickering/inconsistent nav
           highlighting. Scoped to the mobile menu only, where nothing else
           manages this and there's no conflict. */
        const scrollLinks = document.querySelectorAll<HTMLAnchorElement>(
            ".nav-mobile-item a.scroll-link",
        );
        const runScrollLink = () => {
            scrollLinks.forEach((a) => {
                const href = a.getAttribute("href");
                if (!href || href === "#") return;
                const target = document.querySelector<HTMLElement>(href);
                if (!target) return;
                const rect = target.getBoundingClientRect();
                const scrollPos = window.scrollY;
                const top = scrollPos + rect.top;
                const bottom = top + target.offsetHeight;
                if (scrollPos < bottom - 20 && scrollPos >= top - 20)
                    a.classList.add("active");
                else a.classList.remove("active");
            });
        };
        let scrollLinkTicking = false;
        const onScrollLink = () => {
            if (scrollLinkTicking) return;
            scrollLinkTicking = true;
            requestAnimationFrame(() => {
                scrollLinkTicking = false;
                runScrollLink();
            });
        };
        if (scrollLinks.length) {
            document.addEventListener("scroll", onScrollLink, { passive: true });
            runScrollLink();
            cleanups.push(() =>
                document.removeEventListener("scroll", onScrollLink),
            );
        }

        /* ---------------- Hover cursor img ---------------- */
        const hoverEls =
            document.querySelectorAll<HTMLElement>(".hover-cursor-img");
        const hoverHandlers: Array<[HTMLElement, (e: Event) => void, string]> =
            [];
        hoverEls.forEach((el) => {
            const img = el.querySelector<HTMLElement>(".hover-image");
            if (!img) return;
            const onMove = (e: MouseEvent) => {
                img.style.top = e.clientY + 20 + "px";
                img.style.left = e.clientX + 20 + "px";
            };
            const onEnter = () => {
                img.style.transform = "scale(1)";
                img.style.opacity = "1";
            };
            const onLeave = () => {
                img.style.transform = "scale(0)";
                img.style.opacity = "0";
            };
            el.addEventListener("mousemove", onMove);
            el.addEventListener("mouseenter", onEnter);
            el.addEventListener("mouseleave", onLeave);
            hoverHandlers.push([
                el,
                onMove as unknown as (e: Event) => void,
                "mousemove",
            ]);
            hoverHandlers.push([el, onEnter, "mouseenter"]);
            hoverHandlers.push([el, onLeave, "mouseleave"]);
        });
        cleanups.push(() =>
            hoverHandlers.forEach(([el, fn, type]) =>
                el.removeEventListener(type, fn),
            ),
        );

        /* ---------------- Refresh ScrollTrigger after layout settles ---------------- */
        // Match the original template exactly: one simple timeout.
        // The previous complex setup (visualViewport listener, image load
        // listeners, orientationchange) was fighting Lenis's scroll event
        // pipeline and causing ScrollTrigger to recalculate trigger positions
        // at wrong moments on mobile - making animations appear to never fire.
        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
        cleanups.push(() => clearTimeout(refreshTimer));

        return () => {
            cleanups.forEach((fn) => fn());
            triggers.forEach((t) => t.kill());
            splitInstances.forEach((s) => s.revert());
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);
}
