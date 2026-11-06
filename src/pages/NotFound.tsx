import { ArrowUpRight } from 'lucide-react';
import { GhostButton, PrimaryButton, Seo } from '@/components/ui';

export default function NotFound({ path }: { path: string }) {
  return <><Seo title="Page not found | Swift Digital" description="Find your way back to Swift Digital's services, work, or contact page." /><section className="not-found"><div className="container"><p className="not-found-code">404 / PAGE NOT FOUND</p><h1 className="page-title">A small detour.<br /><span className="muted">Let's get you back.</span></h1><p className="page-lead">We couldn't find <span className="text-accent break-all">{path}</span>. Explore our services or head back to the beginning.</p><div className="button-row"><PrimaryButton href="/">Back to home<ArrowUpRight /></PrimaryButton><GhostButton href="/services">Explore services<ArrowUpRight /></GhostButton></div></div></section></>;
}