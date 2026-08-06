"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { BodyBackground } from "./BodyBackground";
import { SettingColorMenu } from "./SettingColorMenu";
import { MobileMenu } from "./MobileMenu";
import { DesktopSidebar } from "./DesktopSidebar";
import { HeaderClock } from "./HeaderClock";
import { UserSidebar } from "./UserSidebar";
import { Preloader } from "./Preloader";
import { Intro } from "./sections/Intro";
import { About } from "./sections/About";
import { Education } from "./sections/Education";
import { Work } from "./sections/Work";
import { Services } from "./sections/Services";
import { Tech } from "./sections/Tech";
import { Blog } from "./sections/Blog";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { useIsakAnimations } from "@/hooks/useIsakAnimations";
import { useClock } from "@/hooks/useClock";
import { useHeadlineRotate } from "@/hooks/useHeadlineRotate";
import { useInfiniteSlide } from "@/hooks/useInfiniteSlide";
import { useBodyThemeClass } from "@/hooks/useBodyThemeClass";
import { useUrlHashSync } from "@/hooks/useUrlHashSync";

export function HomeShell() {
    const bodyClass = "counter-scroll";
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== "light";

    useBodyThemeClass({ defaultMode: "dark" });

    useEffect(() => {
        const body = document.body;
        const classes = bodyClass.split(" ").filter(Boolean);
        classes.forEach((c) => body.classList.add(c));
        return () => { classes.forEach((c) => body.classList.remove(c)); };
    }, []);

    useClock();
    useInfiniteSlide();
    useHeadlineRotate();
    useIsakAnimations();
    useUrlHashSync();

    return (
        <>
            <Preloader bgDark={isDark} />
            <BodyBackground showCloudItem={false} showVideo={false} />
            <SettingColorMenu />
            <MobileMenu />
            <DesktopSidebar positionClass="pst-v1" />

            <main id="wrapper">
                <HeaderClock variant="v1" />
                <UserSidebar variant="v1" />
                <div className="main-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-8 ms-auto">
                                <div className="wrap-container">
                                    <Intro />
                                    <Work />
                                    <About />
                                    <Services />
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
