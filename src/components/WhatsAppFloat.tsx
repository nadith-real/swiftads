import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from './ContactChannel';

export default function WhatsAppFloat() {
  const whatsapp = useWhatsApp();
  return <button type="button" className="whatsapp-float" onClick={whatsapp} aria-label="Chat on WhatsApp"><MessageCircle aria-hidden="true" /><span>Chat with us</span></button>;
}