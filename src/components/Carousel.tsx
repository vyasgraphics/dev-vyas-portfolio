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
export function Carousel({ items, label }: { items: CarouselItem[]; label?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const children = Array.from(el.children) as HTMLElement[];
      let closest = 0;
      let minDist = Infinity;
      children.forEach((c, i) => {
        const dist = Math.abs(c.offsetLeft - el.scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActive(closest);
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
  }, []);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    const child = el.children[clamped] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      {label && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "12px",
        }}>
          <span style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            {label}
          </span>
          <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.4)" }}>
            {active + 1} / {items.length}
          </span>
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
      </div>

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
