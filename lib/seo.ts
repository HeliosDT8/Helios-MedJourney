import type { Metadata } from "next";

export const SITE_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Helios MedJourney";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const SITE_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const DEFAULT_TITLE = `${SITE_NAME} | Physician recruitment for Canada`;
export const DEFAULT_DESCRIPTION = "Connecting Medical Talent. Strengthening Canadian Healthcare. Helios MedJourney connects Canadian clinics with UK-based General Practitioners and Family Physicians.";
export function absoluteUrl(path: string) { return new URL(path || "/", `${SITE_URL}/`).toString(); }
export function createPageMetadata({ title, description, path }: {title:string;description:string;path:string}): Metadata {
 const url=absoluteUrl(path); return {title:{absolute:`${title} | ${SITE_NAME}`},description,alternates:{canonical:url},openGraph:{title,description,siteName:SITE_NAME,type:"website",url,images:[{url:DEFAULT_OG_IMAGE}]},twitter:{card:"summary_large_image",title,description,images:[DEFAULT_OG_IMAGE]}};
}
export const organizationStructuredData={"@context":"https://schema.org","@type":"Organization",name:SITE_NAME,url:SITE_URL,description:DEFAULT_DESCRIPTION};
