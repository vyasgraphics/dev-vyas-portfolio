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
            // Retuned when the slogan went from two lines to three. At the
            // old clamp/measure (56px in 720px) every one of the three
            // sentences wrapped, so a three-line statement rendered as six
            // ragged ones. Smaller type in a wider column gives each
            // sentence its own line again, which is the whole point of the
            // parallel structure.
            // Lower bound is set by the longest of the three sentences
            // ("Craft makes people want to use it.") fitting a 375px screen
            // on one line. At 24px it wrapped and left "it." alone on a
            // fourth line, which is exactly the widow the parallel
            // structure is meant to avoid.
            fontSize: "clamp(20px, 3.6vw, 44px)",
            fontFamily: "'EB Garamond', Georgia, serif",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            margin: "0 auto",
            maxWidth: "880px",
          }}
        >
          {/* Same three strands as the pillar band, in the same workflow
              order: research decides what, craft decides whether anyone wants
              it, code decides whether it exists. The green sits on the middle
              line rather than the last: "makes people want to use it" is the
              line that describes the effect on a reader, so it is the one
              worth landing on. */}
          Research tells me what to build.
          <br />
          <span style={{ color: "var(--primary, #00C853)" }}>
            Craft makes people want to use it.
          </span>
          <br />
          Code turns it into something real.
        </h2>
      </div>

      {/* The footer previously made no ask at all - slogan, copyright,
          back-to-top. It is the last thing a reviewer sees, so it gets one
          plain, low-friction line and a route back to the contact form. */}
      <div
        className="effectFade fadeUp no-div"
        style={{ textAlign: "center", marginTop: "28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}
      >
        <p className="text-black-56 text-body-3" style={{ margin: 0 }}>
          Open to UK and remote roles from September 2026.
        </p>
        <a
          href="#contact"
          className="tf-btn-action"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("#contact", { pushHistory: "#contact" });
          }}
        >
          <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
          <span className="text text-body-3 letter-space--05 fw-medium">Get in touch</span>
          <span className="ic-wrap"><i className="icon icon-arrow-right-top" /></span>
        </a>
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
