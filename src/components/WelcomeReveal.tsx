"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";

// A scroll-driven 3D perspective character reveal, sitting before the real
// homepage content. Adapted from a Skiper UI pattern (Skiper31): only the
// DEMO usage was provided (`npx shadcn add @skiper-ui/skiper31`, then
// `<CharacterV1 char index centerIndex scrollYProgress />`) - the actual
// CharacterV1 implementation wasn't included, and the install command
// itself isn't reachable from here (it fetches from Skiper UI's own
// registry domain, which isn't on this environment's allowed network list,
// and this project has no shadcn/Tailwind config for it to install into
// anyway - it's a custom Bootstrap + SCSS site). So this reconstructs the
// same technique from first principles with Framer Motion's useScroll/
// useTransform, rather than the exact library.
//
// The technique itself: a tall scroll track (WelcomeReveal below) with a
// `position: sticky` inner stage that stays pinned in the viewport while
// the track scrolls past underneath it. Each letter gets its own 3D
// transform (rotateX + a z-axis push via `perspective` on the parent),
// driven by scroll progress - letters further from the centre of the word
// start more dramatically rotated/displaced and land flat as progress
// reaches 1, so the word assembles itself in 3D space as you scroll,
// rather than just fading in.
//
// Colours: the reference used a light theme (#f5f4f3 bg, black text) -
// inverted here to the site's own dark background (#0a0a0a) with white
// text and the site's signature green (#00DE51) for the accent line/glow,
// matching every other component built across this project rather than
// introducing an unrelated light section at the very top of the page.

function Character({
  char,
  index,
  centerIndex,
  scrollYProgress,
  reduceMotion,
}: {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  // Distance from the centre character, normalised - outer letters get a
  // bigger starting displacement than inner ones, so the word visually
  // "closes in" from both ends as you scroll rather than every letter
  // moving by the same amount.
  const distance = Math.abs(index - centerIndex);
  const direction = index < centerIndex ? -1 : index > centerIndex ? 1 : 0;

  // useTransform still runs even when reduceMotion is true (hooks can't be
  // called conditionally) - but its OUTPUT range collapses to a constant
  // when reduced motion is on, so the letter never actually moves; only its
  // final resting values are ever produced.
  const rotateX = useTransform(scrollYProgress, [0, 0.6], reduceMotion ? [0, 0] : [distance * -35, 0]);
  const z = useTransform(scrollYProgress, [0, 0.6], reduceMotion ? [0, 0] : [-distance * 90, 0]);
  const x = useTransform(scrollYProgress, [0, 0.6], reduceMotion ? [0, 0] : [direction * distance * 14, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], reduceMotion ? [1, 1] : [0, 1]);

  return (
    <motion.span
      style={{
        display: "inline-block",
        rotateX,
        z,
        x,
        opacity,
        transformStyle: "preserve-3d",
      }}
    >
      {char}
    </motion.span>
  );
}

const TITLE = "DEV VYAS";
const TITLE_CENTER = Math.floor(TITLE.replace(/ /g, "").length / 2);

export function WelcomeReveal() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });

  // Subtitle and scroll-cue fade in only once the title has mostly
  // assembled, and the whole stage fades out right at the end so the
  // handoff into the real homepage content underneath doesn't feel like an
  // abrupt cut.
  const subtitleOpacity = useTransform(scrollYProgress, [0.45, 0.65], reduceMotion ? [1, 1] : [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.45, 0.65], reduceMotion ? [0, 0] : [16, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]);
  const stageOpacity = useTransform(scrollYProgress, [0.88, 1], reduceMotion ? [1, 1] : [1, 0]);

  // Skip non-letter characters (the space) when computing each letter's
  // position in the word for the centre-distance maths above, but still
  // render the space itself for correct word spacing.
  let letterIndex = -1;

  return (
    <div
      ref={targetRef}
      className="vg-welcome-track"
      // With reduced motion, nothing here is scroll-linked any more, so the
      // usual 200vh of scroll track + sticky pin would just be 2 empty
      // viewports someone has to scroll past for no reason. Collapse it to
      // a single normal-height section instead.
      style={reduceMotion ? { height: "auto" } : undefined}
    >
      <motion.div
        className="vg-welcome-stage"
        style={{
          opacity: stageOpacity,
          position: reduceMotion ? "relative" : "sticky",
          height: reduceMotion ? "70vh" : "100vh",
        }}
      >
        <div className="vg-welcome-inner" style={{ perspective: "700px" }}>
          <h1 className="vg-welcome-title" aria-label={TITLE}>
            {TITLE.split("").map((char, i) => {
              if (char === " ") return <span key={i} className="vg-welcome-space" aria-hidden />;
              letterIndex += 1;
              return (
                <Character
                  key={i}
                  char={char}
                  index={letterIndex}
                  centerIndex={TITLE_CENTER}
                  scrollYProgress={scrollYProgress}
                  reduceMotion={!!reduceMotion}
                />
              );
            })}
          </h1>

          <motion.p
            className="vg-welcome-subtitle"
            style={{ opacity: subtitleOpacity, y: subtitleY }}
          >
            Welcomes you
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
        .vg-welcome-track {
          position: relative;
          height: 200vh;
          background: #0a0a0a;
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
          background: radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,222,81,0.08), transparent 70%), #0a0a0a;
        }
        .vg-welcome-inner {
          text-align: center;
        }
        .vg-welcome-title {
          margin: 0;
          font-size: clamp(40px, 10vw, 108px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #fff;
          text-transform: uppercase;
          text-shadow: 0 0 60px rgba(0,222,81,0.25);
        }
        .vg-welcome-space {
          display: inline-block;
          width: 0.3em;
        }
        .vg-welcome-subtitle {
          margin: 14px 0 0;
          font-size: clamp(14px, 2vw, 18px);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #00DE51;
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
          .vg-welcome-stage { position: relative; height: 70vh; }
          .vg-welcome-hint svg { animation: none; }
        }
      `}</style>
    </div>
  );
}
