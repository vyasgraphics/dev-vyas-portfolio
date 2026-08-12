"use client";

import { useEffect } from "react";
import { BodyBackground } from "./BodyBackground";
import { MobileMenu } from "./MobileMenu";
import { DesktopSidebar } from "./DesktopSidebar";
import { HeaderClock } from "./HeaderClock";
import { UserSidebar } from "./UserSidebar";
import { Preloader } from "./Preloader";
import { Intro } from "./sections/Intro";
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
            <div style={{ position: "relative", zIndex: 100 }}>
                <MobileMenu />
                <DesktopSidebar positionClass="pst-v1" />
            </div>

            <main id="wrapper">
                <div style={{ position: "relative", zIndex: 100 }}>
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
