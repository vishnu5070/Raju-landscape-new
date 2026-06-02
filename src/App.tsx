import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NurseryHero from './components/NurseryHero';
import PlantCard from './components/PlantCard';
import PlantModal from './components/PlantModal';
import OrderWishlist from './components/OrderWishlist';
import Footer from './components/Footer';
import { PLANTS, TESTIMONIALS } from './data/plants';
import { Plant, CartItem } from './types';
import { Star, Leaf, Sparkles, MessageSquare, RefreshCcw, Search } from 'lucide-react';
import { motion } from 'motion/react';
import AboutSection from './components/AboutSection';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  
  // Categorization & State
  const [selectedCategory, setSelectedCategory] = useState<string>('All Plants');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Administrative and security state trackers
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('raju_admin_auth_v1') === 'true';
    } catch {
      return false;
    }
  });

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === '/admin-portal' && !isAdmin) {
      navigateTo('/admin-login');
    }
  }, [currentPath, isAdmin]);

  // Prefill the catalog plants with standard listings or user customized catalog modifications from browser local storage
  const [catalogPlants, setCatalogPlants] = useState<Plant[]>(() => {
    try {
      const saved = localStorage.getItem('raju_plants_catalog_v1');
      return saved ? JSON.parse(saved) : PLANTS;
    } catch {
      return PLANTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('raju_plants_catalog_v1', JSON.stringify(catalogPlants));
  }, [catalogPlants]);

  const categories = ['All Plants', 'Flowering Plants', 'Decorative Plants', 'Indoor Plants', 'Vegetable Plants'];

  // Persistent shopping cart / wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('raju_landscape_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('raju_landscape_cart_v1', JSON.stringify(cart));
  }, [cart]);

  // Shopping handlers supporting custom quantity inputs
  const handleAddToCart = (plant: Plant, initialQuantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.plant.id === plant.id);
      if (existing) {
        return prev.map(item =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + initialQuantity }
            : item
        );
      }
      return [...prev, { plant, quantity: initialQuantity }];
    });
  };

  const handleUpdateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(plantId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.plant.id === plantId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (plantId: string) => {
    setCart(prev => prev.filter(item => item.plant.id !== plantId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleViewDetails = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  // Filter evaluation logic matching dynamic catalog list
  const filteredPlants = catalogPlants.filter(plant => {
    const matchesCategory = selectedCategory === 'All Plants' || plant.category === selectedCategory;
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (plant.scientificName && plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPlants = catalogPlants.filter(plant => plant.isFeatured);

  // Administrative catalog event triggers
  const handleAddPlant = (newPlant: Plant) => {
    setCatalogPlants(prev => [newPlant, ...prev]);
  };

  const handleUpdatePlant = (updated: Plant) => {
    setCatalogPlants(prev => prev.map(p => p.id === updated.id ? updated : p));
    setCart(prev => prev.map(item => item.plant.id === updated.id ? { ...item, plant: updated } : item));
  };

  const handleDeletePlant = (plantId: string) => {
    setCatalogPlants(prev => prev.filter(p => p.id !== plantId));
    setCart(prev => prev.filter(item => item.plant.id !== plantId));
  };

  const handleAdminClick = () => {
    navigateTo(isAdmin ? '/admin-portal' : '/admin-login');
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem('raju_admin_auth_v1', 'true');
    navigateTo('/admin-portal');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('raju_admin_auth_v1');
    navigateTo('/admin-login');
  };

  // Smooth scroll helper
  const handleScrollToCart = () => {
    const element = document.getElementById('wishlist-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 text-gray-800 flex flex-col font-sans">
      
      {/* Frosted Navigation Bar with active admin check */}
      <Header
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={handleScrollToCart}
        isAdmin={isAdmin}
        onAdminClick={handleAdminClick}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Immersive Nursery Header Brand banner */}
        <NurseryHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          totalPlantsCount={filteredPlants.length}
        />

        {/* Plant Cards Listing Grid */}
        <section id="catalog-section" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Native Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search plants by name ... (e.g. Rose, Monstera)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-16 py-3 bg-[#faf8f5] border border-forest-100 hover:border-forest-200 focus:border-forest-500 focus:bg-white rounded-2xl text-sm font-medium outline-hidden transition shadow-3xs"
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
                        {filteredPlants.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Main List Rendering */}
          {filteredPlants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPlants.map((plant) => {
                const cartItem = cart.find(item => item.plant.id === plant.id);
                return (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    isInCart={!!cartItem}
                    cartQuantity={cartItem?.quantity || 0}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                );
              })}
            </div>
          ) : (
            
            /* No Plants Found Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 max-w-lg mx-auto p-8 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-forest-50 border border-forest-100 text-forest-600 flex items-center justify-center mx-auto mb-4">
                <RefreshCcw className="w-5 h-5 animate-spin" />
              </div>
              <h3 className="text-lg font-bold font-display text-forest-900 mb-1">No plant varieties found</h3>
              <p className="text-sm text-gray-500 mb-6">
                We couldn't locate anything matching "{searchQuery}". Check spelling or change your category filter filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Plants');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-forest-600 hover:bg-forest-700 rounded-xl transition cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>

          )}

        </section>

        {/* Clean, Dedicated About Raju Landscape Section (displays 5 specific criteria) */}
        <AboutSection />

       

        {/* Dynamic Wishlist Order Management Page */}
        <section className="bg-white border-b border-gray-50">
          <OrderWishlist
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        </section>

      </main>

      {/* Corporate Footnote and google maps link */}
      <Footer />

      {/* Care Detail Sheet Modal */}
      <PlantModal
        plant={selectedPlant}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPlant(null);
        }}
        onAddToCart={handleAddToCart}
        isInCart={selectedPlant ? !!cart.find(item => item.plant.id === selectedPlant.id) : false}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        totalPlantsCount={filteredPlants.length}
      />

      {/* Admin Security Authentication Gateway Modal */}
      <AdminLoginModal
        isOpen={currentPath === '/admin-login'}
        onClose={() => navigateTo('/')}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Inventory & Catalog Management Panel */}
      <AdminPanel
        isOpen={currentPath === '/admin-portal' && isAdmin}
        onClose={() => navigateTo('/')}
        plants={catalogPlants}
        onAddPlant={handleAddPlant}
        onUpdatePlant={handleUpdatePlant}
        onDeletePlant={handleDeletePlant}
        onLogout={handleLogout}
      />

    </div>
  );
}
