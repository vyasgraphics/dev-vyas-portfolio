import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";
import { BlogPostLayout, BlogQuote } from "@/components/BlogPostLayout";

// Title trimmed to the form the openGraph block already used. The full
// headline ("...And Where It Still Can't Replace You") ran to 97 characters
// once the "- Dev Vyas" template was appended, so Google truncated it
// mid-phrase in results. It still appears in full as the h1 on the page.
export const metadata: Metadata = pageMetadata({
  title: "How AI Actually Fits Into a UX Research Workflow",
  description: "AI won't replace UX researchers, but it will change how you work. Here's a practical, honest look at where AI fits into your research process.",
  path: "/blog/ai-in-ux-research",
});

export default function AiInUxResearchPage() {
  const SECTIONS = [
    { id: "the-question", label: "The Question" },
    { id: "where-it-works", label: "Where It Works" },
    { id: "where-it-fails", label: "Where It Fails" },
    { id: "framework", label: "The Framework" },
    { id: "faqs", label: "FAQs" },
    { id: "takeaway", label: "Takeaway" },
  ];

  return (
    <BlogPostLayout slug="ai-in-ux-research" sections={SECTIONS}>
      <p>
        Search &ldquo;AI UX research&rdquo; on LinkedIn and you&apos;ll find two very loud camps. One insists AI is
        about to make researchers obsolete, replaced by a chatbot that can synthesise a hundred interviews before
        lunch. The other camp says AI has no place anywhere near research at all, that it&apos;s a shortcut for
        people who don&apos;t want to do the hard thinking research demands.
      </p>
      <p>
        Both camps are wrong. And if you&apos;ve actually tried using AI on a real research project, rather than
        just watching a demo, you probably already sense why.
      </p>
      <p>
        The truth is less dramatic and far more useful: AI has quietly become a genuinely helpful collaborator in
        parts of the UX research workflow, and it&apos;s next to useless (occasionally actively harmful) in others.
        The real skill now isn&apos;t deciding <em>whether</em> to use AI. It&apos;s knowing exactly where to let it
        in, and where to keep it firmly on the other side of the door.
      </p>
      <p>
        This isn&apos;t a hype piece, and it isn&apos;t a &ldquo;robots are coming for your job&rdquo; panic piece
        either. It&apos;s a practical, stage-by-stage look at where AI earns its place in a UX research workflow,
        based on how research actually gets done, not how it looks on a conference slide.
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/images/blog/ai-in-ux-research/planning-notes-coffee.jpg" alt="Researcher taking notes on a laptop next to a coffee" />

      <h2 id="the-question" style={{ scrollMarginTop: "24px" }}>The Question Isn&apos;t &ldquo;Should I Use AI?&rdquo; - It&apos;s &ldquo;Where?&rdquo;</h2>
      <p>
        Most of the anxiety around AI and research comes from treating it as one single decision. Either
        you&apos;re &ldquo;an AI-powered researcher&rdquo; or you&apos;re not. In reality, a UX research project has
        distinct stages, each with its own demands, and AI is useful in some, mediocre in others, and genuinely
        risky in a few.
      </p>
      <p>
        Think of it less like hiring a replacement and more like hiring a very fast, very literal intern. A good
        intern can save you hours on admin. A good intern cannot sit with a participant, notice the hesitation in
        their voice, and gently ask &ldquo;tell me more about that&rdquo; at exactly the right moment. Knowing the
        difference is the whole game.
      </p>
      <p>
        So let&apos;s go through the workflow properly, stage by stage, and be honest about what AI can and
        can&apos;t do at each one.
      </p>

      <h2 id="where-it-works" style={{ scrollMarginTop: "24px" }}>Where AI Genuinely Earns Its Place</h2>

      <h3>1. Planning and Scoping: Getting to a Sharper Question, Faster</h3>
      <p>
        Every research project lives or dies by its opening question. Vague questions produce vague findings, no
        matter how polished the report looks afterwards. This is where AI is quietly excellent, not because
        it&apos;s creative, but because it&apos;s a brilliant sparring partner.
      </p>
      <p>
        Feed a large language model your business problem, your assumptions, and your stakeholder&apos;s pet
        theory, and ask it to poke holes in your research plan. It&apos;ll flag leading questions in your
        discussion guide. It&apos;ll suggest angles you hadn&apos;t considered. It&apos;ll turn a woolly brief like
        &ldquo;find out why users don&apos;t like the new dashboard&rdquo; into a set of testable, specific research
        questions in minutes rather than a whole afternoon of staring at a blank document.
      </p>
      <p>
        It&apos;s also genuinely handy for drafting screener surveys, tightening consent language, and producing a
        first pass at a discussion guide that you then edit with your actual judgement. The AI isn&apos;t deciding
        what matters. It&apos;s clearing the underbrush so you can get to the interesting decisions faster.
      </p>

      <h3>2. Recruitment and Screening: Cutting the Admin, Not the Judgement</h3>
      <p>
        Recruitment is one of the least glamorous parts of UX research and one of the most time-consuming. Sorting
        screener responses, checking for straight-lining or contradictory answers, and shortlisting a workable
        sample from two hundred applicants used to eat up a full working day. AI tools can now flag suspicious
        responses, cluster candidates by relevant attributes, and do the first sift in a fraction of the time.
      </p>
      <p>
        The judgement call of &ldquo;who actually gets an interview slot&rdquo; should still sit with you. But
        letting AI handle the sorting means you spend your energy on the participants, not the spreadsheet.
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/images/blog/ai-in-ux-research/recruitment-team-notes.jpg" alt="Team pointing at sticky notes organised on a wall" />

      <h3>3. Running Sessions: A Second Pair of Ears, Not a Moderator</h3>
      <p>
        During a live interview or usability test, AI genuinely shines as a support tool rather than a stand-in.
        Real-time transcription means you&apos;re not frantically scribbling notes and missing the
        participant&apos;s facial reaction to a prototype. AI note-takers can timestamp key moments automatically,
        so when someone says &ldquo;I have no idea what this button does&rdquo; at minute fourteen, you can find
        that clip in seconds rather than scrubbing through forty minutes of footage later.
      </p>
      <p>
        What it absolutely should not do is moderate the session itself, at least not for anything requiring
        nuance. Good moderation is an act of reading a room. It&apos;s noticing that a participant went quiet after
        a particular screen and deciding, in the moment, to gently probe rather than move to the next task. An AI
        moderator, however conversational it sounds, can&apos;t read a wince. It follows a script. Real
        conversations rarely stay on script, and that&apos;s usually where the gold is.
      </p>

      <h3>4. Analysis: Where the Speed Actually Matters (With a Big Caveat)</h3>
      <p>
        This is the stage everyone gets most excited about, and for good reason. Thematic analysis across ten
        interviews is manageable by hand. Thematic analysis across fifty is a genuine slog, the kind of work that
        leads to fatigue-driven shortcuts and missed patterns. AI is remarkably good at the first pass here:
        clustering quotes by theme, surfacing recurring phrases, and flagging contradictions between participants
        that a tired human eye might skim past at 11pm before a deadline.
      </p>
      <p>
        Here&apos;s the caveat, and it&apos;s an important one: AI-generated themes are a starting hypothesis, not a
        finding. Large language models are pattern-matchers, not truth-detectors. They can confidently invent a
        theme that sounds plausible but doesn&apos;t actually hold up against the transcripts, a phenomenon
        researchers have started calling &ldquo;hallucinated insights.&rdquo; The fix isn&apos;t to avoid AI
        analysis altogether. It&apos;s to treat every AI-suggested theme the way you&apos;d treat a junior
        colleague&apos;s first pass: useful, worth reviewing, and never taken at face value without checking it
        against the raw data yourself.
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/images/blog/ai-in-ux-research/analysis-data-screen.jpg" alt="Analysing research data on a laptop screen" />

      <h3>5. Synthesis and Reporting: Turning a Mountain of Data Into a Story</h3>
      <p>
        Once you&apos;ve done the real thinking, that is, once you know what the findings actually mean, AI becomes
        useful again for the craft of communication. Turning a dense research deck into a punchy one-page summary
        for a busy stakeholder. Drafting three different versions of an executive summary depending on whether
        you&apos;re presenting to engineering, marketing, or the leadership team. Generating a first draft of a
        research repository entry so your team&apos;s knowledge base doesn&apos;t quietly rot.
      </p>
      <p>
        None of this replaces storytelling instinct. But it does remove the blank-page problem, and it means more
        of your time goes into deciding what matters rather than formatting bullet points at 9pm.
      </p>

      <h2 id="where-it-fails" style={{ scrollMarginTop: "24px" }}>Where AI Falls Down (And Why It Actually Matters)</h2>
      <p>It&apos;s worth being blunt about the limits, because glossing over them is how bad research decisions get made.</p>
      <p>
        <strong>It hallucinates with total confidence.</strong> An AI summary of an interview can state something a
        participant never said, phrased just as authoritatively as everything it got right. If you&apos;re not
        checking against the source material, you won&apos;t catch it until a stakeholder makes a decision based on
        a fabricated insight.
      </p>
      <p>
        <strong>It misses the &ldquo;why&rdquo; behind the &ldquo;what.&rdquo;</strong> AI can tell you that 60% of
        participants struggled with a particular flow. It&apos;s far weaker at explaining the underlying human
        reason, the mental model mismatch, the trust issue, the moment of embarrassment that made someone abandon a
        task. That kind of insight usually comes from being in the room, not from a transcript alone.
      </p>
      <p>
        <strong>It inherits bias from its training data.</strong> If the model has learned patterns from a narrow
        slice of the internet, its assumptions about &ldquo;typical&rdquo; user behaviour can quietly skew your
        analysis, especially when your actual user base doesn&apos;t match that assumption. This matters enormously
        in accessibility and inclusive design research, where the whole point is understanding people outside the
        &ldquo;average&rdquo; case.
      </p>
      <p>
        <strong>It has no empathy, and it can&apos;t fake the kind that matters.</strong> Participants often share
        difficult, personal things in research sessions, frustration, embarrassment, sometimes grief connected to
        why a product failed them. Reading a room and responding with genuine warmth isn&apos;t a nice-to-have
        skill. It&apos;s often the reason people open up enough to give you something real.
      </p>

      <h2 id="framework" style={{ scrollMarginTop: "24px" }}>A Practical Framework: Human In, Human Out</h2>
      <p>
        If you want a simple rule of thumb rather than a stage-by-stage checklist, try this:
      </p>

      <BlogQuote>AI can handle the middle, but humans should own both ends.</BlogQuote>

      <p>
        You define the research question and the &ldquo;so what&rdquo; at the start. You decide what the findings
        actually mean and what to do about them at the end. In between, hand off the repetitive, time-consuming,
        pattern-spotting work to AI, and treat its output as a draft that needs your scrutiny, not a finished
        product.
      </p>
      <p>A few habits that make this work in practice:</p>
      <ul>
        <li><strong>Always check AI-generated themes against two or three raw transcripts</strong> before they go into a report. It takes ten minutes and catches most hallucinations.</li>
        <li><strong>Never let AI write your executive summary from scratch without your own framing first.</strong> Decide the headline insight yourself, then let AI help you phrase it for different audiences.</li>
        <li><strong>Use AI transcription as a safety net, not a replacement for note-taking.</strong> Jotting your own observations in the moment keeps your instincts sharp and gives you a second source to cross-check against.</li>
        <li><strong>Be transparent with participants about how AI is being used</strong>, particularly around recording, transcription, and data handling. Trust is the currency of good research, and it&apos;s easily spent.</li>
      </ul>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/images/blog/ai-in-ux-research/synthesis-presenting-findings.jpg" alt="Designer presenting research findings to a team" />

      <h2 id="faqs" style={{ scrollMarginTop: "24px" }}>A Few Honest FAQs</h2>
      <p>
        <strong>Will AI replace UX researchers?</strong><br />
        Not the good ones. It&apos;ll replace the parts of the job that were always closer to admin than insight,
        freeing up time for the parts that actually require human judgement: framing, empathy, and knowing which
        finding actually matters.
      </p>
      <p>
        <strong>What&apos;s the biggest mistake teams make when adopting AI research tools?</strong><br />
        Trusting the output without checking it against the source. AI summaries sound confident whether or not
        they&apos;re accurate, and that confidence is exactly what makes them dangerous to skip-verify.
      </p>
      <p>
        <strong>Is it okay to use AI for small-sample qualitative research?</strong><br />
        Yes, with a heavier dose of scepticism. With only five or six interviews, an AI tool has very little data to
        pattern-match against, so its suggested themes are more likely to be shaky. Treat it as a first draft
        you&apos;re actively arguing with, not a conclusion.
      </p>

      <h2 id="takeaway" style={{ scrollMarginTop: "24px" }}>Where This Leaves Us</h2>
      <p>
        AI hasn&apos;t changed <em>what</em> good UX research looks like. It&apos;s changed how much of the
        repetitive work gets in the way of doing it well. Used thoughtfully, it clears space for more thinking
        time, more participant time, and fewer late nights formatting slide decks. Used carelessly, it produces
        confident-sounding nonsense dressed up as insight.
      </p>
      <p>
        The researchers who&apos;ll thrive over the next few years won&apos;t be the ones who reject AI on
        principle, or the ones who hand it the keys entirely. They&apos;ll be the ones who know precisely where to
        draw the line, and who never stop checking the AI&apos;s homework.
      </p>
      <p>
        If you&apos;re working out where AI actually belongs in your own research process, rather than just
        chasing whatever tool is trending this month, I&apos;m happy to talk it through. Get in touch via the
        Contact section.
      </p>
    </BlogPostLayout>
  );
}
