"use client";

import { useEffect, useState } from "react";
import { deviceTiltNeedsPermission, isDeviceTiltGranted, requestDeviceTiltPermission } from "@/hooks/useDeviceTilt";

// Only ever renders anything on iOS 13+ touch devices that haven't
// granted device-motion permission yet - Android and desktop never show
// this at all (Android needs no permission; desktop already gets the
// mouse-hover tilt with no prompt required). One tap here is what turns
// physically tilting the phone into the same tilt effect the persona and
// wireframe cards already have on hover.
export function TiltPermissionPrompt() {
  const [visible, setVisible] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const isTouchPrimary = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchPrimary && deviceTiltNeedsPermission() && !isDeviceTiltGranted()) {
      setVisible(true);
    }
  }, []);

  if (!visible || granted) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        const ok = await requestDeviceTiltPermission();
        if (ok) setGranted(true);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "9px 16px",
        borderRadius: "100px",
        background: "rgba(0,222,81,0.1)",
        border: "1px solid rgba(0,222,81,0.3)",
        color: "#00DE51",
        fontSize: "12.5px",
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
      Tilt your phone to try the 3D cards
    </button>
  );
}
