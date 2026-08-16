import { awards } from "@/data/awards";

export function About() {
  return (
    <div id="about" className="section-about flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle" />
        Who I Am
      </div>
      <h2 className="s-title letter-space--2 text-black-72 split-text effect-blur-fade">
        A researcher&apos;s habits, <br className="d-none d-lg-block" />
        a designer&apos;s eye, <br className="d-none d-lg-block" />
        an engineer&apos;s grounding
      </h2>
      {/* Deliberately does NOT re-list the three qualifications - the pillar
          band directly under the hero already states each one with its
          credential. This paragraph's job is the join: what having all three
          at once actually buys, which is the part a list cannot say. */}
      <p className="s-desc text-black-56 scrolling-effect effectTop">
        UI/UX, product and graphic designer with four years of commercial experience,
        now finishing an MSc in Human-Centred Interactive Technologies at the
        University of York. The three strands feed each other: research means I can
        show the decision was the right one, animation training means I care about the
        last two pixels, and computer science means I know what a design costs to build.
        AI runs across all of it, taking the repetition so my time goes on the
        judgement calls it cannot make.
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
