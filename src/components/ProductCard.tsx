import { Product } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E6E0D4] hover:border-[#1B4332]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-white text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="font-display text-xl font-bold text-[#1B4332] leading-tight">
            {product.name}
          </h3>
          <div className="text-right flex-shrink-0">
            <span className="block text-lg font-bold text-[#1B4332]">{product.price}</span>
            <span className="block text-xs text-[#968F80] font-medium">{product.quantityStr}</span>
          </div>
        </div>
        
        <p className="text-[#5C5C5C] text-sm leading-relaxed mb-8 flex-grow">
          {product.description}
        </p>
        
        <div className="pt-4 border-t border-[#E6E0D4] mt-auto flex gap-3">
          <Link 
            to={`/contact?item=${product.id}`}
            className={`flex-1 text-center py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors ${
              product.available 
                ? 'bg-[#1B4332] text-[#FDFBF7] hover:bg-[#143526] shadow-md shadow-[#1B4332]/10' 
                : 'bg-[#E6E0D4] text-[#968F80] pointer-events-none'
            }`}
          >
            Order Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
