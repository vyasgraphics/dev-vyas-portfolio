"use client";

import Image from "next/image";

// Gives a single grid image the same tactile "physical photo" depth as the
// hero's stacked cards, without needing a second image to pair it with -
// most images in these grids are their own distinct piece (a specific
// social post, a specific match poster), so pairing two unrelated ones
// into a fake stack would blur what each image actually is. Instead, a
// blank rotated card-back peeks out behind the real image, the same way a
// single photo still reads as "part of a pile" sitting slightly askew on
// top of whatever's underneath it. Hover fans the peek out further and
// straightens the front photo, cursor becomes grab.
export function PhotoStackTile({
  src,
  alt,
  width,
  height,
  tone = "#1b1e23",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  tone?: string;
}) {
  return (
    <div className="vg-pstack">
      <div className="vg-pstack-back" style={{ background: tone }} />
      <div className="vg-pstack-front vg-card">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ width: "100%", height: "auto", display: "block", borderRadius: "10px" }}
        />
      </div>

      <style jsx>{`
        .vg-pstack {
          position: relative;
          cursor: grab;
        }
        .vg-pstack-back {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transform: rotate(-6deg) scale(0.97);
          transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .vg-pstack-front {
          position: relative;
          transform: rotate(2.5deg);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @media (hover: hover) {
          .vg-pstack:hover .vg-pstack-back {
            transform: rotate(-10deg) scale(0.97) translate(-6px, 5px);
          }
          .vg-pstack:hover .vg-pstack-front {
            transform: rotate(0.5deg) translate(2px, -3px);
          }
        }
      `}</style>
    </div>
  );
}
