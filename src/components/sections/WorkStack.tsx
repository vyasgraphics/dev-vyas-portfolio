"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { works } from "@/data/works";
import { smoothScrollTo } from "@/lib/smoothScroll";

// Selected Work as a tilt stack: one sticky stage, the three projects as full
// cards that slide up tilted, land flat, then tip back and shrink as the next
// one lands on top. Ported from a reference component Dev supplied, with
// these deliberate changes so it fits this site rather than the reference's:
//
// - No ScrollTrigger and no gsap.registerPlugin. Plugins are registered in
//   exactly one place (useScrollAnimations.ts), and this slot has a history
//   of ScrollTrigger caching start/end positions before the page above it has
//   finished changing height (see WorkCta.tsx). Progress is read from the
//   track's LIVE getBoundingClientRect() on every scroll frame instead, so
//   nothing can go stale. Lenis fires native scroll events, so a plain scroll
//   listener covers both desktop (Lenis) and mobile (native scroll).
// - No snap. ScrollTrigger's snap scrolls the window behind Lenis's back and
//   the two fight over the position on the next wheel tick.
// - No mount-time intro timeline. This section sits several screens down the
//   page, so an intro on mount would play where nobody can see it. Card 1's
//   entrance is scroll-linked instead: it lands as the stage scrolls into view,
//   and reverses on the way back up like every other section here.
// - The section keeps the site's own heading block (tag, h2, intro line), the
//   project content comes from src/data/works.ts, and the CTA is the site's
//   existing .tf-btn-action. Every project's write-up now lives inside its own
//   card, so the old desktop swap (project details taking over the profile
//   card's fixed left slot) no longer runs: with no .sticky-item on the page,
//   useScrollAnimations' sidebar toggle never engages and the profile card
//   simply stays put.
// - "Back to Work" still lands on the project that was opened: each project
//   has an invisible #work-item-<slug> marker placed at exactly the scroll
//   position where its card has landed (see the marker maths below).

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const pad2 = (n: number) => (n < 10 ? "0" : "") + n;

type Pose = { y: number; scale: number; rx: number; rz: number; shade: number; opacity: number };

// Where card i sits when the scroll is at p (0 = first card landed, n-1 = last
// card landed). p runs from -1, where the stage is just entering the bottom of
// the viewport. y is a percentage of the card's own height.
function pose(p: number, i: number, reduced: boolean): Pose {
    const depth = clamp(p - i, 0, 3);
    if (i === 0) {
        // Card 1 has no card beneath it to land on, so it settles in place
        // as the stage arrives rather than sliding up from below the deck.
        const e = reduced ? 1 : easeOut(clamp(p + 1, 0, 1));
        if (reduced) return { y: 0, scale: 1, rx: 0, rz: 0, shade: Math.min(depth, 1) * 0.5, opacity: 1 };
        return {
            y: (1 - e) * 18 - depth * 2.4,
            scale: (1 - depth * 0.07) * (0.92 + 0.08 * e),
            rx: (1 - e) * 16 - depth * 9,
            rz: 0,
            shade: Math.min(depth, 2) * 0.34,
            opacity: 0.35 + 0.65 * e,
        };
    }
    const enter = clamp(p - (i - 1), 0, 1);
    if (reduced) {
        return { y: 0, scale: 1, rx: 0, rz: 0, shade: Math.min(depth, 1) * 0.5, opacity: enter };
    }
    const e = easeOut(enter);
    return {
        y: (1 - e) * 130 - depth * 2.4,
        scale: (1 - depth * 0.07) * (0.9 + 0.1 * e),
        rx: (1 - e) * 22 - depth * 9,
        rz: (1 - e) * (i % 2 ? 5 : -5),
        shade: Math.min(depth, 2) * 0.34,
        opacity: depth > 2.6 ? clamp((3 - depth) / 0.4, 0, 1) : 1,
    };
}

const toTransform = (q: Pose) =>
    "translate3d(0," + q.y.toFixed(3) + "%,0) perspective(1400px) rotateX(" + q.rx.toFixed(3) +
    "deg) rotateZ(" + q.rz.toFixed(3) + "deg) scale(" + q.scale.toFixed(4) + ")";

export function WorkStack() {
    const n = works.length;
    const trackRef = useRef<HTMLDivElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const nowRef = useRef<HTMLSpanElement | null>(null);
    const segRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const progressRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        const stage = stageRef.current;
        if (!track || !stage) return;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        let reduced = mq.matches;
        let lastIdx = -1;
        let frame = 0;

        const paint = () => {
            frame = 0;
            const tr = track.getBoundingClientRect();
            const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
            const step = (tr.height - stage.offsetHeight) / Math.max(n - 1, 1);
            if (step <= 0) return;
            const p = clamp((stickyTop - tr.top) / step, -1, n - 1);
            progressRef.current = p;

            for (let i = 0; i < n; i++) {
                const el = cardRefs.current[i];
                if (!el) continue;
                const q = pose(p, i, reduced);
                el.style.transform = toTransform(q);
                el.style.opacity = String(q.opacity);
                const sh = shadeRefs.current[i];
                if (sh) sh.style.opacity = String(q.shade);
            }

            const idx = clamp(Math.round(p), 0, n - 1);
            if (idx !== lastIdx) {
                lastIdx = idx;
                if (nowRef.current) nowRef.current.textContent = pad2(idx + 1);
                segRefs.current.forEach((s, j) => s?.classList.toggle("is-active", j === idx));
                // Only the card on top takes pointer input, so a half-hidden
                // card underneath can never swallow a click meant for the
                // one in view.
                cardRefs.current.forEach((c, j) => c?.classList.toggle("is-current", j === idx));
            }
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(paint);
        };

        const onMotionChange = () => {
            reduced = mq.matches;
            schedule();
        };

        paint();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        mq.addEventListener("change", onMotionChange);
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            mq.removeEventListener("change", onMotionChange);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [n]);

    // Keyboard: a card that has not landed yet sits below the deck, clipped
    // by the stage, so tabbing to its link would put focus somewhere nobody
    // can see. Bring that card into place first. This is an instant jump,
    // not an animated scroll: the browser runs its own scroll-into-view for
    // the focused link at the same moment, and an animated Lenis scroll
    // racing that ended up hundreds of pixels off. One frame later, after
    // the browser's scroll, a single immediate jump to the marker wins.
    const onCardFocus = (i: number) => {
        if (Math.round(progressRef.current) === i) return;
        const marker = document.getElementById(`work-item-${works[i].slug}`);
        if (!marker) return;
        requestAnimationFrame(() => smoothScrollTo(marker, { immediate: true }));
    };

    return (
        <div id="work" className="section-work vg-stack-section flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-high-light" />
                Selected Work
            </div>
            <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
                What I have built <br />
                and what changed as a result
            </h2>
            <p className="s-desc text-black-56 scrolling-effect effectTop" style={{ marginBottom: "1rem", maxWidth: "640px" }}>
                One project per pillar: a product designed, tested and iterated end to end, a quantitative HCI study that measured a hidden cost, and six years of self-directed brand and motion work. Start anywhere.
            </p>

            <div
                ref={trackRef}
                className="vg-stack-track"
                style={{ ["--vg-stack-count" as string]: n }}
            >
                {/* Scroll markers for "Back to Work". Restoration scrolls the
                    marker to the very top of the viewport; card i has landed
                    when the track top sits i stage-heights above the stage's
                    own sticky line, so the marker goes at i * stage height
                    minus that sticky offset. */}
                {works.map((w, i) => (
                    <span
                        key={w.slug}
                        id={`work-item-${w.slug}`}
                        className="vg-stack-anchor"
                        aria-hidden="true"
                        style={{ top: `calc(var(--vg-stack-h) * ${i} - var(--vg-stack-top))` }}
                    />
                ))}

                <div ref={stageRef} className="vg-stack-stage">
                    <div className="vg-stack-head vg-work-progress" aria-hidden="true">
                        <span className="vg-work-progress-count">
                            <span ref={nowRef} className="vg-work-progress-now">01</span>
                            <span className="vg-work-progress-total">/ {pad2(n)}</span>
                        </span>
                        <span className="vg-work-progress-track">
                            {works.map((w, j) => (
                                <span
                                    key={w.slug}
                                    ref={(el) => {
                                        segRefs.current[j] = el;
                                    }}
                                    className={"vg-work-progress-seg" + (j === 0 ? " is-active" : "")}
                                />
                            ))}
                        </span>
                    </div>

                    <div className="vg-stack-deck">
                        {works.map((w, i) => (
                            <article
                                key={w.slug}
                                ref={(el) => {
                                    cardRefs.current[i] = el;
                                }}
                                className={"vg-stack-card" + (i === 0 ? " is-current" : "")}
                                style={{ zIndex: i + 1 }}
                                aria-label={`Project ${i + 1} of ${n}: ${w.title}`}
                                onFocus={() => onCardFocus(i)}
                            >
                                {/* One landscape image for every size. Tall
                                    cards show it as a band across the top
                                    rather than cropping it to fill (see
                                    styles.css). */}
                                <div className="vg-stack-media">
                                    <Image
                                        src={w.image}
                                        alt=""
                                        fill
                                        sizes="(min-width: 992px) 60vw, 100vw"
                                        className="vg-stack-img"
                                    />
                                </div>

                                <div className="vg-stack-body">
                                    <div className="vg-stack-top">
                                        <span className="vg-stack-num" aria-hidden="true">{pad2(i + 1)}</span>
                                        <span className="vg-stack-kick">{w.industry}</span>
                                    </div>

                                    <div className="vg-stack-bottom">
                                        <div className="vg-stack-copy">
                                            <h3 className="vg-stack-title letter-space--2">{w.title}</h3>
                                            {w.impact && <p className="vg-stack-impact">{w.impact}</p>}
                                            <p className="vg-stack-desc">{w.description}</p>
                                            <ul className="vg-stack-tags">
                                                {w.tags.map((t) => (
                                                    <li key={t}>{t}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="vg-stack-side">
                                            <dl className="vg-stack-meta">
                                                <div>
                                                    <dt>Year</dt>
                                                    <dd>{w.year}</dd>
                                                </div>
                                                <div>
                                                    <dt>Platform</dt>
                                                    <dd>{w.platform}</dd>
                                                </div>
                                                <div>
                                                    <dt>Role</dt>
                                                    <dd>{w.role}</dd>
                                                </div>
                                            </dl>
                                            <Link
                                                href={w.link ?? "#"}
                                                className="tf-btn-action vg-stack-cta"
                                                onClick={() => {
                                                    sessionStorage.setItem("lastWorkItemSlug", w.slug);
                                                }}
                                            >
                                                <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
                                                <span className="text text-body-3 letter-space--05 fw-medium">View case study</span>
                                                <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="vg-stack-shade"
                                    ref={(el) => {
                                        shadeRefs.current[i] = el;
                                    }}
                                />
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
