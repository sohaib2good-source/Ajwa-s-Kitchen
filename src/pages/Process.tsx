import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChefHat, ShieldCheck, Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import { config } from '@/data/config';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const processItems = [
  {
    id: 'shami-kebab',
    title: 'Authentic Shami Kababs in Process',
    tagline: 'Traditional Hand-Mashed Method',
    imageWebp: '/shami-kebab-process.webp',
    imageJpeg: '/shami-kebab-process.jpeg',
    badge: 'Slow Simmered & Hand-Mashed',
    description: 
      'Witness the art of authentic Shami Kababs. We simmer 100% pure chicken and premium chana dal with whole roasted aromatic spices, then hand-mash using a traditional wooden pestle to create that iconic melt-in-the-mouth shredded texture (reshah). Handled with utmost care and hygiene, every batch captures genuine homemade heritage.',
    highlights: ['Pure shredded chicken breast', 'Traditional wooden pestle technique', 'No artificial binders or fillers']
  },
  {
    id: 'chicken-cutlets',
    title: 'Chicken Potato Cutlets in Process',
    tagline: 'Hand-Rolled & Golden Crumbed',
    imageWebp: '/chicken-cutlets-process.webp',
    imageJpeg: '/chicken-cutlets-process.jpeg',
    badge: 'Freshly Crumbed Perfection',
    description: 
      'Our chicken potato cutlets begin with tender seasoned chicken breast blended with fluffy potatoes, fresh green coriander, and balanced spices. Each cutlet is meticulously shaped by hand, dipped, and evenly coated in crisp golden breadcrumbs. Prepared in pristine kitchen conditions to ensure each bite fries up delightfully crisp on the outside and tender on the inside.',
    highlights: ['Delicate blend of chicken & herbs', 'Even golden breadcrumb coating', 'Hand-shaped with love & precision']
  },
  {
    id: 'chicken-nuggets',
    title: 'Chicken Nuggets in Process',
    tagline: 'Wholesome Real Chicken Bites',
    imageWebp: '/nuggets-process.webp',
    imageJpeg: '/nuggets-process.jpeg',
    badge: '100% Real Meat • Kid-Approved',
    description: 
      'Real food for your family. Unlike commercial factory nuggets, our nuggets are crafted exclusively from 100% fresh chicken breast, subtly seasoned with mild black pepper and aromatic spices. Freshly shaped into uniform bite-sized nuggets on sanitized platters, ready to be cooked fresh or safely packed for freezer storage.',
    highlights: ['100% fresh chicken breast', 'Zero artificial preservatives', 'Safe, hygienic food handling']
  }
];

export function Process() {
  return (
    <div className="w-full pb-20 sm:pb-28">
      {/* Hero Header */}
      <section className="bg-[#1B4332] pt-16 sm:pt-20 pb-20 sm:pb-24 px-4 text-center text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FDFBF7_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <ChefHat className="w-3.5 h-3.5 text-[#A67C52]" />
            Behind The Scenes
          </span>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Our Making Process
          </h1>
          <p className="text-sm sm:text-lg text-[#FDFBF7]/90 leading-relaxed max-w-2xl mx-auto">
            Every savoury delight at Ajwa's Kitchen is crafted fresh to order. We take deep pride in handling every step of the preparation process with genuine hygiene, utmost care, and artisanal passion.
          </p>
        </motion.div>
      </section>

      {/* Trust Highlights Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E6E0D4] p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center p-2">
            <div className="w-10 h-10 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] mb-2">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-[#1B4332]">Handled With Care</h3>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Gentle, artisanal handcrafting</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-10 h-10 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-[#1B4332]">100% Hygienic</h3>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Sanitized surfaces & utensils</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-10 h-10 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] mb-2">
              <ChefHat className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-[#1B4332]">Fresh To Order</h3>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Never mass produced in advance</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-10 h-10 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-[#1B4332]">Pure & Wholesome</h3>
            <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Premium chicken & natural spices</p>
          </div>
        </div>
      </section>

      {/* Process Showcase List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 space-y-12 sm:space-y-20">
        {processItems.map((item, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-[#E6E0D4] flex flex-col ${
                isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-stretch`}
            >
              {/* Process Image */}
              <div className="lg:w-1/2 relative bg-stone-100 overflow-hidden min-h-[280px] sm:min-h-[380px]">
                <picture>
                  <source srcSet={item.imageWebp} type="image/webp" />
                  <img
                    src={item.imageJpeg}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1B4332]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Process Details */}
              <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#A67C52] block mb-1">
                    {item.tagline}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1B4332] mb-4">
                    {item.title}
                  </h2>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2.5 mb-8">
                    {item.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-stone-700">
                        <div className="w-5 h-5 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] flex-shrink-0">
                          ✓
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E0D4] flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-400 font-medium">Handle & Care Guarantee</span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B4332] hover:text-[#143526] hover:underline"
                  >
                    <span>Order This Item</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="bg-gradient-to-br from-[#1B4332] via-[#14291F] to-stone-900 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <h2 className="font-display text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
            Taste The Difference That Care Makes
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Order fresh, unhurried homemade savouries for your family, events, or high tea gatherings across Lahore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-[#1B4332] hover:bg-[#FDFBF7] font-bold text-sm shadow-md transition-transform active:scale-95"
            >
              Explore Full Menu
            </Link>
            <a
              href={config.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-transform active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
