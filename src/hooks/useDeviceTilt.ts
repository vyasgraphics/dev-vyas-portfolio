"use client";

// Device-motion tilt for touch devices, mirroring the mouse-hover tilt on
// desktop. One shared `deviceorientation` listener feeds every subscribed
// TiltCard rather than each card attaching its own - orientation events
// can fire quite frequently, and there are usually several tilt cards on
// a page at once.
//
// iOS 13+ requires DeviceOrientationEvent.requestPermission(), which must
// be called from a real user gesture (a tap) - it can't be requested
// automatically on load. Android and older iOS don't gate it at all.
// TiltPermissionPrompt.tsx is the tap target that satisfies this for iOS;
// everywhere else just starts listening immediately.

type TiltListener = (px: number, py: number) => void;

const listeners = new Set<TiltListener>();
let listening = false;
let baseline: { beta: number; gamma: number } | null = null;
let permissionGranted = false;

// How many degrees of physical tilt (from wherever the phone happened to
// be held when listening started) maps to the card's full range of
// motion. Smaller = more sensitive.
const DEGREES_FOR_FULL_TILT = 24;

function handleOrientation(e: DeviceOrientationEvent) {
  if (e.beta === null || e.gamma === null) return;
  // First reading becomes the neutral baseline - people hold phones at
  // all sorts of resting angles, so calibrating to "flat" or "90°" would
  // feel arbitrary. Tilt is reported relative to however they were
  // already holding it when this started.
  if (!baseline) {
    baseline = { beta: e.beta, gamma: e.gamma };
    return;
  }
  const dGamma = e.gamma - baseline.gamma; // left/right
  const dBeta = e.beta - baseline.beta; // forward/back
  const px = Math.max(-0.5, Math.min(0.5, dGamma / DEGREES_FOR_FULL_TILT));
  const py = Math.max(-0.5, Math.min(0.5, dBeta / DEGREES_FOR_FULL_TILT));
  listeners.forEach((l) => l(px, py));
}

function ensureListening() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("deviceorientation", handleOrientation);
}

export function deviceTiltNeedsPermission(): boolean {
  if (typeof window === "undefined") return false;
  const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
  return typeof DOE?.requestPermission === "function";
}

export function isDeviceTiltGranted() {
  return permissionGranted;
}

export async function requestDeviceTiltPermission(): Promise<boolean> {
  if (!deviceTiltNeedsPermission()) {
    permissionGranted = true;
    ensureListening();
    return true;
  }
  try {
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> };
    const result = await DOE.requestPermission();
    if (result === "granted") {
      permissionGranted = true;
      ensureListening();
      return true;
    }
  } catch {
    // Ignore - user declined, or the API rejected for some other reason.
    // The prompt component just stays available to try again.
  }
  return false;
}

export function subscribeDeviceTilt(cb: TiltListener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// Android and pre-iOS-13 Safari never gate this behind a permission
// prompt at all - safe to just start listening as soon as this module
// loads on a client that has the API and doesn't need permission.
if (typeof window !== "undefined" && typeof window.DeviceOrientationEvent !== "undefined" && !deviceTiltNeedsPermission()) {
  permissionGranted = true;
  ensureListening();
}
