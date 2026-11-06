import { Logo } from './ui';
import { Link } from '@/router';
import { useWhatsApp } from './ContactChannel';

export default function Footer() {
  const whatsapp = useWhatsApp();
  return <footer className="site-footer"><div className="container">
    <div className="footer-main">
      <div className="footer-brand"><Logo /><p>Considered digital work.<br />Built in Colombo. Made for your next move.</p></div>
      <div><h2 className="footer-heading">Explore</h2><div className="footer-links"><Link to="/services">Our services</Link><Link to="/portfolio">Concept projects</Link><Link to="/about">About Swift Digital</Link><Link to="/contact">Start a conversation</Link></div></div>
      <div><h2 className="footer-heading">Let's connect</h2><div className="footer-links"><span>Colombo, Sri Lanka</span><span>Working locally & internationally</span><button type="button" onClick={whatsapp} className="w-fit text-left transition-colors hover:text-white">Chat on WhatsApp</button><span className="footer-language">English / Sinhala / Tamil</span></div></div>
    </div>
    <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Swift Digital. All rights reserved.</p><p>Websites. Marketing. Software. Built with intention.</p><Link to="/contact" className="transition-colors hover:text-white">swiftdigital.online</Link></div>
  </div></footer>;
}