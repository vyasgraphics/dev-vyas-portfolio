"use client";

import { useState, type ReactNode } from "react";

/**
 * A card that sits dark until you flip its switch, at which point a slit
 * along the top edge lights up and throws a cone of light down over the
 * contents, bringing the tool logos up from dimmed to full colour.
 *
 * Adapted from a "luminous card" reference that was built as a single
 * fixed-size portrait card (18rem x 24rem) with the light source in the
 * middle and the content pinned to the bottom. Three things had to change
 * for it to work here:
 *
 * 1. Shape. These cards are wide and their height varies with how many
 *    tools a category holds, so every fixed rem measurement in the original
 *    became a percentage or a viewport-aware clamp. The light source moved
 *    from the centre of the card to just under the top edge, so the cone
 *    falls across the logos rather than up behind a title.
 *
 * 2. Colour. The reference lit everything in white. Here the slit and cone
 *    are the site's own green, which also means the "off" state can simply
 *    be the site's normal card styling rather than a separate dark theme.
 *
 * 3. The switch. The original used a hidden checkbox and CSS sibling
 *    selectors. This uses a real button with role="switch" and aria-checked
 *    so it is announced properly and is keyboard operable, and it carries
 *    the same press feedback (scale down, inset shadow, no white rim) as
 *    every other control on the site rather than the reference's own
 *    chrome-effect toggle.
 *
 * The light is drawn on a layer marked aria-hidden and pointer-events:none,
 * so it is decoration only and never intercepts a click meant for the card.
 */
export function IllumineCard({
  label,
  defaultOn = false,
  children,
}: {
  label: string;
  defaultOn?: boolean;
  children: ReactNode;
}) {
  const [on, setOn] = useState(defaultOn);

  return (
    <div className={`vg-illumine${on ? " is-on" : ""}`}>
      {/* Decorative light layers. Kept as siblings of the content rather
          than ancestors of it: an ancestor carrying a filter or opacity
          would create a stacking context and trap the content's own
          z-index, which has bitten this codebase before. */}
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
        <div className="vg-illumine-tools">{children}</div>

        <div className="vg-illumine-foot">
          <span className="vg-illumine-label">{label}</span>

          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={`Illuminate ${label}`}
            className="vg-illumine-switch"
            onClick={() => setOn((v) => !v)}
          >
            <span className="vg-illumine-knob" />
          </button>
        </div>
      </div>
    </div>
  );
}
