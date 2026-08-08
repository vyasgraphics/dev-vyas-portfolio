"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CarouselItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Horizontal scroll-snap carousel for multi-slide Instagram posts.
//
// Slides snap on their LEFT edge (scroll-snap-align: start), not centre.
// Centre-snap needs the track padded on both ends by roughly
// (viewport - slide width) / 2 so the first and last slides can actually
// reach true centre - without that padding, edge slides physically can't
// centre, so distance-based "closest slide" math misidentifies the active
// index right at the edges, which is exactly where the arrow buttons live.
// Start-align sidesteps the whole problem: a slide's resting position is
// just its own offsetLeft, matching scrollLeft directly, no compensating
// padding required, and it's the same interaction model as most native
// feed carousels (current slide flush, next slide peeking from the right).
export function Carousel({
  items,
  label,
  showArrows = true,
  showCounter = true,
  showDots = true,
}: {
  items: CarouselItem[];
  label?: string;
  showArrows?: boolean;
  showCounter?: boolean;
  showDots?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const snapRestoreTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Active index and scroll targets are both derived from scroll PROGRESS
  // (scrollLeft / maxScroll, 0 to 1) mapped proportionally across the index
  // range, rather than each slide's individual offsetLeft.
  //
  // Individual-offsetLeft targeting looks right until slide width × count
  // doesn't evenly divide the scrollable range - which is the normal case,
  // not an edge case (e.g. 6 slides at 30% width on this page). Once you're
  // within one viewport-width of the end, several trailing slides' true
  // offsetLeft values exceed maxScroll and all clamp to the same position,
  // so distance-based "closest slide" matching permanently undercounts them
  // - the index gets stuck and clicking "next" stops doing anything visible.
  // No per-slide targeting scheme fixes that; it's a hard geometric ceiling
  // on scrollLeft, not a comparison bug.
  //
  // Proportional mapping sidesteps it entirely: scrollLeft=0 is defined as
  // index 0 and scrollLeft=maxScroll is defined as the last index, by
  // construction, so every index is always reachable and "next" always
  // makes forward progress, regardless of how the slide widths divide up.
  const itemsLength = items.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 1) {
        setActive(0);
        return;
      }
      const progress = Math.min(1, Math.max(0, el.scrollLeft / maxScroll));
      setActive(Math.round(progress * (itemsLength - 1)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [itemsLength]);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    const maxScroll = el.scrollWidth - el.clientWidth;
    // Same proportional mapping as the scroll listener above, so a click
    // always lands exactly where that reading back through measure() will
    // report - clicking dot 4 shows dot 4 as active, never dot 6.
    const target = items.length > 1 ? (clamped / (items.length - 1)) * maxScroll : 0;

    // A long jump (e.g. slide 6 back to slide 1) is a single continuous
    // scroll that passes through every snap point in between.
    // scroll-snap-stop:always on each slide means "never let a scroll skip
    // past a snap point uninterrupted" - which is exactly what a long
    // programmatic jump needs to do, so the browser can cut the animation
    // short partway there instead of reaching the intended target. Native
    // swipe/drag should still respect that rule (it's what stops a fast
    // flick from sailing past three cards at once), so rather than removing
    // it outright, snap is switched off just for the duration of this
    // programmatic scroll and restored right after.
    el.style.scrollSnapType = "none";
    window.clearTimeout(snapRestoreTimeout.current);
    snapRestoreTimeout.current = setTimeout(() => {
      el.style.scrollSnapType = "";
    }, 500);

    el.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    return () => window.clearTimeout(snapRestoreTimeout.current);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {(label || showCounter) && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "12px",
        }}>
          <span style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            {label}
          </span>
          {showCounter && (
            <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.4)" }}>
              {active + 1} / {items.length}
            </span>
          )}
        </div>
      )}

      <div className="vg-carousel-wrap">
        <div ref={trackRef} className="vg-carousel-track">
          {items.map((item, i) => (
            <div key={i} className="vg-carousel-slide">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="vg-card"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "14px" }}
              />
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              className="vg-carousel-arrow vg-carousel-arrow-left"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="vg-carousel-arrow vg-carousel-arrow-right"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === items.length - 1}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </>
        )}
      </div>

      {showDots && (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "14px" }}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              style={{
                width: active === i ? "22px" : "7px", height: "7px", borderRadius: "100px",
                background: active === i ? "#00DE51" : "rgba(255,255,255,0.25)",
                border: "none", padding: 0, cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .vg-carousel-wrap {
          position: relative;
        }
        .vg-carousel-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
          padding: 4px 2px 10px;
          scrollbar-width: none;
        }
        .vg-carousel-track::-webkit-scrollbar {
          display: none;
        }
        .vg-carousel-slide {
          flex: 0 0 auto;
          width: 68%;
          max-width: 340px;
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
        @media (min-width: 700px) {
          .vg-carousel-slide {
            width: 30%;
          }
        }
        .vg-carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(10, 10, 10, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(6px);
          transition: background 0.2s ease, opacity 0.2s ease;
          z-index: 2;
        }
        .vg-carousel-arrow:hover {
          background: rgba(0, 222, 81, 0.85);
          color: #0a0a0a;
        }
        .vg-carousel-arrow:disabled {
          opacity: 0.3;
          cursor: default;
        }
        .vg-carousel-arrow:disabled:hover {
          background: rgba(10, 10, 10, 0.78);
          color: #fff;
        }
        .vg-carousel-arrow-left {
          left: 6px;
        }
        .vg-carousel-arrow-right {
          right: 6px;
        }
        @media (hover: hover) and (min-width: 700px) {
          .vg-carousel-arrow {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
