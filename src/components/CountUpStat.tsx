"use client";

import { useEffect, useRef, useState } from "react";

// Count-up for the Results band figures on the case study pages, matching
// the hero counters on the homepage (see the ".counter" block in
// useScrollAnimations.ts): ease out to the target, then a small scale-pop
// on landing so the number resolves with a beat rather than just stopping.
//
// Deliberately plain rAF rather than GSAP. The homepage counters get GSAP
// for free because HomeShell already loads it for a dozen other things;
// these pages do not, and pulling the whole library in for one tween would
// be a poor trade. The easing below is the quadratic ease-out that
// GSAP's power1.out resolves to, so the two feel identical side by side.
//
// Re-runs on every mount, which is what "animate each time you open a
// project" means here: each case study is its own route, so arriving at
// one mounts this fresh.
//
// Values arrive as strings because they are not all plain integers -
// "20+" carries a suffix, and the suffix must stay put while the digits
// count. Anything with no leading number at all is rendered verbatim and
// never animated.
const DURATION_MS = 1100;

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

export function CountUpStat({ value }: { value: string }) {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value.trim());
  const targetNum = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  // Start already-settled when there is nothing to animate (or when the
  // user has asked for reduced motion, handled in the effect) so the real
  // figure is never withheld from anyone.
  const [display, setDisplay] = useState<string>(targetNum === null ? value : `0${suffix}`);
  const [popped, setPopped] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (targetNum === null) return;

    const settle = () => {
      setDisplay(`${targetNum.toFixed(decimals)}${suffix}`);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let startedAt = 0;
    let cancelled = false;

    const step = (now: number) => {
      if (cancelled) return;
      if (!startedAt) startedAt = now;
      const t = Math.min((now - startedAt) / DURATION_MS, 1);
      const v = targetNum * easeOutQuad(t);
      setDisplay(`${v.toFixed(decimals)}${suffix}`);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        settle();
        setPopped(true);
      }
    };

    // Only count once the figure is actually on screen. These sit high on
    // the page so it usually fires immediately, but on a narrow viewport
    // the third tile can start below the fold, and a number that finished
    // counting before it was ever seen is just a number.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [targetNum, suffix, decimals]);

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        // Grows in place beside the left-aligned label rather than
        // drifting right, same choice as the homepage counters.
        transformOrigin: "left center",
        transform: popped ? "scale(1)" : undefined,
        animation: popped ? "vg-count-pop 0.24s ease-out" : undefined,
      }}
    >
      {display}
    </span>
  );
}
