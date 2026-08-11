"use client";

import { motion, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import type { RefObject } from "react";

// A scroll-driven, multi-phase intro sequence, sitting before the real
// homepage content. Adapted from a reference demo the person supplied (an
// icon-cascade that converges and docks into an inline sentence, whose
// words then reveal in a non-sequential order) - restructured here rather
// than ported directly, for two reasons:
//
// 1. The reference pins its section with GSAP ScrollTrigger's `pin: true`.
//    This site's welcome screen instead uses a `position: sticky` track
//    driven by Framer Motion's scroll progress (see targetRef/scrollYProgress
//    below), and HomeShell shares that exact same progress value to fade in
//    the nav sidebar and profile card the instant this stage finishes.
//    GSAP's pin inserts its own spacer element into the DOM to hold the
//    pin, which would change the geometry HomeShell measures against and
//    risks desyncing that chrome fade-in in ways that are hard to catch
//    without live testing. Kept the existing sticky + Framer Motion
//    foundation instead and built the staged choreography inside it.
// 2. The reference flies cloned icon DOM nodes to computed pixel positions
//    inside a paragraph (getBoundingClientRect deltas, recomputed per
//    frame). That's precise but brittle across viewport sizes and text
//    reflow - exactly the kind of thing this project has been burned by
//    before (see the offsetTop/getBoundingClientRect notes elsewhere in
//    this codebase). Replaced with a crossfade: the four icons cascade in
//    as a group, then hand off to the same four icons rendered inline
//    within the sentence from the start, each paired with its phrase and
//    revealed together. Same narrative beat (icons become part of a
//    sentence), no rect-chasing.
//
// The random-order text reveal - the reference's most distinctive, and
// most safely replicable, idea - is kept faithfully: segments stay in
// natural reading order in the DOM (so screen readers get the sentence
// correctly), but the scroll-progress window each one starts revealing in
// follows a fixed, deliberately non-sequential order rather than a
// runtime Math.random() shuffle - same lively effect, zero risk of an
// SSR/client hydration mismatch.
//
// Colours/theme: dark background throughout, matching this site's locked
// theme - no light-background crossfade like the reference has, since a
// light phase would violate that.
//
// Font: title/kicker uses Google's "Tomorrow" typeface, loaded via
// runtime @import scoped to this component's own <style> block (see the
// long-standing note on this - next/font/google needs to fetch from
// Google at build time, which isn't reachable in this sandboxed build
// environment, so it degrades to a runtime fetch instead, which works
// fine on the actual Vercel deployment).

type Segment = {
  icon: string;
  phrase: string;
};

// The four disciplines, each paired with an icon already used for the
// exact same concept elsewhere on this site (see data/disciplines.ts) -
// reusing that mapping rather than inventing a new one.
const SEGMENTS: Segment[] = [
  { icon: "icon-service", phrase: "Four years shaping products," },
  { icon: "icon-user-circle", phrase: "backed by real user research," },
  { icon: "icon-high-light", phrase: "sharpened by a graphic designer's eye," },
  { icon: "icon-edu", phrase: "and brought to life with motion." },
];

// Fixed "feels random" reveal order (positions into SEGMENTS), not a
// runtime shuffle - see the hydration note above.
const REVEAL_ORDER = [2, 0, 3, 1];

function CascadeIcon({
  iconClass,
  index,
  scrollYProgress,
  groupScale,
  reduceMotion,
}: {
  iconClass: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  groupScale: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = index * 0.05;
  const opacity = useTransform(scrollYProgress, [start, start + 0.15], reduceMotion ? [1, 1] : [0, 1]);
  const y = useTransform(scrollYProgress, [start, start + 0.15], reduceMotion ? [0, 0] : [24, 0]);

  return (
    <motion.div
      className="vg-welcome-cascade-icon"
      style={{ opacity: reduceMotion ? 1 : opacity, y: reduceMotion ? 0 : y, scale: groupScale }}
      aria-hidden
    >
      <i className={`icon ${iconClass}`} />
    </motion.div>
  );
}

function TaglineSegment({
  segment,
  revealIndex,
  scrollYProgress,
  reduceMotion,
}: {
  segment: Segment;
  revealIndex: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const windowStart = 0.5 + revealIndex * 0.1;
  const windowEnd = windowStart + 0.07;
  const opacity = useTransform(scrollYProgress, [windowStart, windowEnd], reduceMotion ? [1, 1] : [0, 1]);
  const y = useTransform(scrollYProgress, [windowStart, windowEnd], reduceMotion ? [0, 0] : [10, 0]);

  return (
    <motion.span
      className="vg-welcome-segment"
      style={{ opacity: reduceMotion ? 1 : opacity, y: reduceMotion ? 0 : y }}
    >
      <i className={`icon ${segment.icon}`} aria-hidden />
      {segment.phrase}
    </motion.span>
  );
}

export function WelcomeReveal({
  targetRef,
  scrollYProgress,
}: {
  targetRef: RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
}) {
  const reduceMotion = !!useReducedMotion();

  // Kicker label - present from the first frame, simple fade, no per-letter
  // animation (that complexity now belongs to the icon/tagline sequence).
  const kickerOpacity = useTransform(scrollYProgress, [0, 0.12], reduceMotion ? [1, 1] : [0, 1]);

  // Cascade group: converges (scales down slightly) as it hands off to the
  // tagline, rather than flying anywhere - see the top-of-file note.
  const cascadeGroupOpacity = useTransform(scrollYProgress, [0.3, 0.44], reduceMotion ? [0, 0] : [1, 0]);
  const cascadeGroupScale = useTransform(scrollYProgress, [0.3, 0.48], reduceMotion ? [1, 1] : [1, 0.72]);

  // Tagline container fades in slightly before the cascade group is fully
  // gone, so the handoff reads as a crossfade rather than a gap.
  const taglineOpacity = useTransform(scrollYProgress, [0.36, 0.5], reduceMotion ? [1, 1] : [0, 1]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.8, 0.95], reduceMotion ? [1, 1, 1] : [1, 1, 0]);
  const stageOpacity = useTransform(scrollYProgress, [0.85, 1], reduceMotion ? [1, 1] : [1, 0]);

  return (
    <div
      ref={targetRef}
      className="vg-welcome-track"
      style={reduceMotion ? { height: "auto" } : undefined}
    >
      <motion.div
        className="vg-welcome-stage"
        style={{
          opacity: stageOpacity,
          position: reduceMotion ? "relative" : "sticky",
          height: reduceMotion ? "auto" : "100vh",
        }}
      >
        <motion.p className="vg-welcome-kicker" style={{ opacity: reduceMotion ? 1 : kickerOpacity }}>
          Dev Vyas
        </motion.p>

        <div className="vg-welcome-content">
          <motion.div
            className="vg-welcome-cascade"
            style={{ opacity: reduceMotion ? 0 : cascadeGroupOpacity, pointerEvents: "none" }}
            aria-hidden
          >
            {SEGMENTS.map((s, i) => (
              <CascadeIcon
                key={s.icon}
                iconClass={s.icon}
                index={i}
                scrollYProgress={scrollYProgress}
                groupScale={cascadeGroupScale}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>

          <motion.p
            className="vg-welcome-tagline"
            style={{ opacity: reduceMotion ? 1 : taglineOpacity }}
          >
            {SEGMENTS.map((segment, i) => (
              <TaglineSegment
                key={segment.icon}
                segment={segment}
                revealIndex={REVEAL_ORDER.indexOf(i)}
                scrollYProgress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.p>
        </div>

        <motion.div className="vg-welcome-hint" style={{ opacity: hintOpacity }}>
          <span>Scroll to enter</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v16m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tomorrow:wght@700&display=swap');

        .vg-welcome-track {
          position: relative;
          height: 180vh;
          background: #0A0A0A;
        }
        .vg-welcome-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 24px;
          background: radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,222,81,0.08), transparent 70%), #0A0A0A;
        }
        .vg-welcome-kicker {
          position: absolute;
          top: clamp(28px, 6vh, 56px);
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          font-family: "Tomorrow", sans-serif;
          font-size: clamp(13px, 1.6vw, 16px);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .vg-welcome-content {
          position: relative;
          width: 100%;
          max-width: 900px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
        }
        .vg-welcome-cascade {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(16px, 4vw, 40px);
        }
        .vg-welcome-cascade-icon {
          width: clamp(52px, 8vw, 84px);
          height: clamp(52px, 8vw, 84px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,222,81,0.08);
          border: 1px solid rgba(0,222,81,0.25);
        }
        .vg-welcome-cascade-icon .icon {
          font-size: clamp(20px, 3vw, 32px);
          color: #00DE51;
        }
        .vg-welcome-tagline {
          position: relative;
          margin: 0;
          text-align: center;
          max-width: 760px;
          font-family: "Tomorrow", sans-serif;
          font-size: clamp(20px, 3.4vw, 34px);
          font-weight: 700;
          line-height: 1.5;
          color: #fff;
        }
        .vg-welcome-segment {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 6px;
          white-space: normal;
        }
        .vg-welcome-segment .icon {
          font-size: 0.55em;
          color: #00DE51;
          flex-shrink: 0;
        }
        .vg-welcome-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.45);
          font-size: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .vg-welcome-hint svg {
          animation: vg-welcome-bounce 1.6s ease-in-out infinite;
        }
        @keyframes vg-welcome-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .vg-welcome-track { height: auto; }
          .vg-welcome-stage { position: relative; height: auto; padding: 64px 24px; gap: 24px; }
          .vg-welcome-cascade { display: none; }
          .vg-welcome-content { min-height: 0; }
          .vg-welcome-hint svg { animation: none; }
        }
      `}</style>
    </div>
  );
}
