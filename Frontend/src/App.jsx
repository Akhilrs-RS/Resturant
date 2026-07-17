import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  ChevronDown, 
  X, 
  Menu, 
  Phone, 
  Mail, 
  Compass, 
  Utensils, 
  BedDouble, 
  Sparkles, 
  Star,
  Clock,
  ArrowRight,
  MapPin,
  Check
} from 'lucide-react';

// Live gorgeous imagery for demonstration
const IMAGES = {
  bg: '/resort_bg.png',
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

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [expDropdownOpen, setExpDropdownOpen] = useState(false);
  const [selectedSuiteId, setSelectedSuiteId] = useState('oasis');

  // Booking Form State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Scroll spy & navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section tracking
      const sections = ['home', 'about', 'accommodation', 'dining', 'experiences', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    setExpDropdownOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (suiteId = 'oasis') => {
    setSelectedSuiteId(suiteId);
    setBookingSubmitted(false);
    setBookingOpen(true);
    setMobileMenuOpen(false);
  };

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
    <div className="bg-resort-dark min-h-screen text-slate-100 font-sans selection:bg-resort-gold/30 selection:text-white">
      
      {/* HEADER / NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-resort-dark/95 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo (left) */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScrollTo('home')}>
            {/* SVG Emblem */}
            <div className="w-10 h-10 rounded-full border border-resort-gold/50 flex items-center justify-center bg-resort-navy/40 relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-resort-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg className="w-6 h-6 text-resort-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
                <path d="M12 5v14M5 12h14" strokeWidth="0.5" strokeOpacity="0.3" />
                <path d="M12 6c1.5 2 3.5 3 5 5-2 1-3 3-5 5-1.5-2-3.5-3-5-5 2-1 3-3 5-5z" fill="currentColor" fillOpacity="0.15" />
                <circle cx="12" cy="11" r="2.5" fill="currentColor" />
              </svg>
            </div>
            {/* Logo Text */}
            <div className="flex flex-col select-none">
              <span className="font-cinzel text-base md:text-lg font-bold tracking-[0.18em] leading-none text-white transition-colors duration-300 group-hover:text-resort-gold">
                THABASIYA
              </span>
              <span className="text-[8px] md:text-[9px] font-sans tracking-[0.35em] text-resort-gold/90 mt-0.5 leading-none">
                RESORTS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (center) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {[
              { id: 'accommodation', label: 'ACCOMMODATION' },
              { id: 'dining', label: 'DINING' },
              { id: 'experiences', label: 'EXPERIENCES', hasDropdown: true },
              { id: 'events', label: 'EVENTS' },
              { id: 'offers', label: 'OFFERS' },
              { id: 'contact', label: 'CONTACT' }
            ].map((link) => (
              <div 
                key={link.id} 
                className="relative"
                onMouseEnter={() => link.hasDropdown && setExpDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setExpDropdownOpen(false)}
              >
                <button
                  onClick={() => handleScrollTo(link.id)}
                  className={`flex items-center gap-1.5 text-[11px] xl:text-[12px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 ${
                    activeSection === link.id 
                      ? 'text-resort-gold' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expDropdownOpen ? 'rotate-180' : ''}`} />}
                </button>
                
                {/* Experiences Dropdown Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {expDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-52"
                      >
                        <div className="glass-panel rounded-xl overflow-hidden shadow-2xl p-2 border border-white/10">
                          {[
                            { name: 'Soma Ayurvedic Spa', id: 'spa' },
                            { name: 'Sunset Yacht Escapes', id: 'yacht' },
                            { name: 'Private Lagoon Dining', id: 'dining' },
                            { name: 'Island Expeditions', id: 'island' }
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                handleScrollTo('experiences');
                                setExpDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2.5 text-[11px] tracking-wider text-white/70 hover:text-resort-gold hover:bg-white/[0.03] rounded-lg transition-all duration-200"
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Book Your Story Button (right) */}
          <div className="hidden lg:block">
            <button 
              onClick={() => handleOpenBooking()}
              className="bg-resort-gold text-stone-950 text-[11px] xl:text-[12px] font-bold tracking-[0.15em] uppercase px-7 py-3 rounded-full hover:bg-resort-gold-hover hover:shadow-lg hover:shadow-resort-gold/10 transition-all duration-300 active:scale-95"
            >
              Book Your Story
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white hover:text-resort-gold transition-colors duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </header>

      {/* MOBILE SIDEBAR MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-resort-navy/95 border-l border-white/5 p-8 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <span className="font-cinzel tracking-widest text-lg font-bold">THABASIYA</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-resort-gold">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-6">
                  {[
                    { id: 'accommodation', label: 'ACCOMMODATION' },
                    { id: 'dining', label: 'DINING' },
                    { id: 'experiences', label: 'EXPERIENCES' },
                    { id: 'events', label: 'EVENTS' },
                    { id: 'offers', label: 'OFFERS' },
                    { id: 'contact', label: 'CONTACT' }
                  ].map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleScrollTo(link.id)}
                      className={`text-left text-xs font-semibold tracking-widest uppercase transition-colors py-1 ${
                        activeSection === link.id ? 'text-resort-gold' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </div>
              <button 
                onClick={() => handleOpenBooking()}
                className="w-full bg-resort-gold text-stone-950 text-xs font-bold tracking-widest uppercase py-3.5 rounded-full text-center hover:bg-resort-gold-hover transition-colors"
              >
                Book Your Story
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>


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

        {/* Scroll Indicator */}
        <div 
          onClick={() => handleScrollTo('about')}
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


      {/* 2. INTRODUCTION FOLD */}
      <section id="about" className="py-24 md:py-32 relative bg-resort-dark px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">THE THABASIYA EXPERIENCE</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight">
              A Sanctuary Crafted <br />
              <span className="italic font-normal text-resort-gold">for Infinite Memories</span>
            </h2>
            <div className="w-20 h-[1px] bg-resort-gold/60 my-4" />
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Nestled at the edge of quiet ocean cliffs, Thabasiya Resorts welcomes you to a world of absolute seclusion. Our paradise merges striking tropical architectures with quiet modern luxury, offering curated spaces that embrace the sea breeze and host your most cherished chapters.
            </p>
            <p className="text-white/60 leading-relaxed text-sm font-light">
              From our infinity pool merging into the twilight horizon to personal butlers orchestrating tailor-made lagoon expeditions, your stay is designed as a masterpiece of comfort and discovery.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => handleScrollTo('accommodation')}
                className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-resort-gold hover:text-white transition-colors duration-300 group"
              >
                Explore Suites <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Showcase visual card grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative group aspect-[3/4]">
                <img 
                  src={IMAGES.villaOasis} 
                  alt="Resort sanctuary" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[9px] tracking-widest text-resort-gold uppercase font-bold">LIVING</span>
                  <span className="text-sm font-serif font-light text-white mt-1">Ocean Villas</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl relative group aspect-square">
                <img 
                  src={IMAGES.diningBeach} 
                  alt="Beach dining" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[9px] tracking-widest text-resort-gold uppercase font-bold">CUISINE</span>
                  <span className="text-sm font-serif font-light text-white mt-1">Sunset Gastronomy</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative group aspect-square">
                <img 
                  src={IMAGES.spaRelax} 
                  alt="Ayurvedic spa" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[9px] tracking-widest text-resort-gold uppercase font-bold">WELLNESS</span>
                  <span className="text-sm font-serif font-light text-white mt-1">Soma Spa Rituals</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl relative group aspect-[3/4]">
                <img 
                  src={IMAGES.yachtCharter} 
                  alt="Ocean cruising" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[9px] tracking-widest text-resort-gold uppercase font-bold">ESCAPE</span>
                  <span className="text-sm font-serif font-light text-white mt-1">Yacht Charters</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 3. ACCOMMODATION SECTION */}
      <section id="accommodation" className="py-24 md:py-32 bg-resort-navy/40 relative border-t border-b border-white/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase">CURATED HAVENS</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-4">Villas & Suites</h2>
            <div className="w-16 h-[1px] bg-resort-gold/60 mx-auto my-5" />
            <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">
              Every luxury accommodation is positioned for maximum ocean vistas, offering custom indoor-outdoor flows, private salt-water pools, and local handcrafted details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SUITES.map((suite) => (
              <div 
                key={suite.id}
                className="rounded-2xl overflow-hidden bg-resort-navy/70 border border-white/5 hover:border-resort-gold/25 transition-luxury hover:translate-y-[-6px] shadow-2xl flex flex-col group"
              >
                {/* Suite Image */}
                <div className="h-64 md:h-72 overflow-hidden relative">
                  <img 
                    src={suite.image} 
                    alt={suite.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-resort-dark/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                    <span className="text-resort-gold font-serif text-sm font-semibold">
                      ₹{suite.price.toLocaleString('en-IN')}<span className="text-[10px] text-white/60 font-sans font-light"> / Night</span>
                    </span>
                  </div>
                </div>

                {/* Suite Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-light text-white group-hover:text-resort-gold transition-colors duration-300">
                      {suite.name}
                    </h3>
                    
                    {/* Size and view tags */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-wider text-white/50 font-medium">
                      <span className="flex items-center gap-1 bg-white/[0.03] px-2.5 py-1 rounded">
                        <BedDouble className="w-3 h-3 text-resort-gold/80" />
                        {suite.size}
                      </span>
                      <span className="flex items-center gap-1 bg-white/[0.03] px-2.5 py-1 rounded">
                        <Users className="w-3 h-3 text-resort-gold/80" />
                        {suite.guests}
                      </span>
                      <span className="flex items-center gap-1 bg-white/[0.03] px-2.5 py-1 rounded">
                        <Compass className="w-3 h-3 text-resort-gold/80" />
                        {suite.view}
                      </span>
                    </div>

                    <div className="h-[1px] bg-white/5 my-4" />

                    {/* Features list */}
                    <ul className="space-y-2.5">
                      {suite.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-white/70 font-light">
                          <Check className="w-3.5 h-3.5 text-resort-gold" strokeWidth={2.5} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button 
                      onClick={() => handleOpenBooking(suite.id)}
                      className="w-full bg-white/[0.03] hover:bg-resort-gold text-white hover:text-stone-950 border border-white/10 hover:border-transparent text-[11px] font-bold tracking-[0.2em] uppercase py-3.5 rounded-xl transition-all duration-300"
                    >
                      Reserve Villa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 4. DINING & GASTRONOMY */}
      <section id="dining" className="py-24 md:py-32 bg-resort-dark px-6 md:px-12 relative overflow-hidden">
        {/* Glow graphic decorator */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-resort-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 lg:pr-6 relative z-10">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase">EPICUREAN ESCAPES</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight">
              A Symphony <br />
              <span className="italic font-normal text-resort-gold">of Ocean Flavors</span>
            </h2>
            <div className="w-16 h-[1px] bg-resort-gold/60 my-4" />
            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
              Indulge in seasonal culinary dining curated by internationally acclaimed chefs. Our restaurants celebrate fresh sea catches, garden harvests, and fine wines against sunset waves.
            </p>
            <div className="space-y-4 pt-2">
              {[
                { name: 'Vista Ocean Grill', desc: 'Fresh local seafood and cuts roasted over charcoal' },
                { name: 'The Glasshouse Bistro', desc: 'Plant-forward organic plates under tropical glass domes' },
                { name: 'Lighthouse Sunset Lounge', desc: 'Signature infusion mixology overlooking twilight cliffs' }
              ].map((diningSpot, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-resort-gold/10 flex items-center justify-center text-resort-gold flex-shrink-0 mt-0.5">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{diningSpot.name}</h4>
                    <p className="text-xs text-white/50 font-light mt-0.5">{diningSpot.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl relative group">
              <img 
                src={IMAGES.diningBeach} 
                alt="Luxury resort dining" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-8">
                <span className="text-[10px] tracking-widest text-resort-gold uppercase font-bold">VISTA OCEAN GRILL</span>
                <span className="text-lg md:text-xl font-serif font-light text-white mt-1">Dine right above the twilight waves</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 5. EXPERIENCES SECTION */}
      <section id="experiences" className="py-24 md:py-32 bg-resort-navy/40 relative border-t border-white/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase">CURATED EXPERIENCES</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white mt-4">Craft Your Story</h2>
            <div className="w-16 h-[1px] bg-resort-gold/60 mx-auto my-5" />
            <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">
              Step away from the ordinary with bespoke expeditions designed to bring you closer to local island wonders, clear reef life, and absolute inner calm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Private Sunset Yacht Charters',
                time: 'Daily | 4:30 PM - 7:30 PM',
                desc: 'Set sail aboard our premium catamaran to explore hidden volcanic caves, capture the deep golden sunsets, and sip champagnes paired with caviar platters.',
                image: IMAGES.yachtCharter,
                tag: 'OCEAN ESCAPE'
              },
              {
                title: 'Soma Ayurvedic Wellness & Spa',
                time: 'By Appointment | 8:00 AM - 9:00 PM',
                desc: 'Discover peaceful harmony through ancient holistic healing treatments. Our experts craft personalized oil therapies, sound baths, and cliffside yoga sessions.',
                image: IMAGES.spaRelax,
                tag: 'HOLISTIC WELLNESS'
              }
            ].map((exp, idx) => (
              <div 
                key={idx}
                className="rounded-2xl overflow-hidden bg-resort-navy/80 border border-white/5 hover:border-resort-gold/20 transition-luxury shadow-2xl flex flex-col group"
              >
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-resort-gold text-stone-950 font-sans text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                    {exp.tag}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-medium tracking-wider text-resort-gold uppercase">
                      <Clock className="w-3.5 h-3.5" />
                      {exp.time}
                    </div>
                    <h3 className="font-serif text-xl font-light text-white pt-1">
                      {exp.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed pt-2">
                      {exp.desc}
                    </p>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => handleOpenBooking()}
                      className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white group-hover:text-resort-gold transition-colors"
                    >
                      Inquire Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. CONTACT & LOCATION SECTION */}
      <section id="contact" className="py-24 bg-resort-dark border-t border-white/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase">YOUR SANCTUARY AWAITS</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Get in Touch</h2>
            <div className="w-16 h-[1px] bg-resort-gold/60" />
            <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">
              Have special booking requirements, private group dining request, or island transport inquiries? Reach out to our concierge, and we will craft details to perfection.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-resort-gold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 tracking-wider font-semibold uppercase">Reservations Line</p>
                  <p className="text-sm font-medium">+91 80 4455 2200</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-resort-gold">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 tracking-wider font-semibold uppercase">Concierge Desk</p>
                  <p className="text-sm font-medium">concierge@thabasiyaresorts.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-resort-gold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 tracking-wider font-semibold uppercase">Resort Sanctuary</p>
                  <p className="text-sm font-medium">Ocean Cliff Road, South Island, Andaman</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Concierge Contact Box */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative">
              <h3 className="font-serif text-lg font-light text-white mb-6">Concierge Inquiry</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert("Concierge request sent. Our team will contact you shortly."); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-1.5">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full glass-input text-xs" />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-1.5">Email Address</label>
                    <input required type="email" placeholder="john@example.com" className="w-full glass-input text-xs" />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-1.5">Subject</label>
                  <input required type="text" placeholder="Special Occasion Planning" className="w-full glass-input text-xs" />
                </div>
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-white/40 font-bold block mb-1.5">Inquiry Details</label>
                  <textarea rows={4} placeholder="Tell us how we can personalize your stay..." className="w-full glass-input text-xs resize-none"></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-resort-gold text-stone-950 text-[11px] font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-resort-gold-hover transition-colors"
                >
                  Send Concierge Request
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-resort-dark border-t border-white/5 py-12 px-6 md:px-12 text-center text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-left select-none">
            <span className="font-cinzel text-sm font-bold tracking-[0.18em] text-white">THABASIYA</span>
            <span className="text-[7px] tracking-[0.35em] text-resort-gold mt-0.5 uppercase">RESORTS</span>
          </div>
          <div className="flex gap-6 text-[10px] tracking-widest font-semibold uppercase text-white/60">
            <button onClick={() => handleScrollTo('accommodation')} className="hover:text-resort-gold transition-colors">Villas</button>
            <button onClick={() => handleScrollTo('dining')} className="hover:text-resort-gold transition-colors">Dining</button>
            <button onClick={() => handleScrollTo('experiences')} className="hover:text-resort-gold transition-colors">Experiences</button>
            <button onClick={() => handleScrollTo('contact')} className="hover:text-resort-gold transition-colors">Contact</button>
          </div>
          <div className="text-[10px] tracking-wider font-light text-white/30">
            © {new Date().getFullYear()} Thabasiya Resorts. All rights reserved.
          </div>
        </div>
      </footer>


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
