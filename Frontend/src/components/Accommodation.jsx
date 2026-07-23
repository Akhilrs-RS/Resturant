import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Check, Clock } from 'lucide-react';
import Footer from './Footer';
import heroBg from '../assets/25.png';
import m1 from '../assets/m1.jpg';
import m6 from '../assets/m6.jpg';
import m7 from '../assets/m7.jpg';
import m8 from '../assets/m8.jpg';
import m10 from '../assets/m10.jpg';

const ROOMS_DATA = [
  {
    id: 'ocean-premium',
    name: 'Ocean Premium Room',
    category: 'Premium',
    image: m7,
    price: '$340',
    desc: 'A Romantic Sanctuary With A Private Plunge Pool And Uninterrupted Ocean Vistas.',
    tags: ['Plunge Pool', 'Ocean View', 'Romantic Setup'],
    guests: '2 Guests'
  },
  {
    id: 'canopy-family',
    name: 'Canopy Family Suite',
    category: 'Family Suite',
    image: m10,
    price: '$480',
    desc: 'Spacious Two Bedroom Suite Designed For Families, With A Living Area And Kids Amenities.',
    tags: ['2 Bedrooms', 'Living Area', 'Domestic Setup'],
    guests: '4 Guests'
  },
  {
    id: 'garden-deluxe',
    name: 'Garden Deluxe Room',
    category: 'Deluxe',
    image: m8,
    price: '$220',
    desc: 'A Serene Retreat With Garden Views, Plush King Bed, And A Private Balcony.',
    tags: ['King Bed', 'Garden View', 'Free WiFi'],
    guests: '2 Guests'
  },
  {
    id: 'private-pool',
    name: 'Private Pool Villa',
    category: 'Villa',
    image: m6,
    price: '$890',
    desc: 'A Romantic Sanctuary With A Private Plunge Pool, Wooden Deck And Lush Surroundings.',
    tags: ['Plunge Pool', 'Ocean front', 'Butler Service'],
    guests: '3 Guests'
  },
  {
    id: 'honeymoon-ocean',
    name: 'Honeymoon Ocean Suite',
    category: 'Honeymoon Suite',
    image: m1,
    price: '$720',
    desc: 'A Romantic Sanctuary Featuring A Private Plunge Pool And Uninterrupted Ocean Vistas.',
    tags: ['Plunge Pool', 'Ocean View', 'Romantic Decor'],
    guests: '2 Guests'
  }
];

const CATEGORIES = ['All', 'Deluxe', 'Premium', 'Family Suite', 'Villa', 'Honeymoon Suite'];

export default function Accommodation({ handleOpenBooking, handleScrollTo, setCurrentPage }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredRooms = activeCategory === 'All'
    ? ROOMS_DATA
    : ROOMS_DATA.filter(room => room.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section 
        className="relative h-[65vh] w-full flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 relative z-20 text-left">
          <div className="space-y-3">
            <span className="text-[11px] font-bold tracking-[0.4em] text-white/95 uppercase block">
              Rooms & Suites
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight">
              Your private retreat
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-lg mt-2 leading-relaxed">
              Five distinct categories, each a study in refined comfort and quiet luxury.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TABS / FILTERS */}
      <section className="py-8 px-6 md:px-12 sticky top-[72px] z-30 bg-[#f7f4eb]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 py-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-[10px] md:text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap border ${
                activeCategory === category
                  ? 'bg-stone-950 text-white border-stone-950 shadow-md'
                  : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:text-stone-950'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 3. ROOMS GRID */}
      <section className="py-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div 
              key={room.id}
              className="rounded-[2.5rem] overflow-hidden bg-white border border-stone-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col group text-left"
            >
              {/* Image */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-normal text-stone-950 group-hover:text-resort-gold transition-colors duration-300">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-resort-gold font-bold">
                      <span>★</span> 4.7
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed">
                    {room.desc}
                  </p>

                  {/* Metadata tags */}
                  <div className="flex flex-wrap gap-4 text-[10px] text-stone-400 font-semibold pt-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {room.guests}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-stone-400" />
                      Available
                    </span>
                  </div>

                  {/* Badge tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {room.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] bg-stone-100 text-stone-600 px-3 py-1 rounded-md font-medium tracking-wide uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-stone-100 mt-8">
                  <span className="text-stone-950 font-bold text-base md:text-lg">
                    {room.price} <span className="text-[10px] text-stone-400 font-light font-sans">/Night</span>
                  </span>
                  <button 
                    onClick={() => handleOpenBooking()}
                    className="bg-black hover:bg-resort-gold text-white hover:text-stone-950 font-bold px-6 py-2.5 rounded-md text-xs tracking-wider transition-all duration-300 uppercase"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
