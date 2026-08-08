"use client";

import { smoothScrollToTop } from "@/lib/smoothScroll";
import { useState } from "react";

// Static (non-fixed) back-to-top affordance, placed in the document flow
// rather than floating - this page's galleries and carousels run right up
// to the edges of the viewport, and a fixed floating button sitting over
// them competed for the same screen space as the images themselves.
// Same circular icon-only treatment as BackToTop (used on the other work
// pages and blog posts) for visual consistency, just laid out inline
// instead of fixed. Reuses the site's existing smoothScrollToTop helper
// rather than a plain hash-anchor so it respects prefers-reduced-motion
// the same way every other scroll interaction on the site does.
export function ScrollToTopLink() {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="#vg-top"
      aria-label="Back to top"
      onClick={(e) => {
        e.preventDefault();
        smoothScrollToTop({ duration: 1 });
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "44px", height: "44px", borderRadius: "50%",
        border: `1px solid ${hover ? "rgba(0,222,81,0.5)" : "rgba(255,255,255,0.22)"}`,
        background: "linear-gradient(150deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.01) 100%), rgba(255,255,255,0.05)",
        backdropFilter: "blur(26px) saturate(190%) brightness(1.08)",
        WebkitBackdropFilter: "blur(26px) saturate(190%) brightness(1.08)",
        boxShadow: hover
          ? "0 0 18px 2px rgba(0,222,81,0.35), inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18)"
          : "0 10px 30px rgba(0,0,0,0.32), inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18)",
        color: hover ? "#00de51" : "#fff",
        textDecoration: "none",
        cursor: "pointer",
        transition: "color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14.5V3.5M9 3.5L4 8.5M9 3.5L14 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
