import { Link } from 'react-router-dom';
import { config } from '@/data/config';
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';

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
              {config.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#A67C52] font-semibold mb-6 tracking-widest text-xs uppercase">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-[#FDFBF7] transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-[#FDFBF7] transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-[#FDFBF7] transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#FDFBF7] transition-colors">How It Works</Link></li>
              <li><Link to="/faq" className="hover:text-[#FDFBF7] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#A67C52] font-semibold mb-6 tracking-widest text-xs uppercase">Support</h4>
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
              {config.contact.phone !== "[Phone Number]" && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#A67C52]" />
                  <span>{config.contact.phone}</span>
                </div>
              )}
              {config.contact.email !== "[Email Address]" && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#A67C52]" />
                  <span>{config.contact.email}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
              <a href={config.social.instagram !== "[Instagram Link]" ? config.social.instagram : "#"} 
                 target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-[#143526] flex items-center justify-center hover:bg-[#1B4332] transition-colors text-white"
                 aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={config.social.facebook !== "[Facebook Link]" ? config.social.facebook : "#"}
                 target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-[#143526] flex items-center justify-center hover:bg-[#1B4332] transition-colors text-white"
                 aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
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
