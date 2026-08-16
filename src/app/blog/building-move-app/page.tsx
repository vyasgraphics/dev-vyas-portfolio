import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";
import { BlogPostLayout, BlogQuote } from "@/components/BlogPostLayout";
import { PersonaCard } from "@/components/PersonaCard";
import { TiltPermissionPrompt } from "@/components/TiltPermissionPrompt";
import { FloatingTiltToggle } from "@/components/FloatingTiltToggle";
import { ScenarioCard } from "@/components/ScenarioCard";
import { ClaimsTable } from "@/components/ClaimsTable";
import { RejectedConceptCard } from "@/components/RejectedConceptCard";
import { WireframeSmartInput } from "@/components/wireframes/WireframeSmartInput";
import { WireframeQuietMode } from "@/components/wireframes/WireframeQuietMode";
import { WireframeSeeBeforeYouGo } from "@/components/wireframes/WireframeSeeBeforeYouGo";
import { WireframeGapFinder } from "@/components/wireframes/WireframeGapFinder";
import { WireframeCrowdFilter } from "@/components/wireframes/WireframeCrowdFilter";
import { personas } from "@/data/personas";
import { scenarios } from "@/data/scenarios";
import { rejectedConcepts } from "@/data/rejectedConcepts";

export const metadata: Metadata = pageMetadata({
  title: "From Lo-Fi to Live: Building Move App End to End",
  description: "A UX case study on Move App - from student research and personas to prototype testing, a mid-project redesign, and a proposed live A/B study.",
  path: "/blog/building-move-app",
});

export default function BuildingMoveAppPage() {
  const SECTIONS = [
    { id: "the-problem", label: "The Problem" },
    { id: "research", label: "The Research" },
    { id: "scenarios", label: "Scenarios" },
    { id: "the-screens", label: "The Screens" },
    { id: "testing", label: "Testing" },
    { id: "redesign", label: "The Redesign" },
    { id: "whats-next", label: "Going Live" },
    { id: "lessons", label: "Lessons" },
    { id: "future", label: "The Future" },
  ];

  return (
    <BlogPostLayout slug="building-move-app" sections={SECTIONS}>
      <p>
        Ever downloaded a fitness app, filled in your goals with the best of intentions, and then never opened it
        again? You&apos;re not alone. Most of us don&apos;t skip exercise because we don&apos;t know it&apos;s good
        for us. We skip it because the <em>getting started</em> part is exhausting.
      </p>
      <p>
        That gap between knowing and doing was the exact problem my team and I set out to solve with Move App, a
        project built for the Interaction Design and Evaluation module on my MSc at the University of York. Over a
        few intense weeks, working alongside three brilliant coursemates (Haokai, Lanqing and Yechen), I went from a
        blank page to a tested, evidence-backed prototype, complete with a proposed live study to validate it in the
        real world.
      </p>
      <p>
        This post walks through all of it properly: the research, the personas, the design decisions we made
        (and the ones we deliberately didn&apos;t), the usability testing that humbled us, and the redesign that
        came out of it.
      </p>

      <h2 id="the-problem" style={{ scrollMarginTop: "24px" }}>The Real Problem: Why &ldquo;Just Go To The Gym&rdquo; Doesn&apos;t Work</h2>
      <p>
        The brief came from the University of York itself: design a mobile app to help sedentary students start
        exercising, whether that&apos;s formal activity like gym classes and sports clubs, or informal stuff like
        walking and cycling around campus.
      </p>
      <p>
        Sounds simple enough. Except it isn&apos;t, because York already has plenty of exercise options. Gyms,
        clubs, cycling routes, walking spaces, all sitting there available. The problem was never a lack of choice.
        It was everything standing between a student and actually using that choice: time pressure,
        self-consciousness, unfamiliarity with facilities, and the general mental fog that comes from trying to fit
        one more thing into an already packed week.
      </p>
      <p>So before we sketched a single screen, we went looking for evidence.</p>

      <h2 id="research" style={{ scrollMarginTop: "24px" }}>Getting Under the Skin of the Problem</h2>
      <h3>What the Research Actually Told Us</h3>
      <p>
        We ran an online questionnaire through Qualtrics, with full ethical approval from the university&apos;s
        Fast-Track process and proper informed consent built into the flow itself. We&apos;d hoped for 32 responses
        to hit the module target and ended up with 17, which, honestly, wasn&apos;t where we wanted to be. But the
        qualitative comments told such a consistent, coherent story about anxiety and avoidance that we felt
        confident building on it rather than waiting for a bigger sample we didn&apos;t have time to chase.
      </p>
      <p>Here&apos;s what stood out:</p>
      <ul>
        <li><strong>47%</strong> said lack of free time was their biggest barrier to exercise</li>
        <li><strong>18%</strong> felt self-conscious or judged exercising in public or shared spaces</li>
        <li><strong>53%</strong> wanted visual proof, like short videos or photos, before committing to a location</li>
        <li><strong>71%</strong> were happy to share their timetable data if it meant less manual planning</li>
        <li>A clear chunk of respondents actively disliked competitive or leaderboard-style features</li>
      </ul>
      <p>
        That last point mattered more than it might look at first glance. It&apos;s tempting to assume gamification
        always helps. Our data said otherwise, at least for this group.
      </p>

      <h3>Meet Liam and Maya</h3>
      <p>
        Numbers on a page don&apos;t design an interface. People do. So we turned the data into two personas to
        keep the team honest about who we were actually building for.
      </p>

      <TiltPermissionPrompt />
      <FloatingTiltToggle />
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "8px" }}>
        <PersonaCard persona={personas[0]} />
        <PersonaCard persona={personas[1]} />
      </div>

      <p>
        <strong>Liam, the Anxious Beginner</strong>, is 19, lives on campus, and knows exercise would help his
        mental health. He also avoids the Sports Centre because he&apos;s convinced everyone there will judge him
        for not knowing what he&apos;s doing. He&apos;ll walk to the entrance, glance in, and turn straight back
        around. His core need wasn&apos;t motivation. It was reassurance.
      </p>
      <p>
        <strong>Maya, the Time-Constrained Planner</strong>, is 22, in her final year, and lives off campus with a
        schedule packed tight. She&apos;s motivated to exercise but gets stuck doing what we called &ldquo;logistics
        paralysis&rdquo;: mentally calculating travel time, changeover time, and shower time for a 40-minute gap,
        deciding it&apos;s not worth the effort, and scrolling her phone instead. Her core need was cognitive
        offloading, not encouragement.
      </p>
      <p>Two very different people. Two very different design problems.</p>

      <h2 id="scenarios" style={{ color: "#00DE51", scrollMarginTop: "24px" }}>From Data to Story: Scenario Based Design</h2>
      <p>
        With personas in hand, we built two scenarios to see how these barriers actually play out in real moments,
        and how the app could intervene.
      </p>
      <p>
        For Liam, &ldquo;The Visual Assurance&rdquo; scenario showed him approaching the gym, spotting a crowd, and
        retreating home the way he always does. Then it showed the alternative: the app suggesting a quiet,
        low-traffic option with a short video preview, removing the ambiguity that triggers his anxiety in the
        first place.
      </p>
      <p>
        For Maya, &ldquo;The Smart Nudge&rdquo; scenario showed her mentally doing the maths on a two-hour gap and
        giving up. Then the alternative: the app auto-syncing with her timetable, spotting the gap for her, and
        suggesting something that fits, no arithmetic required.
      </p>

      <ScenarioCard scenario={scenarios[0]} />
      <ScenarioCard scenario={scenarios[1]} />

      <p>
        We also ran a claims analysis, borrowing from Carroll and Rosson&apos;s method, to weigh up the
        psychological trade-offs of each feature honestly. Automating the timetable sync, for instance, reduces
        cognitive load brilliantly, but it also means asking for fairly deep calendar access, which not every user
        will accept. Video previews solve the &ldquo;what does this place actually look like&rdquo; problem, but
        they raise legitimate questions about data use and the privacy of bystanders caught in frame. Naming these
        trade-offs upfront, rather than pretending every feature is a free win, felt like the more honest way to
        design.
      </p>

      <ClaimsTable />

      <h3>The Ideas We Killed Before They Shipped</h3>
      <p>
        Not every idea survives contact with the data, and I think that&apos;s actually one of the more useful
        parts of this project to talk about.
      </p>
      <p>
        We seriously considered a <strong>social leaderboard</strong> early on, on the assumption that gamification
        drives motivation. Then we looked back at our own findings: 18% of users cited feeling judged as a barrier,
        and plenty explicitly said they hated competitive sports features. Building a leaderboard would have solved
        a problem we didn&apos;t have while actively worsening the one we did. Rejected.
      </p>
      <p>
        We also explored a <strong>manual availability planner</strong>, where users would log their own free time
        slots by hand. Reasonable on paper, until you remember that 47% of our respondents were already blocked by
        a lack of time and the mental effort of planning. Adding a manual data-entry step to a product meant to
        reduce friction would have been self-defeating. Rejected too, in favour of the auto-syncing Gap Finder.
      </p>
      <p>Knowing what not to build is, in my experience, just as much a design skill as knowing what to build.</p>

      <RejectedConceptCard concept={rejectedConcepts[0]} />
      <RejectedConceptCard concept={rejectedConcepts[1]} />

      <h2 id="the-screens" style={{ scrollMarginTop: "24px" }}>The Four Screens That Actually Mattered</h2>
      <p>
        We could have sketched dozens of features. Instead, we narrowed everything down to four components that
        directly answered the barriers we&apos;d found. This is where Tog&apos;s principles of interaction design
        and Google&apos;s mobile UX guidelines earned their keep, particularly around reduction, visibility and
        giving users a sense of control.
      </p>
      <p>
        <strong>Smart Input Onboarding</strong> asked new users two things, and only two things: their preferred
        social comfort level, and whether they&apos;d sync their timetable. No lengthy setup, no wasted taps, just
        enough to personalise the experience from the first screen onwards.
      </p>
      <p>
        <strong>Quiet Mode Dashboard</strong> filtered recommendations down to low-traffic, non-competitive options
        the moment it was switched on. It leaned on Hick&apos;s Law, the idea that decision time increases with the
        number of choices in front of you. Fewer, better-matched options meant less time stuck deciding, and less
        chance of Liam bailing out before he&apos;d even started.
      </p>
      <p>
        <strong>&ldquo;See Before You Go&rdquo;</strong> gave users a short video preview and a live crowd indicator
        for any suggested location, directly answering that 53% who wanted visual proof before committing. This one
        leans on Shneiderman&apos;s principle of informative feedback: show people what&apos;s actually happening
        before you ask them to act on it.
      </p>
      <p>
        <strong>Gap Finder Scheduler</strong> automatically detected free windows in a synced timetable and slotted
        in an activity that fit, turning Maya&apos;s mental arithmetic problem into a single tap.
      </p>

      <div className="wireframes-grid" style={{ marginBottom: "8px" }}>
        <WireframeSmartInput showIntro={false} />
        <WireframeQuietMode showIntro={false} />
        <WireframeSeeBeforeYouGo showIntro={false} />
        <WireframeGapFinder showIntro={false} />
      </div>

      <h2 id="testing" style={{ scrollMarginTop: "24px" }}>Putting It In Front of Real Humans</h2>
      <p>This is the part of any project where your assumptions get tested, and mine certainly did.</p>
      <p>
        We ran task-based evaluations with eight sedentary York students, using the Concurrent Think-Aloud Protocol
        so we could hear people&apos;s reasoning as they moved through the prototype, not just watch where they
        clicked. Two tasks: customise the dashboard to avoid crowded environments, and connect a timetable to
        trigger gap detection.
      </p>

      <h3>The Spotify Moment</h3>
      <p>
        Here&apos;s the thing about designing in a room with three teammates and a lot of shared context: you stop
        noticing your own assumptions. We thought &ldquo;Quiet Mode&rdquo; was an obvious label. It clearly meant
        filtering out crowded, competitive environments. Right?
      </p>
      <p>
        Wrong. Participant after participant read that toggle as a <em>system audio control</em>. One put it best
        during testing:
      </p>

      <BlogQuote>&ldquo;Will this turn off my Spotify? I don&apos;t want silence, I just want to avoid people.&rdquo;</BlogQuote>

      <p>
        That&apos;s a severity 3 issue by any measure. The one feature built specifically to protect anxious users
        like Liam was the one nobody trusted enough to touch, because they thought it might mute their music
        mid-workout.
      </p>

      <h3>A Smaller, Quieter Issue</h3>
      <p>
        A second, less severe issue also came up: after tapping &ldquo;Connect Timetable,&rdquo; several
        participants weren&apos;t sure anything had actually happened. No confirmation, no visible change, just
        silence and a bit of doubt. It didn&apos;t block the task outright, but it chipped away at confidence in
        the system, which matters more than it sounds when you&apos;re trying to build trust with an anxious user
        base.
      </p>

      <h2 id="redesign" style={{ scrollMarginTop: "24px" }}>The Redesign: From &ldquo;Quiet Mode&rdquo; to &ldquo;Crowd Filter&rdquo;</h2>
      <p>
        Given the severity and the fact that this feature sat right at the heart of our value proposition for Liam,
        the fix wasn&apos;t optional.
      </p>
      <p>
        We renamed the toggle to <strong>Crowd Filter</strong> and replaced the ambiguous on/off switch with a
        segmented control labelled &ldquo;Social&rdquo; and &ldquo;Solo&rdquo;, language that describes what the
        feature actually does rather than what it&apos;s called internally. We also added an immediate toast
        notification confirming that busy locations were being hidden, closing the feedback gap that had left
        users second-guessing themselves.
      </p>
      <p>Small change on paper. But it&apos;s the difference between a feature people trust and one they quietly avoid.</p>

      <div style={{ display: "flex", flexDirection: "column", marginBottom: "8px" }}>
        <div style={{ marginBottom: "12px" }}>
          <WireframeQuietMode showIntro={false} />
        </div>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textAlign: "center", marginBottom: "36px" }}>
          <strong style={{ color: "#fff" }}>A - Control:</strong> the original, ambiguous toggle
        </p>
        <div style={{ marginBottom: "12px" }}>
          <WireframeCrowdFilter showIntro={false} />
        </div>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
          <strong style={{ color: "#fff" }}>B - Treatment:</strong> Crowd Filter with explicit feedback
        </p>
      </div>

      <h2 id="whats-next" style={{ scrollMarginTop: "24px" }}>What&apos;s Next: Taking It Properly Live</h2>
      <p>
        A lab test with eight participants tells you a lot, but it can&apos;t tell you whether a redesign actually
        changes behaviour at scale. So the final piece of this project was proposing an online A/B study to find
        out, properly, once the app is live.
      </p>
      <p>
        The plan: randomly assign users at the ID level to either the original ambiguous toggle or the redesigned
        Crowd Filter, keeping each user on the same variant throughout to avoid contamination. Rather than tracking
        something shallow like feature taps, the primary success metric (the Overall Evaluation Criterion) would be
        the average number of exercise sessions completed per user per week. That&apos;s the number that actually
        reflects whether we&apos;ve closed the intention-action gap, not just whether people fiddled with a toggle.
      </p>
      <p>
        Running a power analysis with a minimum detectable effect of 0.5 and a variance of 2.019 gave us a required
        sample of 128 users per variant, 256 in total. At an estimated 100 daily active users, that&apos;s
        technically achievable in three days, but we recommended running the study over a full week regardless, to
        smooth out the natural difference between a Tuesday lecture gap and a lazy Sunday.
      </p>
      <p>
        It&apos;s a proposal rather than a result. But it&apos;s a properly powered, ethically considered plan
        sitting ready to go the moment this moves from prototype to production.
      </p>

      <h2 id="lessons" style={{ scrollMarginTop: "24px" }}>What This Project Taught Me</h2>
      <p>A few things stuck with me well beyond the submission deadline.</p>
      <p>
        Research participants will always surprise you, and that&apos;s a good thing. The Spotify moment
        wasn&apos;t an embarrassing failure, it was the single most useful piece of feedback we got, because it
        exposed a gap between our mental model and our users&apos; that no amount of internal review would have
        caught.
      </p>
      <p>
        Rejecting ideas is design work too. The leaderboard and the manual planner both felt reasonable in
        isolation. It was only by holding them against our actual evidence that we could see they&apos;d work
        against the people we were designing for.
      </p>
      <p>
        And small labels carry a surprising amount of weight. &ldquo;Quiet Mode&rdquo; versus &ldquo;Crowd
        Filter&rdquo; is barely a wording change on the surface, yet it was the difference between a core feature
        people trusted and one they were scared to touch.
      </p>

      <h2 id="future" style={{ scrollMarginTop: "24px" }}>Where This Goes From Here</h2>
      <p>
        Move App started as a module brief and turned into one of the projects I&apos;m proudest to talk through in
        detail, precisely because it didn&apos;t go smoothly the first time. The messy bit, watching a
        well-intentioned feature confuse real people, then fixing it with evidence rather than guesswork, is the
        part worth showing.
      </p>
      <p>
        If you&apos;d like to see the fuller prototype walkthrough or talk through any part of the process, from
        the research design to the claims analysis, drop me a message via the Contact section. Always happy to talk
        shop.
      </p>
    </BlogPostLayout>
  );
}
