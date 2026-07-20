import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Menu } from 'lucide-react';

export default function Nav({ currentPage, setCurrentPage, activeSection, handleScrollTo, handleOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expDropdownOpen, setExpDropdownOpen] = useState(false);

  // Scroll listener for navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setExpDropdownOpen(false);
    handleScrollTo(id);
  };

  const handleMobileBookClick = () => {
    setMobileMenuOpen(false);
    handleOpenBooking();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-resort-dark/95 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo (left) */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
            {/* SVG Emblem */}
            <div className="w-10 h-10 rounded-full border border-resort-gold/50 flex items-center justify-center bg-resort-navy/40 relative overflow-hidden shadow-lg">
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
              { id: 'lounge', label: 'LOUNGE/BAR' },
              { id: 'experiences', label: 'EXPERIENCES', hasDropdown: true },
              { id: 'events', label: 'EVENTS' },
              { id: 'offers', label: 'OFFERS' },
              { id: 'gallery', label: 'GALLERY' },
              { id: 'contact', label: 'CONTACT' }
            ].map((link) => (
              <div 
                key={link.id} 
                className="relative"
                onMouseEnter={() => link.hasDropdown && setExpDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setExpDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 text-[11px] xl:text-[12px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 ${
                    (currentPage === link.id || (currentPage === 'home' && activeSection === link.id)) 
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
                                handleNavClick('experiences');
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
                    { id: 'lounge', label: 'LOUNGE/BAR' },
                    { id: 'experiences', label: 'EXPERIENCES' },
                    { id: 'events', label: 'EVENTS' },
                    { id: 'offers', label: 'OFFERS' },
                    { id: 'gallery', label: 'GALLERY' },
                    { id: 'contact', label: 'CONTACT' }
                  ].map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`text-left text-xs font-semibold tracking-widest uppercase transition-colors py-1 ${
                        (currentPage === link.id || (currentPage === 'home' && activeSection === link.id)) ? 'text-resort-gold' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </div>
              <button 
                onClick={handleMobileBookClick}
                className="w-full bg-resort-gold text-stone-950 text-xs font-bold tracking-widest uppercase py-3.5 rounded-full text-center hover:bg-resort-gold-hover transition-colors"
              >
                Book Your Story
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
