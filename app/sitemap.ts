import type {MetadataRoute} from "next";
import {SITE_URL} from "@/lib/seo";

const indexablePaths = [
  "/",
  "/employers",
  "/employers/onboarding",
  "/pricing",
  "/physicians",
  "/about",
  "/contact",
  "/approach",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.map((path) => ({url: new URL(path, `${SITE_URL}/`).toString()}));
}
