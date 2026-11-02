import type {Metadata} from "next";

export const SITE_NAME = process.env.NEXT_PUBLIC_BRAND_NAME?.trim() || "Helios MedJourney";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://helios-med-journey.vercel.app").replace(/\/$/, "");
export const SITE_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const DEFAULT_DESCRIPTION = "Helios MedJourney supports Canadian healthcare employers with international physician recruitment focused on UK-based General Practitioners and Family Physicians.";

export function absoluteUrl(path: string) {
  return new URL(path || "/", `${SITE_URL}/`).toString();
}

function brandedTitle(title: string) {
  return title.toLowerCase().includes(SITE_NAME.toLowerCase()) ? title : `${title} | ${SITE_NAME}`;
}

export function createPageMetadata({title, description, path}: {title: string; description: string; path: string}): Metadata {
  const fullTitle = brandedTitle(title);
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(DEFAULT_OG_IMAGE);
  return {
    title: {absolute: fullTitle},
    description,
    alternates: {canonical},
    robots: {index: true, follow: true},
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: canonical,
      images: [{url: image, width: 1730, height: 909, alt: `${SITE_NAME} physician recruitment in Canada`}],
    },
    twitter: {card: "summary_large_image", title: fullTitle, description, images: [image]},
  };
}

const organizationId = `${SITE_URL}/#organization`;
export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: absoluteUrl("/global-healthcare-h-emblem.png"),
      description: DEFAULT_DESCRIPTION,
      ...(SITE_EMAIL ? {contactPoint: {"@type": "ContactPoint", email: SITE_EMAIL, contactType: "business enquiries"}} : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: {"@id": organizationId},
      inLanguage: "en-CA",
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#physician-recruitment`,
      name: "Physician Recruitment",
      serviceType: "International physician recruitment",
      provider: {"@id": organizationId},
      areaServed: {"@type": "Country", name: "Canada"},
      audience: {"@type": "BusinessAudience", audienceType: "Healthcare organisations and employers"},
      description: "Recruitment support for Canadian healthcare employers seeking UK-based General Practitioners and Family Physicians. Candidate availability, qualifications, licensing, immigration, and hiring outcomes vary by individual and jurisdiction.",
    },
  ],
};

export type BreadcrumbItem = {name: string; path: string};
export function breadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
