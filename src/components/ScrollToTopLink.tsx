"use client";

import { smoothScrollToTop } from "@/lib/smoothScroll";

// Static (non-fixed) back-to-top affordance, placed in the document flow
// rather than floating - this page's galleries and carousels run right up
// to the edges of the viewport, and a fixed floating button sitting over
// them competed for the same screen space as the images themselves.
// Reuses the site's existing smoothScrollToTop helper rather than a plain
// hash-anchor so it respects prefers-reduced-motion the same way every
// other scroll interaction on the site does.
export function ScrollToTopLink() {
  return (
    <a
      href="#vg-top"
      className="vg-glass"
      onClick={(e) => {
        e.preventDefault();
        smoothScrollToTop({ duration: 1 });
      }}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "10px 18px", borderRadius: "100px",
        color: "rgba(255,255,255,0.75)", textDecoration: "none",
        fontSize: "13px", fontWeight: 600,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
        <path d="M9 14.5V3.5M9 3.5L4 8.5M9 3.5L14 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to top
    </a>
  );
}
