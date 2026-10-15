"use client";

import { useState, useSyncExternalStore } from "react";
import { isDeviceTiltEnabled, subscribeDeviceTiltState, toggleDeviceTilt } from "@/hooks/useDeviceTilt";

function subscribeNever() {
  return () => {};
}

// Touch-primary is only known client-side (matchMedia isn't available
// during SSR), and doesn't change over the component's lifetime, so this
// reads it via useSyncExternalStore rather than setState-in-effect - React
// settles the value on hydration without an extra cascading render.
function useTouchPrimary() {
  return useSyncExternalStore(
    subscribeNever,
    () => window.matchMedia("(hover: none) and (pointer: coarse)").matches,
    () => false
  );
}

// Same on/off control as the inline TiltPermissionPrompt banner up near
// the first persona card, just always reachable - sat beside Back to Top
// so both live in the same corner, and (unlike Back to Top)
// visible regardless of scroll position, since toggling the effect is
// useful the moment you land on the page, not just after scrolling away
// from the top.
export function FloatingTiltToggle() {
  const visible = useTouchPrimary();
  const enabled = useSyncExternalStore(subscribeDeviceTiltState, isDeviceTiltEnabled, () => false);
  const [busy, setBusy] = useState(false);
  const [denied, setDenied] = useState(false);

  if (!visible) return null;

  return (
    // Beside Back to Top (44px wide at right: 28px, plus a 10px gap) rather
    // than stacked 100px up: stacked, the two covered a 116px band of body
    // text on the right of a phone screen. In one row they share the bottom
    // band with SectionNav, which ends by x~180 for its longest label, so
    // this still clears it at 320px.
    <div style={{ position: "fixed", bottom: "28px", right: "82px", zIndex: 40, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
      {/* Same "iOS gives no dialog on a repeat denial" situation as
          TiltPermissionPrompt - doing nothing here reads as broken. */}
      {denied && (
        <p style={{
          fontSize: "11px", lineHeight: 1.5, color: "rgba(255,255,255,0.7)",
          background: "rgba(20,22,26,0.92)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "10px", padding: "8px 10px", maxWidth: "200px", textAlign: "right",
        }}>
          Motion access is off. Settings → Safari → Motion &amp; Orientation Access → on, then reload.
        </p>
      )}
      <button
        type="button"
        className="vg-tactile"
        aria-label={enabled ? "Turn off 3D tilt effect" : "Turn on 3D tilt effect"}
        aria-pressed={enabled}
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          const result = await toggleDeviceTilt();
          setDenied(result === "denied");
          setBusy(false);
        }}
        style={{
          position: "relative",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: `1px solid ${enabled ? "rgba(0,222,81,0.55)" : "rgba(255,255,255,0.2)"}`,
          background: enabled ? "rgba(0,222,81,0.18)" : "rgba(27,30,35,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: enabled ? "#00DE51" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: busy ? "default" : "pointer",
          opacity: busy ? 0.7 : 1,
          boxShadow: enabled ? "0 0 14px rgba(0,222,81,0.3)" : "none",
          transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: enabled ? "#00DE51" : "rgba(255,255,255,0.25)",
            border: "1.5px solid #0a0a0a",
            transition: "background 0.2s ease",
          }}
        />
      </button>
    </div>
  );
}
