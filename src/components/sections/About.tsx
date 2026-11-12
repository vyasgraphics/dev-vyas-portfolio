import { awards } from "@/data/awards";

export function About() {
  return (
    <div id="about" className="section-about flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle" />
        Who I Am
      </div>
      {/* The <br>s apply at every width on purpose. They used to be
          desktop-only (d-none d-lg-block), but SplitText still treats a
          hidden <br> as a line boundary AND breaks at the natural wrap, so
          phones got orphans like "a designer's" / "eye,". Each clause fits
          one line down to 320px. Same pattern on Pillars, Work, Education
          and Contact. */}
      <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        A researcher&apos;s habits, <br />
        a designer&apos;s eye, <br />
        an engineer&apos;s grounding
      </h2>
      {/* Deliberately does NOT re-list the three qualifications - the pillar
          band directly under the hero already states each one with its
          credential. This paragraph's job is the join: what having all three
          at once actually buys, which is the part a list cannot say. */}
      <p className="s-desc text-black-56 scrolling-effect effectTop">
        I came to design through computer science, and to research through design, so I
        tend to look at a product from all three sides at once. Day to day, that means user
        research and accessible, WCAG-aware design at the centre, with brand, motion and
        front-end work around it, and handovers developers can build from without
        guesswork. I&apos;ve worked with university stakeholders and with design and
        development teams, and I care as much about the reasoning behind a design as about
        how it holds up once it&apos;s built.
      </p>
      <ul className="award-list tf-grid-layout md-col-2">
        {awards.map((a, i) => (
          <li key={a.name + a.year} className={`scrolling-effect effectBottom${a.featured ? " vg-award-featured" : ""}`} data-delay={i * 0.08}>
            <a
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="award-item"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="left">
                {a.featured && <p className="vg-award-badge">Award</p>}
                <h3 className="award_name letter-space--2 text-black-72" style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  {a.name}
                  <i
                    className="icon icon-arrow-right-top award-link-arrow"
                    style={{ fontSize: "12px", color: "#00C853", transition: "transform 0.25s ease, text-shadow 0.25s ease" }}
                  />
                </h3>
                <p className="award_desc text-black-56">{a.publisher}</p>
              </div>
              <span className="award_year text-black-72">{a.year}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
