import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

export const ROUTES = ['/', '/about', '/services', '/portfolio', '/contact'] as const;

export function matchRoute(path: string): { name: string; params: Record<string, string> } | null {
  const pathname = '/' + path.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
  const names: Record<string, string> = { '/': 'home', '/about': 'about', '/services': 'services', '/portfolio': 'portfolio', '/contact': 'contact' };
  if (names[pathname]) return { name: names[pathname], params: {} };
  const service = pathname.match(/^\/services\/([a-z0-9-]+)$/);
  return service ? { name: 'service', params: { slug: service[1] } } : null;
}

function readLocation() {
  const url = new URL(window.location.href);
  const fallback = url.searchParams.get('p');
  const legacy = url.hash.startsWith('#/') ? url.hash.slice(1) : null;
  if (fallback || legacy) {
    const target = new URL(fallback || legacy!, url.origin);
    if (target.origin === url.origin) window.history.replaceState({}, '', target.pathname + target.search + target.hash);
  }
  return { path: window.location.pathname || '/', key: window.location.pathname + window.location.search + window.location.hash };
}

type RouterValue = ReturnType<typeof readLocation> & {
  route: ReturnType<typeof matchRoute>;
  navigate: (to: string, options?: { replace?: boolean; noScroll?: boolean }) => void;
};

const RouterContext = createContext<RouterValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(readLocation);
  const navigate = useCallback((to: string, options?: { replace?: boolean; noScroll?: boolean }) => {
    const url = new URL(to, window.location.origin);
    if (url.origin !== window.location.origin) { window.location.assign(url.href); return; }
    const target = url.pathname + url.search + url.hash;
    if (target !== window.location.pathname + window.location.search + window.location.hash) {
      window.history[options?.replace ? 'replaceState' : 'pushState']({}, '', target);
      setLocation(readLocation());
    }
    if (!options?.noScroll && !url.hash) window.scrollTo({ top: 0, behavior: 'instant' });
    if (url.hash) window.setTimeout(() => document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, []);

  useEffect(() => {
    const onPop = () => setLocation(readLocation());
    const onClick = (event: globalThis.MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.hasAttribute('download') || anchor.hasAttribute('data-external') || anchor.rel.includes('external') || (anchor.target && anchor.target !== '_self')) return;
      const href = anchor.getAttribute('href') || '';
      if ((!href.startsWith('/') && !href.startsWith('#')) || href.startsWith('//')) return;
      event.preventDefault();
      navigate(href.startsWith('#') ? window.location.pathname + window.location.search + href : href);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('popstate', onPop); document.removeEventListener('click', onClick); };
  }, [navigate]);

  const value = useMemo(() => ({ ...location, route: matchRoute(location.path), navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('RouterProvider is required.');
  return context;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; ariaLabel?: string; noScroll?: boolean };

export function Link({ to, children, onClick, ariaLabel, noScroll, ...props }: LinkProps) {
  const { navigate } = useRouter();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.download || (props.target && props.target !== '_self')) return;
    event.preventDefault();
    navigate(to, { noScroll });
  };
  return <a {...props} href={to} aria-label={ariaLabel ?? props['aria-label']} onClick={handleClick}>{children}</a>;
}