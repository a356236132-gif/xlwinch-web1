import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9][0-9\s().-]{5,24}$/;
const requestLog = new Map();

function clean(value, maxLength = 1200) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function validate(payload) {
  const errors = {};

  if (!payload.name) {
    errors.name = "Name is required.";
  }

  if (!payload.email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(payload.email)) {
    errors.email = "Email format is invalid.";
  }

  if (!payload.phone) {
    errors.phone = "Phone is required.";
  } else if (!phonePattern.test(payload.phone)) {
    errors.phone = "Phone format is invalid.";
  }

  return errors;
}

function rateLimitKey(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "local";
}

function isRateLimited(key) {
  const now = Date.now();
  const current = requestLog.get(key) || [];
  const recent = current.filter((timestamp) => now - timestamp < 60_000);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > 8;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 465);

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: {
      user,
      pass
    }
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTextEmail(inquiry) {
  return [
    "New XLIGHTING Website Inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone / WhatsApp: ${inquiry.phone}`,
    `Company: ${inquiry.company || "-"}`,
    `Country / Region: ${inquiry.country || "-"}`,
    `Product Requirement: ${inquiry.productRequirement || "-"}`,
    `Message: ${inquiry.message || "-"}`,
    "",
    `Page URL: ${inquiry.pageUrl || "-"}`,
    `Submitted At: ${inquiry.submittedAt}`,
    `Source: ${inquiry.source}`
  ].join("\n");
}

function formatHtmlEmail(inquiry) {
  const rows = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone / WhatsApp", inquiry.phone],
    ["Company", inquiry.company || "-"],
    ["Country / Region", inquiry.country || "-"],
    ["Product Requirement", inquiry.productRequirement || "-"],
    ["Message", inquiry.message || "-"],
    ["Page URL", inquiry.pageUrl || "-"],
    ["Submitted At", inquiry.submittedAt]
  ];

  return `
    <div style="margin:0;padding:24px;background:#090909;color:#f7f3ec;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:680px;margin:0 auto;border:1px solid rgba(255,255,255,.14);border-radius:16px;overflow:hidden;background:#111;">
        <div style="padding:22px 26px;background:linear-gradient(135deg,#f58220,#c93322);color:#120804;">
          <h1 style="margin:0;font-size:24px;line-height:1.2;">New XLIGHTING Website Inquiry</h1>
          <p style="margin:8px 0 0;font-size:14px;">Lead captured from xlwinch.com</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="width:190px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08);color:#ff9b30;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td>
                  <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08);color:#f7f3ec;line-height:1.55;white-space:pre-wrap;">${escapeHtml(value)}</td>
                </tr>
              `
            )
            .join("")}
        </table>
      </div>
    </div>
  `;
}

async function sendInquiryEmail(deliveryPayload) {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    return {
      ok: false,
      status: 503,
      message:
        "Inquiry email is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS."
    };
  }

  const transporter = nodemailer.createTransport(smtpConfig);
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;
  const replyTo = deliveryPayload.inquiry.email;

  await transporter.sendMail({
    from: `"XLIGHTING Website" <${fromEmail}>`,
    to: deliveryPayload.to,
    replyTo,
    subject: deliveryPayload.subject,
    text: formatTextEmail(deliveryPayload.inquiry),
    html: formatHtmlEmail(deliveryPayload.inquiry)
  });

  return { ok: true };
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid form payload." }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ message: "Inquiry submitted successfully." });
  }

  const visitorKey = rateLimitKey(request);
  if (isRateLimited(visitorKey)) {
    return NextResponse.json(
      { message: "Too many submissions. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  const inquiry = {
    name: clean(body.name, 120),
    email: clean(body.email, 180),
    phone: clean(body.phone, 80),
    company: clean(body.company, 180),
    country: clean(body.country, 120),
    productRequirement: clean(body.productRequirement, 220),
    message: clean(body.message, 1600),
    pageUrl: clean(body.pageUrl, 400),
    submittedAt: new Date().toISOString(),
    source: "XLIGHTING website inquiry form"
  };

  const errors = validate(inquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Please complete the required fields correctly.", errors },
      { status: 400 }
    );
  }

  const deliveryPayload = {
    to: process.env.INQUIRY_TO_EMAIL || "info@xlwinch.com",
    subject: `New XLIGHTING inquiry from ${inquiry.name}`,
    inquiry
  };

  if (process.env.INQUIRY_WEBHOOK_URL) {
    try {
      const response = await fetch(process.env.INQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.INQUIRY_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_TOKEN}` }
            : {})
        },
        body: JSON.stringify(deliveryPayload)
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      return NextResponse.json({
        message: "Thank you. Your inquiry has been submitted successfully."
      });
    } catch {
      return NextResponse.json(
        { message: "Inquiry delivery failed. Please email info@xlwinch.com directly." },
        { status: 502 }
      );
    }
  }

  try {
    const emailResult = await sendInquiryEmail(deliveryPayload);

    if (!emailResult.ok) {
      return NextResponse.json(
        { message: emailResult.message },
        { status: emailResult.status || 503 }
      );
    }

    return NextResponse.json({
      message: "Thank you. Your inquiry has been sent to info@xlwinch.com."
    });
  } catch (error) {
    console.error("Inquiry email delivery failed:", error.message);
    return NextResponse.json(
      { message: "Inquiry email delivery failed. Please email info@xlwinch.com directly." },
      { status: 502 }
    );
  }
}
