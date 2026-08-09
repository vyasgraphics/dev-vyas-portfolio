"use client";

/**
 * The far parallax plane for the Hero: a set of soft, blurred gradient orbs
 * layered behind the intro content. Purely decorative (aria-hidden), pointer-
 * events:none, and positioned absolutely inside the intro section so it never
 * affects layout or the flow of any real content.
 *
 * Each orb carries a data-depth factor that useHeroParallax reads to drift it
 * at its own rate as you scroll, producing the sense of separate planes.
 * Rendered at the top of Intro, behind everything. On mobile / reduced-motion
 * the parallax hook simply doesn't move them and the CSS tones them down.
 */
export function HeroDepth() {
    return (
        <div className="hero-depth" aria-hidden="true">
            <span className="hero-orb hero-orb--1" data-depth="0.18" />
            <span className="hero-orb hero-orb--2" data-depth="0.32" />
            <span className="hero-orb hero-orb--3" data-depth="0.08" />
            <span className="hero-grain" data-depth="0.04" />
        </div>
    );
}
