import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { SectionBox } from "@/components/SectionBox";
import { BackToTop } from "@/components/BackToTop";
import { FloatingTiltToggle } from "@/components/FloatingTiltToggle";
import { SectionNav } from "@/components/SectionNav";
import { CountUpStat } from "@/components/CountUpStat";
import { ProcessPath } from "@/components/ProcessPath";
import { ProcessStep } from "@/components/ProcessStep";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PersonaCard } from "@/components/PersonaCard";
import { TiltPermissionPrompt } from "@/components/TiltPermissionPrompt";
import { WireframeSmartInput } from "@/components/wireframes/WireframeSmartInput";
import { WireframeQuietMode } from "@/components/wireframes/WireframeQuietMode";
import { WireframeSeeBeforeYouGo } from "@/components/wireframes/WireframeSeeBeforeYouGo";
import { WireframeGapFinder } from "@/components/wireframes/WireframeGapFinder";
import { WireframeCrowdFilter } from "@/components/wireframes/WireframeCrowdFilter";
import { personas } from "@/data/personas";

export const metadata: Metadata = {
  title: "Move - University Exercise App",
  description: "A full HCD lifecycle project tackling how to get students moving despite time pressures and fear of judgement.",
  openGraph: {
    title: "Move - University Exercise App - Dev Vyas",
    description: "A full HCD lifecycle project tackling how to get students moving despite time pressures and fear of judgement.",
    type: "article",
  },
};

const SITE_URL = "https://dev-vyas-portfolio.vercel.app";
const PAGE_URL = `${SITE_URL}/work/move-app`;

// Structured data (JSON-LD), same reasoning as the dissertation case study
// page: BreadcrumbList for the Home > Work > Move App path, CreativeWork
// for the case study itself, pointing at the site's own generated Open
// Graph image since this page is built from custom wireframes rather than
// photographs.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Dev Vyas", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
        { "@type": "ListItem", position: 3, name: "Move App", item: PAGE_URL },
      ],
    },
    {
      "@type": "CreativeWork",
      "@id": PAGE_URL,
      name: "Move - University Exercise App",
      description: "A full human-centred design lifecycle project tackling how to get students moving despite time pressures and fear of judgement, from user research through to a proposed A/B study.",
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
        "UX design",
        "human-centred design",
        "user research",
        "Figma prototyping",
        "usability testing",
      ],
    },
  ],
};

const SECTIONS = [
  { id: "challenge", label: "The Challenge" },
  { id: "personas", label: "Who It's For" },
  { id: "process", label: "The Process" },
  { id: "finding", label: "The Key Finding" },
  { id: "impact", label: "The Impact" },
  { id: "next", label: "What's Next" },
];

const PROCESS_STAGES = ["Discovery", "Concepts", "Prototyping", "Usability Testing", "Iteration"];

// Detailed breakdown per stage: a bold one-line summary plus scannable
// bullets, rather than paragraph slabs. Kept as data so the stepper strip
// above and the breakdown below cannot drift apart.
const PROCESS_STEPS: { title: string; summary: string; bullets: React.ReactNode[]; visual?: React.ReactNode }[] = [
  {
    title: "Discovery",
    summary: "A 17-response questionnaire reframed the problem: the barrier was anxiety and logistics, not motivation.",
    bullets: [
      <>
        47% were blocked by a <strong style={{ color: "#fff" }}>lack of free time</strong>, and 18% by feeling
        self-conscious. Neither is solved by adding more exercise options.
      </>,
      <>
        53% asked for short video clips of a space before committing to travel there, which became the single
        clearest feature mandate in the whole dataset.
      </>,
      <>
        71% consented to share their university timetable, which made automatic scheduling viable rather than
        hypothetical.
      </>,
    ],
  },
  {
    title: "Concepts",
    summary: "Two concepts were built out and then killed against the questionnaire data, before a single screen was refined.",
    bullets: [
      <>
        <strong style={{ color: "#fff" }}>Leaderboard, rejected.</strong> Users disliked competitive comparison
        strongly enough that gamifying the app would have worked against its own audience.
      </>,
      <>
        <strong style={{ color: "#fff" }}>Manual planner, rejected.</strong> Manual entry was exactly the friction
        the design existed to remove, so it gave way to automatic timetable syncing.
      </>,
      <>
        Killing both early cost two concepts and saved the build, which is the cheaper trade to make at this stage
        of a lifecycle.
      </>,
    ],
  },
  {
    title: "Prototyping",
    summary: "Four screens in Figma, each one answering a specific barrier the research had named.",
    bullets: [
      <>
        Smart Input and Gap Finder answer Maya&apos;s logistics paralysis by removing the mental maths of fitting a
        session into a timetable.
      </>,
      <>
        See Before You Go answers the 53% who wanted visual proof, and Quiet Mode answers the self-consciousness
        that stops Liam leaving his room.
      </>,
      <>
        Every screen traces back to a questionnaire figure rather than a hunch, which is what made the later
        rejection calls defensible.
      </>,
    ],
    visual: (
      <div className="wireframes-grid">
        <WireframeSmartInput />
        <WireframeQuietMode />
        <WireframeSeeBeforeYouGo />
        <WireframeGapFinder />
      </div>
    ),
  },
  {
    title: "Usability Testing",
    summary: "Moderated think-aloud sessions with 8 users caught a trust problem in the one feature built to protect anxious users.",
    bullets: [
      <>
        Participants read <strong style={{ color: "#fff" }}>&ldquo;Quiet Mode&rdquo; as a system audio
        control</strong>, not a crowd filter, and avoided touching it.
      </>,
      <>
        The failure was in the label and the control type, not the concept. The underlying need it served was the
        best-evidenced need in the study.
      </>,
      <>
        Caught at prototype stage, this cost a rename. Caught after launch, it would have cost the trust of the
        exact users the feature existed for.
      </>,
    ],
  },
  {
    title: "Iteration",
    summary: "Renamed, re-controlled and given explicit feedback, the feature went from avoided to understood.",
    bullets: [
      <>
        &ldquo;Quiet Mode&rdquo; became <strong style={{ color: "#fff" }}>Crowd Filter</strong>, naming what it
        actually filters instead of describing a mood.
      </>,
      <>
        The ambiguous toggle became an explicit <strong style={{ color: "#fff" }}>Social / Solo</strong> control, so
        both states are visible rather than inferred.
      </>,
      <>
        Confirmation feedback was added, so choosing a state tells you what will happen rather than leaving you to
        guess.
      </>,
    ],
  },
];

export default function MoveAppWorkPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <div className="vg-case-page" style={{ margin: "0 auto", padding: "56px 24px 100px" }}>
        {/* Extra bottom room isn't visible under normal scrolling (it sits
            below "Back to Work") - it exists so clicking "What's Next" in
            the nav, the last section, has enough scrollable page left
            below it to actually reach a clean top-of-viewport landing.
            Without it Lenis simply runs out of page to scroll and the
            section lands wherever the bottom of the document allows. */}
        <BackLink href="/#work" label="← Back to Work" />

        <header style={{ marginTop: "40px", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw + 8px, 44px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Move - University Exercise App
          </h1>
          <p style={{
            fontSize: "16px", lineHeight: 1.55, color: "#fff",
            fontWeight: 600, marginBottom: "20px",
            paddingLeft: "16px", borderLeft: "3px solid #00DE51",
          }}>
            The outcome: cutting choices and hiding the crowd got testers who&apos;d stalled on other apps to actually finish a session.
          </p>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, marginBottom: "24px" }}>
            A concept exercise app for University of York students, run through a full human-centred design
            lifecycle. The research found the barrier was never a lack of options. It was the anxiety and mental
            effort standing between students and the options already there.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "13px" }}>
            {["UX Researcher & Designer", "2026", "Figma", "Health & Fitness"].map((t) => (
              <span key={t} style={{
                padding: "6px 14px", borderRadius: "100px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.72)",
              }}>
                {t}
              </span>
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
              EdTech · Health &amp; Fitness
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Platform</p>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
              iOS mobile app, Figma prototype
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Role</p>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.72)" }}>
              UX Research &amp; Design<br />
              Owned research and design calls
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Timeline &amp; Team</p>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.72)" }}>
              HCD module, University of York<br />
              With Haokai, Lanqing and Yechen
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Key Skills</p>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.72)" }}>
              User Research · Personas<br />
              Figma Prototyping · Usability Testing
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
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Research base</p>
              <p style={{ fontSize: "34px", fontWeight: 800, color: "#00DE51", lineHeight: 1, marginBottom: "8px" }}><CountUpStat value="17" /></p>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                Questionnaire responses that reframed the problem and killed two concepts before they were built.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Tested with</p>
              <p style={{ fontSize: "34px", fontWeight: 800, color: "#00DE51", lineHeight: 1, marginBottom: "8px" }}><CountUpStat value="8" /></p>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                Think-aloud testers, who caught a trust problem in the flagship feature before it ever shipped.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>Validation ready</p>
              <p style={{ fontSize: "34px", fontWeight: 800, color: "#00DE51", lineHeight: 1, marginBottom: "8px" }}><CountUpStat value="256" /></p>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                Users in a scoped, properly powered A/B study, ready to confirm the redesign holds at scale.
              </p>
            </div>
          </div>
        </div>

        <SectionNav sections={SECTIONS} />

        <ScrollReveal>
          <SectionBox id="challenge" tag="Choice wasn't the barrier">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>The challenge</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "16px" }}>
              York already has plenty of exercise options. Gyms, clubs, cycling routes, walking spaces. Every day,
              students walk past all of them. The problem was never a lack of choice.
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
              The questionnaire pointed somewhere else entirely. Time pressure, self-consciousness and unfamiliarity
              stood between students and facilities that were already free, nearby and open. Adding options to that
              makes it worse. The design problem was subtraction, not addition.
            </p>
            <p style={{
              fontSize: "16px", lineHeight: 1.6, color: "rgba(255,255,255,0.55)",
              fontStyle: "italic", marginTop: "24px",
            }}>
              How might we reduce the anxiety and decision friction that stops students from starting - not just give
              them more options?
            </p>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <SectionBox id="personas" tag="Two barriers, two users">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>Who it&apos;s for</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "24px" }}>
              The data split cleanly into two different barriers, so it produced two personas rather than one
              averaged user. Designing for the average of these two would have served neither.
            </p>
            <TiltPermissionPrompt />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
              <PersonaCard persona={personas[0]} />
              <PersonaCard persona={personas[1]} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontStyle: "italic", textAlign: "center" }}>
                Liam needs reassurance, not motivation.
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontStyle: "italic", textAlign: "center" }}>
                Maya needs cognitive offloading, not encouragement.
              </p>
            </div>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <SectionBox id="process" tag="Discovery to iteration">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>The process</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "28px" }}>
              Because the questionnaire named the real barrier, two attractive concepts had to die. Because they
              died early, the prototype only ever carried features the data supported. Because testing came before
              build, the one feature that failed was caught while a rename could still fix it.
            </p>

            <ProcessPath stages={PROCESS_STAGES} />

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

            {/* Relocated from a free-floating strip near the page footer -
                see the matching note on the dissertation page. */}
            <div className="vg-recap" aria-label="Results recap">
              {["17 questionnaire responses", "2 concepts rejected on evidence", "8 think-aloud testers", "256-user A/B study scoped"].map((stat) => (
                <span key={stat} className="vg-recap-chip">{stat}</span>
              ))}
            </div>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <SectionBox id="finding" tag="Caught before it shipped">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>The key finding</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "20px" }}>
              The one feature built to protect anxious users was the one nobody trusted enough to touch. In testing,
              participants read &ldquo;Quiet Mode&rdquo; as a system audio control rather than a crowd filter. One
              tester said it outright:
            </p>
            <p style={{
              fontSize: "16px", lineHeight: 1.6, color: "#fff", fontStyle: "italic",
              padding: "16px 20px", marginBottom: "20px", borderLeft: "3px solid #00DE51",
              background: "rgba(255,255,255,0.03)", borderRadius: "0 8px 8px 0",
            }}>
              &ldquo;Will this turn off my Spotify? I don&apos;t want silence, I just want to avoid people.&rdquo;
            </p>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "20px" }}>
              A feature can test as a total failure while the need behind it is the best-evidenced thing in the
              study. Renaming it to <strong style={{ color: "#fff" }}>Crowd Filter</strong>, replacing the toggle
              with an explicit Social / Solo control, and adding confirmation feedback fixed it without touching the
              underlying idea.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              <WireframeQuietMode
                badge="A"
                title={"Home - “Quiet Mode” (Original)"}
                description={
                  <>
                    <strong style={{ color: "#fff" }}>The problem:</strong> in testing, this toggle got read as a
                    system audio control, not a crowd filter.
                  </>
                }
              />
              <WireframeCrowdFilter />
            </div>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <SectionBox id="impact" tag="Three tiers of impact">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>The impact</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "28px" }}>
              A university concept project, not a shipped product, so no revenue line to claim. Three honest tiers
              instead.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "34px" }}>
              <div style={{ paddingLeft: "22px", borderLeft: "2px solid rgba(0,222,81,0.45)" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
                  User Metrics
                </h3>
                {/* The 47/18/53% figures are stated once, in the Discovery
                    stage of Process where the evidence they came from sits.
                    Repeating all three here was the single worst instance
                    of the same number appearing three times on one page. */}
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Testers who had stalled on other fitness apps completed a full session once anxiety-driven friction was removed.
                  </li>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Both top barriers got a dedicated screen rather than one averaged compromise.
                  </li>
                </ul>
              </div>
              <div style={{ paddingLeft: "22px", borderLeft: "2px solid rgba(0,222,81,0.45)" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
                  Process Metrics
                </h3>
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Two fully explored concepts rejected on evidence rather than opinion, before either reached build.
                  </li>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    A trust failure in the flagship feature caught at prototype stage, while the fix was still a rename.
                  </li>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Every screen traces to a research figure, so the team argued about evidence instead of taste.
                  </li>
                </ul>
              </div>
              <div style={{ paddingLeft: "22px", borderLeft: "2px solid rgba(0,222,81,0.45)" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
                  Validation Readiness
                </h3>
                <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    A 256-user A/B study, scoped and properly powered, so the redesign can be confirmed rather than asserted.
                  </li>
                  <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                    Timetable consent already evidenced, so the automatic scheduling it depends on is viable rather than hypothetical.
                  </li>
                </ul>
              </div>
            </div>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <SectionBox id="next" tag="256 users, properly powered">
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>What&apos;s next</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
              The proposed A/B study runs the moment this moves from prototype to production. It is designed to test
              the claim this whole project rests on: that removing friction beats adding motivation for a sedentary,
              self-conscious user. If that holds at 256 users, it stops being a design opinion and becomes a
              repeatable principle.
            </p>
          </SectionBox>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px", marginBottom: "64px", padding: "24px",
            borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            {/* Fragments, not sentences - matching the dissertation page and
                the register the rest of this page already uses. */}
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>Leadership</h2>
              <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Owned the research and design calls.</strong>{" "}The personas, the testing plan, and the fix once testing found the trust problem.
                </li>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Argued for subtraction over addition.</strong>{" "}A harder case to make than shipping something new, and the one the data supported.
                </li>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Made two rejection calls</strong>{" "}on concepts the team liked, settled on questionnaire evidence rather than preference.
                </li>
              </ul>
            </div>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>Craft &amp; Expertise</h2>
              <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Full HCD lifecycle.</strong>{" "}Questionnaire through to Figma prototyping and moderated think-aloud testing.
                </li>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>One pattern set, not four mockups.</strong>{" "}So a fix to one control applied across the system.
                </li>
                <li style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
                  <strong style={{ color: "#fff" }}>Behaviour-change domain knowledge.</strong>{" "}Removing anxiety beats adding motivation for a sedentary, self-conscious user.
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
