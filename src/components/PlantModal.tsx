import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Sun, Droplets, Box, Heart, CircleAlert } from 'lucide-react';
import { Plant } from '../types';

interface PlantModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (plant: Plant) => void;
  isInCart: boolean;
}

export default function PlantModal({
  plant,
  isOpen,
  onClose,
  onAddToCart,
  isInCart
}: PlantModalProps) {
  
  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!plant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-auto"
          >
            
            {/* Close Button Float */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image Area */}
            <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-[450px]">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
              
              {/* Category tag */}
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/90 text-white border border-forest-700/50 text-xs font-semibold">
                {plant.category}
              </span>
            </div>

            {/* Right Column: Information Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
              
              <div className="mb-4">
                <span className="text-[10px] tracking-widest text-earth-500 font-extrabold uppercase font-mono block mb-1">
                  Nursery Catalog Item
                </span>
                <h2 className="text-2xl font-black font-display text-forest-900 leading-tight">
                  {plant.name}
                </h2>
                {plant.scientificName && (
                  <p className="text-sm italic text-gray-400 font-mono mt-1">
                    {plant.scientificName}
                  </p>
                )}
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-1.5 mb-5">
                <span className="text-[10px] text-gray-400 uppercase font-bold font-mono">Retail Price:</span>
                <span className="text-3xl font-black text-forest-900 font-display">₹{plant.price}</span>
                <span className="text-xs text-gray-500">/ per nursery pot</span>
              </div>

              {/* Description Body */}
              <div className="text-sm text-gray-600 leading-relaxed space-y-4 mb-6">
                <p>{plant.description}</p>
              </div>

              {/* Advanced Specs Grid */}
              <div className="grid grid-cols-3 gap-2.5 bg-[#faf8f5] p-3 rounded-2xl border border-earth-100 mb-6 text-center">
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-white/70">
                  <Sun className="w-4 h-4 text-earth-500 mb-1" />
                  <span className="text-[9px] uppercase font-bold text-gray-400 font-mono leading-none mb-0.5">Sunlight</span>
                  <span className="text-[10px] text-forest-900 font-semibold truncate w-full">{plant.sunlight || 'Full Sun'}</span>
                </div>
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-white/70">
                  <Droplets className="w-4 h-4 text-blue-500 mb-1" />
                  <span className="text-[9px] uppercase font-bold text-gray-400 font-mono leading-none mb-0.5">Watering</span>
                  <span className="text-[10px] text-forest-900 font-semibold truncate w-full">{plant.water || 'Moderate'}</span>
                </div>
                <div className="flex flex-col items-center p-1.5 rounded-xl bg-white/70">
                  <Box className="w-4 h-4 text-forest-600 mb-1" />
                  <span className="text-[9px] uppercase font-bold text-gray-400 font-mono leading-none mb-0.5">Size/Pot</span>
                  <span className="text-[10px] text-forest-900 font-semibold truncate w-full">{plant.size || 'Regular'}</span>
                </div>
              </div>

              {/* Climate Tips Note */}
              <div className="p-3 rounded-xl bg-forest-50/50 border border-forest-100/50 flex gap-2 items-start text-xs text-forest-800 font-medium mb-6">
                <CircleAlert className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-forest-900">Hyderabad climate tip:</strong> Keep this plant safe from extreme summer heat waves of May by placing in partial shades or under nets.
                </p>
              </div>

              {/* Buy/Wishlist Action Anchor */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <button
                  onClick={() => onAddToCart(plant)}
                  className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isInCart
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'
                      : 'bg-forest-600 hover:bg-forest-700 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{isInCart ? 'Added! Add More to List' : 'Add to Order Wishlist'}</span>
                </button>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
