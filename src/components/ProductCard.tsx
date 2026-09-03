import { Product } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const tiers = product.priceTiers && product.priceTiers.length > 0 ? product.priceTiers : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E6E0D4] hover:border-[#1B4332] h-full"
    >
      {/* Mobile: Food List View Card */}
      <div className="flex sm:hidden p-3 gap-3.5 items-center">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          {!product.available && (
            <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center p-1">
              <span className="bg-white text-[#1B4332] px-1.5 py-0.5 rounded text-[9px] font-bold">
                Unavailable
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h3 className="font-display text-base font-bold text-[#1B4332] leading-snug">
              {product.name}
            </h3>
            
            {/* Price Tiers in Mobile List View */}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 my-1">
              {tiers ? (
                tiers.map((tier, idx) => (
                  <span key={idx} className="text-xs text-[#1B4332] font-bold">
                    {tier.price} <span className="text-[10px] text-stone-500 font-normal">/{tier.quantity}</span>
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#1B4332] font-bold">
                  {product.price} <span className="text-[10px] text-stone-500 font-normal">/{product.quantityStr}</span>
                </span>
              )}
            </div>

            <p className="text-stone-500 text-xs line-clamp-1 leading-snug">
              {product.description}
            </p>
          </div>

          <div className="mt-2.5 flex justify-end">
            <Link 
              to={`/contact?item=${product.id}`}
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#1B4332] text-[#FDFBF7] hover:bg-[#143526] shadow-sm active:scale-95 transition-all"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop / Tablet: Grid Card */}
      <div className="hidden sm:flex sm:flex-col h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
          />
          {!product.available && (
            <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center backdrop-blur-sm p-2">
              <span className="bg-white text-[#1B4332] px-4 py-1.5 rounded-full text-sm font-medium tracking-wide text-center">
                Unavailable
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 md:p-6 flex flex-col flex-grow">
          <h3 className="font-display text-base md:text-xl font-bold text-[#1B4332] leading-snug mb-2" title={product.name}>
            {product.name}
          </h3>
          
          <div className="mb-3">
            {tiers ? (
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                {tiers.map((tier, idx) => (
                  <div key={idx} className="flex items-baseline gap-1 leading-tight">
                    <span className="text-sm md:text-base font-bold text-[#1B4332]">{tier.price}</span>
                    <span className="text-xs text-[#7A7265] font-medium">/{tier.quantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-baseline gap-1 leading-tight">
                <span className="text-base md:text-lg font-bold text-[#1B4332]">{product.price}</span>
                <span className="text-xs text-[#968F80] font-medium">/{product.quantityStr}</span>
              </div>
            )}
          </div>
          
          <p className="text-[#5C5C5C] text-xs md:text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
            {product.description}
          </p>
          
          <div className="pt-3 border-t border-[#E6E0D4] mt-auto flex">
            <Link 
              to={`/contact?item=${product.id}`}
              className={`w-full text-center py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors ${
                product.available 
                  ? 'bg-[#1B4332] text-[#FDFBF7] hover:bg-[#143526] shadow-md shadow-[#1B4332]/10 active:scale-95' 
                  : 'bg-[#E6E0D4] text-[#968F80] pointer-events-none'
              }`}
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
