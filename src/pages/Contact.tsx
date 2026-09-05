import { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { config } from '@/data/config';
import { products, Product, PriceTier } from '@/data/products';
import { 
  Phone, MapPin, Instagram, Facebook, 
  CheckCircle2, AlertCircle, Loader2, 
  Check, Plus, Minus, ShoppingBag, Receipt, ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

interface OrderItemConfig {
  tierIndex: number;
  packCount: number;
}

interface OrderItemDetail {
  productId: string;
  name: string;
  selectedQuantity: string;
  packs: number;
  unitPrice: number;
  formattedUnitPrice: string;
  totalPrice: number;
  formattedTotalPrice: string;
}

interface OrderPayload {
  orderId: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  fulfillment: {
    type: 'pickup' | 'delivery' | 'undecided';
    deliveryAddress: string;
    preferredDate: string;
    serviceArea: string;
    additionalNotes: string;
  };
  items: OrderItemDetail[];
  summary: {
    totalItems: number;
    totalPacks: number;
    approximateTotal: number;
    currency: string;
    formattedTotal: string;
  };
}

function parseNumericPrice(priceStr: string): number {
  const digits = priceStr.replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedItem = searchParams.get('item');

  // Multi-item selection state: productId -> { tierIndex, packCount }
  const [selectedItems, setSelectedItems] = useState<Record<string, OrderItemConfig>>(() => {
    if (preselectedItem && products.some(p => p.id === preselectedItem)) {
      return { [preselectedItem]: { tierIndex: 0, packCount: 1 } };
    }
    return {};
  });

  // Customer & fulfillment form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery' | 'undecided'>('pickup');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // UI States
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<OrderPayload | null>(null);

  // Toggle item checkbox
  const toggleItemSelection = (product: Product) => {
    setValidationError(null);
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (updated[product.id]) {
        delete updated[product.id];
      } else {
        updated[product.id] = { tierIndex: 0, packCount: 1 };
      }
      return updated;
    });
  };

  // Change tier for an item
  const handleTierChange = (productId: string, tierIndex: number) => {
    setSelectedItems(prev => {
      if (!prev[productId]) return prev;
      return {
        ...prev,
        [productId]: { ...prev[productId], tierIndex }
      };
    });
  };

  // Stepper for pack quantity
  const handlePackCountChange = (productId: string, delta: number) => {
    setSelectedItems(prev => {
      if (!prev[productId]) return prev;
      const newCount = Math.max(1, Math.min(50, prev[productId].packCount + delta));
      return {
        ...prev,
        [productId]: { ...prev[productId], packCount: newCount }
      };
    });
  };

  // Compute item details and total price
  const calculatedItems = Object.entries(selectedItems)
    .map(([productId, configItem]) => {
      const product = products.find(p => p.id === productId);
      if (!product) return null;
      
      const tiers: PriceTier[] = product.priceTiers && product.priceTiers.length > 0
        ? product.priceTiers
        : [{ quantity: product.quantityStr, price: product.price }];

      const selectedTier = tiers[configItem.tierIndex] || tiers[0];
      const unitPrice = parseNumericPrice(selectedTier.price);
      const totalPrice = unitPrice * configItem.packCount;

      return {
        product,
        tier: selectedTier,
        packCount: configItem.packCount,
        unitPrice,
        totalPrice
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const approximateTotal = calculatedItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalPacksCount = calculatedItems.reduce((acc, curr) => acc + curr.packCount, 0);

  // Handle Form Submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    if (calculatedItems.length === 0) {
      setValidationError('Please select at least one savoury delight from the menu below.');
      const itemsElement = document.getElementById('order-items-selection');
      if (itemsElement) itemsElement.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setFormState('submitting');

    const orderId = `AJK-${Date.now().toString().slice(-6)}`;
    const payload: OrderPayload = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name,
        phone: phone.trim() || 'Not provided',
        email: email || 'Not provided'
      },
      fulfillment: {
        type: fulfillmentType,
        deliveryAddress: fulfillmentType === 'delivery' ? (address.trim() || 'To be shared on WhatsApp') : fulfillmentType === 'pickup' ? 'Store Pickup' : 'Flexible / To Be Decided',
        preferredDate: preferredDate || 'Flexible / ASAP',
        serviceArea: config.contact.serviceArea,
        additionalNotes: notes || 'None'
      },
      items: calculatedItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        selectedQuantity: item.tier.quantity,
        packs: item.packCount,
        unitPrice: item.unitPrice,
        formattedUnitPrice: item.tier.price,
        totalPrice: item.totalPrice,
        formattedTotalPrice: `Rs. ${item.totalPrice.toLocaleString()}`
      })),
      summary: {
        totalItems: calculatedItems.length,
        totalPacks: totalPacksCount,
        approximateTotal,
        currency: 'PKR',
        formattedTotal: `Rs. ${approximateTotal.toLocaleString()}`
      }
    };

    const itemsSummaryText = calculatedItems
      .map((item, idx) => `${idx + 1}. ${item.product.name} (${item.tier.quantity}) × ${item.packCount} pack(s) = Rs. ${item.totalPrice.toLocaleString()}`)
      .join('\n');

    const fulfillmentText = fulfillmentType === 'delivery' 
      ? `Delivery to: ${address.trim() || 'To be shared on WhatsApp'}` 
      : fulfillmentType === 'pickup' 
      ? 'Store Pickup' 
      : 'Flexible / To Be Decided';

    const emailMessage = `
NEW ORDER REQUEST - ${orderId}
--------------------------------------------------
Customer Name: ${name}
Phone / WhatsApp: ${phone.trim() || 'Not provided'}
Date: ${preferredDate || 'Flexible / ASAP'}
Fulfillment: ${fulfillmentText}
Service Area: ${config.contact.serviceArea}
Special Requests: ${notes || 'None'}

ITEMS ORDERED:
${itemsSummaryText}

--------------------------------------------------
APPROXIMATE TOTAL: Rs. ${approximateTotal.toLocaleString()}
(Excluding delivery fee; final confirmation via WhatsApp)
`.trim();

    const web3FormData = {
      subject: `New Order Request #${orderId} from ${name} (Rs. ${approximateTotal.toLocaleString()})`,
      from_name: "Ajwa's Kitchen Website",
      name,
      phone: phone.trim() || 'Not provided',
      order_id: orderId,
      order_total: `Rs. ${approximateTotal.toLocaleString()}`,
      order_items: itemsSummaryText,
      fulfillment_type: fulfillmentText,
      preferred_date: preferredDate || 'Flexible / ASAP',
      special_notes: notes || 'None',
      message: emailMessage,
    };

    try {
      // 1. Primary: Call secure backend proxy /api/submit-order (keeps API key hidden from public view)
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(web3FormData),
      });

      if (!res.ok) {
        // Fallback: direct Web3Forms submission if serverless endpoint is not present
        const fallbackKey =
          import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
          atob('ODkzZTQ5NzgtMTk0Yi00ODhiLTg1MjYtZDY5ZGU2YTJmNjBl');
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: fallbackKey,
            ...web3FormData,
          }),
        });
      }
    } catch (err) {
      console.warn('Backend proxy unavailable, attempting direct dispatch:', err);
      try {
        const fallbackKey =
          import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
          atob('ODkzZTQ5NzgtMTk0Yi00ODhiLTg1MjYtZDY5ZGU2YTJmNjBl');
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: fallbackKey,
            ...web3FormData,
          }),
        });
      } catch (fallbackErr) {
        console.error('Failed to dispatch order email:', fallbackErr);
      }
    }

    setSubmittedOrder(payload);
    setFormState('success');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // WhatsApp Order Message format
  const generateWhatsAppMessage = () => {
    if (!submittedOrder) return '';
    let msg = `*NEW ORDER REQUEST - ${submittedOrder.orderId}*\n\n`;
    msg += `*Customer:* ${submittedOrder.customer.name}\n`;
    if (submittedOrder.customer.phone && submittedOrder.customer.phone !== 'Not provided') {
      msg += `*Phone:* ${submittedOrder.customer.phone}\n`;
    }
    msg += `*Date:* ${submittedOrder.fulfillment.preferredDate}\n`;
    const fulfillmentDesc = submittedOrder.fulfillment.type === 'delivery' 
      ? `Delivery (${submittedOrder.fulfillment.deliveryAddress})` 
      : submittedOrder.fulfillment.type === 'pickup' 
      ? 'Self Pickup' 
      : 'Flexible / Discuss on WhatsApp';
    msg += `*Type:* ${fulfillmentDesc}\n\n`;
    msg += `*ITEMS ORDERED:*\n`;
    submittedOrder.items.forEach(item => {
      msg += `• ${item.name} (${item.selectedQuantity}) × ${item.packs} = ${item.formattedTotalPrice}\n`;
    });
    msg += `\n*Approximate Total:* ${submittedOrder.summary.formattedTotal}\n`;
    if (submittedOrder.fulfillment.additionalNotes && submittedOrder.fulfillment.additionalNotes !== 'None') {
      msg += `*Notes:* ${submittedOrder.fulfillment.additionalNotes}\n`;
    }
    return encodeURIComponent(msg);
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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <ShoppingBag className="w-3.5 h-3.5 text-[#A67C52]" />
            Direct Kitchen Orders
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
            Fresh Savoury Order Form
          </h1>
          <p className="text-sm sm:text-lg text-[#FDFBF7]/90 leading-relaxed max-w-2xl mx-auto">
            Choose your desired savouries, select exact pack sizes, and get an instant approximate total. Handcrafted fresh to order for delivery across Lahore.
          </p>
        </motion.div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col gap-8">
          
          {/* Upper Line: Contact Information Box (Squeezed & Sleek) */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full bg-gradient-to-br from-stone-900 via-stone-900 to-[#14291F] text-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:py-3.5 lg:px-6 shadow-lg border border-white/5"
          >
            {/* Mobile View: Compact Squeezed Layout */}
            <div className="sm:hidden space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-white">Contact Info</h2>
                <div className="flex items-center gap-1.5">
                  <a 
                    href={config.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-colors shadow-sm"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5 fill-current" />
                  </a>
                  <a 
                    href={config.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#E1306C] flex items-center justify-center text-white transition-colors shadow-sm"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Quick Call & WhatsApp Row */}
              <div className="flex items-center justify-between gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#1B4332] flex items-center justify-center flex-shrink-0 text-[#A67C52]">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold leading-none">Order Line</p>
                    <a href={`tel:${config.contact.phone.replace(/\s+/g, '')}`} className="text-xs font-bold text-white hover:text-[#A67C52] transition-colors truncate block">
                      {config.contact.phone}
                    </a>
                  </div>
                </div>
                <a
                  href={config.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold shadow-md transition-transform active:scale-95 flex-shrink-0"
                  aria-label="Open WhatsApp Chat"
                >
                  <WhatsAppIcon className="h-3 w-3 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Service Area */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 rounded-xl border border-white/5 text-[11px] text-stone-300">
                <MapPin className="h-3 w-3 text-[#A67C52] flex-shrink-0" />
                <span>Service Area: <strong className="text-stone-100">{config.contact.serviceArea}</strong></span>
              </div>
            </div>

            {/* Desktop / Tablet View: Squeezed Horizontal Bar */}
            <div className="hidden sm:block">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-baseline gap-2.5">
                  <h2 className="font-display text-lg lg:text-xl font-bold text-white">Contact Information</h2>
                  <span className="text-[10px] uppercase tracking-widest text-[#A67C52] font-semibold">Kitchen Support & Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Connect:</span>
                  <a 
                    href={config.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#143526] hover:bg-[#25D366] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-sm"
                    aria-label="WhatsApp"
                    title="Message us on WhatsApp"
                  >
                    <WhatsAppIcon className="h-4 w-4 fill-current" />
                  </a>
                  <a 
                    href={config.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#143526] hover:bg-[#E1306C] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-sm"
                    aria-label="Instagram"
                    title="Follow us on Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B4332]/40 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-[#A67C52]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-400 text-[10px] uppercase tracking-wider">Phone / WhatsApp</h3>
                    <div className="flex items-center gap-2.5 mt-0.5">
                      <a 
                        href={`tel:${config.contact.phone.replace(/\s+/g, '')}`} 
                        className="text-base lg:text-lg font-bold text-white hover:text-[#A67C52] transition-colors"
                      >
                        {config.contact.phone}
                      </a>
                      <a
                        href={config.contact.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold shadow-sm transition-all duration-300 hover:scale-105"
                        aria-label="Open WhatsApp Chat"
                        title="Open WhatsApp Chat"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5 fill-current" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B4332]/40 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-[#A67C52]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-400 text-[10px] uppercase tracking-wider">Service Area</h3>
                    <p className="text-base lg:text-lg font-bold text-stone-100 leading-tight">{config.contact.serviceArea}</p>
                    <p className="text-[10px] text-stone-400">Freshly prepared & delivered across Lahore</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lower Line: Interactive Order Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 md:p-10 shadow-xl border border-[#E6E0D4]"
          >
            {formState === 'success' && submittedOrder ? (
              /* Success & Order Receipt Confirmation */
              <div className="space-y-6">
                <div className="bg-[#1B4332]/10 border border-[#1B4332] rounded-3xl p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 bg-[#1B4332] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#A67C52]">Order Generated</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1B4332] mt-1 mb-2">
                    Order Request #{submittedOrder.orderId}
                  </h2>
                  <p className="text-stone-600 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-[#1B4332]">{submittedOrder.customer.name}</strong>! Your order has been prepared and formatted. You can now send it directly to our kitchen via WhatsApp.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="bg-stone-50 rounded-2xl p-5 sm:p-6 border border-stone-200">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-[#1B4332]" />
                      <h3 className="font-bold text-stone-900 text-sm sm:text-base">Order Breakdown</h3>
                    </div>
                    <span className="text-xs text-stone-500">{new Date(submittedOrder.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="divide-y divide-stone-200 py-3">
                    {submittedOrder.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                        <div>
                          <p className="font-bold text-stone-800">{item.name}</p>
                          <p className="text-stone-500 text-[11px]">{item.selectedQuantity} × {item.packs} pack(s)</p>
                        </div>
                        <span className="font-bold text-[#1B4332]">{item.formattedTotalPrice}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-sm sm:text-base font-bold">
                    <span className="text-stone-800">Approximate Total:</span>
                    <span className="text-xl text-[#1B4332]">{submittedOrder.summary.formattedTotal}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 italic">
                    * Final price confirmed upon booking; delivery fee may apply depending on your area in Lahore.
                  </p>
                </div>

                {/* Dispatch Action Button: WhatsApp */}
                <div className="pt-2 flex justify-center">
                  <a
                    href={`${config.contact.whatsappUrl}?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-center cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
                    <span>Send Order on WhatsApp</span>
                  </a>
                </div>

                {/* Reset Form */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormState('idle');
                      setSelectedItems({});
                      setName('');
                      setPhone('');
                      setEmail('');
                      setPreferredDate('');
                      setAddress('');
                      setNotes('');
                      setSubmittedOrder(null);
                    }}
                    className="text-xs font-bold text-stone-500 hover:text-[#1B4332] underline underline-offset-4"
                  >
                    ← Place Another Order Request
                  </button>
                </div>
              </div>
            ) : formState === 'error' ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-8">
                <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-900 mb-2">Something went wrong</h3>
                <p className="text-red-800">We couldn't generate your order request. Please try again or message us on WhatsApp directly.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-4 px-6 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              /* Order Form */
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1B4332] mb-1.5">
                    Order Request Form
                  </h2>
                  <p className="text-[#5C5C5C] text-xs sm:text-sm">
                    Select your savouries from the menu below with your preferred quantity pack, and we'll calculate the approximate price instantly.
                  </p>
                </div>

                {/* Validation Error Message */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center gap-3 text-amber-900 text-xs sm:text-sm font-semibold"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span>{validationError}</span>
                  </motion.div>
                )}

                {/* STEP 1: Interactive Menu Item Checkboxes */}
                <div id="order-items-selection" className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <label className="text-sm font-bold uppercase tracking-wider text-[#1B4332] flex items-center gap-2">
                      <span>1. Select Menu Items</span>
                      <span className="text-xs font-normal text-stone-500">
                        ({Object.keys(selectedItems).length} selected)
                      </span>
                    </label>
                    <span className="text-[11px] text-stone-500 font-medium">Click to select & configure</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    {products.map((product) => {
                      const isChecked = Boolean(selectedItems[product.id]);
                      const currentConfig = selectedItems[product.id] || { tierIndex: 0, packCount: 1 };
                      const tiers = product.priceTiers && product.priceTiers.length > 0
                        ? product.priceTiers
                        : [{ quantity: product.quantityStr, price: product.price }];
                      
                      return (
                        <div 
                          key={product.id}
                          className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                            isChecked 
                              ? 'bg-emerald-50/40 border-[#1B4332] shadow-md ring-1 ring-[#1B4332]' 
                              : 'bg-white border-[#E6E0D4] hover:border-stone-400 shadow-sm hover:shadow'
                          }`}
                        >
                          {/* Item Card Header */}
                          <div 
                            onClick={() => toggleItemSelection(product)}
                            className="p-2 sm:p-3 cursor-pointer select-none"
                          >
                            <div className="flex items-start justify-between gap-1 mb-1.5 sm:mb-2">
                              {/* Custom Styled Checkbox */}
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                                isChecked 
                                  ? 'bg-[#1B4332] text-white' 
                                  : 'border-2 border-stone-300 bg-white'
                              }`}>
                                {isChecked && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />}
                              </div>

                              <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full transition-colors ${
                                isChecked 
                                  ? 'bg-[#1B4332] text-white' 
                                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                              }`}>
                                {isChecked ? 'Added' : '+ Add'}
                              </span>
                            </div>

                            {/* Thumbnail & Title */}
                            <div className="flex items-center gap-2 sm:gap-2.5">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover flex-shrink-0 bg-stone-100 border border-stone-200/60"
                                loading="lazy"
                              />

                              <div className="min-w-0 flex-1">
                                <h3 className="font-display text-[11px] sm:text-sm font-bold text-[#1B4332] leading-tight line-clamp-2">
                                  {product.name}
                                </h3>
                                <p className="text-[9px] sm:text-[11px] text-stone-500 mt-0.5">
                                  From <strong className="text-[#1B4332]">{product.price}</strong>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Dynamic Tiers & Quantity Pack Selector */}
                          <AnimatePresence>
                            {isChecked && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="px-2 pb-2 pt-1.5 sm:px-2.5 sm:pb-2.5 sm:pt-2 border-t border-emerald-900/10 bg-white/80 space-y-1.5 sm:space-y-2"
                              >
                                <div>
                                  <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-stone-500 font-bold mb-1">
                                    Pack Size:
                                  </p>
                                  <div className="flex flex-col gap-1">
                                    {tiers.map((tier, idx) => {
                                      const isTierSelected = currentConfig.tierIndex === idx;
                                      return (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleTierChange(product.id, idx);
                                          }}
                                          className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-bold transition-all flex items-center justify-between gap-1 ${
                                            isTierSelected
                                              ? 'bg-[#1B4332] text-white shadow-sm ring-1 ring-[#1B4332]'
                                              : 'bg-stone-50 text-stone-700 border border-stone-200 hover:border-[#1B4332]'
                                          }`}
                                        >
                                          <span>{tier.quantity}</span>
                                          <span className="opacity-80">{tier.price}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Number of Packs Stepper */}
                                <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                                  <span className="text-[9px] sm:text-[10px] text-stone-600 font-medium">Quantity:</span>
                                  <div className="flex items-center gap-1 sm:gap-1.5">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePackCountChange(product.id, -1);
                                      }}
                                      className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors font-bold text-xs"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    </button>
                                    <span className="w-4 sm:w-5 text-center text-[11px] sm:text-xs font-bold text-[#1B4332]">
                                      {currentConfig.packCount}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePackCountChange(product.id, 1);
                                      }}
                                      className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors font-bold text-xs"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2: Live Approximate Total Bar */}
                <div className="bg-gradient-to-r from-[#1B4332] to-[#14291F] text-white rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#A67C52] uppercase font-bold tracking-wider">
                      Approximate Order Total
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-display font-bold">
                        Rs. {approximateTotal.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-300">
                        ({calculatedItems.length} item{calculatedItems.length === 1 ? '' : 's'}, {totalPacksCount} pack{totalPacksCount === 1 ? '' : 's'})
                      </span>
                    </div>
                  </div>
                  <div className="text-right sm:text-right text-[11px] text-stone-300">
                    <span className="block font-medium">Excluding delivery fee</span>
                    <span className="text-stone-400">Direct confirmation via WhatsApp</span>
                  </div>
                </div>

                {/* STEP 3: Customer & Fulfillment Details */}
                <div className="space-y-4 pt-2">
                  <div className="pb-2 border-b border-stone-200">
                    <label className="text-sm font-bold uppercase tracking-wider text-[#1B4332]">
                      2. Customer & Delivery Info
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#1B4332] mb-1.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#1B4332] mb-1.5">
                        Phone / WhatsApp <span className="text-stone-500 font-normal text-[11px]">(Optional)</span>
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                        placeholder="e.g. 0311 6611055"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#1B4332] mb-1.5">
                        Email Address (For Order Receipt)
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                        placeholder="yourname@gmail.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-xs font-semibold text-[#1B4332] mb-1.5">
                        Preferred Date <span className="text-stone-500 font-normal text-[11px]">(Optional)</span>
                      </label>
                      <input 
                        type="date" 
                        id="date" 
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fulfillment" className="block text-xs font-semibold text-[#1B4332] mb-1.5">
                        Pickup / Delivery <span className="text-stone-500 font-normal text-[11px]">(Optional)</span>
                      </label>
                      <select 
                        id="fulfillment" 
                        value={fulfillmentType}
                        onChange={(e) => setFulfillmentType(e.target.value as 'pickup' | 'delivery' | 'undecided')}
                        className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                      >
                        <option value="pickup">Self Pickup</option>
                        <option value="delivery">Delivery ({config.contact.serviceArea})</option>
                        <option value="undecided">Decide Later / Discuss on WhatsApp</option>
                      </select>
                    </div>

                    {fulfillmentType === 'delivery' && (
                      <div>
                        <label htmlFor="address" className="block text-xs font-semibold text-[#1B4332] mb-1.5">
                          Delivery Address in Lahore <span className="text-stone-500 font-normal text-[11px]">(Optional)</span>
                        </label>
                        <input 
                          type="text" 
                          id="address" 
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow"
                          placeholder="House, Street, Area / Sector (or share on WhatsApp)"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-xs font-semibold text-[#1B4332] mb-1.5">
                      Special Requests / Notes
                    </label>
                    <textarea 
                      id="notes" 
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#F9F7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent transition-shadow resize-none"
                      placeholder="e.g., Spice preference, special packaging, party event timing..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-2">
                  <button 
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-[#1B4332] hover:bg-[#143526] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-center cursor-pointer disabled:bg-[#1B4332]/70 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 sm:w-4.5 sm:h-4.5" />
                        <span>Generating Order Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Order & Calculate (Rs. {approximateTotal.toLocaleString()})</span>
                        <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
