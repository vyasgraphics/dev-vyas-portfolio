"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { BodyBackground } from "./BodyBackground";
import { MobileMenu } from "./MobileMenu";
import { DesktopSidebar } from "./DesktopSidebar";
import { HeaderClock } from "./HeaderClock";
import { UserSidebar } from "./UserSidebar";
import { Preloader } from "./Preloader";
import { WelcomeReveal } from "./WelcomeReveal";
import { Intro } from "./sections/Intro";
import { Organisations } from "./sections/Organisations";
import { About } from "./sections/About";
import { Education } from "./sections/Education";
import { Work } from "./sections/Work";
import { Skills } from "./sections/Skills";
import { Tech } from "./sections/Tech";
import { Blog } from "./sections/Blog";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useClock } from "@/hooks/useClock";
import { useHeadlineRotate } from "@/hooks/useHeadlineRotate";
import { useInfiniteSlide } from "@/hooks/useInfiniteSlide";
import { useBodyThemeClass } from "@/hooks/useBodyThemeClass";
import { useUrlHashSync } from "@/hooks/useUrlHashSync";

export function HomeShell() {
    const bodyClass = "counter-scroll";

    useBodyThemeClass();

    useEffect(() => {
        const body = document.body;
        const classes = bodyClass.split(" ").filter(Boolean);
        classes.forEach((c) => body.classList.add(c));
        return () => { classes.forEach((c) => body.classList.remove(c)); };
    }, []);

    useClock();
    useInfiniteSlide();
    useHeadlineRotate();
    useScrollAnimations();
    useUrlHashSync();

    // Owns the welcome track's scroll progress at this level (rather than
    // inside WelcomeReveal itself) specifically so the nav sidebar, profile
    // card, and header chrome below can fade in from the exact same motion
    // value the welcome text fades out on - both driven by one shared
    // scroll read, so they crossfade in perfect sync with zero React
    // re-renders during the scroll itself (a callback/state-based bridge
    // between the two would re-render this whole tree on every scroll
    // frame). The chrome stays invisible and unclickable for the first ~85%
    // of the welcome scroll, then fades in over the same range the welcome
    // stage fades out on (see WelcomeReveal's stageOpacity).
    const welcomeTrackRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress: welcomeProgress } = useScroll({
        target: welcomeTrackRef,
        offset: ["start start", "end end"],
    });
    const chromeOpacity = useTransform(welcomeProgress, [0.85, 1], [0, 1]);
    const chromePointerEvents = useTransform(welcomeProgress, (v) => (v > 0.9 ? "auto" : "none"));

    // Applying opacity/pointerEvents declaratively via motion.div's style prop
    // measurably computed the correct values (verified chromeOpacity.get()
    // returning 1 once scrolled past the welcome section) but did not
    // reliably sync that value to the DOM's actual inline opacity - pointer-
    // events synced fine, opacity didn't, even waiting several seconds. Bug
    // found through direct testing, not assumed; worked around by setting
    // both style properties on these wrapper elements imperatively whenever
    // the underlying motion value changes, which sidesteps whatever's
    // causing the declarative binding to drop the update for this specific
    // combination of properties.
    const chromeRef1 = useRef<HTMLDivElement | null>(null);
    const chromeRef2 = useRef<HTMLDivElement | null>(null);
    useMotionValueEvent(chromeOpacity, "change", (latest) => {
        if (chromeRef1.current) chromeRef1.current.style.opacity = String(latest);
        if (chromeRef2.current) chromeRef2.current.style.opacity = String(latest);
    });
    useMotionValueEvent(chromePointerEvents, "change", (latest) => {
        if (chromeRef1.current) chromeRef1.current.style.pointerEvents = latest;
        if (chromeRef2.current) chromeRef2.current.style.pointerEvents = latest;
    });
    // useMotionValueEvent's "change" callback only fires on subsequent
    // updates, not the current value at mount - without this, a page load
    // that restores an already-scrolled-past-welcome position (browser
    // back/forward, or a deep link combined with scroll restoration) would
    // flash the chrome hidden for a moment until the next scroll event.
    useEffect(() => {
        if (chromeRef1.current) {
            chromeRef1.current.style.opacity = String(chromeOpacity.get());
            chromeRef1.current.style.pointerEvents = chromePointerEvents.get();
        }
        if (chromeRef2.current) {
            chromeRef2.current.style.opacity = String(chromeOpacity.get());
            chromeRef2.current.style.pointerEvents = chromePointerEvents.get();
        }
    }, [chromeOpacity, chromePointerEvents]);

    return (
        <>
            <Preloader bgDark={true} />
            <BodyBackground showCloudItem={false} showVideo={false} />

            {/* opacity/pointerEvents are deliberately NOT set here as a
                static style literal, only position/zIndex are - if they
                were declared here too, React would re-apply this object on
                every HomeShell re-render (e.g. useClock() ticking the
                header clock every second) and silently overwrite whatever
                the imperative updates above had just set, since a fresh
                object literal looks "different" to React's reconciler each
                render even when the numbers happen to match. Confirmed this
                was really happening (not just theorised) before fixing it -
                the motion value itself read correctly the whole time,
                only the DOM never kept the update.
                
                position:relative + a z-index above <main>'s own (unset/
                auto) stacking level is required, not optional: this div's
                opacity is animated, and any element with a computed opacity
                other than 1 creates its own CSS stacking context - which
                traps its position:fixed children's z-index (DesktopSidebar
                etc. use z-index:97, but only meaningful *within* whichever
                stacking context they end up in). Without an explicit
                z-index here, <main> - a later sibling in the DOM, itself
                just z-index:auto - would paint on top of this whole wrapper
                by normal paint order, visually covering the fixed sidebar
                and silently eating its clicks despite the sidebar still
                being visible on top of it. Confirmed this exact failure
                with a real click test before fixing it, too. */}
            <div
                ref={chromeRef1}
                style={{ position: "relative", zIndex: 100 }}
            >
                <MobileMenu />
                <DesktopSidebar positionClass="pst-v1" />
            </div>

            <WelcomeReveal targetRef={welcomeTrackRef} scrollYProgress={welcomeProgress} />

            <main id="wrapper">
                <div
                    ref={chromeRef2}
                    style={{ opacity: 0, pointerEvents: "none", position: "relative", zIndex: 100 }}
                >
                    <HeaderClock variant="v1" />
                    <UserSidebar variant="v1" />
                </div>
                <div className="main-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-8 ms-auto">
                                <div className="wrap-container">
                                    <Intro />
                                    <Organisations />
                                    <Work />
                                    <About />
                                    <Skills />
                                    <Education />
                                    <Tech />
                                    <Blog />
                                    <Contact />
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
