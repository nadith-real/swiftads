import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { SITE } from '@/content/copy';
import { Link } from '@/router';

export function isWhatsAppConfigured() {
  return /^https:\/\/wa\.me\/\d{8,15}$/.test(SITE.whatsappHref) && !SITE.whatsappHref.includes('94000000000');
}

const ChannelContext = createContext<() => void>(() => {});

export function ContactChannelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const openWhatsApp = useCallback(() => {
    if (isWhatsAppConfigured()) window.open(SITE.whatsappHref, '_blank', 'noopener,noreferrer');
    else setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;
      const controls = panel.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
      if (!controls?.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; previous?.focus(); };
  }, [open]);

  return <ChannelContext.Provider value={openWhatsApp}>{children}{open && createPortal(
    <div className="dialog-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div ref={panel} className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="channel-title" aria-describedby="channel-description">
        <button className="dialog-close" onClick={() => setOpen(false)} aria-label="Close WhatsApp information"><X /></button>
        <MessageCircle aria-hidden="true" />
        <h2 id="channel-title">Let's start a conversation.</h2>
        <p className="body-copy" id="channel-description">Our WhatsApp number is being confirmed. In the meantime, use the project form to send your enquiry.</p>
        <Link to="/contact" className="button button-primary" onClick={() => setOpen(false)}>Start a project<ArrowUpRight /></Link>
      </div>
    </div>, document.body,
  )}</ChannelContext.Provider>;
}

export function useWhatsApp() { return useContext(ChannelContext); }