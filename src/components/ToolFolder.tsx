"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

/**
 * One tool category as a glass folder with its tools fanned out of the top.
 *
 * Ported from an "Icon Folder" reference Dev supplied (Tailwind, a fixed
 * 420x286 card, its own brand-logo tiles). Changes so it fits this site:
 *
 * - No Tailwind here: everything is plain CSS under .vg-folder-* in
 *   styles.css (CSS-only, nothing to mirror in the SCSS).
 * - Sized from its own width, not fixed. The tile size, the fan spread and
 *   where the glass pocket starts are all derived from the measured width,
 *   so a five-tool category fans out cleanly on a 320px phone as well as on
 *   desktop, and the open state never pushes a tile past the folder's edge.
 * - The pocket grows with its content instead of a fixed 180px, so long
 *   category names and two rows of tool chips never collide with the corner
 *   pill. Cards in one grid row stretch to the same height.
 * - Colours follow the Forest Shadow theme: green-tinted dark glass, the
 *   site green (--primary) for the glow, the pocket's lit edge when open,
 *   the highlighted chip and the index number.
 * - Not a button. On a pointer device the fan is decoration on hover (the
 *   title and the tool list are always readable without it), so announcing
 *   the card as a control would mislead a screen reader. Touch devices have
 *   no hover, so a tap opens it there, a tap on a tile while open names that
 *   tool, and a tap anywhere else closes it. Same pattern the previous
 *   illumine cards used.
 * - Hovering a chip raises its tile too, not just the other way round.
 */

export type FolderTool = { name: string; image: string };

const EASE = "cubic-bezier(.2,.8,.2,1)";

// Folder outlines: the front pocket has its tab on the left, the back plate
// on the right. Drawn to the real measured size so the tab curve never
// stretches.
const pathL = (w: number, h: number, r: number, d: number, tw: number, s: number) =>
    `M0 ${r}A${r} ${r} 0 0 1 ${r} 0L${tw} 0C${tw + s * 0.55} 0 ${tw + s * 0.45} ${d} ${tw + s} ${d}L${w - r} ${d}A${r} ${r} 0 0 1 ${w} ${d + r}L${w} ${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}L${r} ${h}A${r} ${r} 0 0 1 0 ${h - r}Z`;
const pathR = (w: number, h: number, r: number, d: number, tw: number, s: number) => {
    const x = w - tw;
    return `M0 ${d + r}A${r} ${r} 0 0 1 ${r} ${d}L${x - s} ${d}C${x - s * 0.45} ${d} ${x - s * 0.55} 0 ${x} 0L${w - r} 0A${r} ${r} 0 0 1 ${w} ${r}L${w} ${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}L${r} ${h}A${r} ${r} 0 0 1 0 ${h - r}Z`;
};

function useMedia(query: string, serverValue = false) {
    return useSyncExternalStore(
        (onChange) => {
            const mq = window.matchMedia(query);
            mq.addEventListener("change", onChange);
            return () => mq.removeEventListener("change", onChange);
        },
        () => window.matchMedia(query).matches,
        () => serverValue
    );
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const pad2 = (n: number) => (n < 10 ? "0" : "") + n;

type Geo = { w: number; tile: number; spread: number; top: number };

// Tile size and spread from the folder's width. The open state widens the
// gap by 15%, so the spread is capped so that the widest fan still leaves a
// margin either side.
function geometry(w: number, n: number): Geo {
    const tile = Math.round(clamp(w * 0.25, 66, 96));
    const ideal = tile * 0.72;
    const room = n > 1 ? (w - tile - 28) / ((n - 1) * 1.15) : ideal;
    return { w, tile, spread: Math.min(ideal, room), top: Math.round(tile * 0.42) };
}

export function ToolFolder({
    title,
    tools,
    index,
    total,
}: {
    title: string;
    tools: FolderTool[];
    index: number;
    total: number;
}) {
    const n = tools.length;
    const rootRef = useRef<HTMLDivElement | null>(null);
    const frontRef = useRef<HTMLDivElement | null>(null);
    const backRef = useRef<HTMLDivElement | null>(null);

    // Server render uses the desktop geometry; the first measurement
    // replaces it before the folder has been revealed, so nothing visible
    // jumps.
    const [geo, setGeo] = useState<Geo>(() => geometry(380, n));
    const [frontD, setFrontD] = useState("");
    const [backD, setBackD] = useState("");
    const [shown, setShown] = useState(false);
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [hi, setHi] = useState<number | null>(null);
    // The server cannot know either, so it renders the pointer, full-motion
    // version and the client corrects it straight after hydration, with no
    // mismatch. Both also follow the setting if it changes mid-visit.
    const reduced = useMedia("(prefers-reduced-motion: reduce)");
    const isTouch = !useMedia("(hover: hover)", true);

    useEffect(() => {
        const root = rootRef.current;
        const front = frontRef.current;
        const back = backRef.current;
        if (!root || !front || !back) return;
        const ro = new ResizeObserver(() => {
            setGeo(geometry(root.offsetWidth, n));
            const fw = front.offsetWidth;
            const fh = front.offsetHeight;
            const bw = back.offsetWidth;
            const bh = back.offsetHeight;
            const s = clamp(fw * 0.12, 34, 46);
            setFrontD(pathL(fw, fh, 22, 22, Math.round(fw * 0.42), s));
            setBackD(pathR(bw, bh, 22, 22, Math.round(bw * 0.4), s));
        });
        ro.observe(root);
        ro.observe(front);
        return () => ro.disconnect();
    }, [n]);

    // Pops in once, the first time it is properly on screen.
    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setShown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.25 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Only a tap ever sets `open` (a mouse uses hover), so while one is
    // open, a tap anywhere outside closes it, and folders a visitor has
    // prodded do not all stay open for the rest of the visit.
    useEffect(() => {
        if (!open) return;
        const onDoc = (e: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
                setHi(null);
            }
        };
        document.addEventListener("pointerdown", onDoc);
        return () => document.removeEventListener("pointerdown", onDoc);
    }, [open]);

    // Decided by the input that actually made the tap, not by the hover
    // media query: touchscreen laptops and iPads with a trackpad report
    // (hover: hover), so a finger tap on those would otherwise do nothing.
    // A mouse click is ignored on a hover device, since hover already opened
    // the folder; on a device with no hover at all, every click is a tap.
    const lastPointer = useRef("mouse");
    const onTap = (e: React.MouseEvent<HTMLDivElement>) => {
        if (lastPointer.current === "mouse" && !isTouch) return;
        const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-tile]");
        if (open && tile) {
            const i = Number(tile.dataset.tile);
            setHi((h) => (h === i ? null : i));
            return;
        }
        setOpen((o) => !o);
        setHi(null);
    };

    const live = shown || reduced;
    const wide = open || hover;
    const rs = n > 1 ? 24 / (n - 1) : 0;
    const motion = (css: string) => (reduced ? "none" : css);

    const rootStyle = {
        "--vg-folder-tile": `${geo.tile}px`,
        "--vg-folder-icons-top": `${geo.top}px`,
        "--vg-folder-front-top": `${Math.round(geo.top + geo.tile * 0.72)}px`,
        opacity: live ? 1 : 0,
        transform: live ? (wide ? "translate3d(0,-6px,0) scale(1.015)" : "none") : "translate3d(0,34px,0) scale(.94)",
        transition: motion(`transform .9s ${EASE}, opacity .6s ease`),
        transitionDelay: shown && !wide && !reduced ? `${(index % 2) * 0.08}s` : "0s",
    } as CSSProperties;

    return (
        <div
            ref={rootRef}
            className={`vg-folder${wide ? " is-open" : ""}${isTouch ? " is-touch" : ""}`}
            style={rootStyle}
            onClick={onTap}
            onPointerDown={(e) => {
                lastPointer.current = e.pointerType;
            }}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
            onPointerLeave={(e) => {
                if (e.pointerType !== "mouse") return;
                setHover(false);
                setHi(null);
            }}
        >
            <div className="vg-folder-glow" aria-hidden="true" />

            <div
                ref={backRef}
                className="vg-folder-back"
                style={{ clipPath: backD ? `path('${backD}')` : undefined }}
                aria-hidden="true"
            >
                <svg className="vg-folder-edge">
                    <path d={backD} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="2" />
                </svg>
            </div>

            <div className="vg-folder-fan" aria-hidden="true">
                {tools.map((tool, i) => {
                    const k = i - (n - 1) / 2;
                    const gap = wide ? geo.spread * 1.15 : geo.spread;
                    const y = k * k * (geo.tile * 0.085) - (wide ? geo.tile * 0.14 : 0);
                    const rot = k * rs * (wide ? 1.2 : 1);
                    const active = hi === i;
                    return (
                        <div
                            key={tool.name}
                            className="vg-folder-slot"
                            style={{
                                zIndex: active ? 5 : undefined,
                                opacity: live ? 1 : 0,
                                transform: live
                                    ? `translate3d(${(k * gap).toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`
                                    : `translate3d(${(k * geo.spread * 0.6).toFixed(2)}px, ${geo.tile * 0.8}px, 0)`,
                                transition: motion(`transform ${wide ? 0.6 : 0.9}s ${EASE}, opacity .5s ease`),
                                transitionDelay: reduced
                                    ? "0s"
                                    : wide
                                      ? `${i * 0.04}s`
                                      : `${0.3 + (index % 2) * 0.08 + i * 0.07}s`,
                            }}
                        >
                            <div
                                className="vg-folder-tile"
                                data-tile={i}
                                onPointerEnter={(e) => e.pointerType === "mouse" && setHi(i)}
                                onPointerLeave={(e) => e.pointerType === "mouse" && setHi((h) => (h === i ? null : h))}
                                style={{
                                    transform: active
                                        ? `translate3d(0,${-Math.round(geo.tile * 0.26)}px,0) rotate(${(-rot).toFixed(2)}deg) scale(1.1)`
                                        : hi !== null
                                          ? "scale(.96)"
                                          : "none",
                                    filter: hi !== null && !active ? "saturate(.7) brightness(.8)" : "none",
                                    transition: motion(`transform .45s ${EASE}, filter .3s ease`),
                                }}
                            >
                                <span className="vg-folder-tile-face">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={tool.image} alt="" draggable={false} loading="lazy" />
                                </span>
                                <span
                                    className="vg-folder-label"
                                    style={{
                                        opacity: active ? 1 : 0,
                                        transform: `translate3d(-50%,${active ? 0 : 6}px,0)`,
                                        transition: motion(`opacity .25s ease, transform .35s ${EASE}`),
                                    }}
                                >
                                    {tool.name}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                ref={frontRef}
                className="vg-folder-front"
                style={{ clipPath: frontD ? `path('${frontD}')` : undefined }}
            >
                <svg className="vg-folder-edge" aria-hidden="true">
                    <defs>
                        <linearGradient id={`vg-folder-edge-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" className="vg-folder-stop-a" />
                            <stop offset=".35" className="vg-folder-stop-b" />
                            <stop offset="1" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>
                    <path d={frontD} fill="none" stroke={`url(#vg-folder-edge-${index})`} strokeWidth="2" />
                </svg>

                <h3 className="vg-folder-title">{title}</h3>
                <ul className="vg-folder-chips">
                    {tools.map((tool, i) => (
                        <li
                            key={tool.name}
                            className={hi === i ? "is-hi" : undefined}
                            onPointerEnter={(e) => e.pointerType === "mouse" && setHi(i)}
                            onPointerLeave={(e) => e.pointerType === "mouse" && setHi((h) => (h === i ? null : h))}
                        >
                            {tool.name}
                        </li>
                    ))}
                </ul>

                <div className="vg-folder-foot" aria-hidden="true">
                    <span className="vg-folder-index">
                        {pad2(index + 1)}
                        <span> / {pad2(total)}</span>
                    </span>
                    <span className="vg-folder-pill">
                        {tools.map((tool) => (
                            <span key={tool.name} className="vg-folder-pill-tile">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={tool.image} alt="" loading="lazy" />
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    );
}
