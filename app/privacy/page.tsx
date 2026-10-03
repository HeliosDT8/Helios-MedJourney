import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Learn what information Helios Digital Technology collects, how it is used and shared, and the choices available to you.",
  path: "/privacy",
});

const website = "https://www.heliosdigitaltechnology.com";

export default function PrivacyPage() {
  return (
    <main>
      <section className="page-intro section-shell">
        <p className="eyebrow"><span className="eyebrow-dot" /> Legal</p>
        <h1>Privacy Policy</h1>
        <p className="lead">This policy explains how Helios Digital Technology collects, uses, shares, stores, and protects information when you visit our website or interact with our services.</p>
      </section>
      <article className="legal-content section-shell">
        <p className="legal-updated">Last updated: October 4, 2026</p>

        <section>
          <h2>About this policy</h2>
          <p>Helios Digital Technology (“Helios Digital Technology,” “Helios,” “we,” “us,” or “our”) respects your privacy and is committed to protecting the personal information you provide when you use our website, services, or communicate with us. This Privacy Policy explains how we handle information when you visit <a href={website}>heliosdigitaltechnology.com</a> or interact with our services.</p>
        </section>

        <section>
          <h2>Who we are</h2>
          <p>Helios Digital Technology provides technology services, including:</p>
          <ul>
            <li>Web Development</li>
            <li>Application Development</li>
            <li>Vibe Coding and AI-assisted software development</li>
            <li>Technology consulting and related digital services</li>
          </ul>
          <p className="legal-detail">Legal Entity: Helios Digital Technology<br />Headquarters: Ahmedabad, Gujarat, India<br />Email: <a href="mailto:info@heliosdigitaltechnology.com">info@heliosdigitaltechnology.com</a><br />Website: <a href={website}>heliosdigitaltechnology.com</a></p>
        </section>

        <section>
          <h2>Information we collect</h2>
          <p>We may collect information that you voluntarily provide, information collected automatically when you use our website, and information received from third-party services where applicable.</p>
          <h3>Information you provide</h3>
          <p>Depending on how you interact with us, this may include:</p>
          <ul>
            <li>Full name, company name, job title, email address, phone number, and country or location</li>
            <li>Project and service requirements</li>
            <li>Information submitted through contact forms or included in inquiries and messages</li>
            <li>Information provided during consultations</li>
            <li>Billing and transaction information, where applicable</li>
          </ul>
          <h3>Information collected automatically</h3>
          <p>When you visit our website, certain technical information may be collected automatically, including:</p>
          <ul>
            <li>IP address, browser type and version, device type, and operating system</li>
            <li>Referring URL, pages visited, and approximate location derived from your IP address</li>
            <li>Date and time of access and website interaction information</li>
            <li>Diagnostic and performance information</li>
          </ul>
          <p>This information may be collected through server logs, cookies, analytics tools, or similar technologies.</p>
        </section>

        <section>
          <h2>Please do not send sensitive information</h2>
          <p>Please do not submit confidential passwords, payment-card numbers, private credentials, API keys, or other sensitive information through general contact forms unless we specifically request it through an appropriate secure channel.</p>
        </section>

        <section>
          <h2>How we use information</h2>
          <p>We may use collected information to:</p>
          <ul>
            <li>Respond to inquiries and requests and provide requested services</li>
            <li>Communicate with customers and prospective customers and understand project requirements</li>
            <li>Prepare proposals and quotations, manage customer relationships, and process transactions where applicable</li>
            <li>Provide technical support and improve our website and services</li>
            <li>Analyze website performance and usage and maintain website security</li>
            <li>Detect and prevent fraud, abuse, or unauthorized activity</li>
            <li>Comply with applicable legal obligations and protect our rights and property</li>
            <li>Send business or service-related communications</li>
            <li>Send marketing communications where legally permitted and where appropriate consent has been obtained</li>
          </ul>
          <p>We do not use personal information for purposes incompatible with the purpose for which it was collected unless permitted or required by applicable law.</p>
        </section>

        <section>
          <h2>Cookies and similar technologies</h2>
          <p>Our website may use cookies and similar technologies to:</p>
          <ul>
            <li>Keep the website functioning correctly and remember preferences</li>
            <li>Understand website usage, analyze traffic and performance, and improve user experience</li>
            <li>Support security and measure marketing effectiveness where applicable</li>
          </ul>
          <p>You can control or disable cookies through your browser settings. Some website functionality may not work properly if certain cookies are disabled. Where legally required, we will seek appropriate consent before using non-essential cookies or similar technologies.</p>
        </section>

        <section>
          <h2>Analytics</h2>
          <p>We may use analytics or similar technologies to understand how visitors interact with our website. These services may collect information such as pages visited, approximate geographic region, device and browser information, referral sources, and interaction and engagement information. Any third-party analytics provider will process information according to its own privacy policy and applicable contractual and legal requirements.</p>
        </section>

        <section>
          <h2>How information may be shared</h2>
          <p>We do not sell your personal information as a business practice. We may use trusted third-party providers for website hosting, cloud infrastructure, email, analytics, customer relationship management, payment processing, communications, security, and software development infrastructure. These providers may process information on our behalf and may be subject to contractual, legal, or technical safeguards.</p>
          <p>We may disclose information where reasonably necessary to comply with applicable law or lawful governmental requests, protect our legal rights, enforce agreements, investigate fraud or security incidents, or protect users or the public.</p>
          <p>If Helios Digital Technology is involved in a merger, acquisition, restructuring, financing, sale of assets, or similar transaction, personal information may be transferred as part of that transaction, subject to applicable law.</p>
        </section>

        <section>
          <h2>International transfers</h2>
          <p>Because Helios Digital Technology may provide services to customers internationally and may use service providers located in different countries, your information may be processed or stored outside your country of residence. Where required by applicable law, we will take appropriate measures for international transfers of personal information.</p>
        </section>

        <section>
          <h2>Data retention</h2>
          <p>We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing services, maintaining business records, resolving disputes, enforcing agreements, meeting accounting and legal requirements, and protecting our legitimate business interests. The specific retention period may vary depending on the type of information and the purpose for which it was collected.</p>
        </section>

        <section>
          <h2>Data security</h2>
          <p>We use reasonable administrative, technical, and organizational safeguards designed to protect personal information against unauthorized access, disclosure, alteration, destruction, or misuse. However, no internet transmission or electronic storage system can be guaranteed to be completely secure. You should also take reasonable precautions when sharing information online.</p>
        </section>

        <section>
          <h2>Third-party websites</h2>
          <p>Our website may contain links to third-party websites, platforms, or services. We are not responsible for the privacy practices, security, content, or policies of third-party websites. We encourage you to review the privacy policy of any third-party website you visit.</p>
        </section>

        <section>
          <h2>Children’s privacy</h2>
          <p>Our website and services are not intentionally directed toward children. We do not knowingly collect personal information from children in circumstances where such collection is prohibited by applicable law. If you believe a child has provided personal information to us, please contact us so that we can assess and take appropriate action.</p>
        </section>

        <section>
          <h2>Your privacy rights and choices</h2>
          <p>Depending on your location and applicable law, you may have rights regarding your personal information, which may include:</p>
          <ul>
            <li>Accessing personal information we hold about you or requesting correction of inaccurate information</li>
            <li>Requesting deletion of certain information or restriction of certain processing</li>
            <li>Objecting to certain processing or requesting portability of information where applicable</li>
            <li>Withdrawing consent where processing is based on consent</li>
            <li>Opting out of certain marketing communications</li>
          </ul>
          <p>These rights are subject to applicable legal limitations and exceptions. To submit a privacy request, contact <a href="mailto:info@heliosdigitaltechnology.com">info@heliosdigitaltechnology.com</a>. We may need to verify your identity before processing certain requests.</p>
          <p>If you receive marketing communications from us, you may unsubscribe by following the unsubscribe instructions included in the communication or by contacting us. You may continue to receive essential service-related communications where necessary to provide services or respond to your requests.</p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>We may update this Privacy Policy from time to time. When we make changes, we may update the “Last Updated” date at the top of this page. We encourage you to review this Privacy Policy periodically.</p>
        </section>

        <section>
          <h2>Contact us</h2>
          <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, contact us:</p>
          <p className="legal-detail">Helios Digital Technology<br />Ahmedabad, Gujarat, India<br />Email: <a href="mailto:info@heliosdigitaltechnology.com">info@heliosdigitaltechnology.com</a><br />Website: <a href={website}>heliosdigitaltechnology.com</a></p>
        </section>
      </article>
    </main>
  );
}
