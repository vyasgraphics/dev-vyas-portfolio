"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useCrossRouteBackNav } from "./useCrossRouteBackNav";
import { useResetScrollOnForwardNav } from "./useResetScrollOnForwardNav";

// Inner component that exposes the Lenis instance for smoothScrollTo
// (used by nav clicks and back-button restoration).
// Must be a child of ReactLenis so useLenis() resolves correctly.
function LenisExposer() {
    const lenis = useLenis();
    useEffect(() => {
        if (!lenis) return;
        (window as unknown as { __lenis?: unknown }).__lenis = lenis;
        return () => {
            delete (window as unknown as { __lenis?: unknown }).__lenis;
        };
    }, [lenis]);
    return null;
}

type SmoothScrollProps = { children: React.ReactNode };

export default function SmoothScroll({ children }: SmoothScrollProps) {
    useCrossRouteBackNav();
    useResetScrollOnForwardNav();

    return (
        <ReactLenis
            root
            options={{
                // Values matched to the original template's own live demo,
                // kept as-is since they were already well tuned.
                // syncTouch:false - browser handles touch scrolling natively.
                // GSAP ScrollTrigger listens to native scroll events directly,
                // so animations fire correctly on mobile without Lenis involvement.
                lerp: 0.08,
                duration: 1.2,
                smoothWheel: true,
                syncTouch: false,
            }}
        >
            <LenisExposer />
            {children}
        </ReactLenis>
    );
}
