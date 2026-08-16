import type { Metadata } from "next";

export const SITE_URL = "https://dev-vyas-portfolio.vercel.app";
export const SITE_NAME = "Dev Vyas";

/**
 * Builds a complete metadata block for a sub-page (case study or blog post).
 *
 * This exists because of a real, silent failure that only shows up when a
 * link is actually shared. Next.js does NOT deep-merge `openGraph` across
 * route segments: the moment a page exports its own `openGraph` object, it
 * replaces the root layout's entirely - including the reference to the
 * generated `/opengraph-image`, plus `url`, `siteName` and `locale`. Every
 * case study and blog post did exactly that in order to set its own title,
 * so all six had NO og:image at all. Pasting one into LinkedIn, WhatsApp or
 * Slack produced a bare text link with no preview card.
 *
 * The same trap applied to `twitter`: none of the pages overrode it, so they
 * inherited the ROOT block wholesale and every case study advertised itself
 * on X under the homepage's own title and description rather than its own.
 *
 * Centralising it means a page cannot set a title and quietly lose its
 * preview image again - the two are now impossible to specify separately.
 */
export function pageMetadata(opts: {
  /** Bare page title. The root layout's "%s - Dev Vyas" template appends the name. */
  title: string;
  /** Also used verbatim as the og/twitter description - keep it under ~155 chars. */
  description: string;
  /** Route path with a leading slash, e.g. "/work/move-app". */
  path: string;
  /** Shown in social cards, where the site name is not already visible. */
  socialTitle?: string;
  type?: "article" | "website";
}): Metadata {
  const { title, description, path, socialTitle, type = "article" } = opts;
  const cardTitle = `${socialTitle ?? title} - ${SITE_NAME}`;

  return {
    title,
    description,
    // Resolved against metadataBase in the root layout. Set per page rather
    // than once in the layout on purpose: a canonical inherited from the
    // layout would point every un-overridden page at the homepage and
    // de-index it, which fails far more quietly than having none at all.
    alternates: { canonical: path },
    openGraph: {
      title: cardTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "en_GB",
      type,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: cardTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: cardTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
