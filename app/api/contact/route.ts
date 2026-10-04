import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const MSG91_ENDPOINT = "https://control.msg91.com/api/v5/email/send";
const COMPANY_EMAIL = "info@heliosdigitaltechnology.com";
const COMPANY_NAME = "Helios Digital Technology";
const MSG91_DOMAIN = "mail.heliosdigitaltechnology.com";
const MAX_BODY_BYTES = 16_000;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const DUPLICATE_WINDOW_MS = 15 * 60 * 1000;
const VALID_SERVICES = new Set([
  "Web Development",
  "Application Development",
  "Vibe Coding",
]);

const rateLimits = new Map<string, { count: number; expiresAt: number }>();
const recentSubmissions = new Map<string, number>();
const pendingSubmissions = new Set<string>();

type ContactInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
};

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json({ ok: false, code, message }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function singleLine(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  return value
    .replace(/[\u0000-\u001f\u007f-\u009f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function messageText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, "")
    .trim();
}

function optionalSingleLine(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null || value === "") return "";
  return singleLine(value, maxLength);
}

function validateInput(value: unknown): ContactInput | null {
  if (!isRecord(value)) return null;

  const name = singleLine(value.name, 120);
  const email = singleLine(value.email, 254);
  const company = optionalSingleLine(value.company, 160);
  const phone = optionalSingleLine(value.phone, 40);
  const service = optionalSingleLine(value.service, 64);
  const message = messageText(value.message);

  if (!name || !email || !message || company === null || phone === null || service === null) return null;
  if (message.length > 5000 || message.length < 1) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  if (service && !VALID_SERVICES.has(service)) return null;
  if (phone && !/^[+()\d.\s-]{7,40}$/.test(phone)) return null;

  return { name, email, company, phone, service, message };
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",", 1)[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const value = realIp || forwarded || "unknown";
  return value.length <= 64 ? value : "unknown";
}

function isRateLimited(key: string, now: number): boolean {
  const current = rateLimits.get(key);
  if (!current || current.expiresAt <= now) {
    rateLimits.set(key, { count: 1, expiresAt: now + RATE_WINDOW_MS });
  } else if (current.count >= RATE_LIMIT) {
    return true;
  } else {
    current.count += 1;
  }

  if (rateLimits.size > 1000) {
    for (const [entryKey, entry] of rateLimits) {
      if (entry.expiresAt <= now) rateLimits.delete(entryKey);
    }
  }
  return false;
}

function submissionKey(input: ContactInput, ip: string): string {
  return createHash("sha256")
    .update(`${ip}\0${input.email.toLowerCase()}\0${input.service}\0${input.message}`)
    .digest("hex");
}

type Msg91Payload = {
  template_id: string;
  domain: string;
  from: { name: string; email: string };
  recipients: Array<{
    to: Array<{ name: string; email: string }>;
    variables: Record<string, string>;
  }>;
  reply_to?: Array<{ email: string }>;
};

async function sendWithMsg91(payload: Msg91Payload): Promise<{ ok: boolean; status: number }> {
  const authkey = process.env.MSG91_AUTHKEY;
  if (!authkey) return { ok: false, status: 0 };

  try {
    const response = await fetch(MSG91_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authkey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    const responseText = await response.text();
    let responseBody: unknown = null;
    if (responseText) {
      try {
        responseBody = JSON.parse(responseText);
      } catch {
        return { ok: false, status: response.status };
      }
    }

    const body = isRecord(responseBody) ? responseBody : null;
    const statusValue = typeof body?.status === "string" ? body.status.toLowerCase() : "";
    const typeValue = typeof body?.type === "string" ? body.type.toLowerCase() : "";
    const rejected = body?.success === false || body?.status === false ||
      [statusValue, typeValue].some((value) => value === "error" || value === "failed" || value === "failure");

    return { ok: response.ok && !rejected, status: response.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

function emailPayload(
  templateId: string,
  recipientName: string,
  recipientEmail: string,
  variables: Record<string, string>,
  replyTo?: string,
): Msg91Payload {
  return {
    template_id: templateId,
    domain: MSG91_DOMAIN,
    from: { name: COMPANY_NAME, email: COMPANY_EMAIL },
    recipients: [{ to: [{ name: recipientName, email: recipientEmail }], variables }],
    ...(replyTo ? { reply_to: [{ email: replyTo }] } : {}),
  };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonError(413, "request_too_large", "Your message is too large. Please shorten it and try again.");
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonError(415, "unsupported_content_type", "Please submit the inquiry form again.");
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonError(400, "invalid_request", "Please check the form and try again.");
  }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonError(413, "request_too_large", "Your message is too large. Please shorten it and try again.");
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError(400, "invalid_request", "Please check the form and try again.");
  }

  if (isRecord(body) && typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const input = validateInput(body);
  if (!input) {
    return jsonError(400, "invalid_form", "Please check your name, email, service, and message, then try again.");
  }

  const ip = clientKey(request);
  const now = Date.now();
  if (isRateLimited(ip, now)) {
    return jsonError(429, "rate_limited", "Please wait a few minutes before submitting another inquiry.");
  }

  const dedupeKey = submissionKey(input, ip);
  const duplicateUntil = recentSubmissions.get(dedupeKey);
  if (duplicateUntil && duplicateUntil > now) {
    return jsonError(409, "duplicate_submission", "This inquiry was already submitted. Please email us if you need to add details.");
  }
  if (pendingSubmissions.has(dedupeKey)) {
    return jsonError(409, "duplicate_submission", "Your inquiry is already being processed.");
  }

  const authkey = process.env.MSG91_AUTHKEY;
  const inquiryTemplateId = process.env.MSG91_INQUIRY_TEMPLATE_ID;
  const confirmationTemplateId = process.env.MSG91_CONFIRMATION_TEMPLATE_ID;
  if (!authkey || !inquiryTemplateId || !confirmationTemplateId) {
    console.error("[contact] MSG91 configuration is incomplete");
    return jsonError(503, "service_unavailable", "The contact form is temporarily unavailable. Please email info@heliosdigitaltechnology.com.");
  }

  pendingSubmissions.add(dedupeKey);
  let notificationAccepted = false;

  try {
    const submittedAt = `${new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date())} IST`;
    const notification = await sendWithMsg91(emailPayload(
      inquiryTemplateId,
      COMPANY_NAME,
      COMPANY_EMAIL,
      {
        name: input.name,
        company: input.company || "Not provided",
        email: input.email,
        phone: input.phone || "Not provided",
        service: input.service || "Not specified",
        message: input.message,
        submitted_at: submittedAt,
      },
      input.email,
    ));

    if (!notification.ok) {
      console.error("[contact] MSG91 inquiry notification failed", { status: notification.status });
      return jsonError(502, "notification_failed", "We couldn't send your inquiry. Please try again or email info@heliosdigitaltechnology.com.");
    }

    notificationAccepted = true;
    recentSubmissions.set(dedupeKey, Date.now() + DUPLICATE_WINDOW_MS);

    const firstName = input.name.split(" ", 1)[0];
    const confirmation = await sendWithMsg91(emailPayload(
      confirmationTemplateId,
      input.name,
      input.email,
      { first_name: firstName },
    ));

    if (!confirmation.ok) {
      console.error("[contact] MSG91 visitor confirmation failed", { status: confirmation.status });
      return jsonError(502, "confirmation_failed", "We received your inquiry, but couldn't send the confirmation email. You can reach us at info@heliosdigitaltechnology.com.");
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("[contact] Unexpected MSG91 submission failure");
    if (notificationAccepted) {
      recentSubmissions.set(dedupeKey, Date.now() + DUPLICATE_WINDOW_MS);
      return jsonError(502, "confirmation_failed", "We received your inquiry, but couldn't send the confirmation email. You can reach us at info@heliosdigitaltechnology.com.");
    }
    return jsonError(502, "notification_failed", "We couldn't send your inquiry. Please try again or email info@heliosdigitaltechnology.com.");
  } finally {
    pendingSubmissions.delete(dedupeKey);
    if (recentSubmissions.size > 1000) {
      const currentTime = Date.now();
      for (const [key, expiry] of recentSubmissions) {
        if (expiry <= currentTime) recentSubmissions.delete(key);
      }
    }
  }
}
