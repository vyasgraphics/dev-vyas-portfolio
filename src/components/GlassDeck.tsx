"use client";

import { Children, isValidElement, useState, useEffect, type ReactNode, type ReactElement } from "react";

// GlassDeck - literal "fanned glass deck" treatment.
//
// A small, fixed row of equal-size cards that OVERLAP at rest (pulled together
// with negative margins + a per-card resting rotation), then FAN APART and
// straighten together - directly adapting the reference effect
// (container:hover .glass { transform: rotate(0); margin }).
//
// Two interaction models, chosen by input type:
// - Pointer/hover devices (desktop): the deck fans on GROUP HOVER (CSS :hover),
//   the whole hand spreading at once. Pure CSS, no JS state.
// - Touch devices (mobile): hover doesn't exist, so the deck is TAP-TO-FAN -
//   it sits stacked, tap anywhere to spread it open, tap again to close. This
//   is driven by an `is-open` class toggled here in JS, which mirrors the same
//   open-state styles the desktop :hover applies.
//
// The fan geometry lives in CSS (.vg-deck in styles.css); this component only
// assigns each child its resting angle via --vg-deck-r and manages the
// touch open/close state.

export function GlassDeck({
  children,
  angles,
  labels,
  min = "280px",
}: {
  children: ReactNode;
  // Resting rotation (deg) per card, in order. When omitted, a symmetric
  // spread is generated from the card count so decks of any size (2-7) fan
  // evenly around centre.
  angles?: number[];
  // Optional per-card caption shown in a translucent bottom bar, matching the
  // reference deck's data-text label. Index-aligned with children; omit or
  // pass "" for cards that should have no bar.
  labels?: string[];
  // Min column width for the mobile grid fallback base width.
  min?: string;
}) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const n = items.length;

  // Detect a touch / no-hover environment once mounted. On such devices the
  // deck becomes tap-to-fan; on hover devices this stays false and CSS :hover
  // drives everything.
  const [isTouch, setIsTouch] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: none), (max-width: 767px)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Symmetric fan: spread cards evenly across a total arc, centred on 0deg.
  // Tighter per-card step as the deck grows so a 7-card stack doesn't over-
  // rotate the outer cards. e.g. 3 cards -> [-12, 0, 12]; 4 -> [-15,-5,5,15].
  const step = n <= 4 ? 10 : n <= 5 ? 8 : 6;
  const computed = items.map((_, i) => Math.round((i - (n - 1) / 2) * step * 10) / 10);
  const resolved = angles ?? computed;

  const className = ["vg-deck", isTouch ? "vg-deck-touch" : "", isTouch && open ? "is-open" : ""]
    .filter(Boolean)
    .join(" ");

  // Touch interaction model:
  // - When the deck is CLOSED, a tap anywhere spreads it open. We stop the tap
  //   there so it doesn't also trigger a card's play button underneath.
  // - When the deck is OPEN, taps pass straight through to the cards (so a
  //   video plays / a link works). A dedicated close affordance handles
  //   collapsing again, so an open deck behaves like a normal row of cards.
  const handleDeckClick = (e: React.MouseEvent) => {
    if (!isTouch) return;
    if (!open) {
      e.stopPropagation();
      setOpen(true);
    }
    // when open: do nothing here, let the tap reach the card
  };

  return (
    <div
      className={className}
      style={{ ["--vg-deck-min" as string]: min, ["--vg-deck-count" as string]: n }}
      onClickCapture={isTouch && !open ? handleDeckClick : undefined}
      role={isTouch ? "button" : undefined}
      tabIndex={isTouch ? 0 : undefined}
      aria-expanded={isTouch ? open : undefined}
      onKeyDown={
        isTouch
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen((o) => !o);
              }
            }
          : undefined
      }
    >
      {items.map((child, i) => (
        <div
          key={i}
          className="vg-deck-card"
          style={{ ["--vg-deck-r" as string]: resolved[i] ?? 0 }}
        >
          {child}
          {labels?.[i] ? <span className="vg-deck-label">{labels[i]}</span> : null}
        </div>
      ))}
      {isTouch && open ? (
        <button
          type="button"
          className="vg-deck-close"
          aria-label="Close deck"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          Close
        </button>
      ) : null}
    </div>
  );
}
