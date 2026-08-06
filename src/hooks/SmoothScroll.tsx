"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCrossRouteBackNav } from "./useCrossRouteBackNav";

// Register ScrollTrigger once globally.
gsap.registerPlugin(ScrollTrigger);

// Inner component — lives inside the ReactLenis provider so useLenis() works.
// Exposes the Lenis instance on window.__lenis so smoothScrollTo (used by nav
// clicks and the back-button restoration) can route through it.
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

    return (
        <ReactLenis
            root
            options={{
                // Exact same values as the original template (tfisak.vercel.app).
                // syncTouch:false means Lenis does NOT intercept touch events —
                // the browser handles touch scrolling natively, which is smoother
                // on mobile. ScrollTrigger listens to native scroll events directly,
                // so all GSAP animations fire correctly without Lenis involvement
                // on touch devices. This is how the original works and why it
                // animates correctly in Safari on mobile.
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
