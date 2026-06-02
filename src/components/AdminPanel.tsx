import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Edit2, Trash2, Upload, Sparkles, Check, LogOut, Image as ImageIcon, Save, ShieldAlert } from 'lucide-react';
import { Plant } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
  onAddPlant: (plant: Plant) => void;
  onUpdatePlant: (plant: Plant) => void;
  onDeletePlant: (plantId: string) => void;
  onLogout: () => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  plants,
  onAddPlant,
  onUpdatePlant,
  onDeletePlant,
  onLogout
}: AdminPanelProps) {
  // Tabs: 'list' or 'form'
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Flowering Plants' | 'Decorative Plants' | 'Indoor Plants' | 'Vegetable Plants'>('Flowering Plants');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState<number>(150);
  const [size, setSize] = useState('8 inch nursery pot');
  const [sunlight, setSunlight] = useState('Bright Indirect Light');
  const [water, setWater] = useState('Twice a week');
  const [isFeatured, setIsFeatured] = useState(false);

  // Error and UI Messages
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [imageFileName, setImageFileName] = useState('');

  // Handle local image file upload & convert to Base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('Image file is too large. Please select a file smaller than 2MB.');
        return;
      }
      setImageFileName(file.name);
      setFormError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Form for Adding a new plant
  const handleOpenAdd = () => {
    setEditingPlant(null);
    setName('');
    setScientificName('');
    setDescription('');
    setCategory('Flowering Plants');
    setImage('');
    setPrice(150);
    setSize('8 inch nursery pot');
    setSunlight('Bright Indirect Light');
    setWater('Twice a week');
    setIsFeatured(false);
    setImageFileName('');
    setFormError('');
    setSuccessMsg('');
    setActiveTab('form');
  };

  // Open Form for Editing an existing plant
  const handleOpenEdit = (plant: Plant) => {
    setEditingPlant(plant);
    setName(plant.name);
    setScientificName(plant.scientificName || '');
    setDescription(plant.description);
    setCategory(plant.category);
    setImage(plant.image);
    setPrice(plant.price);
    setSize(plant.size || '');
    setSunlight(plant.sunlight || '');
    setWater(plant.water || '');
    setIsFeatured(!!plant.isFeatured);
    setImageFileName('');
    setFormError('');
    setSuccessMsg('');
    setActiveTab('form');
  };

  // Submit Handler for Add / Update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return setFormError('Plant Name is required.');
    if (!description.trim()) return setFormError('Description is required.');
    if (!image) return setFormError('Please upload an image or provide a valid image input.');
    if (price <= 0) return setFormError('Please enter a valid price greater than zero.');

    const url = editingPlant 
      ? `http://localhost:5000/api/plants/${editingPlant.id}` 
      : 'http://localhost:5000/api/plants';
    const method = editingPlant ? 'PUT' : 'POST';

    const plantPayload = {
      name: name.trim(),
      scientificName: scientificName.trim() || undefined,
      description: description.trim(),
      category,
      image,
      price,
      size: size.trim() || undefined,
      sunlight: sunlight.trim() || undefined,
      water: water.trim() || undefined,
      isFeatured
    };

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plantPayload)
    })
    .then(async (res) => {
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save the plant to the catalog.');
      }
      return res.json();
    })
    .then((savedPlant: Plant) => {
      if (editingPlant) {
        onUpdatePlant(savedPlant);
        setSuccessMsg('Plant updated successfully in the catalog!');
      } else {
        onAddPlant(savedPlant);
        setSuccessMsg('New plant added successfully to the catalog!');
      }

      setTimeout(() => {
        setSuccessMsg('');
        setActiveTab('list');
      }, 1000);
    })
    .catch((err) => {
      setFormError(err.message || 'Failed to save the plant.');
    });
  };

  // Delete Handler with prompt confirmation
  const handleDeleteCheck = (plant: Plant) => {
    const isConfirmed = window.confirm(`Are you sure you want to permanently delete "${plant.name}" from your catalog?`);
    if (isConfirmed) {
      fetch(`http://localhost:5000/api/plants/${plant.id}`, {
        method: 'DELETE'
      })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to delete the plant.');
        }
        onDeletePlant(plant.id);
      })
      .catch((err) => {
        alert(err.message || 'Failed to delete the plant.');
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-forest-900/40 backdrop-blur-xs cursor-pointer" 
      />

      {/* Main Admin Console Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-earth-100 flex flex-col h-[90vh]"
      >
        
        {/* Console Header Bar */}
        <div className="bg-gradient-to-r from-forest-700 to-forest-600 px-6 py-4 text-white flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <div>
              <h2 className="font-display font-bold text-lg select-none leading-none">Raju Landscape</h2>
              <span className="text-[10px] text-earth-200 uppercase tracking-widest font-mono">Catalog Admin Console</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-forest-700/60 hover:bg-red-650 text-white font-semibold text-xs transition duration-200 flex items-center gap-1.5 cursor-pointer hover:bg-red-600"
              title="Logout session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/15 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Console Navigation Tab */}
        <div className="bg-earth-50 px-6 py-3 border-b border-earth-100 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => { setActiveTab('list'); setSuccessMsg(''); setFormError(''); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeTab === 'list'
                  ? 'bg-forest-600 text-white shadow-xs'
                  : 'text-forest-700 hover:bg-earth-100'
              }`}
            >
              Catalog Inventory ({plants.length})
            </button>
            <button
              onClick={handleOpenAdd}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                activeTab === 'form' && !editingPlant
                  ? 'bg-forest-600 text-white shadow-xs'
                  : 'text-forest-700 hover:bg-earth-100'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Variety</span>
            </button>
          </div>

          <span className="hidden sm:flex text-[11px] text-forest-200 font-mono items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            Active Session
          </span>
        </div>

        {/* Inner Content Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-[#FAF9F6]">
          
          {/* TAB 1: LIST INVENTORY */}
          {activeTab === 'list' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-earth-100">
                <span className="text-xs uppercase font-extrabold text-[#7A9470] tracking-wider font-mono">
                  Operational Plant Records
                </span>
                <span className="text-xs text-gray-500 font-mono">Click actions to update</span>
              </div>

              {plants.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-earth-100">
                  <ImageIcon className="mx-auto w-12 h-12 text-earth-200 mb-2 animate-pulse" />
                  <p className="text-xs text-gray-500">The nursery catalog is currently empty. Add your first plant!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {plants.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-white p-3 rounded-2xl border border-earth-150 shadow-sm flex items-center gap-3 hover:border-forest-200 transition"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-bold text-sm text-forest-900 truncate leading-tight">
                            {p.name}
                          </h4>
                          {p.isFeatured && (
                            <span className="text-[9px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold font-mono">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-forest-200 font-mono uppercase">{p.category}</p>
                        <p className="text-xs font-bold text-forest-600 mt-0.5">₹{p.price}</p>
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 rounded-xl bg-earth-50 hover:bg-forest-100/40 text-forest-600 hover:text-forest-800 transition cursor-pointer"
                          title="Edit specifications"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCheck(p)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition cursor-pointer"
                          title="Delete plant option"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EDIT/ADD FORM */}
          {activeTab === 'form' && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-earth-100 p-4 sm:p-6 shadow-sm space-y-4">
              
              <div className="flex justify-between items-center pb-2 border-b border-earth-100">
                <span className="text-xs uppercase font-extrabold text-forest-200 tracking-wider font-mono">
                  {editingPlant ? `Specs Editing: ${editingPlant.name}` : 'Create Brand New Plant Variety'}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700 font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Main Fields Layout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Field Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-forest-700 uppercase tracking-widest font-mono">
                    Plant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value); setFormError(''); }}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-hidden focus:border-forest-500 focus:bg-white"
                    placeholder="e.g. Kashmir Rose, Fern Maiden"
                  />
                </div>

                

                {/* Category Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-forest-700 uppercase tracking-widest font-mono">
                    Plant Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-hidden focus:border-forest-500 focus:bg-white"
                  >
                    <option value="Flowering Plants">Flowering Plants</option>
                    <option value="Decorative Plants">Decorative Plants</option>
                    <option value="Indoor Plants">Indoor Plants</option>
                    <option value="Vegetable Plants">Vegetable Plants</option>
                  </select>
                </div>

                {/* Price block */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-forest-700 uppercase tracking-widest font-mono">
                    Standard Retail Price (INR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => { setPrice(Math.max(1, parseInt(e.target.value) || 0)); setFormError(''); }}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono outline-hidden focus:border-forest-500 focus:bg-white"
                    placeholder="e.g. 150"
                  />
                </div>


                {/* Toggle Featured */}
                <div className="flex items-center gap-2 pt-5 select-none">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4.5 h-4.5 text-forest-600 border-gray-300 rounded-sm focus:ring-forest-500"
                  />
                  <label htmlFor="isFeatured" className="text-xs text-forest-800 font-bold uppercase tracking-wider cursor-pointer">
                    Highlight as featured (Staff Pick)
                  </label>
                </div>

              </div>

              {/* Plant description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-forest-700 uppercase tracking-widest font-mono">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); setFormError(''); }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-hidden focus:border-forest-500 focus:bg-white resize-none"
                  placeholder="Tell clients about beautiful aesthetics, health uses, blooms, and layout tip..."
                />
              </div>

              {/* Plant Image Field (File Uploader with Base64 convert + text URL backup) */}
              <div className="space-y-3 bg-earth-50 p-4 rounded-2xl border border-gray-200">
                <label className="block text-[10px] font-bold text-forest-700 uppercase tracking-widest font-mono">
                  Plant Identification Image <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload Option */}
                  <div className="space-y-1.5">
                    <span className="text-xs text-gray-550 block">Option A: Upload device photo</span>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-forest-500 bg-white p-4 rounded-xl cursor-pointer transition text-center">
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs font-semibold text-forest-700">Choose file...</span>
                      <span className="text-[10px] text-gray-400">JPEG/PNG up to 2MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    {imageFileName && (
                      <p className="text-[10px] text-emerald-700 font-mono text-center truncate">
                        ✓ {imageFileName} Selected
                      </p>
                    )}
                  </div>

                  {/* URL Input Option */}
                  <div className="space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-gray-550 block">Option B: Paste external Web Image link</span>
                      <input
                        type="url"
                        value={image.startsWith('data:') ? '' : image}
                        onChange={(e) => { setImage(e.target.value.trim()); setFormError(''); }}
                        className="w-full mt-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-hidden focus:border-forest-500"
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                      />
                    </div>
                    <span className="text-[10px] text-gray-400">
                      Uploading from device encodes the photo into secure browser memory directly.
                    </span>
                  </div>

                </div>

                {/* Live upload preview box */}
                {image && (
                  <div className="mt-2 flex items-center justify-center p-2 bg-white rounded-xl border border-gray-100 max-w-xs mx-auto">
                    <img 
                      src={image} 
                      alt="Nursery upload preview" 
                      className="h-24 object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-earth-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingPlant ? 'Update Plant' : 'Save to Catalog'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </motion.div>
    </div>
  );
}
