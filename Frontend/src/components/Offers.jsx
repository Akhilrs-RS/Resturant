import React, { useState } from 'react';
import Footer from './Footer';
import heroBg from '../assets/e.jpg';
import m6 from '../assets/m6.jpg';
import m7 from '../assets/m7.jpg';
import m8 from '../assets/m8.jpg';

const OFFERS_DATA = [
  {
    title: 'Weekend Escape',
    discount: '20% OFF',
    desc: 'Save On 2-Night Weekend Stays With Complimentary Breakfast.',
    code: 'WEEKEND 15',
    image: heroBg
  },
  {
    title: 'Honeymoon Bliss',
    discount: '30% OFF',
    desc: 'Romantic Suite, Coupled Spa And Private Candlelit Dinner.',
    code: 'WEEKEND 20',
    image: m6
  },
  {
    title: 'Family Holiday',
    discount: '20% OFF',
    desc: 'Kids Stay Free Plus Complimentary Pool Access And Activities.',
    code: 'WEEKEND 25',
    image: m7
  },
  {
    title: 'Family Holiday',
    discount: '30% OFF',
    desc: 'Kids Stay Free Plus Complimentary Pool Access And Activities.',
    code: 'WEEKEND 25',
    image: m8
  }
];

export default function Offers({ handleScrollTo, setCurrentPage }) {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    alert(`Coupon code "${couponCode}" is active! Your discounts will be applied at check-out.`);
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section 
        className="relative h-[65vh] w-full flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 relative z-20 text-left">
          <div className="space-y-3">
            <span className="text-[11px] font-bold tracking-[0.4em] text-white/95 uppercase block">
              OFFERS & PROMOTIONS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight">
              Adventure meets serenity
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-lg mt-2 leading-relaxed uppercase">
              SEASONAL PRIVILEGES AND EXCLUSIVE RATES FOR THE DISCERNING TRAVELER.
            </p>
          </div>
        </div>
      </section>

      {/* 2. COUPON BOX */}
      <section className="pt-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-normal text-stone-955 uppercase tracking-wide">Have a Coupon?</h4>
            <p className="text-[11px] font-bold tracking-wider text-stone-400 uppercase">Apply your code to unlock exclusive savings.</p>
          </div>

          <form onSubmit={handleApplyCoupon} className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Enter Code" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-xs rounded-xl px-5 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-700 w-44"
            />
            <button 
              type="submit" 
              className="bg-black hover:bg-resort-gold hover:text-stone-950 text-white font-bold px-8 py-3.5 rounded-md text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 shadow-md"
            >
              Apply
            </button>
          </form>
        </div>
      </section>

      {/* 3. OFFERS CARDS GRID */}
      <section className="py-16 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {OFFERS_DATA.map((offer, idx) => (
            <div 
              key={idx}
              className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-stone-100 hover:-translate-y-1 transition-all duration-300 text-left"
            >
              {/* Image Section (Left) */}
              <div className="w-full md:w-5/12 h-60 md:h-auto overflow-hidden relative">
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
                    <span className="text-[10px] tracking-widest text-resort-gold font-bold block uppercase">
                      🏷️ {offer.discount}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-stone-955 leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed">
                    {offer.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 flex items-center justify-between border-t border-stone-100">
                  <div className="flex items-center gap-1.5 text-[10px] bg-stone-100 text-stone-600 px-3 py-1 rounded-md font-semibold tracking-wide uppercase">
                    <span>🏷️</span> {offer.code}
                  </div>
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
