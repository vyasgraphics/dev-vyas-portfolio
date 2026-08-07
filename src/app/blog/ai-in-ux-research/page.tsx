import type { Metadata } from "next";
import { BlogPostLayout, BlogQuote } from "@/components/BlogPostLayout";

export const metadata: Metadata = {
  title: "How AI Actually Fits Into a UX Research Workflow",
  description: "Notes from using AI tools alongside traditional research methods - what speeds things up, and where human judgement still has to lead.",
};

// Placeholder body content - demonstrates the structure (intro, section
// headings, a pull-quote, a list) ready to be swapped for the real writing.
export default function AiInUxResearchPage() {
  return (
    <BlogPostLayout slug="ai-in-ux-research">
      <p>
        [Intro paragraph goes here - a couple of sentences setting up what this post covers
        and why it's worth reading.]
      </p>

      <h2>Where AI actually speeds things up</h2>
      <p>
        [Body paragraph - e.g. concept ideation, first-draft synthesis of interview notes,
        generating variations quickly.]
      </p>

      <BlogQuote>
        [A short, quotable line pulled from the post - one or two sentences that
        capture the core argument.]
      </BlogQuote>

      <h2>Where human judgement still has to lead</h2>
      <p>
        [Body paragraph - e.g. validating findings against real user evidence,
        catching AI-generated false patterns.]
      </p>
      <ul>
        <li>[Point one]</li>
        <li>[Point two]</li>
        <li>[Point three]</li>
      </ul>

      <h2>Takeaway</h2>
      <p>
        [Closing paragraph.]
      </p>
    </BlogPostLayout>
  );
}
