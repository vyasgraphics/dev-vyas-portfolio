"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * A flipbook shown as a card that turns over to reveal its back cover,
 * then links out to the live page-turning version.
 *
 * Adapted from a hover-to-flip reference card. Two changes mattered:
 *
 * 1. Hover alone is not enough. The reference flipped purely on :hover,
 *    which means it does nothing at all on a phone. Here the flip is also
 *    driven by React state and toggled on tap, so touch users get the same
 *    reveal. Desktop keeps the hover behaviour on top of that.
 *
 * 2. The card carries real artwork rather than text, so the reference's
 *    coral gradients and borders were dropped in favour of the site's own
 *    dark card treatment with the green accent, letting the covers supply
 *    the colour.
 *
 * The link out sits below the card rather than wrapping it. Wrapping the
 * whole thing would make a tap both flip the card and immediately open a
 * new tab, which is exactly the sort of thing that feels broken on a phone.
 */
export function FlipBookCard({
  coverSrc,
  backSrc,
  coverAlt,
  backAlt,
  caption,
  href,
}: {
  coverSrc: string;
  backSrc: string;
  coverAlt: string;
  backAlt: string;
  caption: string;
  href: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="vg-flipbook">
      <button
        type="button"
        className={`vg-flip-card${flipped ? " is-flipped" : ""}`}
        aria-pressed={flipped}
        aria-label={`${caption} - show ${flipped ? "front" : "back"} cover`}
        onClick={() => setFlipped((v) => !v)}
      >
        <span className="vg-flip-inner">
          <span className="vg-flip-face vg-flip-front">
            <Image src={coverSrc} alt={coverAlt} width={760} height={1075} sizes="(max-width: 767px) 45vw, 260px" />
          </span>
          <span className="vg-flip-face vg-flip-back">
            <Image src={backSrc} alt={backAlt} width={760} height={1075} sizes="(max-width: 767px) 45vw, 260px" />
          </span>
        </span>
      </button>

      <div className="vg-flip-meta">
        <p className="vg-flip-caption">{caption}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className="vg-flip-link vg-tactile">
          Flip through it ↗
        </a>
      </div>
    </div>
  );
}
