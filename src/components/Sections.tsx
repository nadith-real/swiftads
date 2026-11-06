import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from '@/router';
import { WORK, PROCESS } from '@/content/design';
import type { Service } from '@/content/copy';
import { useWhatsApp } from './ContactChannel';
import { Eyebrow, PrimaryButton, Reveal, RoundArrow } from './ui';

export function ServiceRow({ service }: { service: Service }) {
  return <Link to={`/services/${service.slug}`} className="service-row">
    <div className="service-row-image"><img src={service.image} alt={service.imageAlt} width="192" height="158" loading="lazy" decoding="async" /></div>
    <div className="service-row-content"><h3>{service.name}</h3><p>{service.oneLiner}</p></div>
    <RoundArrow />
  </Link>;
}

export function WorkGrid() {
  return <div className="work-grid">{WORK.map((project, index) => <Reveal key={project.id} delay={index * 110}>
    <Link to={`/portfolio#${project.id}`} className="work-link">
      <div className="work-image"><img src={project.image} alt={project.alt} width="1400" height="1000" loading="lazy" decoding="async" /></div>
      <div className="work-info"><div><p className="small-label">Concept project / {project.category.split(' / ')[0]}</p><h3>{project.shortTitle}</h3></div><RoundArrow /></div>
    </Link>
  </Reveal>)}</div>;
}

export function ProcessSection() {
  return <section className="section section-line"><div className="container">
    <Reveal><div className="section-heading"><div><Eyebrow number="04">A straightforward process</Eyebrow><h2 className="section-title">Good work starts<br /><span className="muted">with a clear plan.</span></h2></div><p className="body-copy">No unnecessary complexity. Just a considered approach, from the first conversation to the next step.</p></div></Reveal>
    <div className="process-grid">{PROCESS.map((step, index) => <Reveal key={step.number} delay={index * 90}><div className="process-step"><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div></Reveal>)}</div>
  </div></section>;
}

export function ContactStrip() {
  const whatsapp = useWhatsApp();
  return <section className="contact-strip"><div className="container"><Reveal>
    <div className="contact-strip-inner"><div><Eyebrow>What's next?</Eyebrow><h2>Good things start<br />with a conversation.</h2><p className="body-copy">A new idea, a better website, or a process that could work harder. Let's find the right next step.</p></div><div className="contact-strip-actions"><PrimaryButton>Tell us what you're thinking<ArrowUpRight /></PrimaryButton><button type="button" className="text-link" onClick={whatsapp}><MessageCircle />Or start on WhatsApp</button></div></div>
  </Reveal></div></section>;
}