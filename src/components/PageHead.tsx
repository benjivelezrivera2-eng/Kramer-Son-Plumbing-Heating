import { useEffect } from "react";
import { business } from "../config/business";
import { jsonLdFor, pageForPath } from "../lib/publicPages";

export function PageHead({ path }: { path: string }): JSX.Element | null {
  const page = pageForPath(path);

  useEffect(() => {
    if (!page) return;
    document.title = page.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", page.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    const href = page.path === "/" ? `${business.siteUrl}/` : `${business.siteUrl}${page.path}`;
    if (canonical) canonical.setAttribute("href", href);
  }, [page]);

  if (!page) return null;

  return (
    <>
      {jsonLdFor(page).map((block) => (
        <script
          key={String(block["@type"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
