const groups = [
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Next.js", "REST APIs", "Server-side architecture"] },
  { title: "Database & infrastructure", items: ["PostgreSQL", "Supabase", "Cloud infrastructure", "Authentication", "Storage"] },
  { title: "AI development", items: ["AI-assisted coding", "AI development workflows", "Rapid prototyping", "Vibe Coding"] },
];

export function TechStack() {
  return (
    <section className="tech-section section-shell" id="technology">
      <div className="section-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> OUR DEVELOPMENT ECOSYSTEM</p>
        <h2>Built with <span className="text-gradient">modern technology.</span></h2>
        <p>We use modern, production-ready technologies to create fast, scalable, and maintainable digital products.</p>
      </div>
      <div className="tech-grid">
        {groups.map((group) => (
          <article className="tech-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="tech-tags">{group.items.map((item) => <span className="tech-tag" key={item}>{item}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
