"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CarouselItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Horizontal scroll-snap carousel for multi-slide Instagram posts - native
// touch/trackpad swipe via CSS scroll-snap (no drag physics to reinvent),
// with dot indicators and desktop-only hover arrows layered on top. Active
// dot is derived from scroll position, not clicks, so it stays correct
// whether the person swipes, drags, or clicks an arrow.
export function Carousel({ items, label }: { items: CarouselItem[]; label?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Slides snap on their centre (scroll-snap-align: center), so the
        // "active" slide is whichever child's centre sits closest to the
        // viewport's centre - not whichever child's left edge is closest to
        // scrollLeft. Comparing left edges was the source of the drift.
        const viewportCenter = el.scrollLeft + el.clientWidth / 2;
        const children = Array.from(el.children) as HTMLElement[];
        let closest = 0;
        let minDist = Infinity;
        children.forEach((c, i) => {
          const childCenter = c.offsetLeft + c.clientWidth / 2;
          const dist = Math.abs(childCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        setActive(closest);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    // Target the same point the CSS snap would settle on: the child's centre
    // aligned with the viewport's centre. Scrolling to offsetLeft instead
    // (left-edge alignment) fought the center-based snap and produced the
    // inaccurate, jumpy settle.
    const target = child.offsetLeft + child.clientWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
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
          onClick={() => scrollToIndex(Math.max(0, active - 1))}
          disabled={active === 0}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="vg-carousel-arrow vg-carousel-arrow-right"
          onClick={() => scrollToIndex(Math.min(items.length - 1, active + 1))}
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
          width: 62%;
          max-width: 360px;
          scroll-snap-align: center;
        }
        @media (min-width: 700px) {
          .vg-carousel-slide {
            width: 32%;
          }
        }
        .vg-carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(10, 10, 10, 0.7);
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
          background: rgba(10, 10, 10, 0.7);
          color: #fff;
        }
        .vg-carousel-arrow-left {
          left: -8px;
        }
        .vg-carousel-arrow-right {
          right: -8px;
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
