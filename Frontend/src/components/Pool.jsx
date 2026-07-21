import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Footer from './Footer';

const POOL_PACKAGES = [
  {
    name: 'Hour Pass',
    price: '₹240',
    desc: '1 hour access to the infinity pool, fresh towel service, and complimentary mineral water.'
  },
  {
    name: 'Day Pass',
    price: '₹480',
    desc: 'Full day access to all pool zones, sun lounger reservation, and a signature mocktail.'
  },
  {
    name: 'Cabana Reserve',
    price: '₹720',
    desc: 'Private oceanfront cabana for 4 hours, seasonal fruit platter, and dedicated steward service.'
  },
  {
    name: 'Sunset Pool Party',
    price: '₹960',
    desc: 'Exclusive entry to our weekend sunset DJ session, signature cocktails, and premium barbecue platter.'
  }
];

export default function Pool({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    pkg: 'Hour Pass',
    date: '',
    timeSlot: 'Morning 08:00 - 12:00',
    name: '',
    email: ''
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5210/api/reservations/pools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          package: formData.pkg,
          date: new Date(formData.date).toISOString(),
          timeSlot: formData.timeSlot,
          fullName: formData.name,
          email: formData.email
        })
      });
      if (response.ok) {
        alert(`Pool access booked! package: ${formData.pkg} on ${formData.date} during slot: ${formData.timeSlot}. Enjoy the water!`);
        setFormData({
          pkg: 'Hour Pass',
          date: '',
          timeSlot: 'Morning 08:00 - 12:00',
          name: '',
          email: ''
        });
      } else {
        alert("Pool booking failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend database server.");
    }
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
              THE POOL
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Where water meets the sky
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Reserve your slot at our infinity pools and private cabanas.
            </p>
          </div>
        </div>
      </section>

      {/* 2. GRID DETAILS */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Packages list */}
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">PACKAGES</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
                Choose your escape
              </h2>
              <div className="w-16 h-[1px] bg-resort-gold/60 pt-2" />
            </div>

            <div className="space-y-8 pt-4">
              {POOL_PACKAGES.map((item, idx) => (
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

          {/* Right Side: Booking Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-stone-200/40 shadow-[0_10px_35px_rgba(0,0,0,0.02)] relative text-left">
              <h3 className="font-serif text-xl font-light text-stone-900 mb-6">
                Book pool access
              </h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Select Package */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Select package</label>
                  <select 
                    value={formData.pkg}
                    onChange={(e) => setFormData({ ...formData, pkg: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700 appearance-none cursor-pointer"
                  >
                    <option>Hour Pass</option>
                    <option>Day Pass</option>
                    <option>Cabana Reserve</option>
                    <option>Sunset Pool Party</option>
                  </select>
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

                {/* Select Slot */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Select time slot</label>
                  <select 
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700 appearance-none cursor-pointer"
                  >
                    <option>Morning 08:00 - 12:00</option>
                    <option>Afternoon 12:00 - 16:00</option>
                    <option>Sunset 16:00 - 20:00</option>
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
                  Book Pool Access
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
