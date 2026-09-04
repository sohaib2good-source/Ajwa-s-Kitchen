import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { config } from '@/data/config';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Our Process', path: '/process' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#E6E0D4] shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 font-display font-bold text-xl tracking-tight text-[#1B4332] hover:opacity-85 transition-opacity">
              <img 
                src="/ajwa-kitchen-logo.webp" 
                alt="Ajwa's Kitchen Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-[#E6E0D4]"
              />
              <span className="text-xl sm:text-2xl font-bold tracking-tight">{config.businessName}</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#1B4332] ${
                  location.pathname === link.path ? 'text-[#1B4332] border-b-2 border-[#1B4332] pb-1' : 'text-[#5C5C5C]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact"
              className="bg-[#1B4332] text-[#FDFBF7] px-6 py-2 rounded-full text-sm font-semibold tracking-wide shadow-lg shadow-[#1B4332]/20 hover:opacity-90 transition-opacity active:scale-95"
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 text-[#5C5C5C] hover:text-[#1B4332] transition-colors focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-[#E6E0D4] shadow-lg"
          >
            <div className="px-4 py-3 divide-y divide-[#E6E0D4]/60">
              <nav className="flex flex-col py-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-3 px-3 rounded-xl text-sm font-semibold transition-colors ${
                      location.pathname === link.path
                        ? 'bg-[#1B4332]/10 text-[#1B4332] font-bold'
                        : 'text-stone-700 hover:bg-stone-50 hover:text-[#1B4332]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {location.pathname === link.path && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
                    )}
                  </Link>
                ))}
              </nav>
              <div className="pt-3 pb-2">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-[#1B4332] text-[#FDFBF7] px-4 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-[#143526] transition-colors shadow-md shadow-[#1B4332]/15 active:scale-98"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
