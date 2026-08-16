import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";
import { BackLink } from "@/components/BackLink";
import { SectionBox } from "@/components/SectionBox";
import { BackToTop } from "@/components/BackToTop";
import { FloatingTiltToggle } from "@/components/FloatingTiltToggle";
import { SectionNav } from "@/components/SectionNav";
import { CountUpStat } from "@/components/CountUpStat";
import { ProcessPath } from "@/components/ProcessPath";
import { ProcessStep } from "@/components/ProcessStep";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltPermissionPrompt } from "@/components/TiltPermissionPrompt";
import { WireframeNewsTask } from "@/components/wireframes/WireframeNewsTask";
import { WireframeCirclesTest } from "@/components/wireframes/WireframeCirclesTest";
import { DistractionInteractionChart } from "@/components/DistractionInteractionChart";

export const metadata: Metadata = pageMetadata({
  title: "Distraction Resistance & Complex User Interfaces",
  description: "MSc capstone research investigating whether a person's intrinsic ability to resist distraction predicts their performance on complex, cluttered interfaces.",
  path: "/work/dissertation",
});

const SITE_URL = "https://dev-vyas-portfolio.vercel.app";
const PAGE_URL = `${SITE_URL}/work/dissertation`;

// Structured data (JSON-LD). BreadcrumbList gives search engines the
// Home > Work > Dissertation path, which is what typically shows as
// breadcrumbs in the results snippet instead of a raw URL. CreativeWork
// describes the case study itself - this page is built entirely from
// custom wireframe components rather than photographs, so there's no
// natural asset to use as the representative image, hence pointing at the
// site's own generated Open Graph image instead.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Dev Vyas", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
        { "@type": "ListItem", position: 3, name: "Dissertation", item: PAGE_URL },
      ],
    },
    {
      "@type": "CreativeWork",
      "@id": PAGE_URL,
      name: "Distraction Resistance & Complex User Interfaces",
      description: "MSc capstone research investigating whether a person's intrinsic ability to resist distraction predicts their performance on complex, cluttered interfaces. A quantitative study run via Prolific, analysed in SPSS.",
      url: PAGE_URL,
      image: `${SITE_URL}/opengraph-image`,
      creator: {
        "@type": "Person",
        name: "Dev Vyas",
        url: SITE_URL,
        jobTitle: "Product Designer",
        sameAs: [
          "https://www.linkedin.com/in/dev-vyas6",
          "https://www.behance.net/devvyas_graphics",
        ],
      },
      keywords: [
        "UX research",
        "quantitative research",
        "distraction resistance",
        "complex user interfaces",
        "MSc dissertation",
      ],
    },
  ],
};

const SECTIONS = [
  { id: "challenge", label: "The Challenge" },
  { id: "process", label: "The Process" },
  { id: "finding", label: "The Key Finding" },
  { id: "impact", label: "The Impact" },
  { id: "next", label: "What's Next" },
];

// Process stages, in order. Kept as data rather than repeated markup so the
// stepper strip and the detailed breakdown below it can never drift out of
// sync with each other.
const PROCESS_STAGES = [
  "Literature Review",
  "Artefact Design",
  "Pilot Testing",
  "Data Collection",
  "Analysis",
];

// Detailed breakdown for each process stage - a short bold summary plus a
// handful of scannable bullets, rather than a wall of paragraph text.
const PROCESS_STEPS: { title: string; summary: string; bullets: React.ReactNode[]; visual?: React.ReactNode }[] = [
  {
    title: "Literature Review",
    summary: "Found the gap: distraction resistance had only ever been tested in abstract lab tasks, never against a real interface.",
    bullets: [
      <>
        Working memory research (Vogel, McNab, Ye) showed the trait is
        measurable and splits into two components - but stayed entirely inside the lab.
      </>,
      <>
        HCI clutter research, including banner-blindness work, showed
        clutter degrades performance unevenly, but rarely measured cognitive ability directly.
      </>,
      <>
        Nobody had connected the two, which set the study three questions:{" "}
        <strong style={{ color: "#fff" }}>does the trait predict performance</strong> on a real interface at all,{" "}
        <strong style={{ color: "#fff" }}>does it still predict it</strong> once age and reading speed are ruled
        out, and <strong style={{ color: "#fff" }}>do its two components act alone or together</strong>.
      </>,
    ],
  },
  {
    title: "Artefact Design",
    summary: "Built a purpose-made news article search task from scratch, rather than adopting an existing instrument.",
    bullets: [
      <>
        Five rounds, each with a real search query, genuine-looking
        headlines, and sponsored boxes plus a trending sidebar competing for attention.
      </>,
      <>
        One correct article always sits{" "}
        <strong style={{ color: "#fff" }}>sandwiched between two sponsored boxes</strong>{" "}- extending banner-blindness
        research rather than replicating it, since the original effect was found with flashing-text banners, not the
        calmer, commercial-style boxes used here.
      </>,
      <>
        Card position, query order and promo placement all{" "}
        <strong style={{ color: "#fff" }}>reshuffled each round</strong>; headlines never truncated, closing off any
        shortcut to skim instead of genuinely search.
      </>,
    ],
    visual: <WireframeNewsTask />,
  },
  {
    title: "Pilot Testing",
    summary: "Four in-person pilot rounds before recruitment opened, each one producing a concrete fix.",
    bullets: [
      <>
        <strong style={{ color: "#fff" }}>Round 1</strong>{" "}- made the editable participant-ID field read-only and
        auto-populated after it risked a broken data merge; added a live selection counter.
      </>,
      <>
        <strong style={{ color: "#fff" }}>Round 2</strong>{" "}- caught a scroll-awareness problem after a participant
        missed cards they&apos;d never scrolled to; added keyboard-operable scroll indicators.
      </>,
      <>
        <strong style={{ color: "#fff" }}>Rounds 3-4</strong>{" "}- confirmed the whole pipeline was stable before a
        single real participant was recruited.
      </>,
    ],
  },
  {
    title: "Data Collection",
    summary: "Recruited through Prolific under full ethical approval, paired with a validated working-memory test.",
    bullets: [
      <>
        Ethical approval came from the University of York Physical
        Sciences Ethics Committee before any data was collected.
      </>,
      <>
        Each participant moved through one automated sequence: consent, a reading-speed check, the working-memory
        test, then the search task and a full debrief.
      </>,
      <>
        Consent kept short and in plain language; compensation matched UK
        minimum wage throughout.
      </>,
      <>
        A three-participant pilot batch ran first. Real completion times came in{" "}
        <strong style={{ color: "#fff" }}>faster than estimated</strong>, so the paid session length was revised
        down for the main batch - freeing budget to recruit a larger sample than originally planned.
      </>,
    ],
    visual: <WireframeCirclesTest />,
  },
  {
    title: "Analysis",
    summary: "Merged three raw data sources through a self-checking pipeline, then modelled the results.",
    bullets: [
      <>
        A Python notebook merges consent/demographics, working-memory
        scores and task results into one dataset, matched on participant identifiers.
      </>,
      <>
        Any participant <strong style={{ color: "#fff" }}>missing from a source is flagged and excluded</strong>,
        never silently dropped - that exact safeguard caught a live concurrency bug that had silently overwritten
        two participants&apos; submissions mid-study.
      </>,
      <>
        The regression design itself was revised mid-collection too: moved from{" "}
        <strong style={{ color: "#fff" }}>staged hierarchical entry to one combined block</strong>, once the case
        for staging turned out too weak to justify it.
      </>,
      <>
        The dataset fed two regression models; every coefficient was{" "}
        <strong style={{ color: "#fff" }}>independently cross-checked in SPSS and Jamovi</strong>{" "}before being
        trusted.
      </>,
    ],
  },
];

export default function DissertationWorkPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <div className="vg-case-page" style={{ margin: "0 auto", padding: "56px 24px 100px" }}>
        <BackLink href="/#work" label="← Back to Work" />

        <header style={{ marginTop: "40px", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw + 8px, 44px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Distraction Resistance &amp; Complex User Interfaces
          </h1>
          <p style={{
            fontSize: "16px", lineHeight: 1.55, color: "#fff",
            fontWeight: 600, marginBottom: "20px",
            paddingLeft: "16px", borderLeft: "3px solid #00DE51",
          }}>
            The outcome: visual clutter isn&apos;t a flat tax. It costs some users nearly half their time and barely touches others - a hit an ordinary success-rate metric never catches.
          </p>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, marginBottom: "24px" }}>
            A solo MSc dissertation testing whether a person&apos;s ability to filter out visual distraction predicts
            how they cope with a realistically cluttered, ad-heavy interface. The trait is well studied in the lab.
            Nobody had tested it against a real interface before.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "13px" }}>
            {/* .vg-chip, not inline styles: these tags are part of the
                site's shared pill family and now take their fill, border
                and lit rim from the .vg-glass token, so they cannot drift
                from the recap chips further down the same page. */}
            {["UX Researcher · MSc Dissertation", "2026", "Python", "Academic Research"].map((t) => (
              <span key={t} className="vg-chip">{t}</span>
            ))}
          </div>
        </header>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))",
          gap: "26px 20px", marginBottom: "44px",
        }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Industry</p>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
              Academic Research · HCI / Cognitive Psychology
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Platform</p>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
              Desktop web, browser-based study
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Role</p>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.72)" }}>
              Solo UX Researcher<br />
              Study design through to analysis
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Timeline &amp; Team</p>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.72)" }}>
              MSc dissertation, solo<br />
              Supervised by Prof. Joe Cutting, University of York
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Key Skills</p>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.72)" }}>
              Experimental Design · Quantitative UX Research<br />
              Python · SPSS · Jamovi
            </p>
          </div>
        </div>

        <div style={{
          padding: "34px 30px", borderRadius: "14px", marginBottom: "72px",
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "18px" }}>Results</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "36px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Outcomes</p>
              <p style={{ fontSize: "34px", fontWeight: 800, color: "#00DE51", lineHeight: 1, marginBottom: "8px" }}><CountUpStat value="2" /></p>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                <strong style={{ color: "#fff" }}>Opposite-story outcomes.</strong>{" "}Completion time tracked distraction resistance closely; search accuracy barely moved - a ceiling effect in the task itself.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Participants</p>
              <p style={{ fontSize: "34px", fontWeight: 800, color: "#00DE51", lineHeight: 1, marginBottom: "8px" }}><CountUpStat value="42" /></p>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                Recruited through Prolific, only once <strong style={{ color: "#fff" }}>4 in-person pilot rounds</strong>{" "}had shaken out the task&apos;s functional problems.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Cross-checked</p>
              <p style={{ fontSize: "34px", fontWeight: 800, color: "#00DE51", lineHeight: 1, marginBottom: "8px" }}><CountUpStat value="3" /></p>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                <strong style={{ color: "#fff" }}>Verified three ways.</strong>{" "}Primary analysis in Python, independently cross-checked in both SPSS and Jamovi before being trusted.
              </p>
            </div>
          </div>
        </div>

        <SectionNav sections={SECTIONS} />

        <ScrollReveal>
          <SectionBox id="challenge" tag="Two users, one page">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>The challenge</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "16px" }}>
              Interface design already accounts for eyesight, motor control and reaction speed. Every day, millions
              of people bring a very different kind of difference to the same screen: their ability to hold what
              they&apos;re looking for in mind while ignoring everything else competing for attention. Psychologists
              call it <strong style={{ color: "#fff" }}>distraction resistance</strong>, and it&apos;s never once
              been designed for.
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
              Two people sit down at the same busy news website, same task, same time. One finds every article they
              need. The other misses half, pulled off course by a sponsored box. The page hasn&apos;t changed and the
              distractions are identical, so something about the person accounts for the difference. The trait is
              well studied in the lab. Interface clutter is well studied on its own. Nobody had tested one against
              the other directly.
            </p>
            <p style={{
              fontSize: "16px", lineHeight: 1.6, color: "rgba(255,255,255,0.55)",
              fontStyle: "italic", marginTop: "24px",
            }}>
              How might we design for the users that cluttered interfaces cost the most - and measure that cost
              accurately enough to act on it?
            </p>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <SectionBox id="process" tag="Literature to analysis">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>The process</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "28px" }}>
              Because the gap existed, I built a purpose-made task rather than reusing an off-the-shelf one. Because
              a task like that can break in ways a literature review never predicts, I pressure-tested it on real
              people before it went anywhere near Prolific. Five stages, solo, start to finish: literature review,
              artefact design, pilot testing, data collection, analysis.
            </p>

            <ProcessPath stages={PROCESS_STAGES} />

            <TiltPermissionPrompt />

            <div style={{ display: "flex", flexDirection: "column", gap: "34px" }}>
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep
                  key={step.title}
                  index={i}
                  title={step.title}
                  summary={step.summary}
                  bullets={step.bullets}
                  visual={step.visual}
                />
              ))}
            </div>

            {/* Results restated at the end of Process, which is where the
                course guidance actually puts a repeat ("consider repeating
                the results again at the end of this section, especially if
                it is lengthy"). These four ran as a free-floating strip
                near the bottom of the page before, several sections after
                the Process they were meant to reinforce and directly
                duplicating the Results panel at the top - so this is a
                relocation rather than a deletion. */}
            <div className="vg-recap" aria-label="Results recap">
              {["2 opposite-story outcomes", "42 participants", "4 pilot rounds", "3-way cross-checked"].map((stat) => (
                <span key={stat} className="vg-recap-chip">{stat}</span>
              ))}
            </div>
          </SectionBox>
        </ScrollReveal>

        {/* "What it means for design" used to be its own section here. It
            restated the finding above in different words, then added one
            genuinely new idea (the encoding/delay trade-off). Merged: the
            finding, the chart that evidences it, and the design conclusion
            drawn from it now sit together, which is also the order a reader
            needs them in. The nav entry went with it. */}
        <ScrollReveal>
          <SectionBox id="finding" tag="Time, not accuracy">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>The key finding</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "24px" }}>
              The two outcomes told almost opposite stories. Accuracy barely moved: nearly everyone scored close to
              perfect, which turned out to be a ceiling effect in the task rather than a real absence of difference.
              Time was another matter. How long someone took tracked their distraction-resistance profile closely,
              accounting for close to half the difference between participants. And the two components of that
              profile didn&apos;t act independently -{" "}
              <strong style={{ color: "#fff" }}>they interacted</strong>.
            </p>
            <DistractionInteractionChart />

            <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "34px 0 12px" }}>What it means for design</h3>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "16px" }}>
              Two users can leave the same interface with identical, accurate results, and one of them pays far more
              time for it. An ordinary success-rate metric never catches that. Visual clutter isn&apos;t a flat tax:
              it costs some users very little and others a great deal, depending on a trait the user can&apos;t
              control and the designer usually can&apos;t see.
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
              The sharper implication is that the two filtering stages trade off rather than add up. Cut what a user
              has to filter while they are first reading something, and you help the people who need it most far
              more than an even, page-wide tidy-up ever would.
            </p>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <SectionBox id="impact" tag="Three tiers of impact">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>The impact</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "28px" }}>
              Not a shipped product, so no revenue or conversion wins to claim. Three honest tiers instead.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "34px" }}>
              <div style={{
                paddingLeft: "22px", borderLeft: "2px solid rgba(0,222,81,0.45)",
              }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
                  User Metrics
                </h3>
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Completion time tracked distraction resistance closely, explaining close to half the difference between participants.
                  </li>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Search accuracy stayed high for almost everyone - a ceiling effect the study surfaced rather than a difference it could resolve.
                  </li>
                </ul>
              </div>
              <div style={{
                paddingLeft: "22px", borderLeft: "2px solid rgba(0,222,81,0.45)",
              }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
                  Research Process Metrics
                </h3>
                {/* The pilot-rounds line that used to sit here is already
                    made twice over: once in the Results panel and once as
                    its own Process stage. */}
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Zero data-integrity issues reached analysis. Identifier checks caught every mismatch, including one live concurrency bug.
                  </li>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Every coefficient reproduced exactly across three independent tools.
                  </li>
                </ul>
              </div>
              <div style={{
                paddingLeft: "22px", borderLeft: "2px solid rgba(0,222,81,0.45)",
              }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
                  Field Impact
                </h3>
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    First study to test a validated, stage-specific distraction-resistance measure against a realistic cluttered interface, rather than an abstract lab task.
                  </li>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Delivers one concrete, testable design implication: reduce encoding-stage clutter first - it matters more than an even, page-wide clutter reduction.
                  </li>
                </ul>
              </div>
            </div>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <SectionBox id="next" tag="Submission still pending">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>What&apos;s next</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
              Still being finalised at York, so the detail here stays deliberately high-level. Once it&apos;s
              submitted and marked I&apos;ll add the fuller analysis: exactly how the two components interact, and
              what that means for accuracy as well as time.
            </p>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px", marginBottom: "64px", padding: "24px",
            borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            {/* Fragments, not sentences. Every other list on the page is
                terse; these two sections were the only place that switched
                into full hedged prose, which made them read as padding at
                exactly the point a senior reviewer is looking for signal. */}
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>Leadership</h2>
              <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Solo-owned end to end.</strong>{" "}Research question, task design, ethics approval, recruitment, analysis.
                </li>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Held the reporting honest.</strong>{" "}Stated what the data does and doesn&apos;t yet show, rather than overselling it pre-marking.
                </li>
              </ul>
            </div>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>Craft &amp; Expertise</h2>
              <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Built the instrument.</strong>{" "}A purpose-made task synthesising banner-blindness, retrieval-scoring and online-timing literatures, not an off-the-shelf one.
                </li>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Chose the measure deliberately.</strong>{" "}Rejected a standard usability questionnaire for a direct behavioural one - task success and self-reported ease correlate weakly in the literature, so only one could actually answer the question.
                </li>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Built a pipeline, not a script.</strong>{" "}Written once, reused unmodified across every batch and every cross-check.
                </li>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Quantitative rigour.</strong>{" "}Formal ethical approval, a validated working-memory measure, reading speed controlled for.
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <BackLink href="/#work" label="← Back to Work" />
        </div>
        <div aria-hidden style={{ height: "45vh" }} />
      </div>
      <BackToTop />
      <FloatingTiltToggle />
    </div>
  );
}
