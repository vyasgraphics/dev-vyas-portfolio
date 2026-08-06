"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCrossRouteBackNav } from "./useCrossRouteBackNav";

let pluginRegistered = false;
function ensureScrollTrigger() {
    if (pluginRegistered) return;
    gsap.registerPlugin(ScrollTrigger);
    pluginRegistered = true;
}

// Only skip Lenis for prefers-reduced-motion. Previously we also skipped it
// on mobile (< 992px) to avoid Lenis "overhead" on touch devices - but that
// was the wrong trade-off: GSAP ScrollTrigger drives ALL entrance animations
// (effectFade, scrolling-effect, split-text, etc.) by listening to Lenis
// scroll events. Without Lenis, those events never fire on mobile, so
// everything is static and rigid - exactly the reported bug. The original
// template runs Lenis on all devices with syncTouch:true and that is correct.
function subscribeNever() {
    return () => {};
}
function getSkipLenisSnapshot() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getSkipLenisServerSnapshot() {
    return false;
}

type SmoothScrollProps = { children: React.ReactNode };

export default function SmoothScroll({ children }: SmoothScrollProps) {
    useCrossRouteBackNav();

    const lenisRef = useRef<LenisRef>(null);

    // Only skip for reduced-motion - Lenis runs on all devices including mobile.
    const skipLenis = useSyncExternalStore(
        subscribeNever,
        getSkipLenisSnapshot,
        getSkipLenisServerSnapshot,
    );

    useEffect(() => {
        if (skipLenis) return;
        const id = requestAnimationFrame(() => {
            const lenis = lenisRef.current?.lenis;
            if (!lenis) return;

            (window as unknown as { __lenis?: unknown }).__lenis = lenis;

            ensureScrollTrigger();
            gsap.ticker.lagSmoothing(0);
            lenis.on("scroll", ScrollTrigger.update);

            (window as unknown as { __lenisCleanup?: () => void }).__lenisCleanup = () => {
                lenis.off("scroll", ScrollTrigger.update);
            };
        });
        return () => {
            cancelAnimationFrame(id);
            const w = window as unknown as { __lenisCleanup?: () => void; __lenis?: unknown };
            w.__lenisCleanup?.();
            delete w.__lenisCleanup;
            delete w.__lenis;
        };
    }, [skipLenis]);

    if (skipLenis) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                lerp: 0.1,
                duration: 1.4,
                smoothWheel: true,
                // syncTouch:true mirrors the original template and is essential
                // for mobile: it lets Lenis intercept touch scroll events so
                // they flow through ScrollTrigger's update loop - without this,
                // GSAP animations simply don't fire on touch devices at all.
                syncTouch: true,
                infinite: false,
                orientation: "vertical",
                gestureOrientation: "vertical",
            }}
        >
            {children}
        </ReactLenis>
    );
}
