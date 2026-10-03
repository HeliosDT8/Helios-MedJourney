import type { Metadata } from "next";

export const SITE_NAME = "Helios Digital Technology";
export const SITE_URL = "https://www.heliosdigitaltechnology.com";
export const SITE_EMAIL = "info@heliosdigitaltechnology.com";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const DEFAULT_TITLE = "Helios Digital Technology | Build Digital Products. Move Faster.";
export const DEFAULT_DESCRIPTION =
  "Helios Digital Technology builds modern websites, applications, and AI-assisted digital products using modern software engineering and Vibe Coding.";

export function absoluteUrl(path: string) {
  if (path === "" || path === "/") return SITE_URL;
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const brandedTitle = `${title} | ${SITE_NAME}`;

  return {
    title: { absolute: brandedTitle },
    description,
    alternates: { canonical },
    openGraph: {
      title: brandedTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: canonical,
      images: [{
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Build Digital Products. Move Faster.`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/helios-logo-light.svg"),
      },
      email: SITE_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export const serviceStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/services#web-development`,
      name: "Web Development",
      serviceType: "Web Development",
      description: "Modern websites built for performance, experience, and growth.",
      url: `${SITE_URL}/services#web-development`,
      provider: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/services#application-development`,
      name: "Application Development",
      serviceType: "Application Development",
      description: "Scalable applications designed around real business requirements.",
      url: `${SITE_URL}/services#application-development`,
      provider: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/services#vibe-coding`,
      name: "Vibe Coding",
      serviceType: "AI-assisted software development",
      description: "Turn ideas into working software faster with AI-assisted development.",
      url: `${SITE_URL}/services#vibe-coding`,
      provider: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
