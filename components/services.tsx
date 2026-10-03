import Link from "next/link";

const services = [
  {
    number: "01",
    slug: "web-development",
    name: "Web Development",
    description: "Modern websites built for performance, experience, and growth.",
    items: ["Corporate websites", "SaaS websites", "Landing pages", "E-commerce", "Custom web platforms", "Responsive experiences"],
    icon: "web",
  },
  {
    number: "02",
    slug: "application-development",
    name: "Application Development",
    description: "Scalable applications designed around real business requirements.",
    items: ["Web applications", "Mobile applications", "SaaS products", "MVP development", "APIs & backend", "Third-party integrations"],
    icon: "app",
  },
  {
    number: "03",
    slug: "vibe-coding",
    name: "Vibe Coding",
    description: "Turn ideas into working software faster with AI-assisted development.",
    items: ["Rapid prototyping", "AI-assisted coding", "MVP development", "Feature development", "Codebase improvements", "AI development workflows"],
    icon: "vibe",
  },
];

export function Services({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className="services-band" id="services">
      <div className="services-content section-shell">
      <div className="section-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> WHAT WE BUILD</p>
        <h2>Three ways we help businesses <span className="text-gradient">move faster.</span></h2>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" id={service.slug} key={service.slug}>
            <div className="service-card-top"><span className="service-index">{service.number} / SERVICE</span><ServiceIcon kind={service.icon} /></div>
            <h3>{service.name}</h3>
            <p className="service-description">{service.description}</p>
            {expanded && <ul className="service-list">{service.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            <Link className="service-link" href={`/services#${service.slug}`}>Explore {service.name} <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}

function ServiceIcon({ kind }: { kind: string }) {
  if (kind === "web") {
    return <span className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13l-2 2 2 2m4 0h4"/></svg></span>;
  }
  if (kind === "app") {
    return <span className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.2"/><path d="M10 5h4m-3 13h2"/></svg></span>;
  }
  return <span className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/></svg></span>;
}
