import type { Metadata } from "next";
import { BlogPostLayout, BlogQuote } from "@/components/BlogPostLayout";
import { TiltPermissionPrompt } from "@/components/TiltPermissionPrompt";
import { FloatingTiltToggle } from "@/components/FloatingTiltToggle";
import { WireframeNewsTask } from "@/components/wireframes/WireframeNewsTask";
import { WireframeCirclesTest } from "@/components/wireframes/WireframeCirclesTest";
import { DistractionInteractionChart } from "@/components/DistractionInteractionChart";
import { PipelineDiagram, MergePipelineDiagram } from "@/components/PipelineDiagram";

export const metadata: Metadata = {
  title: "What My Dissertation Taught Me About Complex Interfaces",
  description: "A behind-the-scenes look at designing a distraction-resistance study, and what the early data is starting to show.",
  openGraph: {
    title: "What My Dissertation Taught Me About Complex Interfaces - Dev Vyas",
    description: "A behind-the-scenes look at designing a distraction-resistance study, and what the early data is starting to show.",
    type: "article",
  },
};

const COLLECTION_STEPS = [
  { title: "Prolific", subtitle: "Recruitment and payment", tone: "neutral" as const },
  { title: "Qualtrics", subtitle: "Consent, demographics, reading speed", tone: "accent" as const },
  { title: "Circles test", subtitle: "ND, ED and DD scores", tone: "accent" as const },
  { title: "News search task", subtitle: "Accuracy, time and telemetry", tone: "accent" as const },
  { title: "Google Sheet backend", subtitle: "Automated write, one row per participant", tone: "neutral" as const },
];

const MERGE_SOURCES = [
  { title: "Qualtrics", subtitle: "", tone: "accent" as const },
  { title: "Circles test", subtitle: "", tone: "accent" as const },
  { title: "News task", subtitle: "", tone: "accent" as const },
];

const MERGE_STEPS = [
  { title: "Python merge script", subtitle: "Joined by Prolific ID and WM_ID", tone: "accent" as const },
  { title: "Exclude 2 participants", subtitle: "Confirmed concurrency bug in the write pipeline", tone: "accent" as const },
  { title: "Merged dataset", subtitle: "One clean CSV, N = 42", tone: "accent" as const },
];

const ANALYSIS_STEPS = [
  { title: "Load merged dataset", subtitle: "pandas, N = 42 sample", tone: "neutral" as const },
  { title: "Descriptive statistics", subtitle: "Distribution check across key variables", tone: "accent" as const },
  { title: "Correlation matrix", subtitle: "Exploratory sense check", tone: "accent" as const },
  { title: "Combined regressions", subtitle: "Two models, both outcomes", tone: "accent" as const },
  { title: "Cross-validate results", subtitle: "Checked independently in SPSS and Jamovi", tone: "neutral" as const },
];

export default function DissertationNotesPage() {
  return (
    <BlogPostLayout slug="dissertation-notes">
      <FloatingTiltToggle />
      <p>
        Every website I use is busy. Sponsored boxes, trending sidebars, autoplaying recommendations - it&apos;s the
        default now, not the exception. Some days I barely notice it. Other days I catch myself reading the same
        headline three times because something animated in the corner of my eye. That difference, between coping
        with clutter and getting derailed by it, is what my MSc dissertation at the University of York, supervised
        by Professor Joe Cutting, set out to actually measure rather than just notice anecdotally.
      </p>
      <p>
        The question underneath it: does someone&apos;s <em>distraction resistance</em>, their ability to hold onto
        what they&apos;re looking for while ignoring everything competing for attention, predict how well they cope
        with a realistically cluttered interface? And does it matter <em>when</em> the distraction shows up, while
        you&apos;re still taking something in, or after, while you&apos;re just trying to hold onto it?
      </p>

      <h2>Building the test bed</h2>
      <p>
        Nobody had tested this against a real, busy interface before, so there wasn&apos;t an off-the-shelf task to
        borrow. I built one from scratch: a purpose-made news article search task, hosted in-browser, with five
        rounds of a genuine search query against a grid of headlines. Every round carries three sponsored boxes and
        a trending sidebar, none of them clickable, all of them competing for attention. One correct article per
        round is deliberately sandwiched directly between two sponsored boxes, a construction I borrowed from Burke
        et al.&apos;s banner blindness research, which found that a target flanked by flashing banners took
        noticeably longer to find than one sitting on its own.
      </p>

      <div style={{ margin: "40px 0" }}>
        <TiltPermissionPrompt />
        <WireframeNewsTask showIntro={false} />
      </div>

      <p>
        It went through four pilot rounds before a single real participant touched it, and each one caught something
        I hadn&apos;t thought of. The most useful catch: one pilot participant finished an entire round without
        scrolling, missing six articles they never even saw, and scored badly as a direct result, not because of
        anything to do with distraction resistance. That one session told me the task itself had a usability problem
        sitting underneath the research question. I added scroll indicators and a live selection counter in the
        header so people could always see how many articles they&apos;d chosen, which fixed both issues without
        changing what the task was actually measuring.
      </p>

      <h2>Measuring distraction resistance separately</h2>
      <p>
        The search task only tells you half the story on its own - you need an independent measure of distraction
        resistance to compare it against, or you&apos;re just describing the task, not explaining the person.
        Alongside the search task, every participant completed an adapted version of a validated working-memory
        instrument (McNab et al., 2015) that scores two things separately: how well someone filters distraction the
        moment it appears, and how well they protect something already held in mind once distraction turns up
        later. The timing turns out to matter a lot in the literature, and it&apos;s the whole reason the study
        measures two scores instead of one. Give it a try below - pick a trial type and run it yourself.
      </p>

      <div style={{ margin: "40px 0" }}>
        <WireframeCirclesTest showIntro={false} />
      </div>

      <BlogQuote>The interface didn&apos;t change. The distractions didn&apos;t change. Only the person did.</BlogQuote>

      <h2>Running it properly</h2>
      <p>
        Forty-two participants completed the full study through Prolific, moving through an automated chain across
        four platforms: Prolific to Qualtrics for consent and demographics, then the working-memory test, then the
        news search task itself, with every result written back to a shared Google Sheet. Reading speed was
        measured covertly along the way too, framed to participants as a short comprehension check rather than a
        timed test, since telling people you&apos;re timing how fast they read tends to change how naturally they
        read. Everyone received a full debrief explaining the real purpose once they&apos;d finished, and the whole
        design went through full ethical approval at York before any data was collected.
      </p>

      <div style={{ margin: "40px 0" }}>
        <PipelineDiagram steps={COLLECTION_STEPS} />
      </div>

      <p>
        Three raw exports came out of that chain, one from each platform, and none of them lined up automatically.
        A Python script joins them by Prolific ID and a second identifier from the working-memory test, drops two
        participants whose search task results were silently overwritten by a backend timing bug before they were
        saved, and produces the single clean dataset everything else in this post is built on.
      </p>

      <div style={{ margin: "40px 0" }}>
        <MergePipelineDiagram sources={MERGE_SOURCES} merge={MERGE_STEPS} />
      </div>

      <h2>What the data is showing so far</h2>
      <p>
        The two outcomes I measured, search accuracy and completion time, told almost opposite stories. Accuracy
        barely moved between participants - most people scored close to perfect regardless of their
        working-memory profile, which turned out to be a ceiling effect built into the task rather than a genuine
        absence of difference. Completion time was a different matter entirely: how long someone took was strongly
        tied to their distraction-resistance profile, and the two components of that profile didn&apos;t act on
        their own, they interacted with each other.
      </p>

      <div style={{ margin: "40px 0" }}>
        <PipelineDiagram steps={ANALYSIS_STEPS} />
      </div>

      <div style={{ margin: "40px 0" }}>
        <DistractionInteractionChart />
      </div>

      <h2>What it means for design</h2>
      <p>
        The uncomfortable part of this finding is that two users can walk away from the same interface with
        identical, accurate results, while one of them has quietly paid a lot more time for it. An ordinary
        success-rate metric would never catch that gap. It suggests visual clutter isn&apos;t a flat tax everyone
        pays equally - sponsored content and high-salience distractors placed near relevant content cost some users
        very little and others a great deal, depending on a trait the user can&apos;t control and the designer
        usually can&apos;t see. The more specific version of that: reducing how much a person has to filter while
        first reading something may help more than spreading a general clutter reduction evenly across a page.
      </p>

      <h2>Where this goes from here</h2>
      <p>
        This dissertation is still being finalised, so I&apos;ve deliberately kept this write-up at the level of
        shape rather than exact numbers - once it&apos;s been submitted and marked, I&apos;ll come back and share
        the fuller analysis properly. What I can say already is that building the artefact taught me as much as the
        result did. Getting the pilot feedback that a whole scoring problem was a scrolling problem in disguise was
        a genuinely useful reminder that a research task is still an interface, and it has to be usable before it
        can measure anything real.
      </p>
      <p>
        If you&apos;d like to talk through the method, the pilot process, or anything else in more depth, drop me a
        message via the Contact section. Always happy to talk shop.
      </p>
    </BlogPostLayout>
  );
}
