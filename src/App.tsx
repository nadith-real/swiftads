import { useEffect, useRef, type ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { ContactChannelProvider } from '@/components/ContactChannel';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Portfolio from '@/pages/Portfolio';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import { useRouter } from '@/router';

export default function App() {
  const { route, path, key } = useRouter();
  const previous = useRef(key);
  useEffect(() => {
    if (previous.current !== key) document.getElementById('main-content')?.focus({ preventScroll: true });
    previous.current = key;
    if (window.location.hash && !window.location.hash.startsWith('#/')) {
      const timer = window.setTimeout(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' }), 120);
      return () => window.clearTimeout(timer);
    }
  }, [key]);
  let page: ReactNode;
  switch (route?.name) {
    case 'home': page = <Home />; break;
    case 'about': page = <About />; break;
    case 'services': page = <Services />; break;
    case 'service': page = <ServiceDetail slug={route.params.slug} />; break;
    case 'portfolio': page = <Portfolio />; break;
    case 'contact': page = <Contact />; break;
    default: page = <NotFound path={path} />;
  }
  return <ContactChannelProvider><a className="skip-link" href="#main-content">Skip to content</a><Header /><main key={key} id="main-content" className="page-enter" tabIndex={-1} style={{ outline: 'none' }}>{page}</main><Footer /><WhatsAppFloat /></ContactChannelProvider>;
}