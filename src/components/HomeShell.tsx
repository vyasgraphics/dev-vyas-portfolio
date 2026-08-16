"use client";

import { useEffect } from "react";
import { BodyBackground } from "./BodyBackground";
import { MobileMenu } from "./MobileMenu";
import { DesktopSidebar } from "./DesktopSidebar";
import { HeaderClock } from "./HeaderClock";
import { UserSidebar } from "./UserSidebar";
import { Preloader } from "./Preloader";
import { WelcomeScreen } from "./WelcomeScreen";
import { Intro } from "./sections/Intro";
import { Pillars } from "./sections/Pillars";
import { Organisations } from "./sections/Organisations";
import { About } from "./sections/About";
import { Education } from "./sections/Education";
import { Work } from "./sections/Work";
import { WorkCta } from "./sections/WorkCta";
// import { Skills } from "./sections/Skills"; // "How I Work" - commented out per Dev's request
import { Tech } from "./sections/Tech";
// import { Blog } from "./sections/Blog"; // "How I Think" - commented out per Dev's request
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useSectionMaterialize } from "@/hooks/useSectionMaterialize";
import { useWelcomeScroll } from "@/hooks/useWelcomeScroll";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useHeroLoadSequence } from "@/hooks/useHeroLoadSequence";
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
    useSectionMaterialize();
    // Must stay after useScrollAnimations() - that is the single site where
    // ScrollTrigger is registered, and this hook uses it without registering.
    useWelcomeScroll();
    useStaggerReveal();
    useHeroLoadSequence();
    useUrlHashSync();

    return (
        <>
            <Preloader bgDark={true} />
            <BodyBackground showCloudItem={false} showVideo={false} />

            {/* position:relative + z-index:100 still required here even
                without the welcome screen's opacity animation - any
                element with a computed opacity other than 1 elsewhere on
                the page can still create a stacking context that traps
                position:fixed children's z-index, so keeping this
                unconditionally set avoids re-introducing that failure
                mode later. See git history for the fuller explanation;
                this was a real, confirmed bug once, not a theoretical
                one. */}
            {/* zIndex 200, not 100. This wrapper and the #wrapper one below
                (HeaderClock + UserSidebar) both sat at 100, so they tied -
                and on a tie the later DOM node paints on top. That put the
                profile card over the open mobile menu: measured at 375px,
                elementFromPoint at the dropdown's own centre returned the
                card's <img>, not the menu. Navigation has to outrank page
                content, so this one is raised rather than lowering the
                other (which would risk the fixed-element trapping the
                comment above guards against). */}
            {/* .vg-chrome (both wrappers): lets useWelcomeScroll fade the
                fixed desktop chrome out while the welcome screen owns the
                viewport, via a CSS custom property rather than an inline
                style - see that hook for why the distinction matters here.
                Desktop-only in CSS; below 992px these stay untouched. */}
            <div className="vg-chrome" style={{ position: "relative", zIndex: 200 }}>
                <MobileMenu />
                <DesktopSidebar positionClass="pst-v1" />
            </div>

            <main id="wrapper">
                <WelcomeScreen />
                <div className="vg-chrome" style={{ position: "relative", zIndex: 100 }}>
                    <HeaderClock variant="v1" />
                    <UserSidebar variant="v1" />
                </div>
                <div className="main-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-8 ms-auto">
                                <div className="wrap-container">
                                    <Intro />
                                    {/* The three strands the page is written
                                        around, stated before the case studies
                                        rather than after them - the Skills
                                        accordion below used to be the only
                                        place they appeared, and it is
                                        commented out. */}
                                    <Pillars />
                                    <Organisations />
                                    <Work />
                                    {/* Conversion point right after the strongest evidence,
                                        rather than only at 83% page depth. */}
                                    <WorkCta />
                                    <About />
                                    {/* <Skills /> "How I Work" - commented out per Dev's request */}
                                    <Education />
                                    <Tech />
                                    {/* <Blog /> "How I Think" - commented out per Dev's request */}
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
