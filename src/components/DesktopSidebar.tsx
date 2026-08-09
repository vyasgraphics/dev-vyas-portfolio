"use client";

import { navItems } from "@/data/nav";
import { useEffect, useState } from "react";
import { smoothScrollTo, smoothScrollToTop } from "@/lib/smoothScroll";

type DesktopSidebarProps = {
  positionClass?: string;
};

export function DesktopSidebar({ positionClass = "pst-v1" }: DesktopSidebarProps = {}) {
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const sections = navItems.map(item => ({
        href: item.href,
        el: document.querySelector(item.href) as HTMLElement | null,
    })).filter(s => s.el);

    // Was comparing el.offsetTop (distance from the nearest POSITIONED
    // ancestor, not the document root) against window.scrollY (always
    // document-relative) - these silently stopped agreeing once anything
    // with its own position was added above #wrapper in the page (#wrapper
    // itself has position:relative from the original template CSS, which
    // was harmless while #wrapper was the first thing on the page, but
    // broke the second something - the welcome-reveal intro - was added
    // above it). Confirmed via direct measurement: #about read
    // offsetTop:2559 while its true page position was 4359, a 1800px gap
    // matching the intro's own height exactly. Same class of bug already
    // hit and fixed once before for the Work sidebar (see the reference-
    // frame note in useIsakAnimations.ts) - same fix here: getBoundingClientRect()
    // is always viewport-accurate regardless of any ancestor's positioning,
    // no reference-frame ambiguity.
    const runOnScroll = () => {
        const threshold = window.innerHeight / 3;
        let current = "#home";
        for (const { href, el } of sections) {
            if (el && el.getBoundingClientRect().top <= threshold) current = href;
        }
        setActiveHref(current);
    };
    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            ticking = false;
            runOnScroll();
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    runOnScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault();
    // On the homepage, "back to top" should land on the actual home
    // content (#home) - since the welcome-reveal intro was added above it,
    // the true top of the document is now the start of that 3D scroll
    // animation, not the page itself, which isn't what "back to top"
    // should mean here. Other pages (case studies, blog posts) have no
    // welcome intro and no #home section at all, so there the original
    // behaviour (scroll to the true document top) is exactly right and is
    // preserved unchanged.
    const home = document.querySelector("#home");
    if (home) {
      smoothScrollTo("#home", { pushHistory: "#home" });
    } else {
      history.pushState(null, "", "#home");
      smoothScrollToTop();
    }
  };

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    smoothScrollTo(href, { pushHistory: href });
  };

  return (
    <div className={`sidebar-tools ${positionClass}`}>
      <div className="nav-top" />
      <ul className="nav-list">
        {navItems.map((item, i) => (
          <li key={item.href + i} className={`nav-item${activeHref === item.href ? " active" : ""}`}>
            <a
              href={item.href}
              className={`item-link scroll-link${activeHref === item.href ? " active" : ""}`}
              onClick={(e) => scrollTo(e, item.href)}
            >
              <i className={`icon ${item.icon}`} />
              <p className="tool-tip text-caption">{item.label}</p>
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-bottom">
        <a href="#" className="tf-btn-icon go-top" onClick={goTop} aria-label="Back to top">
          <i className="icon icon-arrow-top" />
        </a>
      </div>
    </div>
  );
}
