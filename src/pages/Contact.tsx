import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Download, MapPin, MessageCircle, Send } from 'lucide-react';
import { SERVICES, SITE, SEO } from '@/content/copy';
import { isWhatsAppConfigured, useWhatsApp } from '@/components/ContactChannel';
import { PageIntro, PH, Seo } from '@/components/ui';

const EMPTY_FORM = { name: '', email: '', phone: '', business: '', budget: '', timeline: '', message: '' };

export default function Contact() {
  const whatsapp = useWhatsApp();
  const [form, setForm] = useState(EMPTY_FORM);
  const [interests, setInterests] = useState<string[]>(() => {
    const slug = new URLSearchParams(window.location.search).get('service');
    const service = SERVICES.find((item) => item.slug === slug);
    return service ? [service.name] : [];
  });
  const [brief, setBrief] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const preview = useRef<HTMLDivElement>(null);

  const update = (field: keyof typeof EMPTY_FORM, value: string) => { setForm((previous) => ({ ...previous, [field]: value })); setBrief(''); setError(''); };
  const toggleInterest = (name: string) => {
    setInterests((previous) => name === 'Not sure yet' ? previous.includes(name) ? [] : [name] : previous.includes(name) ? previous.filter((item) => item !== name) : [...previous.filter((item) => item !== 'Not sure yet'), name]);
    setBrief('');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim()) { setError('Please add your name and a short description of your project.'); return; }
    setError(''); setNotice('');
    setBrief([
      'Hello Swift Digital,', '', 'I would like to discuss a project.', '',
      `Name: ${form.name.trim()}`, `Email: ${form.email.trim()}`,
      `Business: ${form.business.trim() || 'Not specified'}`, `WhatsApp: ${form.phone.trim() || 'Not specified'}`,
      `Services: ${interests.join(', ') || 'I would like a recommendation'}`,
      `Budget: ${form.budget.trim() || 'To be discussed'}`, `Target launch: ${form.timeline.trim() || 'Flexible'}`,
      '', 'Project details:', form.message.trim(),
    ].join('\n'));
    window.setTimeout(() => { preview.current?.focus({ preventScroll: true }); preview.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 80);
  };

  const copyBrief = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(brief);
      else {
        const textarea = document.createElement('textarea'); textarea.value = brief; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select();
        const copied = document.execCommand('copy'); textarea.remove(); if (!copied) throw new Error('Copy unavailable');
      }
      setNotice('Enquiry copied. Nothing has been sent automatically.');
    } catch { setNotice('Copy is unavailable in this browser. You can download your enquiry instead.'); }
  };

  const downloadBrief = () => {
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'swift-digital-project-enquiry.txt'; document.body.appendChild(anchor); anchor.click(); anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Your enquiry is ready to save as a text file.');
  };

  return <>
    <Seo title={SEO.contact.title} description={SEO.contact.description} />
    <PageIntro eyebrow="Start a conversation" title={<>Your next move<br /><span className="muted">starts here.</span></>} description="Tell us what you're thinking. A clearer website, a new idea, or a better way to work. We'll help you work out the right next step." />
    <section className="section"><div className="container contact-layout">
      <aside className="contact-aside"><h2>A real conversation.<br />No complicated pitch.</h2><p className="body-copy">Share a little about your business, what you'd like to achieve, and anything we should know. You don't need a finished brief to start.</p>
        <div className="contact-channel"><MapPin aria-hidden="true" /><div><h3>Based in Colombo, Sri Lanka</h3><p>Working with businesses across the island<br />and with clients overseas.</p></div></div>
        <div className="contact-channel"><MessageCircle aria-hidden="true" /><div><h3>More comfortable with a chat?</h3><p>English, Sinhala, or Tamil.<br />Let's keep the conversation simple.</p><button className="text-link" type="button" onClick={whatsapp}>Chat on WhatsApp<ArrowUpRight /></button></div></div>
        <details className="contact-data"><summary>Contact details to be confirmed</summary><div><p>WhatsApp: <PH>{SITE.whatsappNumber}</PH></p><p>Email: <PH>{SITE.email}</PH></p><p>Street address: <PH>{SITE.addressLines[0]}</PH></p><p>Response time: <PH>{SITE.responsePromise}</PH></p><p>Hours: <PH>{SITE.mapsEmbed}</PH></p></div></details>
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
        <div className="form-actions"><button type="submit" className="button button-primary">Prepare project enquiry<ArrowUpRight /></button><p className="form-note">Your enquiry is prepared in your browser, not sent automatically. Copy or download it below. Direct delivery becomes available when our contact details are confirmed.</p></div>
        {brief && <div ref={preview} className="enquiry-result" tabIndex={-1} aria-label="Prepared project enquiry"><h3>Your enquiry is ready.</h3><p>{isWhatsAppConfigured() ? 'Review your message and choose how you would like to send it.' : 'Nothing has been sent. Our direct contact details are awaiting confirmation. You can copy or download this brief to keep it ready.'}</p><pre>{brief}</pre><div className="result-actions"><button className="button button-secondary" type="button" onClick={copyBrief}><Copy />Copy enquiry</button><button className="button button-secondary" type="button" onClick={downloadBrief}><Download />Download brief</button>{isWhatsAppConfigured() && <a className="button button-primary" href={`${SITE.whatsappHref}?text=${encodeURIComponent(brief)}`} target="_blank" rel="noopener noreferrer"><Send />Send on WhatsApp</a>}</div><p className="copy-notice" role="status" aria-live="polite">{notice}</p></div>}
      </form>
    </div></section>
  </>;
}