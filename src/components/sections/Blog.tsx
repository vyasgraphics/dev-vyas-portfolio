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
        First posts landing soon.
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
              display: "block",
              textDecoration: "none",
              borderRadius: "14px",
              overflow: "hidden",
              background: "var(--white-8, rgba(255,255,255,0.05))",
              border: "1px solid var(--white-8, rgba(255,255,255,0.08))",
              transition: "transform 0.3s ease, border-color 0.3s ease",
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
          </Link>
        ))}
      </div>
    </div>
  );
}
