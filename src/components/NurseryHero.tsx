import React from 'react';
import { motion } from 'motion/react';
import HeroBg from '../public/1.PNG';

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
    <div
      className='relative flex min-h-[534px] w-full flex-col items-start justify-center overflow-hidden bg-white px-4 py-24 text-left text-7xl font-bold text-green-950 md:items-center md:text-center md:px-10 lg:px-20'
      style={{ aspectRatio: '800 / 534' }}
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20'
        style={{ backgroundImage: `url(${HeroBg})` }}
        aria-hidden='true'
      />
      <div className='relative z-10 flex w-full flex-col items-start md:items-center'>
      <p className='text-2xl text-gray-700'>Welcome</p>
      <h1>Raju Landscape</h1>
      <button
        onClick={scrollToPlants}
        className="mt-6 inline-flex self-center items-center justify-center rounded-full p-2 text-gray-700 hover:bg-gray-100"
        aria-label="Scroll to plants"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
        </svg>
      </button>
      <h1 className='mt-3 flex items-center justify-start gap-1 text-4xl text-gray-700 md:justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
</svg>
      <span className='text-2xl mt-4 text-gray-700'>Madhapur, Hyderabad</span>
      </h1>
      
       
      </div>
    </div>
    
  );
    
}
