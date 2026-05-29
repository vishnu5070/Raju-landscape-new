import React from 'react';
import { Leaf, Phone, MapPin, ClipboardList, Clock } from 'lucide-react';
import { NURSERY_INFO } from '../data/plants';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  isAdmin: boolean;
  onAdminClick: () => void;
}

export default function Header({ cartItemCount, onCartClick, isAdmin, onAdminClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-forest-100 bg-white/90 backdrop-blur-sm transition-all shadow-xs">
      {/* Top Banner with Contact Info and Hours */}
      <div className="bg-forest-900 py-1.5 px-4 text-xs font-medium text-forest-100 text-center sm:flex sm:justify-between sm:items-center sm:px-6 lg:px-8">
        <p className="flex items-center justify-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-forest-200" />
          <span>Open Today: {NURSERY_INFO.businessHours}</span>
        </p>
        <p className="hidden sm:flex items-center justify-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-forest-200" />
          <a href={`tel:${NURSERY_INFO.contactNumber}`} className="hover:text-white transition">
            Call Us: {NURSERY_INFO.contactNumber}
          </a>
        </p>
      </div>

      {/* Main Header Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 text-forest-600 shadow-2xs">
              <Leaf className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="block font-display text-xl font-bold tracking-tight text-forest-900 leading-tight">
                Raju Landscape
              </span>
              <span className="flex items-center gap-0.5 text-[10px] text-forest-600 font-mono">
                <MapPin className="w-3 h-3 text-earth-500" />
                Madhapur, Hyderabad
              </span>
            </div>
          </div>

          {/* Quick links & Contact (Desktop only) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-forest-700">
            <a href="#hero" className="hover:text-forest-900 transition">Home</a>
            <a href="#plants" className="hover:text-forest-900 transition">Plant Catalog</a>
            <a href="#testimonials" className="hover:text-forest-900 transition">Customer Reviews</a>
            <a href="#footer" className="hover:text-forest-900 transition">Contact & Location</a>
          </nav>

          {/* Action buttons (Top Right) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={onAdminClick}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all duration-300 border cursor-pointer ${
                isAdmin
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-450 shadow-xs'
                  : 'bg-white hover:bg-[#F5F5F0] text-[#2D4A22] border-forest-100 hover:border-forest-200'
              }`}
            >
              <span>{isAdmin ? '🛡️ Admin' : '🔑 Login'}</span>
            </button>

            {/* Checkout/Order list Button */}
            <button
              onClick={onCartClick}
              className="group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs transition-all duration-300 shadow-md shadow-forest-200 hover:shadow-lg border border-forest-500 hover:scale-[1.01] cursor-pointer"
            >
              <ClipboardList className="w-4.5 h-4.5 text-forest-100 group-hover:rotate-6 transition" />
              <span className="hidden sm:inline">My Basket</span>
              
              {cartItemCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-bounce">
                  {cartItemCount}
                </span>
              ) : (
                <span className="text-forest-200 text-[10px]">(0)</span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
