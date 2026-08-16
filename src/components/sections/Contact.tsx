"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  // Store the submitted values separately so the success message can show
  // the real name/email even after the form fields are cleared.
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  // Copy-to-clipboard on the email address. A recruiter reading on a
  // desktop almost always wants the address in their own mail client, not
  // a mailto: handler that may not be configured.
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    // Two routes, because the async Clipboard API rejects more often than
    // you would expect: non-secure origins, embedded/automated browsers,
    // and stricter permission policies all throw NotAllowedError. Falling
    // back to the legacy execCommand path means the button still does
    // something in those cases rather than silently no-opping, which is
    // worse than having no button at all.
    const copyViaFallback = () => {
      try {
        const ta = document.createElement("textarea");
        ta.value = profile.email;
        // Keep it off-screen and non-focusable-looking so the page does
        // not visibly jump while the selection happens.
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    };

    let ok = false;
    try {
      await navigator.clipboard.writeText(profile.email);
      ok = true;
    } catch {
      ok = copyViaFallback();
    }

    // Only confirm if something actually made it to the clipboard - a
    // "Copied ✓" that lied would be worse than no feedback.
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  // Drives the button's own brief "plane takes off / Sent" animation right
  // after a successful submit, before the whole form swaps out for the
  // fuller "Message sent!" panel a moment later - a quick, satisfying
  // confirmation on the button itself rather than an abrupt jump straight to
  // the full success view.
  const [justSent, setJustSent] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: boolean; email?: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (fieldErrors[name as "name" | "email"]) {
      setFieldErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextFieldErrors: { name?: boolean; email?: boolean } = {
      name: !form.name.trim(),
      email: !form.email.trim() || !EMAIL_RE.test(form.email.trim()),
    };
    const hasErrors = Object.values(nextFieldErrors).some(Boolean);
    setFieldErrors(nextFieldErrors);

    if (hasErrors) {
      setError(
        !form.name.trim() && !form.email.trim()
          ? "Please fill in your name and email."
          : !form.name.trim()
          ? "Please add your name."
          : "Please add a valid email address."
      );
      return;
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        // Capture values BEFORE clearing the form so success message can show them
        setSubmittedName(form.name.trim());
        setSubmittedEmail(form.email.trim());
        setSending(false);
        setJustSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        // Let the button's own takeoff/checkmark/"Sent" animation play out
        // fully - the longest piece of it (the staggered "Sent" letters) 
        // finishes at 2.4s (1.6s max stagger delay + 0.8s duration) - before
        // swapping the whole form for the full success panel. A small buffer
        // on top so the finished "Sent" state is visible for a beat rather
        // than swapping the instant the last letter settles.
        setTimeout(() => setSubmitted(true), 2700);
        return;
      } else {
        setError("Something went wrong. Please email me directly at " + profile.email);
      }
    } catch {
      setError("Something went wrong. Please email me directly at " + profile.email);
    } finally {
      setSending(false);
    }
  };

  const handleSendAnother = () => {
    // GSAP's effectFade animations set autoAlpha:0 on .form-content and
    // .form-action when they first rendered. Going back to the form just
    // with setSubmitted(false) leaves those elements permanently invisible
    // because GSAP's inline styles persist. Force-clear them here so the
    // form is visible when it re-appears.
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".form-contact .form-content, .form-contact .form-action").forEach(el => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
      });
    }, 0);
    setSubmitted(false);
    setSubmittedName("");
    setSubmittedEmail("");
    setJustSent(false);
  };

  return (
    <div id="contact" className="section-contact flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-send" />
        Why I&apos;m the Fit
      </div>
      <h2 className="s-title letter-space--2 split-text effect-blur-fade">
        Open to UK and remote roles{" "}
        <br className="d-none d-lg-block" />
        from September 2026
      </h2>
      <p className="s-desc text-black-56 scrolling-effect effectTop" style={{ maxWidth: "600px", marginTop: "1rem", marginBottom: "0.5rem" }}>
        I research the problem, design the solution, and understand enough of the build to know the handover will hold. If you need one person across UI/UX, product and graphic design who can take a project from research through to something that ships, let&apos;s talk.
      </p>

      {submitted ? (
        <div style={{
          padding: "40px 32px",
          background: "rgba(0,200,83,0.06)",
          border: "1px solid rgba(0,200,83,0.2)",
          borderRadius: "20px",
          textAlign: "center",
          marginTop: "2rem",
          animation: "fadeInUp 0.5s ease forwards",
        }}>
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="27" stroke="#00C853" strokeWidth="1.5" />
              <path
                d="M18 28L24.5 34.5L38 21"
                stroke="#00C853"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 30,
                  strokeDashoffset: 0,
                  animation: "drawCheck 0.4s ease 0.2s both",
                }}
              />
            </svg>
          </div>
          <p style={{ color: "#00C853", fontSize: "18px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.02em" }}>
            Message sent!
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
            Thanks for reaching out{submittedName ? `, ${submittedName}` : ""}. I&apos;ll get back to you at{" "}
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{submittedEmail}</span>{" "}
            as soon as I can - usually within a day or two.
          </p>
          <button
            onClick={handleSendAnother}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "100px",
              padding: "10px 24px",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              fontSize: "13px",
              letterSpacing: "0.02em",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,200,83,0.4)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
          >
            Send another message
          </button>
        </div>
      ) : (
        // aria-label on every field, not just placeholders. A placeholder is
        // not a label: it vanishes the moment someone types, leaving no
        // persistent name for the field, and screen reader support for
        // announcing it is inconsistent. The visible placeholder stays as the
        // sighted affordance; the aria-label is what assistive tech reads.
        <form className="form-contact" onSubmit={handleSubmit} noValidate>
          <div className="form-content effectFade fadeUp no-div">
            <fieldset className={`field-ip${fieldErrors.name ? " has-error" : ""}`}>
              <input
                type="text" name="name" placeholder="Your Name *" autoComplete="name"
                aria-label="Your name"
                value={form.name} onChange={handleChange} required
                aria-invalid={fieldErrors.name ? "true" : "false"}
                style={{ textAlign: "left" }}
              />
            </fieldset>
            <fieldset className={`field-ip${fieldErrors.email ? " has-error" : ""}`}>
              <input
                type="email" name="email" placeholder="Email Address *" autoComplete="email"
                aria-label="Email address"
                value={form.email} onChange={handleChange} required
                aria-invalid={fieldErrors.email ? "true" : "false"}
                style={{ textAlign: "left" }}
              />
            </fieldset>
            <fieldset className="field-ip">
              <input
                type="text" name="subject" placeholder="Job opportunity / Freelance / Other"
                aria-label="Subject: job opportunity, freelance or other"
                value={form.subject} onChange={handleChange}
                style={{ textAlign: "left" }}
              />
            </fieldset>
            {/* A textarea, not a single-line input. This was an
                <input type="text"> - the field asking someone to describe a
                role or project gave them one line that scrolled sideways,
                which is the opposite of what the question invites and is not
                how any real contact form behaves. Every .field-ip rule in the
                stylesheet already covered `textarea` alongside `input`, so
                the underline styling, placeholder, focus ring and left-align
                all apply unchanged.

                rows=4 rather than a fixed height so it scales with the user's
                font size, and vertical-only resize so dragging it cannot
                break the column width. */}
            <fieldset className="field-ip">
              <textarea
                name="message" rows={4}
                placeholder="Tell me a bit about your project or role"
                aria-label="Tell me about your project or role"
                value={form.message} onChange={handleChange}
                style={{ textAlign: "left", resize: "vertical" }}
              />
            </fieldset>
          </div>

          {error && (
            <p role="alert" style={{
              color: "#ff5c5c",
              fontSize: "13px",
              marginTop: "12px",
              padding: "10px 16px",
              background: "rgba(255,92,92,0.08)",
              border: "1px solid rgba(255,92,92,0.2)",
              borderRadius: "8px",
            }}>
              {error}
            </p>
          )}

          <div className="form-action effectFade fadeUp no-div">
            <div className="send-wrap">
              <button
                type="submit"
                className={`vg-send-btn${justSent ? " is-sent" : ""}`}
                disabled={sending || justSent}
                aria-live="polite"
              >
                <div className="vg-send-state vg-send-state--default">
                  <div className="vg-send-icon">
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <p>
                    {["S", "e", "n", "d", "M", "e", "s", "s", "a", "g", "e"].map((ch, i) => (
                      <span key={i} style={{ ["--i" as string]: i } as React.CSSProperties}>{ch}</span>
                    ))}
                  </p>
                </div>
                <div className="vg-send-state vg-send-state--sent">
                  <div className="vg-send-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                      <path
                        fill="currentColor"
                        d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                      />
                      <path
                        fill="currentColor"
                        d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                      />
                    </svg>
                  </div>
                  <p>
                    {["S", "e", "n", "t"].map((ch, i) => (
                      <span key={i} style={{ ["--i" as string]: i + 5 } as React.CSSProperties}>{ch}</span>
                    ))}
                  </p>
                </div>
              </button>
            </div>
            {/* Everything a reviewer needs to act, grouped at the point of
                conversion. Previously this was email and phone only, so
                anyone who scrolled here still had to go back up to the
                sidebar to find LinkedIn or the CV. */}
            <div className="contact-links" style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <a href={`mailto:${profile.email}`} className="text-body-1 link letter-space--2 text-black-72">
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                  className="vg-copy-email"
                  style={{
                    background: "none",
                    border: `1px solid ${copied ? "rgba(0,222,81,0.5)" : "var(--black-6)"}`,
                    borderRadius: "100px",
                    padding: "3px 10px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: copied ? "#00DE51" : "var(--black-56)",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <a href={`tel:${profile.phone}`} className="text-body-3 text-black-56" style={{ textDecoration: "none" }}>
                {profile.phone}
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "2px" }}>
                <a
                  href="https://www.linkedin.com/in/dev-vyas6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-3 text-black-56"
                  style={{ textDecoration: "none" }}
                >
                  LinkedIn ↗
                </a>
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-3 text-black-56"
                  style={{ textDecoration: "none" }}
                >
                  Download CV ↓
                </a>
              </div>
            </div>
          </div>
        </form>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 30; }
          to { stroke-dashoffset: 0; }
        }

        /* ── Send Message button ──
           Adapted from a reference "flying letters" interactive button.
           Changes from the original:
           1. Colour: the reference is a LIGHT button (near-white surface,
              black text implied, pink accent) - inverted here to the site's
              own dark card surface with white text. The resting border and
              outer glow were originally tinted green (#00DE51) to give this,
              the primary CTA, more visual weight than the secondary sidebar
              button - reverted on request, since every other bordered
              surface on the site (nav rail, tag pills, secondary buttons)
              uses a neutral white/black ring at rest and only shows green as
              an active/hover accent, so the permanent green ring here read
              as inconsistent rather than intentional. Letter-wave flash and
              "Sent" checkmark keep their green flash on interaction/success,
              same as the rest of the site's green-on-interaction language.
           2. Trigger: the reference uses CSS :focus to fire the "Sent"
              checkmark + plane-takeoff animation, which is really standing
              in for "the form was submitted" rather than actual keyboard
              focus - a real :focus (e.g. tabbing to the button) would have
              incorrectly played the whole send animation. Replaced with a
              genuine .is-sent class driven by React state (set right after
              a successful submit, in handleSubmit), and given keyboard focus
              its own honest, separate :focus-visible outline instead.
        */
        .vg-send-btn {
          --primary: #f2f2f2;
          --neutral-1: #2b2e33;
          --neutral-2: #1a1c20;
          --radius: 14px;

          cursor: pointer;
          border-radius: var(--radius);
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.45);
          border: none;
          box-shadow: 0 0.5px 0.5px 1px rgba(255,255,255,0.12),
            0 10px 20px rgba(0,0,0,0.35), 0 4px 5px 0px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          min-width: 210px;
          padding: 16px 26px;
          height: 62px;
          font-size: 15px;
          font-weight: 600;
          overflow: visible;
        }
        .vg-send-btn:disabled { cursor: default; }
        .vg-send-btn:hover {
          transform: scale(1.02);
        }
        .vg-send-btn:active {
          transform: scale(1);
          box-shadow: 0 0 1px 2px rgba(255,255,255,0.18),
            0 10px 3px -3px rgba(0,0,0,0.3);
        }
        .vg-send-btn:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 3px;
        }
        .vg-send-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          border: 2.5px solid transparent;
          /* Neutral white bevel, matching the resting border/ring on every
             other bordered surface on the site (nav rail, tag pills, the
             secondary "Send another message" button). */
          background: linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
            linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.08)) border-box;
          z-index: 0;
          transition: all 0.4s ease;
        }
        .vg-send-btn:hover::after {
          transform: scale(1.05, 1.1);
          box-shadow: inset 0 -1px 3px 0 rgba(255,255,255,0.25);
        }
        .vg-send-btn::before {
          content: "";
          position: absolute;
          inset: 7px 6px 6px 6px;
          background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
          border-radius: 30px;
          filter: blur(0.5px);
          z-index: 0;
        }

        .vg-send-state {
          padding-left: 27px;
          z-index: 2;
          display: flex;
          position: relative;
        }
        .vg-send-state p {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vg-send-state--default p span:nth-child(4) { margin-right: 5px; }
        .vg-send-state--sent { display: none; }
        .vg-send-state--sent svg { transform: scale(1.2); margin-right: 8px; }
        .vg-send-btn.is-sent .vg-send-state--default { position: absolute; }
        .vg-send-btn.is-sent .vg-send-state--sent { display: flex; }

        .vg-send-icon {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          margin: auto;
          transform: scale(1.2);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vg-send-icon svg { overflow: visible; }
        .vg-send-btn:hover .vg-send-state--default .vg-send-icon {
          transform: rotate(45deg) scale(1.2);
        }

        /* Letters - staggered slide-down entrance, wave on hover, fly off on send */
        .vg-send-state p span {
          display: block;
          opacity: 0;
          animation: vg-send-slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
        }
        .vg-send-btn:hover .vg-send-state--default p span {
          opacity: 1;
          animation: vg-send-wave 0.5s ease forwards calc(var(--i) * 0.02s);
        }
        .vg-send-btn.is-sent .vg-send-state--default p span {
          opacity: 1;
          animation: vg-send-disappear 0.6s ease forwards calc(var(--i) * 0.03s);
        }
        @keyframes vg-send-wave {
          30% { opacity: 1; transform: translateY(4px) translateX(0) rotate(0); }
          50% { opacity: 1; transform: translateY(-3px) translateX(0) rotate(0); color: var(--primary); }
          100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
        }
        @keyframes vg-send-slideDown {
          0% { opacity: 0; transform: translateY(-20px) translateX(5px) rotate(-90deg); color: var(--primary); filter: blur(5px); }
          30% { opacity: 1; transform: translateY(4px) translateX(0) rotate(0); filter: blur(0); }
          50% { opacity: 1; transform: translateY(-3px) translateX(0) rotate(0); }
          100% { opacity: 1; transform: translateY(0) translateX(0) rotate(0); }
        }
        @keyframes vg-send-disappear {
          from { opacity: 1; }
          to { opacity: 0; transform: translateX(5px) translateY(20px); color: var(--primary); filter: blur(5px); }
        }

        /* Plane icon */
        .vg-send-state--default .vg-send-icon svg { animation: vg-send-land 0.6s ease forwards; }
        .vg-send-btn.is-sent .vg-send-state--default .vg-send-icon { transform: rotate(0) scale(1.2); }
        .vg-send-btn.is-sent .vg-send-state--default svg { animation: vg-send-takeOff 0.8s linear forwards; }
        @keyframes vg-send-takeOff {
          0% { opacity: 1; }
          60% { opacity: 1; transform: translateX(60px) rotate(45deg) scale(1.8); }
          100% { opacity: 0; transform: translateX(140px) rotate(45deg) scale(0); }
        }
        @keyframes vg-send-land {
          0% { transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2); opacity: 0; filter: blur(3px); }
          100% { transform: translateX(0) translateY(0) rotate(0); opacity: 1; filter: blur(0); }
        }
        .vg-send-state--default .vg-send-icon::before {
          content: "";
          position: absolute;
          top: 50%;
          height: 2px;
          width: 0;
          left: -5px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.5));
        }
        .vg-send-btn.is-sent .vg-send-state--default .vg-send-icon::before {
          animation: vg-send-contrail 0.8s linear forwards;
        }
        @keyframes vg-send-contrail {
          0% { width: 0; opacity: 1; }
          8% { width: 15px; }
          60% { opacity: 0.6; width: 75px; }
          100% { opacity: 0; width: 140px; }
        }

        /* "Sent" checkmark + text reveal */
        .vg-send-btn.is-sent .vg-send-state--sent span {
          opacity: 0;
          animation: vg-send-slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
        }
        .vg-send-btn.is-sent .vg-send-state--sent .vg-send-icon svg {
          opacity: 0;
          animation: vg-send-appear 1.2s ease forwards 0.8s;
        }
        @keyframes vg-send-appear {
          0% { opacity: 0; transform: scale(4) rotate(-40deg); color: var(--primary); filter: blur(4px); }
          30% { opacity: 1; transform: scale(0.6); filter: blur(1px); }
          50% { opacity: 1; transform: scale(1.2); filter: blur(0); }
          100% { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .vg-send-btn, .vg-send-btn * {
            animation: none !important;
            transition: none !important;
          }
          .vg-send-state p span { opacity: 1 !important; transform: none !important; filter: none !important; }
          .vg-send-btn.is-sent .vg-send-state--default { display: none !important; }
          .vg-send-btn.is-sent .vg-send-state--sent .vg-send-icon svg { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
