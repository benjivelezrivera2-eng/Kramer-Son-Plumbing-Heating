import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const site = "https://kramer-son-plumbing-heating.vercel.app";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function pageUrl(pagePath) {
  return pagePath === "/" ? `${site}/` : `${site}${pagePath}`;
}

function withHead(template, page, body) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const url = pageUrl(page.path);
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace('<div id="app"></div>', `<div id="app">${body}</div>`);
}

function sitemapXml(pages) {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${pageUrl(page.path)}</loc>
    <lastmod>${page.updated}</lastmod>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { render } = await vite.ssrLoadModule("/src/prerender/render.tsx");
  const { publicPages } = await vite.ssrLoadModule("/src/lib/publicPages.ts");
  const pages = publicPages();
  const template = await readFile(path.join(root, "dist", "index.html"), "utf8");
  const sitemap = sitemapXml(pages);

  for (const page of pages) {
    const body = render(page.path);
    if (!body.includes("<h1") && page.path === "/") {
      throw new Error(`Homepage prerender did not include a heading: ${page.path}`);
    }
    const html = withHead(template, page, body);
    const expectedTitle = `<title>${escapeHtml(page.title)}</title>`;
    if (!html.includes(expectedTitle) || html.includes("Business Name Plumbing")) {
      throw new Error(`Prerendered head is still the placeholder for ${page.path}`);
    }
    const relative = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
    const file = path.join(root, "dist", relative);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    if (page.path !== "/") {
      const directoryIndex = path.join(root, "dist", page.path.slice(1), "index.html");
      await mkdir(path.dirname(directoryIndex), { recursive: true });
      await writeFile(directoryIndex, html);
    }
  }

  await writeFile(path.join(root, "dist", "sitemap.xml"), sitemap);
  await writeFile(path.join(root, "public", "sitemap.xml"), sitemap);
  console.log(`Prerendered ${pages.length} public pages.`);
} finally {
  await vite.close();
}
