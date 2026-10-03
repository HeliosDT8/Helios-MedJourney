import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const publicPaths = ["/", "/services", "/mission", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({ url: absoluteUrl(path) }));
}
