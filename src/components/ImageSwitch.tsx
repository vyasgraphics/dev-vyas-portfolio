type Props = {
  light: string;
  dark?: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  loading?: "lazy" | "eager";
};

// Named ImageSwitch and keeps the light/dark props for the (now degenerate)
// call sites, but the site is permanently locked to the dark theme with no
// toggle - so this always resolves to the dark variant. No client-side
// theme detection needed, which also means no flash of the light-mode
// image on first paint the way the old mounted-gate version had.
export function ImageSwitch({ light, dark, alt = "Image", width, height, className, loading = "lazy" }: Props) {
  const src = dark ?? light;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={["image-switch", className].filter(Boolean).join(" ")}
      data-light={light}
      data-dark={dark}
      loading={loading}
      width={width}
      height={height}
      src={src}
      alt={alt}
    />
  );
}
