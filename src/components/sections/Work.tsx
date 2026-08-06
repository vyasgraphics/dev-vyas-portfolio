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
            <div className="sect-tag text-caption fw-medium">
                <i className="icon icon-high-light" />
                Work Highlights
            </div>
            <div className="work-list element-sticky">
                {works.map((w, i) => (
                    <div
                        className="sticky-item"
                        key={w.slug}
                        id={`work-item-${w.slug}`}
                        ref={(el) => { itemRefs.current[i] = el; }}
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
                                        scroll={false}
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
                            <div className="wrap">
                                <div className="work-content">
                                    <div className="w-image">
                                        <Image
                                            width={468}
                                            height={856}
                                            src={w.imagePortrait}
                                            alt={w.title}
                                            priority={i === 0}
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
                                                    alt="logo"
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </div>
                                            <h4 className="w-title letter-space--2 text-white-72">
                                                {w.title}
                                            </h4>
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
                                                    scroll={false}
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
