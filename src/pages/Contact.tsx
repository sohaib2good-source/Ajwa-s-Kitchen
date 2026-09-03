import { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { config } from '@/data/config';
import { products } from '@/data/products';
import { Phone, Mail, MapPin, Instagram, Facebook, CheckCircle2, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedItem = searchParams.get('item');

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API call since there is no backend configured yet
    setTimeout(() => {
      // Simulate success
      setFormState('success');
      
      // Reset form after a delay
      setTimeout(() => {
        setFormState('idle');
        (e.target as HTMLFormElement).reset();
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-[#1B4332] pt-20 pb-32 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Let’s Get Your Order Started</h1>
          <p className="text-xl text-[#FDFBF7]/90 leading-relaxed max-w-2xl mx-auto">
            Reach out to place an order or ask any questions. We're here to bring a little taste of home to you.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Contact Info (Left Column) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-stone-900 text-white rounded-3xl p-8 md:p-10 shadow-xl"
          >
            <h2 className="font-display text-3xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1B4332]/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-[#A67C52]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-300 text-sm mb-1 uppercase tracking-wider">Phone / WhatsApp</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                    <a 
                      href={`tel:${config.contact.phone.replace(/\s+/g, '')}`} 
                      className="text-lg font-medium hover:text-[#A67C52] transition-colors"
                    >
                      {config.contact.phone}
                    </a>
                    <a
                      href={config.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-md transition-all duration-300 hover:scale-105 w-fit"
                      aria-label="Open WhatsApp Chat"
                      title="Open WhatsApp Chat"
                    >
                      <WhatsAppIcon className="h-4 w-4 fill-current" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {config.contact.email && config.contact.email !== "[Email Address]" && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1B4332]/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#A67C52]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-300 text-sm mb-1 uppercase tracking-wider">Email</h3>
                    <a href={`mailto:${config.contact.email}`} className="text-lg hover:text-[#A67C52] transition-colors">
                      {config.contact.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1B4332]/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-[#A67C52]" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-300 text-sm mb-1 uppercase tracking-wider">Service Area</h3>
                  <p className="text-lg font-medium text-stone-200">{config.contact.serviceArea}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-stone-300 text-sm mb-4 uppercase tracking-wider">Connect With Us</h3>
              <div className="flex gap-4">
                <a 
                  href={config.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#143526] hover:bg-[#25D366] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  aria-label="WhatsApp"
                  title="Message us on WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5 fill-current" />
                </a>
                <a 
                  href={config.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#143526] hover:bg-[#E1306C] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-sm"
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                {config.social.facebook && config.social.facebook !== "[Facebook Link]" && (
                  <a 
                    href={config.social.facebook}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#143526] hover:bg-[#1877F2] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-sm"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Order Form (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#E6E0D4]"
          >
            <h2 className="font-display text-3xl font-bold text-[#1B4332] mb-2">Order Request</h2>
            <p className="text-[#5C5C5C] mb-8">Fill out the form below to request an order. We will contact you to confirm details and pricing.</p>

            {formState === 'success' ? (
              <div className="bg-[#F1EDE4] border border-[#1B4332] rounded-2xl p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-[#1B4332] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1B4332] mb-2">Request Sent Successfully</h3>
                <p className="text-[#1B4332]">Thank you for your order request! We will be in touch shortly to confirm your order.</p>
              </div>
            ) : formState === 'error' ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-8">
                <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-900 mb-2">Something went wrong</h3>
                <p className="text-red-800">We couldn't send your request. Please try again or contact us directly via WhatsApp.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-4 px-6 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#1B4332] mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#1B4332] mb-2">Phone / WhatsApp <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                      placeholder="Your number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="product" className="block text-sm font-semibold text-[#1B4332] mb-2">Select Product <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        id="product" 
                        required
                        defaultValue={preselectedItem || ""}
                        className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                      >
                        <option value="" disabled>Choose an item...</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-semibold text-[#1B4332] mb-2">Quantity <span className="text-red-500">*</span></label>
                    <input 
                      type="number" 
                      id="quantity" 
                      min="1"
                      required
                      className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                      placeholder="E.g., 2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-[#1B4332] mb-2">Preferred Date <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      id="date" 
                      required
                      className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="delivery" className="block text-sm font-semibold text-[#1B4332] mb-2">Pickup / Delivery <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        id="delivery" 
                        required
                        className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                      >
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery (Subject to area)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-[#1B4332] mb-2">Additional Notes</label>
                  <textarea 
                    id="notes" 
                    rows={4}
                    className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow resize-none"
                    placeholder="Any special requests, multiple items, or dietary requirements?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full bg-[#1B4332] text-white rounded-xl py-4 font-bold text-lg hover:bg-[#143526] transition-colors shadow-sm disabled:bg-[#1B4332]/70 flex justify-center items-center"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Sending Request...
                    </>
                  ) : (
                    'Send Order Request'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
