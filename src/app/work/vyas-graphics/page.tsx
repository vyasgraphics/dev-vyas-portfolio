import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { BackToTop } from "@/components/BackToTop";
import { SectionNav } from "@/components/SectionNav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { LogoMarkTile } from "@/components/LogoMarkTile";
import { PlayableStill } from "@/components/PlayableStill";

export const metadata: Metadata = {
  title: "Vyas Graphics - Brand Identity & Sports Media",
  description: "Self-directed brand and motion work spanning logo design, animated logo reveals, and a full sports media campaign for the ICC T20 World Cup 2026.",
  openGraph: {
    title: "Vyas Graphics - Brand Identity & Sports Media - Dev Vyas",
    description: "Self-directed brand and motion work spanning logo design, animated logo reveals, and a full sports media campaign for the ICC T20 World Cup 2026.",
    type: "article",
  },
};

const SECTIONS = [
  { id: "identity", label: "Brand Identity" },
  { id: "motion", label: "Motion" },
  { id: "social", label: "Social Media" },
  { id: "print", label: "Print" },
  { id: "sports", label: "Sports Media" },
  { id: "flipbooks", label: "Flipbooks" },
];

const IMG = "/assets/images/vyas-graphics";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>{children}</h2>;
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "20px", ...style }}>
      {children}
    </p>
  );
}

function AutoGrid({ min, children }: { min: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${min}, 1fr))`, gap: "14px" }}>
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.55)", textAlign: "center", display: "block" }}>
      {children}
    </span>
  );
}

export default function VyasGraphicsWorkPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "56px 24px 100px" }}>
        <BackLink href="/#work" label="← Back to Work" />

        <header style={{ marginTop: "40px", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw + 8px, 44px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
            Vyas Graphics - Brand Identity &amp; Sports Media
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5, maxWidth: "580px", marginBottom: "24px" }}>
            Four years of self-directed brand and motion work - logo identities built from scratch, a full sports
            media campaign run like a real client account, and a habit of shipping in public that turned one
            LinkedIn comment into a rebuilt portfolio flipbook.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", fontSize: "13px" }}>
            {["Brand & Motion Designer", "2020-2026", "Illustrator", "After Effects"].map((t) => (
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

        {/* ── Brand Identity ── */}
        <ScrollReveal>
          <section id="identity" style={{ marginTop: "40px", marginBottom: "64px", scrollMarginTop: "24px" }}>
            <SectionHeading>Brand identity, from scratch</SectionHeading>
            <Body>
              Five marks, five different problems. A personal wordmark that needed to work as a spinning badge and a
              static lockup. A visa consultancy that needed to feel established. An abstract monogram with no brief
              at all beyond &ldquo;make it interesting.&rdquo; And two full circular badge identities - a charitable
              trust and a dairy brand - each one drawn, not templated.
            </Body>
            <AutoGrid min="130px">
              <LogoMarkTile src={`${IMG}/logo-vg-mark.jpg`} alt="Vyas Graphics VG wordmark" width={670} height={215} label="Vyas Graphics" />
              <LogoMarkTile src={`${IMG}/logo-raj-tailor.jpg`} alt="Raj Tailor visa and immigration consultancy logo" width={500} height={220} label="Raj Tailor Consultancy" />
              <LogoMarkTile src={`${IMG}/logo-diamond.jpg`} alt="Abstract diamond monogram mark" width={270} height={220} label="Diamond Monogram" />
              <LogoMarkTile src={`${IMG}/logo-jeevan-badge.jpg`} alt="Jeevan Deep Sahay charitable trust badge" width={370} height={307} label="Jeevan Deep Sahay Trust" />
              <LogoMarkTile src={`${IMG}/logo-lunara-badge.jpg`} alt="Lunara Dairy Co circular badge logo" width={420} height={307} label="Lunara Dairy Co." />
            </AutoGrid>

            <div style={{ marginTop: "48px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px" }}>AI-generated logo vectorisation</h3>
              <Body>
                The clearest brief I&apos;ve taken on didn&apos;t come from a mood board - it came from AI. Clients
                arrived with logo concepts generated by AI tools: on-brief, on-brand, and completely unusable past a
                business card. Raster output pixelates at scale and fails in print. I rebuilt each one as a clean,
                scalable vector in Illustrator - reconstructing paths, rebuilding gradients, and producing
                print-ready SVG exports. Drag each slider to compare the AI original against the rebuilt mark.
              </Body>
              <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                <div>
                  <BeforeAfterSlider
                    before={`${IMG}/vectorise-northstar-before.jpg`}
                    after={`${IMG}/vectorise-northstar-after.jpg`}
                    beforeLabel="AI Reference"
                    afterLabel="SVG · Clean Paths"
                    aspectRatio="640 / 480"
                    maxWidth="440px"
                  />
                  <Caption>NorthstarWin Limited - IT Solutions, UK</Caption>
                </div>
                <div>
                  <BeforeAfterSlider
                    before={`${IMG}/vectorise-lakeshore-before.jpg`}
                    after={`${IMG}/vectorise-lakeshore-after.jpg`}
                    beforeLabel="AI Reference"
                    afterLabel="SVG · Clean Paths"
                    aspectRatio="640 / 480"
                    maxWidth="440px"
                  />
                  <Caption>Lakeshore Pool &amp; Deck</Caption>
                </div>
                <div>
                  <BeforeAfterSlider
                    before={`${IMG}/vectorise-promith-before.jpg`}
                    after={`${IMG}/vectorise-promith-after.jpg`}
                    beforeLabel="AI Reference"
                    afterLabel="SVG · Clean Paths"
                    aspectRatio="640 / 480"
                    maxWidth="440px"
                  />
                  <Caption>Promith - SaaS, Restaurant Management</Caption>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Motion ── */}
        <ScrollReveal>
          <section id="motion" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <SectionHeading>Logo reveal animation</SectionHeading>
            <Body>
              Four export variants of the Vyas Graphics logo reveal, built in After Effects for different placement
              contexts - a retro CRT boot-up, a warm gold title card, a high-contrast mono cut, and a soft script
              signature.
            </Body>
            <AutoGrid min="200px">
              <PlayableStill poster={`${IMG}/reveal-01-crt.jpg`} alt="CRT monitor logo reveal" width={886} height={499} caption="CRT Boot-up" />
              <PlayableStill poster={`${IMG}/reveal-02-gold.jpg`} alt="Gold title card logo reveal" width={886} height={499} caption="Gold Title Card" />
              <PlayableStill poster={`${IMG}/reveal-03-mono.jpg`} alt="Monochrome logo reveal" width={886} height={499} caption="High-Contrast Mono" />
              <PlayableStill poster={`${IMG}/reveal-04-script.jpg`} alt="Script signature logo reveal" width={886} height={499} caption="Script Signature" />
            </AutoGrid>
          </section>
        </ScrollReveal>

        {/* ── Social Media ── */}
        <ScrollReveal>
          <section id="social" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <SectionHeading>Social media posts</SectionHeading>
            <Body>
              The Vyas Graphics self-promotion series on Instagram - promotional posts, service announcements, and
              festival greetings, moving between dark, minimal, and editorial aesthetics without losing a consistent
              hand.
            </Body>
            <AutoGrid min="130px">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <Image
                  key={n}
                  src={`${IMG}/social-${String(n).padStart(2, "0")}.jpg`}
                  alt={`Vyas Graphics Instagram post ${n}`}
                  width={473}
                  height={591}
                  style={{ width: "100%", height: "auto", borderRadius: "10px", display: "block" }}
                />
              ))}
            </AutoGrid>
          </section>
        </ScrollReveal>

        {/* ── Print ── */}
        <ScrollReveal>
          <section id="print" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <SectionHeading>Brochures</SectionHeading>
            <Body>
              Two-edition trifold brochures for R.N.G. Patel Institute of Technology&apos;s CSE department - faculty
              profiles, top-ranking students, campus facilities, and career pathways, laid out and print-prepared in
              InDesign.
            </Body>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <Image
                src={`${IMG}/brochure-v1.jpg`}
                alt="R.N.G. Patel Institute of Technology CSE department trifold brochure, edition one"
                width={1600}
                height={931}
                style={{ width: "100%", height: "auto", borderRadius: "10px", display: "block" }}
              />
              <Image
                src={`${IMG}/brochure-v2.jpg`}
                alt="R.N.G. Patel Institute of Technology CSE department trifold brochure, edition two"
                width={1600}
                height={931}
                style={{ width: "100%", height: "auto", borderRadius: "10px", display: "block" }}
              />
            </div>
          </section>
        </ScrollReveal>

        {/* ── Sports Media ── */}
        <ScrollReveal>
          <section id="sports" style={{ marginBottom: "64px", scrollMarginTop: "24px" }}>
            <SectionHeading>Sports media graphics</SectionHeading>
            <Body>
              Self-initiated sports media campaigns run like real client accounts - tournament identity, match-day
              coverage, and championship posters for two of cricket&apos;s biggest events.
            </Body>
            <div style={{
              padding: "14px 18px", borderRadius: "10px", marginBottom: "32px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}>
                Assets &amp; player images © ICC / BCCI / IPL / official sources. All content created for personal
                portfolio &amp; non-commercial use only. All official marks belong to their respective owners.
              </p>
            </div>

            <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px" }}>ICC Men&apos;s T20 World Cup 2026</h3>
            <Body>Tournament promo, match-day coverage, and a 15-player champions composite.</Body>
            <AutoGrid min="150px">
              <PlayableStill poster={`${IMG}/icc-01-promo.jpg`} alt="ICC T20 World Cup 2026 tournament promo" width={591} height={788} caption="Tournament Promo" />
              <Image src={`${IMG}/icc-02-poll.jpg`} alt="Final match story with IG poll sticker" width={443} height={788} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
              <Image src={`${IMG}/icc-03-final.jpg`} alt="India vs New Zealand final match poster" width={591} height={788} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
              <Image src={`${IMG}/icc-04-champions.jpg`} alt="India champions poster, full squad composite" width={591} height={788} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
            </AutoGrid>

            <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "40px 0 10px" }}>IPL 2026</h3>
            <Body>
              A six-slide visual identity carousel breaking down the tournament&apos;s burst motif and colour
              language through an HCI lens, followed by season coverage through to the final.
            </Body>
            <AutoGrid min="100px">
              {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => (
                <Image
                  key={n}
                  src={`${IMG}/ipl-identity-${String(n).padStart(2, "0")}.jpg`}
                  alt={`IPL 2026 visual identity case study, slide ${n}`}
                  width={325}
                  height={433}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              ))}
            </AutoGrid>

            <div style={{ margin: "18px 0" }}>
              <PlayableStill poster={`${IMG}/ipl-promo-wide.jpg`} alt="IPL 2026 season promo animation" width={827} height={434} caption="Season Promo Animation" />
            </div>

            <AutoGrid min="160px">
              <Image src={`${IMG}/ipl-points-table.jpg`} alt="IPL 2026 points table graphic" width={443} height={788} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
              <Image src={`${IMG}/ipl-match-poll.jpg`} alt="IPL 2026 final match story with poll" width={443} height={788} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
            </AutoGrid>
            <div style={{ height: "14px" }} />
            <AutoGrid min="220px">
              <Image src={`${IMG}/ipl-final-poster.jpg`} alt="IPL 2026 final poster, RCB vs Gujarat Titans" width={827} height={1103} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
              <Image src={`${IMG}/ipl-champions-poster.jpg`} alt="RCB champions poster, Tata IPL 2026" width={827} height={1103} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
            </AutoGrid>
          </section>
        </ScrollReveal>

        {/* ── Flipbooks ── */}
        <ScrollReveal>
          <section id="flipbooks" style={{ marginBottom: "56px", scrollMarginTop: "24px" }}>
            <SectionHeading>Flipbooks</SectionHeading>
            <Body>
              Three years of the same portfolio flipbook, rebuilt each time - a small, honest record of how the
              work (and the process behind it) kept moving.
            </Body>
            <AutoGrid min="150px">
              <div>
                <Image src={`${IMG}/flipbook-v1.png`} alt="Portfolio flipbook version one, dark gradient aesthetic" width={666} height={526} style={{ width: "100%", height: "auto" }} />
                <Caption>Version 01 - dark gradient aesthetic</Caption>
              </div>
              <div>
                <Image src={`${IMG}/flipbook-v2.png`} alt="Portfolio flipbook version two, LinkedIn upload" width={666} height={526} style={{ width: "100%", height: "auto" }} />
                <Caption>Version 02 - LinkedIn upload</Caption>
              </div>
              <div>
                <Image src={`${IMG}/flipbook-v3.png`} alt="Portfolio flipbook version three, navigable table of contents" width={666} height={526} style={{ width: "100%", height: "auto" }} />
                <Caption>Version 03 - fully navigable TOC</Caption>
              </div>
            </AutoGrid>

            <div style={{
              marginTop: "28px", padding: "22px", borderRadius: "14px",
              background: "rgba(0,222,81,0.06)", border: "1px solid rgba(0,222,81,0.2)",
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>
                A LinkedIn comment that changed my approach
              </h3>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "14px" }}>
                A reader flagged that Version 02&apos;s table of contents wasn&apos;t clickable. It was a real
                usability issue, not a nitpick - so I learned InDesign&apos;s interactive PDF export tools and
                rebuilt it. Version 03 shipped with a fully navigable, bookmarked TOC.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13.5px" }}>
                <span><strong style={{ color: "#fff" }}>Problem:</strong> <span style={{ color: "rgba(255,255,255,0.65)" }}>a static TOC made navigation frustrating.</span></span>
                <span><strong style={{ color: "#fff" }}>Research:</strong> <span style={{ color: "rgba(255,255,255,0.65)" }}>researched and applied InDesign&apos;s interactive export tools.</span></span>
                <span><strong style={{ color: "#fff" }}>Outcome:</strong> <span style={{ color: "rgba(255,255,255,0.65)" }}>a fully navigable Version 03, and a small case study in rapid, user-led iteration.</span></span>
              </div>
            </div>

            <div style={{ marginTop: "40px" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "10px" }}>Team India&apos;s Road to Final</h3>
              <Body>
                A multi-page editorial documenting India&apos;s T20 World Cup campaign, with ICC branding integrated
                throughout and a bold purple-and-magenta identity built around a lightning motif - designed for
                digital distribution as an interactive PDF.
              </Body>
              <Image
                src={`${IMG}/flipbook-t20.png`}
                alt="Team India's Road to Final flipbook, T20 World Cup editorial"
                width={666}
                height={526}
                style={{ width: "100%", maxWidth: "440px", height: "auto", display: "block", margin: "0 auto" }}
              />
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{
            padding: "28px", borderRadius: "16px",
            background: "rgba(0,222,81,0.06)", border: "1px solid rgba(0,222,81,0.25)",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>
              Follow along for design breakdowns, brand work, and new sports campaigns as they ship.
            </p>
            <Link
              href="https://www.instagram.com/vyas.graphics/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block", padding: "12px 28px", borderRadius: "100px",
                background: "#00DE51", color: "#0a0a0a", textDecoration: "none",
                fontSize: "14px", fontWeight: 700,
              }}
            >
              Explore more on Instagram →
            </Link>
          </div>
        </ScrollReveal>

        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <BackLink href="/#work" label="← Back to Work" />
        </div>
        <div aria-hidden style={{ height: "45vh" }} />
      </div>
      <BackToTop />
    </div>
  );
}
