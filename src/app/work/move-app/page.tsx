import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { SectionNav } from "@/components/SectionNav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PersonaCard } from "@/components/PersonaCard";
import { personas } from "@/data/personas";

export const metadata: Metadata = {
  title: "Move - University Exercise App",
  description: "A full HCD lifecycle project tackling how to get students moving despite time pressures and fear of judgement.",
};

const IMG = "/assets/images/blog/building-move-app";

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
        <BackLink href="/#work" label="← Back to Work" />

        <header style={{ marginTop: "40px", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw + 8px, 44px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Move — University Exercise App
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
          <section id="problem" style={{ marginTop: "40px", marginBottom: "64px", scrollMarginTop: "140px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>The problem</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
              York already has plenty of exercise options - gyms, clubs, cycling routes, walking spaces. The problem
              was never a lack of choice. It was time pressure, self-consciousness, and unfamiliarity standing
              between students and using what was already there.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="personas" style={{ marginBottom: "64px", scrollMarginTop: "140px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Who it&apos;s for</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
              <PersonaCard persona={personas[0]} />
              <PersonaCard persona={personas[1]} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
                Liam needs reassurance, not motivation.
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
                Maya needs cognitive offloading, not encouragement.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="screens" style={{ marginBottom: "64px", scrollMarginTop: "140px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>The four screens that mattered</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {[
                { img: "component-01-smart-input.png", alt: "The Smart Input Onboarding: a Social Meter slider and Connect Timetable toggle" },
                { img: "component-02-quiet-mode.png", alt: "The Quiet Mode Dashboard showing tailored, low-traffic recommendations" },
                { img: "component-03-see-before-you-go.png", alt: "The See Before You Go detail screen with a 10s video preview and live crowd meter" },
                { img: "component-04-gap-finder.png", alt: "The Gap Finder Scheduler detecting a free window and suggesting a 20-minute walk" },
              ].map((s) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={s.img} src={`${IMG}/${s.img}`} alt={s.alt} style={{ width: "100%", borderRadius: "16px" }} />
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="finding" style={{ marginBottom: "64px", scrollMarginTop: "140px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>The key finding</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "20px" }}>
              In testing, participants read &ldquo;Quiet Mode&rdquo; as a system audio control, not a crowd filter -
              the one feature built to protect anxious users was the one nobody trusted enough to touch. Renaming it
              to <strong style={{ color: "#fff" }}>Crowd Filter</strong>, replacing the toggle with a
              &ldquo;Social/Solo&rdquo; control, and adding explicit confirmation feedback fixed it.
            </p>
            <BeforeAfterSlider
              before={`${IMG}/slider-before.png`}
              after={`${IMG}/slider-after.png`}
              beforeLabel="Quiet Mode"
              afterLabel="Crowd Filter"
            />
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "12px", textAlign: "center" }}>
              Drag to compare
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="next" style={{ marginBottom: "56px", scrollMarginTop: "140px" }}>
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
      </div>
    </div>
  );
}
