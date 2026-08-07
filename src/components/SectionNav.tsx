"use client";

import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

export function SectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      // last section whose top has scrolled past a fixed offset wins -
      // same "which one are we actually reading" logic as a simple
      // reading-progress tracker, just without needing GSAP's ScrollTrigger.
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 160) current = s.id;
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
        gap: "8px",
        padding: "12px 0",
        marginBottom: "8px",
        zIndex: 20,
        background: "#0a0a0a",
      }}
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => smoothScrollTo(`#${s.id}`, { offset: -100 })}
            style={{
              padding: "7px 16px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              border: `1px solid ${isActive ? "rgba(0,222,81,0.5)" : "rgba(255,255,255,0.15)"}`,
              background: isActive ? "rgba(0,222,81,0.12)" : "transparent",
              color: isActive ? "#00de51" : "rgba(255,255,255,0.55)",
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
