"use client";

import { useEffect, useRef, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

// Renders as a horizontal glass pill bar sticky under the header on
// narrower viewports, and collapses to a minimal dot rail fixed to the
// right edge of the viewport on wide screens (see the ".section-nav"
// rules in styles.css) - full labels stay out of the way while reading,
// appearing on hover (and persistently for whichever section is active,
// so there's still a sense of "where am I" without needing to hover).
export function SectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
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
      // Last section whose top has crossed the activation line wins. The
      // line sits at 220px rather than flush with the sticky nav because
      // that's where smoothScrollTo's offset actually lands a clicked
      // section at rest (confirmed empirically: ~212px, not 0) - a tighter
      // line here just meant the click-to-scroll case landed past it and
      // never registered.
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 220) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <nav className="section-nav">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            className={`section-nav-btn${isActive ? " is-active" : ""}`}
            aria-label={s.label}
            onClick={() => {
              // Instant feedback - don't wait on the passive scroll tracker
              // to eventually agree, since its 1.2s-animation-then-settle
              // path is exactly what was landing on the wrong pill.
              setActive(s.id);
              suppressUntil.current = Date.now() + 1500;
              smoothScrollTo(`#${s.id}`, { offset: -100 });
            }}
          >
            <span className="section-nav-label">{s.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
