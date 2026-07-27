import React, { useState } from 'react';
import Footer from './Footer';

import heroBg  from '../assets/123.png';
import img1    from '../assets/g1.jpg';
import img2    from '../assets/m8.jpg';
import img3    from '../assets/m3.png';
import img4    from '../assets/g2.jpg';
import img5    from '../assets/m9.jpg';
import img6    from '../assets/124.jpg';
import img7    from '../assets/g3.jpg';
import img8    from '../assets/m5.png';
import img9    from '../assets/i.png';
import img10   from '../assets/m1.jpg';

const GALLERY_CATEGORIES = ['All', 'Resort', 'Rooms', 'Restaurant', 'Pool', 'Garden', 'Events'];

// 10 images in the exact order requested, with category labels
const ALL_IMAGES = [
  { src: img1,  alt: 'Infinity pool at sunset',           category: 'Pool'       },
  { src: img2,  alt: 'Ocean dining deck at dusk',         category: 'Restaurant' },
  { src: img3,  alt: 'Luxury villa interior',             category: 'Rooms'      },
  { src: img4,  alt: 'Tropical resort aerial',            category: 'Resort'     },
  { src: img5,  alt: 'Canopy pool evening glow',          category: 'Pool'       },
  { src: img6,  alt: 'Cliffside suite terrace',           category: 'Rooms'      },
  { src: img7,  alt: 'Garden wedding arch',               category: 'Garden'     },
  { src: img8,  alt: 'Grand suite bedroom',               category: 'Rooms'      },
  { src: img9,  alt: 'Palm walkway garden path',          category: 'Garden'     },
  { src: img10, alt: 'Oceanfront villa lounge',           category: 'Resort'     },
];

/* ─── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({ img, onClose }) {
  if (!img) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-2xl font-light transition-colors"
        >
          ✕
        </button>
        <img src={img.src} alt={img.alt} className="w-full max-h-[80vh] object-contain rounded-xl" />
        <div className="mt-3 text-center">
          <span className="text-[10px] tracking-widest text-[#c5a253] uppercase font-bold">{img.category}</span>
          <p className="text-white/70 text-xs mt-1 font-light">{img.alt}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Grid cell helper ──────────────────────────────────────────────────── */
function GalleryCell({ img, onClick, className = '' }) {
  return (
    <div
      onClick={() => onClick(img)}
      className={`overflow-hidden rounded-xl cursor-pointer group relative ${className}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
        <span className="text-[9px] tracking-widest text-[#c5a253] uppercase font-bold">{img.category}</span>
        <span className="text-xs font-serif font-light text-white mt-0.5 leading-snug">{img.alt}</span>
      </div>
    </div>
  );
}

export default function Gallery({ handleScrollTo, setCurrentPage }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filtered = activeCategory === 'All'
    ? ALL_IMAGES
    : ALL_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">

      {/* LIGHTBOX */}
      <Lightbox img={lightboxImg} onClose={() => setLightboxImg(null)} />

      {/* 1. HERO BANNER */}
      <section
        className="relative h-[46vh] w-full flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.4em] text-white/80 uppercase block">
              Gallery
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              A glimpse of paradise
            </h1>
            <p className="text-white/75 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Wander through the landscapes and moments that define Thabasiya Resorts.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FILTER TABS */}
      <section className="py-5 bg-[#f7f4eb] border-b border-stone-200/60 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-stone-950 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. GALLERY GRID */}
      <section className="py-10 px-6 md:px-12 max-w-7xl mx-auto">
        {activeCategory === 'All' && filtered.length === 10 ? (
          /* ── STRUCTURED COLLAGE LAYOUT (10 images) ── */
          <div className="flex flex-col gap-3">

            {/* Row 1: 3 equal columns */}
            <div className="grid grid-cols-3 gap-3">
              <GalleryCell img={filtered[0]} onClick={setLightboxImg} className="h-52" />
              <GalleryCell img={filtered[1]} onClick={setLightboxImg} className="h-52" />
              <GalleryCell img={filtered[2]} onClick={setLightboxImg} className="h-52" />
            </div>

            {/* Row 2: left wide | center tall (spans rows 2+3 col 2) | right stacked 2 */}
            <div className="grid grid-cols-3 gap-3">
              {/* Left: col 1 only, normal height */}
              <div className="flex flex-col gap-3">
                <GalleryCell img={filtered[3]} onClick={setLightboxImg} className="h-52 flex-1" />
                <GalleryCell img={filtered[7]} onClick={setLightboxImg} className="h-48 flex-1" />
              </div>

              {/* Center: tall single image */}
              <GalleryCell img={filtered[4]} onClick={setLightboxImg} className="h-[26.5rem]" />

              {/* Right: two stacked */}
              <div className="flex flex-col gap-3">
                <GalleryCell img={filtered[5]} onClick={setLightboxImg} className="h-52 flex-1" />
                <GalleryCell img={filtered[6]} onClick={setLightboxImg} className="h-48 flex-1" />
              </div>
            </div>

            {/* Row 3: 2 equal + 1 wide */}
            <div className="grid grid-cols-3 gap-3">
              <GalleryCell img={filtered[8]} onClick={setLightboxImg} className="h-52" />
              <GalleryCell img={filtered[9]} onClick={setLightboxImg} className="h-52 col-span-2" />
            </div>

          </div>
        ) : (
          /* ── FILTERED VIEW: simple responsive grid ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, idx) => (
              <GalleryCell key={idx} img={img} onClick={setLightboxImg} className="h-52" />
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
