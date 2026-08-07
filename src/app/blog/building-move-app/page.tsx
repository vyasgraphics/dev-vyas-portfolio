import type { Metadata } from "next";
import { BlogPostLayout, BlogQuote } from "@/components/BlogPostLayout";

export const metadata: Metadata = {
  title: "From Lo-Fi to Live: Building Move App End to End",
  description: "A full walkthrough of the HCD lifecycle behind Move - from the first user interview to the final A/B study proposal.",
};

export default function BuildingMoveAppPage() {
  return (
    <BlogPostLayout slug="building-move-app">
      <p>
        [Intro paragraph - what Move set out to solve and why.]
      </p>

      <h2>Starting with research</h2>
      <p>
        [Body paragraph - interviews, personas, what the initial insights showed.]
      </p>

      <h2>From wireframes to prototype</h2>
      <p>
        [Body paragraph - the Figma prototyping process, key design decisions.]
      </p>

      <BlogQuote>
        [A short, quotable line pulled from the post.]
      </BlogQuote>

      <h2>Testing and what changed</h2>
      <p>
        [Body paragraph - think-aloud testing results, what got revised.]
      </p>
      <ul>
        <li>[Finding one]</li>
        <li>[Finding two]</li>
        <li>[Finding three]</li>
      </ul>

      <h2>Where it's headed</h2>
      <p>
        [Closing paragraph - the A/B study proposal, next steps.]
      </p>
    </BlogPostLayout>
  );
}
