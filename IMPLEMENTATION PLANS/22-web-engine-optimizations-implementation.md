# Web engine optimizations

Local plan 22. One file for one issue:

- [Show Kramer when someone searches Sterling Plumbing](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/53)

The guide keeps one plan per issue, so the lesson record and the Kramer steps both live here. No code until Benji says yes.

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

Today `index.html` has one title, "Business Name Plumbing & Heating", and no description. `vercel.json` rewrites every path to `/index.html`. There is no `public` folder, no robots.txt, and no sitemap. Public routes worth indexing are `/`, `/services/:slug`, and any new article URLs. `/services`, `/book`, `/about`, and `/contact` only redirect. `/book/:slug`, `/confirmation`, and `/b/:token` are visit flows, not pages to rank. `/admin` and the login routes stay out of the sitemap.

Do the work in this order.

1. **Pre-render the public routes.** Required. A crawler that does not run JavaScript must receive the real title, description, and page text for each public URL, not the single default title. Confirm the catch-all rewrite still lets `/robots.txt` and `/sitemap.xml` through as real files.

2. **On-page, after a pass over the current pages.** Ten plumbing FAQs, written as the question and a direct answer. Three articles a shopper or an answer engine can cite. A visible last-updated date in the footer that changes only when the page actually changes. JSON-LD for the business and for each public page. A title and description on every public page, written as a full sentence a person would search, not a short keyword list.

3. **robots.txt and sitemap.xml.** Allow the public pages. Disallow `/admin`, the login routes, and `/api` if it exists. Do not block CSS or JavaScript. Do not treat robots.txt as the lock on the office. List only working public URLs in the sitemap, one canonical HTTPS lowercase form each. Point robots.txt at the sitemap. Update both files in the same change as any new public page.

4. **Google Search Console.** After the site is deployed on the real domain, add the domain, submit the sitemap, request indexing once, and wait.

5. **Bing Webmaster.** Place the auth file in `public`, redeploy, verify, submit the same sitemap, request indexing, and run a site scan for the page count that is actually live.

6. **Measure, then revise.** Read Search Console, Bing, the Webflow AEO report, and the Semrush free AI-search card. Change the pages from what those reports show. Do not resubmit the same URL to jump a queue.

## Done when

- [ ] A search for "Sterling Plumbing" or a similar local plumbing search shows Kramer.
- [ ] Each public URL is pre-rendered with its own title and description.
- [ ] robots.txt and sitemap.xml match the live public pages.
- [ ] The sitemap is submitted in Google Search Console and Bing Webmaster, and indexing has been requested once.
