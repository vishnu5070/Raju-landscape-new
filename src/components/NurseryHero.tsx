import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Feather, Sparkles, Truck, HeartHandshake } from 'lucide-react';
import { NURSERY_INFO } from '../data/plants';

interface NurseryHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: any) => void;
  categories: string[];
  totalPlantsCount: number;
}

export default function NurseryHero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalPlantsCount
}: NurseryHeroProps) {

  const scrollToPlants = () => {
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative bg-[#faf8f5] overflow-hidden">
      {/* Background Graphic Patterns */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-6 pointer-events-none bg-cover bg-right"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80')`,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0))',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0))'
        }}
      />
      <div className="absolute -left-16 -top-16 w-64 h-64 bg-forest-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute left-1/3 bottom-10 w-96 h-96 bg-earth-100 rounded-full blur-3xl opacity-40" />

      {/* Hero Visual Container */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* Left Side: Welcoming Copy */}
        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-100 text-xs font-semibold text-forest-700 font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-earth-500 animate-spin" />
            <span>Premium Greens in Madhapur since 2012</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-forest-900 tracking-tight leading-none"
          >
            Create Your Own <br />
            <span className="text-forest-600 block mt-1 hover:skew-x-1 duration-300">Garden Sanctuary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-gray-600 sm:mt-5 sm:text-lg leading-relaxed"
          >
            {NURSERY_INFO.about}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-3 justify-center lg:justify-start"
          >
            <button
              onClick={scrollToPlants}
              className="px-6 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-medium text-base transition-all shadow-md shadow-forest-100 hover:shadow-xl hover:scale-[1.01] cursor-pointer"
            >
              Exlpore Plant Catalog 🌱
            </button>
            <a
              href="#footer"
              className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-white border border-forest-100 hover:border-forest-500 text-forest-800 font-medium text-base transition-all hover:bg-forest-50"
            >
              <MapPin className="w-4 h-4 text-earth-500" />
              <span>Find Our Nursery</span>
            </a>
          </motion.div>

          {/* Quick Location Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-xs text-gray-500 flex items-center justify-center lg:justify-start gap-1 justify-items-center"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500 fill-red-100" />
            <span>Serving: Madhapur, Jubilee Hills, Gachibowli, Kukatpally & all Hyderabad</span>
          </motion.div>
        </div>

        {/* Right Side: Featured Banner Card */}
        <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-4 shadow-xl border border-earth-100 overflow-hidden"
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80"
                alt="Raju Landscape Greenhouse"
                className="w-full h-full object-cover transform hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-widest bg-forest-600/90 text-white px-2 py-0.5 rounded-full font-mono font-bold">
                  Bespoke Greens
                </span>
                <p className="mt-1 font-display font-bold text-lg leading-tight">Expert Landscaping & Plant Sourcing</p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-forest-50/50 border border-forest-50 flex items-center gap-2 text-left">
                <Truck className="w-5 h-5 text-forest-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-forest-900 leading-tight">Same-Day Post</h4>
                  <p className="text-[10px] text-gray-500">Fast gate delivery</p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-earth-50/50 border border-earth-50 flex items-center gap-2 text-left">
                <HeartHandshake className="w-5 h-5 text-earth-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-forest-900 leading-tight">Nurtured</h4>
                  <p className="text-[10px] text-gray-500">Strictly healthy soil</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Unified Search & Category Filtering Bar */}
      <div id="catalog-section" className="border-t border-b border-forest-100 bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          
          <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl font-bold font-display text-forest-900">Explore Our Plant Catalog</h2>
            <p className="text-sm text-gray-500">Pick raw beauties for your garden. Send your final selections directly over WhatsApp.</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Native Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search plants by name ... (e.g. Rose, Monstera)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#faf8f5] border border-forest-100 hover:border-forest-200 focus:border-forest-500 focus:bg-white rounded-2xl text-sm font-medium outline-hidden transition shadow-3xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded-md hover:bg-gray-100"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Selector Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none scroll-smooth">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-forest-600 hover:bg-forest-700 text-white border-forest-500 shadow-xs shadow-forest-100'
                        : 'bg-white hover:bg-forest-50 text-forest-800 border-forest-100 hover:border-forest-200'
                    }`}
                  >
                    {category}
                    {isActive && (
                      <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] bg-white text-forest-700 font-bold font-mono">
                        {totalPlantsCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
