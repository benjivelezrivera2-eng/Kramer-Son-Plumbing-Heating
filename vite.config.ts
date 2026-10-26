import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { business } from "./src/config/business";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function shareMeta(): Plugin {
  const title = escapeHtml(business.fullName);
  const description = escapeHtml(business.shareDescription);
  const url = business.siteUrl;
  const image = `${url}/og.png?v=2`;
  const alt = escapeHtml(`${business.name} ${business.niche}`);

  const tags = `
<meta name="description" content="${description}" />
<meta name="theme-color" content="#142033" />
<link rel="canonical" href="${url}/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${escapeHtml(business.name)}" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="${url}/" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:secure_url" content="${image}" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${alt}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
<meta name="twitter:image:alt" content="${alt}" />
`;

  return {
    name: "share-meta",
    transformIndexHtml(html) {
      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
        .replace("</head>", `${tags}</head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), shareMeta()],
  base: "/",
});
