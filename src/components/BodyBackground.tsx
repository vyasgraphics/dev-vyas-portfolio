"use client";

import { useEffect, useRef } from "react";

type Props = {
  showCloudItem?: boolean;
  showVideo?: boolean;
  containerClass?: string;
  videoSrc?: string;
};

export function BodyBackground({
  showCloudItem = true,
  showVideo = true,
  containerClass = "",
  videoSrc = "/assets/images/overlay-2.mp4",
}: Props = {}) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<"a" | "b">("a");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!showVideo) return;

    const va = videoARef.current;
    const vb = videoBRef.current;
    if (!va || !vb) return;

    // Fade duration in seconds - how long the crossfade lasts
    const FADE_DURATION = 1.2;
    // How many seconds before the end to start the fade
    const FADE_START_BEFORE_END = 1.4;

    // Initialise: A visible, B hidden
    va.style.opacity = "1";
    vb.style.opacity = "0";
    va.play().catch(() => {});
    vb.load();

    const tick = () => {
      const active = activeRef.current === "a" ? va : vb;
      const standby = activeRef.current === "a" ? vb : va;

      if (!active.duration || active.duration === Infinity) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const timeLeft = active.duration - active.currentTime;

      // Start preloading standby a bit before we need it
      if (timeLeft < FADE_START_BEFORE_END + 0.5 && standby.paused) {
        standby.currentTime = 0;
        standby.play().catch(() => {});
      }

      // Cross-fade
      if (timeLeft < FADE_START_BEFORE_END) {
        const progress = Math.max(0, Math.min(1,
          1 - (timeLeft / FADE_DURATION)
        ));
        active.style.opacity = String(1 - progress);
        standby.style.opacity = String(progress);

        // Once fully transitioned, reset active and swap refs
        if (progress >= 1) {
          active.pause();
          active.currentTime = 0;
          active.style.opacity = "0";
          standby.style.opacity = "1";
          activeRef.current = activeRef.current === "a" ? "b" : "a";
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      va.pause();
      vb.pause();
    };
  }, [showVideo, videoSrc]);

  return (
    <div className={`body-background${containerClass ? " " + containerClass : ""}`}>
      {showCloudItem && (
        <div className="bg-item">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" width={1440} height={900} src="/assets/images/item/cloud-bg.png" alt="background" />
        </div>
      )}
      {showVideo && (
        <div className="bg-video video-dark" style={{ position: "relative" }}>
          {/* Video A */}
          <video
            ref={videoARef}
            className="video"
            muted
            playsInline
            preload="auto"
            style={{ transition: `opacity ${1.2}s ease`, position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Video B - standby clone */}
          <video
            ref={videoBRef}
            className="video"
            muted
            playsInline
            preload="auto"
            style={{ transition: `opacity ${1.2}s ease`, position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0 }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="overlay-1" style={{ position: "absolute", inset: 0 }} />
        </div>
      )}
    </div>
  );
}
