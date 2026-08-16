"use client";

import { useRef } from "react";
import { GlslHills } from "./GlslHills";
import { smoothScrollToY } from "@/lib/smoothScroll";

// The homepage's opening screen: one viewport tall, animated terrain behind a
// short statement, then straight into the hero.
//
// Deliberately ONE screen and not scroll-jacked. There was a welcome sequence
// here before (WelcomeReveal, removed in 49934e5) that ran a 320vh scroll
// track with a sticky stage and a multi-phase icon cascade; it cost three
// viewports of scrolling before a recruiter reached any actual content. This
// version holds the screen for exactly as long as it takes to scroll past it.
//
// The headline is a <p>, not a heading, on purpose. The hero below owns the
// page's only <h1> ("Turning user research into products people actually
// use"), and putting an <h2> above it would leave the document outline
// starting at the second level - the kind of thing an accessibility audit
// flags immediately. Nothing here needs to be in the outline: it is an
// opening statement, and every real section is still reachable below it.
export function WelcomeScreen() {
    const sectionRef = useRef<HTMLElement>(null);

    // Scrolls to the bottom edge of this screen rather than to "#home". On
    // desktop those are the same place, but below 992px .sidebar-user (the
    // profile card) is in normal flow and sits between this screen and the
    // hero - targeting "#home" would silently skip past the card on exactly
    // the breakpoint where it is real content rather than fixed chrome.
    const goDown = () => {
        const el = sectionRef.current;
        if (!el) return;
        smoothScrollToY(window.scrollY + el.getBoundingClientRect().bottom);
    };

    return (
        <section id="welcome" className="vg-welcome" ref={sectionRef} aria-label="Introduction">
            <GlslHills className="vg-welcome-canvas" />

            {/* Guarantees the copy clears the 4.5:1 contrast floor no matter
                where the terrain happens to be in its drift - the mesh is
                animated, so the worst case behind any given letter changes
                second to second and cannot be checked once and trusted. */}
            <div className="vg-welcome-veil" aria-hidden="true" />

            <div className="vg-welcome-inner">
                <p className="vg-welcome-eyebrow">Dev Vyas</p>
                <p className="vg-welcome-title">
                    <span className="vg-welcome-title-lead">Where code, craft and</span>
                    <span className="vg-welcome-title-main">human behaviour meet</span>
                </p>
                <p className="vg-welcome-sub">
                    Product design and UX research for web and mobile. I come at it
                    from code, from visual craft, and from studying how people
                    actually behave.
                </p>
            </div>

            <button type="button" className="vg-welcome-scroll vg-tactile" onClick={goDown}>
                <span className="vg-welcome-scroll-label">Scroll down</span>
                <span className="vg-welcome-scroll-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 5v14M6 13l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>
        </section>
    );
}
