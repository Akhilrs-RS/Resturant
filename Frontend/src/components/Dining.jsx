import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Users, Mail, User } from 'lucide-react';
import Footer from './Footer';

const MENU_ITEMS = [
  {
    name: 'Cherish Pizza Catch',
    price: '₹34',
    desc: 'Fresh local seafood, thin crust marinara, fresh basil and virgin olive oil.'
  },
  {
    name: 'Fresh Truffle Entree',
    price: '₹48',
    desc: 'Wild organic forest mushrooms, hand-cut egg tagliatelle pasta, white truffle oil.'
  },
  {
    name: 'Coconut Mousse on Pastry',
    price: '₹24',
    desc: 'Light tropical whipped mousse, caramelized ginger, fresh passion fruit glaze.'
  },
  {
    name: 'Spiced Fruit Tea Cup',
    price: '₹12',
    desc: 'Infused island herbs, sun-dried organic berries, sweetened with forest sunset honey.'
  }
];

export default function Dining({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2 Guests',
    name: '',
    email: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Table reservation confirmed for ${formData.name} on ${formData.date} at ${formData.time} for ${formData.guests}. We look forward to hosting you!`);
    setFormData({
      date: '',
      time: '',
      guests: '2 Guests',
      name: '',
      email: ''
    });
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
              DINING
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Culinary journeys at sunset
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Ocean-to-table cuisine crafted by award-winning chefs across three signature restaurants.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MENU & RESERVATION GRID */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Chef Specials Menu List */}
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">THE MENU</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
                A taste of the horizon
              </h2>
              <div className="w-16 h-[1px] bg-resort-gold/60 pt-2" />
            </div>

            <div className="pt-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-resort-gold uppercase block mb-8">Today Special</span>
              
              <div className="space-y-8">
                {MENU_ITEMS.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-end justify-between gap-4 font-serif">
                      <span className="text-stone-900 font-medium text-base md:text-lg whitespace-nowrap">
                        {item.name}
                      </span>
                      {/* Dotted Leader Line */}
                      <div className="border-b border-dotted border-stone-300 flex-grow mb-1.5 min-w-[20px]" />
                      <span className="text-stone-900 font-semibold text-base md:text-lg whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Reserve A Table Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-stone-200/40 shadow-[0_10px_35px_rgba(0,0,0,0.02)] relative text-left">
              <h3 className="font-serif text-xl font-light text-stone-900 mb-6 flex items-center gap-2">
                Reserve a Table
              </h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Date Input */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Select Date</label>
                  <div className="relative">
                    <input 
                      required 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700" 
                    />
                  </div>
                </div>

                {/* Time Input */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Select Time</label>
                  <div className="relative">
                    <input 
                      required 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700" 
                    />
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Guests count</label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700 appearance-none cursor-pointer"
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                </div>

                {/* Full Name */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors placeholder-stone-400" 
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors placeholder-stone-400" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-stone-950 text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 mt-4 active:scale-95 shadow-md"
                >
                  Confirm Reservation
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
