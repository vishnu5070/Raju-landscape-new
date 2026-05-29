import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Building2, Quote } from 'lucide-react';
import { NURSERY_INFO } from '../data/plants';

export default function AboutSection() {
  return (
    <section id="about-section" className="py-16 bg-[#FAF9F6] border-t border-b border-earth-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A9470] font-mono block mb-1">
            Nursery Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-forest-900 tracking-tight">
            About Raju Landscape
          </h2>
          <div className="w-12 h-1 bg-earth-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Unified, Beautiful Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-earth-150 shadow-md flex flex-col gap-6"
        >
          {/* 1. Nursery Name & 5. Short Business Description */}
          <div className="space-y-3 pb-6 border-b border-earth-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-5.5 h-5.5 text-forest-500 shrink-0" />
              <h3 className="font-display font-bold text-xl sm:text-2xl text-forest-900">
                Raju Landscape
              </h3>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed italic">
              "Established with a passion for greenery, Raju Landscape is Hyderabad's premium plant nursery in Madhapur. We specialize in bringing handpicked ornamental, flowering, indoor, and kitchen garden plants to homes and offices."
            </p>
          </div>

          {/* Grid of details: 2. Location, 3. Contact, 4. Email */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Address */}
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-earth-200/30 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#2D4A22] font-semibold text-xs uppercase tracking-wider font-mono">
                <MapPin className="w-4 h-4 text-earth-500 shrink-0" />
                <span>Nursery Location</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Plot No. 42, Hitech City Main Rd, near Madhapur Metro Station, Madhapur, Hyderabad, Telangana 500081
              </p>
            </div>

            {/* Contact Number */}
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-earth-200/30 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#2D4A22] font-semibold text-xs uppercase tracking-wider font-mono">
                <Phone className="w-4 h-4 text-earth-500 shrink-0" />
                <span>Contact Number</span>
              </div>
              <p className="text-xs text-gray-600 font-bold font-mono">
                +91 98480 22338
              </p>
              <span className="text-[10px] text-gray-400">Available from 8:00 AM - 8:30 PM today</span>
            </div>

            {/* Email Address */}
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-earth-200/30 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#2D4A22] font-semibold text-xs uppercase tracking-wider font-mono">
                <Mail className="w-4 h-4 text-earth-500 shrink-0" />
                <span>Email Address</span>
              </div>
              <p className="text-xs text-gray-600 font-medium font-mono truncate">
                rajulandscape@gmail.com
              </p>
              <span className="text-[10px] text-gray-400">Send custom/bulk plant inquiries</span>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
