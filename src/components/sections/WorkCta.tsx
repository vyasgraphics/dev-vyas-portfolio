"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { profile } from "@/data/profile";
import { HighlightCard } from "@/components/HighlightCard";

// Mid-page conversion point, sitting directly after the Selected Work grid.
//
// The contact section starts at roughly 83% of page depth, which means a
// reviewer who reads the three case studies and then stops - the single
// most likely drop-off point on the page - never reaches an ask. This
// catches them at ~35% instead, immediately after the strongest evidence
// they will see, rather than making conversion conditional on scrolling
// the whole page.
//
// Deliberately reuses .tf-btn-action and .action-down rather than inventing
// new button styles: the sidebar CTA and the work card CTAs already use them,
// so the ask here is the same size, shape and green as every other ask on the
// page. The card treatment around them changed; the buttons did not.

// Taken from src/data/disciplines.ts rather than written fresh, so the four
// shown here can never drift from the marquee in the hero that lists the same
// specialisms. Four is the count the layout is built around.
const SKILLS = [
    { id: "uiux", label: "UI / UX Design", className: "vg-cta-skill--a" },
    { id: "research", label: "User Research", className: "vg-cta-skill--b" },
    { id: "brand", label: "Brand Identity", className: "vg-cta-skill--c" },
    { id: "ai", label: "AI-Augmented Design", className: "vg-cta-skill--d" },
] as const;

// Matches the resting opacity the Illumine tech cards settle at. That value is
// a contrast floor, not a look - CLAUDE.md pins it at 0.66 - and these pills
// are the same kind of dimmed-until-highlighted label, so they honour it too
// rather than using the reference's 0.5.
const RESTING_OPACITY = 0.66;

export function WorkCta() {
    const stageRef = useRef<HTMLDivElement>(null);
    const pointerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    // The same materialize every other section settles in with - blur(6px)
    // contrast(2.1) at 0.45 opacity, resolving to sharp and solid - using
    // useSectionMaterialize's own numbers and its own 88%/48% viewport
    // thresholds, so this card arrives looking like part of the same page.
    //
    // Deliberately NOT done by adding this card to that hook's selector list,
    // and not with ScrollTrigger at all. Read the note in the JSX below: a
    // scroll reveal in this exact slot has already failed once, permanently
    // stranding the page's main mid-page ask at its invisible "from" state.
    // The cause is structural rather than a one-off - this card sits directly
    // after the Work section, whose sticky/fixed card mechanic changes the
    // page height AFTER ScrollTrigger has computed and cached its start and
    // end positions, so the trigger for anything in this slot can be pinned
    // to stale coordinates.
    //
    // Reading getBoundingClientRect() fresh on each scroll frame sidesteps
    // that entirely: there is nothing cached to go stale, which is also why
    // CLAUDE.md requires rect over offsetTop for scroll maths here. Just as
    // importantly, the failure mode is inverted - the blurred state only ever
    // exists because this effect put it there, so if the effect never runs,
    // never mounts, or throws, the card is simply fully visible, which is
    // exactly what it looks like today. The ask can no longer disappear.
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        let frame = 0;

        const update = () => {
            frame = 0;
            const rect = card.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const start = viewportHeight * 0.88;
            const end = viewportHeight * 0.48;
            const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

            if (progress >= 1) {
                // Cleared rather than set to blur(0px)/opacity(1). A filter of
                // any value, even a no-op one, keeps the card on its own
                // composited layer and keeps the particle canvas inside it
                // being re-filtered on every frame it draws - for the entire
                // rest of the visit, long after the effect has finished.
                card.style.filter = "";
                card.style.opacity = "";
                return;
            }

            const remaining = 1 - progress;
            card.style.filter = `blur(${6 * remaining}px) contrast(${1 + 1.1 * remaining})`;
            card.style.opacity = String(0.45 + 0.55 * progress);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
            card.style.filter = "";
            card.style.opacity = "";
        };
    }, []);

    useEffect(() => {
        const stage = stageRef.current;
        const pointer = pointerRef.current;
        if (!stage || !pointer) return;

        const tags = Array.from(stage.querySelectorAll<HTMLElement>("[data-skill]"));
        if (!tags.length) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            // No cycling pointer at all - every label simply reads at full
            // strength, which is the information the animation was conveying
            // one at a time anyway.
            gsap.set(tags, { opacity: 1 });
            gsap.set(pointer, { opacity: 0 });
            return;
        }

        let tl: gsap.core.Timeline | null = null;

        // Positions are MEASURED, never hardcoded. The reference animated the
        // pointer to fixed pixel coordinates (left: 200, top: 60, ...) chosen
        // for one 300x270 box, so at any other size the pointer drifts away
        // from the labels it is supposed to be picking out - which is every
        // size on a fluid page, phones especially. Measuring each pill and
        // rebuilding on resize keeps the pointer on target at every width,
        // and means the pill positions below can stay percentage-based.
        const build = () => {
            tl?.kill();
            gsap.set(tags, { opacity: RESTING_OPACITY });

            const stageRect = stage.getBoundingClientRect();
            if (!stageRect.width) return;

            tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });

            tags.forEach((tag) => {
                const r = tag.getBoundingClientRect();
                // Parked on the pill's lower edge, a quarter in from its left,
                // rather than at its centre. The arrow points up-left, so from
                // here it reads as a cursor resting ON the pill while the "Dev"
                // label hangs below it. Centring instead put the arrow and the
                // label directly over the pill's own text and cut the longer
                // labels in half ("Brand Ident...").
                const x = r.left - stageRect.left + r.width * 0.25;
                const y = r.bottom - stageRect.top + 2;

                tl!.to(pointer, { x, y, duration: 0.55 })
                    .to(tag, { opacity: 1, duration: 0.25 }, "<0.2")
                    .to(tag, { opacity: RESTING_OPACITY, duration: 0.25 }, "+=0.85");
            });
        };

        build();

        const resizeObserver = new ResizeObserver(build);
        resizeObserver.observe(stage);

        // A timeline set to repeat forever otherwise keeps ticking for the
        // whole visit, including while this card is nowhere near the screen.
        const intersectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) tl?.play();
                else tl?.pause();
            },
            { threshold: 0 }
        );
        intersectionObserver.observe(stage);

        return () => {
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            tl?.kill();
        };
    }, []);

    return (
        <div className="flat-spacing" style={{ paddingTop: 0 }}>
            {/* Deliberately NO scroll-reveal class here.
                This first carried .effectFade.fadeUp.no-div like the rest of the
                page, and it left the band stuck at its GSAP "from" state
                (opacity:0; visibility:hidden; translateY(50px)) permanently -
                confirmed by direct sampling, both after a cross-route restore and
                on ordinary top-to-bottom scrolling. It sits immediately after the
                Work section, whose sticky/fixed card mechanic reflows the page
                height after the ScrollTrigger start positions are computed, so
                the trigger for an element in this specific slot is not reliable.
                A decorative element failing to reveal is a cosmetic bug; the
                primary mid-page conversion point failing to reveal means the ask
                is simply absent. Always visible is the correct trade here. */}
            <HighlightCard cardRef={cardRef}>
                <div className="vg-cta-grid">
                    <div className="vg-cta-stage" ref={stageRef} aria-hidden="true">
                        {SKILLS.map((s) => (
                            <span
                                key={s.id}
                                data-skill={s.id}
                                className={`vg-cta-skill ${s.className}`}
                            >
                                {s.label}
                            </span>
                        ))}

                        <div className="vg-cta-pointer" ref={pointerRef}>
                            <svg width="17" height="18" viewBox="0 0 12 13" fill="var(--primary)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                                />
                            </svg>
                            <span className="vg-cta-pointer-label">Dev</span>
                        </div>
                    </div>

                    <div className="vg-cta-content">
                        <p className="vg-cta-title">Want to talk through any of this?</p>
                        <p className="vg-cta-desc text-body-3">
                            I&apos;m open to UK and remote roles from September 2026, and happy
                            to go deeper on any project here.
                        </p>
                        <div className="vg-cta-actions">
                            <a
                                href="#contact"
                                className="tf-btn-action"
                                onClick={(e) => {
                                    e.preventDefault();
                                    smoothScrollTo("#contact", { pushHistory: "#contact" });
                                }}
                            >
                                <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
                                <span className="text text-body-3 letter-space--05 fw-medium">Get in touch</span>
                                <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
                            </a>
                            {/* .action-down only picks up its flex/gap inside
                                .sidebar-user .action-group, so the layout is set
                                in the vg-cta-actions rule rather than widening
                                that selector for one extra use. */}
                            <a
                                href={profile.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-down"
                            >
                                <i className="icon icon-download" />
                                <span className="text-body-3">Download CV</span>
                            </a>
                        </div>
                    </div>
                </div>
            </HighlightCard>
        </div>
    );
}
