const phases = [
  { number: "01", name: "Discover", copy: "Understand the business, users, requirements, and objectives." },
  { number: "02", name: "Design", copy: "Turn requirements into an intuitive product experience." },
  { number: "03", name: "Build", copy: "Develop with modern engineering and AI-assisted workflows." },
  { number: "04", name: "Launch", copy: "Deploy, monitor, improve, and scale." },
];

export function HowWeWork() {
  return (
    <section className="process-band" id="process">
      <div className="process-content section-shell">
      <div className="process-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" /> HOW WE WORK</p>
          <h2>From idea to launch.</h2>
        </div>
        <p>One clear, collaborative path from your first thought to a product in the hands of users.</p>
      </div>
      <div className="process-flow" aria-label="Idea to design to build to launch">
        {phases.map((phase, index) => (
          <div className="process-step" key={phase.number}>
            <span className="process-count">{phase.number}</span>
            <h3>{phase.name}</h3>
            <p>{phase.copy}</p>
            {index < phases.length - 1 && <span className="process-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="process-summary">IDEA <span>→</span> DESIGN <span>→</span> BUILD <span>→</span> LAUNCH</p>
      </div>
    </section>
  );
}
