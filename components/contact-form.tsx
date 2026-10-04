"use client";

import { type FormEvent, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fallbackError = "We couldn't send your inquiry. Please try again or email info@heliosdigitaltechnology.com.";

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    submitting.current = true;
    setStatus("submitting");
    setStatusMessage("Sending your message…");

    const form = event.currentTarget;
    const values = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"),
          email: values.get("email"),
          service: values.get("service"),
          message: values.get("question"),
          website: values.get("website"),
        }),
      });
      const result: unknown = await response.json().catch(() => null);
      const errorResult = result && typeof result === "object" ? result as { message?: unknown } : null;

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(typeof errorResult?.message === "string" ? errorResult.message : fallbackError);
        return;
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Thank you! Your inquiry has been submitted successfully. We'll get back to you soon.");
    } catch {
      setStatus("error");
      setStatusMessage(fallbackError);
    } finally {
      submitting.current = false;
      setStatus((current) => current === "submitting" ? "idle" : current);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === "submitting"}>
      <div className="contact-form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="contact-name">Full name</label>
      <input id="contact-name" name="name" type="text" placeholder="Insert full name" autoComplete="name" maxLength={120} required />
      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" placeholder="Insert email" autoComplete="email" maxLength={254} required />
      <label htmlFor="contact-service">What are you building?</label>
      <select id="contact-service" name="service" defaultValue={initialService}>
        <option value="" disabled>Select a service</option>
        <option>Web Development</option>
        <option>Application Development</option>
        <option>Vibe Coding</option>
      </select>
      <label htmlFor="contact-question">Your question</label>
      <textarea id="contact-question" name="question" placeholder="Tell us a little about your idea…" maxLength={5000} required />
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p className="contact-form-note">We’ll send a confirmation to the email you provide.</p>
      <p className={`contact-form-status${status === "error" ? " is-error" : status === "success" ? " is-success" : ""}`} role={status === "error" ? "alert" : "status"} aria-live="polite">
        {statusMessage}
      </p>
    </form>
  );
}
