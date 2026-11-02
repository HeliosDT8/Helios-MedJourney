import type {Metadata, Viewport} from "next";
import "./globals.css";
import {Navbar} from "@/components/navbar";
import {Footer} from "@/components/footer";
import {SiteJsonLd} from "@/components/seo-json-ld";
import {absoluteUrl, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, siteStructuredData} from "@/lib/seo";

const googleVerification = "FoxxlpkBFFdmt511hGocNnyYTicWEWNfm0JlHG-L8Qw";
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {default: `Physician Recruitment Canada | ${SITE_NAME}`, template: `%s | ${SITE_NAME}`},
  description: DEFAULT_DESCRIPTION,
  alternates: {canonical: absoluteUrl("/")},
  robots: {index: true, follow: true},
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    title: `Physician Recruitment Canada | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    images: [{url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1730, height: 909, alt: `${SITE_NAME} physician recruitment in Canada`}],
  },
  twitter: {
    card: "summary_large_image",
    title: `Physician Recruitment Canada | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  icons: {icon: "/favicon.svg"},
  ...(googleVerification || bingVerification ? {verification: {
    ...(googleVerification ? {google: googleVerification} : {}),
    ...(bingVerification ? {other: {"msvalidate.01": bingVerification}} : {}),
  }} : {}),
};

export const viewport: Viewport = {width: "device-width", initialScale: 1, themeColor: "#102e32"};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="en"><body><Navbar/>{children}<Footer/><SiteJsonLd data={siteStructuredData}/></body></html>;
}
