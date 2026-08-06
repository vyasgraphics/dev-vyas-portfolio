"use client";

import { useEffect } from "react";

export function useClock() {
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateString = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      document.querySelectorAll<HTMLElement>(".time-local").forEach((el) => {
        const date = el.querySelector(".date");
        const clock = el.querySelector(".clock");
        if (date) date.textContent = dateString;
        if (clock) clock.textContent = timeString;
      });
    };
    update();

    // Only hour:minute is displayed, so there's nothing to gain from
    // ticking every second - align the first update to the next real
    // minute boundary, then repeat exactly once a minute from there.
    let intervalId: number | undefined;
    const msIntoMinute = Date.now() % 60000;
    const msUntilNextMinute = 60000 - msIntoMinute;
    const alignTimeout = window.setTimeout(() => {
      update();
      intervalId = window.setInterval(update, 60000);
    }, msUntilNextMinute);

    return () => {
      window.clearTimeout(alignTimeout);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);
}
