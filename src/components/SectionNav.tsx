"use client";

import { useEffect, useRef, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

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
    <nav
      style={{
        position: "sticky",
        top: "24px",
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        padding: "8px",
        marginBottom: "8px",
        zIndex: 20,
        borderRadius: "100px",
        background: "rgba(20,22,26,0.55)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        width: "fit-content",
      }}
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              // Instant feedback - don't wait on the passive scroll tracker
              // to eventually agree, since its 1.2s-animation-then-settle
              // path is exactly what was landing on the wrong pill.
              setActive(s.id);
              suppressUntil.current = Date.now() + 1500;
              smoothScrollTo(`#${s.id}`, { offset: -100 });
            }}
            style={{
              padding: "7px 16px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              border: `1px solid ${isActive ? "rgba(0,222,81,0.5)" : "transparent"}`,
              background: isActive ? "rgba(0,222,81,0.14)" : "transparent",
              color: isActive ? "#00de51" : "rgba(255,255,255,0.6)",
              boxShadow: isActive ? "0 0 16px rgba(0,222,81,0.15)" : "none",
              transition: "all 0.25s ease",
            }}
          >
            {s.label}
          </button>
        );
      })}
    </nav>
  );
}
