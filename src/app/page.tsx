import type { Metadata } from "next";
import { HomeShell } from "@/components/HomeShell";

// Only the canonical. Title, description, Open Graph and Twitter all come
// from the root layout and are correct there - declaring any of them again
// here would replace the layout's block wholesale rather than merging with
// it, which is exactly how the case study pages silently lost their
// og:image. The canonical is set here rather than in the layout so that it
// applies to this page alone: inherited from the layout, every page that
// forgot to override it would point at the homepage and de-index itself.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const SITE_URL = "https://dev-vyas-portfolio.vercel.app";

// Structured data for the homepage. Every case study and blog post already
// carried JSON-LD; the homepage carried none, which is the wrong way round
// for a personal site - this is the page that should tell a search engine
// who the person actually IS, so a search for "Dev Vyas" can resolve to a
// person with a job, a location and verified profiles rather than to a page
// that merely mentions the name a lot.
//
// `jobTitle` lists all three titles rather than one canonical string. This
// reversed an earlier decision, on recruitment grounds: schema.org allows an
// array here, all three are true, and they are the actual terms roles get
// advertised under - so an entity match on any one of them should resolve to
// this person. A single "Product Designer" was tidier but silently opted out
// of the other two. Ordered to match the visible identity, Product first.
// `knowsAbout` below still carries the skills, which is a different question
// from what job he is applying for.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Dev Vyas",
      url: SITE_URL,
      jobTitle: ["Product Designer", "UX/UI Designer", "Graphic Designer"],
      description:
        "Product and UX/UI designer combining human-centred research, graphic design and front-end development. MSc Human-Centred Interactive Technologies (Distinction), University of York.",
      // The real portrait from the profile card, not the text-only share
      // card: a person's image in search results should be the person.
      image: `${SITE_URL}/assets/images/avatar/avatar.webp`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leeds",
        addressCountry: "GB",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of York" },
        { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
      ],
      knowsAbout: [
        "product design",
        "UX/UI design",
        "user research",
        "accessibility",
        "human-centred design",
        "usability testing",
        "graphic design",
        "brand identity design",
        "motion graphics",
        "front-end development",
      ],
      sameAs: [
        "https://www.linkedin.com/in/dev-vyas6",
        "https://www.behance.net/devvyas_graphics",
        "https://www.instagram.com/vyas.graphics/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Dev Vyas",
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    // ProfilePage is the schema.org type Google documents for a page whose
    // main subject is one person, so the homepage says what it is rather
    // than leaving it to be inferred from the Person node alone.
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Dev Vyas | Product & UX/UI Designer",
      inLanguage: "en-GB",
      dateModified: "2026-11-10",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <HomeShell />
    </>
  );
}
