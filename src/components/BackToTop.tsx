"use client";

import { useEffect, useState } from "react";
import { smoothScrollToTop } from "@/lib/smoothScroll";

// Appears once the reader has scrolled a full viewport height, so it
// doesn't clutter the screen right after landing on a long post.
//
// The morph-into-a-pill hover treatment is adapted from a reference design:
// a circular icon button that expands into a labelled pill on hover, with
// the arrow icon sliding up and out as the "Back to top" label scales in to
// replace it. Recoloured to the site's own dark-card + green-accent
// language (the reference used a plain black fill and a light sky-blue
// border) instead of introducing new colours, and kept the site's existing
// thin stroke-style arrow rather than the reference's filled-triangle icon,
// so it still reads as part of the same icon set as everywhere else on the
// site. Gated behind (hover:hover) like every other hover state in this
// codebase, so touch devices never get a "stuck" expanded/hovered button
// after a tap - the button just scrolls to top and stays circular.
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => smoothScrollToTop({ duration: 1 })}
        className={`vg-back-to-top${visible ? " is-visible" : ""}`}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 40,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <svg className="vg-back-to-top-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 14.5V3.5M9 3.5L4 8.5M9 3.5L14 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="vg-back-to-top-label">Back to top</span>
      </button>

      <style jsx>{`
        .vg-back-to-top {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(20, 22, 26, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.3s ease, transform 0.3s ease,
            width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.35s ease,
            border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .vg-back-to-top.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* Combined with the base translateY(0) above, rather than a bare
           :active rule, since transform is a single property - a separate
           :active { transform: scale(...) } would silently replace the
           visible-state translateY instead of composing with it. */
        .vg-back-to-top.is-visible:active {
          transform: translateY(0) scale(0.96);
        }

        .vg-back-to-top-icon {
          color: #fff;
          flex-shrink: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .vg-back-to-top-label {
          position: absolute;
          color: #fff;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          white-space: nowrap;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }

        @media (hover: hover) {
          .vg-back-to-top:hover {
            width: 155px;
            border-radius: 999px;
            border-color: rgba(0, 222, 81, 0.55);
            box-shadow: 0 0 18px 2px rgba(0, 222, 81, 0.35);
          }
          .vg-back-to-top:hover .vg-back-to-top-icon {
            transform: translateY(-28px);
            opacity: 0;
          }
          .vg-back-to-top:hover .vg-back-to-top-label {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vg-back-to-top,
          .vg-back-to-top-icon,
          .vg-back-to-top-label {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
