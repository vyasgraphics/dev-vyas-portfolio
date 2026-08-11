import { awards } from "@/data/awards";

export function About() {
  return (
    <div id="about" className="section-about flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle" />
        Who I Am
      </div>
      <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        Four years designing commercially, <br className="d-none d-lg-block" />
        now researching how people <br className="d-none d-lg-block" />
        actually use interfaces
      </h2>
      <p className="s-desc text-black-56 scrolling-effect effectTop">
        Product designer with four years of commercial experience and an MSc in
        Human-Centred Interactive Technologies at the University of York. I work at the
        intersection of rigorous UX research and considered visual design - from
        think-aloud studies and Figma prototypes to brand identities and motion graphics.
        AI speeds up the grind - ideation, synthesis, first drafts - so I spend my hours
        on the judgement calls a model can&apos;t make.
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
