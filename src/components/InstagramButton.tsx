"use client";

// Adapted from a reference "expanding circle" button: a circular Instagram-
// gradient icon that widens into a pill on hover, revealing a text label
// in place of the icon. Kept the Instagram brand gradient exactly as given
// (orange -> red -> pink -> purple) rather than recolouring it to the
// site's green - unlike a generic UI control, the gradient itself is what
// visually reads as "Instagram" here, so swapping it out would work against
// the point of using this particular reference. The reveal text uses the
// actual handle (@vyas.graphics) rather than the reference's generic
// "Instagram" label, so hovering tells you exactly where the link goes.
//
// Press feedback: layered the site's standard tactile system on top (the
// same scale-down + dark ambient/inset shadow used everywhere else, no
// white rim - see the button press-feedback fix elsewhere in the
// stylesheet) rather than leaving this one control silent on tap, since it
// coexists with the reference's own hover-driven width/shape change
// without conflicting (transform composes cleanly with width/border-radius
// transitions).
export function InstagramButton({ handle, href }: { handle: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${handle} on Instagram`}
      className="vg-ig-btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512" className="vg-ig-icon">
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
      <span className="vg-ig-text">{handle}</span>

      <style>{`
        .vg-ig-btn {
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition-duration: 0.4s;
          cursor: pointer;
          position: relative;
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          overflow: hidden;
          text-decoration: none;
        }
        .vg-ig-icon { transition-duration: 0.3s; }
        .vg-ig-icon path { fill: #fff; }
        .vg-ig-text {
          position: absolute;
          color: #fff;
          white-space: nowrap;
          font-size: 13px;
          font-weight: 700;
          opacity: 0;
          transition-duration: 0.4s;
        }
        @media (hover: hover) {
          .vg-ig-btn:hover {
            width: 168px;
            border-radius: 30px;
          }
          .vg-ig-btn:hover .vg-ig-text { opacity: 1; }
          .vg-ig-btn:hover .vg-ig-icon { opacity: 0; }
        }
        .vg-ig-btn:active {
          transform: scale(0.93);
          box-shadow: 0 2px 8px -2px rgba(0,0,0,0.4), inset 0 1px 6px rgba(0,0,0,0.3);
        }
        @media (prefers-reduced-motion: reduce) {
          .vg-ig-btn, .vg-ig-icon, .vg-ig-text { transition: none !important; }
        }
      `}</style>
    </a>
  );
}
