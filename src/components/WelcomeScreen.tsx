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
                {/* A complete noun phrase, not a fragment. This previously read
                    "who can merge research, craft and code / all together",
                    which had no main verb and relied on the eyebrow above
                    acting as its subject - but the eyebrow is styled as a small
                    tracked label, so it reads as a caption rather than the
                    start of a sentence, leaving the headline dangling. "merge
                    ... all together" was also tautological. "A designer who
                    merges research, craft and code" stands on its own and still
                    answers the same question at a glance. */}
                <p className="vg-welcome-title">
                    <span className="vg-welcome-title-lead">A designer who merges</span>
                    <span className="vg-welcome-title-main">research, craft and code</span>
                </p>
                {/* The full stop after the roles is load-bearing, not
                    decoration: the span is display:block so it LOOKS like its
                    own line, but in the text stream it runs straight into the
                    next sentence. Without it, screen readers and any text
                    extraction read "...Graphic DesignerI start from how...". */}
                <p className="vg-welcome-sub">
                    <span className="vg-welcome-roles">UI/UX, Product &amp; Graphic Designer.</span>{" "}
                    I start from how people actually behave, shape it with visual
                    craft, and build it with an engineer&apos;s grounding.
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
