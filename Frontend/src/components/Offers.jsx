import React from 'react';
import Footer from './Footer';

const OFFERS_DATA = [
  {
    title: 'Weekend Escape',
    category: 'RESORT',
    desc: 'Escape the routine with a luxurious weekend stay at Coral Bay. Includes complimentary breakfast buffets and premium sea-view room upgrades.',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Honeymoon Bliss',
    category: 'ROMANCE',
    desc: 'Unwind in ultimate privacy with your partner. Includes a complimentary couples botanical spa treatment and a private candlelit sunset beach dinner.',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Family Holiday',
    category: 'FAMILY',
    desc: 'Make lasting memories with your loved ones. Children stay free, plus enjoy complimentary family lagoon pool slots and supervised resort activities.',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Moon Retreat',
    category: 'WELLNESS',
    desc: 'A wellness sanctuary package designed to restore biological rhythm. Includes organic herbal detox tea and private evening starlight sky-gazing sessions.',
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Offers({ handleScrollTo, setCurrentPage }) {
  const handleInquiryClick = (offerTitle) => {
    alert(`Thank you for your interest in our ${offerTitle} promotion! Our concierge team will contact you within 24 hours to secure your booking.`);
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[45vh] w-full flex items-end bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">
              SPECIAL OFFERS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Adventure meets serenity
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Curated package deals and exclusive discounts for your escape.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OFFERS CONTENT */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {OFFERS_DATA.map((offer, idx) => (
            <div 
              key={idx}
              className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.02)] border border-stone-200/40 hover:-translate-y-1 transition-all duration-300 text-left"
            >
              {/* Image Section (Left) */}
              <div className="w-full md:w-5/12 h-56 md:h-auto overflow-hidden relative">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section (Right) */}
              <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] tracking-widest text-stone-400 font-bold block uppercase">
                      {offer.category}
                    </span>
                    <span className="bg-resort-gold text-stone-950 font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                      {offer.discount}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900 leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-stone-500 text-xs font-light leading-relaxed">
                    {offer.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-stone-100 mt-6">
                  <button 
                    onClick={() => handleInquiryClick(offer.title)}
                    className="w-full bg-stone-950 hover:bg-resort-gold text-white hover:text-stone-950 font-bold py-2.5 rounded-xl text-xs tracking-wider transition-all duration-300 uppercase shadow-md"
                  >
                    Inquire Now
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
