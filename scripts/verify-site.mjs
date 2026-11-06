import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.SWIFT_TEST_URL || 'http://localhost:5173';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
const page = await context.newPage();
const failures = [];
page.on('pageerror', (error) => failures.push(error.message));
page.on('response', (response) => { if (response.status() >= 400 && response.url().startsWith(base)) failures.push(`${response.status()} ${response.url()}`); });

async function visit(path) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.locator('main h1').waitFor();
}

async function noOverflow(label) {
  const result = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
  assert(result.content <= result.viewport + 1, `${label}: overflow ${JSON.stringify(result)}`);
}

try {
  await visit('/');
  assert.equal(await page.locator('h1').count(), 1);
  assert.match(await page.locator('h1').innerText(), /Swift Digital/);
  assert.equal(await page.locator('.hero-media img').evaluate((image) => image.complete && image.naturalWidth > 0), true);
  assert.equal(await page.locator('.hero-video video').getAttribute('src'), '/videos/hero-ambient.mp4');
  await page.evaluate(() => { window.__navigationMarker = 'same-document'; });
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Services', exact: true }).click();
  await page.waitForURL('**/services');
  assert.equal(await page.evaluate(() => window.__navigationMarker), 'same-document');
  assert.equal(await page.locator('.service-tile').count(), 11);

  const filters = [['Design & development', 4], ['Marketing & growth', 3], ['Software & automation', 4], ['All services', 11]];
  for (const [name, count] of filters) {
    await page.getByRole('button', { name, exact: true }).click();
    assert.equal(await page.locator('.service-tile').count(), count);
    assert.equal(await page.getByRole('button', { name, exact: true }).getAttribute('aria-pressed'), 'true');
  }
  const serviceLinks = await page.locator('.service-tile').evaluateAll((elements) => elements.map((element) => element.getAttribute('href')));
  for (const href of serviceLinks) {
    await visit(href);
    assert.equal(await page.locator('.deliverable-list li').count(), 5, `${href} deliverables`);
    const videoInfo = await page.locator('.service-detail-photo video').evaluate((v) => ({
      src: v.getAttribute('src'),
      poster: v.getAttribute('poster'),
    }));
    assert.match(videoInfo.src || '', /^\/videos\/[a-z0-9-]+\.mp4$/);
    assert.match(videoInfo.poster || '', /^\/images\/services\/[a-z0-9-]+\.webp$/);
    await noOverflow(href);
  }

  await visit('/services/ai-automations');
  await page.getByRole('link', { name: 'Discuss your project' }).click();
  await page.waitForURL('**/contact?service=ai-automations');
  assert.equal(await page.getByRole('button', { name: 'AI Automations', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.getByLabel('Your name').fill('Test Project Owner');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('Business name').fill('Test business');
  await page.getByLabel('Tell us about your project').fill('We need a website and a more efficient enquiry workflow for our business.');
  await page.getByRole('button', { name: 'Prepare project enquiry' }).click();
  await page.getByRole('heading', { name: 'Your enquiry is ready.' }).waitFor();
  assert.match(await page.locator('.enquiry-result pre').innerText(), /AI Automations/);
  await page.getByRole('button', { name: 'Copy enquiry' }).click();
  await page.waitForFunction(() => document.querySelector('.copy-notice')?.textContent?.length);
  assert.match(await page.locator('.copy-notice').innerText(), /Enquiry copied/);
  assert.match(await page.evaluate(() => navigator.clipboard.readText()), /Test Project Owner/);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download brief' }).click();
  assert.equal((await downloadPromise).suggestedFilename(), 'swift-digital-project-enquiry.txt');

  await page.getByRole('button', { name: 'Chat on WhatsApp', exact: true }).first().click();
  await page.getByRole('dialog').waitFor();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(), 0);

  await visit('/portfolio#hospitality');
  assert.equal(await page.locator('#brief-hospitality').isVisible(), true);
  await page.locator('#hospitality').getByRole('button', { name: 'Close concept brief' }).click();
  assert.equal(await page.locator('#brief-hospitality').isVisible(), false);
  await page.locator('#hospitality').getByRole('button', { name: 'Read concept brief' }).click();
  assert.equal(await page.locator('#brief-hospitality').isVisible(), true);

  for (const path of ['/about', '/services', '/portfolio', '/contact', '/services/seo', '/no-such-page', '/services/no-such-service']) {
    await visit(path);
    assert.equal(await page.locator('main h1').count(), 1, `${path} heading`);
    await noOverflow(path);
    if (path.includes('no-such')) assert.match(await page.locator('h1').innerText(), /small detour/i);
  }

  await visit('/');
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'About', exact: true }).click();
  await page.goBack();
  assert.match(await page.locator('h1').innerText(), /Swift Digital/);
  await page.goForward();
  assert.match(await page.locator('h1').innerText(), /small team/i);
  await visit('/?p=%2Fservices%2Fseo');
  assert.equal(new URL(page.url()).pathname, '/services/seo');
  await visit('/#/about');
  assert.equal(new URL(page.url()).pathname, '/about');

  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/services', '/services/business-management-software', '/about', '/portfolio', '/contact']) {
      await visit(path);
      await noOverflow(`${path} at ${width}px`);
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await visit('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  assert.equal(await page.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded'), 'true');
  await page.getByRole('navigation', { name: 'Mobile navigation', exact: true }).getByRole('link', { name: 'Services', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/services');
  assert.equal(await page.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false');

  assert.deepEqual(failures, []);
  console.log('PASS: clean navigation, back/forward, fallback and legacy links, 11 service pages, filters, concept disclosures, enquiry preparation/copy/download, WhatsApp dialog, mobile menu, and 36 responsive page/viewport checks.');
} finally {
  await browser.close();
}