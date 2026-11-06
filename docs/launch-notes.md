# Swift Digital Launch Notes

## Design

The site uses a charcoal and midnight-blue system with Manrope headings, Inter body copy, and small IBM Plex Mono section labels. All routes use real paths rather than hash routing.

Core styles are in `src/index.css`. Shared layouts are in `src/components/Sections.tsx`, and page-level copy is in the page components and `src/content/design.ts`. The service catalogue remains in `src/content/copy.ts`.

## Contact Setup

Confirm the following in `SITE` in `src/content/copy.ts` before launch:

- A real `whatsappHref` in the format `https://wa.me/94771234567`, and the matching published number.
- The real contact email, address or approved location wording, hours, and a response time the team can maintain.
- Approved starting prices, if the agency wants to publish them. Existing price placeholders are intentionally visible on service detail pages.
- Approved founding-team details before replacing the About page placeholder.

The enquiry form prepares a brief locally and offers working copy and text-download actions. It does not claim to submit to an unconfigured backend. A valid WhatsApp URL enables the send action. Until then, WhatsApp buttons open a transparent explanation with a link to the enquiry form.

## Hosting

Build using `npm run build`, then publish `dist`.

- Netlify: the included `_redirects` file maps application routes to `index.html`.
- Apache with mod_rewrite: the included `.htaccess` handles deep links.
- nginx: use `try_files $uri $uri/ /index.html;`.
- Other static hosts: configure an SPA fallback or serve the included `404.html` as the custom error document. The fallback preserves the requested path.

The client's live hosting configuration is not available in this project and must be confirmed at deployment.

## Images, Videos, And Claims

All 11 service photographs and the studio atmosphere visual are sourced from Pexels and stored locally as optimized WebP files in `public/images/`. Thirteen ambient 720p MP4 loops sourced from Pexels are stored locally in `public/videos/` for the hero backdrop, About page, Portfolio concept briefs, and all 11 service detail pages (each paired with a WebP poster fallback and accessible Play/Pause motion controls). Full Pexels attribution IDs and links are documented in `public/images/ASSETS.md`. The hero and two project renders are illustrative product studies. Both portfolio examples are explicitly marked as concepts, not commissioned or launched client work. No client testimonials, identities, awards, or performance results have been invented.

## Verification

`npx tsc --noEmit` and `npm run build` verify types and production output. With Playwright and Chromium installed, `node scripts/verify-site.mjs` checks clean routes, history navigation, all 11 service pages, filters, portfolio disclosures, enquiry preparation/copy/download, the contact dialog, mobile navigation, and six page layouts at six viewport widths. Set `SWIFT_TEST_URL` to test a production preview or another environment.