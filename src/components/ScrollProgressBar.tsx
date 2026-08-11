"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

// A minimal 2px progress indicator on the left edge of the viewport,
// filling top-to-bottom as the page scrolls - replaces the native
// scrollbar (hidden globally, see styles.css) with something quieter and
// more deliberate. Left edge specifically: the right edge already carries
// the desktop sidebar nav and, on case study pages, the SectionNav dot
// rail - a second right-side element would have competed with both.
//
// Uses Lenis's own scroll callback (useLenis, from lenis/react - Lenis is
// already mounted at the root via SmoothScroll.tsx) rather than a native
// window scroll listener, so this always matches exactly what Lenis
// itself considers the current scroll position, including its own
// smoothing - no risk of reading a native scrollY value that's a frame
// or two out of sync with what's actually rendered.
//
// Height (not scaleY) is used for the fill so nothing needs a transform-
// origin, and updates are written directly via ref.style rather than
// React state - this fires on every scroll tick, and routing it through
// setState would re-render on every frame for no reason.
export function ScrollProgressBar() {
    const fillRef = useRef<HTMLDivElement | null>(null);

    useLenis((lenis) => {
        if (!fillRef.current) return;
        const progress = Math.min(1, Math.max(0, lenis.progress));
        fillRef.current.style.height = `${progress * 100}%`;
    });

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion && fillRef.current) {
            // Value still updates correctly (the callback above keeps
            // writing it), only the smoothing transition is removed -
            // an instant, accurate indicator rather than an animated one.
            fillRef.current.style.transition = "none";
        }
    }, []);

    return (
        <div className="scroll-progress-track" aria-hidden>
            <div ref={fillRef} className="scroll-progress-fill" />
        </div>
    );
}
