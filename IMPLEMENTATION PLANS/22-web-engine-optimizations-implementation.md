# Web engine optimizations

Local plan 22. One file for one issue:

- [Show Kramer when someone searches Sterling Plumbing](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/53)

The guide keeps one plan per issue, so the lesson record and the Kramer steps both live here. Benji approved the build. Coding is underway on pre-rendering and the on-page content.

## Where this stands

Recorded November 9, 2026.

- `public/robots.txt` and `public/sitemap.xml` are live at `https://kramer-son-plumbing-heating.vercel.app`.
- Bing Webmaster is verified with `public/BingSiteAuth.xml`. Leave that file in place.
- Google Search Console is verified as a URL-prefix property, `https://kramer-son-plumbing-heating.vercel.app/`, using the HTML file `public/googlef71615b5ea9b7a7e.html`. Leave that file in place. A domain property was not verified, because that method needs a DNS record on `vercel.app`.
- `sitemap.xml` is submitted in both consoles. Google reports success and 9 discovered pages. Bing's copy is processing.
- Bing indexing was requested once for the homepage. Bing still says the URL cannot appear and indexing is not allowed.
- The Google indexing request was made once on November 9 and again on November 10. Both hit the daily quota. Retry on November 11. Do not resubmit it on November 10.
- A visibility check runs every morning at 7:00 AM local time (`npm run measure`, Windows task "Kramer visibility measurement"). The baseline is in `measurement/baseline.json`. Kramer does not yet appear for Sterling Plumbing, Fort Morgan Plumbing, or the nearby town searches. No backlinks or AI citations for this domain were found.
- Pre-rendering writes a real HTML file per public URL during `npm run build` (`scripts/prerender.mjs`). The on-page content is in the working tree: 10 FAQs, 3 articles, JSON-LD, a title and description on each public page, and a footer last-updated date. This build is not deployed.

## Article pages

Recorded November 10, 2026. These three steps stay on issue 53. This plan does not open a second issue.

1. **Sitemap.** Add these three articles to `sitemap.xml`, one canonical HTTPS URL each, no trailing slash:
   - What to do when a water heater leaks in a Sterling home — `/articles/what-to-do-when-a-water-heater-leaks-in-a-sterling-home`
   - How drain cleaning is priced before the work starts — `/articles/how-drain-cleaning-is-priced-before-the-work-starts`
   - What a no-heat call looks like in northeastern Colorado — `/articles/what-a-no-heat-call-looks-like-in-northeastern-colorado`
   The working-tree sitemap already lists all three, last modified 2026-11-09. The live sitemap still has the previous nine URLs and does not include them.

2. **Pre-render.** `src/lib/publicPages.ts` builds those three paths from `business.articles`. `scripts/prerender.mjs` renders every page that list returns, and writes both `dist/articles/<slug>.html` and `dist/articles/<slug>/index.html`. That is already how the working tree is set up. Until that build is deployed, those live URLs still return the site shell.

3. **Search Console, November 11.** After the daily quota resets, resubmit `sitemap.xml` and request indexing once. On November 10 the homepage and `/services/drain-cleaning` were both "Discovered - currently not indexed," and both indexing requests returned "Quota Exceeded." Do not resubmit or request indexing on November 10.

The repo has no milestone named Demo ready for Monday calls, so this issue is not on it. Benji creates that milestone. This plan does not.

## Outcome

Someone searches "Sterling Plumbing" or a similar local plumbing search and Kramer appears in the results. That is the success criterion for the issue and for this plan.

The seven lessons never name Kramer or Sterling. They walk an AI agency site on Vercel. Kramer is the local shop site, Vite and React. The same sequence applies to the public plumbing pages.

## What the lessons showed

1. **SEO, AEO, GEO.** SEO is keywords, titles, and rankings. AEO is answer-first content, especially FAQs. GEO is being worth citing through quality, authors, and trust. The three work together. AI search uses full sentences, not a handful of keywords. A meaning match can return coffee and tea for "hot beverages" when an exact word match returns nothing. Backlinks from Reddit, YouTube, and social still count. If the site answers the question and is not cited, it loses that visit.

2. **Website code review.** Brainstorm and check the current pages before coding. On the demo agency site the plan was ten FAQs, three articles, a last-updated date in the footer, JSON-LD, metadata on every page, a sitemap, and robots.txt. They shipped that, then committed and deployed. Because Kramer is a Vite and React single-page app, crawlers that do not run JavaScript only see the default title unless the page is pre-rendered. Pre-rendering is required.

3. **Robots and sitemaps.** Robots controls access. The sitemap lists only real working pages. Use one canonical HTTPS lowercase URL, with no www and no tracking parameters. Do not block CSS or JavaScript. Do not use robots as the lock on private pages. Those pages need real authorization. Update both files when pages change. Do not fake freshness. A leftover `Disallow: /` blocks the whole site. After deploy, open `/sitemap.xml` and check the homepage with `curl -I`. Expect status 200.

4. **Google Search Console.** Add the domain with the bare name, no `https://` and no `www`. Submit `sitemap.xml`. Request indexing once, then wait. Submitting again does not jump the queue. If ownership is not automatic, add the DNS record at the domain host. If the domain changes, update robots.txt and every sitemap location.

5. **Bing Webmaster.** Bing Webmaster also covers Yahoo. Put the Bing auth file in the public folder, not the project root. Redeploy, verify, submit the same sitemap, request indexing, and run a site scan limited to the real page count. Wait one or two days. The tools there can also confirm that robots.txt is reachable.

6. **Measurement.** Search Console and Bing are the primary checks. A Webflow AEO check needs a business email, not Gmail, and emails back the top priorities. Semrush's free AI-search card shows mentions, citations, keywords, and backlinks, including a Google-only filter. Use those reports to go back and improve the site. A new site will score poorly while it is still being indexed.

## What Kramer builds

The source `index.html` still starts from the placeholder title. The production build replaces that title per URL. `vercel.json` rewrites unknown paths to `/index.html`, and real files such as `robots.txt` and `sitemap.xml` are served first. Public routes worth indexing are `/`, `/services/:slug`, and `/articles/:slug`. `/services`, `/book`, `/about`, and `/contact` only redirect. `/book/:slug`, `/confirmation`, and `/b/:token` are visit flows, not pages to rank. `/admin` and the login routes stay out of the sitemap.

Do the work in this order.

1. **Pre-render the public routes.** Required. A crawler that does not run JavaScript must receive the real title, description, and page text for each public URL, not the single default title. Confirm the catch-all rewrite still lets `/robots.txt` and `/sitemap.xml` through as real files.

2. **On-page, after a pass over the current pages.** Ten plumbing FAQs, written as the question and a direct answer. Three articles a shopper or an answer engine can cite. A visible last-updated date in the footer that changes only when the page actually changes. JSON-LD for the business and for each public page. A title and description on every public page, written as a full sentence a person would search, not a short keyword list.

3. **robots.txt and sitemap.xml.** Allow the public pages. Disallow `/admin`, the login routes, and `/api` if it exists. Do not block CSS or JavaScript. Do not treat robots.txt as the lock on the office. List only working public URLs in the sitemap, one canonical HTTPS lowercase form each. Point robots.txt at the sitemap. Update both files in the same change as any new public page.

4. **Google Search Console.** After the site is deployed on the real domain, add the domain, submit the sitemap, request indexing once, and wait.

5. **Bing Webmaster.** Place the auth file in `public`, redeploy, verify, submit the same sitemap, request indexing, and run a site scan for the page count that is actually live.

6. **Measure, then revise.** Read Search Console, Bing, the Webflow AEO report, and the Semrush free AI-search card. Change the pages from what those reports show. Do not resubmit the same URL to jump a queue.

## Done when

- [ ] A search for "Sterling Plumbing" or a similar local plumbing search shows Kramer.
- [x] Each public URL is pre-rendered with its own title and description.
- [ ] robots.txt and sitemap.xml match the live public pages.
- [ ] The sitemap is submitted in Google Search Console and Bing Webmaster, and indexing has been requested once.
