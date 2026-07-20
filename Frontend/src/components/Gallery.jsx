import React, { useState } from 'react';
import Footer from './Footer';

const GALLERY_CATEGORIES = ['All', 'Resort', 'Rooms', 'Restaurant', 'Pool', 'Garden', 'Events'];

const GALLERY_IMAGES = [
  {
    category: 'Resort',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    alt: 'Resort main lounge evening reflection'
  },
  {
    category: 'Rooms',
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    alt: 'Ocean premium suite interior bedroom'
  },
  {
    category: 'Restaurant',
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    alt: 'Chef plated sunset seafood entree'
  },
  {
    category: 'Pool',
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    alt: 'Infinity pool night view matching loungers'
  },
  {
    category: 'Garden',
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80',
    alt: 'Tropical lush forest walkway and palms'
  },
  {
    category: 'Events',
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
    alt: 'Sunset beachfront wedding ceremony arch'
  },
  {
    category: 'Rooms',
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80',
    alt: 'Canopy family suite interconnected space'
  },
  {
    category: 'Restaurant',
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80',
    alt: 'Ocean beach dining deck candlelight'
  },
  {
    category: 'Pool',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    alt: 'Calm sand beach lounge chairs and palms'
  }
];

export default function Gallery({ handleScrollTo, setCurrentPage }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[45vh] w-full flex items-end bg-[url('https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">
              GALLERY
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              A glimpse of paradise
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Take a visual tour through our private villas, dining venues and tropical scenery.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TABS / FILTERS */}
      <section className="py-8 bg-white border-b border-stone-200/40 px-6 md:px-12 sticky top-[72px] z-30 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-3 scrollbar-none py-1">
          {GALLERY_CATEGORIES.map((category) => (
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

      {/* 3. MASONRY COLLAGE GRID */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, idx) => (
            <div 
              key={idx}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-md border border-stone-200/20 group relative cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-[9px] tracking-widest text-resort-gold uppercase font-bold">{img.category}</span>
                <span className="text-sm font-serif font-light text-white mt-1 leading-snug">{img.alt}</span>
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
