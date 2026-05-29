import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, Send, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { CartItem, OrderForm } from '../types';
import { NURSERY_INFO } from '../data/plants';

interface OrderWishlistProps {
  cart: CartItem[];
  onUpdateQuantity: (plantId: string, quantity: number) => void;
  onRemoveItem: (plantId: string) => void;
  onClearCart: () => void;
}

export default function OrderWishlist({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: OrderWishlistProps) {

  // Customer Form State
  const [formData, setFormData] = useState<OrderForm>({
    name: '',
    phone: '',
    address: ''
  });

  // Validation feedback state
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Calculate order metrics
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.plant.price * item.quantity), 0);

  // Compile and format the final WhatsApp URL
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Field Valdations
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact number.';
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.address.trim()) newErrors.address = 'Please specify your Hyderabad delivery address.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to error
      const errorElement = document.getElementById('order-form-container');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Prepare WhatsApp Message according to instructions format
    const plantsListText = cart.map((item, index) => {
      // Clean plant name a little if needed
      return `${index + 1}. ${item.plant.name} × ${item.quantity}`;
    }).join('\n');

    const messageText = `🌿 Raju Landscape Order Request 🌿

Customer Name: ${formData.name.trim()}
Phone Number: ${formData.phone.trim()}

Selected Plants:
${plantsListText}

Delivery Address:
${formData.address.trim()}

Please confirm availability and delivery details.
Thank You.`;

    setIsSubmitting(true);

    // Simulate small smooth buffer before opening WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlacedSuccess(true);
      
      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${NURSERY_INFO.whatsAppNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp URL safely
      window.open(whatsappUrl, '_blank', 'referrer');
      
      // Clear cart success state reset after a while
      setTimeout(() => {
        setOrderPlacedSuccess(false);
      }, 8000);
    }, 900);
  };

  return (
    <div id="wishlist-section" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Set Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-earth-50 border border-earth-100 text-xs font-semibold text-earth-600 font-mono mb-2">
          <ShoppingBag className="w-3.5 h-3.5" />
          Checkout Basket
        </span>
        <h2 className="text-3xl font-extrabold font-display text-forest-900 tracking-tight">Your Custom Order List</h2>
        <p className="mt-2 text-sm text-gray-500">
          Review plants added from the catalog, configure counts, and send delivery inquiry inputs over WhatsApp in one click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Plant Items Review (8 columns wide) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold font-display text-forest-900 flex items-center gap-2">
                <span>Selected Greens</span>
                <span className="px-2.5 py-0.5 rounded-full bg-forest-50 border border-forest-100 text-xs text-forest-700 font-mono font-black">
                  {cart.length} unique varieties
                </span>
              </h3>
              
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1.5 p-1 hover:bg-red-50 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              
              /* Empty Basket State Card */
              <div className="py-12 text-center max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-full bg-forest-50 border border-forest-100 text-forest-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-lg text-forest-900 mb-1">Your Basket is Empty</h4>
                <p className="text-xs text-gray-400 mb-6">
                  No plants have been selected. Go through our catalog options above to compile your paradise!
                </p>
                <a
                  href="#catalog-section"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-xs transition"
                >
                  Browse Plant Catalog 🌱
                </a>
              </div>

            ) : (

              /* Cart Items List */
              <div className="space-y-4 divide-y divide-gray-50">
                {cart.map((item) => (
                  <div key={item.plant.id} className="pt-4 first:pt-0 flex items-center gap-3 sm:gap-4 group">
                    
                    {/* Small preview thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                      <img
                        src={item.plant.image}
                        alt={item.plant.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Name block */}
                    <div className="flex-grow min-w-0">
                      <h4 className="font-display font-medium text-sm text-forest-900 group-hover:text-forest-600 transition truncate">
                        {item.plant.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium font-mono leading-none mt-0.5">
                        {item.plant.category}
                      </p>
                      <p className="text-xs text-forest-700 font-bold mt-1">
                        ₹{item.plant.price} <span className="text-gray-400 font-normal">/ pot</span>
                      </p>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 p-1 rounded-xl shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.plant.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200/60 flex items-center justify-center hover:bg-gray-100 hover:text-forest-700 text-gray-500 transition cursor-pointer"
                        title="Reduce quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      
                      <span className="w-7 text-center font-mono font-bold text-xs text-forest-900">
                        {item.quantity}
                      </span>
                      
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.plant.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200/60 flex items-center justify-center hover:bg-gray-100 hover:text-forest-700 text-gray-500 transition cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal evaluation & Remove */}
                    <div className="text-right shrink-0">
                      <p className="font-mono font-bold text-xs text-forest-900">
                        ₹{item.plant.price * item.quantity}
                      </p>
                      
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.plant.id)}
                        className="text-[10px] text-red-400 hover:text-red-500 font-bold flex items-center gap-0.5 ml-auto mt-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            )}

          </div>

          {/* Quick Informative Safe Shield */}
          <div className="p-4 rounded-2xl bg-forest-50/50 border border-forest-100/50 text-xs text-forest-800 flex gap-3 items-center">
            <ShieldCheck className="w-5 h-5 text-forest-600 shrink-0" />
            <p>
              Your contact details are used strictly to populate the WhatsApp order message. Everything is processed offline on your browser—zero logins, zero cookies trackers.
            </p>
          </div>
        </div>

        {/* Right Column: Customer Details & Form Summary (5 columns wide) */}
        <div id="order-form-container" className="lg:col-span-5">
          <form onSubmit={handleOrderSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
            
            <h3 className="text-lg font-bold font-display text-forest-900 pb-3 border-b border-gray-100 flex items-center gap-1.5 justify-items-center">
              <span>Customer Details Sheet</span>
            </h3>

            {/* Input Name */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-forest-800">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 bg-gray-50/60 border rounded-xl text-sm outline-hidden transition focus:bg-white focus:ring-1 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200/80 focus:border-forest-500 focus:ring-forest-500'
                }`}
                placeholder="Ramesh Kumar"
              />
              {errors.name && <p className="text-[11px] text-red-500 font-semibold">{errors.name}</p>}
            </div>

            {/* Input Phone */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-forest-800">
                Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 bg-gray-50/60 border rounded-xl text-sm outline-hidden transition focus:bg-white focus:ring-1 ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200/80 focus:border-forest-500 focus:ring-forest-500'
                }`}
                placeholder="98480 XXXXX"
              />
              {errors.phone && <p className="text-[11px] text-red-500 font-semibold">{errors.phone}</p>}
            </div>

            {/* Input Address */}
            <div className="space-y-1">
              <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-forest-800">
                Delivery Address (Hyderabad) <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 bg-gray-50/60 border rounded-xl text-sm outline-hidden transition focus:bg-white focus:ring-1 ${
                  errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-200/80 focus:border-forest-500 focus:ring-forest-500'
                }`}
                placeholder="Villa 15, Green Meadows, near Metro Station, Madhapur, Hyderabad, Telangana 500081"
              />
              {errors.address && <p className="text-[11px] text-red-500 font-semibold">{errors.address}</p>}
            </div>

            {/* Bill Summary Block */}
            <div className="pt-4 border-t border-gray-100 space-y-2.5">
              
              <div className="flex justify-between items-center text-xs font-medium text-gray-500">
                <span>Total Plant Items</span>
                <span className="font-mono text-gray-800 font-bold">{totalItems} pots</span>
              </div>

              <div className="flex justify-between items-center text-xs font-medium text-gray-500">
                <span>Plants Value Subtotal</span>
                <span className="font-mono text-gray-800 font-bold">₹{subtotal}</span>
              </div>

              <div className="flex justify-between items-start text-xs font-medium text-gray-500">
                <span>Hyderabad Delivery</span>
                <span className="text-right text-earth-600 font-bold">Calculated on Distance</span>
              </div>

              <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-forest-900 leading-none">Estimate Plant Sum</span>
                <span className="text-2xl font-black text-forest-900 font-display">
                  ₹{subtotal}
                </span>
              </div>

              <p className="text-[10px] text-gray-400 italic text-center pt-1 flex items-center justify-center gap-1">
                <HelpCircle className="w-3 h-3 text-gray-400 shrink-0" />
                No advance transaction! Pay upon confirmation directly.
              </p>
            </div>

            {/* Submit checkout WhatsApp Button */}
            <button
              type="submit"
              disabled={cart.length === 0 || isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                cart.length === 0
                  ? 'bg-gray-300 pointer-events-none'
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Preparing WhatsApp Order...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-white" />
                  <span>Order via WhatsApp 🌱</span>
                </>
              )}
            </button>

            {/* Success Post confirmation status */}
            {orderPlacedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-medium flex gap-2 items-center"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <p>
                  Order package created! WhatsApp was initiated in another tab. Please send the message to Raju Nursery to verify slots and confirm.
                </p>
              </motion.div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}
