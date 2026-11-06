import { SEO } from '@/content/copy';
import { PRINCIPLES } from '@/content/design';
import { ContactStrip, ProcessSection } from '@/components/Sections';
import { AmbientVideo, Eyebrow, PageIntro, PH, Reveal, Seo } from '@/components/ui';

export default function About() {
  return <>
    <Seo title={SEO.about.title} description={SEO.about.description} />
    <PageIntro eyebrow="About Swift Digital" title={<>A small team.<br /><span className="muted">A considered approach.</span></>} description="We're a new digital agency in Colombo, bringing websites, marketing, and business software together with honest advice and fair pricing." />
    <section className="section"><div className="container">
      <div className="about-story"><Reveal><Eyebrow>Our starting point</Eyebrow><h2 className="about-statement">Good digital work shouldn't feel complicated.<br /><span className="text-muted">Or out of reach.</span></h2></Reveal><Reveal delay={90}><p className="body-copy">Swift Digital is a small founding team based in Colombo. We're building an agency around a straightforward idea: businesses should understand what they're paying for, feel involved in the process, and receive work they can actually use.</p><p className="body-copy">We bring together design, development, marketing, and automation. That lets us think about the whole experience, from how someone discovers your business to what happens after they get in touch.</p><p className="body-copy">We work with Sri Lankan SMEs, hospitality businesses, e-commerce brands, and overseas clients. Our AI-assisted workflows help us work efficiently, while the decisions and responsibility stay with people.</p></Reveal></div>
      <Reveal delay={70}><figure className="about-photo"><AmbientVideo src="/videos/about-studio.mp4" poster="/images/about-studio.webp" alt="Dimly lit modern studio desk with laptop and ambient lighting" controls /></figure><p className="detail-caption">Illustrative dark workspace footage from Pexels. Not our Colombo office or team.</p></Reveal>
    </div></section>
    <section className="section section-line section-soft"><div className="container principles-layout"><div className="principles-intro"><Reveal><Eyebrow>Our principles</Eyebrow><h2 className="section-title">The way we work<br /><span className="muted">matters.</span></h2><p className="body-copy">No inflated history. No complicated language. Just a small team committed to doing useful work, properly.</p></Reveal></div><div>{PRINCIPLES.map((principle, index) => <Reveal key={principle.title} delay={index * 50}><div className="principle"><span className="principle-index">0{index + 1}</span><div><h3>{principle.title}</h3><p>{principle.text}</p></div></div></Reveal>)}</div></div></section>
    <section className="section section-line"><div className="container"><Reveal><Eyebrow>The founding team</Eyebrow><h2 className="section-title">People, not<br /><span className="muted">layers of process.</span></h2><p className="body-copy mt-6 max-w-xl">We're a small team, keeping communication direct and decisions close to the work. We'll introduce the people behind Swift Digital here as their profiles are approved.</p><div className="team-note"><p><PH>[PLACEHOLDER: approved founding-team names, roles, photographs, and short biographies]</PH></p></div></Reveal></div></section>
    <ProcessSection />
    <ContactStrip />
  </>;
}