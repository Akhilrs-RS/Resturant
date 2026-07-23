import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Menu } from 'lucide-react';
import logoBlack from '../assets/logo-black 3.png';

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
    if (id === 'conferences') {
      handleScrollTo('events');
    } else {
      handleScrollTo(id);
    }
  };

  const handleMobileBookClick = () => {
    setMobileMenuOpen(false);
    handleOpenBooking();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo (left) */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <img 
              src={logoBlack} 
              alt="Thabasiya Resorts" 
              className="h-10 w-auto object-contain transition-opacity duration-300"
            />
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
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 text-[11px] xl:text-[12px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 ${
                    (currentPage === link.id || (currentPage === 'home' && activeSection === link.id)) 
                      ? 'text-resort-gold' 
                      : isScrolled ? 'text-stone-700 hover:text-stone-950' : 'text-white/80 hover:text-white'
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
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-56"
                      >
                        <div className="bg-white rounded-xl overflow-hidden shadow-2xl py-2 border border-stone-100 flex flex-col items-center">
                          {[
                            { name: 'The Pool', id: 'pool' },
                            { name: 'Activities & packages', id: 'experiences' },
                            { name: 'Gallery', id: 'gallery' },
                            { name: 'Bar', id: 'lounge' }
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                handleNavClick(item.id);
                                setExpDropdownOpen(false);
                              }}
                              className="w-full text-center px-4 py-3 text-xs tracking-wider text-stone-700 hover:text-resort-gold hover:bg-stone-50 transition-all duration-205 font-medium"
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
            className={`lg:hidden transition-colors duration-200 ${
              isScrolled ? 'text-stone-800 hover:text-resort-gold' : 'text-white hover:text-resort-gold'
            }`}
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
                  <img 
                    src={logoBlack} 
                    alt="Thabasiya Resorts" 
                    className="h-8 w-auto object-contain"
                  />
                  <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-resort-gold">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-6">
                  {[
                    { id: 'accommodation', label: 'ACCOMMODATION' },
                    { id: 'dining', label: 'DINING' },
                    { id: 'conferences', label: 'CONFERENCES' },
                    { id: 'events', label: 'EVENTS' },
                    { id: 'offers', label: 'OFFERS' },
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
