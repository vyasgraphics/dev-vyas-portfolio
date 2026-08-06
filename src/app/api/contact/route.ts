import { Resend } from "resend";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// User-supplied fields are interpolated directly into the outgoing HTML
// email below - without escaping, a submission could break the email's
// layout or inject arbitrary markup/links into what lands in the inbox.
// Every field must be escaped before it touches the template.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Contact form error: RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // The contact form only validates client-side; this route can be
    // called directly, so the same rules (plus sane length limits) are
    // re-applied here rather than trusting the client.
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
    const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 200) : "";
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

    if (!name || !email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "A valid name and email are required" }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    await resend.emails.send({
      from: "Dev Vyas Portfolio <onboarding@resend.dev>",
      to: "vyasdev.6303@gmail.com",
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1210; color: #ffffff; padding: 40px; border-radius: 16px;">
          <div style="margin-bottom: 32px;">
            <div style="width: 40px; height: 40px; background: #00C853; border-radius: 50%; margin-bottom: 16px;"></div>
            <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 4px;">New Portfolio Enquiry</h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0;">via dev-vyas-portfolio.vercel.app</p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px; width: 80px;">Name</td>
                <td style="padding: 10px 0; color: #ffffff; font-size: 15px; font-weight: 500;">${safeName}</td>
              </tr>
              <tr style="border-top: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${safeEmail}" style="color: #00C853; font-size: 15px;">${safeEmail}</a></td>
              </tr>
              ${safeSubject ? `
              <tr style="border-top: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Subject</td>
                <td style="padding: 10px 0; color: #ffffff; font-size: 15px;">${safeSubject}</td>
              </tr>` : ""}
            </table>
          </div>

          ${safeMessage ? `
          <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Message</p>
            <p style="color: #ffffff; font-size: 15px; line-height: 1.6; margin: 0;">${safeMessage.replace(/\n/g, "<br/>")}</p>
          </div>` : ""}

          <a href="mailto:${safeEmail}" style="display: inline-block; background: #00C853; color: #000000; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 100px; text-decoration: none;">
            Reply to ${safeName}
          </a>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
