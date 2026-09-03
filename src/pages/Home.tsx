import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, UtensilsCrossed, Clock, Heart, ShieldCheck, ChevronRight } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export function Home() {
  const featuredProducts = products.slice(0, 3); // Show top 3 products

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-[#FDFBF7] overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1EDE4] text-[#1B4332] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#F1EDE4]0"></span>
                Made Fresh to Order • Homemade Taste • Affordable Prices
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1B4332] leading-[1.1] mb-6">
                Freshly Made. <br/>
                Full of Taste.<br/>
                <span className="italic text-[#A67C52]">Made for You.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#5C5C5C] mb-8 leading-relaxed max-w-lg">
                Homemade Pakistani savoury delights, freshly prepared to order and made with care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact" 
                  className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-[#1B4332] text-[#FDFBF7] font-bold hover:bg-[#143526] transition-colors shadow-lg shadow-[#1B4332]/20 text-lg"
                >
                  Order Now
                </Link>
                <Link 
                  to="/menu" 
                  className="inline-flex justify-center items-center px-8 py-3 text-[#1B4332] font-bold border-b-2 border-[#1B4332] hover:opacity-80 transition-opacity text-lg"
                >
                  Explore Our Menu
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] w-full grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6"
            >
              <div className="row-span-2 rounded-[2rem] overflow-hidden shadow-lg relative group">
                <img 
                  src="/chicken-shami.webp" 
                  alt="Chicken Shami" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-[#1B4332]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-2xl text-[#FDFBF7] font-bold drop-shadow-md">Chicken Shami</h3>
                  <p className="text-[#A67C52] text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Rich & Spiced</p>
                </div>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-lg relative group">
                <img 
                  src="/allo-samosa.webp" 
                  alt="Mini Aloo Samosa" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-[#1B4332]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-xl text-[#FDFBF7] font-bold drop-shadow-md">Mini Aloo Samosa</h3>
                  <p className="text-[#A67C52] text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Golden & Crispy</p>
                </div>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-lg relative group">
                <img 
                  src="/golla-kebab.webp" 
                  alt="Chicken Gola Kebab" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-[#1B4332]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-xl text-[#FDFBF7] font-bold drop-shadow-md">Chicken Gola Kebab</h3>
                  <p className="text-[#A67C52] text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Tender & Juicy</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <img 
                src="/ajwa-kitchen-logo.webp" 
                alt="Ajwa's Kitchen Authentic Home Cooking" 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-lg border-4 border-[#FDFBF7] object-cover ring-2 ring-[#E6E0D4]"
              />
            </div>
            <h2 className="font-display text-4xl font-bold text-[#1B4332] mb-6">A Little Taste of Home</h2>
            <p className="text-lg text-[#5C5C5C] leading-relaxed max-w-3xl mx-auto">
              Ajwa’s Kitchen is a home-based food business focused on preparing delicious savoury snacks fresh for every order. We believe in the simple joy of homemade taste. Every item is carefully prepared with good ingredients, ensuring you get the freshest flavours at affordable prices. Enjoy convenient ordering and food made specifically for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Freshness USP Section */}
      <section className="py-24 bg-[#F9F7F2] text-[#2D3322]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4 text-[#1B4332]">Freshness You Can Taste</h2>
            <p className="text-[#A67C52] text-lg max-w-2xl mx-auto">
              What makes Ajwa's Kitchen different is our commitment to preparing everything from scratch when you order.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Made to Order", desc: "Your food is prepared fresh for your order, never sitting ready." },
              { icon: Heart, title: "Homemade Taste", desc: "Carefully prepared with the comforting taste of homemade savouries." },
              { icon: ShieldCheck, title: "Great Value", desc: "Delicious food at prices designed to be affordable and accessible." },
              { icon: UtensilsCrossed, title: "Made With Care", desc: "Every order receives personal attention to taste and presentation." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-[#E6E0D4] hover:border-[#1B4332] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F1EDE4] flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-[#1B4332]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1B4332]">{feature.title}</h3>
                <p className="text-[#5C5C5C] leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlight Section */}
      <section className="py-12 sm:py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 gap-3 sm:gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#1B4332] mb-1 sm:mb-3">Our Savoury Delights</h2>
              <p className="text-sm sm:text-lg text-[#5C5C5C]">Made fresh when you order.</p>
            </div>
            <Link to="/menu" className="group inline-flex items-center text-sm sm:text-base text-[#1B4332] font-semibold hover:text-[#143526] transition-colors">
              View full menu <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white border-y border-[#E6E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-[#1B4332] mb-4">From Our Kitchen to Your Table</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-stone-100"></div>
            
            {[
              { step: "1", title: "Choose Your Favourites", desc: "Browse the savoury menu and select what you'd like." },
              { step: "2", title: "Place Your Order", desc: "Send your order through your preferred contact method." },
              { step: "3", title: "Freshly Prepared", desc: "Your order is prepared fresh and made ready for you." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center z-10"
              >
                <div className="w-24 h-24 mx-auto bg-[#FDFBF7] rounded-full border-4 border-white shadow-sm flex items-center justify-center mb-6">
                  <span className="font-display text-3xl font-bold text-[#1B4332]">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B4332] mb-3">{item.title}</h3>
                <p className="text-[#5C5C5C]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Occasions */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-stone-900 rounded-[2rem] p-8 md:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B4332]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1B4332]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Planning a Gathering?</h2>
              <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Make your next get-together easier with freshly prepared savoury favourites from Ajwa’s Kitchen. Perfect for family gatherings, tea parties, and weekend snacks.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-white text-[#1B4332] font-medium hover:bg-stone-100 transition-colors text-lg"
              >
                Ask About an Order
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Order CTA Section */}
      <section className="py-24 bg-[#1B4332] text-center text-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Ready to Enjoy Some Savoury Goodness?</h2>
            <p className="text-xl text-[#FDFBF7]/80 mb-10">
              Choose your favourites and place your order with Ajwa’s Kitchen.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex justify-center items-center px-10 py-4 rounded-full bg-white text-[#1B4332] font-bold hover:bg-stone-100 hover:scale-105 transition-all duration-300 text-lg shadow-lg"
            >
              Order Now <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
