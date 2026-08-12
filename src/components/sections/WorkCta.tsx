"use client";

import { smoothScrollTo } from "@/lib/smoothScroll";
import { profile } from "@/data/profile";

// Mid-page conversion point, sitting directly after the Selected Work grid.
//
// The contact section starts at roughly 83% of page depth, which means a
// reviewer who reads the three case studies and then stops - the single
// most likely drop-off point on the page - never reaches an ask. This
// catches them at ~35% instead, immediately after the strongest evidence
// they will see, rather than making conversion conditional on scrolling
// the whole page.
//
// Deliberately reuses .tf-btn-action rather than inventing a third button
// style: the sidebar CTA and the work card CTAs already use it, and a new
// treatment here would add a fourth thing competing for attention in a
// page that already had too many.
export function WorkCta() {
  return (
    <div className="flat-spacing" style={{ paddingTop: 0 }}>
      {/* Deliberately NO scroll-reveal class here.
          This first carried .effectFade.fadeUp.no-div like the rest of the
          page, and it left the band stuck at its GSAP "from" state
          (opacity:0; visibility:hidden; translateY(50px)) permanently -
          confirmed by direct sampling, both after a cross-route restore and
          on ordinary top-to-bottom scrolling. It sits immediately after the
          Work section, whose sticky/fixed card mechanic reflows the page
          height after the ScrollTrigger start positions are computed, so
          the trigger for an element in this specific slot is not reliable.
          A decorative element failing to reveal is a cosmetic bug; the
          primary mid-page conversion point failing to reveal means the ask
          is simply absent. Always visible is the correct trade here. */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          padding: "28px 30px",
          borderRadius: "18px",
          border: "1px solid var(--black-6)",
          background: "rgba(0,222,81,0.04)",
        }}
      >
        <div style={{ minWidth: "260px", flex: "1 1 340px" }}>
          <p
            className="text-black-72"
            style={{ fontSize: "20px", fontWeight: 600, lineHeight: 1.35, marginBottom: "6px" }}
          >
            Want to talk through any of this?
          </p>
          <p className="text-black-56 text-body-3" style={{ margin: 0 }}>
            I&apos;m open to UK and remote roles from September 2026, and happy to go deeper on any project here.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
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
          {/* .action-down only picks up its flex/gap inside
              .sidebar-user .action-group, so the layout is set inline here
              rather than widening that selector for one extra use. */}
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-down"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <i className="icon icon-download" />
            <span className="text-body-3">Download CV</span>
          </a>
        </div>
      </div>
    </div>
  );
}
