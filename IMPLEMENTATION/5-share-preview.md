# Issue 5 — share preview (metadata only)

## Outcome
A shared link shows Business Name Plumbing & Heating, not Bolt and not the Meta Tags placeholder.

## Scope this pass
Open Graph and X card tags, plus a 1200×630 image. README rewrite and the package rename stay on the issue.

## Tags
One static set in `index.html`, because crawlers do not run the React app. Same card for every route.

- Google: `title`, `description`
- Facebook, LinkedIn, Slack, Pinterest, Instagram DMs: Open Graph
- X: `twitter:card` = `summary_large_image` plus title, description, image

Image: `public/og.png`, absolute URL `https://kramer-son-plumbing-heating.vercel.app/og.png`.

## Verify
- Built `index.html` contains `og:title`, `og:image`, and `twitter:image`
- `og.png` is 1200×630
- No `bolt.new` in the tags
