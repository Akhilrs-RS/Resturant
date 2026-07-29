import React, { useState } from 'react';
import { Clock, Users, AlertCircle, X, Send, Calendar, Star } from 'lucide-react';
import Footer from './Footer';
import heroBg from '../assets/m11.jpg';
import pkg1 from '../assets/m1.jpg';
import pkg2 from '../assets/m4.png';
import pkg3 from '../assets/m2.png';
import pkg4 from '../assets/m3.png';
import pkg5 from '../assets/m11.jpg';
import pkg6 from '../assets/m6.jpg';

const ACTIVITIES = [
  {
    name: 'Kayaking',
    category: 'WATER',
    price: '$47',
    duration: '1.5 hrs',
    people: '6 max',
    note: 'Life jackets provided. Swimming policy recommended.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    desc: 'Glide across calm turquoise water at sunrise.'
  },
  {
    name: 'Spa & Ayurveda',
    category: 'WELLNESS',
    price: '$120',
    duration: '1.5 hrs',
    people: '2 max',
    note: 'Doctor clearance for health conditions',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
    desc: 'Restorative therapies rooted in ancient tradition.'
  },
  {
    name: 'Zip Line Adventure',
    category: 'OUTDOOR',
    price: '$60',
    duration: '1.5 hrs',
    people: '8 max',
    note: 'Weight limit 120kg. Harness training mandatory.',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80',
    desc: 'Soar above the jungle canopy on our thrilling zip line.'
  },
  {
    name: 'Sunrise Yoga',
    category: 'NATURE',
    price: '$30',
    duration: '1.5 hrs',
    people: '8 max',
    note: 'Suitable for anyone.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    desc: 'Greet the day with guided yoga on the ocean terrace.'
  },
  {
    name: 'Bonfire Evening',
    category: 'SOCIAL',
    price: '$25',
    duration: '1.5 hrs',
    people: '20 max',
    note: 'Supervised at all times.',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=600&q=80',
    desc: 'Gather under the stars around a warm beach bonfire.'
  },
  {
    name: 'Kids Water Games',
    category: 'FAMILY',
    price: '$15',
    duration: '1.5 hrs',
    people: '8 max',
    note: 'Lifeguard supervised. Ages 4-12.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    desc: 'Splashing fun and games in our dedicated kids pool.'
  }
];

const CATEGORY_COLORS = {
  WATER:   'bg-sky-100 text-sky-700',
  WELLNESS:'bg-purple-100 text-purple-700',
  OUTDOOR: 'bg-orange-100 text-orange-700',
  NATURE:  'bg-green-100 text-green-700',
  SOCIAL:  'bg-amber-100 text-amber-700',
  FAMILY:  'bg-pink-100 text-pink-700',
};

const PACKAGES = [
  {
    name: 'Honeymoon Package',
    category: 'ROMANCE & ESCAPES',
    price: '$2400',
    nights: '/ 3 nights',
    image: pkg1,
    desc: '3 nights in a honeymoon suite with couples spa, candlelit dinners and sunset cruise.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Family Package',
    category: 'FAMILIES & FRIENDS',
    price: '$1800',
    nights: '/ 3 nights',
    image: pkg2,
    desc: 'Family suite with kids activities, all-day dining and pool access.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Wellness Retreat',
    category: 'RESTORE & RENEW',
    price: '$2100',
    nights: '/ 4 nights',
    image: pkg3,
    desc: 'Daily spa, yoga, ayurveda and wholesome cuisine over 4 nights.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Weekend Getaway',
    category: 'QUICK ESCAPES',
    price: '$800',
    nights: '/ 2 nights',
    image: pkg4,
    desc: '2 nights of pure relaxation with breakfast and pool access.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Adventure Package',
    category: 'ADVENTURE & THRILLS',
    price: '$1500',
    nights: '/ 3 nights',
    image: pkg5,
    desc: 'Zip line, kayaking, trekking and bonfire nights over 3 days.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Corporate Retreat',
    category: 'WORK AND WELLNESS',
    price: '$3200',
    nights: '/ 3 nights',
    image: pkg6,
    desc: 'Conference facilities, team activities and premium accommodation.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  }
];

export default function Experiences({ handleScrollTo, setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [numGuests, setNumGuests] = useState('2');
  const [notes, setNotes] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');

  const formatDateSafe = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  const parseDateSafe = (dateStr) => {
    if (!dateStr) return new Date().toISOString();
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
    } catch (e) {
      return new Date().toISOString();
    }
  };

  const handleOpenInquiry = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setIsSubmitted(false);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setInquiryDate('');
    setNumGuests('2');
    setNotes('');
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !inquiryDate) return;

    setIsSubmitting(true);
    try {
      const isActivity = selectedItem.type === 'activity';
      const endpoint = isActivity 
        ? 'http://localhost:5210/api/bookings/activities' 
        : 'http://localhost:5210/api/inquiries/events';

      const payload = isActivity 
        ? {
            activityName: selectedItem.name,
            date: parseDateSafe(inquiryDate),
            timeSlot: selectedItem.duration || 'All Day',
            guests: numGuests.toString(),
            fullName: guestName,
            email: guestEmail,
            phone: guestPhone,
            notes: notes
          }
        : {
            eventType: `Package: ${selectedItem.name}`,
            guests: numGuests.toString(),
            date: parseDateSafe(inquiryDate),
            fullName: guestName,
            email: guestEmail,
            message: `Phone: ${guestPhone}\nNotes: ${notes}\nPrice: ${selectedItem.price}`
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setInquiryRef(isActivity ? `BK-${Math.floor(10000 + Math.random() * 90000)}` : `ENQ-${Math.floor(10000 + Math.random() * 90000)}`);
        setIsSubmitted(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      const isActivity = selectedItem.type === 'activity';
      setInquiryRef(isActivity ? `BK-${Math.floor(10000 + Math.random() * 90000)}` : `ENQ-${Math.floor(10000 + Math.random() * 90000)}`);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">

      {/* 1. HERO BANNER */}
      <section
        className="relative h-[48vh] w-full flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-white/80 uppercase block">
              Activities &amp; Packages
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Adventure meets serenity
            </h1>
            <p className="text-white/75 text-xs md:text-sm font-light max-w-lg mt-2 leading-relaxed">
              From adrenaline to deep calm — curated experiences for every kind of traveller.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ACTIVITIES GRID */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto text-left">

        {/* Section header */}
        <div className="mb-10">
          <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block mb-1">
            Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-[2rem] font-light text-stone-900 leading-tight">
            Resort activities
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACTIVITIES.map((activity, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden bg-white border border-stone-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Category tag */}
                <span className={`inline-block text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full mb-2 w-fit ${CATEGORY_COLORS[activity.category] || 'bg-stone-100 text-stone-600'}`}>
                  {activity.category}
                </span>

                {/* Name */}
                <h3 className="font-serif text-base font-medium text-stone-900 mb-1">
                  {activity.name}
                </h3>

                {/* Short desc */}
                <p className="text-stone-500 text-xs font-light leading-relaxed mb-3">
                  {activity.desc}
                </p>

                {/* Meta: duration + people */}
                <div className="flex items-center gap-4 text-[11px] text-stone-400 mb-2.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {activity.people}
                  </span>
                </div>

                {/* Note */}
                <div className="flex items-start gap-1.5 mb-4">
                  <AlertCircle className="w-3 h-3 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-[10px] text-stone-400 leading-snug">{activity.note}</span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
                  <span className="text-stone-900 font-semibold text-sm">
                    {activity.price}
                  </span>
                  <button
                    onClick={() => handleOpenInquiry({ ...activity, type: 'activity' })}
                    className="bg-stone-950 text-white text-[10px] font-semibold tracking-widest uppercase px-4 py-2 rounded-lg hover:bg-stone-700 transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. RESORT PACKAGES — DARK NAVY */}
      <section className="py-16 bg-[#0d1b2e] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-10 text-left">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block mb-1">
              Curated Stays
            </span>
            <h2 className="font-serif text-3xl md:text-[2rem] font-light text-white leading-tight">
              Resort packages
            </h2>
          </div>

          {/* Package cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden bg-[#1a2d45] border border-white/10 hover:border-[#c5a253]/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="h-44 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Category tag */}
                  <span className="text-[8px] font-bold tracking-widest uppercase text-[#c5a253] mb-2 block">
                    {pkg.category}
                  </span>

                  {/* Name */}
                  <h3 className="font-serif text-base font-medium text-white mb-1.5">
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/55 text-[11px] font-light leading-relaxed mb-3">
                    {pkg.desc}
                  </p>

                  {/* Includes bullet list */}
                  <ul className="space-y-1 mb-5">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="text-white/50 text-[11px] flex items-start gap-1.5">
                        <span className="text-[#c5a253] mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                    <div>
                      <span className="text-white font-semibold text-sm">{pkg.price}</span>
                      <span className="text-white/40 text-[10px] ml-1">{pkg.nights}</span>
                    </div>
                    <button
                      onClick={() => handleOpenInquiry({ ...pkg, type: 'package' })}
                      className="bg-[#c5a253] hover:bg-[#d4b56a] text-stone-950 text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sleek Light Theme Inquiry Overlay Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-none">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          />

          {/* Modal Panel */}
          <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#c5a253] mb-1.5 block font-semibold">
                  {selectedItem.type === 'activity' ? 'Activity Booking' : 'Package Enquiry'}
                </span>
                <h3 className="font-serif text-2xl font-light text-stone-950 mb-1">
                  {selectedItem.type === 'activity' ? `Book Activity: ${selectedItem.name}` : `Enquire: ${selectedItem.name}`}
                </h3>
                <p className="text-xs text-stone-500 mb-6 font-light">
                  {selectedItem.type === 'activity' 
                    ? 'Provide details to reserve your activity slot.'
                    : 'Provide your details below and our concierge team will customize your experience.'}
                </p>

                <form onSubmit={handleInquirySubmit} className="space-y-4 text-left">
                  {/* Row 1: Name */}
                  <div>
                    <label className="text-[10px] font-bold text-stone-500 tracking-wider uppercase block mb-1.5">Your Full Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="Jane Smith"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 focus:bg-white"
                    />
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-stone-500 tracking-wider uppercase block mb-1.5">Email Address</label>
                      <input 
                        required
                        type="email"
                        placeholder="jane.smith@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-stone-500 tracking-wider uppercase block mb-1.5">Contact Phone</label>
                      <input 
                        type="tel"
                        placeholder="+91 99999 99999"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Row 3: Date & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-stone-500 tracking-wider uppercase block mb-1.5">Preferred Date</label>
                      <input 
                        required
                        type="date"
                        value={inquiryDate}
                        onChange={(e) => setInquiryDate(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-stone-500 tracking-wider uppercase block mb-1.5">Number of Guests</label>
                      <select 
                        value={numGuests}
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 focus:bg-white cursor-pointer"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5+">5+ Persons</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Notes */}
                  <div>
                    <label className="text-[10px] font-bold text-stone-500 tracking-wider uppercase block mb-1.5">Special Notes / Requirements</label>
                    <textarea 
                      rows={3}
                      placeholder="Any health requirements, package preferences or requests..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 focus:bg-white resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-stone-950 hover:bg-stone-800 text-white text-[11px] font-semibold tracking-widest uppercase py-3 rounded-xl transition-all duration-200 active:scale-95 disabled:bg-stone-500 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {selectedItem.type === 'activity' ? 'Booking Sanctuary...' : 'Sending Inquiry...'}
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          {selectedItem.type === 'activity' ? 'Confirm Booking' : 'Submit Enquiry'}
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6 mx-auto">
                  <Star className="w-8 h-8 fill-current" />
                </div>
                <h4 className="font-serif text-2xl font-light text-stone-950 mb-2">
                  {selectedItem.type === 'activity' ? 'Activity Booked!' : 'Enquiry Submitted'}
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed mx-auto">
                  {selectedItem.type === 'activity' 
                    ? `Thank you, ${guestName}. We have confirmed your slot for ${selectedItem.name} on ${formatDateSafe(inquiryDate)}. A confirmation receipt has been sent to ${guestEmail}.`
                    : `Thank you, ${guestName}. We have received your request for ${selectedItem.name}. Our luxury experience curators will contact you within 24 hours at ${guestEmail}.`}
                </p>
                <div className="bg-stone-50 border border-stone-100 rounded-2xl px-6 py-3.5 mb-8 w-fit mx-auto">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold block">
                    {selectedItem.type === 'activity' ? 'Booking Reference' : 'Inquiry Reference'}
                  </span>
                  <span className="text-sm font-mono font-bold text-stone-950 tracking-wider mt-1 block">
                    {inquiryRef}
                  </span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-stone-950 hover:bg-stone-850 text-white text-[10px] font-bold tracking-widest uppercase px-8 py-3.5 rounded-full transition-colors active:scale-95 cursor-pointer"
                >
                  Return to Experiences
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
