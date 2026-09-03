import { motion } from 'motion/react';
import { config } from '@/data/config';

export function Terms() {
  return (
    <div className="w-full pb-24">
      <section className="bg-[#1B4332] pt-20 pb-24 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Terms & Conditions</h1>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E6E0D4] prose prose-stone max-w-none prose-headings:text-[#1B4332] prose-headings:font-display">
          <p className="text-stone-500 font-medium text-sm">Last updated: 2024</p>
          
          <h2 className="text-[#1B4332] font-display font-bold text-2xl mt-8 mb-4 border-b border-[#E6E0D4]/60 pb-2">1. Introduction</h2>
          <p>These terms and conditions outline the rules and regulations for the use of {config.businessName}'s Website and services.</p>
          
          <h2 className="text-[#1B4332] font-display font-bold text-2xl mt-8 mb-4 border-b border-[#E6E0D4]/60 pb-2">2. Orders and Preparation</h2>
          <p>All our items are made fresh to order. We require sufficient advance notice as specified for each product or order size. We reserve the right to decline orders if we cannot meet the requested timeline while maintaining our quality standards.</p>

          <h2 className="text-[#1B4332] font-display font-bold text-2xl mt-8 mb-4 border-b border-[#E6E0D4]/60 pb-2">3. Pricing and Availability</h2>
          <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue a product without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance.</p>

          <h2 className="text-[#1B4332] font-display font-bold text-2xl mt-8 mb-4 border-b border-[#E6E0D4]/60 pb-2">4. Cancellations</h2>
          <p>Since all food is prepared fresh specifically for your order, cancellations must be made with sufficient notice prior to the scheduled preparation time. Late cancellations may be subject to charges.</p>

          <h2 className="text-[#1B4332] font-display font-bold text-2xl mt-8 mb-4 border-b border-[#E6E0D4]/60 pb-2">5. Delivery</h2>
          <p>If delivery is offered, it is subject to availability and may incur additional charges depending on the location.</p>
          
          <h2 className="text-[#1B4332] font-display font-bold text-2xl mt-8 mb-4 border-b border-[#E6E0D4]/60 pb-2">6. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us.</p>
        </div>
      </section>
    </div>
  );
}
