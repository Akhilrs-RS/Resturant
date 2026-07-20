import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Accommodation from './components/Accommodation';
import Dining from './components/Dining';
import Pool from './components/Pool';
import Experiences from './components/Experiences';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Offers from './components/Offers';
import Contact from './components/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeSection, setActiveSection] = useState('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSuiteId, setSelectedSuiteId] = useState(null);
  
  // Date states
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Guests');

  const handleOpenBooking = (suiteId = null) => {
    setSelectedSuiteId(suiteId);
    setBookingOpen(true);
  };

  const handleScrollTo = (id) => {
    if (id === 'accommodation') {
      setCurrentPage('accommodation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'dining') {
      setCurrentPage('dining');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'pool') {
      setCurrentPage('pool');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'experiences') {
      setCurrentPage('experiences');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'events') {
      setCurrentPage('events');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'gallery') {
      setCurrentPage('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'offers') {
      setCurrentPage('offers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'contact') {
      setCurrentPage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Scroll spy to highlight active nav links (only active on Home page)
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'offers', 'pool', 'experiences', 'events', 'gallery'];
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
  }, [currentPage]);

  return (
    <div className="bg-resort-dark min-h-screen text-slate-100 font-sans selection:bg-resort-gold/30 selection:text-white">
      <Nav 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activeSection={activeSection} 
        handleScrollTo={handleScrollTo} 
        handleOpenBooking={handleOpenBooking} 
      />
      
      {currentPage === 'home' && (
        <Home 
          handleScrollTo={handleScrollTo} 
          handleOpenBooking={handleOpenBooking}
          bookingOpen={bookingOpen}
          setBookingOpen={setBookingOpen}
          selectedSuiteId={selectedSuiteId}
          setSelectedSuiteId={setSelectedSuiteId}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          guests={guests}
          setGuests={setGuests}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'accommodation' && (
        <Accommodation 
          handleOpenBooking={handleOpenBooking}
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'dining' && (
        <Dining 
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'pool' && (
        <Pool 
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'experiences' && (
        <Experiences 
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'events' && (
        <Events 
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'gallery' && (
        <Gallery 
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'offers' && (
        <Offers 
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === 'contact' && (
        <Contact 
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
