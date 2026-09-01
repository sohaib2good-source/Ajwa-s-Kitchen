import { motion } from 'motion/react';

export function About() {
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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">A Little Taste of Home</h1>
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
          <div className="flex justify-center -mt-16 sm:-mt-24 mb-8">
            <img 
              src="/ajwa-kitchen-logo.jpg" 
              alt="Ajwa's Kitchen Logo" 
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-2xl border-4 border-white object-cover ring-2 ring-[#E6E0D4]"
            />
          </div>
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="lead text-xl text-[#5C5C5C] leading-relaxed mb-8">
              Ajwa’s Kitchen is a home-based food business focused on preparing delicious Pakistani savoury snacks fresh for every order. We believe that the best food doesn't come from a factory, but from a kitchen filled with warmth and care.
            </p>
            
            <h2 className="font-display text-3xl font-bold text-[#1B4332] mt-12 mb-6">Our Promise</h2>
            <p className="text-[#5C5C5C] mb-6">
              When you order from Ajwa's Kitchen, you're not getting something that has been sitting in a freezer or on a shelf. You are receiving food that was prepared specifically for you. This commitment to fresh preparation is what gives our food its comforting, homemade taste.
            </p>
            
            <h2 className="font-display text-3xl font-bold text-[#1B4332] mt-12 mb-6">Careful Preparation</h2>
            <p className="text-[#5C5C5C] mb-6">
              Every kebab, samosa, and chicken potato cutlet is made with careful attention to detail. We use good ingredients and traditional recipes to ensure that every bite brings a little taste of home to your table. 
            </p>
            
            <h2 className="font-display text-3xl font-bold text-[#1B4332] mt-12 mb-6">Accessible Quality</h2>
            <p className="text-[#5C5C5C] mb-8">
              We believe that delicious, freshly made food should be accessible. That's why we maintain affordable pricing while never compromising on the quality and freshness that define Ajwa's Kitchen.
            </p>

            <div className="bg-[#F1EDE4] rounded-2xl p-8 text-center mt-12">
              <h3 className="font-display text-2xl font-bold text-[#1B4332] mb-3">Experience the difference of freshly made.</h3>
              <p className="text-[#1B4332] font-medium">From our kitchen to your table.</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
