import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms and Conditions",
  description: "Review the terms governing use of the Helios Digital Technology website and technology services.",
  path: "/terms",
});

const website = "https://www.heliosdigitaltechnology.com";

export default function TermsPage() {
  return (
    <main>
      <section className="page-intro section-shell">
        <p className="eyebrow"><span className="eyebrow-dot" /> Legal</p>
        <h1>Terms and Conditions</h1>
        <p className="lead">These terms cover access to the Helios Digital Technology website and, where applicable, our technology and digital development services.</p>
      </section>
      <article className="legal-content section-shell">
        <p className="legal-updated">Last updated: October 4, 2026</p>

        <section>
          <h2>About these terms</h2>
          <p>These Terms and Conditions (“Terms”) govern your access to and use of the Helios Digital Technology website and, where applicable, our services. By accessing or using our website, you acknowledge that you have read and understood these Terms. If you do not agree with these Terms, please do not use the website.</p>
        </section>

        <section>
          <h2>About Helios and our services</h2>
          <p>Helios Digital Technology (“Helios,” “we,” “us,” or “our”) provides technology and digital development services, including:</p>
          <ul>
            <li>Web Development</li>
            <li>Application Development</li>
            <li>Vibe Coding and AI-assisted development</li>
            <li>Technology consulting</li>
            <li>Related software and digital services</li>
          </ul>
          <p className="legal-detail">Legal Entity: Helios Digital Technology<br />Headquarters: Ahmedabad, Gujarat, India<br />Email: <a href="mailto:info@heliosdigitaltechnology.com">info@heliosdigitaltechnology.com</a><br />Website: <a href={website}>heliosdigitaltechnology.com</a></p>
        </section>

        <section>
          <h2>Acceptable use</h2>
          <p>You agree to use this website only for lawful purposes. You must not:</p>
          <ul>
            <li>Use the website for unlawful activities</li>
            <li>Attempt to gain unauthorized access to systems or accounts, or circumvent security measures</li>
            <li>Introduce malware, viruses, or malicious code, or interfere with website functionality</li>
            <li>Scrape or systematically collect information in a manner that violates applicable law</li>
            <li>Impersonate another person or organization or submit fraudulent or misleading information</li>
            <li>Use the website to infringe another person’s rights</li>
          </ul>
          <p>We reserve the right to restrict or terminate access where reasonably necessary to protect our website, users, business, or systems.</p>
        </section>

        <section>
          <h2>Service scope and project agreements</h2>
          <p>Our services are provided according to the scope, specifications, deliverables, timelines, pricing, and other conditions agreed upon with the customer. A website description or marketing material does not automatically constitute a contractual commitment to provide a specific feature, functionality, technology, timeline, or outcome.</p>
          <p>Specific projects may be governed by a separate proposal, statement of work, service agreement, master services agreement, work order, purchase order, or other written agreement. Where there is a conflict between these Terms and a signed agreement governing a specific service, the signed agreement will control to the extent of the conflict.</p>
        </section>

        <section>
          <h2>Client responsibilities, delays, and scope changes</h2>
          <p>Clients are responsible for providing accurate and timely information, materials, approvals, credentials, content, access, and other resources reasonably required to perform the agreed services.</p>
          <p>Delays caused by late approvals, missing information, third-party dependencies, changes in requirements, unavailable access, delayed feedback, or external platform approvals may affect project timelines. Any resulting timeline changes will be communicated as reasonably practicable.</p>
          <p>Requests outside the agreed project scope may be treated as change requests. Additional work may require additional fees, revised delivery dates, updated specifications, and written approval. We will communicate material scope changes before undertaking additional chargeable work where reasonably practicable.</p>
        </section>

        <section>
          <h2>Third-party platforms and services</h2>
          <p>Projects may depend on third-party platforms and services, including cloud hosting providers, domain registrars, payment gateways, app stores, APIs, AI services, analytics platforms, email providers, authentication providers, database providers, and external software.</p>
          <p>Helios Digital Technology does not control third-party platforms and cannot guarantee their availability, policies, pricing, performance, approval decisions, or continued operation. Where a project depends on a third party, delays or changes caused by that third party may affect project delivery.</p>
        </section>

        <section>
          <h2>AI-assisted development</h2>
          <p>Where appropriate, Helios Digital Technology may use artificial intelligence or AI-assisted development tools as part of its development workflow. AI-generated or AI-assisted output may require human review, testing, modification, security review, and quality assurance. We do not represent that every AI-generated output will be error-free or suitable for every purpose without appropriate review and testing. Clients remain responsible for providing accurate requirements and reviewing deliverables according to the agreed project process.</p>
        </section>

        <section>
          <h2>Intellectual property</h2>
          <p>Unless otherwise agreed in writing, each party retains ownership of intellectual property it owned before the engagement. You retain ownership of materials you provide to us, subject to any rights you grant us to use those materials for performing the services.</p>
          <p>Helios Digital Technology retains ownership of its pre-existing frameworks, libraries, templates, tools, processes, methodologies, reusable components, know-how, and internal systems unless otherwise agreed in writing.</p>
          <p>Ownership or licensing of project-specific deliverables will be determined by the applicable proposal, statement of work, service agreement, or other written agreement. Payment and intellectual-property transfer conditions, where applicable, will be governed by that agreement.</p>
        </section>

        <section>
          <h2>Materials you provide</h2>
          <p>You represent that you have the necessary rights, permissions, and licenses to provide content, software, images, trademarks, data, documents, and other materials supplied to us for use in a project. You are responsible for ensuring that materials you provide do not infringe applicable laws or third-party rights.</p>
        </section>

        <section>
          <h2>Fees and payment</h2>
          <p>Where services are provided for a fee, pricing, payment schedules, taxes, deposits, milestones, refunds, and other commercial terms will be specified in the applicable proposal, invoice, statement of work, or agreement. Unless otherwise agreed in writing:</p>
          <ul>
            <li>Fees must be paid according to the agreed payment schedule.</li>
            <li>Applicable taxes may be charged separately.</li>
            <li>Work may be paused where required payments are materially overdue.</li>
            <li>Additional work outside the agreed scope may incur additional charges.</li>
          </ul>
        </section>

        <section>
          <h2>Delivery and acceptance</h2>
          <p>Project deliverables will be delivered according to the applicable project agreement. Where an acceptance period is specified in a project agreement, the acceptance process will follow that agreement. Minor defects or reasonable revisions that fall within the agreed scope do not necessarily constitute failure to deliver the project.</p>
        </section>

        <section>
          <h2>Service warranties and outcomes</h2>
          <p>We will use reasonable care and professional skill in providing our services. However, unless expressly agreed in writing, we do not guarantee that:</p>
          <ul>
            <li>A website will achieve a particular search-engine ranking, visitor count, or number of leads</li>
            <li>An application will achieve a particular number of downloads</li>
            <li>A software product will generate a particular revenue level</li>
            <li>Third-party services will remain available</li>
            <li>Search engines will index or rank content, or app stores will approve an application</li>
            <li>AI-generated output will always be accurate</li>
            <li>Software will be completely free of defects or vulnerabilities</li>
          </ul>
          <p>Specific warranties, service levels, or performance commitments must be expressly stated in a written agreement.</p>
        </section>

        <section>
          <h2>SEO-related services</h2>
          <p>Where Helios Digital Technology provides SEO-related development or optimization services, technical improvements do not guarantee a particular position in search-engine results. Search rankings may be affected by factors outside our control, including search-engine algorithms, competition, content quality, website authority, backlinks, search intent, industry conditions, search-engine policies, and technical changes. We do not guarantee first-page or first-position rankings unless a specific written agreement expressly provides otherwise.</p>
        </section>

        <section>
          <h2>Website information and availability</h2>
          <p>Information published on our website is provided for general informational and business purposes. We attempt to keep information accurate and current but do not guarantee that every piece of website content will always be complete, current, or error-free. We may update, modify, or remove website content without prior notice.</p>
          <p>We aim to keep our website available and operational but do not guarantee uninterrupted availability. The website may occasionally be unavailable because of maintenance, updates, hosting issues, network failures, security incidents, third-party failures, or events outside our reasonable control.</p>
        </section>

        <section>
          <h2>Limitation of liability</h2>
          <p>To the maximum extent permitted by applicable law, Helios Digital Technology will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages arising from or related to the use of our website or services. This may include, where legally permitted, loss of profits, revenue, business opportunities, or data; business interruption; or loss of anticipated savings.</p>
          <p>Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable law. For paid services, any additional limitation of liability may be specified in the applicable written service agreement.</p>
        </section>

        <section>
          <h2>Indemnification</h2>
          <p>To the extent permitted by applicable law, you agree to indemnify and hold harmless Helios Digital Technology and its personnel from claims, losses, liabilities, damages, and reasonable expenses arising from your unlawful use of the website, violation of these Terms, infringement of third-party rights, materials or information supplied by you that infringe applicable rights, or misuse of our services. This provision is subject to applicable law and any limitations contained in a separate written agreement.</p>
        </section>

        <section>
          <h2>Confidentiality</h2>
          <p>Where the parties exchange confidential information in connection with a project, confidentiality obligations may be governed by a separate NDA, service agreement, or contractual confidentiality provision. Nothing in these website Terms is intended to replace a separately executed confidentiality agreement.</p>
        </section>

        <section>
          <h2>Third-party links</h2>
          <p>Our website may contain links to third-party websites or services. These links are provided for convenience or informational purposes. We do not control and are not responsible for third-party websites, their content, availability, security, privacy practices, or terms.</p>
        </section>

        <section>
          <h2>Suspension and termination</h2>
          <p>We may suspend or restrict access to our website or services where reasonably necessary, including in cases involving security concerns, abuse, illegal activity, material breach of applicable terms, non-payment under a service agreement, or misuse of our systems. Termination of a specific client engagement will be governed by the applicable agreement.</p>
        </section>

        <section>
          <h2>Changes to these terms</h2>
          <p>We may update these Terms from time to time. The updated version will be posted on this page with a revised “Last Updated” date. Your continued use of the website after changes are posted constitutes use subject to the updated Terms, to the extent permitted by applicable law.</p>
        </section>

        <section>
          <h2>Governing law and jurisdiction</h2>
          <p>These Terms shall be governed by and interpreted in accordance with the laws of India, subject to applicable mandatory laws. Subject to any applicable dispute-resolution agreement, courts having appropriate jurisdiction in Ahmedabad, Gujarat, India shall have jurisdiction over disputes arising from these Terms. For client projects, a separate agreement may specify a different dispute-resolution mechanism, including arbitration or another jurisdiction.</p>
        </section>

        <section>
          <h2>Severability and project agreements</h2>
          <p>If any provision of these Terms is determined to be invalid or unenforceable, the remaining provisions will continue to apply to the extent permitted by law. These website Terms constitute the general terms governing use of the website. They do not replace a separate written agreement governing a specific project or service.</p>
        </section>

        <section>
          <h2>Contact us</h2>
          <p>For questions regarding these Terms, contact:</p>
          <p className="legal-detail">Helios Digital Technology<br />Ahmedabad, Gujarat, India<br />Email: <a href="mailto:info@heliosdigitaltechnology.com">info@heliosdigitaltechnology.com</a><br />Website: <a href={website}>heliosdigitaltechnology.com</a></p>
        </section>
      </article>
    </main>
  );
}
