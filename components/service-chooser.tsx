import Link from "next/link";

const choices = [
  { question: "I need a website", service: "Web Development", id: "web-development" },
  { question: "I need an application", service: "Application Development", id: "application-development" },
  { question: "I have an idea to build quickly", service: "Vibe Coding", id: "vibe-coding" },
];

export function ServiceChooser() {
  return (
    <section className="chooser-section section-shell">
      <div className="section-heading section-heading-left">
        <p className="eyebrow"><span className="eyebrow-dot" /> FIND YOUR STARTING POINT</p>
        <h2>What are you building?</h2>
      </div>
      <div className="chooser-grid">
        {choices.map((choice) => (
          <Link className="chooser-card" href={`/contact?service=${choice.id}`} key={choice.id}>
            <span>{choice.question}</span><strong>{choice.service}</strong><span className="chooser-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
