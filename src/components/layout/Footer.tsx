import { Link } from 'react-router-dom';
import { config } from '@/data/config';
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B4332] text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/ajwa-kitchen-logo.webp" 
                alt="Ajwa's Kitchen Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-[#A67C52]/40 shadow-md"
              />
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                {config.businessName}
              </h3>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Freshly made-to-order Pakistani savoury delights. Prepared in a clean home kitchen using traditional recipes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#A67C52] font-semibold mb-6 tracking-widest text-xs uppercase">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-[#FDFBF7] transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-[#FDFBF7] transition-colors">Our Menu</Link></li>
              <li><Link to="/about" className="hover:text-[#FDFBF7] transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#FDFBF7] transition-colors">How It Works</Link></li>
              <li><Link to="/faq" className="hover:text-[#FDFBF7] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#A67C52] font-semibold mb-6 tracking-widest text-xs uppercase">Information</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-[#FDFBF7] transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#FDFBF7] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#FDFBF7] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[#A67C52] font-semibold mb-6 tracking-widest text-xs uppercase">Connect</h4>
            <div className="space-y-3 text-sm mb-6">
              {config.contact.phone && config.contact.phone !== "[Phone Number]" && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#A67C52]" />
                  <a href={`tel:${config.contact.phone.replace(/\s+/g, '')}`} className="hover:text-[#FDFBF7] transition-colors">
                    {config.contact.phone}
                  </a>
                </div>
              )}
              {config.contact.whatsappUrl && (
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366] fill-current" />
                  <a 
                    href={config.contact.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#25D366] transition-colors"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              )}
              {config.contact.email && config.contact.email !== "[Email Address]" && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#A67C52]" />
                  <a href={`mailto:${config.contact.email}`} className="hover:text-[#FDFBF7] transition-colors">
                    {config.contact.email}
                  </a>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <a href={config.contact.whatsappUrl} 
                 target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-[#143526] hover:bg-[#25D366] flex items-center justify-center transition-colors text-white shadow-sm"
                 aria-label="WhatsApp"
                 title="Chat on WhatsApp">
                <WhatsAppIcon className="h-4 w-4 fill-current" />
              </a>
              <a href={config.social.instagram !== "[Instagram Link]" ? config.social.instagram : "#"} 
                 target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-[#143526] hover:bg-[#E1306C] flex items-center justify-center transition-colors text-white shadow-sm"
                 aria-label="Instagram"
                 title="Follow on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              {config.social.facebook && config.social.facebook !== "[Facebook Link]" && (
                <a href={config.social.facebook}
                   target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-[#143526] hover:bg-[#1877F2] flex items-center justify-center transition-colors text-white shadow-sm"
                   aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#143526] flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest text-[#FDFBF7]/70">
          <p>© {currentYear} {config.businessName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made fresh for you.
          </p>
        </div>
      </div>
    </footer>
  );
}
