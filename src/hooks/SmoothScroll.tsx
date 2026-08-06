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

// This value never changes after the initial client read (no resize/
// matchMedia listener - matching the previous implementation's behaviour
// exactly), so subscribe is a no-op: useSyncExternalStore only needs it to
// satisfy the API shape, not to drive re-renders.
function subscribeNever() {
    return () => {};
}
function getSkipLenisSnapshot() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 992;
    return reducedMotion || isMobile;
}
function getSkipLenisServerSnapshot() {
    return false;
}

type SmoothScrollProps = { children: React.ReactNode };

export default function SmoothScroll({ children }: SmoothScrollProps) {
    // Mounted once at the root layout, alive for the entire session
    // regardless of route - see the hook itself for why that matters for
    // getting the browser back button right.
    useCrossRouteBackNav();

    const lenisRef = useRef<LenisRef>(null);

    // Lenis attaches touchstart/touchmove listeners UNCONDITIONALLY,
    // regardless of the syncTouch setting - confirmed directly in its
    // source. Even with syncTouch:false (not acting on touch input to
    // virtualize scroll), it's still running every touch event through
    // its own JS for internal bookkeeping (velocity, direction, etc.),
    // which is real overhead added to every single scroll gesture on
    // exactly the class of device where that overhead is most
    // noticeable. Native mobile touch-scroll already has excellent,
    // extensively-tuned OS-level momentum physics; Lenis's actual value
    // (eased, virtualized wheel input) is fundamentally a desktop mouse
    // concept. Not mounting Lenis at all below the site's existing
    // mobile breakpoint removes any possibility of it adding friction
    // there - every scroll-driven feature already falls back to native
    // APIs correctly when Lenis isn't present (see smoothScrollTo).
    //
    // Read via useSyncExternalStore rather than the old mount-then-setState
    // pattern: this is React's documented way to pull in a client-only
    // value (matchMedia/innerWidth aren't available during SSR) without an
    // extra render-triggering setState call inside the effect body.
    // getServerSnapshot keeps the SSR/first-paint value at false (Lenis
    // mounted), matching the old default exactly, so there's still no
    // hydration mismatch; the real value takes over on the client render
    // right after.
    const skipLenis = useSyncExternalStore(
        subscribeNever,
        getSkipLenisSnapshot,
        getSkipLenisServerSnapshot,
    );

    // Expose the Lenis instance globally so any component (including
    // vanilla-JS GSAP hooks) can route hash-link scrolling through it
    // instead of the browser's native scroll, which otherwise fights
    // Lenis and causes visible stutter on every nav click.
    //
    // This also tells GSAP's ScrollTrigger to recalculate whenever Lenis
    // actually scrolls, so entrance animations stay in sync with Lenis's
    // eased position rather than only the browser's own scroll events.
    // This listener is purely additive - it never touches how Lenis itself
    // renders scroll, so it cannot break basic scrolling.
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

    // Mobile and prefers-reduced-motion both skip Lenis entirely and let
    // the browser's native scrolling take over - see the reasoning above
    // for mobile; for reduced-motion, continuous lerped scroll easing is
    // exactly the kind of motion that preference is meant to turn off.
    // GSAP's ScrollTrigger still works correctly without Lenis mounted -
    // it listens to native scroll events directly by default - so entrance
    // animations are unaffected either way.
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
                smoothWheel: true,      // Smooth easing for desktop mouse-wheel input
                syncTouch: false,
                infinite: false,
                orientation: "vertical",
                gestureOrientation: "vertical",
            }}
        >
            {children}
        </ReactLenis>
    );
}
