import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Users, Mail, User, ShieldCheck } from 'lucide-react';
import Footer from './Footer';
import heroBg from '../assets/m8.jpg';

const MENU_ITEMS = [
  {
    name: 'Charred Ocean Catch',
    price: '$34',
    desc: 'Line-caught fish, citrus beurre blanc'
  },
  {
    name: 'Forest Truffle Risotto',
    price: '$28',
    desc: 'Wild mushroom, aged parmesan'
  },
  {
    name: 'Coconut Lemongrass Curry',
    price: '$24',
    desc: 'Garden vegetables, jasmine rice'
  },
  {
    name: 'Golden Hour Tasting',
    price: '$95',
    desc: "Seven-course chef's journey"
  }
];

export default function Dining({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    guests: '2',
    location: 'Indoor',
    occasion: 'none',
    mealSlot: 'Dinner',
    name: '',
    email: ''
  });
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [reservationRef, setReservationRef] = useState('');

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setReservationLoading(true);
    try {
      const response = await fetch('http://localhost:5210/api/reservations/tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: new Date(formData.date).toISOString(),
          time: formData.time,
          guests: formData.guests + ' Guests',
          fullName: formData.name,
          email: formData.email
        })
      });
      if (response.ok) {
        setReservationRef(`DINE-${Math.floor(100000 + Math.random() * 900000)}`);
        setReservationSubmitted(true);
      } else {
        alert("Table reservation failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend database server.");
    } finally {
      setReservationLoading(false);
    }
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
              Dining
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight">
              Culinary journeys at sunset
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-lg mt-2 leading-relaxed">
              Ocean-to-table cuisine across three signature venues.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MENU & RESERVATION GRID */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Chef Specials Menu List */}
          <div className="lg:col-span-6 space-y-10 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">THE MENU</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-955 leading-tight">
                A taste of the horizon
              </h2>
            </div>

            <div className="pt-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-resort-gold uppercase block mb-8 border-b border-stone-200/50 pb-2">Today Special</span>
              
              <div className="space-y-8">
                {MENU_ITEMS.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-end justify-between gap-4 font-serif">
                      <span className="text-stone-950 font-normal text-base md:text-lg whitespace-nowrap">
                        {item.name}
                      </span>
                      {/* Dotted Leader Line */}
                      <div className="border-b border-dotted border-stone-300 flex-grow mb-1.5 min-w-[20px]" />
                      <span className="text-stone-950 font-semibold text-base md:text-lg whitespace-nowrap">
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
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-stone-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] relative text-left">
              {!reservationSubmitted ? (
                <>
                  <h3 className="font-serif text-xl font-normal text-stone-955 mb-8 flex items-center gap-2.5">
                    <span className="text-resort-gold">✖</span> Reserve a Table
                  </h3>
                  
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    
                    {/* Row 1: Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="relative border border-stone-200 rounded-xl px-4 py-3 bg-stone-50/50 flex items-center justify-between">
                          <input 
                            required 
                            type="date" 
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="bg-transparent text-stone-700 text-xs outline-none w-full border-none p-0 focus:ring-0 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="relative border border-stone-200 rounded-xl px-4 py-3 bg-stone-50/50 flex items-center justify-between">
                          <input 
                            required 
                            type="time" 
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="bg-transparent text-stone-700 text-xs outline-none w-full border-none p-0 focus:ring-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Guests & Area */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <select 
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 text-stone-700 cursor-pointer"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5+">5+ Guests</option>
                        </select>
                      </div>

                      <div>
                        <select 
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 text-stone-700 cursor-pointer"
                        >
                          <option value="Indoor">Indoor</option>
                          <option value="Outdoor">Outdoor</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Occasion & Time Slot */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <select 
                          value={formData.occasion}
                          onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                          className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 text-stone-700 cursor-pointer"
                        >
                          <option value="none">none</option>
                          <option value="Birthday">Birthday</option>
                          <option value="Anniversary">Anniversary</option>
                          <option value="Business">Business</option>
                        </select>
                      </div>

                      <div>
                        <select 
                          value={formData.mealSlot}
                          onChange={(e) => setFormData({ ...formData, mealSlot: e.target.value })}
                          className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 text-stone-700 cursor-pointer"
                        >
                          <option value="Breakfast">Breakfast</option>
                          <option value="Lunch">Lunch</option>
                          <option value="Dinner">Dinner</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Full Name */}
                    <div>
                      <input 
                        required 
                        type="text" 
                        placeholder="Full name" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-700" 
                      />
                    </div>

                    {/* Row 5: Email */}
                    <div>
                      <input 
                        required 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-700" 
                      />
                    </div>

                    {/* Notice Checkbox / Text */}
                    <div className="flex items-center gap-2 pt-2 text-[11px] text-stone-500 font-medium">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Tables available at your selected time</span>
                    </div>

                    <button 
                      type="submit" 
                      disabled={reservationLoading}
                      className="w-full bg-black text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-md hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 mt-6 active:scale-95 shadow-md flex items-center justify-center gap-3"
                    >
                      {reservationLoading ? (
                        <>
                          <svg className="animate-spin h-4.5 w-4.5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Securing Table...
                        </>
                      ) : (
                        'Confirm Reservation'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-resort-gold/15 border border-resort-gold/30 flex items-center justify-center text-resort-gold mb-6 animate-pulse">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-2xl font-light text-stone-900 mb-2">Table Reserved</h4>
                  <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. We have secured your table reservation for <strong>{formData.guests} Guests</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
                  </p>
                  <div className="bg-stone-50 border border-stone-200/60 rounded-xl px-6 py-3.5 mb-8 w-full text-center">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Reservation Reference</span>
                    <span className="font-mono text-base font-bold text-stone-800 tracking-wider mt-1 block uppercase">{reservationRef}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setReservationSubmitted(false);
                      setFormData({
                        date: '',
                        time: '19:00',
                        guests: '2',
                        location: 'Indoor',
                        occasion: 'none',
                        mealSlot: 'Dinner',
                        name: '',
                        email: ''
                      });
                    }}
                    className="w-full bg-stone-950 text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 active:scale-95 shadow-md"
                  >
                    Book Another Table
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
