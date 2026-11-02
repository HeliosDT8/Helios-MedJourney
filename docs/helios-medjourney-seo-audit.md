# Helios MedJourney SEO Audit and Implementation

## Audit scope

- Framework: Next.js 16 App Router with statically rendered public pages and a dynamic `/api/enquiry` route.
- Production URL confirmed by the user: `https://helios-med-journey.vercel.app/`.
- Public content routes: `/`, `/employers`, `/employers/onboarding`, `/pricing`, `/physicians`, `/about`, `/contact`, `/approach`, `/privacy`, and `/terms`.
- Legacy redirect routes: `/mission` → `/about`, `/request-service` → `/contact`, `/services` → `/employers`, and `/business-intelligence` → `/employers`.
- No platform-specific deployment config, analytics IDs, Bing verification value, or GA4/GTM scripts are present in the repository. Google Search Console HTML-tag verification was added after the initial audit using the value supplied by the site owner.

## Findings and disposition

| Finding | SEO impact | Fix / status |
| --- | --- | --- |
| The production homepage and sitemap were observed emitting `https://example.com` canonicals/URLs even though the live site is hosted at the user-confirmed Vercel domain. `robots.txt` pointed to the same placeholder. | Search engines can attribute pages to the wrong host and ignore or mis-handle the sitemap. | Set the confirmed production URL as the default in `lib/seo.ts` and `.env.example`; emit absolute canonicals, social URLs, sitemap URLs, and robots sitemap URL from that base. Implemented locally; deployment is still required to update production. |
| Sitemap `lastmod` used `new Date()` on every generation. | It falsely reported every page as updated on every build. | Removed `lastModified`; no reliable per-page modification dates are currently maintained. Implemented. |
| Root page inherited a generic title/description; About's former title repeated the brand; Open Graph titles were not consistently aligned with browser titles. | Weaker relevance, duplicated titles, and inconsistent social snippets. | Added unique page titles/descriptions and consistent Open Graph/X metadata for all indexable public pages. Implemented and checked in local rendered HTML. |
| Legacy redirect routes were not listed in the sitemap, but sitemap generation included volatile timestamps. | Redirects should not appear as canonical destinations; volatile values weaken sitemap quality. | Sitemap now lists only canonical public routes, including privacy and terms, with no redirect routes or fabricated timestamps. Implemented and locally inspected. |
| Structured data contained only a basic Organization object. | Search engines had limited site and service context; no breadcrumb data was supplied. | Added Organization, WebSite, Service, and BreadcrumbList JSON-LD. Organization contact data is included only when an approved public contact email is configured; no `sameAs`, address, ratings, or certifications are invented. JSON-LD parses in local rendered pages. |
| Public routes had no consistent explicit robots policy, while API paths should not be indexed. | Search engines could crawl service endpoints, and indexability was implicit. | Public metadata now explicitly sets `index, follow`; `robots.txt` allows the public site and blocks `/api/`. Implemented and locally inspected. |
| Search Console, Bing verification, GA4, and GTM integrations were not configured. | Ownership verification and measurement are not ready. | Configured Google Search Console HTML-tag verification after the audit. Bing remains optional via environment variable. No tracking IDs exist, so no analytics scripts were added. GA4/GTM remain pending IDs and an approved consent/privacy approach. |
| The homepage hero photo was a CSS background, which browsers discover later than a priority image. | Potentially delayed Largest Contentful Paint. | Converted it to a responsive Next.js Image with dimensions from `fill`, `sizes="100vw"`, descriptive alt text, and high fetch priority. Implemented; no Lighthouse/Core Web Vitals score was measured. |
| Canada-specific recruitment topics were already covered in detail on `/employers` and `/approach`. | Additional near-duplicate keyword pages could become doorway pages. | Did not create `/canada/*` pages; the existing employer and process pages provide the distinct content needed for the current scope. |
| Internal CTAs already connected employer services, onboarding, pricing, physicians, and contact. About lacked a direct employer-services link. | One useful contextual path was missing. | Added an About → Employers link. A static internal-link audit found no missing local destinations. |
| Hosting/DNS redirect policy is not represented in the repository. | HTTPS and alternate-host redirects cannot be controlled or verified from app code alone. | No domain redirect rules were invented. Confirm the Vercel domain is the canonical production host and review redirects in the hosting/DNS settings after deployment. |

## Routes and indexing

The sitemap lists these ten indexable routes: `/`, `/employers`, `/employers/onboarding`, `/pricing`, `/physicians`, `/about`, `/contact`, `/approach`, `/privacy`, and `/terms`. Privacy and terms remain indexable and included as useful public legal pages. `/api/` is disallowed in robots. Redirect-only routes are excluded.

The ten indexable pages each render one H1 in the local build. The three legacy App Router redirect pages intentionally do not render an H1 because they redirect to their canonical destination.

## Verification

- `npm run typecheck`: passed.
- `npm run build`: passed; generated `/sitemap.xml` and `/robots.txt` routes.
- Local rendered metadata checked on all ten indexable routes: unique title/description, absolute canonical, `index, follow`, Open Graph title/URL/image, X card, and one H1.
- Local sitemap inspected: ten unique URLs on `https://helios-med-journey.vercel.app/`, no redirect routes, no `example.com`, and no unverified `lastmod` values.
- Local robots output inspected: allows public routes, disallows `/api/`, and points to the confirmed domain's sitemap.
- Local JSON-LD parsed from every indexable page and contained the expected graph and breadcrumb types.
- Mobile homepage inspected at 390 × 844; desktop layout and shared footer inspected in the local browser.
- Static internal-link audit: no unresolved local href destinations.
- The project has no `lint` script or ESLint dependency, so no lint command is available.
- Forms were not submitted during QA to avoid sending real enquiries. Their components and API handler were not changed by this SEO work.
- No PageSpeed/Lighthouse run, external schema-validator result, Search Console submission, indexing result, or deployment was performed.

## Manual steps remaining

1. Deploy the code to the confirmed production host; this task did not deploy.
2. Deploy the Google Search Console verification tag, verify ownership, and submit `https://helios-med-journey.vercel.app/sitemap.xml`. Add an optional Bing verification value to the host environment if desired.
3. Check HTTPS, host, and trailing-slash redirects in Vercel/DNS after deployment.
4. If analytics are desired, provide a GA4 Measurement ID or GTM Container ID and approve the consent and privacy-policy approach before enabling tracking.
5. Run Lighthouse/PageSpeed and a public Rich Results/Schema validator after deployment; record actual results rather than assuming scores.
