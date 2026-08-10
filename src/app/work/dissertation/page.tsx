import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { BackToTop } from "@/components/BackToTop";
import { FloatingTiltToggle } from "@/components/FloatingTiltToggle";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SectionNav } from "@/components/SectionNav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TiltPermissionPrompt } from "@/components/TiltPermissionPrompt";
import { WireframeNewsTask } from "@/components/wireframes/WireframeNewsTask";
import { WireframeCirclesTest } from "@/components/wireframes/WireframeCirclesTest";
import { DistractionInteractionChart } from "@/components/DistractionInteractionChart";

export const metadata: Metadata = {
  title: "Distraction Resistance & Complex User Interfaces",
  description: "MSc capstone research investigating whether a person's intrinsic ability to resist distraction predicts their performance on complex, cluttered interfaces.",
  openGraph: {
    title: "Distraction Resistance & Complex User Interfaces - Dev Vyas",
    description: "MSc capstone research investigating whether a person's intrinsic ability to resist distraction predicts their performance on complex, cluttered interfaces.",
    type: "article",
  },
};

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
  { id: "question", label: "The Question" },
  { id: "study", label: "The Study" },
  { id: "finding", label: "The Key Finding" },
  { id: "implications", label: "What It Means" },
  { id: "next", label: "What's Next" },
];

export default function DissertationWorkPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "56px 24px 100px" }}>
        <BackLink href="/#work" label="← Back to Work" />

        <header style={{ marginTop: "40px", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw + 8px, 44px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Distraction Resistance &amp; Complex User Interfaces
          </h1>
          <p style={{
            fontSize: "15px", lineHeight: 1.5, color: "rgba(255,255,255,0.9)",
            fontWeight: 600, maxWidth: "580px", marginBottom: "20px",
            paddingLeft: "16px", borderLeft: "3px solid #00DE51",
          }}>
            The outcome: visual clutter isn&apos;t a flat tax. It costs some users nearly half their time and barely touches others - a hit an ordinary success-rate metric never catches.
          </p>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: "580px", marginBottom: "24px" }}>
            Testing whether a hidden trait - how well someone filters out distraction - predicts who copes with a
            cluttered, ad-heavy interface and who doesn&apos;t, and finding a cost that shows up clearly in time,
            even when it barely shows up in accuracy.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "13px" }}>
            {["UX Researcher · MSc Dissertation", "2026", "Python", "Prolific"].map((t) => (
              <span key={t} style={{
                padding: "6px 14px", borderRadius: "100px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
              }}>
                {t}
              </span>
            ))}
          </div>
        </header>

        <SectionNav sections={SECTIONS} />

        <ScrollReveal>
          <section id="question" style={{ marginTop: "40px", marginBottom: "64px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>The question</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "16px" }}>
              Two people can sit down at the same busy news website, given the same task and the same time, and come
              away with very different results. One finds every article they need. The other misses half of them,
              pulled off course by a sponsored box or an animated ad that has nothing to do with what they came for.
              The page hasn&apos;t changed between them. The distractions on screen are identical. Something about
              the person accounts for the difference.
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
              Interface design already accounts for differences in eyesight, motor control and reaction speed. It
              rarely accounts for a person&apos;s ability to hold what they&apos;re looking for in mind while
              ignoring everything else competing for attention - something psychologists call{" "}
              <strong style={{ color: "#fff" }}>distraction resistance</strong>. My MSc dissertation at the
              University of York asks whether that trait, split into two components (filtering distraction the
              moment it appears, and protecting what&apos;s already been remembered once distraction turns up
              afterwards), actually predicts how well someone copes with a realistically cluttered interface.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="study" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>The study</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "32px" }}>
              To test it, I built a purpose-made news article search task from scratch: five rounds, each with a
              real search query, a grid of genuine-looking headlines, and three sponsored boxes plus a trending
              sidebar competing for attention throughout. In every round, one correct article sits sandwiched
              directly between two sponsored boxes - a construction based on banner-blindness research showing that
              placement alone can cost real search time.
            </p>
            <TiltPermissionPrompt />
            <WireframeNewsTask />

            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", margin: "44px 0 32px" }}>
              Forty-two participants, recruited through Prolific, completed the task alongside a validated
              working-memory test that separately scores two kinds of distraction resistance - one for filtering
              distraction the instant it appears, another for protecting something already held in mind once
              distraction turns up later - plus a quick reading-speed check used as a control variable, since the
              task itself is entirely reading-driven. Here&apos;s how each trial type is put together:
            </p>
            <WireframeCirclesTest />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="finding" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>The key finding</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "24px" }}>
              The two outcomes told almost opposite stories. Search accuracy barely moved between participants -
              most people scored close to perfect regardless of their working-memory profile, which turned out to
              be a ceiling effect in the task itself rather than a genuine absence of difference. Completion time
              was a different matter: how long someone took was strongly tied to their distraction-resistance
              profile, accounting for close to half of the difference between participants. And the two components
              of distraction resistance didn&apos;t act independently -{" "}
              <strong style={{ color: "#fff" }}>they interacted</strong>.
            </p>
            <DistractionInteractionChart />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="implications" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>What it means for design</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "16px" }}>
              Two users can walk away from the same interface with identical, accurate results, while one of them
              has paid a lot more time for it - a cost an ordinary success-rate metric would never catch. Visual
              clutter isn&apos;t a flat tax that costs everyone the same amount. Sponsored content, animated promos
              and high-salience distractors placed next to relevant content cost some users very little and cost
              others a great deal, depending on a cognitive trait the user can&apos;t control and the designer
              usually can&apos;t see.
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
              The more specific implication is that encoding-stage and delay-stage filtering trade off rather than
              simply add up. An interface that reduces how much a user has to filter while first reading something,
              rather than spreading a general clutter reduction evenly across the page, may do more for the people
              who need it most than an evenly-distributed tidy-up ever would.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="next" style={{ marginBottom: "56px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>What&apos;s next</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
              This dissertation is still being finalised at the University of York, so I&apos;ve deliberately kept
              the detail here high-level. Once it&apos;s been submitted and marked, I&apos;ll come back and share
              the fuller analysis - exactly how the two components of distraction resistance interact, and what
              that means for the accuracy side of the results too. For now, this is the shape of it: a real,
              measurable cost that cluttered interfaces impose unevenly, and a first proper test of whether a
              laboratory memory measure predicts anything on a page people would actually use.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{
            padding: "28px", borderRadius: "16px",
            background: "rgba(0,222,81,0.06)", border: "1px solid rgba(0,222,81,0.25)",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>
              Want to see the research artefact up close - the pilot rounds, the ethics process, and how the pieces
              fit together?
            </p>
            <Link
              href="/blog/dissertation-notes"
              style={{
                display: "inline-block", padding: "12px 28px", borderRadius: "100px",
                background: "#00DE51", color: "#0a0a0a", textDecoration: "none",
                fontSize: "14px", fontWeight: 700,
              }}
            >
              Read the full write-up →
            </Link>
          </div>
        </ScrollReveal>

        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <BackLink href="/#work" label="← Back to Work" />
        </div>
        <div aria-hidden style={{ height: "45vh" }} />
      </div>
      <BackToTop />
      <ReadingProgress />
      <FloatingTiltToggle />
    </div>
  );
}
