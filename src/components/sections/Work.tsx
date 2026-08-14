"use client";

import { works } from "@/data/works";
import Image from "next/image";
import Link from "next/link";

// Mobile card entrances are no longer handled here. This used to run its
// own IntersectionObserver adding .in-view once per card and never
// removing it, which meant the reveal played a single time and did not
// reverse on scroll-back - the one section on mobile that was not
// scroll-linked. useSectionMaterialize now scrubs these cards the same
// way it scrubs every other section, on both desktop and mobile, so the
// observer here (and the duplicate `once:true` ScrollTrigger that also
// set .in-view in useScrollAnimations) have both been removed.
export function Work() {
    return (
        <div id="work" className="section-work flat-spacing">
            {/* The eyebrow was marked up as the section's h2 and there was no
                s-title at all, so the most important section on the site had
                no descriptive heading - and the h2 it did claim rendered at
                12px, smaller than body text. Every other section here uses
                div.sect-tag + h2.s-title; this now matches them. */}
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-high-light" />
                Selected Work
            </div>
            <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
                What I have built <br className="d-none d-lg-block" />
                and what it changed
            </h2>
            <p className="s-desc text-black-56 scrolling-effect effectTop" style={{ marginBottom: "1rem", maxWidth: "640px" }}>
                Three projects, three sides of how I work: a research study that measured a real cost, a product designed end to end, and four years of brand work shipped to deadline. Start anywhere.
            </p>
            {/* Desktop-only signpost. On this breakpoint each project's write-up
                (title, summary, industry/platform/year/role, tags, CTA) renders
                in the fixed card pinned to the left, in the exact slot the
                profile card occupied for the whole page above this point - so
                readers classify that region as static chrome and never look
                back at it, and read the section as three captionless images.
                Hidden below lg, where the same content sits inline under each
                image and needs no pointer. */}
            <p className="vg-hint-pill d-none d-lg-flex" style={{ marginBottom: "2.5rem" }}>
                <i className="icon icon-arrow-caret-left" aria-hidden="true" />
                <span>Each project&apos;s details open in the card on the left as you scroll</span>
            </p>
            <div className="work-list element-sticky">
                {works.map((w, i) => (
                    <div
                        className="sticky-item"
                        key={w.slug}
                        id={`work-item-${w.slug}`}
                    >
                        <div className="wg-work">
                            <div className="work-image">
                                <Image
                                    width={700}
                                    height={427}
                                    src={w.image}
                                    alt={w.title}
                                    priority={i === 0}
                                />
                                {w.link && w.link !== "#" && (
                                    <Link
                                        href={w.link}
                                        className="work-hover-cta"
                                        aria-label={`View ${w.title}`}
                                        onClick={() => {
                                            sessionStorage.setItem("lastWorkItemSlug", w.slug);
                                        }}
                                    >
                                        View case study
                                    </Link>
                                )}
                            </div>
                            <div className="wrap">
                                <div className="work-content">
                                    <div className="w-image">
                                        <Image
                                            width={700}
                                            height={427}
                                            src={w.image}
                                            alt={w.title}
                                            priority={i === 0}
                                            className="w-image-mobile-crop"
                                        />
                                        <Image
                                            width={468}
                                            height={856}
                                            src={w.imagePortrait}
                                            alt={w.title}
                                            priority={i === 0}
                                            className="w-image-desktop-crop"
                                        />
                                    </div>
                                    <div className="content">
                                        <div className="content-top">
                                            {/* Position indicator, moved up here from the
                                                bottom row. Down there it was 12px low-opacity
                                                text below the fold of a panel that clips its
                                                own content on any viewport under 1440px wide,
                                                so on a 1280 or 1366 laptop it was not small,
                                                it was invisible. At the top it survives the
                                                clip, and the filled segment gives the card
                                                change something that reads in peripheral
                                                vision while the eye is on the image. */}
                                            <div className="vg-work-progress">
                                                <span className="visually-hidden">
                                                    Project {i + 1} of {works.length}
                                                </span>
                                                <span className="vg-work-progress-count" aria-hidden="true">
                                                    <span className="vg-work-progress-now">{String(i + 1).padStart(2, "0")}</span>
                                                    <span className="vg-work-progress-total">/ {String(works.length).padStart(2, "0")}</span>
                                                </span>
                                                <span className="vg-work-progress-track" aria-hidden="true">
                                                    {works.map((seg, j) => (
                                                        <span
                                                            key={seg.slug}
                                                            className={"vg-work-progress-seg" + (j === i ? " is-active" : "")}
                                                        />
                                                    ))}
                                                </span>
                                            </div>
                                            <div className="w-logo">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    loading="lazy"
                                                    width={40}
                                                    height={40}
                                                    src={w.logo}
                                                    alt={`${w.title} logo`}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </div>
                                            <h3 className="w-title letter-space--2 text-white-72">
                                                {w.title}
                                            </h3>
                                            {w.impact && (
                                                <p className="w-impact">{w.impact}</p>
                                            )}
                                            <p className="w-desc text-white-56 text-body-3">
                                                {w.description}
                                            </p>
                                            {/* Four fields, not two. Industry and Platform are what a
                                                recruiter filters on ("do they do mobile? do they do
                                                B2B?") and the card previously answered neither. Falls
                                                into a 2x2 on desktop via the existing 1fr 1fr grid. */}
                                            <div className="w-highlight">
                                                <div className="box-high">
                                                    <p className="text-body-3 text-white-56">Industry</p>
                                                    <p className="text-body-1 text-white-72">{w.industry}</p>
                                                </div>
                                                <div className="box-high">
                                                    <p className="text-body-3 text-white-56">Platform</p>
                                                    <p className="text-body-1 text-white-72">{w.platform}</p>
                                                </div>
                                                <div className="box-high">
                                                    <p className="text-body-3 text-white-56">Year</p>
                                                    <p className="text-body-1 text-white-72">{w.year}</p>
                                                </div>
                                                <div className="box-high">
                                                    <p className="text-body-3 text-white-56">Role</p>
                                                    <p className="text-body-1 text-white-72">{w.role}</p>
                                                </div>
                                            </div>
                                            <div className="w-tag-list">
                                                {w.tags.map((tag) => (
                                                    <div className="tag" key={tag}>
                                                        <span className="text-body-3 fw-medium text-white-72">{tag}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="content-bottom">
                                            <div className="br-line" />
                                            <div className="group-action">
                                                <Link
                                                    href={w.link ?? "#"}
                                                    className="tf-btn-action style-white"
                                                    onClick={() => {
                                                        sessionStorage.setItem("lastWorkItemSlug", w.slug);
                                                    }}
                                                >
                                                    <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
                                                    <span className="text text-body-3 letter-space--05 fw-medium">View project</span>
                                                    <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
