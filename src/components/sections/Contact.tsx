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
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
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
  };

  return (
    <div id="contact" className="section-contact flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-send" />
        Get in Touch
      </div>
      <h4 className="s-title letter-space--2 split-text effect-blur-fade">
        Whether it&apos;s a job opportunity,{" "}
        <br className="d-none d-lg-block" />
        a freelance project, or just a{" "}
        <br className="d-none d-lg-block" />
        question - I&apos;d love to hear from you
      </h4>

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
        <form className="form-contact" onSubmit={handleSubmit} noValidate>
          <div className="form-content effectFade fadeUp no-div">
            <fieldset className={`field-ip${fieldErrors.name ? " has-error" : ""}`}>
              <input
                type="text" name="name" placeholder="Your Name *" autoComplete="name"
                value={form.name} onChange={handleChange} required
                aria-invalid={fieldErrors.name ? "true" : "false"}
                style={{ textAlign: "left" }}
              />
            </fieldset>
            <fieldset className={`field-ip${fieldErrors.email ? " has-error" : ""}`}>
              <input
                type="email" name="email" placeholder="Email Address *" autoComplete="email"
                value={form.email} onChange={handleChange} required
                aria-invalid={fieldErrors.email ? "true" : "false"}
                style={{ textAlign: "left" }}
              />
            </fieldset>
            <fieldset className="field-ip">
              <input
                type="text" name="subject" placeholder="Job opportunity / Freelance / Other"
                value={form.subject} onChange={handleChange}
                style={{ textAlign: "left" }}
              />
            </fieldset>
            <fieldset className="field-ip">
              <input
                type="text" name="message" placeholder="Tell me a bit about your project or role"
                value={form.message} onChange={handleChange}
                style={{ textAlign: "left" }}
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
                className="tf-btn animate-btn animate-dark"
                disabled={sending}
                style={{ opacity: sending ? 0.85 : 1, position: "relative", minWidth: "160px" }}
              >
                {sending ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: "spin 0.8s linear infinite" }}>
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="20" strokeDashoffset="10" fill="none" />
                    </svg>
                    <span className="text-body-3">Sending...</span>
                  </span>
                ) : (
                  <span className="text-body-3">Send Message</span>
                )}
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
              <a href={`mailto:${profile.email}`} className="text-body-1 link letter-space--2 text-black-72">
                {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="text-body-3 text-black-56" style={{ textDecoration: "none" }}>
                {profile.phone}
              </a>
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
