"use client";

import { useEffect, useRef, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

// Wide screens (>=1180px): a minimal dot rail fixed to the right edge of
// the viewport (see styles.css) - out of the reading column, current
// section's label shown persistently, others on hover.
// Narrower screens: the same "stay out of the way, available on demand"
// idea adapted for touch - a small floating pill fixed at the bottom-left
// showing just the current section name, which expands upward into a
// tappable list on tap. Neither variant occupies space in the document
// flow or sits over the top of scrolled content the way the old sticky
// pill bar did.
export function SectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  // While a nav click's scroll animation is in flight, the passive scroll
  // tracker below would otherwise recompute "active" from whatever section
  // happens to be under the fold at each intermediate frame of that ~1.2s
  // animation (including ones it's just passing through), fighting the
  // just-clicked target. This suppresses that recomputation until the
  // animation has had time to settle, same pattern as suppressPassiveHashSync.
  const suppressUntil = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < suppressUntil.current) return;
      // Last section whose top has crossed the activation line wins.
      // Neither nav variant occupies top space any more (dot rail is on
      // the right, mobile trigger is at the bottom) so a small line close
      // to the actual top of the viewport is enough on both breakpoints.
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 90) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  // Tap-outside closes the expanded mobile list.
  useEffect(() => {
    if (!expanded) return;
    const onOutside = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [expanded]);

  const activeLabel = sections.find((s) => s.id === active)?.label ?? "";

  const goTo = (id: string) => {
    setActive(id);
    setExpanded(false);
    suppressUntil.current = Date.now() + 1500;
    smoothScrollTo(`#${id}`, { offset: -24 });
  };

  return (
    <div ref={navRef} className={`section-nav${expanded ? " is-expanded" : ""}`}>
      {/* Mobile/tablet collapsed trigger - CSS hides this at desktop width */}
      <button
        type="button"
        className="section-nav-trigger vg-tactile"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="section-nav-trigger-dot" />
        {activeLabel}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="section-nav-chevron">
          <path d="M2.5 7.5 6 4l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <nav className="section-nav-list">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              className={`section-nav-btn vg-tactile${isActive ? " is-active" : ""}`}
              aria-label={s.label}
              onClick={() => goTo(s.id)}
            >
              <span className="section-nav-label">{s.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
