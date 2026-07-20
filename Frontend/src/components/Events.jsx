import React, { useState } from 'react';
import { Mail, Calendar, Users, MapPin } from 'lucide-react';
import Footer from './Footer';

const WEDDINGS = [
  {
    name: 'Traditional Wedding',
    price: 'From ₹2,40,000',
    desc: 'Beachside altar, standard floral setup, standard dinner buffet, and dedicated photographer.'
  },
  {
    name: 'Beachfront Wedding',
    price: 'From ₹3,20,000',
    desc: 'Sunset beach arch, premium floral walkway, 3-course seafood dinner, live violin duet, bridal suite.'
  },
  {
    name: 'Rainforest Wedding',
    price: 'From ₹2,80,000',
    desc: 'Jungle canopy canopy backdrop, rustic tree branch decor, organic gourmet buffet, drone shoot.'
  },
  {
    name: 'Luxury Wedding',
    price: 'From ₹4,50,000',
    desc: 'Exclusive resort deck buyout, custom theme design, lobster gala menu, video shoot, 2-night pool villa.'
  }
];

const HALLS = [
  {
    name: 'Grand Ballroom',
    capacity: '500 guests',
    size: '600 sq. meters',
    desc: 'Stately indoor hall with crystal chandeliers, private staging, and state-of-the-art acoustic sound.'
  },
  {
    name: 'Ocean Terrace',
    capacity: '150 guests',
    size: '250 sq. meters',
    desc: 'Stunning outdoor open deck facing the waves, perfect for cocktail parties and evening galas.'
  },
  {
    name: 'Lagoon Pavilion',
    capacity: '80 guests',
    size: '120 sq. meters',
    desc: 'Scenic overwater pavilion surrounded by calm waters, popular for seminars and private dinners.'
  }
];

export default function Events({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    eventType: 'Wedding Ceremony',
    guests: '100 guests',
    date: '',
    name: '',
    email: '',
    msg: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Quotation request sent successfully! We will contact you at ${formData.email} within 24 hours.`);
    setFormData({
      eventType: 'Wedding Ceremony',
      guests: '100 guests',
      date: '',
      name: '',
      email: '',
      msg: ''
    });
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[45vh] w-full flex items-end bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">
              WEDDINGS & EVENTS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Celebrate life's moments
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              From beachfront ceremonies to luxury corporate banquets.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WEDDING PACKAGES */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
        <div className="space-y-3 mb-16">
          <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">WEDDING PACKAGES</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
            Say 'I do' in paradise
          </h2>
          <div className="w-16 h-[1px] bg-resort-gold/60 pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEDDINGS.map((wedding, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200/40 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between h-80 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900">{wedding.name}</h3>
                  <span className="text-xs text-resort-gold font-sans font-bold block mt-1">{wedding.price}</span>
                </div>
                <p className="text-stone-500 text-[11px] font-light leading-relaxed">
                  {wedding.desc}
                </p>
              </div>

              <button 
                onClick={() => alert(`Inquiring about ${wedding.name}...`)}
                className="w-full bg-stone-950 hover:bg-resort-gold text-white hover:text-stone-950 font-bold py-2.5 rounded-xl text-xs tracking-wider transition-all duration-300 uppercase mt-4"
              >
                Inquire
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MEETING HALLS (DARK NAVY BACKGROUND) */}
      <section className="py-24 bg-[#050b16] px-6 md:px-12 text-white relative">
        <div className="max-w-7xl mx-auto text-left">
          
          <div className="space-y-3 mb-16">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">EVENT SPACES</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
              Halls & conference spaces
            </h2>
            <div className="w-16 h-[1px] bg-resort-gold/60 pt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HALLS.map((hall, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between h-80"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-lg font-light text-white">{hall.name}</h3>
                  </div>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                    {hall.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 space-y-2">
                  <div className="flex justify-between text-[11px] text-white/50">
                    <span>Capacity:</span>
                    <span className="text-resort-gold font-medium">{hall.capacity}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-white/50">
                    <span>Area:</span>
                    <span className="text-resort-gold font-medium">{hall.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. QUOTATION REQUEST */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-left">
        <div className="space-y-3 mb-12 text-center">
          <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">PLAN YOUR EVENT</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
            Request a custom quotation
          </h2>
          <div className="w-16 h-[1px] bg-resort-gold/60 mx-auto pt-2" />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200/40 shadow-[0_10px_35px_rgba(0,0,0,0.02)] relative max-w-2xl mx-auto">
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Event Type */}
              <div>
                <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Event Type</label>
                <select 
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700 appearance-none cursor-pointer"
                >
                  <option>Wedding Ceremony</option>
                  <option>Birthday Gala</option>
                  <option>Corporate Seminar</option>
                  <option>Cocktail Reception</option>
                </select>
              </div>

              {/* Guest Count */}
              <div>
                <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Guests count</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700 appearance-none cursor-pointer"
                >
                  <option>50 guests</option>
                  <option>100 guests</option>
                  <option>200 guests</option>
                  <option>500 guests</option>
                </select>
              </div>
            </div>

            {/* Date Input */}
            <div>
              <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Select Date</label>
              <input 
                required 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700" 
              />
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

            {/* Message Box */}
            <div>
              <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Special Requests</label>
              <textarea 
                rows={4}
                placeholder="Tell us about your event catering, theme decorations, etc..." 
                value={formData.msg}
                onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors placeholder-stone-400 resize-none" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-stone-950 text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 mt-4 active:scale-95 shadow-md"
            >
              Request Quotation
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
