"use client";

import Image from "next/image";
import { smoothScrollTo } from "@/lib/smoothScroll";

type BentoTile = {
  id: string;
  label: string;
  teaser: string;
  image: string;
  alt: string;
  /** Grid span in the 3-column desktop layout. */
  span: 1 | 2 | 3;
};

// The bento grid itself. Six clickable tiles, one per section below, sized
// by how much that section actually holds - Identity and Sports are the two
// richest sections on the page (a five-mark gallery plus a vectorisation
// case study; two full tournament campaigns), so they get the wide/full-
// width cells, while the lighter sections sit as standard tiles. This is
// the literal "bento grid" - a real CSS grid with varied cell sizes, sitting
// above the section-by-section deep dive rather than replacing it (the
// sections themselves stay full-width below, in SectionBox cards, because
// the glass decks inside them need that width to fan out correctly - see
// SectionBox.tsx and the many GlassDeck usages in page.tsx).
export function BentoIntro({ tiles }: { tiles: BentoTile[] }) {
  const go = (id: string) => {
    smoothScrollTo(`#${id}`, { offset: -24, pushHistory: `#${id}` });
  };

  return (
    <div className="vg-bento-grid">
      {tiles.map((t) => (
        <button
          key={t.id}
          type="button"
          className="vg-bento-tile vg-tactile"
          data-span={t.span}
          onClick={() => go(t.id)}
        >
          <Image
            src={t.image}
            alt={t.alt}
            fill
            sizes="(max-width: 767px) 100vw, 480px"
            style={{ objectFit: "cover", filter: "brightness(0.8) saturate(1.08)" }}
          />
          <span className="vg-bento-tile-scrim" aria-hidden />
          <span className="vg-bento-tile-content">
            <span className="vg-bento-tile-label">{t.label}</span>
            <span className="vg-bento-tile-teaser">{t.teaser}</span>
          </span>
          <span className="vg-bento-tile-arrow" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      ))}

      <style>{`
        .vg-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 168px;
          gap: 14px;
          margin-bottom: 8px;
        }
        .vg-bento-tile[data-span="2"] { grid-column: span 2; }
        .vg-bento-tile[data-span="3"] { grid-column: span 3; grid-row: span 2; }

        .vg-bento-tile {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: #111;
          cursor: pointer;
          padding: 0;
          text-align: left;
        }
        .vg-bento-tile-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.75) 78%, rgba(10,10,10,0.92) 100%);
        }
        .vg-bento-tile-content {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 14px 16px;
        }
        .vg-bento-tile-label {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
        }
        .vg-bento-tile[data-span="2"] .vg-bento-tile-label,
        .vg-bento-tile[data-span="3"] .vg-bento-tile-label {
          font-size: 17px;
        }
        .vg-bento-tile-teaser {
          font-size: 11.5px;
          color: rgba(255,255,255,0.6);
          line-height: 1.4;
        }
        .vg-bento-tile-arrow {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: rgba(20,22,26,0.55);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        @media (max-width: 767px) {
          .vg-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 140px;
          }
          .vg-bento-tile[data-span="2"],
          .vg-bento-tile[data-span="3"] {
            grid-column: span 2;
          }
        }
      `}</style>
    </div>
  );
}

export type { BentoTile };
