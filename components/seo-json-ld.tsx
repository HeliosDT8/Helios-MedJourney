import {breadcrumbStructuredData, type BreadcrumbItem} from "@/lib/seo";

function JsonLd({data}: {data: unknown}) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}}/>;
}

export function SiteJsonLd({data}: {data: unknown}) {
  return <JsonLd data={data}/>;
}

export function BreadcrumbJsonLd({items}: {items: BreadcrumbItem[]}) {
  return <JsonLd data={breadcrumbStructuredData(items)}/>;
}
