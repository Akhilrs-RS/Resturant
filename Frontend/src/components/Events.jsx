import React, { useState } from 'react';
import { Mail, Calendar, Users, MapPin } from 'lucide-react';
import Footer from './Footer';
import heroBg from '../assets/i.png';

const WEDDINGS = [
  {
    name: 'Traditional Wedding',
    price: 'FROM $8000',
    bullets: ['Banquet Hall', 'Catering (200 pax)', 'Floral Decor', 'Photography']
  },
  {
    name: 'Destination Wedding',
    price: 'FROM $15000',
    bullets: ['Beachfront Ceremony', 'Guest Accommodation', 'Bridal Suite', 'Videography']
  },
  {
    name: 'Premium Wedding',
    price: 'FROM $22000',
    bullets: ['Grand Ballroom', 'Live Band & DJ', '5-course Dining', 'Full Planning']
  },
  {
    name: 'Luxury Wedding',
    price: 'FROM $35000',
    bullets: ['Private Venue Buyout', 'Celebrity Chef', 'Fireworks', 'Cinematography']
  }
];

const HALLS = [
  {
    name: 'Aurora Ballroom',
    capacity: '500 guests',
    features: 'LED walls - Stage - Full Ac'
  },
  {
    name: 'Sunset Ballroom',
    capacity: '500 guests',
    features: 'LED walls - Stage - Full Ac'
  },
  {
    name: 'Lagoon Banquet',
    capacity: '500 guests',
    features: 'LED walls - Stage - Full Ac'
  }
];

export default function Events({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    eventType: 'Wedding',
    date: '',
    guests: '',
    name: '',
    email: '',
    msg: ''
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    try {
      const response = await fetch('http://localhost:5210/api/inquiries/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventType: formData.eventType,
          guests: formData.guests + ' Guests',
          date: new Date(formData.date).toISOString(),
          fullName: formData.name,
          email: formData.email,
          message: formData.msg
        })
      });
      if (response.ok) {
        setInquirySubmitted(true);
      } else {
        alert("Quotation request failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend database server.");
    } finally {
      setInquiryLoading(false);
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
              Activities & Packages
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight">
              Adventure meets serenity
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-lg mt-2 leading-relaxed">
              From adrenaline to deep calm — curated experiences for every kind of traveller.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WEDDING PACKAGES */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
        <div className="space-y-3 mb-16">
          <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">Wedding Packages</span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-stone-950 leading-tight">
            Say 'I do' in paradise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WEDDINGS.map((wedding, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border border-stone-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] flex flex-col justify-between h-96 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-resort-gold text-lg">🌾</div>
                  <h3 className="font-serif text-lg font-normal text-stone-950">{wedding.name}</h3>
                  <span className="text-xs text-stone-400 font-sans tracking-wide block uppercase">{wedding.price}</span>
                </div>
                
                <ul className="space-y-2 text-stone-500 text-xs font-light">
                  {wedding.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-stone-300 rounded-full" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handleScrollTo('quote-section')}
                className="w-full bg-stone-50 hover:bg-stone-950 hover:text-white text-stone-600 border border-stone-200 font-bold py-3 rounded-md text-xs tracking-wider transition-all duration-300 uppercase mt-4"
              >
                Inquire
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VENUES SECTION (DARK BACKGROUND) */}
      <section className="py-24 bg-[#0a0f1d] px-6 md:px-12 text-white relative">
        <div className="max-w-7xl mx-auto text-left">
          
          <div className="space-y-3 mb-16">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">Venues</span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white leading-tight">
              Halls & conference spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HALLS.map((hall, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between h-56"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <span className="text-resort-gold">✦</span>
                    <h3 className="font-serif text-lg font-normal text-white">{hall.name}</h3>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="text-xs text-white/80 font-light">{hall.capacity}</div>
                    <div className="text-xs text-white/50 font-light">{hall.features}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. PLAN YOUR EVENT / QUOTATION FORM */}
      <section id="quote-section" className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-left">
        <div className="space-y-3 mb-12 text-left">
          <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">Get Started</span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-stone-955 leading-tight">
            Request a custom quotation
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 border border-stone-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] relative max-w-3xl mx-auto">
          {!inquirySubmitted ? (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Row 1: Event Type & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <select 
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 text-stone-700 cursor-pointer"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday Gala">Birthday Gala</option>
                    <option value="Corporate Seminar">Corporate Seminar</option>
                    <option value="Cocktail Reception">Cocktail Reception</option>
                  </select>
                </div>

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
              </div>

              {/* Row 2: Guests Count */}
              <div>
                <input 
                  required 
                  type="text" 
                  placeholder="Number of guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-700" 
                />
              </div>

              {/* Row 3: Name & Email */}
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              {/* Row 4: Message Box */}
              <div>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your dream event- catering , decoration, photography, entertainment..." 
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-750 resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={inquiryLoading}
                className="w-full bg-black text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-md hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 mt-4 active:scale-95 shadow-md flex items-center justify-center gap-3"
              >
                {inquiryLoading ? 'Submitting Request...' : 'Request Question'}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-6">
              <div className="w-16 h-16 rounded-full bg-resort-gold/15 border border-resort-gold/30 flex items-center justify-center text-resort-gold mb-6 animate-pulse">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <h4 className="font-serif text-2xl font-light text-stone-900 mb-2">Request Received</h4>
              <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. We have received your inquiry for a custom quotation and will email you at <strong>{formData.email}</strong> shortly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
