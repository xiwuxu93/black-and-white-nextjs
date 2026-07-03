# `/en/` Homepage Migration Plan for Journey Ads

## Current Decision

Do not implement this now.

Keep the current site structure for at least one week and review Journey ad data before deciding whether the homepage URL migration is worth the SEO risk.

## Goal

Move the main English tool experience from `/` to `/en/` so the primary converter page is no longer technically the site root homepage. The expected monetization benefit is that Journey may treat `/en/` as a normal content page and allow ads there, while users still reach the same experience through a redirect from `/`.

## Important Assessment

This is not a zero-impact SEO change.

It is best treated as a small homepage URL migration:

- Current ranking signals are likely concentrated on `/`.
- Moving the canonical URL to `/en/` can cause short-term crawling, indexing, and ranking volatility.
- Permanent redirects usually consolidate signals, but Google still needs to recrawl and process the change.
- The change should only be made if Journey ad data shows the current structure is leaving meaningful revenue on the table.

## Recommended Approach If We Execute

Use `/en/` as the canonical English homepage and make `/` a permanent redirect.

Preferred behavior:

- `/` -> `308` or `301` -> `/en/`
- `/en/` serves the current English homepage and converter experience.
- `/en/` has a self-referencing canonical.
- `/` should not remain indexable with duplicated English content.

Avoid this:

- Do not keep both `/` and `/en/` indexable with the same English content.
- Do not canonical `/en/` back to `/` if the goal is to make `/en/` the ranking and ad page.
- Do not change all existing subpage URLs at the same time. Keep migration scope small.

## SEO Implementation Checklist

### Routing

- Add `/en/` route that renders the current homepage experience.
- Add a permanent redirect from `/` to `/en/`.
- Keep existing non-homepage URLs unchanged:
  - `/black-and-white-converter/`
  - `/batch-black-and-white-converter/`
  - `/blog/`
  - `/newborn-photography-guide/`
  - etc.

### Canonical

- `/en/` canonical should be `https://bwconverter.com/en/`.
- Remove homepage canonical references pointing to `https://bwconverter.com/` once `/en/` becomes the main URL.
- Keep existing subpage canonicals unchanged unless they currently point to `/` intentionally.

### Hreflang

Because only English exists at first:

```html
<link rel="alternate" hreflang="en" href="https://bwconverter.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://bwconverter.com/en/" />
```

When additional languages are added later, every language version should reference all other versions.

### Sitemap

- Replace `/` with `/en/` in `sitemap.xml`.
- Keep priority high for `/en/`.
- Do not include `/` if it redirects.

### Internal Links

Update homepage links consistently:

- Logo link should point to `/en/` or remain `/` only if the redirect is intentional.
- Header "Home" links should point to `/en/`.
- Footer homepage links should point to `/en/`.
- Structured data URLs should use `/en/`.
- OpenGraph URL should use `/en/`.

### Structured Data

Update the homepage structured data target URL:

- `WebSite.url`
- `WebApplication.url`
- `SoftwareApplication.url`
- `Organization.url`, only if currently treated as homepage-specific

### Robots And Indexing

- Do not noindex `/en/`.
- Let `/` redirect instead of returning indexable content.
- Verify Google can crawl `/en/`.

## Journey Ads Checklist

Before launch:

- Confirm Journey ads are allowed on `/en/`.
- Confirm `/en/` has `article.entry-content.post-content` and flat article-like content structure.
- Confirm no page-builder-style nested wrapper becomes the primary content selector.
- Confirm sidebar ad container remains outside the entry content but inside the main layout.

After launch:

- Check Journey dashboard fill/impression data for `/en/`.
- Check if in-content ads appear inside the article flow.
- Check if ads are missing because Journey still classifies `/en/` as homepage.

## Monitoring Plan

Measure for at least 7 to 14 days after launch:

- Google Search Console indexing status for `/en/`.
- Whether `/` drops from indexed pages and `/en/` replaces it.
- Search clicks and impressions for main keywords.
- Average position for homepage-level queries.
- Journey page RPM and ad impressions for `/en/`.
- User flow from Google result to upload interaction.

## Rollback Plan

Rollback is possible but should not be done repeatedly.

If revenue does not improve or SEO drops materially:

- Restore `/` as the canonical homepage.
- Remove `/` -> `/en/` redirect.
- Redirect `/en/` back to `/` or keep `/en/` as a language page only if it has unique content.
- Restore sitemap homepage entry to `/`.
- Restore homepage structured data and OpenGraph URL to `/`.

Avoid flipping between `/` and `/en/` multiple times in a short period, because it can confuse indexing signals.

## Execution Order

1. Wait one week and collect current Journey ad data.
2. Decide whether the expected ad gain justifies URL migration risk.
3. Implement `/en/` route and homepage redirect in a branch.
4. Update canonical, sitemap, hreflang, internal links, and structured data.
5. Run build and local HTML checks.
6. Deploy during a low-traffic window.
7. Monitor GSC and Journey daily for the first week.

## Current Recommendation

Wait.

The idea is technically sound and likely better for user experience than using a CTA homepage plus a separate converter page, but it should be driven by real ad data. If the current setup performs acceptably, keeping the stable root homepage may be safer for SEO.
