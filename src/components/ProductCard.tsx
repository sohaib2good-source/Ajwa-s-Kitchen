import { Product } from '@/data/products';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryTier = product.priceTiers && product.priceTiers.length > 0 ? product.priceTiers[0] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E6E0D4] hover:border-[#1B4332] h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center backdrop-blur-sm p-2">
            <span className="bg-white text-[#1B4332] px-2 py-0.5 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium tracking-wide text-center">
              Unavailable
            </span>
          </div>
        )}
      </div>
      
      <div className="p-2.5 sm:p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1.5 sm:mb-3 gap-0.5 sm:gap-2">
          <h3 className="font-display text-xs sm:text-base md:text-xl font-bold text-[#1B4332] leading-tight line-clamp-1 sm:line-clamp-2" title={product.name}>
            {product.name}
          </h3>
          
          <div className="sm:text-right flex-shrink-0">
            {primaryTier ? (
              <div>
                <div className="flex items-baseline sm:justify-end gap-1 leading-tight">
                  <span className="text-xs sm:text-sm md:text-base font-bold text-[#1B4332]">{primaryTier.price}</span>
                  <span className="text-[10px] sm:text-xs text-[#7A7265] font-medium">/{primaryTier.quantity}</span>
                </div>
                {/* Additional tiers visible on tablet / desktop */}
                {product.priceTiers && product.priceTiers.length > 1 && (
                  <div className="hidden sm:flex flex-col items-end gap-0.5 mt-0.5">
                    {product.priceTiers.slice(1).map((tier, idx) => (
                      <div key={idx} className="flex items-baseline justify-end gap-1 leading-tight">
                        <span className="text-xs font-bold text-[#1B4332]">{tier.price}</span>
                        <span className="text-[10px] text-[#7A7265] font-medium">/{tier.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Mobile badge for extra sizes */}
                {product.priceTiers && product.priceTiers.length > 1 && (
                  <span className="text-[10px] text-[#A67C52] font-medium sm:hidden block">
                    +{product.priceTiers.length - 1} more size
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-baseline sm:justify-end gap-1 leading-tight">
                <span className="text-xs sm:text-base md:text-lg font-bold text-[#1B4332]">{product.price}</span>
                <span className="text-[10px] sm:text-xs text-[#968F80] font-medium">/{product.quantityStr}</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-[#5C5C5C] text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed line-clamp-2 mb-2 sm:mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="pt-2 sm:pt-3 border-t border-[#E6E0D4] mt-auto flex">
          <Link 
            to={`/contact?item=${product.id}`}
            className={`w-full text-center py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors ${
              product.available 
                ? 'bg-[#1B4332] text-[#FDFBF7] hover:bg-[#143526] shadow-sm sm:shadow-md shadow-[#1B4332]/10 active:scale-95' 
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
