"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { navItems } from "@/data/nav";
import { smoothScrollTo } from "@/lib/smoothScroll";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    document.body.classList.remove("overflow-hidden");
  }, []);

  const toggle = useCallback(() => {
    const next = !open;
    setOpen(next);
    if (next) {
        document.body.classList.add("overflow-hidden");
    } else {
        document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  // Close on ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // Close when any nav link is clicked and scroll to section
  const handleNavClick = useCallback((href: string) => {
    close();
    // Small delay so menu closes before scroll
    setTimeout(() => {
        smoothScrollTo(href, { pushHistory: href });
    }, 300);
  }, [close]);

  // Keyboard support for the div-based toggle/overlay (Enter/Space)
  const onToggleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
    }
  };
  const onOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        close();
    }
  };

  return (
    <>
      <div className="action-open-mobile d-lg-none">
        <div
          className="tf-btn-icon style-2"
          onClick={toggle}
          onKeyDown={onToggleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <div className={`btn-mobile-menu${open ? " close" : ""}`}>
            <span />
          </div>
        </div>
        <div className={`nav-mobile-list${open ? " open" : ""}`}>
          <ul className="nav-mobile-item">
            {navItems.map((item, i) => (
              <Fragment key={item.href + i}>
                <li className="nav-item">
                  <a
                    href={item.href}
                    className="item-link scroll-link"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                    }}
                  >
                    <i className={`icon ${item.icon}`} />
                    <p className="tool-tip text-caption">{item.label}</p>
                  </a>
                </li>
                {item.separator === "after" && <li className="br-line" />}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
      {/* Overlay - click to close */}
      <div
        className={`overlay-pop${open ? " open" : ""}`}
        onClick={close}
        onKeyDown={onOverlayKeyDown}
        role="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
      />
    </>
  );
}
