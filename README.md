# Swift Ads

Static website for Swift Ads, a digital growth and marketing agency.

## Pages

- `index.html` — homepage and primary contact section
- `services.html` — overview of services
- `advertising.html` — paid advertising overview
- `ads-google.html` — Google Ads management
- `ads-meta.html` — Facebook and Instagram advertising
- `ads-pinterest.html` — Pinterest advertising
- `ads-tiktok.html` — TikTok advertising
- `service-*.html` — individual service pages
- `webmasters.html` — separate Webmasters page; maintained independently

## Running locally

No build step or package installation is required.

1. Clone the repository.
2. Open the project folder in a local static server (for example, VS Code Live Server).
3. Visit `http://localhost:5500` or the URL provided by your server.

The site currently uses Tailwind CSS via its CDN and Google Fonts. An internet connection is required for those hosted assets.

## Deployment

Deploy the repository root as a static site. Keep the HTML pages at the root so their relative navigation links continue to work.

## Maintenance notes

- Update internal navigation links when adding, renaming or removing pages.
- Keep page titles, meta descriptions and contact details accurate.
- Test desktop and mobile layouts after visual changes.
- Respect reduced-motion preferences and retain keyboard-visible focus styles.
- Avoid adding a build system or dependencies unless a real requirement calls for them.
