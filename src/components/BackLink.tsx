"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { suppressPassiveHashSync } from "@/lib/smoothScroll";

const style: CSSProperties = {
  marginTop: "12px",
  padding: "12px 28px",
  borderRadius: "100px",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#fff",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: 600,
  display: "inline-block",
  // transition deliberately not set here - vg-tactile (added below via
  // className) supplies its own; an inline transition would win over that
  // class's transition for the same property and silently swap out the
  // calibrated press-feedback easing for a generic one.
};

/**
 * The "← Back to Work/Blog" link on each detail page. Points at "/#work"
 * or "/#blog", but doesn't rely on that hash surviving Next.js's
 * cross-route client-side navigation to actually land you back at the
 * right section - that dependency has proven unreliable across a few
 * rounds of fixes, and was eventually caught red-handed: Next's own Link
 * navigation would occasionally land on a malformed, concatenated hash
 * like "#home#blog" instead of "#blog" for this specific combination (a
 * pathname change AND a hash in the same href). Since "#home#blog" isn't
 * just wrong but an invalid CSS selector, restoration would silently fail
 * and strand the page at the top.
 *
 * The fix: keep `href` as the real destination for accessibility, and for
 * the middle-click/cmd-click/"open in new tab" case, where the browser
 * uses the raw href directly without running any of our JS at all - a
 * genuine full page load, where the browser's own native hash-scroll-on-
 * load handles it correctly regardless of anything below. But intercept
 * an ordinary left-click and drive the actual navigation ourselves via
 * router.push("/") - a clean, hash-free pathname change, sidestepping
 * Next's own hash-in-href handling entirely. The destination itself is
 * written to sessionStorage at the moment of the click, the same
 * mechanism every other nav link on the site already uses (see
 * smoothScrollTo's pushHistory option and useUrlHashSync, which is what
 * actually positions the page - and now the URL bar too - once landed.
 */
export function BackLink({ href, label }: { href: `/#${string}`; label: string }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className="back-link-btn vg-tactile"
      style={style}
      onClick={(e) => {
        e.preventDefault();
        sessionStorage.setItem("lastActiveSection", href.slice(1));
        // Covers the whole cross-route transition: Next swapping the
        // route, the retry loop in useUrlHashSync waiting for the target
        // section to exist, and the eventual scroll itself.
        suppressPassiveHashSync(2500);
        router.push("/");
      }}
    >
      {label}
    </Link>
  );
}
