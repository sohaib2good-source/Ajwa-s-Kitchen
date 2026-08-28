import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { config } from '@/data/config';
import { Link } from 'react-router-dom';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-[#FDFBF7]/90 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about ordering from Ajwa's Kitchen.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-[#E6E0D4]"
        >
          <div className="space-y-4">
            {config.faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-[#E6E0D4] rounded-2xl overflow-hidden transition-colors hover:border-[#1B4332]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full px-6 py-5 text-left bg-white focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-[#1B4332] pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-[#1B4332] transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-[#5C5C5C] leading-relaxed border-t border-[#E6E0D4] pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center p-6 bg-[#F9F7F2] rounded-2xl">
            <h3 className="font-semibold text-[#1B4332] mb-2">Still have questions?</h3>
            <p className="text-[#5C5C5C] mb-4 text-sm">We're happy to help you with any other inquiries.</p>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-[#1B4332] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
