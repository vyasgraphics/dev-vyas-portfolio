"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A category card that lights up on hover, throwing a cone of light down
 * over its logos and bringing them from desaturated to full colour.
 *
 * Originally built with an explicit on/off switch. That was replaced with
 * hover because a switch asks the visitor to do work before the section
 * shows them anything, and on a portfolio someone is skimming in under a
 * minute, nothing should need to be operated to be legible. Hovering is
 * free; a row of switches is a small chore.
 *
 * Touch devices have no hover, so the same states are driven by tap there,
 * and the card is only focusable/tappable on those devices. On a pointer
 * device the card is not a button at all, since making a non-interactive
 * display card announce itself as a control would be worse for anyone on a
 * screen reader than leaving it as plain content.
 *
 * The light layer is decorative: aria-hidden, pointer-events none, and a
 * sibling of the content rather than an ancestor, so its opacity never
 * creates a stacking context around anything that needs to sit above it.
 *
 * A second, finer-grained highlight sits on top of the card-wide one: on
 * desktop, :hover on an individual .tech-tool-pill (in styles.css) gives
 * just that pill its own lift/border/glow, on top of whatever the card-wide
 * hover already did to every pill. :hover has no touch equivalent - there
 * is no "currently pointed at" between taps - so that second layer needs
 * its own explicit state here, applied imperatively as a class rather than
 * through React, because the pills arrive as opaque `children` this
 * component doesn't render or control individually.
 */
export function IllumineCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [lit, setLit] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const litPillRef = useRef<HTMLElement | null>(null);

  // Resolved after mount rather than during render: the server has no way
  // to know the pointer type, so deciding this during render would produce
  // markup that disagrees with the client and trip a hydration mismatch.
  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
  }, []);

  const clearLitPill = () => {
    litPillRef.current?.classList.remove("is-pill-lit");
    litPillRef.current = null;
  };

  // On touch, a tap anywhere else should put the card back to rest,
  // otherwise every card a visitor prods stays lit for the rest of the
  // visit and the effect stops meaning anything. Same for a single pill's
  // extra highlight - it should not survive past the card it lives in
  // going dark.
  useEffect(() => {
    if (!isTouch || !lit) return;
    const onDocPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setLit(false);
        clearLitPill();
      }
    };
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
  }, [isTouch, lit]);

  const touchProps = isTouch
    ? {
        role: "button" as const,
        tabIndex: 0,
        "aria-pressed": lit,
        "aria-label": `${label} tools`,
        onClick: (e: React.MouseEvent<HTMLDivElement>) => {
          const pill = (e.target as HTMLElement).closest<HTMLElement>(".tech-tool-pill");
          if (pill) {
            // Tapping a specific tool always lights the card rather than
            // toggling it - picking a tool while browsing shouldn't be able
            // to darken everything else you're looking at. Tapping the same
            // pill again just clears that pill's own accent, same as moving
            // the mouse off one pill but staying on the card would on
            // desktop.
            setLit(true);
            if (litPillRef.current === pill) {
              clearLitPill();
            } else {
              clearLitPill();
              pill.classList.add("is-pill-lit");
              litPillRef.current = pill;
            }
            return;
          }
          // A tap on the card background (not a specific tool) toggles the
          // whole card, as before - and drops any single-pill accent along
          // with it, since that accent only makes sense relative to a lit
          // card.
          setLit((v) => {
            const next = !v;
            if (!next) clearLitPill();
            return next;
          });
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLit((v) => {
              const next = !v;
              if (!next) clearLitPill();
              return next;
            });
          }
        },
      }
    : {};

  return (
    <div
      ref={ref}
      className={`vg-illumine${lit ? " is-on" : ""}${isTouch ? " is-touch" : ""}`}
      {...touchProps}
    >
      <div className="vg-illumine-light" aria-hidden="true">
        <div className="vg-illumine-slit" />
        <div className="vg-illumine-lumen">
          <div className="lum-wide" />
          <div className="lum-core" />
        </div>
        <div className="vg-illumine-shade">
          <div className="shade-l" />
          <div className="shade-r" />
        </div>
      </div>

      <div className="vg-illumine-body">
        <span className="vg-illumine-label">{label}</span>
        <div className="vg-illumine-tools">{children}</div>
      </div>
    </div>
  );
}
