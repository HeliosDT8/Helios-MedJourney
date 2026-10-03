import { permanentRedirect } from "next/navigation";

const supportedServices: Record<string, string> = {
  "web-development": "web-development",
  "web-design": "web-development",
  "application-development": "application-development",
  "vibe-coding": "vibe-coding",
};

export default async function LegacyRequestServicePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const serviceName = (params.service ?? "").trim().toLowerCase();
  const normalizedService = serviceName.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const service = supportedServices[normalizedService];

  permanentRedirect(service ? `/contact?service=${service}` : "/contact");
}
