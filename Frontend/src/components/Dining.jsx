import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Users, Mail, User } from 'lucide-react';
import Footer from './Footer';

const MENU_ITEMS = [
  {
    name: 'Cherish Pizza Catch',
    price: '₹34',
    desc: 'Fresh local seafood, thin crust marinara, fresh basil and virgin olive oil.'
  },
  {
    name: 'Fresh Truffle Entree',
    price: '₹48',
    desc: 'Wild organic forest mushrooms, hand-cut egg tagliatelle pasta, white truffle oil.'
  },
  {
    name: 'Coconut Mousse on Pastry',
    price: '₹24',
    desc: 'Light tropical whipped mousse, caramelized ginger, fresh passion fruit glaze.'
  },
  {
    name: 'Spiced Fruit Tea Cup',
    price: '₹12',
    desc: 'Infused island herbs, sun-dried organic berries, sweetened with forest sunset honey.'
  }
];

export default function Dining({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2 Guests',
    name: '',
    email: ''
  });
  const [menuItemsList, setMenuItemsList] = useState(MENU_ITEMS);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [reservationRef, setReservationRef] = useState('');

  React.useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('http://localhost:5210/api/catalog/prices');
        if (res.ok) {
          const prices = await res.json();
          setMenuItemsList(prev => prev.map(item => {
            let dbKey = '';
            if (item.name === 'Cherish Pizza Catch') dbKey = 'dining_pizza';
            else if (item.name === 'Fresh Truffle Entree') dbKey = 'dining_truffle';
            else if (item.name === 'Coconut Mousse on Pastry') dbKey = 'dining_mousse';
            else if (item.name === 'Spiced Fruit Tea Cup') dbKey = 'dining_tea';

            const match = prices.find(p => p.itemKey === dbKey);
            return match ? { ...item, price: `₹${Number(match.price).toLocaleString('en-IN')}` } : item;
          }));
        }
      } catch (err) {
        console.error("Failed to fetch dining prices:", err);
      }
    };
    fetchPrices();
  }, []);

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
          guests: formData.guests,
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
      <section className="relative h-[45vh] w-full flex items-end bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">
              DINING
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Culinary journeys at sunset
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Ocean-to-table cuisine crafted by award-winning chefs across three signature restaurants.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MENU & RESERVATION GRID */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Chef Specials Menu List */}
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">THE MENU</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
                A taste of the horizon
              </h2>
              <div className="w-16 h-[1px] bg-resort-gold/60 pt-2" />
            </div>

            <div className="pt-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-resort-gold uppercase block mb-8">Today Special</span>
              
              <div className="space-y-8">
                {menuItemsList.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-end justify-between gap-4 font-serif">
                      <span className="text-stone-900 font-medium text-base md:text-lg whitespace-nowrap">
                        {item.name}
                      </span>
                      {/* Dotted Leader Line */}
                      <div className="border-b border-dotted border-stone-300 flex-grow mb-1.5 min-w-[20px]" />
                      <span className="text-stone-900 font-semibold text-base md:text-lg whitespace-nowrap">
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
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-stone-200/40 shadow-[0_10px_35px_rgba(0,0,0,0.02)] relative text-left">
              {!reservationSubmitted ? (
                <>
                  <h3 className="font-serif text-xl font-light text-stone-900 mb-6 flex items-center gap-2">
                    Reserve a Table
                  </h3>
                  
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {/* Date Input */}
                    <div>
                      <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Select Date</label>
                      <div className="relative">
                        <input 
                          required 
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700" 
                        />
                      </div>
                    </div>

                    {/* Time Input */}
                    <div>
                      <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Select Time</label>
                      <div className="relative">
                        <input 
                          required 
                          type="time" 
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700" 
                        />
                      </div>
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Guests count</label>
                      <select 
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors text-stone-700 appearance-none cursor-pointer"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                        <option>5+ Guests</option>
                      </select>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors placeholder-stone-400" 
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors placeholder-stone-400" 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={reservationLoading}
                      className="w-full bg-stone-950 text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 mt-4 active:scale-95 shadow-md flex items-center justify-center gap-3"
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
                    Thank you, <strong>{formData.name}</strong>. We have secured your table reservation for <strong>{formData.guests}</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
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
                        time: '',
                        guests: '2 Guests',
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
