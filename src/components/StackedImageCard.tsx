"use client";

import Image from "next/image";

type StackImage = { src: string; alt: string; w: number; h: number };

// Two images layered with a slight rotation offset, back card peeking out
// behind the front one - a small pile of physical photos rather than a
// single flat tile. On hover the back card slides further out and both
// straighten slightly, so the stack visibly "fans" the way a real loose
// pile of photos shifts when nudged - cursor switches to grab to signal
// it's the whole cluster reacting, not just an image being magnified.
export function StackedImageCard({
  front,
  back,
  height = 260,
}: {
  front: StackImage;
  back: StackImage;
  height?: number;
}) {
  return (
    <div className="vg-stack" style={{ height: `${height}px` }}>
      <div className="vg-stack-back">
        <Image
          src={back.src}
          alt={back.alt}
          width={back.w}
          height={back.h}
          style={{ height: `${height}px`, width: "auto", display: "block", borderRadius: "10px" }}
        />
      </div>
      <div className="vg-stack-front vg-card">
        <Image
          src={front.src}
          alt={front.alt}
          width={front.w}
          height={front.h}
          style={{ height: `${height}px`, width: "auto", display: "block", borderRadius: "10px" }}
        />
      </div>

      <style jsx>{`
        .vg-stack {
          position: relative;
          display: inline-flex;
          cursor: grab;
        }
        .vg-stack-back {
          position: absolute;
          top: 0;
          left: 0;
          transform: rotate(-9deg) translate(-10px, 3px);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          filter: brightness(0.75);
        }
        .vg-stack-front {
          position: relative;
          transform: rotate(4deg);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @media (hover: hover) {
          .vg-stack:hover .vg-stack-back {
            transform: rotate(-14deg) translate(-20px, 8px);
            filter: brightness(0.9);
          }
          .vg-stack:hover .vg-stack-front {
            transform: rotate(1deg) translate(4px, -4px);
          }
        }
      `}</style>
    </div>
  );
}
