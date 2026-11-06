import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Check, MapPin, MessageCircle, X } from 'lucide-react';
import { SERVICES, SITE, SEO } from '@/content/copy';
import { useWhatsApp } from '@/components/ContactChannel';
import { PageIntro, PH, Seo } from '@/components/ui';

const EMPTY_FORM = { name: '', email: '', phone: '', business: '', budget: '', timeline: '', message: '' };
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkoagezw';

function buildBrief(form: typeof EMPTY_FORM, interests: string[]) {
  return [
    'Hello Swift Digital,', '', 'I would like to discuss a project.', '',
    `Name: ${form.name.trim()}`, `Email: ${form.email.trim()}`,
    `Business: ${form.business.trim() || 'Not specified'}`, `WhatsApp: ${form.phone.trim() || 'Not specified'}`,
    `Services: ${interests.join(', ') || 'I would like a recommendation'}`,
    `Budget: ${form.budget.trim() || 'To be discussed'}`, `Target launch: ${form.timeline.trim() || 'Flexible'}`,
    '', 'Project details:', form.message.trim(),
  ].join('\n');
}

function SuccessTick() {
  return (
    <svg className="success-tick" viewBox="0 0 52 52" aria-hidden="true">
      <circle className="success-tick-circle" cx="26" cy="26" r="24" />
      <path className="success-tick-check" d="M15.5 27.2l7.2 7.3 14.8-16.2" />
    </svg>
  );
}

export default function Contact() {
  const whatsapp = useWhatsApp();
  const [form, setForm] = useState(EMPTY_FORM);
  const [interests, setInterests] = useState<string[]>(() => {
    const slug = new URLSearchParams(window.location.search).get('service');
    const service = SERVICES.find((item) => item.slug === slug);
    return service ? [service.name] : [];
  });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);

  const update = (field: keyof typeof EMPTY_FORM, value: string) => { setForm((previous) => ({ ...previous, [field]: value })); setError(''); };
  const toggleInterest = (name: string) => {
    setInterests((previous) => name === 'Not sure yet' ? previous.includes(name) ? [] : [name] : previous.includes(name) ? previous.filter((item) => item !== name) : [...previous.filter((item) => item !== 'Not sure yet'), name]);
  };

  useEffect(() => {
    if (!sent) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSent(false);
      if (event.key !== 'Tab') return;
      const controls = dialog.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
      if (!controls?.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; previous?.focus(); };
  }, [sent]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setError('Please add your name, email, and a short description of your project.'); return; }
    setError('');
    setSending(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          business: form.business.trim(),
          services: interests.join(', ') || 'I would like a recommendation',
          budget: form.budget.trim(),
          timeline: form.timeline.trim(),
          message: buildBrief(form, interests),
          _subject: `Project enquiry from ${form.name.trim()}`,
        }),
      });
      if (!response.ok) throw new Error('Request failed');
      setForm(EMPTY_FORM);
      setSent(true);
    } catch {
      setError('We could not send your enquiry just now. Please try again in a moment.');
    } finally {
      setSending(false);
    }
  };

  return <>
    <Seo title={SEO.contact.title} description={SEO.contact.description} />
    <PageIntro eyebrow="Start a conversation" title={<>Your next move<br /><span className="muted">starts here.</span></>} description="Tell us what you're thinking. A clearer website, a new idea, or a better way to work. We'll help you work out the right next step." />
    <section className="section"><div className="container contact-layout">
      <aside className="contact-aside"><h2>A real conversation.<br />No complicated pitch.</h2><p className="body-copy">Share a little about your business, what you'd like to achieve, and anything we should know. You don't need a finished brief to start.</p>
        <div className="contact-channel"><MapPin aria-hidden="true" /><div><h3>Based in Colombo, Sri Lanka</h3><p>Working with businesses across the island<br />and with clients overseas.</p></div></div>
        <div className="contact-channel"><MessageCircle aria-hidden="true" /><div><h3>More comfortable with a chat?</h3><p>English, Sinhala, or Tamil.<br />Let's keep the conversation simple.</p><button className="text-link" type="button" onClick={whatsapp}>Chat on WhatsApp<ArrowUpRight /></button></div></div>
        <details className="contact-data"><summary>Contact details to be confirmed</summary><div><p>WhatsApp: {SITE.whatsappNumber}</p><p>Email: <PH>{SITE.email}</PH></p><p>Street address: <PH>{SITE.addressLines[0]}</PH></p><p>Response time: <PH>{SITE.responsePromise}</PH></p><p>Hours: <PH>{SITE.mapsEmbed}</PH></p></div></details>
      </aside>

      <form className="enquiry-form" onSubmit={submit}>
        <div className="form-head"><h2>A little about your project.</h2><p>The essentials help us understand what you need. Fields marked * are required.</p></div>
        <div className="form-grid">
          <div className="form-field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" value={form.name} onChange={(event) => update('name', event.target.value)} /></div>
          <div className="form-field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@yourbusiness.com" value={form.email} onChange={(event) => update('email', event.target.value)} /></div>
          <div className="form-field"><label htmlFor="business">Business name</label><input id="business" name="business" autoComplete="organization" maxLength={150} placeholder="Your business or idea" value={form.business} onChange={(event) => update('business', event.target.value)} /></div>
          <div className="form-field"><label htmlFor="phone">WhatsApp number</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={35} placeholder="Include your country code" value={form.phone} onChange={(event) => update('phone', event.target.value)} /></div>
          <fieldset className="form-field field-full"><legend>What can we help with?</legend><div className="interest-options">{[...SERVICES.map((service) => service.name), 'Not sure yet'].map((name) => <button type="button" className="interest-option" key={name} aria-pressed={interests.includes(name)} onClick={() => toggleInterest(name)}>{interests.includes(name) && <Check aria-hidden="true" />}{name}</button>)}</div></fieldset>
          <div className="form-field"><label htmlFor="budget">Approximate budget</label><input id="budget" name="budget" placeholder="Amount and currency, if known" maxLength={100} value={form.budget} onChange={(event) => update('budget', event.target.value)} /></div>
          <div className="form-field"><label htmlFor="timeline">When would you like to launch?</label><input id="timeline" name="timeline" placeholder="A date, or simply 'flexible'" maxLength={100} value={form.timeline} onChange={(event) => update('timeline', event.target.value)} /></div>
          <div className="form-field field-full"><label htmlFor="message">Tell us about your project <span>*</span></label><textarea id="message" name="message" required minLength={10} maxLength={8000} placeholder="What are you looking to achieve? Any ideas, challenges, or deadlines we should know about?" value={form.message} onChange={(event) => update('message', event.target.value)} /></div>
        </div>
        {error && <p role="alert" className="mt-4 text-xs text-red-300">{error}</p>}
        <div className="form-actions"><button type="submit" className="button button-primary" disabled={sending}>{sending ? 'Sending enquiry' : 'Send enquiry'}<ArrowUpRight /></button><p className="form-note">Your enquiry is sent securely. We'll reply as soon as we can.</p></div>
      </form>
    </div></section>
    {sent && createPortal(
      <div className="dialog-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSent(false); }}>
        <div ref={dialog} className="contact-dialog success-dialog" role="dialog" aria-modal="true" aria-labelledby="success-title" aria-describedby="success-description">
          <button className="dialog-close" onClick={() => setSent(false)} aria-label="Close confirmation"><X /></button>
          <SuccessTick />
          <h2 id="success-title">Message sent.</h2>
          <p className="body-copy" id="success-description">Thank you. We've received your enquiry and will get back to you shortly.</p>
          <button type="button" className="button button-primary" onClick={() => setSent(false)}>Close</button>
        </div>
      </div>, document.body,
    )}
  </>;
}
