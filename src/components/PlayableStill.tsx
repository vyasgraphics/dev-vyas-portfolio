"use client";

import Image from "next/image";
import { useState } from "react";

// Shows a still frame with a play-button overlay for motion/video pieces
// where only a key-frame export exists yet. Pass `videoSrc` once a real
// export is available and this switches to an actual inline <video> on
// click - no layout change needed when the real files land.
export function PlayableStill({
  poster,
  videoSrc,
  alt,
  width,
  height,
  caption,
}: {
  poster: string;
  videoSrc?: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${width} / ${height}`,
          borderRadius: "12px",
          overflow: "hidden",
          background: "#000",
          cursor: videoSrc ? "pointer" : "default",
        }}
        onClick={() => {
          if (videoSrc) setPlaying(true);
        }}
      >
        {playing && videoSrc ? (
          <video
            src={videoSrc}
            controls
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            <Image
              src={poster}
              alt={alt}
              width={width}
              height={height}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "rgba(10,10,10,0.65)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                }}
              >
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <path d="M1 1.5L17 10L1 18.5V1.5Z" fill="#fff" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      {caption && (
        <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.55)", textAlign: "center" }}>
          {caption}
        </span>
      )}
    </div>
  );
}
