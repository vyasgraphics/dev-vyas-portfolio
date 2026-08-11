"use client";

import { works } from "@/data/works";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Work() {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Desktop already gets an elaborate scroll-driven card-swap animation
    // (native to the template, CSS-scoped to min-width:992px). Mobile drops
    // that entirely and the cards just sat there with zero motion - so give
    // mobile its own equivalent: a simple staggered fade+slide-up as each
    // card scrolls into view, revealed once and left alone afterwards.
    useEffect(() => {
        if (typeof window === "undefined" || window.innerWidth >= 992) return;

        const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
        if (!items.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <div id="work" className="section-work flat-spacing">
            <h2 className="sect-tag text-caption fw-medium">
                <i className="icon icon-high-light" />
                Selected Work
            </h2>
            <p className="s-desc text-black-56 scrolling-effect effectTop" style={{ marginBottom: "2.5rem", maxWidth: "640px" }}>
                Three projects, three sides of how I work: a research study that measured a real cost, a product designed end to end, and four years of brand work shipped to deadline. Start anywhere.
            </p>
            <div className="work-list element-sticky">
                {works.map((w, i) => (
                    <div
                        className="sticky-item"
                        key={w.slug}
                        id={`work-item-${w.slug}`}
                        ref={(el) => { itemRefs.current[i] = el; }}
                    >
                        <div className="wg-work">
                            {/* Frame wraps just the image (not the text content below it) -
                                needed so the tags' percentage-based vertical position
                                below is measured against the image's own height, not the
                                whole card's. Two short tags, rotated and peeking out from
                                behind the screenshot - reference-inspired signposting,
                                sourced from the same real tags already used in the tag
                                list further down the card, not invented content. Tags are
                                siblings of .work-image (not children) because that element
                                clips overflow to crop the photo - these need to render
                                outside that clip to actually peek out from its edges.
                                Coming before .work-image in the DOM means the image
                                naturally paints over each tag's centre, leaving only the
                                overhanging ends visible. */}
                            <div className="work-image-frame">
                                <span className="work-tilt-tag work-tilt-tag--left" aria-hidden>
                                    {w.tags[0]}
                                </span>
                                <span className="work-tilt-tag work-tilt-tag--right" aria-hidden>
                                    {w.tags[1]}
                                </span>
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
                                            aria-hidden
                                            tabIndex={-1}
                                            onClick={() => {
                                                sessionStorage.setItem("lastWorkItemSlug", w.slug);
                                            }}
                                        >
                                            View case study
                                        </Link>
                                    )}
                                    {w.link && w.link !== "#" && (
                                        <Link
                                            href={w.link}
                                            className="work-arrow-link"
                                            aria-label={`View ${w.title}`}
                                            onClick={() => {
                                                sessionStorage.setItem("lastWorkItemSlug", w.slug);
                                            }}
                                        >
                                        <i className="icon icon-arrow-right-top" />
                                    </Link>
                                )}
                            </div>
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
                                                <p style={{
                                                    fontSize: "12px",
                                                    lineHeight: 1.4,
                                                    color: "#00DE51",
                                                    fontWeight: 500,
                                                    marginBottom: "10px",
                                                    paddingLeft: "10px",
                                                    borderLeft: "2px solid #00DE51",
                                                    opacity: 0.9,
                                                }}>
                                                    {w.impact}
                                                </p>
                                            )}
                                            <p className="w-desc text-white-56 text-body-3">
                                                {w.description}
                                            </p>
                                            <div className="w-highlight">
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
                                                <p className="text-white-40">
                                                    <span className="text-white-72">{String(i + 1).padStart(2, "0")}</span>
                                                    {" "}/ {String(works.length).padStart(2, "0")}
                                                </p>
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
