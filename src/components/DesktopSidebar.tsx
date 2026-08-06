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

    const runOnScroll = () => {
        const scrollY = window.scrollY + window.innerHeight / 3;
        let current = "#home";
        for (const { href, el } of sections) {
            if (el && el.offsetTop <= scrollY) current = href;
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
    history.pushState(null, "", "#home");
    smoothScrollToTop();
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
