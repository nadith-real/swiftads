import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useRouter } from '@/router';
import { Logo } from './ui';
import { cn } from '@/utils/cn';

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Our work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { path, key } = useRouter();
  const [scrolled, setScrolled] = useState(window.scrollY > 20);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [key]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const active = (to: string) => path === to || path.startsWith(to + '/');

  return <header className={cn('site-header', (scrolled || open || path !== '/') && 'is-scrolled')}>
    <div className="container header-inner">
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">{NAV.map((item) => <Link key={item.to} to={item.to} className={cn('nav-link', active(item.to) && 'is-active')} aria-current={active(item.to) ? 'page' : undefined}>{item.label}</Link>)}</nav>
      <div className="header-right"><span className="header-location">Colombo, Sri Lanka</span><Link to="/contact" className="button button-secondary button-small">Let's talk<ArrowUpRight /></Link></div>
      <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
    </div>
    <nav className={cn('mobile-nav', open && 'is-open')} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!open} inert={!open}>
      <div className="container mobile-nav-inner">{NAV.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={cn('nav-link', active(item.to) && 'is-active')} aria-current={active(item.to) ? 'page' : undefined}>{item.label}</Link>)}<Link to="/contact" onClick={() => setOpen(false)} className="button button-primary">Start a project<ArrowUpRight /></Link></div>
    </nav>
  </header>;
}