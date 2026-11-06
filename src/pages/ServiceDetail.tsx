import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { SERVICES } from '@/content/copy';
import { serviceGroup } from '@/content/design';
import { Link } from '@/router';
import { ContactStrip } from '@/components/Sections';
import { AmbientVideo, Eyebrow, PrimaryButton, Reveal, Rich, Seo, TextLink } from '@/components/ui';
import NotFound from './NotFound';

export default function ServiceDetail({ slug }: { slug: string }) {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return <NotFound path={`/services/${slug}`} />;
  const group = serviceGroup(slug);
  const related = [...SERVICES.filter((item) => item.slug !== slug && serviceGroup(item.slug).id === group.id), ...SERVICES.filter((item) => item.slug !== slug && serviceGroup(item.slug).id !== group.id)].slice(0, 3);
  const contactUrl = `/contact?service=${encodeURIComponent(slug)}`;

  return <>
    <Seo title={service.seoTitle} description={service.seoDescription} />
    <section className="page-intro"><div className="container"><Reveal>
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight /><Link to="/services">Services</Link><ChevronRight /><span aria-current="page">{service.name}</span></nav>
      <Eyebrow number={service.num}>{group.label}</Eyebrow><h1 className="page-title">{service.name}<span className="heading-accent">.</span></h1><p className="page-lead">{service.oneLiner}</p>
    </Reveal></div></section>
    <section className="section"><div className="container service-detail-layout">
      <article><Reveal><figure className="service-detail-photo"><AmbientVideo src={service.video} poster={service.image} alt={service.imageAlt} controls /></figure><p className="detail-caption">Service illustration & ambient footage from Pexels. Not a client project or performance report.</p><h2 className="detail-heading">Designed around your business.</h2><p className="body-copy">{service.body}</p></Reveal><Reveal delay={60}><h2 className="detail-heading">What we can deliver.</h2><ul className="deliverable-list">{service.bullets.map((bullet) => <li key={bullet}><Check aria-hidden="true" />{bullet}</li>)}</ul><p className="body-copy mt-6 text-xs">The final scope, integrations, and delivery plan are agreed with you before we start.</p></Reveal></article>
      <aside className="detail-sidebar"><div className="sidebar-block"><p className="sidebar-label">Who it's for</p><p>{service.idealFor}</p></div><div className="sidebar-block"><p className="sidebar-label">Pricing approach</p><p><Rich text={service.pricing} /></p><p className="mt-4 !text-[10px] !text-muted">Published starting prices are awaiting confirmation. Ask us for a quote based on your scope.</p></div><div className="sidebar-block"><p className="sidebar-label">Let's define the next step</p><p>Tell us where you are now and what you'd like to change. We'll work out whether this is the right service for you.</p><PrimaryButton href={contactUrl}>Discuss your project<ArrowUpRight /></PrimaryButton></div><div className="sidebar-block"><TextLink href="/services">Back to all services</TextLink></div></aside>
    </div></section>
    <section className="section section-line section-soft"><div className="container"><Reveal><div className="section-heading"><div><Eyebrow>Connected capabilities</Eyebrow><h2 className="section-title">It all works<br /><span className="muted">better together.</span></h2></div></div></Reveal><div className="related-grid">{related.map((item, index) => <Reveal key={item.slug} delay={index * 70}><Link to={`/services/${item.slug}`} className="related-link"><img src={item.image} alt={item.imageAlt} width="600" height="350" loading="lazy" /><div><h3>{item.name}</h3><ArrowUpRight aria-hidden="true" /></div></Link></Reveal>)}</div></div></section>
    <ContactStrip />
  </>;
}