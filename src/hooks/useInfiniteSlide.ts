"use client";

import { useEffect } from "react";

/**
 * Pure-CSS-free infinite slide port.
 * Clones children N times and animates the wrapper with requestAnimationFrame.
 * Pauses on hover.
 */
export function useInfiniteSlide() {
  useEffect(() => {
    const slides = document.querySelectorAll<HTMLElement>(".infiniteSlide");
    const cleanups: Array<() => void> = [];

    slides.forEach((slide) => {
      const direction = (slide.dataset.style || "left") as "left" | "right";
      const cloneCount = parseInt(slide.dataset.clone || "2", 10);
      const speed = parseFloat(slide.dataset.speed || "50");

      const children = Array.from(slide.children) as HTMLElement[];
      if (!children.length) return;

      slide.style.display = "flex";
      slide.style.flexWrap = "nowrap";
      slide.style.willChange = "transform";

      const originalHTML = slide.innerHTML;
      let allHTML = originalHTML;
      for (let i = 0; i < cloneCount; i++) allHTML += originalHTML;
      slide.innerHTML = allHTML;

      const firstChildWidth = (slide.children[0] as HTMLElement).offsetWidth;
      const total = firstChildWidth * children.length;
      let offset = 0;
      let paused = false;
      let rafId = 0;
      let lastTime = performance.now();

      const tick = (t: number) => {
        const dt = (t - lastTime) / 1000;
        lastTime = t;
        if (!paused) {
          const delta = speed * dt;
          offset += direction === "left" ? -delta : delta;
          if (offset <= -total) offset += total;
          if (offset >= total) offset -= total;
          slide.style.transform = `translateX(${offset}px)`;
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      const onEnter = () => (paused = true);
      const onLeave = () => (paused = false);
      slide.addEventListener("mouseenter", onEnter);
      slide.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        cancelAnimationFrame(rafId);
        slide.removeEventListener("mouseenter", onEnter);
        slide.removeEventListener("mouseleave", onLeave);
        slide.innerHTML = originalHTML;
        slide.style.transform = "";
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
