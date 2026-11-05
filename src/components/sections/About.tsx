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
        Product and UX/UI designer with an MSc in Human-Centred Interactive Technologies
        from the University of York, awarded with Distinction, and a BE in Computer
        Science &amp; Engineering with First Class with Distinction. Research explains the
        decisions, creative craft makes the experience coherent, and code keeps it
        buildable. In practice that means user research and accessibility-aware design
        (WCAG) at the centre, graphic design, visual identity and motion as the craft
        around it, and enough front-end development to hand developers something
        realistic. I have worked with university stakeholders and with design and
        development teams, and I care about the reasoning behind a design as much as how it
        works once it is built.
      </p>
      <ul className="award-list tf-grid-layout md-col-2">
        {awards.map((a, i) => (
          <li key={a.name + a.year} className="scrolling-effect effectBottom" data-delay={i * 0.08}>
            <a
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="award-item"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="left">
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
