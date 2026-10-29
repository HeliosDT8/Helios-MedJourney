# Physician recruitment website

A Next.js website for Helios MedJourney, focused on connecting Canadian healthcare employers with UK-based General Practitioners and Family Physicians.

## Local development

```sh
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_SITE_URL`, and (if one is approved for publication) `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local`. The default URL is `https://example.com`; replace it before launch so canonical URLs, Open Graph links, and the sitemap use the real production domain.

## Enquiry delivery

The clinic onboarding wizard and employer, candidate, and contact forms send data to `/api/enquiry`. No database or CV storage is configured. The clinic onboarding wizard and pricing page are available at `/employers/onboarding` and `/pricing`. When configured, the route validates fields on the server and sends an email through MSG91 to `ENQUIRY_RECIPIENT_EMAIL`. Set these server-only values:

- `MSG91_AUTHKEY`
- `MSG91_INQUIRY_TEMPLATE_ID` — the template must expose `name`, `email`, `kind`, and `details` variables.
- `MSG91_DOMAIN`
- `MSG91_FROM_EMAIL`
- `ENQUIRY_RECIPIENT_EMAIL`

The API returns success only after the email provider confirms acceptance. Without these values, the route returns a configuration error. It does not persist enquiries. Rate limiting and duplicate-submission tracking use process memory, so they are best-effort and do not coordinate across multiple server instances. Use a shared rate-limit store before high-volume or multi-instance production deployment. Candidate CV upload is intentionally unavailable until private, access-controlled storage is implemented.

## Pricing and commercial terms

Public prices and the proposed replacement-search policy are centralized in `lib/commercial.ts`. The onboarding wizard and pricing pages read from this configuration. Replacement conditions shown on the site are proposed terms and need legal review and approval before being treated as final. Competitor research and source links are in `docs/competitor-pricing-research.md`.

## Checks and deployment

Run `npm run typecheck` and `npm run build` before deployment. Deploy to a Node-compatible Next.js host, configure the environment values above in the host's secret manager, set the canonical production URL and brand name, then verify delivery against the configured MSG91 template and recipient inbox. Review the privacy policy and terms with qualified counsel and configure an accountable privacy contact and enquiry-retention schedule before launch.
