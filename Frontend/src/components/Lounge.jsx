import React, { useState } from 'react';
import Footer from './Footer';
import heroBg  from '../assets/b.png';
import barImg  from '../assets/c.jpg';
import mood1   from '../assets/99.png';
import mood2   from '../assets/98.png';
import mood3   from '../assets/97.png';
import mood4   from '../assets/96.png';

// Menu preview images
import menu1 from '../assets/103.jpg';
import menu2 from '../assets/104.jpg';
import menu3 from '../assets/105.jpg';
import menu4 from '../assets/106.jpg';
import menu5 from '../assets/107.jpg';
import menu6 from '../assets/108.jpg';
import menu7 from '../assets/109.jpg';
import menu8 from '../assets/110.jpg';

// Ambience images
import amb1 from '../assets/111.jpg';
import amb2 from '../assets/112.jpg';
import amb3 from '../assets/113.jpg';
import amb4 from '../assets/114.jpg';

const MOOD_CARDS = [
  {
    title: 'SIGNATURE COCKTAILS',
    desc: 'Handcrafted mixes prepared by expert mixologists. Enjoy Every Drop.',
    image: mood1
  },
  {
    title: 'FRESH MOCKTAILS',
    desc: 'Refreshing non-alcoholic beverages crafted to sweet perfection.',
    image: mood2
  },
  {
    title: 'SUNSET LOUNGE SEATING',
    desc: 'Settle into the open-air lounge and enjoy live acoustic evenings.',
    image: mood3
  },
  {
    title: 'PRIVATE CELEBRATIONS',
    desc: 'Perfect for birthdays, anniversaries, and intimate evenings.',
    image: mood4
  }
];

const MENU_PREVIEWS = [
  { title: 'Signature Cocktails', desc: 'Handcrafted drinks prepared by expert mixologists.', image: menu1 },
  { title: 'Premium Mocktails', desc: 'Zero-proof creations bursting with flavor.', image: menu2 },
  { title: 'Wine Selection', desc: 'Curated vintages from renowned vineyards.', image: menu3 },
  { title: 'Spirits', desc: 'Rare whiskeys, cognacs, and fine liqueurs.', image: menu4 },
  { title: 'Signature Cocktails', desc: 'Handcrafted drinks prepared by expert mixologists.', image: menu5 },
  { title: 'Premium Mocktails', desc: 'Zero-proof creations bursting with flavor.', image: menu6 },
  { title: 'Wine Selection', desc: 'Curated vintages from renowned vineyards.', image: menu7 },
  { title: 'Spirits', desc: 'Rare whiskeys, cognacs, and fine liqueurs.', image: menu8 },
];

const AMBIENCE_PREVIEWS = [amb1, amb2, amb3, amb4];

export default function Lounge({ handleScrollTo, setCurrentPage }) {
  const [menuPreviewsList, setMenuPreviewsList] = useState([
    { dbKey: 'bar_cocktail_1', title: 'Signature Cocktails', desc: 'Handcrafted drinks prepared by expert mixologists.', image: menu1 },
    { dbKey: 'bar_mocktail_1', title: 'Premium Mocktails', desc: 'Zero-proof creations bursting with flavor.', image: menu2 },
    { dbKey: 'bar_wine_1', title: 'Wine Selection', desc: 'Curated vintages from renowned vineyards.', image: menu3 },
    { dbKey: 'bar_spirits_1', title: 'Spirits', desc: 'Rare whiskeys, cognacs, and fine liqueurs.', image: menu4 },
    { dbKey: 'bar_cocktail_2', title: 'Craft Brews', desc: 'Locally sourced artisanal craft beers.', image: menu5 },
    { dbKey: 'bar_mocktail_2', title: 'Tropical Punch', desc: 'A refreshing mix of pineapple, mango, and passionfruit.', image: menu6 },
    { dbKey: 'bar_wine_2', title: 'Champagne Select', desc: 'Premium sparkling champagnes imported directly from France.', image: menu7 },
    { dbKey: 'bar_spirits_2', title: 'Rare Vintage Malt', desc: 'A selection of fine and rare single malt whiskeys.', image: menu8 },
  ]);

  React.useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('http://localhost:5210/api/catalog/prices');
        if (res.ok) {
          const prices = await res.json();
          setMenuPreviewsList(prev => prev.map(item => {
            const match = prices.find(p => p.itemKey === item.dbKey);
            return match ? { 
              ...item, 
              title: match.displayName || item.title,
              desc: match.description || item.desc,
              image: match.imageUrl || item.image
            } : item;
          }));
        }
      } catch (err) {
        console.error('Failed to fetch bar preview prices:', err);
      }
    };
    fetchPrices();
  }, []);

  const [seatingPreference, setSeatingPreference] = useState('Indoor');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    occasion: 'Select Occasion',
    msg: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5210/api/reservations/lounges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: new Date(formData.date).toISOString(),
          time: formData.time,
          guests: parseInt(formData.guests) || 2,
          seatingPreference,
          occasion: formData.occasion,
          specialRequest: formData.msg
        })
      });
      if (response.ok) {
        alert(`Lounge reservation confirmed for ${formData.name}! Date: ${formData.date}, Time: ${formData.time}. See you at the bar!`);
        setFormData({ name: '', phone: '', email: '', date: '', time: '', guests: '2', occasion: 'Select Occasion', msg: '' });
      } else {
        alert('Lounge reservation failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend database server.');
    }
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative h-[46vh] w-full flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.4em] text-[#c5a253] uppercase block">
              BAR &amp; LOUNGE
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-light text-white leading-tight max-w-lg">
              Evenings Crafted with Elegance
            </h1>
            <p className="text-white/75 text-[10px] md:text-xs font-semibold tracking-widest uppercase max-w-md mt-2 leading-relaxed">
              RELAX BY THE OCEAN WITH HANDCRAFTED BEVERAGES, PREMIUM MOCKTAILS, SIGNATURE COCKTAILS, SOFT MUSIC, AND A CALM LUXURY LOUNGE ATMOSPHERE.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT THE LOUNGE ─────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <div className="space-y-6 text-left">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block">
              ABOUT THE LOUNGE
            </span>
            <h2 className="font-serif text-3xl md:text-[2.2rem] font-light text-[#c5a253] uppercase leading-tight">
              A Refined Lounge <br />
              <span className="font-light">Experience</span>
            </h2>
            <p className="text-stone-600 text-sm font-light leading-relaxed max-w-md">
              Enjoy A Refined Evening Experience At Our Resort Lounge, Where Warm Lighting, Ocean Breeze, Curated Beverages, Elegant Interiors, And Soft Music Come Together To Create The Perfect Place To Unwind.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-5 border-t border-stone-200/70">
              <div>
                <p className="font-serif text-2xl font-bold text-[#c5a253]">12+</p>
                <p className="text-[10px] text-[#c5a253] font-medium uppercase tracking-wider mt-1">Signature Cocktails</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#c5a253]">8</p>
                <p className="text-[10px] text-[#c5a253] font-medium uppercase tracking-wider mt-1">Menu Categories</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#c5a253]">5PM</p>
                <p className="text-[10px] text-[#c5a253] font-medium uppercase tracking-wider mt-1">Opens Daily</p>
              </div>
            </div>

            {/* Opening hours box */}
            <div className="bg-white rounded-xl px-5 py-4 border border-stone-200 inline-block shadow-sm">
              <p className="text-[9px] text-[#c5a253] font-bold uppercase tracking-wider">Opening Hours</p>
              <p className="text-sm font-semibold text-[#c5a253] mt-1">4:00 PM – 12:00 AM</p>
            </div>
          </div>

          {/* Right: image */}
          <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
            <img src={barImg} alt="Luxury bar interior" className="w-full h-full object-cover" />
          </div>

        </div>
      </section>

      {/* ── 3. CRAFTED FOR EVERY MOOD ───────────────────────────────── */}
      <section className="py-14 px-6 md:px-12 bg-white/50 border-t border-b border-stone-200/40">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-left mb-8">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block mb-1">
              LOUNGE HIGHLIGHTS
            </span>
            <h2 className="font-serif text-3xl md:text-[2rem] font-light text-[#c5a253] uppercase leading-tight">
              CRAFTED FOR <span className="italic">EVERY MOOD</span>
            </h2>
          </div>

          {/* 4-column image cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOOD_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="relative h-80 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:-translate-y-0.5 transition-all duration-300"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 p-5 z-20 text-left">
                  <h3 className="text-white font-serif text-xs font-semibold tracking-wider uppercase leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-[10px] font-light leading-relaxed mt-1.5">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. BAR MENU PREVIEW (A Taste of Everything) ────────────────── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto text-left">
        <div className="mb-10">
          <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block mb-1">
            BAR MENU PREVIEW
          </span>
          <h2 className="font-serif text-3xl md:text-[2rem] font-light text-[#c5a253] uppercase leading-tight">
            A TASTE OF EVERYTHING
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuPreviewsList.map((card, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentPage('dining')}
              className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:-translate-y-0.5 transition-all duration-300"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 p-5 z-20 text-left">
                <h3 className="text-white font-serif text-sm font-semibold tracking-wider leading-tight">
                  {card.title}
                </h3>
                <p className="text-white/60 text-[10px] font-light leading-relaxed mt-1.5">
                  {card.desc}
                </p>
                <span className="inline-flex items-center text-[#c5a253] text-[10px] font-semibold mt-2 group-hover:underline">
                  Explore Menu <span className="ml-1">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. LOUNGE AMBIENCE / SECOND SECTION ──────────────────────── */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto text-left">
        <div className="mb-10">
          <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block mb-1">
            BAR MENU PREVIEW
          </span>
          <h2 className="font-serif text-3xl md:text-[2rem] font-light text-[#c5a253] uppercase leading-tight">
            A TASTE OF EVERYTHING
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {AMBIENCE_PREVIEWS.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={img}
                alt={`Lounge ambience ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. LOUNGE RESERVATION ───────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-[#f7f4eb] flex flex-col items-center">
        <div className="max-w-4xl w-full">

          {/* Screenshot specific header above reservation */}
          <div className="text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block mb-1">
              BAR MENU PREVIEW
            </span>
            <h2 className="font-serif text-3xl md:text-[2.2rem] font-light text-[#c5a253] uppercase leading-tight">
              A TASTE OF EVERYTHING
            </h2>
          </div>

          {/* Deep Dark Slate Container */}
          <div className="bg-[#181e2b] text-white rounded-2xl p-8 md:p-10 border border-white/5 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-2">FULL NAME</label>
                  <input
                    required type="text" placeholder="Enter Your Full Name"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#181e2b] border border-white/20 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#c5a253] placeholder-white/40"
                  />
                </div>
                {/* Phone Number */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-2">PHONE NUMBER</label>
                  <input
                    required type="tel" placeholder="+ 91 00000 00000"
                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181e2b] border border-white/20 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#c5a253] placeholder-white/40"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-2">EMAIL</label>
                <input
                  required type="email" placeholder="You@Example.Com"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#181e2b] border border-white/20 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#c5a253] placeholder-white/40"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-2">DATE</label>
                  <input
                    required type="date" value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#181e2b] border border-white/20 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#c5a253] uppercase"
                  />
                </div>
                {/* Time */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-2">TIME</label>
                  <input
                    required type="time" value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#181e2b] border border-white/20 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#c5a253]"
                  />
                </div>
                {/* Guests */}
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-2">GUESTS</label>
                  <select
                    value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#181e2b] border border-white/20 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#c5a253] appearance-none cursor-pointer"
                  >
                    {['2','1','3','4','5+'].map(g => <option key={g} className="bg-stone-900">{g}</option>)}
                  </select>
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-3">SEATING PREFERENCE</label>
                <div className="flex gap-4">
                  {['Indoor', 'Outdoor', 'Poolside'].map(pref => (
                    <button
                      key={pref} type="button"
                      onClick={() => setSeatingPreference(pref)}
                      className={`px-8 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                        seatingPreference === pref
                          ? 'bg-[#c5a253] text-[#181e2b]'
                          : 'bg-white text-[#181e2b]'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-2">OCCASION</label>
                <div className="relative">
                  <select
                    value={formData.occasion} onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-[#181e2b] border border-white/20 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#c5a253] appearance-none cursor-pointer"
                  >
                    {['Select Occasion','Birthday Gala','Anniversary','Romantic Night','Corporate Gathering'].map(o => (
                      <option key={o} className="bg-[#181e2b] text-white">{o}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/60">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              {/* Special Request */}
              <div>
                <label className="text-[10px] tracking-wider uppercase text-white/90 font-semibold block mb-2">SPECIAL REQUEST</label>
                <textarea
                  rows={6} placeholder="Ny Special Requirements Or Preference........."
                  value={formData.msg} onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  className="w-full bg-[#181e2b] border border-white/20 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#c5a253] placeholder-white/40 resize-none"
                />
              </div>

              {/* Functional Submit Button styled elegantly inside the card */}
              <button
                type="submit"
                className="w-full bg-[#c5a253] hover:bg-[#b08e43] text-[#181e2b] text-xs font-bold tracking-widest uppercase py-4 rounded-lg transition-all duration-200 active:scale-95 shadow-md"
              >
                Confirm Reservation
              </button>

            </form>
          </div>

          {/* Legal Notice Centered Box */}
          <div className="mt-8 border border-stone-200 rounded-xl p-5 bg-[#f5efe0]">
            <p className="text-stone-700 text-xs font-light text-center leading-relaxed max-w-2xl mx-auto font-serif">
              Alcoholic beverages are served only to guests of legal drinking age as per local regulations. Premium mocktails and non-alcoholic beverages are available for all guests.
            </p>
          </div>

        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
