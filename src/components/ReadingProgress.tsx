"use client";

import { useEffect, useState } from "react";

// A thin vertical fill on the left edge of the viewport, tracking how far
// down the article the reader has scrolled. Desktop-only (see .vg-reading-progress
// in styles.css - min-width: 1180px, the same breakpoint SectionNav's dot rail
// uses on the right), so on a wide screen the reading column now has a
// functional element in both margins instead of one. Doesn't render or track
// anything on narrower viewports, where there's no spare margin to use anyway.
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="vg-reading-progress" aria-hidden="true">
      <div className="vg-reading-progress-fill" style={{ height: `${progress}%` }} />
    </div>
  );
}
