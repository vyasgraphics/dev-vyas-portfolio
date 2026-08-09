import { blogPosts } from "@/data/blog";
import Link from "next/link";

export function Blog() {
  return (
    <div id="blog" className="section-blog flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-edu" />
        Writing
      </div>
      <h4 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        Thoughts on design, research, <br className="d-none d-lg-block" />
        and where AI actually helps
      </h4>
      <p className="s-desc text-black-56 scrolling-effect effectTop" style={{ marginBottom: "2.5rem" }}>
        A space for longer-form notes on process, research findings, and lessons learned.
      </p>

      <div className="tf-grid-layout md-col-2 blog-grid">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            id={`blog-item-${post.slug}`}
            className="blog-card scrolling-effect effectBottom"
            onClick={() => {
              sessionStorage.setItem("lastBlogPostSlug", post.slug);
            }}
            style={{
              position: "relative",
              display: "block",
              textDecoration: "none",
              borderRadius: "14px",
              // Background moved to the inset frame layer below - the outer
              // box itself stays transparent so the glow blob's blur shows
              // through the thin gap around the frame, rather than being
              // covered by a solid card background.
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {/* ── Glow blob ──
                Adapted from a reference "spotlight card" pattern: a large,
                heavily blurred circle sitting behind an inset frame, bleeding
                through the thin gap around its edge as a soft ambient glow.
                The reference used plain white; recoloured to the site's own
                signature green (#00DE51) so it reads as an extension of the
                accent colour already used on the tag pill, rather than an
                unrelated white glow. Subtle at rest, brightens on hover -
                replacing the old plain lift + border-color-change hover. */}
            <span
              aria-hidden
              className="blog-card-glow"
              style={{
                position: "absolute",
                top: "-35%",
                left: "-30%",
                width: "85%",
                height: "70%",
                borderRadius: "50%",
                background: "#00DE51",
                filter: "blur(46px)",
                opacity: 0.22,
                pointerEvents: "none",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            />

            {/* ── Inset frame ──
                Holds the actual card surface (existing translucent
                background + hairline border) inset by 2px from the outer
                box, so that 2px rim is where the glow blob peeks through.
                All the real content (photo, tag, title, excerpt) lives
                inside this, on top of the glow - fully legible, unaffected
                by the effect happening behind it. */}
            <div
              className="blog-card-surface"
              style={{
                position: "relative",
                margin: "2px",
                borderRadius: "12px",
                overflow: "hidden",
                background: "var(--white-8, rgba(255,255,255,0.05))",
                border: "1px solid var(--white-8, rgba(255,255,255,0.08))",
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(35%)" }}
                />
                <span
                  style={{
                    position: "absolute", top: "12px", left: "12px",
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    padding: "4px 10px", borderRadius: "100px",
                    // Was a 15%-opacity green fill - basically just a tint over
                    // whatever the photo happened to show underneath, so
                    // legibility depended entirely on that spot of the image.
                    // A solid dark backdrop (+ blur, for photos that show
                    // through at the pill's rounded edges) guarantees contrast
                    // regardless of what's behind it. Colour corrected to the
                    // site's actual --primary green (#00de51) too - the old
                    // #00C853 was a slightly different shade.
                    background: "rgba(27,30,35,0.85)",
                    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                    color: "#00DE51",
                    border: "1px solid rgba(0,222,81,0.4)",
                  }}
                >
                  {post.tag}
                </span>
              </div>
              <div style={{ padding: "20px 22px 24px" }}>
                <h6
                  className="text-black-72"
                  style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1.4, marginBottom: "8px" }}
                >
                  {post.title}
                </h6>
                <p className="text-black-56" style={{ fontSize: "13px", lineHeight: 1.6, marginBottom: "14px" }}>
                  {post.excerpt}
                </p>
                <div
                  className="text-black-56"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 600 }}
                >
                  <span>{post.date}</span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "currentColor", opacity: 0.5 }} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
