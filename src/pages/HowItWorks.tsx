import { motion } from 'motion/react';

export function HowItWorks() {
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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">How It Works</h1>
          <p className="text-xl text-[#FDFBF7]/90 leading-relaxed max-w-2xl mx-auto">
            A simple process to get freshly prepared savoury delights delivered to your table.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-[#E6E0D4]"
        >
          <div className="space-y-16">
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[#F1EDE4] text-[#1B4332] rounded-full flex items-center justify-center font-display text-3xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1B4332] mb-3">Choose Your Favourites</h3>
                <p className="text-[#5C5C5C] text-lg leading-relaxed">
                  Browse our Menu section to see the variety of homemade savoury snacks we offer. From our classic Chicken Shami Kebabs to crispy samosas and cutlets, decide what you'd like to enjoy.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[#F1EDE4] text-[#1B4332] rounded-full flex items-center justify-center font-display text-3xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1B4332] mb-3">Place Your Order</h3>
                <p className="text-[#5C5C5C] text-lg leading-relaxed">
                  Head over to the Contact page and send us your order details. You can use the order request form or reach out directly via WhatsApp. Let us know the quantities and when you'd like your order.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[#F1EDE4] text-[#1B4332] rounded-full flex items-center justify-center font-display text-3xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1B4332] mb-3">Freshly Prepared</h3>
                <p className="text-[#5C5C5C] text-lg leading-relaxed">
                  Once your order is confirmed, we begin preparing it fresh. Your items are made specifically for you and prepared for pickup or delivery at the agreed time, ensuring maximum freshness and taste.
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </section>
    </div>
  );
}
