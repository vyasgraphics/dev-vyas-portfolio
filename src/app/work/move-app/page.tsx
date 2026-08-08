import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { BackToTop } from "@/components/BackToTop";
import { FloatingTiltToggle } from "@/components/FloatingTiltToggle";
import { SectionNav } from "@/components/SectionNav";
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

const SECTIONS = [
  { id: "problem", label: "The Problem" },
  { id: "personas", label: "Who It's For" },
  { id: "screens", label: "The Screens" },
  { id: "finding", label: "Key Finding" },
  { id: "next", label: "What's Next" },
];

export default function MoveAppWorkPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "56px 24px 100px" }}>
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
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: "560px", marginBottom: "24px" }}>
            Helping sedentary students actually start exercising - not by adding more options, but by removing the
            anxiety and mental effort standing between them and the ones already there.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "13px" }}>
            {["UX Researcher & Designer", "2025", "Figma", "Lo-Fi Prototype"].map((t) => (
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
          <section id="problem" style={{ marginTop: "40px", marginBottom: "64px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>The problem</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
              York already has plenty of exercise options - gyms, clubs, cycling routes, walking spaces. The problem
              was never a lack of choice. It was time pressure, self-consciousness, and unfamiliarity standing
              between students and using what was already there.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="personas" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Who it&apos;s for</h2>
            <TiltPermissionPrompt />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
              <PersonaCard persona={personas[0]} />
              <PersonaCard persona={personas[1]} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontStyle: "italic", textAlign: "center" }}>
                Liam needs reassurance, not motivation.
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontStyle: "italic", textAlign: "center" }}>
                Maya needs cognitive offloading, not encouragement.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="screens" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>The four screens that mattered</h2>
            <div className="wireframes-grid">
              <WireframeSmartInput />
              <WireframeQuietMode />
              <WireframeSeeBeforeYouGo />
              <WireframeGapFinder />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="finding" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>The key finding</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "20px" }}>
              In testing, participants read &ldquo;Quiet Mode&rdquo; as a system audio control, not a crowd filter -
              the one feature built to protect anxious users was the one nobody trusted enough to touch. Renaming it
              to <strong style={{ color: "#fff" }}>Crowd Filter</strong>, replacing the toggle with a
              &ldquo;Social/Solo&rdquo; control, and adding explicit confirmation feedback fixed it.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              <WireframeQuietMode
                badge="A"
                title={"Home - \u201cQuiet Mode\u201d (Original)"}
                description={
                  <>
                    <strong style={{ color: "#fff" }}>The problem:</strong> in testing, this toggle got read as a
                    system audio control, not a crowd filter.
                  </>
                }
              />
              <WireframeCrowdFilter />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="next" style={{ marginBottom: "56px", scrollMarginTop: "24px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>What&apos;s next</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
              A proposed online A/B study (256 users, properly powered) is ready to validate the redesign at scale
              the moment this moves from prototype to production.
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
              Want the full story - the research, the rejected ideas, and the usability testing that led here?
            </p>
            <Link
              href="/blog/building-move-app"
              style={{
                display: "inline-block", padding: "12px 28px", borderRadius: "100px",
                background: "#00DE51", color: "#0a0a0a", textDecoration: "none",
                fontSize: "14px", fontWeight: 700,
              }}
            >
              Read the full case study →
            </Link>
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
