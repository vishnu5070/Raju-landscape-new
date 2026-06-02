import React from 'react';
import { Leaf, MapPin, ShieldCheck } from 'lucide-react';


interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

export default function Header({ cartItemCount, onCartClick, isAdmin = false, onAdminClick }: HeaderProps) {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header id="home" className="sticky top-0 z-40 w-full border-b border-forest-100 bg-white/90 backdrop-blur-sm transition-all shadow-xs">
     
     

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
          <nav className=" md:flex items-center gap-6 text-sm font-medium text-forest-700">
            <button type="button" onClick={() => scrollToSection('home')} className=" text-black cursor-pointer gap-1">
              Home
            </button>
            <button type="button" onClick={() => scrollToSection('catalog-section')} className=" text-black transition cursor-pointer gap-1">
              Plant Catalog
            </button>
            
            <button type="button" onClick={() => scrollToSection('footer')} className=" text-black transition cursor-pointer gap-1">
              Contact & Location
            </button>
          </nav>

          

            {/* Checkout/Order list Button */}
            

            <button
              onClick={onCartClick} className='bg-forest-500 hover:bg-forest-600 text-white px-3 py-1 rounded-md relative transition-colors flex items-center gap-1 text-sm font-medium'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="text-white"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0z" />
              </svg>
              <span>My Basket</span>
              
              {cartItemCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-bounce">
                  {cartItemCount}
                </span>
              ) : (
                <span className="text-white text-[10px]">(0)</span>
              )}
            </button>
          </div>

        </div>

    </header>
  );
}
