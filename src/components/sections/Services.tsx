"use client";

import { useEffect } from "react";
import { services } from "@/data/services";
import { smoothScrollTo } from "@/lib/smoothScroll";

export function Services() {
    // When an accordion item is tapped open on mobile, the newly-revealed
    // content often ends up mostly or entirely below the fold - the toggle
    // itself may already be near the bottom of a small screen, so "opening"
    // it doesn't visibly show anything without a manual scroll. Centre the
    // item in the viewport once Bootstrap's expand transition finishes, so
    // tapping "+" actually brings the content into view.
    useEffect(() => {
        if (window.innerWidth >= 992) return;

        const container = document.getElementById("accordion-service");
        if (!container) return;

        const onShown = (e: Event) => {
            const collapseEl = e.target as HTMLElement;
            const item = collapseEl.closest<HTMLElement>(".service-accordion_item");
            if (!item) return;
            // Let the browser paint the final expanded height before measuring
            requestAnimationFrame(() => {
                smoothScrollTo(item, { center: true, duration: 0.9 });
            });
        };

        container.addEventListener("shown.bs.collapse", onShown);
        return () => container.removeEventListener("shown.bs.collapse", onShown);
    }, []);

    return (
        <div id="service" className="section-service flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-service" />
                Skills
            </div>

            <div id="accordion-service">
                {services.map((s, idx) => {
                    const isOpen = idx === 0;
                    return (
                        <div key={s.id} className="service-accordion_item scrolling-effect effectBottom">
                            <a
                                href={`#${s.id}`}
                                className={`accordion-action${isOpen ? "" : " collapsed"}`}
                                data-bs-toggle="collapse"
                                data-bs-target={`#${s.id}`}
                                aria-expanded={isOpen ? "true" : "false"}
                                aria-controls={s.id}
                                role="button"
                            >
                                <h4 className="text letter-space--2 text-black-72">{s.title}</h4>
                                <div className="ic-wrap"><span className="ic-accordion-custom" /></div>
                            </a>
                            <div
                                id={s.id}
                                className={`collapse${isOpen ? " show" : ""}`}
                                data-bs-parent="#accordion-service"
                            >
                                <div className="accordion-content">
                                    <div className="tf-grid-layout sm-col-2">
                                        {s.images.map((img, i) => (
                                            <div className="service-image" key={i}>
                                                <div className="wrap_image">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        width={340} height={206}
                                                        src={img} alt={s.title}
                                                        loading="lazy"
                                                        style={{ width: "100%", height: "auto", borderRadius: "8px", objectFit: "cover" }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="service-tag">
                                        {s.tags.map((tag) => (
                                            <span key={tag} className="tag-item text-body-3 fw-medium text-black-72">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="service-desc text-black-56">{s.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
