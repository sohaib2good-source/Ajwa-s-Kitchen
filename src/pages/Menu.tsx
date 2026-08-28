import { motion } from 'motion/react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export function Menu() {
  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-[#1B4332] pt-20 pb-24 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Our Savoury Delights</h1>
          <p className="text-xl text-[#FDFBF7]/90 leading-relaxed max-w-2xl mx-auto">
            Made fresh when you order. Explore our selection of homemade Pakistani savouries, perfect for tea time, gatherings, or a delicious snack.
          </p>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Order Info */}
      <section className="max-w-4xl mx-auto px-4 mt-24 text-center">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6E0D4] shadow-sm">
          <h2 className="font-display text-3xl font-bold text-[#1B4332] mb-4">Ordering Information</h2>
          <p className="text-[#5C5C5C] mb-6">
            To ensure the highest quality and freshness, all items are made to order. Please allow adequate time for preparation, especially for larger quantities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm font-medium text-[#5C5C5C]">
            <span className="bg-stone-100 px-4 py-2 rounded-full">Minimum orders may apply</span>
            <span className="bg-stone-100 px-4 py-2 rounded-full">Advance notice required</span>
          </div>
        </div>
      </section>
    </div>
  );
}
