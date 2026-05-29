import React from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Eye, Sun, Droplets, ArrowRight } from 'lucide-react';
import { Plant } from '../types';

interface PlantCardProps {
  key?: string;
  plant: Plant;
  isInCart: boolean;
  cartQuantity: number;
  onAddToCart: (plant: Plant, initialQuantity: number) => void;
  onViewDetails: (plant: Plant) => void;
  onUpdateQuantity: (plantId: string, quantity: number) => void;
}

export default function PlantCard({
  plant,
  isInCart,
  cartQuantity,
  onAddToCart,
  onViewDetails,
  onUpdateQuantity
}: PlantCardProps) {
  const [localQty, setLocalQty] = React.useState(1);
  
  // Custom color category pills
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Flowering Plants':
        return { bg: 'bg-rose-50 border-rose-100 text-rose-700', bullet: 'bg-rose-500' };
      case 'Indoor Plants':
        return { bg: 'bg-blue-50 border-blue-100 text-blue-700', bullet: 'bg-blue-500' };
      case 'Decorative Plants':
        return { bg: 'bg-emerald-50 border-emerald-100 text-emerald-700', bullet: 'bg-emerald-500' };
      case 'Vegetable Plants':
        return { bg: 'bg-amber-50 border-amber-100 text-amber-700', bullet: 'bg-amber-500' };
      default:
        return { bg: 'bg-gray-50 border-gray-100 text-gray-700', bullet: 'bg-gray-500' };
    }
  };

  const theme = getCategoryTheme(plant.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transform hover:translate-y-[-4px] hover:border-forest-200 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      {/* Category Float Tag & Image Cover */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        
        <span className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold tracking-wide ${theme.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${theme.bullet}`} />
          {plant.category}
        </span>
        
        {plant.isFeatured && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center px-2 py-0.5 rounded-md bg-earth-500 text-white text-[10px] uppercase tracking-wider font-extrabold shadow-sm font-mono leading-none">
            ⭐ Staff Pick
          </span>
        )}

        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-700"
          referrerPolicy="no-referrer"
        />

        {/* Quick hover detail overlay */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onViewDetails(plant)}
            className="p-2.5 rounded-full bg-white hover:bg-forest-50 text-forest-800 hover:text-forest-600 font-medium text-xs transition shadow-md flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Name and Scientific Nomenclature */}
        <div className="mb-2">
          <h3 
            onClick={() => onViewDetails(plant)}
            className="font-display font-bold text-lg text-forest-900 group-hover:text-forest-600 transition cursor-pointer leading-tight line-clamp-1"
          >
            {plant.name}
          </h3>
          {plant.scientificName && (
            <p className="text-xs text-gray-400 italic font-mono mt-0.5 leading-none">
              {plant.scientificName}
            </p>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {plant.description}
        </p>

        {/* Plant Attribute Specs Indicators */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-forest-50/40 border border-forest-50/50 text-[11px] text-forest-800 font-medium mb-4">
          <span className="flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-earth-500 shrink-0" />
            <span className="truncate" title={plant.sunlight}>{plant.sunlight || 'Bright Light'}</span>
          </span>
          <span className="flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate" title={plant.water}>{plant.water || 'Moderate'}</span>
          </span>
        </div>

        {/* Responsive Quantity Selector & Input Block */}
        <div className="mt-3 mb-4 bg-earth-50/55 p-2 rounded-xl border border-earth-200/40 flex items-center justify-between gap-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-forest-700 font-mono">
            Order Qty:
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const current = isInCart ? cartQuantity : localQty;
                const next = Math.max(1, current - 1);
                if (isInCart) {
                  onUpdateQuantity(plant.id, next);
                } else {
                  setLocalQty(next);
                }
              }}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-250 hover:bg-forest-100 text-[#1F3317] text-xs font-bold transition cursor-pointer select-none shadow-3xs"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={isInCart ? cartQuantity : localQty}
              onChange={(e) => {
                const val = Math.max(1, parseInt(e.target.value) || 1);
                if (isInCart) {
                  onUpdateQuantity(plant.id, val);
                } else {
                  setLocalQty(val);
                }
              }}
              className="w-12 h-7 bg-white border border-gray-250 text-center rounded-lg text-xs font-bold text-forest-900 outline-hidden focus:border-forest-500 font-mono"
            />
            <button
              type="button"
              onClick={() => {
                const current = isInCart ? cartQuantity : localQty;
                const next = current + 1;
                if (isInCart) {
                  onUpdateQuantity(plant.id, next);
                } else {
                  setLocalQty(next);
                }
              }}
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-gray-250 hover:bg-forest-100 text-[#1F3317] text-xs font-bold transition cursor-pointer select-none shadow-3xs"
            >
              +
            </button>
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A9470] block font-mono leading-none">Price Each</span>
            <span className="text-xl font-extrabold text-forest-900 font-display">
              ₹{plant.price}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(plant, localQty)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              isInCart
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                : 'bg-forest-600 hover:bg-forest-700 text-white hover:scale-[1.02]'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span>Added ({cartQuantity})</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 shrink-0" />
                <span>Add Basket</span>
              </>
            )}
          </button>
        </div>

      </div>
    </motion.div>
  );
}
