import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SEO } from '@/content/copy';
import { WORK } from '@/content/design';
import { ContactStrip } from '@/components/Sections';
import { AmbientVideo, PageIntro, Reveal, Seo } from '@/components/ui';

export default function Portfolio() {
  const [expanded, setExpanded] = useState<string[]>(() => [window.location.hash.slice(1) || WORK[0].id]);
  const toggle = (id: string) => setExpanded((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  return <>
    <Seo title={SEO.portfolio.title} description={SEO.portfolio.description} />
    <PageIntro eyebrow="Our approach, in practice" title={<>An idea of<br /><span className="muted">what's possible.</span></>} description="We're a new agency. These self-initiated concept projects show our thinking, not a list of client commissions. Live work will be added with client approval." />
    <section className="section"><div className="container">{WORK.map((project, index) => {
      const open = expanded.includes(project.id);
      return <Reveal key={project.id} delay={index * 60}><article className="work-project" id={project.id}>
        <img src={project.image} alt={project.alt} width="1400" height="800" loading={index === 0 ? 'eager' : 'lazy'} />
        <div className="work-project-header"><div><p className="!mt-0 !mb-3">Concept project / {project.category}</p><h2>{project.title}</h2></div><button className="project-toggle" type="button" aria-expanded={open} aria-controls={`brief-${project.id}`} onClick={() => toggle(project.id)}>{open ? 'Close concept brief' : 'Read concept brief'}<ChevronDown aria-hidden="true" /></button></div>
        <div className="project-details" id={`brief-${project.id}`} hidden={!open}>
          <p className="project-intro">{project.intro}</p>
          <div className="case-study-grid"><div><h3>01 / The challenge</h3><p>{project.challenge}</p></div><div><h3>02 / The proposed solution</h3><p>{project.solution}</p></div><div><h3>03 / What we'd measure</h3><p>{project.outcome}</p></div></div>
          <figure className="project-video"><AmbientVideo src={project.video} poster={project.image} alt={project.videoCaption} controls /></figure>
          <p className="concept-notice">{project.videoCaption} No client commission or achieved performance is implied.</p>
        </div>
      </article></Reveal>;
    })}</div></section>
    <ContactStrip />
  </>;
}