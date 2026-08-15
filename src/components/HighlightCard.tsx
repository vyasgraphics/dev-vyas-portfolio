"use client";

import { useEffect, useRef } from "react";

// Drifting particle field plus a cursor-following glow, ported from a
// Tailwind/shadcn reference component to this site's plain-CSS conventions
// (see the .vg-cta-* block in styles.css).
//
// The reference split this into HighlightGroup + HighlighterItem so a grid of
// cards could share one mouse listener. There is one card here, so that split
// would be indirection with nothing on the other end of it - the glow and the
// canvas live together in this one component instead.
//
// Four things were changed rather than copied, all of them things that would
// have caused real problems on this page:
//
// 1. The reference tracks the cursor in React state (`useMousePosition`),
//    which re-renders the whole subtree on every single mousemove event. Here
//    the handler writes two CSS custom properties straight to the DOM and
//    never touches React at all.
// 2. Its animation loop is `window.requestAnimationFrame(animate)` with no
//    stored id and no cleanup, so the canvas keeps running for the life of the
//    page - including while scrolled far out of view, and after unmount. This
//    one stores the id, cancels on unmount, and only runs while on screen.
//    That matters more than usual here: the homepage already has the welcome
//    screen's WebGL canvas, and two uncapped animation loops would fight for
//    the same frame budget on mobile.
// 3. Its recycle path calls `circles.splice(i, 1)` inside a forEach over that
//    same array, which shifts every later element down an index and silently
//    skips one particle per removal. Particles are reset in place here.
// 4. `devicePixelRatio` is read at module scope in the reference, which throws
//    during server rendering. It is read inside the effect here.

type Props = {
    children: React.ReactNode;
    /** Particle count on desktop. Halved automatically on phones. */
    quantity?: number;
    className?: string;
    /** Exposes the outer card element, for the caller's own scroll effects. */
    cardRef?: React.RefObject<HTMLDivElement | null>;
};

type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
};

export function HighlightCard({ children, quantity = 90, className = "", cardRef: externalRef }: Props) {
    const localRef = useRef<HTMLDivElement>(null);
    const cardRef = externalRef ?? localRef;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Cursor-following glow. Pointer coordinates and getBoundingClientRect are
    // both viewport-relative, so subtracting one from the other stays correct
    // at any scroll position without listening to scroll at all.
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Touch devices have no hovering cursor to follow - a glow driven by
        // tap position would just flash somewhere unrelated and stay there.
        const canHover = window.matchMedia("(hover: hover)").matches;
        if (!canHover) return;

        const onPointerMove = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        };

        card.addEventListener("pointermove", onPointerMove);
        return () => card.removeEventListener("pointermove", onPointerMove);
        // cardRef is either the caller's ref object or this component's own -
        // stable either way, so listing it re-runs nothing in practice.
    }, [cardRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const card = cardRef.current;
        if (!canvas || !card) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const count = window.innerWidth < 768 ? Math.round(quantity / 2) : quantity;

        let width = 0;
        let height = 0;
        let circles: Circle[] = [];
        let frame = 0;
        let running = false;
        const mouse = { x: 0, y: 0 };

        const makeCircle = (): Circle => ({
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
            translateX: 0,
            translateY: 0,
            size: Math.floor(Math.random() * 2) + 1,
            alpha: 0,
            targetAlpha: parseFloat((Math.random() * 0.3 + 0.1).toFixed(1)),
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            magnetism: 0.1 + Math.random() * 4,
        });

        const resize = () => {
            width = card.offsetWidth;
            height = card.offsetHeight;
            if (!width || !height) return;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            circles = Array.from({ length: count }, makeCircle);
        };

        const drawCircle = (c: Circle) => {
            ctx.save();
            ctx.translate(c.translateX, c.translateY);
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
            // --primary at low alpha, rather than the reference's neutral grey,
            // so the field belongs to this site's palette.
            ctx.fillStyle = `rgba(0, 222, 81, ${c.alpha})`;
            ctx.fill();
            ctx.restore();
        };

        const step = () => {
            ctx.clearRect(0, 0, width, height);

            for (const c of circles) {
                // Fade in from every edge, so particles do not pop into
                // existence at the border.
                const edge = Math.min(
                    c.x + c.translateX - c.size,
                    width - c.x - c.translateX - c.size,
                    c.y + c.translateY - c.size,
                    height - c.y - c.translateY - c.size
                );
                const nearEdge = Math.max(0, Math.min(1, edge / 20));
                if (nearEdge > 0.99) {
                    c.alpha = Math.min(c.alpha + 0.02, c.targetAlpha);
                } else {
                    c.alpha = c.targetAlpha * nearEdge;
                }

                c.x += c.dx;
                // Slow upward drift, matching the reference's vy of -0.2.
                c.y += c.dy - 0.2;
                c.translateX += (mouse.x / (50 / c.magnetism) - c.translateX) / 50;
                c.translateY += (mouse.y / (50 / c.magnetism) - c.translateY) / 50;

                const gone =
                    c.x < -c.size ||
                    c.x > width + c.size ||
                    c.y < -c.size ||
                    c.y > height + c.size;

                if (gone) {
                    // Reset in place. The reference spliced the array while
                    // iterating it, which skipped a particle every time.
                    Object.assign(c, makeCircle());
                    // Re-enter from the bottom edge, since the drift is upward.
                    c.y = height + c.size;
                }

                drawCircle(c);
            }

            frame = requestAnimationFrame(step);
        };

        const start = () => {
            if (running || reduceMotion) return;
            running = true;
            frame = requestAnimationFrame(step);
        };
        const stop = () => {
            if (!running) return;
            running = false;
            cancelAnimationFrame(frame);
        };

        const onPointerMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - width / 2;
            const y = e.clientY - rect.top - height / 2;
            if (Math.abs(x) < width / 2 && Math.abs(y) < height / 2) {
                mouse.x = x;
                mouse.y = y;
            }
        };

        resize();
        if (reduceMotion) {
            // One static frame: the field is present, it just never moves.
            circles.forEach((c) => {
                c.alpha = c.targetAlpha;
                drawCircle(c);
            });
        } else {
            start();
        }

        // The observer owns "is this on screen", and onVisibility reads that
        // flag rather than re-deriving it from a bounding rect. A rect check
        // of the form `top < innerHeight` is true for anything scrolled PAST
        // as well (its top is negative), so returning to the tab from further
        // down the page would silently restart the loop for a card nowhere
        // near the viewport.
        let onScreen = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                onScreen = entry.isIntersecting;
                if (onScreen && !document.hidden) start();
                else stop();
            },
            { threshold: 0 }
        );
        observer.observe(card);

        const onVisibility = () => {
            if (document.hidden) stop();
            else if (onScreen) start();
        };
        const onResize = () => {
            resize();
            // Assigning canvas.width empties the buffer, so a resize landing
            // while the loop is stopped would leave the card blank.
            if (!running) circles.forEach(drawCircle);
        };

        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("resize", onResize);
        window.addEventListener("pointermove", onPointerMove);

        return () => {
            stop();
            observer.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onPointerMove);
        };
    }, [quantity, cardRef]);

    return (
        <div ref={cardRef} className={`vg-cta-card${className ? ` ${className}` : ""}`}>
            <canvas ref={canvasRef} className="vg-cta-particles" aria-hidden="true" />
            <div className="vg-cta-inner">{children}</div>
        </div>
    );
}
