import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Check, ArrowRight } from 'lucide-react';
import Footer from './Footer';

const ROOMS_DATA = [
  {
    id: 'ocean-premium',
    name: 'Ocean Premium Room',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    price: '₹34,000',
    desc: 'Comfortable suite with panoramic balcony views, designed for couples.',
    tags: ['Balcony', 'Ocean View', 'King Bed'],
    guests: '2 Guests'
  },
  {
    id: 'canopy-family',
    name: 'Canopy Family Suite',
    category: 'Family Villa',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    price: '₹48,000',
    desc: 'Spacious suite designed for family stays, nestled close to lush greenery.',
    tags: ['2 Bedrooms', 'Garden View', 'Kids Play Area'],
    guests: '4 Guests'
  },
  {
    id: 'exotic-forest',
    name: 'Exotic Forest Chalet',
    category: 'Deluxe',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    price: '₹42,000',
    desc: 'Chalet nestled in lush tropical trees, offering absolute peace and shade.',
    tags: ['Private Deck', 'Forest View', 'Outdoor Shower'],
    guests: '2 Guests'
  },
  {
    id: 'private-pool',
    name: 'Private Pool Villa',
    category: 'Villas',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
    price: '₹89,000',
    desc: 'Exclusive sanctuary with a private pool, loungers, and tropical gardens.',
    tags: ['Private Pool', 'Ocean Front', 'Butler Service'],
    guests: '3 Guests'
  },
  {
    id: 'honeymoon-ocean',
    name: 'Honeymoon Ocean Suite',
    category: 'Honeymoon Suite',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    price: '₹72,000',
    desc: 'A romantic sanctuary featuring a private plunge pool and candlelit decks.',
    tags: ['Plunge Pool', 'Ocean View', 'Romantic Decor'],
    guests: '2 Guests'
  },
  {
    id: 'overwater-bungalow',
    name: 'Overwater Bungalow',
    category: 'Villas',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    price: '₹98,000',
    desc: 'Luxury overwater bungalow with glass floor panels and direct lagoon access.',
    tags: ['Lagoon Access', 'Glass Floor', 'Private Deck'],
    guests: '2 Guests'
  }
];

const CATEGORIES = ['All', 'Deluxe', 'Premium', 'Family Villa', 'Villas', 'Honeymoon Suite'];

export default function Accommodation({ handleOpenBooking, handleScrollTo, setCurrentPage }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [roomsList, setRoomsList] = useState(ROOMS_DATA);

  React.useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('http://localhost:5210/api/catalog/prices');
        if (res.ok) {
          const prices = await res.json();
          setRoomsList(prev => prev.map(room => {
            let dbKey = '';
            if (room.id === 'ocean-premium') dbKey = 'suite_deluxe';
            else if (room.id === 'canopy-family') dbKey = 'suite_ocean';
            else if (room.id === 'exotic-forest') dbKey = 'suite_ocean';
            else if (room.id === 'private-pool') dbKey = 'suite_presidential';
            else if (room.id === 'honeymoon-ocean') dbKey = 'suite_honeymoon';
            else if (room.id === 'overwater-bungalow') dbKey = 'suite_presidential';

            const match = prices.find(p => p.itemKey === dbKey);
            return match ? { ...room, price: `₹${Number(match.price).toLocaleString('en-IN')}` } : room;
          }));
        }
      } catch (err) {
        console.error("Failed to fetch room prices:", err);
      }
    };
    fetchPrices();
  }, []);

  const filteredRooms = activeCategory === 'All'
    ? roomsList
    : roomsList.filter(room => room.category === activeCategory);

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[45vh] w-full flex items-end bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">
              ROOMS & SUITES
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Your private retreat
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Five distinct categories, each styled to highlight comfort and calm.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TABS / FILTERS */}
      <section className="py-8 bg-white border-b border-stone-200/40 px-6 md:px-12 sticky top-[72px] z-30 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-3 scrollbar-none py-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-stone-950 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 3. ROOMS GRID */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <div 
              key={room.id}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200/40 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(196,155,85,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col group text-left"
            >
              {/* Image */}
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-resort-gold transition-colors duration-300">
                    {room.name}
                  </h3>
                  <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed">
                    {room.desc}
                  </p>

                  {/* Metadata tags */}
                  <div className="flex flex-wrap gap-4 text-[10px] text-stone-400 font-medium pt-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-resort-gold" />
                      {room.guests}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-resort-gold" />
                      Available
                    </span>
                  </div>

                  {/* Badge tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {room.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] bg-stone-100/80 text-stone-600 px-2.5 py-1 rounded-md font-medium tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-stone-100 mt-6">
                  <span className="text-stone-900 font-semibold text-sm md:text-base">
                    {room.price} <span className="text-[10px] text-stone-400 font-light font-sans">/Night</span>
                  </span>
                  <button 
                    onClick={() => handleOpenBooking()}
                    className="bg-stone-950 hover:bg-resort-gold text-white hover:text-stone-950 font-bold px-6 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 uppercase"
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
