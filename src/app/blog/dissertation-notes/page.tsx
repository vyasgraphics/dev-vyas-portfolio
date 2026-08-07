import type { Metadata } from "next";
import { BlogPostLayout, BlogQuote } from "@/components/BlogPostLayout";

export const metadata: Metadata = {
  title: "What My Dissertation Taught Me About Complex Interfaces",
  description: "A behind-the-scenes look at designing a distraction-resistance study, and what the early data is starting to show.",
};

export default function DissertationNotesPage() {
  return (
    <BlogPostLayout slug="dissertation-notes">
      <p>
        [Intro paragraph - what the dissertation set out to study and why it matters.]
      </p>

      <h2>Designing the study</h2>
      <p>
        [Body paragraph - the research question, the method, why distraction-resistance
        specifically.]
      </p>

      <h2>What the early data is showing</h2>
      <p>
        [Body paragraph - findings so far, anything surprising.]
      </p>

      <BlogQuote>
        [A short, quotable line pulled from the post.]
      </BlogQuote>

      <h3>Methodology notes</h3>
      <ul>
        <li>[Detail one]</li>
        <li>[Detail two]</li>
        <li>[Detail three]</li>
      </ul>

      <h2>What's next</h2>
      <p>
        [Closing paragraph.]
      </p>
    </BlogPostLayout>
  );
}
