"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades + slides a section up into place the first time it scrolls into
// view. Self-contained (IntersectionObserver, no GSAP) since this page
// isn't wrapped in HomeShell and doesn't have the site's animation setup
// running on it.
//
// threshold is deliberately tiny (not e.g. 0.15): it's the fraction of the
// TARGET's own height that must be visible, not the viewport's. A wrapped
// section can be many multiples of viewport height on mobile (single-column
// stacking), and a higher threshold can mathematically never be satisfied
// for tall content - the section then sits at opacity:0 forever, since
// isIntersecting never fires. A near-zero threshold plus rootMargin means
// "as soon as any real sliver is on screen", which works regardless of how
// tall the wrapped content is.
//
// Easing matches StaggerReveal's cubic-bezier(0.16,1,0.3,1) (a fast-start,
// gentle-settle "ease-out-expo" curve) rather than plain `ease` - this
// wraps whole sections while StaggerReveal wraps the individual images
// inside them, and the two were using different easing curves for the
// same fade+slide motion. A section materializing with one motion quality
// and its own contents cascading in with a visibly different one is
// exactly the kind of mismatch that reads as "not quite smooth," even
// though neither curve is wrong in isolation.
export function ScrollReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
