import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, User, Lightbulb, Compass, CircleCheck, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onLoginSuccess
}: AdminLoginModalProps) {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!username.trim() || !password) {
      setFormError('Please fill out both username and password.');
      return;
    }

    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Invalid credentials.');
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
        onLoginSuccess();
        setUsername('');
        setPassword('');
      })
      .catch((err) => {
        setLoading(false);
        setFormError(err.message || 'Invalid Administrator credentials. Please inspect the tips box below.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Frosted Background Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-forest-900/40 backdrop-blur-xs cursor-pointer" 
      />

      {/* Main Login Block container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-earth-150 overflow-hidden"
      >
        
        {/* Absolute float close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-450 hover:text-gray-700 hover:bg-gray-105 p-1.5 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-500 hover:bg-gray-50 rounded" />
        </button>

        {/* Brand Banner */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 text-forest-600 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-forest-900">Admin Portal Log In</h2>
          <p className="text-xs text-gray-500 mt-1">Authorized access to catalog and inventory parameters only</p>
        </div>

        {/* Main form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {formError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-[11px] font-bold text-red-650 leading-tight">
              ⚠️ {formError}
            </div>
          )}

          {/* User input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-forest-800">
              Admin Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setFormError(''); }}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-forest-500 focus:bg-white rounded-xl text-sm outline-hidden transition"
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-forest-800">
              Secret Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFormError(''); }}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 focus:border-forest-500 focus:bg-white rounded-xl text-sm outline-hidden transition font-mono"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-450 hover:text-gray-700 p-1 rounded-md"
              >
                {passwordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <span>Unlock Admin Panel ➜</span>
            )}
          </button>

        </form>

        {/* Demo Helper box displaying exact credentials to avoid any friction */}
        <div className="mt-6 p-4 rounded-xl bg-forest-50 border border-forest-100/60">
          <div className="flex gap-2 items-start text-xs text-forest-800">
            
            <div> 
            </div>
          </div>
        </div>

      </motion.div>

    </div>
  );
}
