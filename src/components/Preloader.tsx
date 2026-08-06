"use client";

import { useEffect, useState } from "react";

type PreloaderProps = {
  bgDark?: boolean;
};

export function Preloader({ bgDark = true }: PreloaderProps = {}) {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 400);
    const t2 = setTimeout(() => setRemoved(true), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`preload preload-container${bgDark ? " bg-dark" : ""}`}
      id="preload"
      style={{
        opacity: hidden ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: hidden ? "none" : undefined,
      }}
    >
      <div className="preload-logo">
        <div className="spinner" />
      </div>
    </div>
  );
}
