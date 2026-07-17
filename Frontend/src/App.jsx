import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSuiteId, setSelectedSuiteId] = useState('oasis');

  // Shared booking controller
  const handleOpenBooking = (suiteId = 'oasis') => {
    setSelectedSuiteId(suiteId);
    setBookingOpen(true);
  };

  // Shared scroll navigator
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to highlight active nav links
  useEffect(() => {
    const handleScroll = () => {
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

  return (
    <div className="bg-resort-dark min-h-screen text-slate-100 font-sans selection:bg-resort-gold/30 selection:text-white">
      <Nav 
        activeSection={activeSection} 
        handleScrollTo={handleScrollTo} 
        handleOpenBooking={handleOpenBooking} 
      />
      <Home 
        handleScrollTo={handleScrollTo} 
        handleOpenBooking={handleOpenBooking}
        bookingOpen={bookingOpen}
        setBookingOpen={setBookingOpen}
        selectedSuiteId={selectedSuiteId}
        setSelectedSuiteId={setSelectedSuiteId}
      />
    </div>
  );
}
