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
        I&apos;m a product designer with four years of commercial experience and an MSc in
        Human-Centred Interactive Technologies at the University of York. My work sits at the
        intersection of rigorous UX research and considered visual design - the kind of combination
        that means the things I make are not only good to look at, but genuinely easier to use.
        <br /><br />
        I also fold AI into the way I work - using it to speed up early ideation, stress-test
        research questions, and prototype faster, while keeping every final decision grounded in
        real user evidence rather than a model&apos;s best guess. Whether that&apos;s running
        think-aloud studies, designing lo-fi prototypes, building brand identities from scratch, or
        producing motion graphics for a live sports campaign - I care about getting the details right.
      </p>
      <ul className="award-list">
        {awards.map((a, i) => (
          <li key={a.name + a.year} className="scrolling-effect effectBottom" data-delay={i * 0.08}>
            <a
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="award-item hover-cursor-img"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="left">
                <h6 className="award_name letter-space--2 text-black-72" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {a.name}
                  <i
                    className="icon icon-arrow-right-top award-link-arrow"
                    style={{
                      fontSize: "12px",
                      opacity: 0,
                      transform: "translate(-4px, 4px)",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                      color: "#00C853",
                    }}
                  />
                </h6>
                <p className="award_desc text-black-56">{a.publisher}</p>
              </div>
              <h6 className="award_year text-black-72">{a.year}</h6>
              <div className="award_img hover-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" width={158} height={224} src={a.image} alt={a.name} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
