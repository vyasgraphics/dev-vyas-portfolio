// Progress for the blur-and-fade "materialize" effect, shared by
// useSectionMaterialize (homepage sections), WorkCta (the CTA card) and
// ScrollReveal (case study sections), so all three behave identically.
//
// The effect used to be driven by the element's TOP edge only, travelling
// from 88% to 48% of the viewport. That works for content arriving from the
// bottom of the screen (scrolling down), but content arriving from the TOP
// (scrolling up) has its top edge above the viewport the whole time, so it
// came in already sharp, and the only blur on the way up was content
// blurring out as it left at the bottom.
//
// Each element now remembers which edge it last arrived from. Once it has
// been fully below the viewport, it materialises on its top edge exactly as
// before. Once it has been fully above, it materialises on its BOTTOM edge,
// travelling from 12% to 52%: the mirror image. Either way, content leaving
// the screen stays sharp, which is how scrolling down already behaved.
//
// Live getBoundingClientRect() on every call (never offsetTop or cached
// ScrollTrigger positions), as CLAUDE.md requires for scroll maths here.

export type MaterializeState = { fromTop: boolean };

const RANGE = 0.4; // 40% of the viewport, the same travel as 88% to 48%

export function materializeProgress(
    rect: DOMRect,
    vh: number,
    state: MaterializeState,
    // false for an element that is position: sticky (the Work counter):
    // stuck near the top, its bottom edge never travels down the screen, so
    // the bottom-edge mode would leave it blurred for as long as it is stuck.
    bothEdges = true
): number {
    if (rect.top >= vh) state.fromTop = false;
    else if (bothEdges && rect.bottom <= 0) state.fromTop = true;

    let p: number;
    if (state.fromTop) {
        // Where the bottom edge finishes. Normally 52% of the viewport, but an
        // element near the very top of the page can never get that far down
        // (the page cannot scroll above 0), so it finishes wherever its
        // bottom sits at scroll 0 instead of being left part-blurred there.
        const end = Math.min(vh * (1 - 0.48), rect.bottom + window.scrollY);
        p = (rect.bottom - (end - vh * RANGE)) / (vh * RANGE);
    } else {
        p = (vh * 0.88 - rect.top) / (vh * RANGE);
    }
    return p < 0 ? 0 : p > 1 ? 1 : p;
}
