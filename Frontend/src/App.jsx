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
import Lounge from './components/Lounge';
import Admin from './components/Admin';
import BookingModal from './components/BookingModal';

const IMAGES = {
  villaOasis: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
  villaOverwater: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
  villaPenthouse: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
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
  const [currentPage, setCurrentPage] = useState('home');
  const [activeSection, setActiveSection] = useState('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSuiteId, setSelectedSuiteId] = useState('oasis');
  const [suitesList, setSuitesList] = useState(SUITES);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('http://localhost:5210/api/catalog/prices');
        if (res.ok) {
          const prices = await res.json();
          setSuitesList(prev => prev.map(suite => {
            let dbKey = '';
            if (suite.id === 'oasis') dbKey = 'suite_ocean';
            else if (suite.id === 'overwater') dbKey = 'suite_honeymoon';
            else if (suite.id === 'penthouse') dbKey = 'suite_presidential';

            const match = prices.find(p => p.itemKey === dbKey);
            return match ? { 
              ...suite, 
              price: Number(match.price),
              image: match.imageUrl || suite.image,
              name: match.displayName || suite.name
            } : suite;
          }));
        }
      } catch (err) {
        console.error("Failed to fetch catalog prices globally:", err);
      }
    };
    fetchPrices();
  }, []);
  
  // Date helper to get formatted date string (YYYY-MM-DD)
  const getTodayString = (daysOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Date states
  const [checkIn, setCheckIn] = useState(getTodayString(0));
  const [checkOut, setCheckOut] = useState(getTodayString(1));
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
    if (id === 'experiences') {
      setCurrentPage('experiences');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'lounge') {
      setCurrentPage('lounge');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'pool') {
      setCurrentPage('pool');
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
      const sections = ['home', 'about', 'offers', 'accommodation', 'dining', 'experiences', 'events', 'gallery'];
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

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path === '/admin' || window.location.hash === '#admin') {
        setCurrentPage('admin');
      }
    };
    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  return (
    <div className="bg-resort-dark min-h-screen text-slate-100 font-sans selection:bg-resort-gold/30 selection:text-white">
      {currentPage !== 'admin' && (
        <Nav 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          activeSection={activeSection} 
          handleScrollTo={handleScrollTo} 
          handleOpenBooking={handleOpenBooking} 
        />
      )}
      
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
          suitesList={suitesList}
        />
      )}

      {currentPage === 'accommodation' && (
        <Accommodation 
          handleOpenBooking={handleOpenBooking}
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
          suitesList={suitesList}
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

      {currentPage === 'lounge' && (
        <Lounge 
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

      {currentPage === 'admin' && (
        <Admin 
          handleScrollTo={handleScrollTo}
          setCurrentPage={setCurrentPage}
        />
      )}

      <BookingModal
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
        suitesList={suitesList}
      />
    </div>
  );
}
