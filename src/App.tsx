import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NurseryHero from './components/NurseryHero';
import PlantCard from './components/PlantCard';
import PlantModal from './components/PlantModal';
import OrderWishlist from './components/OrderWishlist';
import Footer from './components/Footer';
import { PLANTS, TESTIMONIALS } from './data/plants';
import { Plant, CartItem } from './types';
import { Star, Leaf, Sparkles, MessageSquare, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';
import AboutSection from './components/AboutSection';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';

export default function App() {
  
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
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);

  // Load catalog plants dynamically from backend database
  const [catalogPlants, setCatalogPlants] = useState<Plant[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/plants')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch catalog plants.');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setCatalogPlants(data);
        } else {
          // If the DB is empty, default to the local static PLANTS data list as initial seed
          setCatalogPlants(PLANTS);
        }
      })
      .catch(err => {
        console.error('Error fetching plants from backend:', err);
        // Fallback to static list if backend is not reachable or fails
        setCatalogPlants(PLANTS);
      });
  }, []);

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
    if (isAdmin) {
      setIsAdminPanelOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem('raju_admin_auth_v1', 'true');
    setIsAdminPanelOpen(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('raju_admin_auth_v1');
    setIsAdminPanelOpen(false);
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

        {/* Client Testimonials Section */}
        <section id="testimonials" className="bg-[#e2ede7]/40 py-16 border-t border-b border-forest-100/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100/50 border border-forest-200/50 text-xs font-semibold text-forest-700 font-mono mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Trusted in Hyderabad
              </span>
              <h2 className="text-3xl font-extrabold font-display text-forest-900 tracking-tight">Stories from Our Gardeners</h2>
              <p className="mt-2 text-sm text-gray-500">
                See why homeowners and balcony garden hobbyists in Gachibowli, Jubilee Hills, and Madhapur count on Raju Landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Stars bar */}
                    <div className="flex gap-0.5 text-amber-500 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>

                    <p className="text-sm text-gray-600 italic leading-relaxed mb-6">
                      "{testimonial.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 pt-4 border-t border-gray-50">
                    <div className="w-9 h-9 rounded-full bg-forest-50 border border-forest-100 text-forest-600 font-display font-black text-sm flex items-center justify-center">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-forest-900 leading-none">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5 leading-none">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

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
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Inventory & Catalog Management Panel */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        plants={catalogPlants}
        onAddPlant={handleAddPlant}
        onUpdatePlant={handleUpdatePlant}
        onDeletePlant={handleDeletePlant}
        onLogout={handleLogout}
      />

    </div>
  );
}
