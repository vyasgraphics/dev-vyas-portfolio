"use client";

import { motion, useTransform, useReducedMotion, useMotionValue, type MotionValue } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";

// A scroll-driven, multi-phase intro sequence, sitting before the real
// homepage content. Follows the reference demo's actual structure and
// proportions closely this time (see git history for a first attempt that
// simplified too much and lost the reference's signature move):
//
//   0%   -15% : header (name + line) fades out
//   0%   -30% : four discipline icons cascade in, staggered
//   30%  -55% : icons converge toward centre and scale down
//   55%  -72% : icons fly to their real positions inline within the
//               tagline sentence (this is the part a first pass dropped -
//               rebuilt properly below)
//   72%  -84% : the tagline's phrase segments reveal in a non-sequential
//               order around the now-docked icons
//   85%  -100%: whole stage fades into the real homepage (fixed contract
//               with HomeShell - do not change these two numbers, see
//               below)
//
// Two deliberate departures from the reference, both explained inline
// where they apply: no GSAP pin (position: sticky already achieves the
// same "held in place while scrolling" effect this needs, without
// GSAP's spacer-injection risk to HomeShell's chrome-fade sync - see the
// fly-icon implementation below for how the reference's actual
// rect-to-rect flying is replicated without it), and no light-background
// crossfade (this site's dark theme is locked; the reference's colour
// shift becomes a brightening glow instead).
//
// Font: title/kicker uses Google's "Tomorrow" typeface, loaded via
// runtime @import scoped to this component's own <style> block (same
// long-standing reason as before: next/font/google needs to fetch from
// Google at build time, unreachable in this sandboxed build environment,
// so it degrades to a runtime fetch instead - works fine on Vercel).

type Segment = {
  icon: string;
  phrase: string;
};

// The four disciplines, each paired with an icon already used for the
// exact same concept elsewhere on this site (see data/disciplines.ts).
const SEGMENTS: Segment[] = [
  { icon: "icon-service", phrase: "Four years shaping products," },
  { icon: "icon-user-circle", phrase: "backed by real user research," },
  { icon: "icon-high-light", phrase: "sharpened by a graphic designer's eye," },
  { icon: "icon-edu", phrase: "and brought to life with motion." },
];

// Fixed "feels random" reveal order (positions into SEGMENTS), not a
// runtime shuffle - keeps this deterministic across server and client.
const REVEAL_ORDER = [2, 0, 3, 1];

const CASCADE_END = 0.3;
const CONVERGE_END = 0.55;
const FLY_END = 0.72;
const WORDS_START = 0.72;
const WORDS_END = 0.84;

// One persistent icon element per discipline, physically travelling from
// its cascade-row position to its docked position inline in the
// sentence - the reference achieves this by cloning a DOM node and
// animating the clone via getBoundingClientRect deltas; this does the
// same maths without cloning, by measuring two *marker* elements (one
// sitting where the cascade starts, one sitting where the icon should
// end up inline in the text) and driving a single fixed-position icon
// between them. Re-measures on resize so it stays correct across
// viewport sizes, rather than trusting one measurement taken at mount.
function FlyingIcon({
  iconClass,
  cascadeMarkerRefs,
  dockMarkerRefs,
  stageRef,
  index,
  scrollYProgress,
  reduceMotion,
}: {
  iconClass: string;
  cascadeMarkerRefs: RefObject<(HTMLDivElement | null)[]>;
  dockMarkerRefs: RefObject<(HTMLSpanElement | null)[]>;
  stageRef: RefObject<HTMLDivElement | null>;
  index: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const startX = useMotionValue(0);
  const startY = useMotionValue(0);
  const deltaX = useMotionValue(0);
  const deltaY = useMotionValue(0);
  const dockScale = useMotionValue(1);

  useEffect(() => {
    if (reduceMotion) return;

    function measure() {
      const cascadeEl = cascadeMarkerRefs.current[index];
      const dockEl = dockMarkerRefs.current[index];
      const stageEl = stageRef.current;
      if (!cascadeEl || !dockEl || !stageEl) return;

      const stageRect = stageEl.getBoundingClientRect();
      const cascadeRect = cascadeEl.getBoundingClientRect();
      const dockRect = dockEl.getBoundingClientRect();

      // Positions stored relative to the stage (the sticky-positioned
      // viewport-filling element), not the raw viewport - stage sits at
      // a fixed place once pinned by position:sticky, so this stays
      // correct as the user scrolls through the track.
      const cascadeCenterX = cascadeRect.left + cascadeRect.width / 2 - stageRect.left;
      const cascadeCenterY = cascadeRect.top + cascadeRect.height / 2 - stageRect.top;
      const dockCenterX = dockRect.left + dockRect.width / 2 - stageRect.left;
      const dockCenterY = dockRect.top + dockRect.height / 2 - stageRect.top;

      startX.set(cascadeCenterX);
      startY.set(cascadeCenterY);
      deltaX.set(dockCenterX - cascadeCenterX);
      deltaY.set(dockCenterY - cascadeCenterY);
      // Cascade icons render at ~60px; docked icons sit at text size
      // (~0.6em of the tagline's font size, roughly 18px at desktop
      // sizes) - scale factor computed from the actual measured marker
      // sizes rather than a guessed constant, so it holds up across the
      // tagline's clamp()-based responsive sizing too.
      const scaleFactor = dockRect.width > 0 && cascadeRect.width > 0
        ? dockRect.width / cascadeRect.width
        : 0.3;
      dockScale.set(scaleFactor);
    }

    measure();
    window.addEventListener("resize", measure);
    // One deferred re-measure: fonts/marker sizes can still settle a
    // frame or two after mount (webfont swap, layout not fully
    // stabilised yet), same class of timing issue this codebase has
    // hit before with late-settling layout.
    const t = setTimeout(measure, 250);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const opacity = useTransform(scrollYProgress, [index * 0.05, index * 0.05 + 0.15], reduceMotion ? [0, 0] : [0, 1]);

  const flyProgress = useTransform(scrollYProgress, [CONVERGE_END, FLY_END], reduceMotion ? [0, 0] : [0, 1]);
  const x = useTransform(flyProgress, (p) => startX.get() + deltaX.get() * p);
  const y = useTransform(flyProgress, (p) => startY.get() + deltaY.get() * p);
  const scale = useTransform(flyProgress, (p) => (reduceMotion ? 1 : 1 + (dockScale.get() - 1) * p));

  if (reduceMotion) return null;

  return (
    <motion.div className="vg-welcome-flying-icon" style={{ x, y, scale, opacity }} aria-hidden>
      <i className={`icon ${iconClass}`} />
    </motion.div>
  );
}

function CascadeMarker({
  markerRef,
  index,
  scrollYProgress,
  reduceMotion,
}: {
  markerRef: (el: HTMLDivElement | null) => void;
  index: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = index * 0.05;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.15, CONVERGE_END, CONVERGE_END + 0.08],
    reduceMotion ? [0, 0, 0, 0] : [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [start, start + 0.15], reduceMotion ? [0, 0] : [24, 0]);
  const scale = useTransform(scrollYProgress, [CONVERGE_END, CONVERGE_END + 0.08], reduceMotion ? [1, 1] : [1, 0.4]);

  return (
    <motion.div ref={markerRef} className="vg-welcome-cascade-marker" style={{ opacity, y, scale }} aria-hidden />
  );
}

function TaglineSegment({
  segment,
  revealIndex,
  dockMarkerRef,
  reduceMotion,
  scrollYProgress,
}: {
  segment: Segment;
  revealIndex: number;
  dockMarkerRef: (el: HTMLSpanElement | null) => void;
  reduceMotion: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const span = WORDS_END - WORDS_START;
  const windowStart = WORDS_START + revealIndex * (span / SEGMENTS.length);
  const windowEnd = windowStart + span / SEGMENTS.length - 0.01;
  const opacity = useTransform(scrollYProgress, [windowStart, windowEnd], reduceMotion ? [1, 1] : [0, 1]);
  const y = useTransform(scrollYProgress, [windowStart, windowEnd], reduceMotion ? [0, 0] : [8, 0]);

  return (
    <motion.span className="vg-welcome-segment" style={{ opacity: reduceMotion ? 1 : opacity, y: reduceMotion ? 0 : y }}>
      {/* Invisible marker reserving this icon's real inline position for
          FlyingIcon to measure against - and the actual visible icon
          once docked (see dockOpacity above, timed to this same
          moment). visibility:hidden (not display:none) so it still
          takes up layout space and is measurable. */}
      <span className="vg-welcome-dock-marker" ref={dockMarkerRef} aria-hidden>
        <i className={`icon ${segment.icon}`} />
      </span>
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
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cascadeMarkerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dockMarkerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.13], reduceMotion ? [1, 1] : [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.13], reduceMotion ? [0, 0] : [0, -30]);

  const taglineOpacity = useTransform(scrollYProgress, [FLY_END - 0.1, FLY_END - 0.02], reduceMotion ? [1, 1] : [0, 1]);

  // Glow intensifies through the converge phase - this site's stand-in
  // for the reference's dark-to-light background crossfade, since a
  // literal light phase would break the locked dark theme.
  const glowOpacity = useTransform(scrollYProgress, [0, CONVERGE_END], reduceMotion ? [1, 1] : [0.5, 1]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.78, 0.9], reduceMotion ? [1, 1, 1] : [1, 1, 0]);
  const stageOpacity = useTransform(scrollYProgress, [0.85, 1], reduceMotion ? [1, 1] : [1, 0]);

  return (
    <div ref={targetRef} className="vg-welcome-track" style={reduceMotion ? { height: "auto" } : undefined}>
      <motion.div
        ref={stageRef}
        className="vg-welcome-stage"
        style={{
          opacity: stageOpacity,
          position: reduceMotion ? "relative" : "sticky",
          height: reduceMotion ? "auto" : "100vh",
        }}
      >
        <motion.div className="vg-welcome-glow" style={{ opacity: reduceMotion ? 1 : glowOpacity }} aria-hidden />

        <motion.div className="vg-welcome-header" style={{ opacity: reduceMotion ? 1 : headerOpacity, y: reduceMotion ? 0 : headerY }}>
          <p className="vg-welcome-kicker">Dev Vyas</p>
          <p className="vg-welcome-subtitle">Product Designer &amp; UX Researcher</p>
        </motion.div>

        <div className="vg-welcome-content">
          <div className="vg-welcome-cascade-row" aria-hidden>
            {SEGMENTS.map((s, i) => (
              <CascadeMarker
                key={s.icon}
                markerRef={(el) => { cascadeMarkerRefs.current[i] = el; }}
                index={i}
                scrollYProgress={scrollYProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>

          <motion.p className="vg-welcome-tagline" style={{ opacity: reduceMotion ? 1 : taglineOpacity }}>
            {SEGMENTS.map((segment, i) => (
              <TaglineSegment
                key={segment.icon}
                segment={segment}
                revealIndex={REVEAL_ORDER.indexOf(i)}
                dockMarkerRef={(el) => { dockMarkerRefs.current[i] = el; }}
                reduceMotion={reduceMotion}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.p>
        </div>

        {/* Direct children of the stage, not .vg-welcome-content - the
            measurement math above computes every position relative to
            the stage's own bounding box, so the icons' positioning
            context has to match that, not the (differently offset,
            centred-within-the-stage) content box. */}
        {!reduceMotion && SEGMENTS.map((s, i) => (
          <FlyingIcon
            key={s.icon}
            iconClass={s.icon}
            cascadeMarkerRefs={cascadeMarkerRefs}
            dockMarkerRefs={dockMarkerRefs}
            stageRef={stageRef}
            index={i}
            scrollYProgress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        ))}

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
          height: 320vh;
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
        }
        .vg-welcome-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,222,81,0.14), transparent 70%), #0A0A0A;
          z-index: 0;
        }
        .vg-welcome-header {
          position: absolute;
          top: clamp(28px, 8vh, 72px);
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 1;
        }
        .vg-welcome-kicker {
          margin: 0;
          font-family: "Tomorrow", sans-serif;
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 700;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 0 60px rgba(0,222,81,0.3);
        }
        .vg-welcome-subtitle {
          margin: 8px 0 0;
          font-family: "Tomorrow", sans-serif;
          font-size: clamp(12px, 1.6vw, 15px);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00DE51;
        }
        .vg-welcome-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 900px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
        }
        .vg-welcome-cascade-row {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(16px, 4vw, 40px);
          pointer-events: none;
        }
        .vg-welcome-cascade-marker {
          width: clamp(52px, 8vw, 84px);
          height: clamp(52px, 8vw, 84px);
        }
        .vg-welcome-flying-icon {
          position: absolute;
          top: 0;
          left: 0;
          width: clamp(52px, 8vw, 84px);
          height: clamp(52px, 8vw, 84px);
          margin-top: calc(clamp(52px, 8vw, 84px) / -2);
          margin-left: calc(clamp(52px, 8vw, 84px) / -2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,222,81,0.1);
          border: 1px solid rgba(0,222,81,0.3);
          pointer-events: none;
          z-index: 2;
        }
        .vg-welcome-flying-icon .icon {
          font-size: clamp(20px, 3vw, 32px);
          color: #00DE51;
        }
        .vg-welcome-tagline {
          position: relative;
          margin: 0;
          text-align: center;
          max-width: 760px;
          font-family: "Tomorrow", sans-serif;
          font-size: clamp(22px, 3.6vw, 38px);
          font-weight: 700;
          line-height: 1.55;
          color: #fff;
        }
        .vg-welcome-segment {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 6px;
        }
        .vg-welcome-dock-marker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 0.75em;
          height: 0.75em;
          visibility: hidden;
        }
        .vg-welcome-dock-marker .icon {
          font-size: 0.6em;
          color: #00DE51;
        }
        .vg-welcome-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
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
          .vg-welcome-cascade-row { display: none; }
          .vg-welcome-header { position: relative; top: 0; transform: none; margin-bottom: 32px; }
          .vg-welcome-content { min-height: 0; padding: 0; }
          .vg-welcome-hint svg { animation: none; }
          /* FlyingIcon never renders in reduced motion (returns null) -
             the dock marker is the only thing left to show the icons,
             so it needs to actually be visible here rather than staying
             a hidden position marker. */
          .vg-welcome-dock-marker { visibility: visible; }
        }
      `}</style>
    </div>
  );
}
