import { business } from "../config/business";
import { slugify } from "./shop";

export type PageKind = "home" | "service" | "article";

export type PublicPage = {
  path: string;
  title: string;
  description: string;
  updated: string;
  kind: PageKind;
};

const CONTENT_UPDATED = "2026-11-09";

function absolute(path: string): string {
  if (path === "/") return `${business.siteUrl}/`;
  return `${business.siteUrl}${path}`;
}

export function publicPages(): PublicPage[] {
  const home: PublicPage = {
    path: "/",
    title:
      "Plumbing and heating for homes in Sterling, Fort Morgan, Brush, and Greeley",
    description: business.shareDescription,
    updated: CONTENT_UPDATED,
    kind: "home",
  };

  const services: PublicPage[] = business.services.map((service) => ({
    path: `/services/${slugify(service.title)}`,
    title: `${service.title} for homes in Sterling and nearby towns`,
    description: service.description,
    updated: CONTENT_UPDATED,
    kind: "service",
  }));

  const articles: PublicPage[] = business.articles.map((article) => ({
    path: `/articles/${slugify(article.title)}`,
    title: article.title,
    description: article.description,
    updated: article.updated,
    kind: "article",
  }));

  return [home, ...services, ...articles];
}

export function pageForPath(path: string): PublicPage | undefined {
  const clean = path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  return publicPages().find((page) => page.path === clean);
}

export function jsonLdFor(page: PublicPage): Record<string, unknown>[] {
  const pageUrl = absolute(page.path);
  const businessId = `${business.siteUrl}/#business`;
  const localBusiness = {
    "@type": "Plumber",
    "@id": businessId,
    name: business.fullName,
    url: `${business.siteUrl}/`,
    telephone: business.phoneDisplay,
    description: business.shareDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sterling",
      addressRegion: "CO",
      addressCountry: "US",
    },
    areaServed: business.areas.map((area) => area.name),
  };

  if (page.kind === "home") {
    return [
      {
        "@context": "https://schema.org",
        ...localBusiness,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: business.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ];
  }

  if (page.kind === "service") {
    const service = business.services.find(
      (item) => `/services/${slugify(item.title)}` === page.path,
    );
    return [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service?.title ?? page.title,
        description: page.description,
        url: pageUrl,
        provider: { "@id": businessId },
        areaServed: business.areas.map((area) => area.name),
      },
    ];
  }

  const article = business.articles.find(
    (item) => `/articles/${slugify(item.title)}` === page.path,
  );
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description: page.description,
      dateModified: page.updated,
      datePublished: page.updated,
      mainEntityOfPage: pageUrl,
      author: {
        "@type": "Organization",
        name: business.fullName,
        url: `${business.siteUrl}/`,
      },
      publisher: { "@id": businessId },
      articleBody: article?.paragraphs.join("\n\n"),
    },
  ];
}

export function formatUpdated(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
