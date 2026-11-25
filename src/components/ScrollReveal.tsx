"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The homepage's "materialize" effect, for the case study pages: each section
// settles from blurred and faded to sharp as its top travels from 88% to 48%
// of the viewport, and goes back the other way if you scroll up. The values
// are the exact ones useSectionMaterialize uses on the homepage
// (blur(6px) contrast(2.1) at 0.45 opacity), so a section arrives the same way
// on every page. Phones and touch devices get the opacity half only, as on the
// homepage, where re-blurring tall sections every frame made touch scrolling
// stutter on iPhone.
//
// Replaced a one-time fade-and-slide (IntersectionObserver) on 25 Nov 2026,
// which played once and never reversed. Positions are read live with
// getBoundingClientRect on every scroll frame rather than through GSAP:
// these pages are not wrapped in HomeShell, so ScrollTrigger is never
// registered on them, and a live read cannot go stale when a section above
// changes height (an expanded process step, an image loading in).
//
// Fails visible: the faded state only exists because this effect set it, so
// with reduced motion, no JS, or an error, every section is simply there.
// The filter is cleared entirely once settled, not left at a no-op blur(0),
// because any filter keeps the section on its own layer for the rest of the
// visit. `delay` is accepted for compatibility with existing callers but no
// longer used: a scroll-linked effect has no start time to delay.
export function ScrollReveal({ children }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lightweight = window.matchMedia("(max-width: 991px), (pointer: coarse)").matches;
    let frame = 0;
    let settled = false;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const start = vh * 0.88;
      const end = vh * 0.48;
      const p = Math.min(1, Math.max(0, (start - top) / (start - end)));

      if (p >= 1) {
        if (!settled) {
          el.style.filter = "";
          el.style.opacity = "";
          settled = true;
        }
        return;
      }
      settled = false;
      el.style.opacity = String(0.45 + 0.55 * p);
      if (!lightweight) {
        el.style.filter = `blur(${(6 * (1 - p)).toFixed(2)}px) contrast(${(1 + 1.1 * (1 - p)).toFixed(3)})`;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      el.style.filter = "";
      el.style.opacity = "";
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
