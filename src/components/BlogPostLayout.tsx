"use client";

import { useEffect, type ReactNode } from "react";
import { BackLink } from "@/components/BackLink";
import { blogPosts } from "@/data/blog";
import { smoothScrollToTop } from "@/lib/smoothScroll";

// Shared chrome for every blog post page: back link, tag/title/meta header,
// hero image, then whatever body content the page itself provides as
// children, then a tags + share footer. Metadata (title, date, readTime,
// tag, image) is looked up from blog.ts by slug rather than repeated in
// each page.tsx, so there's one source of truth - update blog.ts and both
// the homepage card and this header stay in sync automatically.
//
// Body content is intentionally just `children`: each post's writing has
// its own mix of headings, paragraphs, quotes, and lists, which doesn't
// fit a fixed data shape. Wrap it in the .blog-article class (typography
// rules are in styles.css) and it'll pick up consistent spacing/sizing
// for h2/h3/p/ul/a automatically.
export function BlogPostLayout({ slug, children }: { slug: string; children: ReactNode }) {
  const post = blogPosts.find((p) => p.slug === slug);

  // This site runs Lenis for smooth scrolling, which maintains its own
  // internal scroll position independent of the browser's native scroll -
  // so arriving here from a homepage scrolled down to the Blog section
  // (a genuinely different route, not a same-page hash jump) carries that
  // position over. Next.js's own scroll-reset doesn't help: Lenis's render
  // loop is invisible to it and reasserts its own position on the very
  // next frame regardless (the exact, previously-diagnosed root cause
  // documented in useCrossRouteBackNav.ts for the equivalent back-button
  // case). Routing through smoothScrollToTop keeps Lenis's own state in
  // sync instead of fighting it. immediate:true - no animated travel from
  // the old position, the page should just start at the top.
  useEffect(() => {
    smoothScrollToTop({ immediate: true });
  }, []);

  if (!post) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "56px 24px 120px" }}>
        <BackLink href="/#blog" label="← Back to Writing" />

        <header style={{ marginTop: "40px", marginBottom: "40px" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "5px 12px", borderRadius: "100px",
              background: "rgba(27,30,35,0.85)",
              backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              color: "#00DE51",
              border: "1px solid rgba(0,222,81,0.4)",
              marginBottom: "20px",
            }}
          >
            {post.tag}
          </span>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw + 8px, 44px)",
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: "20px",
            }}
          >
            {post.title}
          </h1>

          <div className="meta-list" style={{ color: "rgba(255,255,255,0.56)", fontSize: "14px" }}>
            <span className="meta-item">{post.date}</span>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "currentColor", opacity: 0.6 }} />
            <span className="meta-item">{post.readTime}</span>
          </div>
        </header>

        <div className="blog-single-wrap">
          <div className="image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} />
          </div>

          <article className="blog-article">{children}</article>

          <div className="entry-footer" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "32px" }}>
            <div className="tags-links list-tags">
              <a>{post.tag}</a>
            </div>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/dev-vyas6/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/social/linkedin.svg" width={20} height={20} alt="" />
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <BackLink href="/#blog" label="← Back to Writing" />
        </div>
      </div>
    </div>
  );
}

// Reusable pull-quote for body content - drop <BlogQuote>text</BlogQuote>
// anywhere inside a post's children. Uses the site's existing
// .blockquote-wrap card rather than a plain <blockquote>.
export function BlogQuote({ children }: { children: ReactNode }) {
  return (
    <div className="blockquote-wrap" style={{ margin: "40px 0" }}>
      <svg width="64" height="48" viewBox="0 0 64 48" fill="none" style={{ position: "absolute", top: "32px", left: "40px", opacity: 0.12 }}>
        <path d="M0 28C0 12.5 9 2 24 0v9c-8 2-13 8-13 16h13v23H0V28ZM34 28C34 12.5 43 2 58 0v9c-8 2-13 8-13 16h13v23H34V28Z" fill="#fff" />
      </svg>
      <p style={{ fontSize: "clamp(18px, 1.4vw + 10px, 22px)", lineHeight: 1.5, color: "var(--white)", fontWeight: 500, position: "relative" }}>
        {children}
      </p>
    </div>
  );
}
