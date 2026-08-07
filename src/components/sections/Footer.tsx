"use client";

import { smoothScrollTo } from "@/lib/smoothScroll";

export function Footer() {
  return (
    <div id="footer" className="tf-footer flat-spacing">
      {/* Dev's slogan - large, centred, impactful */}
      <div
        className="block-quote effectFade fadeUp no-div"
        style={{ textAlign: "center", padding: "20px 0 8px" }}
      >
        <h2
          className="text-black-72"
          style={{
            fontSize: "clamp(28px, 4.5vw, 56px)",
            fontFamily: "'EB Garamond', Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            margin: "0 auto",
            maxWidth: "720px",
          }}
        >
          User-centred design that works,
          <br />
          <span style={{ color: "var(--primary, #00C853)" }}>
            data-driven strategy that lasts.
          </span>
        </h2>
      </div>

      <div className="br-line" style={{ marginTop: "40px" }} />

      <div
        className="foot-bottom"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "32px",
        }}
      >
        <p className="text-nocopy text-black-56 effectFade fadeUp no-div" style={{ margin: 0 }}>
          All rights reserved<br />© 2026 Dev Vyas
        </p>
        <a
          href="#home"
          className="effectFade fadeZoom footer-back-to-top"
          aria-label="Back to top"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("#home", { pushHistory: "#home" });
          }}
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/logo/dv-logo-source.png"
            alt="DV"
            width={44}
            height={24}
            style={{ objectFit: "contain" }}
          />
          <span className="text-black-56 text-body-3 fw-medium">Back to top ↑</span>
        </a>
      </div>
    </div>
  );
}
