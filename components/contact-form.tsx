"use client";

import { FormEvent, useState } from "react";

export function ContactForm({ initialService = "" }: { initialService?: string }) {
  const [status, setStatus] = useState("");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nEmail: ${form.get("email")}\nService: ${form.get("service")}\n\n${form.get("question")}`,
    );
    setStatus("Opening your email app. Review the message there and send it to Helios.");
    window.location.href = `mailto:info@heliosdigitaltechnology.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={submitForm}>
      <label htmlFor="contact-name">Full name</label>
      <input id="contact-name" name="name" type="text" placeholder="Insert full name" autoComplete="name" required />
      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" placeholder="Insert email" autoComplete="email" required />
      <label htmlFor="contact-service">What are you building?</label>
      <select id="contact-service" name="service" defaultValue={initialService}>
        <option value="" disabled>Select a service</option>
        <option>Web Development</option>
        <option>Application Development</option>
        <option>Vibe Coding</option>
      </select>
      <label htmlFor="contact-question">Your question</label>
      <textarea id="contact-question" name="question" placeholder="Tell us a little about your idea…" required />
      <button type="submit">Send message</button>
      <p className="contact-form-note">Your email app will open with your message ready to send.</p>
      <p className="contact-form-status" aria-live="polite">{status}</p>
    </form>
  );
}
