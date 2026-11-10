/**
 * Daily visibility check for the Kramer demo site.
 * Compares live public signals, plus any console snapshot, to measurement/baseline.json.
 * Does not submit URLs to Google or Bing.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "measurement");
const SITE = "https://kramer-son-plumbing-heating.vercel.app";
const DOMAIN = "kramer-son-plumbing-heating.vercel.app";
const QUERIES = [
  "Sterling Plumbing",
  "Fort Morgan Plumbing",
  "plumber Sterling Colorado",
  "Brush Colorado plumber",
  "Greeley plumber",
];

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "KramerVisibilityCheck/1.0" },
    signal: AbortSignal.timeout(20000),
  });
  return {
    status: response.status,
    type: response.headers.get("content-type") || "",
    body: await response.text(),
  };
}

function tag(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].replace(/&amp;/g, "&").trim() : "";
}

async function liveSite() {
  const page = await fetchText(`${SITE}/`);
  const robots = await fetchText(`${SITE}/robots.txt`);
  const sitemap = await fetchText(`${SITE}/sitemap.xml`);
  const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  return {
    status: page.status,
    title: tag(page.body, /<title>([^<]*)<\/title>/i),
    description: tag(page.body, /<meta name="description" content="([^"]*)"/i),
    canonical: tag(page.body, /<link rel="canonical" href="([^"]*)"/i),
    jsonLd: /application\/ld\+json/i.test(page.body),
    robotsStatus: robots.status,
    robotsIsText: robots.type.includes("text/plain"),
    sitemapStatus: sitemap.status,
    sitemapUrls: urls.length,
  };
}

async function searchQuery(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    const result = await fetchText(url);
    const blocked = result.status !== 200 || /anomaly|captcha|challenge/i.test(result.body.slice(0, 500));
    if (blocked) return { query, status: "unavailable", domainVisible: null };
    return {
      query,
      status: "checked",
      domainVisible: result.body.toLowerCase().includes(DOMAIN),
    };
  } catch {
    return { query, status: "unavailable", domainVisible: null };
  }
}

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return null;
  }
}

function consoleFromEnv(file) {
  const googleIndex = process.env.GSC_HOMEPAGE_INDEX || file?.google?.homepageIndex || null;
  const bingAllowed = process.env.BING_INDEXING_ALLOWED;
  return {
    google: {
      homepageIndex: googleIndex,
      sitemap: file?.google?.sitemap ?? null,
      discoveredPages: file?.google?.discoveredPages ?? null,
    },
    bing: {
      sitemap: file?.bing?.sitemap ?? null,
      homepageIndexingAllowed:
        bingAllowed == null ? (file?.bing?.homepageIndexingAllowed ?? null) : bingAllowed === "true",
      siteScan: file?.bing?.siteScan ?? null,
    },
    source: process.env.GSC_HOMEPAGE_INDEX || process.env.BING_INDEXING_ALLOWED ? "env" : file ? "measurement/console.json" : "none",
  };
}

function flatten(value, prefix = "") {
  if (value == null || typeof value !== "object") return { [prefix]: value };
  if (Array.isArray(value)) {
    return Object.fromEntries(value.flatMap((item, index) => Object.entries(flatten(item, `${prefix}[${index}]`))));
  }
  return Object.fromEntries(
    Object.entries(value).flatMap(([key, child]) => Object.entries(flatten(child, prefix ? `${prefix}.${key}` : key))),
  );
}

function diff(baseline, latest) {
  const before = flatten(baseline.signals);
  const after = flatten(latest.signals);
  const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
  return keys
    .filter((key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]))
    .filter((key) => after[key] !== null)
    .map((key) => ({ field: key, baseline: before[key] ?? null, latest: after[key] }));
}

function report(latest, changes, created) {
  const lines = [
    `# Visibility check ${latest.capturedAt}`,
    "",
    created ? "First run. This file is the baseline." : `Changes since the baseline: ${changes.length}.`,
    "",
  ];
  if (!created && changes.length === 0) lines.push("No measured field changed.");
  for (const change of changes) {
    lines.push(`- ${change.field}: ${JSON.stringify(change.baseline)} -> ${JSON.stringify(change.latest)}`);
  }
  lines.push(
    "",
    "Retrace when Search Console shows the homepage indexed, or when Bing indexing allowed flips to true.",
    "Those values are read from measurement/console.json, or from GSC_HOMEPAGE_INDEX and BING_INDEXING_ALLOWED.",
    "This check does not resubmit a sitemap or an indexing request.",
  );
  return `${lines.join("\n")}\n`;
}

const site = await liveSite();
const queries = [];
for (const query of QUERIES) queries.push(await searchQuery(query));
const consoleSnapshot = consoleFromEnv(await readJson(join(dir, "console.json")));
const signals = {
  site,
  queries,
  domainVisibleForAnyQuery: queries.some((item) => item.domainVisible === true),
  console: consoleSnapshot,
};

await mkdir(dir, { recursive: true });
const baselinePath = join(dir, "baseline.json");
const existing = await readJson(baselinePath);
const created = !existing;
const latest = { capturedAt: new Date().toISOString(), signals };
const baseline = existing ?? latest;
const changes = created ? [] : diff(baseline, latest);
await writeFile(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
await writeFile(join(dir, "latest.json"), `${JSON.stringify(latest, null, 2)}\n`);
await writeFile(join(dir, "delta.md"), report(latest, changes, created));

console.log(created ? "Baseline stored." : `Changes: ${changes.length}`);
console.log(join(dir, "delta.md"));
