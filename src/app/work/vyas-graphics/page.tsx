import type { Metadata } from "next";
import { Children } from "react";
import Image from "next/image";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { SectionNav } from "@/components/SectionNav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { LogoMarkTile } from "@/components/LogoMarkTile";
import { PlayableStill } from "@/components/PlayableStill";
import { Carousel } from "@/components/Carousel";
import { SectionDivider } from "@/components/SectionDivider";
import { StaggerReveal } from "@/components/StaggerReveal";
import { BackToTop } from "@/components/BackToTop";
import AutoRepeatMarquee from "@/components/AutoRepeatMarquee";

export const metadata: Metadata = {
  title: "Vyas Graphics - Brand Identity & Sports Media",
  description: "Self-directed brand and motion work spanning logo design, animated logo reveals, and a full sports media campaign for the ICC T20 World Cup 2026.",
  openGraph: {
    title: "Vyas Graphics - Brand Identity & Sports Media - Dev Vyas",
    description: "Self-directed brand and motion work spanning logo design, animated logo reveals, and a full sports media campaign for the ICC T20 World Cup 2026.",
    type: "article",
  },
};

const SITE_URL = "https://dev-vyas-portfolio.vercel.app";
const PAGE_URL = `${SITE_URL}/work/vyas-graphics`;
const IMG_URL = `${SITE_URL}/assets/images/vyas-graphics`;

// Structured data (JSON-LD). Three schema.org types doing three distinct
// jobs, rather than one type stretched to cover everything:
// - BreadcrumbList gives Google the Home > Work > Vyas Graphics path, which
//   is what typically shows breadcrumbs in the SERP snippet instead of a
//   raw URL.
// - CreativeWork describes the case study itself (creator, representative
//   image, date), the umbrella type since this page is both a written
//   piece and a gallery, not cleanly just one or the other.
// - VideoObject, one per real video, is the highest-value addition here:
//   Google can surface these directly in video search/rich results, and
//   duration is exact (pulled from the actual transcoded files via
//   ffprobe when they were built, not estimated).
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Dev Vyas", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
        { "@type": "ListItem", position: 3, name: "Vyas Graphics", item: PAGE_URL },
      ],
    },
    {
      "@type": "CreativeWork",
      "@id": PAGE_URL,
      name: "Vyas Graphics - Brand Identity & Sports Media",
      description:
        "Self-directed brand and motion work spanning logo design, animated logo reveals, social media, print, and a full sports media campaign for the ICC T20 World Cup 2026 and IPL 2026.",
      url: PAGE_URL,
      image: `${IMG_URL}/icc-t20-world-cup-2026-final-india-new-zealand-poster.jpg`,
      creator: {
        "@type": "Person",
        name: "Dev Vyas",
        url: SITE_URL,
        jobTitle: "Product Designer",
        sameAs: [
          "https://www.linkedin.com/in/dev-vyas6",
          "https://www.behance.net/devvyas_graphics",
          "https://www.instagram.com/vyas.graphics/",
        ],
      },
      keywords: [
        "brand identity design",
        "logo design",
        "logo reveal animation",
        "sports media design",
        "ICC T20 World Cup 2026",
        "IPL 2026",
        "social media design",
        "motion graphics",
      ],
    },
    ...[
      { file: "vyas-graphics-logo-reveal-crt-boot-up-animation.mp4", poster: "vyas-graphics-logo-reveal-crt-boot-up-poster.jpg", name: "Vyas Graphics Logo Reveal - CRT Boot-up", duration: "PT18S" },
      { file: "vyas-graphics-logo-reveal-gold-title-card-animation.mp4", poster: "vyas-graphics-logo-reveal-gold-title-card-poster.jpg", name: "Vyas Graphics Logo Reveal - Gold Title Card", duration: "PT6S" },
      { file: "vyas-graphics-logo-reveal-monochrome-animation.mp4", poster: "vyas-graphics-logo-reveal-monochrome-poster.jpg", name: "Vyas Graphics Logo Reveal - High-Contrast Mono", duration: "PT8S" },
      { file: "vyas-graphics-logo-reveal-script-signature-animation.mp4", poster: "vyas-graphics-logo-reveal-script-signature-poster.jpg", name: "Vyas Graphics Logo Reveal - Script Signature", duration: "PT11S" },
      { file: "icc-t20-world-cup-2026-tournament-promo-animation.mp4", poster: "icc-t20-world-cup-2026-tournament-promo-poster.jpg", name: "ICC Men's T20 World Cup 2026 Tournament Promo", duration: "PT25S" },
      { file: "ipl-2026-season-promo-animation.mp4", poster: "ipl-2026-season-promo-poster.jpg", name: "IPL 2026 Season Promo Animation", duration: "PT20S" },
    ].map((v) => ({
      "@type": "VideoObject",
      name: v.name,
      description: `${v.name}, part of the Vyas Graphics brand and sports media case study.`,
      thumbnailUrl: `${IMG_URL}/${v.poster}`,
      contentUrl: `${IMG_URL}/${v.file}`,
      uploadDate: "2026-08-08",
      duration: v.duration,
    })),
  ],
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

const TOOLS = [
  { icon: "tech-ai.svg", name: "Illustrator" },
  { icon: "tech-ps.svg", name: "Photoshop" },
  { icon: "tech-ae.svg", name: "After Effects" },
  { icon: "tech-id.svg", name: "InDesign" },
  { icon: "tech-pr.svg", name: "Premiere Pro" },
];

const GALLERY_IMAGES = [
  { src: "vyas-graphics-custom-design-promo-instagram-post.jpg", alt: "Vyas Graphics custom design promo post", w: 900, h: 1124 },
  { src: "icc-t20-world-cup-2026-final-india-new-zealand-poster.jpg", alt: "ICC T20 World Cup final poster", w: 800, h: 1066 },
  { src: "vyas-graphics-founder-portrait-instagram-post.jpg", alt: "Vyas Graphics portrait brand post", w: 900, h: 1199 },
  { src: "rcb-ipl-2026-champions-poster.jpg", alt: "RCB IPL champions poster", w: 1100, h: 1466 },
  { src: "vyas-graphics-unforgettable-post-instagram-post.jpg", alt: "Vyas Graphics Instagram post", w: 900, h: 1123 },
  { src: "icc-t20-world-cup-2026-india-champions-poster.jpg", alt: "India T20 World Cup champions poster", w: 800, h: 1066 },
  { src: "vyas-graphics-elevate-visual-identity-instagram-post.jpg", alt: "Elevate your visual identity promotional post", w: 900, h: 1125 },
  { src: "ipl-2026-final-rcb-vs-gujarat-titans-poster.jpg", alt: "IPL final poster, RCB vs Gujarat Titans", w: 1100, h: 1466 },
  { src: "vyas-graphics-happy-new-year-2026-instagram-post.jpg", alt: "Vyas Graphics New Year post", w: 900, h: 1124 },
  { src: "vyas-graphics-design-fundamentals-instagram-post.jpg", alt: "Vyas Graphics design fundamentals post", w: 900, h: 1199 },
];

const FLIPBOOKS = [
  {
    src: "dev-vyas-portfolio-flipbook-v1-dark-gradient.png",
    alt: "Portfolio flipbook version one, dark gradient aesthetic",
    caption: "Version 01 - dark gradient",
    href: "https://devvyas-portfolio-sep2022.netlify.app/mobile/index.html",
  },
  {
    src: "dev-vyas-portfolio-flipbook-v2-linkedin-upload.png",
    alt: "Portfolio flipbook version two, LinkedIn upload",
    caption: "Version 02 - LinkedIn upload",
    href: "https://dev-vyas-portfolio.netlify.app/mobile/index.html",
  },
  {
    src: "dev-vyas-portfolio-flipbook-v3-navigable-toc.png",
    alt: "Portfolio flipbook version three, navigable table of contents",
    caption: "Version 03 - navigable TOC",
    href: "https://vyas-dev-portfolio-2024.netlify.app/mobile/index.html",
  },
  {
    src: "team-india-road-to-final-t20-world-cup-flipbook.png",
    alt: "Team India's Road to Final flipbook, T20 World Cup editorial",
    caption: "Team India's Road to Final",
    href: "https://india-wc24.web.app/mobile/index.html",
  },
];

const SERVICES_CAROUSEL = [
  { src: "vyas-graphics-elevate-visual-identity-instagram-post.jpg", alt: "Elevate your visual identity promotional post", width: 900, height: 1125 },
  { src: "vyas-graphics-digital-motion-services-instagram-post.jpg", alt: "Digital & motion, branding & media services breakdown", width: 900, height: 1125 },
  { src: "vyas-graphics-follow-us-instagram-post.jpg", alt: "Follow Vyas Graphics for amazing content", width: 900, height: 1125 },
];

const SOCIAL_GRID = [
  { src: "vyas-graphics-custom-design-promo-instagram-post.jpg", h: 1124, alt: "Vyas Graphics custom design promo Instagram post" },
  { src: "vyas-graphics-better-content-instagram-post.jpg", h: 1123, alt: "Your brand deserves better content Instagram post" },
  { src: "vyas-graphics-unforgettable-post-instagram-post.jpg", h: 1123, alt: "Make your post unforgettable Instagram post" },
  { src: "vyas-graphics-brand-introduction-instagram-post.jpg", h: 1124, alt: "Vyas Graphics brand introduction Instagram post" },
  { src: "vyas-graphics-founder-portrait-instagram-post.jpg", h: 1199, alt: "Vyas Graphics founder portrait Instagram post" },
  { src: "vyas-graphics-happy-new-year-2026-instagram-post.jpg", h: 1124, alt: "Vyas Graphics Happy New Year 2026 Instagram post" },
  { src: "vyas-graphics-design-fundamentals-instagram-post.jpg", h: 1199, alt: "Design fundamentals still matter Instagram post" },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "14px" }}>{children}</h2>;
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", marginBottom: "20px", maxWidth: "780px", ...style }}>
      {children}
    </p>
  );
}

// Repeating fan angles (degrees) for the .vg-glass resting lean. Cycles every
// 4 items so any row length reads as a gently spread deck rather than a
// uniform tilt. Passed down through StaggerReveal as --vg-fan.
const VG_FAN_PATTERN = [-6, -2.5, 2.5, 6];

function AutoGrid({
  min,
  children,
  fan = false,
}: {
  min: string;
  children: React.ReactNode;
  fan?: boolean;
}) {
  const items = Children.toArray(children);
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${min}, 1fr))`, gap: "20px" }}>
      {items.map((child, i) => (
        <StaggerReveal key={i} index={i} fan={fan ? VG_FAN_PATTERN[i % VG_FAN_PATTERN.length] : undefined}>
          {child}
        </StaggerReveal>
      ))}
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
    <div id="vg-top" style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "56px 24px 0" }}>
        <BackLink href="/#work" label="← Back to Work" />

        <header className="vg-hero-in" style={{ marginTop: "40px", marginBottom: "36px" }}>
          <h1 style={{ fontSize: "clamp(28px, 3.4vw + 8px, 46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px", maxWidth: "820px" }}>
            Vyas Graphics - Brand Identity &amp; Sports Media
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.55, maxWidth: "700px", marginBottom: "24px" }}>
            Four years of self-directed brand and motion work - logo identities built from scratch, sports campaigns
            run like real client accounts, and a habit of shipping in public.
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
      </div>

      <div className="vg-hero-in vg-tilt-gallery" style={{ marginBottom: "36px", padding: "34px 0" }}>
        <AutoRepeatMarquee direction="left" pauseOnHover={false} speed={26} gap={24} repeat={3}>
          {GALLERY_IMAGES.map((img) => (
            <div key={img.src} className="vg-tilt-card vg-card">
              <Image
                src={`${IMG}/${img.src}`}
                alt={img.alt}
                width={img.w}
                height={img.h}
                style={{ height: "260px", width: "auto", display: "block", borderRadius: "10px" }}
              />
            </div>
          ))}
        </AutoRepeatMarquee>
      </div>

      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px 100px" }}>
        <SectionNav sections={SECTIONS} />

        {/* ── Brand Identity ── */}
        <ScrollReveal>
          <section id="identity" style={{ marginBottom: "72px", scrollMarginTop: "24px" }}>
            <SectionDivider index="01" tag="5 marks, 1 voice" />
            <SectionHeading>Brand identity, from scratch</SectionHeading>
            <Body>
              Five marks, five different problems. A personal wordmark that needed to work as a spinning badge and a
              static lockup. A visa consultancy that needed to feel established. An abstract monogram with no brief
              beyond &ldquo;make it interesting.&rdquo; And two full circular badge identities - a charitable trust
              and a dairy brand - each one drawn, not templated.
            </Body>
            <AutoGrid min="190px">
              <LogoMarkTile src={`${IMG}/vyas-graphics-vg-wordmark-logo.png`} alt="Vyas Graphics VG wordmark" width={1239} height={264} label="Vyas Graphics" />
              <LogoMarkTile src={`${IMG}/raj-tailor-immigration-consultancy-logo.png`} alt="Raj Tailor visa and immigration consultancy logo" width={1311} height={395} label="Raj Tailor Consultancy" />
              <LogoMarkTile src={`${IMG}/abstract-diamond-monogram-logo.png`} alt="Abstract diamond monogram mark" width={633} height={633} label="Diamond Monogram" />
              <LogoMarkTile src={`${IMG}/jeevan-deep-sahay-charitable-trust-logo.png`} alt="Jeevan Deep Sahay charitable trust badge" width={645} height={645} label="Jeevan Deep Sahay Trust" />
              <LogoMarkTile src={`${IMG}/lunara-dairy-co-logo-badge.png`} alt="Lunara Dairy Co circular badge logo" width={645} height={645} label="Lunara Dairy Co." />
            </AutoGrid>

            <div style={{ marginTop: "56px" }}>
              <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "10px" }}>AI-generated logo vectorisation</h3>
              <Body>
                Clients arrived with AI-generated logo concepts - on-brief, on-brand, and unusable past a business
                card. I rebuilt each one as a clean, scalable vector in Illustrator, print-ready at any size. Drag
                each slider to compare.
              </Body>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "36px" }}>
                {[
                  ["3", "AI logos rebuilt as vector"],
                  ["Raster → SVG", "pixelates vs. print-ready"],
                  ["0", "gradients or paths left unrebuilt"],
                ].map(([stat, label]) => (
                  <div key={label} style={{
                    flex: "1 1 190px", padding: "14px 16px", borderRadius: "12px",
                    background: "rgba(0,222,81,0.05)", border: "1px solid rgba(0,222,81,0.18)",
                  }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#00DE51", marginBottom: "2px" }}>{stat}</div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px 24px" }}>
                <div>
                  <BeforeAfterSlider
                    before={`${IMG}/northstarwin-ai-generated-logo-reference.jpg`}
                    after={`${IMG}/northstarwin-vector-logo-redesign.jpg`}
                    beforeLabel="AI Reference"
                    afterLabel="SVG · Clean Paths"
                    aspectRatio="900 / 720"
                    maxWidth="420px"
                  />
                  <Caption>NorthstarWin Limited</Caption>
                </div>
                <div>
                  <BeforeAfterSlider
                    before={`${IMG}/lakeshore-pool-deck-ai-generated-logo-reference.jpg`}
                    after={`${IMG}/lakeshore-pool-deck-vector-logo-redesign.jpg`}
                    beforeLabel="AI Reference"
                    afterLabel="SVG · Clean Paths"
                    aspectRatio="900 / 720"
                    maxWidth="420px"
                  />
                  <Caption>Lakeshore Pool &amp; Deck</Caption>
                </div>
                <div>
                  <BeforeAfterSlider
                    before={`${IMG}/promith-ai-generated-logo-reference.jpg`}
                    after={`${IMG}/promith-vector-logo-redesign.jpg`}
                    beforeLabel="AI Reference"
                    afterLabel="SVG · Clean Paths"
                    aspectRatio="900 / 720"
                    maxWidth="420px"
                  />
                  <Caption>Promith</Caption>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Motion ── */}
        <ScrollReveal>
          <section id="motion" style={{ marginBottom: "72px", scrollMarginTop: "24px" }}>
            <SectionDivider index="02" tag="Play to reveal" />
            <SectionHeading>Logo reveal animation</SectionHeading>
            <Body>
              Four export variants of the Vyas Graphics logo reveal, built in After Effects for different placement
              contexts - a retro CRT boot-up, a warm gold title card, a high-contrast mono cut, and a soft script
              signature. Click any of them to play.
            </Body>
            <AutoGrid min="280px" fan>
              <PlayableStill className="vg-glass" poster={`${IMG}/vyas-graphics-logo-reveal-crt-boot-up-poster.jpg`} videoSrc={`${IMG}/vyas-graphics-logo-reveal-crt-boot-up-animation.mp4`} alt="CRT monitor logo reveal" width={1280} height={720} caption="CRT Boot-up" duration="0:18" />
              <PlayableStill className="vg-glass" poster={`${IMG}/vyas-graphics-logo-reveal-gold-title-card-poster.jpg`} videoSrc={`${IMG}/vyas-graphics-logo-reveal-gold-title-card-animation.mp4`} alt="Gold title card logo reveal" width={1280} height={720} caption="Gold Title Card" duration="0:06" />
              <PlayableStill className="vg-glass" poster={`${IMG}/vyas-graphics-logo-reveal-monochrome-poster.jpg`} videoSrc={`${IMG}/vyas-graphics-logo-reveal-monochrome-animation.mp4`} alt="Monochrome logo reveal" width={1280} height={720} caption="High-Contrast Mono" duration="0:08" />
              <PlayableStill className="vg-glass" poster={`${IMG}/vyas-graphics-logo-reveal-script-signature-poster.jpg`} videoSrc={`${IMG}/vyas-graphics-logo-reveal-script-signature-animation.mp4`} alt="Script signature logo reveal" width={1280} height={720} caption="Script Signature" duration="0:11" />
            </AutoGrid>
          </section>
        </ScrollReveal>

        {/* ── Social Media ── */}
        <ScrollReveal>
          <section id="social" style={{ marginBottom: "72px", scrollMarginTop: "24px" }}>
            <SectionDivider index="03" tag="Feed-ready craft" />
            <SectionHeading>Social media posts</SectionHeading>
            <Body>
              The Vyas Graphics self-promotion series on Instagram - promotional posts, service announcements, and
              festival greetings, moving between dark, minimal, and editorial aesthetics without losing a consistent
              hand.
            </Body>

            <div style={{ marginBottom: "36px" }}>
              <Carousel
                label="Carousel post"
                showArrows={false}
                showCounter={false}
                showDots={false}
                items={SERVICES_CAROUSEL.map((s) => ({ ...s, src: `${IMG}/${s.src}` }))}
              />
            </div>

            <AutoGrid min="210px" fan>
              {SOCIAL_GRID.map(({ src, h, alt }) => (
                <Image
                  key={src}
                  src={`${IMG}/${src}`}
                  alt={alt}
                  width={900}
                  height={h}
                  className="vg-card vg-glass"
                  style={{ width: "100%", height: "auto", borderRadius: "12px", display: "block" }}
                />
              ))}
            </AutoGrid>
          </section>
        </ScrollReveal>

        {/* ── Print ── */}
        <ScrollReveal>
          <section id="print" style={{ marginBottom: "72px", scrollMarginTop: "24px" }}>
            <SectionDivider index="04" tag="Ink & layout" />
            <SectionHeading>Brochures</SectionHeading>
            <Body>
              Two-edition trifold brochures for R.N.G. Patel Institute of Technology&apos;s CSE department - faculty
              profiles, top-ranking students, campus facilities, and career pathways, laid out and print-prepared in
              InDesign.
            </Body>
            <div style={{ display: "flex", flexDirection: "column", gap: "44px", padding: "8px 0" }}>
              <Image
                src={`${IMG}/rngpit-cse-department-trifold-brochure-edition-one.png`}
                alt="R.N.G. Patel Institute of Technology CSE department trifold brochure, edition one"
                width={1700}
                height={936}
                className="vg-card vg-brochure-tilt"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <Image
                src={`${IMG}/rngpit-cse-department-trifold-brochure-edition-two.png`}
                alt="R.N.G. Patel Institute of Technology CSE department trifold brochure, edition two"
                width={1700}
                height={936}
                className="vg-card vg-brochure-tilt"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </section>
        </ScrollReveal>

        {/* ── Sports Media ── */}
        <ScrollReveal>
          <section id="sports" style={{ marginBottom: "72px", scrollMarginTop: "24px" }}>
            <SectionDivider index="05" tag="Client-grade campaigns" />
            <SectionHeading>Sports media graphics</SectionHeading>
            <Body>
              Self-initiated sports media campaigns run like real client accounts - tournament identity, match-day
              coverage, and championship posters for two of cricket&apos;s biggest events.
            </Body>
            <div style={{
              padding: "14px 18px", borderRadius: "10px", marginBottom: "36px", maxWidth: "780px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}>
                Assets &amp; player images © ICC / BCCI / IPL / official sources. All content created for personal
                portfolio &amp; non-commercial use only. All official marks belong to their respective owners.
              </p>
            </div>

            <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "10px" }}>ICC Men&apos;s T20 World Cup 2026</h3>
            <Body>Tournament promo, match-day coverage, and a 15-player champions composite.</Body>
            <AutoGrid min="230px" fan>
              <PlayableStill className="vg-glass" poster={`${IMG}/icc-t20-world-cup-2026-tournament-promo-poster.jpg`} videoSrc={`${IMG}/icc-t20-world-cup-2026-tournament-promo-animation.mp4`} alt="ICC T20 World Cup 2026 tournament promo" width={720} height={960} caption="Tournament Promo" duration="0:25" />
              <Image src={`${IMG}/icc-t20-world-cup-2026-final-instagram-poll-story.jpg`} alt="Final match story with IG poll sticker" width={800} height={1420} className="vg-card vg-glass" style={{ width: "100%", height: "auto" }} />
              <Image src={`${IMG}/icc-t20-world-cup-2026-final-india-new-zealand-poster.jpg`} alt="India vs New Zealand final match poster" width={800} height={1066} className="vg-card vg-glass" style={{ width: "100%", height: "auto" }} />
              <Image src={`${IMG}/icc-t20-world-cup-2026-india-champions-poster.jpg`} alt="India champions poster, full squad composite" width={800} height={1066} className="vg-card vg-glass" style={{ width: "100%", height: "auto" }} />
            </AutoGrid>

            <h3 style={{ fontSize: "19px", fontWeight: 700, margin: "48px 0 10px" }}>IPL 2026</h3>
            <Body>
              A six-slide visual identity carousel breaking down the tournament&apos;s burst motif and colour
              language through an HCI lens, followed by season coverage through to the final.
            </Body>

            <div style={{ marginBottom: "32px" }}>
              <Carousel
                label="Visual identity case study"
                items={Array.from({ length: 6 }, (_, i) => {
                  const n = i + 1;
                  return {
                    src: `${IMG}/ipl-2026-visual-identity-case-study-slide-${String(n).padStart(2, "0")}.jpg`,
                    alt: `IPL 2026 visual identity case study, slide ${n}`,
                    width: 800,
                    height: 1067,
                  };
                })}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <StaggerReveal>
                <PlayableStill poster={`${IMG}/ipl-2026-season-promo-poster.jpg`} videoSrc={`${IMG}/ipl-2026-season-promo-animation.mp4`} alt="IPL 2026 season promo animation" width={1280} height={670} caption="Season Promo Animation" duration="0:20" />
              </StaggerReveal>
            </div>

            <AutoGrid min="280px" fan>
              <Image src={`${IMG}/ipl-2026-points-table-graphic.jpg`} alt="IPL 2026 points table graphic" width={800} height={1421} className="vg-card vg-glass" style={{ width: "100%", height: "auto" }} />
              <Image src={`${IMG}/ipl-2026-final-instagram-poll-story.jpg`} alt="IPL 2026 final match story with poll" width={800} height={1421} className="vg-card vg-glass" style={{ width: "100%", height: "auto" }} />
            </AutoGrid>
            <div style={{ height: "20px" }} />
            <AutoGrid min="320px" fan>
              <Image src={`${IMG}/ipl-2026-final-rcb-vs-gujarat-titans-poster.jpg`} alt="IPL 2026 final poster, RCB vs Gujarat Titans" width={1100} height={1466} className="vg-card vg-glass" style={{ width: "100%", height: "auto" }} />
              <Image src={`${IMG}/rcb-ipl-2026-champions-poster.jpg`} alt="RCB champions poster, Tata IPL 2026" width={1100} height={1466} className="vg-card vg-glass" style={{ width: "100%", height: "auto" }} />
            </AutoGrid>
          </section>
        </ScrollReveal>

        {/* ── Flipbooks ── */}
        <ScrollReveal>
          <section id="flipbooks" style={{ marginBottom: "56px", scrollMarginTop: "24px" }}>
            <SectionDivider index="06" tag="3 years, rebuilt" />
            <SectionHeading>Flipbooks</SectionHeading>
            <Body>
              Three years of the same portfolio flipbook, rebuilt each time, plus a themed editorial for India&apos;s
              T20 World Cup run - a small, honest record of how the work kept moving. Each cover links through to
              the live, page-turning version.
            </Body>

            <AutoGrid min="230px">
              {FLIPBOOKS.map((fb) => (
                <div key={fb.href}>
                  <Link href={fb.href} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                    <Image
                      src={`${IMG}/${fb.src}`}
                      alt={fb.alt}
                      width={900}
                      height={647}
                      className="vg-card"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </Link>
                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <Caption>{fb.caption}</Caption>
                    <Link
                      href={fb.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "4px",
                        fontSize: "12.5px", fontWeight: 600, color: "#00DE51", textDecoration: "none",
                      }}
                    >
                      Flip through it ↗
                    </Link>
                  </div>
                </div>
              ))}
            </AutoGrid>

            <div style={{
              marginTop: "40px", padding: "22px", borderRadius: "14px", maxWidth: "780px",
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
          </section>
        </ScrollReveal>

        <div className="vg-hero-in" style={{ margin: "48px 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 0" }}>
          <AutoRepeatMarquee direction="left" pauseOnHover={false} speed={32} gap={14} repeat={6}>
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "8px 18px", borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)",
                  whiteSpace: "nowrap",
                }}
              >
                <Image src={`/assets/images/section/${tool.icon}`} alt="" width={16} height={16} />
                <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>{tool.name}</span>
              </div>
            ))}
          </AutoRepeatMarquee>
        </div>

        <ScrollReveal>
          <div style={{
            padding: "28px", borderRadius: "16px",
            background: "rgba(0,222,81,0.06)", border: "1px solid rgba(0,222,81,0.25)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
          }}>
            <Link
              href="https://www.instagram.com/vyas.graphics/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vyas Graphics on Instagram"
              style={{ display: "inline-flex" }}
            >
              <Image src="/assets/images/social/instagram.svg" alt="" width={52} height={52} />
            </Link>
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

      <style>{`
        @keyframes vg-hero-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .vg-hero-in {
          animation: vg-hero-in 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .vg-hero-in { animation: none; }
        }
      `}</style>
    </div>
  );
}
