import { useState } from 'react';
import { motion } from 'motion/react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

const categories = [
  { id: 'all', name: 'All Delights' },
  { id: 'kebabs', name: 'Kebabs' },
  { id: 'samosas', name: 'Samosas' },
  { id: 'cutlets-patties', name: 'Patties & Cutlets' },
  { id: 'rolls-nuggets', name: 'Rolls & Nuggets' },
];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-[#1B4332] pt-16 sm:pt-20 pb-20 sm:pb-24 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-6">Our Savoury Delights</h1>
          <p className="text-sm sm:text-xl text-[#FDFBF7]/90 leading-relaxed max-w-2xl mx-auto">
            Made fresh when you order. Explore our selection of homemade Pakistani savouries, perfect for tea time, gatherings, or a delicious snack.
          </p>
        </motion.div>
      </section>

      {/* Category Tabs & Products Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-10">
        {/* Category Filter Tabs - Hidden on mobile (List View), Visible on tablet/desktop (Tab View) */}
        <div className="hidden sm:flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${
                activeCategory === cat.id
                  ? 'bg-[#1B4332] text-[#FDFBF7] shadow-[#1B4332]/20 scale-105'
                  : 'bg-white text-[#5C5C5C] border border-[#E6E0D4] hover:border-[#1B4332] hover:text-[#1B4332]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Mobile View: 1-Column Continuous Food List View */}
        <div className="flex sm:hidden flex-col gap-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Desktop / Tablet View: Tabbed Multi-Column Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
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
