import { ArrowUpRight } from 'lucide-react';
import { SEO } from '@/content/copy';
import { FEATURED_SERVICES, PRINCIPLES } from '@/content/design';
import { ContactStrip, ProcessSection, ServiceRow, WorkGrid } from '@/components/Sections';
import { AmbientVideo, Eyebrow, PrimaryButton, Reveal, Seo, TextLink } from '@/components/ui';

export default function Home() {
  return <>
    <Seo title={SEO.home.title} description={SEO.home.description} />
    <section className="hero">
      <div className="hero-media">
        <img src="/images/swift-dark-hero.webp" alt="Illustrative digital product interfaces on a desktop and mobile device in a dark studio" width="1920" height="1080" fetchPriority="high" decoding="async" />
        <AmbientVideo src="/videos/hero-ambient.mp4" poster="/images/swift-dark-hero.webp" alt="Ambient abstract blue network motion" className="hero-video" />
      </div>
      <div className="container hero-content">
        <Reveal><Eyebrow>Independent digital agency / Colombo, Sri Lanka</Eyebrow><h1 className="hero-brand">Swift Digital<span>.</span></h1></Reveal>
        <Reveal delay={110}><h2 className="hero-headline">Built for your<br />next move.</h2><p className="hero-description">Websites, marketing, and software that move your business forward. A small Colombo team with a considered approach to everything digital.</p></Reveal>
        <Reveal delay={220}><div className="button-row"><PrimaryButton>Let's build something<ArrowUpRight /></PrimaryButton><TextLink href="/services">Explore our services</TextLink></div></Reveal>
      </div>
    </section>

    <section className="section" id="services"><div className="container">
      <Reveal><div className="section-heading"><div><Eyebrow number="01">What we do</Eyebrow><h2 className="section-title">One team.<br /><span className="muted">More possibilities.</span></h2></div><p className="body-copy">From the first impression to the systems behind it. Connected digital services, built around what your business needs.</p></div></Reveal>
      <div className="featured-service-grid">{FEATURED_SERVICES.map((service, index) => <Reveal key={service.slug} delay={(index % 2) * 75}><ServiceRow service={service} /></Reveal>)}</div>
      <Reveal><div className="service-bottom"><p>Design, development, growth, and the connections in between.</p><TextLink href="/services">Explore all 11 services</TextLink></div></Reveal>
    </div></section>

    <section className="section section-line section-soft"><div className="container">
      <Reveal><div className="section-heading"><div><Eyebrow number="02">Ideas in practice</Eyebrow><h2 className="section-title">Considered design.<br /><span className="muted">Practical thinking.</span></h2></div><TextLink href="/portfolio">Explore our concepts</TextLink></div></Reveal>
      <WorkGrid />
      <p className="work-note">Self-initiated concept projects, not client commissions. An honest look at our approach as a new agency.</p>
    </div></section>

    <section className="section section-line"><div className="container principles-layout">
      <div className="principles-intro"><Reveal><Eyebrow number="03">Why Swift Digital</Eyebrow><h2 className="section-title">New agency.<br /><span className="muted">Clear intentions.</span></h2><p className="body-copy">We don't have a long history to talk about. We have a clear idea of how digital work should be done: fairly, thoughtfully, and with your business in mind.</p><TextLink href="/about">Get to know us</TextLink></Reveal></div>
      <div>{PRINCIPLES.map((principle, index) => <Reveal key={principle.title} delay={index * 45}><div className="principle"><span className="principle-index">0{index + 1}</span><div><h3>{principle.title}</h3><p>{principle.text}</p></div></div></Reveal>)}</div>
    </div></section>
    <ProcessSection />
    <ContactStrip />
  </>;
}