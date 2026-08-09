// Replaces a plain bordered paragraph-and-bullet-list box with a small
// sequence of "notification" cards - adapted from a reference glow-card
// design (dark card, a coloured accent bar down the left edge, a soft
// radial glow that brightens on hover). The reference used the site's own
// blue; recoloured to the portfolio's green throughout (the accent bar
// gradient and the title colour), and restructured for this specific
// story: since the whole point of the anecdote is "a LinkedIn comment (a
// notification) changed the outcome", telling it as a short sequence of
// notification-style cards is a more literal, memorable fit than a plain
// callout box - one card per beat (the comment itself, the fix, the
// outcome) rather than a paragraph followed by a bullet list repeating the
// same three facts.
//
// Pure CSS hover/active states, no JS needed, so this stays a plain
// (non-"use client") component.
export function NotificationStory({
  intro,
  beats,
}: {
  intro: string;
  beats: { title: string; body: string }[];
}) {
  return (
    <div className="vg-notif-story">
      <p className="vg-notif-intro">{intro}</p>
      <div className="vg-notif-grid">
        {beats.map((b) => (
          <div key={b.title} className="vg-notif-card">
            <span className="vg-notif-glow" aria-hidden />
            <span className="vg-notif-borderglow" aria-hidden />
            <span className="vg-notif-accent" aria-hidden />
            <h4 className="vg-notif-title">{b.title}</h4>
            <p className="vg-notif-body">{b.body}</p>
          </div>
        ))}
      </div>

      <style>{`
        .vg-notif-intro {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.75);
          margin-bottom: 18px;
          max-width: 780px;
        }
        .vg-notif-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .vg-notif-card {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          min-height: 136px;
          padding: 18px 18px 18px 26px;
          background: #202226;
          border-radius: 16px;
          overflow: hidden;
        }
        /* Inner fill, inset by 1px - the same two-layer trick as the
           reference: a slightly lighter outer rim (the card's own
           background) with a darker inset fill on top, giving a hairline
           border without an actual border property fighting the glow
           layers underneath it. */
        .vg-notif-card::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 15px;
          background: #141518;
          z-index: 0;
        }
        .vg-notif-accent {
          position: absolute;
          width: 4px;
          inset: 16px auto 16px 10px;
          border-radius: 2px;
          background: linear-gradient(to bottom, #6dffa0, #00de51, #00a83d);
          transition: transform 0.3s ease;
          z-index: 2;
        }
        .vg-notif-title {
          position: relative;
          z-index: 3;
          color: #00de51;
          font-size: 14.5px;
          font-weight: 700;
          transition: transform 0.3s ease;
        }
        .vg-notif-body {
          position: relative;
          z-index: 3;
          color: rgba(255,255,255,0.62);
          font-size: 13px;
          line-height: 1.55;
          transition: transform 0.3s ease;
        }
        .vg-notif-glow,
        .vg-notif-borderglow {
          position: absolute;
          top: 30%;
          left: 50%;
          width: 20rem;
          height: 20rem;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle closest-side at center, #fff, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .vg-notif-glow { z-index: 1; }
        .vg-notif-borderglow { z-index: -1; }

        @media (hover: hover) {
          .vg-notif-card:hover .vg-notif-accent { transform: translateX(3px); }
          .vg-notif-card:hover .vg-notif-title,
          .vg-notif-card:hover .vg-notif-body { transform: translateX(4px); }
          .vg-notif-card:hover .vg-notif-glow,
          .vg-notif-card:hover .vg-notif-borderglow { opacity: 0.09; }
        }

        @media (max-width: 767px) {
          .vg-notif-grid { grid-template-columns: 1fr; }
          .vg-notif-card { min-height: 0; padding: 16px 16px 16px 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vg-notif-accent, .vg-notif-title, .vg-notif-body, .vg-notif-glow, .vg-notif-borderglow {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
