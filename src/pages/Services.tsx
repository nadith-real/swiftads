import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SEO } from '@/content/copy';
import { filterServices, SERVICE_GROUPS, serviceGroup, type ServiceGroup } from '@/content/design';
import { Link } from '@/router';
import { ContactStrip } from '@/components/Sections';
import { PageIntro, Reveal, Seo } from '@/components/ui';
import { cn } from '@/utils/cn';

export default function Services() {
  const [group, setGroup] = useState<ServiceGroup>('all');
  const services = filterServices(group);
  return <>
    <Seo title={SEO.services.title} description={SEO.services.description} />
    <PageIntro eyebrow="Our capabilities" title={<>The right thinking.<br /><span className="muted">The right digital tools.</span></>} description="Design, development, marketing, and automation. One Colombo team to connect the dots and help you make your next move." />
    <section className="container pb-24">
      <div className="filter-bar" role="group" aria-label="Filter services">{SERVICE_GROUPS.map((item) => <button type="button" key={item.id} className={cn('filter-button', group === item.id && 'is-active')} onClick={() => setGroup(item.id)} aria-pressed={group === item.id}>{item.label}</button>)}<span className="filter-count" role="status" aria-live="polite">{services.length} services</span></div>
      <div className="service-catalogue page-enter" key={group}>{services.map((service, index) => <Reveal key={service.slug} delay={(index % 2) * 65}><Link to={`/services/${service.slug}`} className="service-tile">
        <div className="service-tile-image">
          <img src={service.image} alt={service.imageAlt} width="1000" height="660" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
          <span className="service-tile-badge">Video preview</span>
        </div>
        <div className="service-tile-body"><div className="service-tile-meta"><span>{serviceGroup(service.slug).label}</span><span>{service.num}</span></div><h2>{service.name}</h2><p>{service.oneLiner}</p><div className="service-tile-foot"><span>Discover the service</span><ArrowUpRight aria-hidden="true" /></div></div>
      </Link></Reveal>)}</div>
    </section>
    <ContactStrip />
  </>;
}