import {
  MonitorSmartphone,
  Megaphone,
  Search,
  Share2,
  Palette,
  ShoppingBag,
  Bot,
  Server,
  LayoutDashboard,
  Code2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Global elements                                                     */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "Swift Digital",
  domain: "swiftdigital.online",
  tagline: "Digital work that moves your business forward.",
  taglineAlts: [
    "Websites, marketing and software — built to last.",
    "Built in Colombo. Working everywhere.",
  ],
  location: "Colombo, Sri Lanka",
  languages: ["English", "සිංහල", "தமிழ்"],
  nav: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Contact", to: "/contact" },
  ],
  headerCta: "Get a free quote",
  whatsappLabel: "Chat on WhatsApp",
  whatsappNumber: "[PLACEHOLDER: WhatsApp number, e.g. 94771234567]",
  whatsappHref: "", // Set the confirmed wa.me URL before launch.
  email: "[PLACEHOLDER: e.g. hello@swiftdigital.online]",
  addressLines: [
    "[PLACEHOLDER: street address]",
    "Colombo, Sri Lanka",
  ],
  responsePromise: "[PLACEHOLDER: e.g. within 1 business day]",
  trustLine:
    "Proudly based in Colombo, Sri Lanka — serving clients across the island and overseas.",
  copyright:
    "© [PLACEHOLDER: year — set at launch] Swift Digital · swiftdigital.online · All rights reserved.",
  socials: "[PLACEHOLDER: social media profile URLs]",
  mapsEmbed: "[PLACEHOLDER: Google Maps embed / business hours]",
};

/* ------------------------------------------------------------------ */
/* Stack ticker — tools & platforms we work with                       */
/* ------------------------------------------------------------------ */

export const STACK_A = [
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "Tailwind CSS",
  "Laravel",
  "PHP",
  "MySQL",
  "PostgreSQL",
  "REST APIs",
  "Vercel",
  "AWS",
  "Cloudflare",
];

export const STACK_B = [
  "Google Ads",
  "Meta Business",
  "GA4",
  "Search Console",
  "Google Business Profile",
  "WhatsApp Cloud API",
  "Stripe",
  "PayHere",
  "Web.dev",
  "Schema.org",
  "Mailchimp",
  "Brevo",
  "Zapier",
  "n8n",
];

/* ------------------------------------------------------------------ */
/* SEO                                                                 */
/* ------------------------------------------------------------------ */

export const SEO = {
  home: {
    title: "Swift Digital — Web Design & Digital Agency in Sri Lanka",
    description:
      "Colombo-based digital agency for web design, SEO, marketing, e-commerce & software. Fair pricing, fast delivery, English/Sinhala/Tamil.",
  },
  about: {
    title: "About Swift Digital — Digital Agency in Colombo, Sri Lanka",
    description:
      "Meet Swift Digital: a small, honest digital agency in Colombo building websites, marketing and software for Sri Lankan businesses. EN/SI/TA.",
  },
  services: {
    title: "Services — Web, Marketing, SEO, Software | Swift Digital",
    description:
      "Full-stack digital services from one Colombo team: web design, digital marketing, SEO, social media, branding, e-commerce, AI automations and more.",
  },
  portfolio: {
    title: "Portfolio & Concept Projects — Swift Digital Sri Lanka",
    description:
      "Honest portfolio from a new Colombo agency: concept projects for a boutique hotel website and a Ceylon tea e-commerce store. Live work added as it launches.",
  },
  contact: {
    title: "Contact Swift Digital — Colombo, Sri Lanka",
    description:
      "Contact Swift Digital in Colombo for a free, no-pressure quote on websites, SEO, marketing or software. WhatsApp, email or form.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  slug: string;
  num: string;
  name: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  video: string;
  oneLiner: string;
  body: string;
  bullets: string[];
  idealFor: string;
  pricing: string;
  seoTitle: string;
  seoDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: "web-design-development",
    num: "01",
    name: "Web Design & Development",
    icon: MonitorSmartphone,
    image: "/images/services/web-design-development.webp",
    imageAlt: "Laptop displaying web development code in a dark studio workspace",
    video: "/videos/web-design-development.mp4",
    oneLiner: "Modern, fast, mobile-first websites your customers can actually use.",
    body: "Your website is often the first impression customers get — and in Sri Lanka, most of them will see it on a phone first. We design and build custom, mobile-first websites for SMEs, hotels and professional services: fast to load, easy for you to update, and built with stable, well-documented code. No bloated templates, no lock-in.",
    bullets: [
      "Mobile-first, responsive design",
      "Custom design matched to your brand",
      "Performance-optimised, stable development",
      "CMS setup so you can edit content yourself",
      "Contact forms, WhatsApp integration & analytics",
    ],
    idealFor: "SMEs, hotels & guesthouses, professional services, startups.",
    pricing:
      "Starting from: LKR [PLACEHOLDER] (single-page) / LKR [PLACEHOLDER] (multi-page). Final quote depends on pages, features and content.",
    seoTitle: "Web Design & Development in Sri Lanka | Swift Digital",
    seoDescription:
      "Custom, mobile-first websites for Sri Lankan businesses — designed and developed in Colombo. Fair pricing, fast delivery, easy to manage.",
  },
  {
    slug: "digital-marketing",
    num: "02",
    name: "Digital Marketing",
    icon: Megaphone,
    image: "/images/services/digital-marketing.webp",
    imageAlt: "Close-up of a low-light digital interface displaying campaign analytics and graphs",
    video: "/videos/digital-marketing.mp4",
    oneLiner: "Campaigns that put your business in front of the right people.",
    body: "We plan and manage paid campaigns on Google and Meta (Facebook & Instagram) for businesses that want measurable results, not jargon. You get a clear strategy, careful budget management, and a monthly report written in plain language — in English, Sinhala or Tamil. Ad spend always goes directly to the platforms; our fee is separate and fixed.",
    bullets: [
      "Google Ads & Meta (Facebook/Instagram) campaigns",
      "Audience targeting and campaign strategy",
      "Landing page recommendations to improve conversion",
      "Budget management and ongoing optimisation",
      "Monthly reporting in plain language",
    ],
    idealFor: "SMEs, e-commerce brands, hotels, lead-generation businesses.",
    pricing:
      "Management fee from LKR [PLACEHOLDER]/month + ad spend paid directly to the platforms.",
    seoTitle: "Digital Marketing Agency Sri Lanka | Swift Digital",
    seoDescription:
      "Google Ads and social media campaigns managed for Sri Lankan SMEs and e-commerce brands. Transparent reporting, fair monthly fees.",
  },
  {
    slug: "seo",
    num: "03",
    name: "SEO",
    icon: Search,
    image: "/images/services/seo.webp",
    imageAlt: "Laptop glowing in a dark room overlooking a night cityscape",
    video: "/videos/seo.mp4",
    oneLiner: "Get found on Google by customers already searching for what you sell.",
    body: "Search engine optimisation helps people discover your business when they search for the products or services you offer. We handle keyword research (including Sinhala and Tamil search terms), technical fixes, on-page optimisation and local SEO so customers in Colombo — or overseas buyers — can actually find you. Every month you get a ranking report you can understand.",
    bullets: [
      "Keyword research for local & export markets (EN/SI/TA)",
      "Technical & on-page SEO fixes",
      "Google Business Profile setup and optimisation",
      "Local SEO for Colombo and island-wide reach",
      "Monthly ranking and traffic reports",
    ],
    idealFor: "Hotels, local service businesses, e-commerce, exporters.",
    pricing:
      "One-off audits from LKR [PLACEHOLDER]; ongoing SEO from LKR [PLACEHOLDER]/month.",
    seoTitle: "SEO Services Sri Lanka | Get Found on Google | Swift Digital",
    seoDescription:
      "SEO for Sri Lankan businesses: keyword research, technical fixes, local SEO and monthly reporting. Get found on Google with Swift Digital, Colombo.",
  },
  {
    slug: "social-media-management",
    num: "04",
    name: "Social Media Management",
    icon: Share2,
    image: "/images/services/social-media-management.webp",
    imageAlt: "Smartphone and dual displays in a dark creative studio",
    video: "/videos/social-media-management.mp4",
    oneLiner: "Consistent, on-brand content that keeps your customers engaged.",
    body: "Most Sri Lankan businesses don't need more posts — they need better ones, posted consistently, in the language their customers actually speak. We plan monthly content calendars, design the posts, manage Facebook and Instagram, reply to comments and DMs, and report on what's working. Content can be produced in English, Sinhala and Tamil.",
    bullets: [
      "Monthly content calendar & post design",
      "Facebook & Instagram page management",
      "Comment and DM responses",
      "Content in English, Sinhala and Tamil",
      "Monthly performance reports & paid promotion when it makes sense",
    ],
    idealFor: "Hotels, restaurants, retail brands, e-commerce, professional services.",
    pricing:
      "From LKR [PLACEHOLDER]/month, depending on platforms and post volume.",
    seoTitle: "Social Media Management Sri Lanka | Swift Digital",
    seoDescription:
      "Facebook & Instagram management for Sri Lankan brands — content in English, Sinhala and Tamil, with monthly reports. From Swift Digital, Colombo.",
  },
  {
    slug: "branding",
    num: "05",
    name: "Branding & Identity",
    icon: Palette,
    image: "/images/services/branding.webp",
    imageAlt: "Minimalist brand identity card resting on dark stone",
    video: "/videos/branding.mp4",
    oneLiner: "A brand identity customers remember — logo, colours, voice and guidelines.",
    body: "Branding is more than a logo — it's how your business looks, sounds and feels everywhere. We design complete identity systems for new businesses and refreshes for established ones, and we hand over a practical guidelines document so your brand stays consistent on every channel.",
    bullets: [
      "Logo & visual identity design",
      "Colour palette & typography system",
      "Brand voice and messaging basics",
      "Brand guidelines document",
      "Business cards, stationery & social media kit",
    ],
    idealFor: "Startups, new SMEs, businesses rebranding after growth.",
    pricing: "Brand identity packages from LKR [PLACEHOLDER].",
    seoTitle: "Branding & Logo Design Sri Lanka | Swift Digital",
    seoDescription:
      "Logo design and brand identity for Sri Lankan startups and SMEs. Clear packages, fair pricing, delivered by Swift Digital in Colombo.",
  },
  {
    slug: "ecommerce",
    num: "06",
    name: "E-commerce",
    icon: ShoppingBag,
    image: "/images/services/ecommerce.webp",
    imageAlt: "Online checkout with a laptop and payment card in ambient low light",
    video: "/videos/ecommerce.mp4",
    oneLiner: "Online stores that sell — built to handle Sri Lankan payments and delivery.",
    body: "We build e-commerce stores that work for how Sri Lankans actually buy and sell: local payment gateways, cash-on-delivery where it makes sense, delivery-zone shipping, and a product catalogue that's easy for you to manage. Whether you sell island-wide or export Ceylon products overseas, the store is designed to convert visitors into orders.",
    bullets: [
      "Product catalogue & checkout design",
      "Local & international payment gateway integration",
      "Shipping zones, delivery options & COD support",
      "Inventory & order management",
      "Analytics and conversion tracking",
    ],
    idealFor: "Product brands, tea/spice exporters, fashion, gift shops.",
    pricing:
      "Stores from LKR [PLACEHOLDER]; final quote depends on product count and integrations.",
    seoTitle: "E-commerce Development Sri Lanka | Online Stores | Swift Digital",
    seoDescription:
      "E-commerce websites for Sri Lankan brands — product pages, local payments, shipping and order management. Built by Swift Digital, Colombo.",
  },
  {
    slug: "ai-automations",
    num: "07",
    name: "AI Automations",
    icon: Bot,
    image: "/images/services/ai-automations.webp",
    imageAlt: "Deep-blue neural network connections representing AI workflow automation",
    video: "/videos/ai-automations.mp4",
    oneLiner: "Automate repetitive work with AI — chatbots, follow-ups and document processing.",
    body: "Not every business needs AI — but when repetitive tasks are eating your team's week, it can pay for itself fast. We build practical AI automations: WhatsApp and website chatbots that qualify leads, automated follow-up messages, document and data extraction, and workflow automation — always with a human check where accuracy matters.",
    bullets: [
      "WhatsApp & website chatbots (EN/SI/TA)",
      "Automated email, WhatsApp & lead follow-ups",
      "Document and data extraction",
      "Booking, order and enquiry workflow automation",
      "Human-in-the-loop review where accuracy is critical",
    ],
    idealFor: "Hotels, clinics, e-commerce, any business with repetitive admin.",
    pricing:
      "Scoped per automation from LKR [PLACEHOLDER]; pilot projects available.",
    seoTitle: "AI Automation Services Sri Lanka | Swift Digital",
    seoDescription:
      "AI automations for Sri Lankan businesses: chatbots, lead follow-up and workflow automation that save hours every week. By Swift Digital, Colombo.",
  },
  {
    slug: "hosting-domains",
    num: "08",
    name: "Hosting & Domains",
    icon: Server,
    image: "/images/services/hosting-domains.webp",
    imageAlt: "Server rack infrastructure illuminated by blue lighting in a secure data center",
    video: "/videos/hosting-domains.mp4",
    oneLiner: "Fast, secure hosting with domains, SSL and backups handled for you.",
    body: "Hosting is where cheap providers quietly cost you customers: slow sites, downtime and no support. We set up fast, secure hosting with SSL, daily backups and uptime monitoring, register your domain (.com, .lk and more), and create your business email — then we keep it all running and patched.",
    bullets: [
      "Domain registration (.com, .lk and more)",
      "Fast, secure hosting with free SSL",
      "Daily backups & uptime monitoring",
      "Business email setup (e.g. you@yourdomain.lk)",
      "Maintenance, updates & security patches",
    ],
    idealFor: "Every website we build — and existing sites that need a reliable home.",
    pricing:
      "Hosting from LKR [PLACEHOLDER]/year; domains at registrar cost plus setup.",
    seoTitle: "Web Hosting Sri Lanka | Domains, SSL & Backups | Swift Digital",
    seoDescription:
      "Reliable web hosting with domains, SSL, daily backups and business email — managed by Swift Digital in Colombo, Sri Lanka.",
  },
  {
    slug: "business-management-software",
    num: "09",
    name: "Business Management Software",
    icon: LayoutDashboard,
    image: "/images/services/business-management-software.webp",
    imageAlt: "Operations team reviewing real-time software dashboards across monitors in low light",
    video: "/videos/business-management-software.mp4",
    oneLiner: "Simple software to run daily operations — sales, bookings, inventory, staff.",
    body: "If your business still runs on WhatsApp threads and spreadsheets, you're losing time and making avoidable mistakes. We build lightweight management systems tailored to how you actually work — sales and invoicing, bookings, inventory, staff tasks and reports — in one dashboard your team can use on any device.",
    bullets: [
      "Custom dashboards & management reports",
      "Sales, quotations & invoicing",
      "Booking / appointment scheduling",
      "Inventory & supplier tracking",
      "Role-based access for owners and staff",
    ],
    idealFor: "SMEs, hotels, retail, clinics, service companies with growing operations.",
    pricing:
      "From LKR [PLACEHOLDER] depending on modules; monthly SaaS option LKR [PLACEHOLDER]/month.",
    seoTitle: "Business Management Software Sri Lanka | Swift Digital",
    seoDescription:
      "Custom business management software for Sri Lankan SMEs — sales, bookings, inventory and reporting in one dashboard. By Swift Digital, Colombo.",
  },
  {
    slug: "bespoke-software",
    num: "10",
    name: "Bespoke Software",
    icon: Code2,
    image: "/images/services/bespoke-software.webp",
    imageAlt: "Dark monitor displaying custom software architecture and source code",
    video: "/videos/bespoke-software.mp4",
    oneLiner: "Software built around your exact process — web apps, portals, integrations.",
    body: "Off-the-shelf software forces your business to change; bespoke software changes to fit your business. We design and develop custom web applications, customer portals and internal tools — from the first process-mapping workshop to launch and ongoing iteration. Stable architecture, documented code, and a team that stays reachable after launch.",
    bullets: [
      "Requirements & process-mapping workshop",
      "Custom web applications & dashboards",
      "Customer / member / patient portals",
      "API integrations (payments, SMS, WhatsApp, ERP)",
      "Ongoing support, monitoring & iteration",
    ],
    idealFor: "Businesses whose process doesn't fit any template — locally and overseas.",
    pricing:
      "Quoted per project after a free scoping call. Ballpark: LKR [PLACEHOLDER].",
    seoTitle: "Custom Software Development Sri Lanka | Swift Digital",
    seoDescription:
      "Bespoke software and web applications for Sri Lankan businesses — portals, integrations and internal tools. Swift Digital, Colombo.",
  },
  {
    slug: "business-automations",
    num: "11",
    name: "Business Automations",
    icon: Workflow,
    image: "/images/services/business-automations.webp",
    imageAlt: "Macro view of a circuit board with blue illumination representing connected systems",
    video: "/videos/business-automations.mp4",
    oneLiner: "Connect your tools and remove manual copy-paste work.",
    body: "The most expensive work in most businesses isn't creative — it's copying the same information between systems. We audit your workflows, then automate the repetitive parts: order notifications, report generation, CRM updates, reminders and data sync between the tools you already use. Less manual work, fewer errors, more time for customers.",
    bullets: [
      "Workflow audit & automation mapping",
      "CRM, spreadsheet & database automation",
      "Automated notifications (WhatsApp / SMS / email)",
      "Scheduled report generation",
      "Integrations with your existing tools",
    ],
    idealFor: "Growing SMEs whose admin is scaling faster than their team.",
    pricing:
      "From LKR [PLACEHOLDER] per workflow; bundle discounts LKR [PLACEHOLDER].",
    seoTitle: "Business Automation Services Sri Lanka | Swift Digital",
    seoDescription:
      "Automate repetitive tasks — workflows, notifications and reports — with Swift Digital's business automation services in Colombo, Sri Lanka.",
  },
];

export const servicesPage = {
  h1: "What we do",
  sub: "Full-stack digital services from one Colombo team — design, marketing, software and everything in between. Pick one service or bundle them; the quote stays transparent either way.",
};

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const HOME = {
  seo: SEO.home,
  hero: {
    h1a: "Digital work that moves",
    h1Accent: "your business",
    h1b: "forward.",
    sub: "Swift Digital is a Colombo-based digital agency building websites, running marketing campaigns and developing software for SMEs, hotels and e-commerce brands — in Sri Lanka and overseas. Fair pricing, fast delivery, and communication in English, Sinhala or Tamil.",
    ctaPrimary: "Get a free quote",
    ctaSecondary: "Explore our services",
    chips: ["Colombo, Sri Lanka", "EN · සිංහල · தமிழ்", "Fair pricing", "Fast delivery", "AI-assisted workflows"],
  },
  servicesOverview: {
    eyebrow: "What we do",
    h2: "Everything your business needs to grow online",
    body: "One team for your whole digital presence — from your first website to the software that runs your day-to-day. No hand-offs between agencies, no surprises on the invoice.",
    cta: "See all services",
  },
  whyUs: {
    eyebrow: "Why Swift Digital",
    h2: "A new agency — with old-fashioned standards",
    body: "We're a small founding team, and we intend to stay easy to talk to. Here's what that means for you:",
    points: [
      {
        title: "Fair, transparent pricing",
        text: "Clear quotes before we start. No hidden fees, no inflated “agency rates”.",
      },
      {
        title: "Fast delivery",
        text: "We ship quickly because our process is tight — not because we cut corners.",
      },
      {
        title: "Built to last",
        text: "Stable, well-documented development you can maintain with any developer — including us.",
      },
      {
        title: "Trilingual by default",
        text: "English, Sinhala and Tamil — your customers get to choose their language.",
      },
      {
        title: "AI-assisted workflows",
        text: "We use AI where it genuinely saves time and cost — and we tell you when we do.",
      },
    ],
    cta: "Talk to us about your project",
  },
  portfolioTeaser: {
    eyebrow: "Our work",
    h2: "Concept projects that show how we think",
    body: "As a new agency we won't pretend to a client list we don't have. These are concept projects — realistic briefs for Sri Lankan businesses that show our approach. Live client work will be added here as projects launch, with client approval. [PLACEHOLDER: live project links + client approvals]",
    cta: "View portfolio",
  },
  process: {
    eyebrow: "How we work",
    h2: "From first call to launch, in four steps",
    steps: [
      {
        n: "01",
        title: "Discover",
        text: "A free call to understand your business, goals and budget. We'll tell you honestly if we're not the right fit.",
      },
      {
        n: "02",
        title: "Plan & quote",
        text: "A clear scope, timeline and fixed quote in writing. No vague estimates.",
      },
      {
        n: "03",
        title: "Build & review",
        text: "You see progress at every stage and give feedback in one shared space.",
      },
      {
        n: "04",
        title: "Launch & support",
        text: "We launch, monitor, and stay available for updates, hosting and improvements.",
      },
    ],
    cta: "Start with a free discovery call",
  },
  contactStrip: {
    h2: "Have a project in mind?",
    body: "Tell us what you're trying to achieve. You'll get an honest reply — and if we're not the right fit, we'll say so and point you somewhere better.",
    ctaPrimary: "Contact us",
    ctaSecondary: "Chat on WhatsApp",
  },
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  seo: SEO.about,
  h1: "A new agency, built on honest work.",
  sub: "Swift Digital was founded in Colombo by a small team who believe Sri Lankan businesses deserve digital work that is fast, fairly priced and built to last.",
  story: [
    "Swift Digital started with a simple observation. Too many small and medium businesses in Sri Lanka have been quoted high prices for websites that load slowly, break on mobile, or sit on platforms the owner can't update. Marketing “packages” get sold with jargon and reports nobody reads.",
    "We decided to build the agency we'd want to hire: a small founding team in Colombo that quotes fairly, delivers quickly, explains everything in plain language — in English, Sinhala or Tamil — and uses AI-assisted workflows to keep costs down without cutting corners.",
    "We're new, and we say so. What we can promise is process, transparency, and work we're proud to put our name on. [PLACEHOLDER: founding date and any details the founders want to add]",
  ],
  teamHeading: "The team",
  teamIntro:
    "We're a small team on purpose — it keeps communication direct and prices fair. [PLACEHOLDER: names, photos and short bios]",
  teamRoles: [
    "[PLACEHOLDER: Founder / Director — name, photo, bio]",
    "[PLACEHOLDER: Lead Developer — name, photo, bio]",
    "[PLACEHOLDER: Designer — name, photo, bio]",
    "[PLACEHOLDER: Marketing & Client Lead — name, photo, bio]",
  ],
  valuesHeading: "How we work",
  values: [
    {
      title: "Honesty first",
      text: "If we're not the right fit for your project, we'll tell you — and suggest who is.",
    },
    {
      title: "Fair pricing",
      text: "Quotes based on real work, not on what the market will bear.",
    },
    {
      title: "Built to last",
      text: "Stable code, documentation and training, so nothing depends on us alone.",
    },
    {
      title: "Clear communication",
      text: "Plain language, quick replies, trilingual support: English, Sinhala, Tamil.",
    },
    {
      title: "Continuous improvement",
      text: "We test, measure and refine — using AI tools where they genuinely help.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export const PORTFOLIO = {
  seo: SEO.portfolio,
  h1: "Our work",
  intro:
    "Swift Digital is a new agency, so we won't show you invented client lists or made-up numbers. Instead, here are two concept projects — realistic briefs for Sri Lankan businesses that show how we think. When live client projects launch, they'll appear here with the client's approval. [PLACEHOLDER: client approvals, live URLs, screenshots]",
  templateTitle: "How we document every project",
  template: ["Challenge", "Solution", "Result", "Stack & services used"],
  projects: [
    {
      label: "Concept project",
      title: "Boutique hotel, Colombo",
      image: "/images/project-hospitality.webp",
      industry: "Hospitality",
      services: "Web design & development · SEO · WhatsApp booking flow · EN/SI content",
      challenge:
        "A boutique hotel in Colombo relied on phone calls and email for bookings. Its old website was slow on mobile and didn't appear when tourists searched “boutique hotels Colombo”.",
      solution:
        "A fast, mobile-first website with a clear booking-enquiry flow that routes to WhatsApp, English and Sinhala pages, on-page SEO, and a fully set-up Google Business Profile.",
      result:
        "Targets for the first 90 days: faster load times, more direct booking enquiries and stronger local search visibility — all measurable in analytics.",
    },
    {
      label: "Concept project",
      title: "Ceylon tea & spices e-commerce brand",
      image: "/images/project-commerce.webp",
      industry: "E-commerce · Export",
      services: "E-commerce build · Payment integration · Email automation · Export SEO",
      challenge:
        "A specialty tea brand sold only through social media DMs. Orders were tracked in a spreadsheet, checkout wasn't trusted by overseas customers, and abandoned carts were simply lost.",
      solution:
        "An e-commerce store with international payment options, product storytelling pages, automated abandoned-cart emails, and SEO targeting export keywords like “buy Ceylon tea online”.",
      result:
        "Targets: 24/7 sales without manual order handling, a measurable conversion rate, and hours saved on DMs — reported monthly.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  seo: SEO.contact,
  h1: "Let's talk about your project.",
  sub: "Tell us what you're trying to achieve and we'll reply with honest advice and a clear quote — no pressure, no jargon.",
  fields: {
    name: { label: "Full name", required: true, micro: "As you'd like us to address you." },
    email: { label: "Email", required: true, micro: "Where we'll send our reply." },
    whatsapp: { label: "WhatsApp number", required: false, micro: "Optional — for quick questions. Include country code." },
    business: {
      label: "Business name & industry",
      required: false,
      micro: "e.g. guesthouse in Galle, online clothing store.",
      options: ["Hotel / tourism", "E-commerce", "SME / other business", "Overseas client", "Other"],
    },
    needs: {
      label: "What do you need?",
      options: [
        "Website",
        "Digital marketing",
        "SEO",
        "Social media",
        "Branding",
        "E-commerce",
        "AI automation",
        "Hosting",
        "Management software",
        "Bespoke software",
        "Business automation",
        "Not sure yet",
      ],
    },
    budget: {
      label: "Budget range",
      options: [
        "Under LKR [PLACEHOLDER]",
        "LKR [PLACEHOLDER] – [PLACEHOLDER]",
        "LKR [PLACEHOLDER] – [PLACEHOLDER]",
        "Above LKR [PLACEHOLDER]",
        "Not sure yet",
      ],
    },
    message: {
      label: "Project details",
      required: true,
      micro: "A few sentences is plenty: what's the goal, and is there a deadline?",
    },
    submit: "Send enquiry",
    submitMicro:
      "Every enquiry gets a personal reply within [PLACEHOLDER: e.g. 1 business day]. Your details are never shared.",
  },
  whatsappCta: {
    text: "Prefer to chat? Message us on WhatsApp — it's usually the fastest way to reach us.",
    button: "Chat on WhatsApp",
  },
  officeHeading: "Office",
  promise: "Our promise: a personal reply to every enquiry within [PLACEHOLDER: confirm before launch, e.g. 1 business day].",
};
