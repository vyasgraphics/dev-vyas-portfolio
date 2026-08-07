"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/skills";
import { smoothScrollTo } from "@/lib/smoothScroll";

export function Skills() {
    useEffect(() => {
        const container = document.getElementById("accordion-skill");
        if (!container) return;

        // On mobile: scroll the opened item into view after Bootstrap finishes expanding
        const onShown = (e: Event) => {
            if (window.innerWidth >= 992) return;
            const collapseEl = e.target as HTMLElement;
            const item = collapseEl.closest<HTMLElement>(".skill-accordion_item");
            if (!item) return;
            requestAnimationFrame(() => {
                smoothScrollTo(item, { center: true, duration: 0.9 });
            });
        };

        // After any accordion transition ends, refresh ScrollTrigger so
        // sections below (Education, Tech, Blog, Contact) recalculate their
        // trigger points. Without this, GSAP thinks those sections are at
        // the wrong scroll position and they stay permanently invisible.
        const onTransitionEnd = () => {
            ScrollTrigger.refresh();
            // Also un-hide any elements that GSAP may have set to autoAlpha:0
            // and whose ScrollTrigger already fired (past their trigger point)
            const hiddenEls = document.querySelectorAll<HTMLElement>(
                ".flat-spacing [style*='visibility: hidden'], .flat-spacing [style*='opacity: 0']"
            );
            hiddenEls.forEach((el) => {
                const rect = el.getBoundingClientRect();
                // If it's above or at the bottom of the viewport, make it visible
                if (rect.top < window.innerHeight + 200) {
                    gsap.set(el, { autoAlpha: 1, y: 0, x: 0 });
                }
            });
        };

        container.addEventListener("shown.bs.collapse", onShown);
        container.addEventListener("hidden.bs.collapse", onTransitionEnd);
        container.addEventListener("shown.bs.collapse", onTransitionEnd);

        return () => {
            container.removeEventListener("shown.bs.collapse", onShown);
            container.removeEventListener("hidden.bs.collapse", onTransitionEnd);
            container.removeEventListener("shown.bs.collapse", onTransitionEnd);
        };
    }, []);

    return (
        <div id="skill" className="section-skill flat-spacing">
            <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
                <i className="icon icon-service" />
                Skills
            </div>

            <div id="accordion-skill">
                {skills.map((s, idx) => {
                    const isOpen = idx === 0;
                    return (
                        <div key={s.id} className="skill-accordion_item">
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
                                data-bs-parent="#accordion-skill"
                            >
                                <div className="accordion-content">
                                    <div className="tf-grid-layout sm-col-2">
                                        {s.images.map((img, i) => (
                                            <div className="skill-image" key={i}>
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
                                    <div className="skill-tag">
                                        {s.tags.map((tag) => (
                                            <span key={tag} className="tag-item text-body-3 fw-medium text-black-72">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="skill-desc text-black-56">{s.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
