import { SERVICES } from './copy';

export const SERVICE_GROUPS = [
  { id: 'all', label: 'All services' },
  { id: 'build', label: 'Design & development' },
  { id: 'grow', label: 'Marketing & growth' },
  { id: 'connect', label: 'Software & automation' },
] as const;

export type ServiceGroup = (typeof SERVICE_GROUPS)[number]['id'];

const GROUP_SLUGS: Record<Exclude<ServiceGroup, 'all'>, string[]> = {
  build: ['web-design-development', 'branding', 'ecommerce', 'hosting-domains'],
  grow: ['digital-marketing', 'seo', 'social-media-management'],
  connect: ['ai-automations', 'business-management-software', 'bespoke-software', 'business-automations'],
};

export function serviceGroup(slug: string) {
  return SERVICE_GROUPS.find((group) => group.id !== 'all' && GROUP_SLUGS[group.id].includes(slug)) ?? SERVICE_GROUPS[0];
}

export function filterServices(group: ServiceGroup) {
  return group === 'all' ? SERVICES : SERVICES.filter((service) => GROUP_SLUGS[group].includes(service.slug));
}

export const FEATURED_SERVICES = ['web-design-development', 'digital-marketing', 'ecommerce', 'branding', 'ai-automations', 'bespoke-software']
  .map((slug) => SERVICES.find((service) => service.slug === slug)!)
  .filter(Boolean);

export const PRINCIPLES = [
  {
    title: 'Fair from the first conversation.',
    text: 'A clear scope, a considered recommendation, and pricing that reflects the work. No confusing packages or hidden extras.',
  },
  {
    title: 'Built properly. Delivered efficiently.',
    text: 'Stable development and AI-assisted workflows help us move quickly without treating the details as an afterthought.',
  },
  {
    title: 'Small team. Direct communication.',
    text: 'Talk to the people doing the work. We keep the process practical, the feedback open, and the next steps clear.',
  },
  {
    title: 'Local understanding. Wider thinking.',
    text: 'Based in Colombo, working with Sri Lankan and overseas businesses. Communication in English, Sinhala, or Tamil.',
  },
];

export const PROCESS = [
  { number: '01', title: 'Understand.', text: 'We listen to your goals, your audience, and what your business actually needs.' },
  { number: '02', title: 'Define.', text: 'You receive a clear scope, a proposed timeline, and a quote before work begins.' },
  { number: '03', title: 'Create.', text: 'We design, develop, and refine together, with space for your feedback.' },
  { number: '04', title: 'Move forward.', text: 'We launch, hand over, and agree on the support you need for what comes next.' },
];

export const WORK = [
  {
    id: 'commerce',
    title: 'A considered shopping experience.',
    shortTitle: 'Ceylon tea, reimagined online.',
    category: 'E-commerce / Digital experience',
    image: '/images/project-commerce.webp',
    alt: 'Illustrative responsive Ceylon tea store shown on a laptop and smartphone in a dark studio',
    video: '/videos/ecommerce.mp4',
    videoCaption: 'Illustrative Pexels footage representing a mobile checkout flow — not live client footage.',
    intro: 'A concept for a Sri Lankan tea and spices brand ready to move beyond taking orders through social media.',
    challenge: 'Imagine a small tea brand managing product questions and every order through direct messages. The brief is to create a clearer buying journey for local and overseas customers.',
    solution: 'A responsive storefront with considered product pages, clear shipping information, a straightforward checkout, and a proposed abandoned-cart email flow.',
    outcome: 'A proposed experience, not a launched client store. Conversion, checkout completion, and time spent handling orders would be evaluated after a real launch.',
    services: ['E-commerce', 'Web design', 'Business automation'],
  },
  {
    id: 'hospitality',
    title: 'A simpler path to direct enquiries.',
    shortTitle: 'Hospitality, with a direct connection.',
    category: 'Web development / Booking experience',
    image: '/images/project-hospitality.webp',
    alt: 'Illustrative hospitality website and booking enquiry interface displayed on a monitor and tablet',
    video: '/videos/web-design-development.mp4',
    videoCaption: 'Illustrative Pexels footage representing responsive web craftsmanship — not live client footage.',
    intro: 'A website concept for an independent Colombo hotel, connecting discovery with a straightforward booking enquiry.',
    challenge: 'Imagine a boutique hotel whose website makes it difficult to explore rooms or send a useful booking enquiry from a phone.',
    solution: 'A mobile-first website with clear room information, an accessible enquiry flow, a planned WhatsApp handoff, and search-friendly page structure.',
    outcome: 'An illustrative design direction, not completed client work. A live project would measure page speed, enquiry completion, and relevant search traffic.',
    services: ['Web development', 'SEO', 'WhatsApp integration'],
  },
];