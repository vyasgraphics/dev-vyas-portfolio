import Link from "next/link";

type HeaderClockProps = {
  variant?: "v1" | "v2" | "v3";
};

export function HeaderClock({ variant = "v1" }: HeaderClockProps = {}) {
  const leftClass = variant === "v1" ? "left" : "left p-0";
  return (
    <div className="tf-header-wrap">
      {/* Mobile logo */}
      <Link href="/" className="logo-site d-lg-none" style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/logo/dv-logo-source.png"
          alt="Dev Vyas"
          width={36}
          height={36}
          style={{ objectFit: "contain", width: "36px", height: "36px" }}
        />
      </Link>
      <div className={leftClass}>
        {/* Date and time, right-aligned and stacked on both mobile and desktop */}
        <div className="time-local text-body-3" style={{ textAlign: "right" }}>
          <p className="date" />
          <p className="clock" />
        </div>
      </div>
    </div>
  );
}
