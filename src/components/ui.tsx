import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { Link } from '@/router';
import { cn } from '@/utils/cn';

export function PH({ children }: { children: ReactNode }) {
  return <span className="ph" title="Information to be confirmed before launch">{children}</span>;
}

export function Rich({ text }: { text: string }) {
  return <>{text.split(/(\[PLACEHOLDER[^\]]*\])/g).map((part, index) => part.startsWith('[PLACEHOLDER') ? <PH key={index}>{part}</PH> : <span key={index}>{part}</span>)}</>;
}

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const meta = (key: string, value: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attr, key); document.head.appendChild(element); }
      element.content = value;
    };
    meta('description', description);
    meta('og:title', title, true);
    meta('og:description', description, true);
    meta('og:url', `https://swiftdigital.online${window.location.pathname}`, true);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = `https://swiftdigital.online${window.location.pathname}`;
  }, [title, description]);
  return null;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.06, rootMargin: '0px 0px -15px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={cn('reveal', visible && 'is-visible', className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={cn('brand-mark', className)} viewBox="0 0 34 38" fill="none" aria-hidden="true">
      <path d="M17.5 1H32L19 15H31L6.5 37L15.5 20H2L17.5 1Z" fill="currentColor" />
      <path d="M17.5 1H32L19 15H12L17.5 1Z" fill="#6494ff" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return <Link to="/" aria-label="Swift Digital home" className={cn('brand', className)}><BrandMark /><span className="brand-text">Swift<span>Digital</span></span></Link>;
}

export function Eyebrow({ children, number }: { children: ReactNode; number?: string }) {
  return <p className="eyebrow">{number && <span className="eyebrow-number">{number} /</span>}{children}</p>;
}

export function PrimaryButton({ children, href = '/contact', className }: { children: ReactNode; href?: string; className?: string }) {
  return <Link to={href} className={cn('button button-primary', className)}>{children}</Link>;
}

export function GhostButton({ children, href, className }: { children: ReactNode; href: string; className?: string }) {
  return <Link to={href} className={cn('button button-secondary', className)}>{children}</Link>;
}

export function TextLink({ children, href, className }: { children: ReactNode; href: string; className?: string }) {
  return <Link to={href} className={cn('text-link', className)}>{children}<ArrowUpRight aria-hidden="true" /></Link>;
}

export function RoundArrow() {
  return <span className="round-arrow" aria-hidden="true"><ArrowUpRight /></span>;
}

export function PageIntro({ eyebrow, title, description, children, split = false }: { eyebrow: string; title: ReactNode; description?: string; children?: ReactNode; split?: boolean }) {
  return (
    <section className="page-intro"><div className="container"><Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className={split ? 'intro-split' : undefined}>
        <h1 className="page-title">{title}</h1>
        {description && <p className="page-lead">{description}</p>}
      </div>
      {children}
    </Reveal></div></section>
  );
}

export function AmbientVideo({
  src,
  poster,
  alt,
  className,
  controls = false,
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  controls?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    if (paused) {
      video.pause();
    } else {
      video.play().catch(() => {
        setPaused(true);
      });
    }
  }, [paused, failed, src]);

  if (failed) {
    return <img src={poster} alt={alt} className={className} loading="lazy" decoding="async" />;
  }

  return (
    <div className={cn('ambient-media', className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        onError={() => setFailed(true)}
      />
      {controls && (
        <button
          type="button"
          className="media-toggle"
          onClick={() => setPaused((prev) => !prev)}
          aria-label={paused ? 'Play ambient video' : 'Pause ambient video'}
          aria-pressed={!paused}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          <span>{paused ? 'Play motion' : 'Pause'}</span>
        </button>
      )}
    </div>
  );
}