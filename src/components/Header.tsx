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
    <header id="home" className="mobile-header sticky top-0 z-40 w-full border-b border-forest-100 bg-white/90 backdrop-blur-sm transition-all shadow-xs">

      {/* CSS-only mobile menu toggle — no JS */}
      <input type="checkbox" id="mobile-menu-toggle" className="mobile-menu-checkbox" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo Brand */}
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

          {/* Desktop Nav */}
          <nav className="desktop-nav md:flex items-center gap-3 text-sm font-medium text-forest-700">
            <a href="#hero" className="hover:text-forest-900 transition">Home</a>
            <a href="#catalog-section" className="text-forest-900 transition">Plant Catalog</a>
            <a href="#about-section" className="hover:text-forest-900 transition">About Us</a>
            <a href="#wishlist-section" className="hover:text-forest-900 transition">Contact & Location</a>
          </nav>

          {/* Right side: Cart + Hamburger */}
          <div className="flex items-center gap-2">
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

            {/* Hamburger label — visible only on mobile, CSS-only toggle */}
            <label htmlFor="mobile-menu-toggle" className="hamburger-label" aria-label="Toggle menu">
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      <nav className="mobile-nav">
        <a href="#hero" className="mobile-nav-link">Home</a>
        <a href="#catalog-section" className="mobile-nav-link">Plant Catalog</a>
        <a href="#about-section" className="mobile-nav-link">About Us</a>
        <a href="#wishlist-section" className="mobile-nav-link">Contact & Location</a>
      </nav>

    </header>
  );
}
