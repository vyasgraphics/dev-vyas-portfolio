"use client";

import { useEffect, useRef, useState, CSSProperties, Children, cloneElement, isValidElement } from "react";
import Marquee from "react-fast-marquee";
type Direction = "left" | "right" | "up" | "down";

type AutoRepeatMarqueeProps = {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  gap?: number;
  direction?: Direction;
  className?: string;
  repeat?: number;
};

// react-fast-marquee wraps each item passed to it in its own ".rfm-child"
// container, with no gap or margin between them by default - fine for a
// single set of children, but this component renders several separate
// "repeat" copies (see below) to guarantee enough content for a seamless
// loop, and each copy becomes its own such wrapper. A flexbox `gap` on the
// div wrapping each copy only ever applies to items *within* that one
// div, so the seam between one copy and the next had no spacing at all -
// producing a visibly smaller gap there than everywhere else, once every
// `children.length` items. Applying the gap as a trailing margin on each
// individual item instead, rather than as a `gap` on the wrapping div,
// keeps the spacing constant everywhere, including at those seams,
// regardless of how the underlying library chunks things up.
function withTrailingMargin(children: React.ReactNode, gap: number) {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const existing = (child.props as { style?: CSSProperties }).style ?? {};
    return cloneElement(child as React.ReactElement<{ style?: CSSProperties }>, {
      style: { ...existing, marginRight: gap },
    });
  });
}

export default function AutoRepeatMarquee({
  children,
  speed = 50,
  pauseOnHover = true,
  gap = 40,
  direction = "left",
  className,
  repeat,
}: AutoRepeatMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(() => repeat || 1);

  const childrenCount = Array.isArray(children) ? children.length : 1;

  useEffect(() => {
    if ((direction === "left" || direction === "right") && !repeat) {
      const updateRepeatCount = () => {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const contentWidth = contentRef.current?.scrollWidth || 0;

        if (containerWidth && contentWidth) {
          const neededRepeat = Math.ceil(containerWidth / contentWidth) + 1;
          setRepeatCount(neededRepeat);
        }
      };

      updateRepeatCount();
      const resizeObserver = new ResizeObserver(updateRepeatCount);
      if (containerRef.current) resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    } else if (repeat) {
      // repeat is fixed - handled by lazy useState initialiser above
    }
  }, [childrenCount, direction, repeat]);

  if (direction === "left" || direction === "right") {
    return (
      <div ref={containerRef} className={className}>
        <Marquee
          speed={speed}
          pauseOnHover={pauseOnHover}
          gradient={false}
          direction={direction}
          // autoFill ensures the marquee always fills the container width
          // regardless of how many items are in the list - critical for
          // mobile where container width measurement can lag on first render
          autoFill={true}
        >
          {Array.from({ length: repeatCount }).map((_, i) => (
            <div
              key={i}
              ref={i === 0 ? contentRef : null}
              style={{ display: "flex" }}
            >
              {withTrailingMargin(children, gap)}
            </div>
          ))}
        </Marquee>
      </div>
    );
  }

  // Custom vertical scrolling for "up" or "down"
  const verticalStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    animation: `scroll-${direction} ${10 / (speed / 50)}s linear infinite`,
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: "hidden",
        height: "100%",
      }}
    >
      <div style={verticalStyle}>
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div key={i} style={{ marginBottom: gap }}>
            {children}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-up {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
      `}</style>
    </div>
  );
}
