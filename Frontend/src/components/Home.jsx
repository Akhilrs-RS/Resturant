import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import { 
  Calendar, 
  Users, 
  X, 
  Phone, 
  Mail, 
  Compass, 
  Utensils, 
  BedDouble, 
  Star,
  Clock,
  ArrowRight,
  MapPin,
  Check
} from 'lucide-react';

const IMAGES = {
  bg: '/1.png',
  villaOasis: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  villaOverwater: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
  villaPenthouse: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  diningBeach: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
  spaRelax: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  yachtCharter: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80'
};

const SUITES = [
  {
    id: 'oasis',
    name: 'Ocean-Front Oasis Villa',
    price: 45000,
    size: '140 m²',
    guests: '2 Adults',
    view: 'Panoramic Beach View',
    image: IMAGES.villaOasis,
    features: ['Private Infinity Pool', 'Direct Beach Access', 'Outdoor Rain Shower']
  },
  {
    id: 'overwater',
    name: 'Thabasiya Overwater Bungalow',
    price: 65000,
    size: '185 m²',
    guests: '3 Adults',
    view: 'Deep Sea Lagoon View',
    image: IMAGES.villaOverwater,
    features: ['Lagoon Access Deck', 'Glass Ocean-floor Panel', 'Sunken Lounge']
  },
  {
    id: 'penthouse',
    name: 'The Royal Penthouse Suite',
    price: 120000,
    size: '420 m²',
    guests: '6 Adults',
    view: '360° Ocean & Island View',
    image: IMAGES.villaPenthouse,
    features: ['Personal Butler 24/7', 'Private Helipad Access', 'Chef\'s Kitchen & Cellar']
  }
];

export default function Home({ 
  handleScrollTo, 
  handleOpenBooking, 
  bookingOpen, 
  setBookingOpen, 
  selectedSuiteId, 
  setSelectedSuiteId,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests
}) {
  // Booking Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !checkIn || !checkOut) return;

    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setBookingSubmitted(true);
      setBookingRef(`TBS-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1800);
  };

  // Pricing calculator
  const calculateTotal = () => {
    const suite = SUITES.find(s => s.id === selectedSuiteId);
    if (!suite || !checkIn || !checkOut) return 0;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const subtotal = suite.price * diffDays;
    const tax = subtotal * 0.12; // 12% Luxury Tax
    return {
      days: diffDays,
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const costDetails = calculateTotal();

  return (
    <div>
      {/* 1. HERO FOLD (EXACT MATCH FOR FIGMA SCREENSHOT) */}
      <section 
        id="home" 
        className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.bg})` }}
      >
        {/* Sky gradient down */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/85 via-black/35 to-transparent pointer-events-none z-10" />
        {/* Ocean gradient up */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-resort-dark via-black/25 to-transparent pointer-events-none z-10" />
        
        {/* Dummy spacer to match flex layout */}
        <div className="h-24"></div>

        {/* Hero Central Title */}
        <div className="flex flex-col items-center justify-center px-4 relative z-20 text-center select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif tracking-[0.18em] text-[8.5vw] md:text-[9.5vw] font-light text-white leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] uppercase">
              THABASIYA
            </h1>
          </motion.div>

          {/* Discover More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-10"
          >
            <button 
              onClick={() => handleScrollTo('about')}
              className="bg-black/35 backdrop-blur-[4px] border border-white/60 text-white hover:bg-white hover:text-stone-950 font-sans text-[10px] md:text-[11px] font-bold tracking-[0.25em] px-9 py-4 rounded-full shadow-lg shadow-black/10 hover:shadow-white/5 active:scale-95 transition-all duration-500 uppercase"
            >
              DISCOVER MORE
            </button>
          </motion.div>
        </div>

        {/* Interactive Booking Bar (Matches Figma Screenshot exactly) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto px-6 relative z-30"
        >
          <div className="glass-panel rounded-2xl border border-white/10 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:gap-6 md:divide-x divide-white/10 shadow-2xl">
            
            {/* Check In */}
            <div className="flex items-center gap-3.5 pl-2 py-2 sm:py-0">
              <Calendar className="w-5 h-5 text-resort-gold flex-shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[9px] tracking-wider uppercase text-white/50 font-bold">CHECK IN</span>
                <input 
                  type="date" 
                  className="bg-transparent text-white text-xs outline-none cursor-pointer w-full mt-1 border-none p-0 focus:ring-0" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex items-center gap-3.5 pl-2 md:pl-6 py-2 sm:py-0">
              <Calendar className="w-5 h-5 text-resort-gold flex-shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[9px] tracking-wider uppercase text-white/50 font-bold">CHECK OUT</span>
                <input 
                  type="date" 
                  className="bg-transparent text-white text-xs outline-none cursor-pointer w-full mt-1 border-none p-0 focus:ring-0" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3.5 pl-2 md:pl-6 py-2 sm:py-0">
              <Users className="w-5 h-5 text-resort-gold flex-shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[9px] tracking-wider uppercase text-white/50 font-bold">GUESTS</span>
                <select 
                  className="bg-transparent text-white text-xs outline-none cursor-pointer w-full mt-1 border-none p-0 focus:ring-0" 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="1" className="bg-resort-navy text-white text-xs">1 GUEST</option>
                  <option value="2" className="bg-resort-navy text-white text-xs">2 GUESTS</option>
                  <option value="3" className="bg-resort-navy text-white text-xs">3 GUESTS</option>
                  <option value="4" className="bg-resort-navy text-white text-xs">4 GUESTS</option>
                  <option value="6" className="bg-resort-navy text-white text-xs">6 GUESTS</option>
                </select>
              </div>
            </div>

            {/* Room Type */}
            <div className="flex items-center gap-3.5 pl-2 md:pl-6 py-2 sm:py-0">
              <BedDouble className="w-5 h-5 text-resort-gold flex-shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[9px] tracking-wider uppercase text-white/50 font-bold">ROOM TYPE</span>
                <select 
                  className="bg-transparent text-white text-xs outline-none cursor-pointer w-full mt-1 border-none p-0 focus:ring-0" 
                  value={selectedSuiteId}
                  onChange={(e) => setSelectedSuiteId(e.target.value)}
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="any" className="bg-resort-navy text-white text-xs">ANY ROOM</option>
                  <option value="oasis" className="bg-resort-navy text-white text-xs">OCEAN OASIS VILLA</option>
                  <option value="overwater" className="bg-resort-navy text-white text-xs">OVERWATER BUNGALOW</option>
                  <option value="penthouse" className="bg-resort-navy text-white text-xs">ROYAL PENTHOUSE</option>
                </select>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div 
          onClick={() => handleScrollTo('accommodation')}
          className="w-full flex justify-center pb-8 relative z-20 cursor-pointer text-white/50 hover:text-resort-gold transition-colors duration-300"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[8px] font-sans tracking-[0.3em] uppercase">Scroll Down</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-1/2 bg-resort-gold absolute top-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROOMS & SUITES SECTION */}
      <section id="accommodation" className="py-24 md:py-32 bg-[#f7f4eb] px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-2xl mb-16 text-left">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">ROOMS & SUITES</span>
            <h2 className="font-serif text-3xl md:text-[40px] font-light text-stone-900 mt-3 leading-tight">
              Rest In Refined Comfort
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'honeymoon',
                name: 'Honeymoon Ocean Suite',
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
                price: '$720',
                desc: 'A Romantic Sanctuary With A Private Plunge Pool And Uninterrupted Ocean Vistas.'
              },
              {
                id: 'villa',
                name: 'Private Pool Villa',
                image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
                price: '$890',
                desc: 'A Romantic Sanctuary With A Private Plunge Pool And Uninterrupted Ocean Vistas.'
              },
              {
                id: 'premium',
                name: 'Ocean Premium Room',
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
                price: '$340',
                desc: 'A Romantic Sanctuary With A Private Plunge Pool And Uninterrupted Ocean Vistas.'
              }
            ].map((suite) => (
              <div 
                key={suite.id}
                className="rounded-2xl overflow-hidden bg-white border border-stone-200/40 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(196,155,85,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col group"
              >
                {/* Image */}
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={suite.image} 
                    alt={suite.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-resort-gold transition-colors duration-300">
                      {suite.name}
                    </h3>
                    <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed">
                      {suite.desc}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-4 text-[10px] text-stone-400 font-medium pt-2">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-resort-gold" />
                        2 Guests
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-resort-gold" />
                        Available
                      </span>
                    </div>

                    {/* Badge tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {['Plunge Pool', 'Ocean View', 'Romantic Setup'].map((tag, i) => (
                        <span key={i} className="text-[9px] bg-stone-100/80 text-stone-600 px-2.5 py-1 rounded-md font-medium tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-stone-100 mt-6">
                    <span className="text-stone-900 font-semibold text-sm md:text-base">
                      {suite.price} <span className="text-[10px] text-stone-400 font-light font-sans">/Night</span>
                    </span>
                    <button 
                      onClick={() => handleOpenBooking()}
                      className="bg-stone-950 hover:bg-resort-gold text-white hover:text-stone-950 font-bold px-6 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 uppercase"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. DINING SECTION */}
      <section id="dining" className="py-24 md:py-32 bg-[#f7f4eb] px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left image */}
          <div className="relative">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-lg group relative">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                alt="Sunset gourmet dish" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right text */}
          <div className="space-y-6 text-left">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">
              DINING
            </span>
            <h2 className="font-serif text-3xl md:text-[40px] font-light text-stone-900 leading-tight">
              Culinary Journeys At Sunset
            </h2>
            <p className="text-stone-600 text-xs md:text-sm font-light leading-relaxed max-w-md">
              Ocean-To-Table Cuisine Crafted By Award-Winning Chefs Across Three Signature Restaurants.
            </p>
            <button 
              onClick={() => handleOpenBooking()}
              className="bg-stone-950 hover:bg-resort-gold text-white hover:text-stone-950 font-bold px-6 py-3 rounded-full text-xs tracking-widest uppercase flex items-center gap-2 group transition-all duration-300"
            >
              Reserve A Table
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. THE POOL SECTION */}
      <section id="pool" className="py-24 md:py-32 bg-[#f7f4eb] px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left text (Right-aligned layout on desktop) */}
          <div className="space-y-6 text-left lg:text-right flex flex-col lg:items-end">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">
              THE POOL
            </span>
            <h2 className="font-serif text-3xl md:text-[40px] font-light text-stone-900 leading-tight">
              Where The Water Meets The Sky
            </h2>
            <p className="text-stone-600 text-xs md:text-sm font-light leading-relaxed max-w-md lg:text-right">
              Two Infinity Pools, A Serene Lagoon And Dedicated Kids Pool — Book Your Private Slot.
            </p>
            <button 
              onClick={() => handleOpenBooking()}
              className="bg-stone-950 hover:bg-resort-gold text-white hover:text-stone-950 font-bold px-6 py-3 rounded-full text-xs tracking-widest uppercase flex items-center gap-2 group transition-all duration-300 mt-2"
            >
              Book Pool Access
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-lg group relative">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80" 
                alt="Infinity pool night view" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. THINGS TO DO (GRID) SECTION */}
      <section id="experiences" className="py-24 md:py-32 bg-[#f7f4eb] px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-2xl mb-16 text-left">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">THINGS TO DO</span>
            <h2 className="font-serif text-3xl md:text-[40px] font-light text-stone-900 mt-3 leading-tight">
              Adventure & Wellness Await
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Kayaking',
                image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                time: '1.0 hrs.',
                price: '$40'
              },
              {
                title: 'Spa & Ayurveda',
                image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
                time: '1.5 hrs.',
                price: '$45'
              },
              {
                title: 'Zip Line Adventure',
                image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
                time: '1.0 hrs.',
                price: '$45'
              },
              {
                title: 'Sunrise Yoga',
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
                time: '1.0 hrs.',
                price: '$25'
              }
            ].map((activity, idx) => (
              <div 
                key={idx}
                className="relative h-80 rounded-2xl overflow-hidden group shadow-md shadow-stone-900/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                {/* Image */}
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end text-left">
                  <h3 className="text-white font-serif text-lg font-light">
                    {activity.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-white/70 text-[10px] font-medium tracking-wide mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-resort-gold" />
                      {activity.time}
                    </span>
                    <span>•</span>
                    <span className="text-resort-gold">
                      {activity.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* THINGS TO DO (WEDDINGS & EVENTS) SECTION */}
      <section id="events" className="w-full min-h-[70vh] flex items-center bg-[url('/wedding_bg.png')] bg-cover bg-center relative py-24 md:py-32 px-6 md:px-12">
        {/* Dark Overlay for Typography Readability */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full relative z-20 text-left">
          <div className="max-w-2xl space-y-6">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">
              THINGS TO DO
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Celebrate Life's Greatest Moments
            </h2>
            <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed max-w-xl">
              From Intimate Beachfront Ceremonies To Grand Banquet Celebrations, Our
              Dedicated Team Crafts Unforgettable Weddings, Conferences And Events Tailored
              Entirely To You.
            </p>
            <button 
              onClick={() => handleOpenBooking()}
              className="bg-resort-gold hover:bg-resort-gold-hover text-stone-900 font-bold px-8 py-3.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 inline-block"
            >
              Plan Your Events
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="bg-[#f7f4eb] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 select-none">
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold/90 uppercase block">GALLERY</span>
              <h2 className="font-serif text-3xl md:text-[40px] font-light text-stone-900 leading-tight">
                A Glimpse Of Paradise
              </h2>
            </div>
            
            <button 
              onClick={() => handleScrollTo('accommodation')}
              className="text-xs md:text-sm font-semibold tracking-wider text-resort-gold hover:text-resort-gold-hover transition-colors duration-300 flex items-center gap-2 group cursor-pointer mt-4 md:mt-0"
            >
              See Full Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Asymmetrical Masonry collage grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Image 1: Pool sunset (Width: 5/12) */}
            <div className="md:col-span-5 h-72 rounded-2xl overflow-hidden shadow-md shadow-stone-900/5 group relative">
              <img 
                src="/1.png" 
                alt="Infinity pool sunset" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 2: Island resort aerial (Width: 3/12) */}
            <div className="md:col-span-3 h-72 rounded-2xl overflow-hidden shadow-md shadow-stone-900/5 group relative">
              <img 
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80" 
                alt="Resort island view" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 3: Luxury bedroom suite (Width: 4/12) */}
            <div className="md:col-span-4 h-72 rounded-2xl overflow-hidden shadow-md shadow-stone-900/5 group relative">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" 
                alt="Resort suite" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 4: Private pool villa night (Width: 3/12) */}
            <div className="md:col-span-3 h-72 rounded-2xl overflow-hidden shadow-md shadow-stone-900/5 group relative">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
                alt="Pool villa night" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 5: Gastronomy table sunset (Width: 4/12) */}
            <div className="md:col-span-4 h-72 rounded-2xl overflow-hidden shadow-md shadow-stone-900/5 group relative">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                alt="Gourmet dish at sunset" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 6: Large infinity pool night view (Width: 5/12) */}
            <div className="md:col-span-5 h-72 rounded-2xl overflow-hidden shadow-md shadow-stone-900/5 group relative">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80" 
                alt="Resort infinity pool night view" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

          </div>

        </div>
      </section>

      {/* GUEST STORIES TESTIMONIAL SECTION */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 select-none">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold/90 uppercase block">GUEST STORIES</span>
            <h2 className="font-serif text-3xl md:text-[40px] font-light text-stone-900 mt-3.5">
              Cherished By Our Guests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The most serene escape we've ever experienced. The private pool villa felt like a dream and the staff anticipated our every need.",
                name: "Sarah Mitchell",
                location: "London"
              },
              {
                text: "Impeccable service and breathtaking views. The spa and dining were world-class. We're already planning our return.",
                name: "James Chen",
                location: "Mumbai"
              },
              {
                text: "Our children never wanted to leave the kids pool. Perfectly balanced for both relaxation and family fun.",
                name: "Maria Garcia",
                location: "Singapore"
              }
            ].map((review, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-stone-100 p-8 shadow-[0_12px_36px_rgba(196,155,85,0.06)] hover:shadow-[0_12px_36px_rgba(196,155,85,0.12)] transition-all duration-500 flex flex-col justify-between min-h-[260px] group"
              >
                <div>
                  {/* Styled Quote Open Graphic */}
                  <span className="font-serif text-resort-gold/30 text-5xl leading-none font-bold block mb-2 select-none">“</span>
                  
                  {/* Star rating */}
                  <div className="flex gap-0.5 mb-4 text-resort-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-stone-600 text-xs md:text-sm font-light leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>
                </div>

                <div>
                  <h4 className="text-stone-950 font-semibold text-xs md:text-sm">
                    {review.name}
                  </h4>
                  <p className="text-stone-400 text-[10px] md:text-xs font-light mt-0.5">
                    {review.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} />

      {/* INTERACTIVE BOOKING MODAL (WOW FACTOR) */}
      <AnimatePresence>
        {bookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Main Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 10 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="relative w-full max-w-2xl glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible"
            >
              
              {/* Left Side: Room Summary */}
              <div className="w-full md:w-5/12 bg-resort-navy/90 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] font-bold tracking-[0.35em] text-resort-gold uppercase">YOUR SELECTION</span>
                  <h3 className="font-serif text-xl font-light text-white mt-1 mb-4">
                    {SUITES.find(s => s.id === selectedSuiteId)?.name}
                  </h3>
                  <div className="rounded-xl overflow-hidden aspect-[4/3] mb-4">
                    <img 
                      src={SUITES.find(s => s.id === selectedSuiteId)?.image} 
                      alt="Selected Room" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs text-white/60 font-light">
                    <p className="flex justify-between"><span>Rate per Night:</span> <span className="font-semibold text-white">₹{SUITES.find(s => s.id === selectedSuiteId)?.price.toLocaleString('en-IN')}</span></p>
                    <p className="flex justify-between"><span>Inclusions:</span> <span className="text-resort-gold">Luxury breakfast, airport pickup</span></p>
                  </div>
                </div>

                {/* Pricing Summary (Live update) */}
                {checkIn && checkOut && (
                  <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                    <div className="flex justify-between text-[11px] text-white/50">
                      <span>Stay Duration:</span>
                      <span className="font-medium text-white">{costDetails.days} Nights</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-white/50">
                      <span>Luxury Tax (12%):</span>
                      <span className="font-medium text-white">₹{costDetails.tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-1 border-t border-white/5">
                      <span className="font-semibold text-resort-gold">Estimated Total:</span>
                      <span className="font-serif font-bold text-white text-base">₹{costDetails.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Stay Reservation Form */}
              <div className="flex-1 p-6 md:p-8 relative">
                
                {/* Close Button */}
                <button 
                  onClick={() => setBookingOpen(false)}
                  className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <AnimatePresence mode="wait">
                  {!bookingSubmitted ? (
                    <motion.div
                      key="form-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h4 className="font-serif text-lg font-light text-white mb-1">Reserve Sanctuary</h4>
                      <p className="text-[10px] text-white/40 tracking-wider mb-6 uppercase">Provide details to check suite availability</p>

                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        
                        {/* Select Suite Dropdown */}
                        <div>
                          <label className="text-[9px] tracking-wider uppercase text-white/50 font-bold block mb-1.5">Suite Preference</label>
                          <select 
                            value={selectedSuiteId} 
                            onChange={(e) => setSelectedSuiteId(e.target.value)}
                            className="w-full glass-input text-xs cursor-pointer text-white"
                            style={{ colorScheme: 'dark' }}
                          >
                            {SUITES.map((suite) => (
                              <option key={suite.id} value={suite.id} className="bg-resort-navy text-white text-xs py-2">{suite.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Stay Dates */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[9px] tracking-wider uppercase text-white/50 font-bold block mb-1.5">Check-In</label>
                            <input 
                              required 
                              type="date" 
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="w-full glass-input text-xs text-white" 
                              style={{ colorScheme: 'dark' }}
                            />
                          </div>
                          <div>
                            <label className="text-[9px] tracking-wider uppercase text-white/50 font-bold block mb-1.5">Check-Out</label>
                            <input 
                              required 
                              type="date" 
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="w-full glass-input text-xs text-white" 
                              style={{ colorScheme: 'dark' }}
                            />
                          </div>
                        </div>

                        {/* Guest and Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label className="text-[9px] tracking-wider uppercase text-white/50 font-bold block mb-1.5">Guest Full Name</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="Jane Smith"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="w-full glass-input text-xs" 
                            />
                          </div>
                          <div>
                            <label className="text-[9px] tracking-wider uppercase text-white/50 font-bold block mb-1.5">Guests</label>
                            <select 
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                              className="w-full glass-input text-xs text-white"
                              style={{ colorScheme: 'dark' }}
                            >
                              <option value="1">1 Adult</option>
                              <option value="2">2 Adults</option>
                              <option value="3">3 Adults</option>
                              <option value="4">4 Adults</option>
                              <option value="6">6 Adults</option>
                            </select>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="text-[9px] tracking-wider uppercase text-white/50 font-bold block mb-1.5">Email for confirmation</label>
                          <input 
                            required 
                            type="email" 
                            placeholder="jane.smith@example.com"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="w-full glass-input text-xs" 
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                          <button 
                            type="submit" 
                            disabled={bookingLoading}
                            className="w-full bg-resort-gold text-stone-950 text-[11px] font-bold tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-resort-gold-hover transition-all duration-300 disabled:bg-resort-gold/50 flex items-center justify-center gap-3 relative shadow-lg shadow-resort-gold/5 active:scale-95"
                          >
                            {bookingLoading ? (
                              <>
                                <svg className="animate-spin h-4.5 w-4.5 text-stone-950" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Securing Sanctuary...
                              </>
                            ) : (
                              'Confirm Reservation'
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-8 px-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-resort-gold/15 border border-resort-gold/30 flex items-center justify-center text-resort-gold mb-6 animate-pulse">
                        <Star className="w-8 h-8 fill-current" />
                      </div>
                      <h4 className="font-serif text-2xl font-light text-white mb-2">Sanctuary Reserved</h4>
                      <p className="text-xs text-white/60 max-w-sm mb-6 leading-relaxed">
                        Thank you, {guestName}. We have secured your stay at the **{SUITES.find(s => s.id === selectedSuiteId)?.name}**. A luxury booking receipt has been sent to **{guestEmail}**.
                      </p>
                      <div className="bg-white/[0.03] border border-white/5 rounded-xl px-6 py-3.5 mb-8">
                        <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold block">Booking Reference</span>
                        <span className="text-base font-mono font-bold text-resort-gold tracking-widest mt-1 block">{bookingRef}</span>
                      </div>
                      <button 
                        onClick={() => setBookingOpen(false)}
                        className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 rounded-full transition-colors active:scale-95"
                      >
                        Return to Paradise
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
