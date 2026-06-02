import React from 'react';
import { Leaf, Phone, MapPin, Mail, Clock, Map, ExternalLink } from 'lucide-react';
import { NURSERY_INFO } from '../data/plants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-forest-900 text-white pt-16 pb-8 border-t border-forest-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-forest-800">
          
          {/* Column 1: Brand & Philosophy (4/12 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-forest-850 border border-forest-800 text-forest-200">
                <Leaf className="w-5.5 h-5.5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Raju Landscape
              </span>
            </div>
            
            <p className="text-xs text-forest-300 leading-relaxed">
              Serving organic greens, decorative plants, and premium indoor oxygenators in Madhapur, Hyderabad. We deliver hand-nurtured plant varieties straight from our greenhouse to your balcony.
            </p>

            <div className="flex items-center gap-1 text-[11px] font-mono text-earth-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>Nursery Status: Active & Supplying All Hyderabad</span>
            </div>
          </div>

          {/* Column 2: Business Hours (3/12 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">Business Hours</h4>
            <div className="space-y-2 text-xs text-forest-300">
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-earth-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Monday - Sunday:</strong> <br />
                  {NURSERY_INFO.businessHours}
                </span>
              </p>
              <p className="text-[11px] text-forest-400">
                Open on all public holidays. Reach us for terrace garden layouts and premium decorative bulk orders!
              </p>
            </div>
          </div>

          {/* Column 3: Contact & Store Location (5/12 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">Nursery Location & Inquiries</h4>
            <div className="space-y-3 text-xs text-forest-300">
              
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-earth-500 shrink-0 mt-0.5" />
                <span>{NURSERY_INFO.address}</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${NURSERY_INFO.contactNumber}`}
                  className="flex items-center gap-2 p-2 rounded-lg bg-forest-850 hover:bg-forest-800 transition text-forest-200 border border-forest-800"
                >
                  <Phone className="w-3.5 h-3.5 text-earth-500 shrink-0" />
                  <span className="truncate">Call: {NURSERY_INFO.contactNumber}</span>
                </a>
                
                <a
                  href={`mailto:${NURSERY_INFO.email}`}
                  className="flex items-center gap-2 p-2 rounded-lg bg-forest-850 hover:bg-forest-800 transition text-forest-200 border border-forest-800"
                >
                  <Mail className="w-3.5 h-3.5 text-earth-500 shrink-0" />
                  <span className="truncate">Email {NURSERY_INFO.email}</span>
                </a>
              </div>

              {/* Direct Maps Link Button */}
              <div className="pt-2">
                <a
                  href={NURSERY_INFO.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-earth-500 hover:bg-earth-600 text-white font-semibold text-xs transition duration-300 cursor-pointer"
                >
                  <Map className="w-3.5 h-3.5 shrink-0" />
                  <span>Navigate on Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-white shrink-0" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Bottom copyright and attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest-400">
          <p>© {currentYear} Raju Landscape & Nursery. Hyderabad, Telangana.</p>
          <div className="flex gap-4 font-mono text-[10px]">
            <span>Designed in Hitech City</span>
            <span>•</span>
            <span>WhatsApp Verified Portal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
