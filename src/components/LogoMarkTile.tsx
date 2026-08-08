import Image from "next/image";

// Small framed tile for a single logo mark - used in the Brand Identity
// Marks grid. Deliberately simple (no tilt/hover machinery) since these are
// dense small grids; a plain card keeps 5+ of them readable together.
export function LogoMarkTile({
  src,
  alt,
  width,
  height,
  label,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        className="vg-card"
        style={{
          width: "100%",
          minHeight: "128px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          padding: "22px",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ width: "100%", height: "auto", maxHeight: "88px", objectFit: "contain" }}
        />
      </div>
      <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.55)", textAlign: "center" }}>
        {label}
      </span>
    </div>
  );
}
