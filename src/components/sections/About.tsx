import { awards } from "@/data/awards";

export function About() {
  return (
    <div id="about" className="section-about flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle" />
        About
      </div>
      <h4 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        Bridging visual craft <br className="d-none d-lg-block" />
        and evidence-based design, <br className="d-none d-lg-block" />
        one user at a time
      </h4>
      <p className="s-desc text-black-56 scrolling-effect effectTop">
        Product designer with four years of commercial experience and an MSc in
        Human-Centred Interactive Technologies at the University of York. I work at the
        intersection of rigorous UX research and considered visual design - from
        think-aloud studies and Figma prototypes to brand identities and motion graphics.
        AI runs through everything I do: faster ideation, sharper synthesis, every
        decision still grounded in real user evidence.
      </p>
      <ul className="award-list">
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
                <h6 className="award_name letter-space--2 text-black-72" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {a.name}
                  <i
                    className="icon icon-arrow-right-top award-link-arrow"
                    style={{ fontSize: "12px", color: "#00C853", transition: "transform 0.25s ease, text-shadow 0.25s ease" }}
                  />
                </h6>
                <p className="award_desc text-black-56">{a.publisher}</p>
              </div>
              <h6 className="award_year text-black-72">{a.year}</h6>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
