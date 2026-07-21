import React, { useState } from 'react';
import Footer from './Footer';

const HIGHLIGHTS = [
  {
    title: 'SIGNATURE COCKTAILS',
    desc: 'Handcrafted mixes prepared by expert mixologists.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'FRESH MOCKTAILS',
    desc: 'Refreshing non-alcoholic beverages crafted to sweet perfection.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'SUNSET LOUNGE SEATING',
    desc: 'Relax with ocean breeze, warm lighting, and a calm atmosphere.',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'PRIVATE CELEBRATIONS',
    desc: 'Perfect for birthdays, anniversaries, intimate nights, and private gatherings.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80'
  }
];

const MENU_CATEGORIES = [
  { title: 'Signature Cocktails', desc: 'Crafted mixes', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=300&q=80' },
  { title: 'Premium Mocktails', desc: 'Fresh fruits', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=300&q=80' },
  { title: 'Select Spirits', desc: 'Premium reserves', image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=300&q=80' },
  { title: 'Fine Wine List', desc: 'Selected local & imported', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80' },
  { title: 'Craft Beers', desc: 'Local drafts', image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=300&q=80' },
  { title: 'Fresh Juices', desc: 'Fresh tropical', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=300&q=80' },
  { title: 'Gourmet Bites', desc: 'Savory appetizers', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80' },
  { title: 'Sunset Desserts', desc: 'Sweet pastries', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80' }
];

const AMBIENCE_IMAGES = [
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80'
];

export default function Lounge({ handleScrollTo, setCurrentPage }) {
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: new Date(formData.date).toISOString(),
          time: formData.time,
          guests: parseInt(formData.guests) || 2,
          seatingPreference: seatingPreference,
          occasion: formData.occasion,
          specialRequest: formData.msg
        })
      });
      if (response.ok) {
        alert(`Lounge table reservation confirmed for ${formData.name}! Seating Preference: ${seatingPreference}, Date: ${formData.date}, Time: ${formData.time}, Guests: ${formData.guests}. See you at the lounge!`);
        setFormData({
          name: '',
          phone: '',
          email: '',
          date: '',
          time: '',
          guests: '2',
          occasion: 'Select Occasion',
          msg: ''
        });
      } else {
        alert("Lounge reservation failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend database server.");
    }
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[45vh] w-full flex items-end bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">
              BAR & LOUNGE
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Evenings Crafted with Elegance
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Relax in the ocean breeze and taste our curated, premium mocktails, tea infusions, craft beers, and a light luxury gourmet appetizer menu.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT LOUNGE */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">ABOUT THE LOUNGE</span>
            <h2 className="font-serif text-3xl md:text-[40px] font-light text-stone-900 leading-tight">
              A Refined Lounge <br /> Experience
            </h2>
            <p className="text-stone-600 text-xs md:text-sm font-light leading-relaxed">
              Enjoy A Refined Evening Experience In Our Resort Lounge, Where Warm Lighting, Ocean Breeze, Curated Beverages, Elegant Interiors, And Soft Music Come Together To Create The Perfect Place To Unwind.
            </p>
            
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60">
              <div>
                <p className="font-serif text-lg md:text-xl font-bold text-stone-900">12+</p>
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-1">Signature Cocktails</p>
              </div>
              <div>
                <p className="font-serif text-lg md:text-xl font-bold text-stone-900">8</p>
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-1">Menu Categories</p>
              </div>
              <div>
                <p className="font-serif text-lg md:text-xl font-bold text-stone-900">5 PM</p>
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-1">Opens Daily</p>
              </div>
            </div>

            {/* Opening Hours Box */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/40 shadow-[0_5px_15px_rgba(0,0,0,0.01)] inline-block">
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Opening Hours</span>
              <p className="text-sm font-semibold text-stone-800 mt-1">4:00 PM - 12:00 AM</p>
            </div>
          </div>

          {/* Right image column */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg shadow-stone-900/5">
              <img 
                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80" 
                alt="Luxury bar shelf background" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. CRAFTED FOR EVERY MOOD */}
      <section className="py-20 px-6 md:px-12 bg-white/40 border-t border-b border-stone-200/30">
        <div className="max-w-7xl mx-auto text-left space-y-12">
          
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">LOUNGE HIGHLIGHTS</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
              Crafted for <span className="italic font-normal">Every Mood</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item, idx) => (
              <div 
                key={idx}
                className="relative h-96 rounded-2xl overflow-hidden group shadow-md hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end text-left">
                  <h3 className="text-white font-serif text-sm font-semibold tracking-wider uppercase">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-[10px] font-light leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. BAR MENU PREVIEW GRID */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
        <div className="space-y-3 mb-16 text-center">
          <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">BAR MENU PREVIEW</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
            A Taste of <span className="italic font-normal">Everything</span>
          </h2>
          <div className="w-16 h-[1px] bg-resort-gold/60 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MENU_CATEGORIES.map((cat, idx) => (
            <div 
              key={idx}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end text-left">
                <h4 className="text-white font-serif text-sm font-medium leading-tight">
                  {cat.title}
                </h4>
                <p className="text-white/60 text-[9px] font-light tracking-wide mt-1.5 uppercase">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AMBIENCE CAROUSEL / GRID */}
      <section className="py-20 px-6 md:px-12 bg-white/40 border-t border-b border-stone-200/30 text-left max-w-7xl mx-auto rounded-3xl mb-24">
        <div className="space-y-3 mb-16 text-center">
          <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">LOUNGE AMBIENCE</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
            A Taste of <span className="italic font-normal">Everything</span>
          </h2>
          <div className="w-16 h-[1px] bg-resort-gold/60 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {AMBIENCE_IMAGES.map((img, idx) => (
            <div key={idx} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-md group cursor-pointer">
              <img 
                src={img} 
                alt="Resort lounge ambience" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 6. LOUNGE RESERVATION CARD */}
      <section className="py-24 px-6 md:px-12 bg-[#f7f4eb]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-3 text-center mb-12">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">BAR MENU PREVIEW</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
              A Taste of <span className="italic font-normal">Everything</span>
            </h2>
            <div className="w-16 h-[1px] bg-resort-gold/60 mx-auto pt-2" />
          </div>

          {/* Centered Slate-Blue Card */}
          <div className="bg-[#0c192d] text-white rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl max-w-4xl mx-auto text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-2">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Enter Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold placeholder-white/20" 
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-2">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold placeholder-white/20" 
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-2">Email</label>
                <input 
                  required 
                  type="email" 
                  placeholder="Your@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold placeholder-white/20" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-2">Date</label>
                  <input 
                    required 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold" 
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-2">Time</label>
                  <input 
                    required 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold" 
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-2">Guests</label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold appearance-none cursor-pointer"
                  >
                    <option className="bg-stone-900">1</option>
                    <option className="bg-stone-900">2</option>
                    <option className="bg-stone-900">3</option>
                    <option className="bg-stone-900">4</option>
                    <option className="bg-stone-900">5+</option>
                  </select>
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-3">Seating Preference</label>
                <div className="flex gap-4">
                  {['Indoor', 'Outdoor', 'Poolside'].map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setSeatingPreference(pref)}
                      className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                        seatingPreference === pref
                          ? 'bg-resort-gold border-resort-gold text-stone-950 shadow-md'
                          : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-2">Occasion</label>
                <select 
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold appearance-none cursor-pointer"
                >
                  <option className="bg-stone-900">Select Occasion</option>
                  <option className="bg-stone-900">Birthday Gala</option>
                  <option className="bg-stone-900">Anniversary</option>
                  <option className="bg-stone-900">Romantic Night</option>
                  <option className="bg-stone-900">Corporate Gathering</option>
                </select>
              </div>

              {/* Special Request */}
              <div>
                <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-2">Special Request</label>
                <textarea 
                  rows={4}
                  placeholder="Ny Special Requirements Or Preference ......."
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold placeholder-white/20 resize-none" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-stone-950 text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 mt-4 active:scale-95 shadow-md border border-white/10"
              >
                Confirm Reservation
              </button>
            </form>
          </div>

          {/* Legal Notice */}
          <div className="max-w-4xl mx-auto pt-6">
            <div className="border border-stone-200 rounded-2xl p-5 bg-white/40">
              <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed font-light text-center">
                Alcoholic beverages are served only to guests of legal drinking age as per local regulations. Premium mocktails and non-alcoholic beverages are available for all guests.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
