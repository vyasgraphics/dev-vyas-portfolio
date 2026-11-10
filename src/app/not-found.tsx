import type { Metadata } from "next";
import Link from "next/link";
import { works } from "@/data/works";

// Replaces Next's default white-on-black "404 | This page could not be
// found", which looked like a broken site rather than part of this one.
// Next already serves this with a 404 status and a noindex tag, so it
// never competes with real pages in search. Styles: .vg-404-* in styles.css.
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="vg-404">
      <div className="vg-404-inner">
        <p className="vg-404-code">Error 404</p>
        <h1 className="vg-404-title">This page doesn&apos;t exist, or it has moved.</h1>
        <p className="vg-404-text">
          The link may be out of date. Everything on the portfolio is reachable from the homepage, or you can go straight to one of the case studies below.
        </p>
        <Link href="/" className="vg-404-home vg-tactile">
          <span aria-hidden="true">←</span> Back to the homepage
        </Link>

        <p className="vg-404-links-label">Case studies</p>
        <ul className="vg-404-links">
          {works.filter((w) => w.link).map((w) => (
            <li key={w.slug}>
              <Link href={w.link!}>
                {w.title} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
