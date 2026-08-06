"use client";

import { useEffect } from "react";

export function useHeadlineRotate() {
  useEffect(() => {
    const animationDelay = 2500;
    const revealDuration = 600;
    const revealAnimationDelay = 1500;

    const headlines = document.querySelectorAll<HTMLElement>(".animationtext");
    if (!headlines.length) return;

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const wrappers: Array<{ el: HTMLElement; initialWidth: string }> = [];
    // Checked inside the rAF loop and at the top of hideWord/showWord so
    // the whole self-perpetuating animation chain (animateWidth -> done ->
    // hideWord/showWord -> setTimeout -> animateWidth -> ...) actually
    // stops on unmount, rather than just the next-scheduled timer.
    let cancelled = false;

    const animateWidth = (el: HTMLElement, target: number, duration: number, done?: () => void) => {
      const start = performance.now();
      const from = el.getBoundingClientRect().width;
      const step = (t: number) => {
        if (cancelled) return;
        const p = Math.min(1, (t - start) / duration);
        const ease = 1 - Math.pow(1 - p, 3);
        el.style.width = from + (target - from) * ease + "px";
        if (p < 1) requestAnimationFrame(step);
        else done?.();
      };
      requestAnimationFrame(step);
    };

    const switchWord = (oldWord: Element, newWord: Element) => {
      oldWord.classList.remove("is-visible");
      oldWord.classList.add("is-hidden");
      newWord.classList.remove("is-hidden");
      newWord.classList.add("is-visible");
    };

    const takeNext = (word: Element): Element => {
      if (word.nextElementSibling) return word.nextElementSibling;
      return word.parentElement!.firstElementChild!;
    };

    const hideWord = (word: Element) => {
      if (cancelled) return;
      const next = takeNext(word);
      const headline = word.closest(".animationtext");
      if (!headline) return;
      if (headline.classList.contains("clip")) {
        const wrapper = word.closest<HTMLElement>(".cd-words-wrapper");
        if (!wrapper) return;
        animateWidth(wrapper, 2, revealDuration, () => {
          if (cancelled) return;
          switchWord(word, next);
          showWord(next as HTMLElement);
        });
      } else {
        switchWord(word, next);
        timers.push(setTimeout(() => hideWord(next), animationDelay));
      }
    };

    const showWord = (word: HTMLElement) => {
      if (cancelled) return;
      const headline = word.closest(".animationtext");
      if (!headline) return;
      if (headline.classList.contains("clip")) {
        const wrapper = word.closest<HTMLElement>(".cd-words-wrapper");
        if (!wrapper) return;
        const newWidth = word.getBoundingClientRect().width + 10;
        animateWidth(wrapper, newWidth, revealDuration, () => {
          if (cancelled) return;
          timers.push(setTimeout(() => hideWord(word), revealAnimationDelay));
        });
      }
    };

    headlines.forEach((headline) => {
      if (headline.classList.contains("clip")) {
        const wrapper = headline.querySelector<HTMLElement>(".cd-words-wrapper");
        if (wrapper) {
          const newWidth = wrapper.getBoundingClientRect().width + 10;
          wrappers.push({ el: wrapper, initialWidth: wrapper.style.width });
          wrapper.style.width = newWidth + "px";
        }
      } else {
        const words = headline.querySelectorAll<HTMLElement>(".cd-words-wrapper .item-text");
        let width = 0;
        words.forEach((w) => {
          const rect = w.getBoundingClientRect();
          if (rect.width > width) width = rect.width;
        });
        const wrap = headline.querySelector<HTMLElement>(".cd-words-wrapper");
        if (wrap) {
          wrappers.push({ el: wrap, initialWidth: wrap.style.width });
          wrap.style.width = width + "px";
        }
      }
      const first = headline.querySelector(".is-visible");
      if (first) timers.push(setTimeout(() => hideWord(first), animationDelay));
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      wrappers.forEach(({ el, initialWidth }) => {
        el.style.width = initialWidth;
      });
    };
  }, []);
}
