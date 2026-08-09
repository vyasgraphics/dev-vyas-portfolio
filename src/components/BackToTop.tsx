"use client";

import { useEffect, useState } from "react";
import { smoothScrollToTop } from "@/lib/smoothScroll";

// Appears once the reader has scrolled a full viewport height, so it
// doesn't clutter the screen right after landing on a long post.
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`vg-back-to-top${visible ? " is-visible" : ""}`}
      aria-label="Back to top"
      onClick={() => smoothScrollToTop({ duration: 1 })}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14.5V3.5M9 3.5L4 8.5M9 3.5L14 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
