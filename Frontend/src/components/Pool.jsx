import React, { useState } from 'react';
import Footer from './Footer';
import poolBg from '../assets/pool.jpg';

const POOL_PACKAGES = [
  {
    name: 'Hour Pass',
    price: '$25',
    dbKey: 'pool_hour',
    desc: 'Hour access to all pools'
  },
  {
    name: 'Day Pass',
    price: '$25',
    dbKey: 'pool_day',
    desc: 'Full- day access to all pools'
  },
  {
    name: 'Cabana Retreat',
    price: '$80',
    dbKey: 'pool_cabana',
    desc: 'Private cabana + refreshments'
  },
  {
    name: 'Sunset Pool Party',
    price: '$55',
    dbKey: 'pool_sunset',
    desc: 'Evening slot with DJ & bar'
  }
];

const TIME_SLOTS = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

const PACKAGE_PRICES = {
  'Hour Pass': 25,
  'Day Pass': 25,
  'Cabana Retreat': 80,
  'Sunset Pool Party': 55
};

export default function Pool({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '10:00',
    adults: 2,
    kids: 0,
    name: '',
    email: '',
    pkg: 'Hour Pass'
  });
  const [poolPackagesList, setPoolPackagesList] = useState(POOL_PACKAGES);

  React.useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('http://localhost:5210/api/catalog/prices');
        if (res.ok) {
          const prices = await res.json();
          setPoolPackagesList(prev => prev.map(item => {
            const match = prices.find(p => p.itemKey === item.dbKey);
            return match ? { 
              ...item, 
              price: `₹${Number(match.price).toLocaleString()}`,
              imageUrl: match.imageUrl || null,
              name: match.displayName || item.name,
              desc: match.description || item.desc
            } : item;
          }));
        }
      } catch (err) {
        console.error('Failed to fetch pool prices:', err);
      }
    };
    fetchPrices();
  }, []);

  const selectedPkg = poolPackagesList.find(p => p.name === formData.pkg);
  const pricePerPerson = selectedPkg ? parseInt(selectedPkg.price.replace('$', '')) : PACKAGE_PRICES[formData.pkg] || 0;
  const total = pricePerPerson * (formData.adults + formData.kids);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5210/api/reservations/pools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: formData.pkg,
          date: new Date(formData.date).toISOString(),
          timeSlot: formData.timeSlot,
          adults: formData.adults,
          kids: formData.kids,
          fullName: formData.name,
          email: formData.email
        })
      });
      if (response.ok) {
        alert(`Pool access booked! Package: ${formData.pkg} on ${formData.date} at ${formData.timeSlot}. Enjoy the water!`);
        setFormData({
          date: '',
          timeSlot: '10:00',
          adults: 2,
          kids: 0,
          name: '',
          email: '',
          pkg: 'Hour Pass'
        });
      } else {
        alert('Pool booking failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend database server.');
    }
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">

      {/* 1. HERO BANNER */}
      <section
        className="relative h-[50vh] w-full flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${poolBg})` }}
      >
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-white/80 uppercase block">
              The Pool
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Where water meets the sky
            </h1>
            <p className="text-white/75 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Reserve your slot at our infinity pools and private cabanas.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PACKAGES + BOOKING GRID */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left: Packages */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block">
                Packages
              </span>
              <h2 className="font-serif text-3xl md:text-[2.4rem] font-light text-stone-900 leading-tight">
                Choose your escape
              </h2>
            </div>

            {/* Package rows */}
            <div className="space-y-0 border border-stone-200 rounded-xl overflow-hidden">
              {poolPackagesList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData(f => ({ ...f, pkg: item.name }))}
                  className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors duration-150 border-b border-stone-100 last:border-b-0 ${
                    formData.pkg === item.name
                      ? 'bg-stone-100'
                      : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-stone-900">{item.name}</p>
                      <p className="text-xs text-stone-400 font-light mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-stone-900 whitespace-nowrap ml-4">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Safety note */}
            <div className="flex items-start gap-2.5 text-xs text-stone-500 font-light">
              <span className="text-green-600 font-bold mt-0.5 text-sm">✓</span>
              <span>Children must be supervised at all times. Lifeguards on duty 8 AM - 8 PM. Shower before entering.</span>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm text-left">

              {/* Form header */}
              <h3 className="font-serif text-lg font-normal text-stone-900 mb-5 flex items-center gap-2">
                <span className="text-stone-400 text-base">⊞</span>
                Book pool access
              </h3>

              <form onSubmit={handleBookingSubmit} className="space-y-4">

                {/* Date */}
                <div>
                  <div className="relative border border-stone-200 rounded-lg px-4 py-3 bg-white flex items-center justify-between">
                    <input
                      required
                      type="date"
                      placeholder="dd/mm/yyyy"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-transparent text-stone-700 text-xs outline-none w-full border-none p-0 focus:ring-0 cursor-pointer"
                    />
                    <svg className="w-4 h-4 text-stone-400 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-2">Time Slot</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData(f => ({ ...f, timeSlot: slot }))}
                        className={`py-2 rounded-md text-xs font-medium transition-all duration-150 ${
                          formData.timeSlot === slot
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adults & Kids */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Adults */}
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-1.5">Adults</p>
                    <div className="flex items-center gap-0 border border-stone-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setFormData(f => ({ ...f, adults: Math.max(1, f.adults - 1) }))}
                        className="w-8 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-sm font-medium"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-sm font-medium text-stone-900">{formData.adults}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(f => ({ ...f, adults: f.adults + 1 }))}
                        className="w-8 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-sm font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Kids */}
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-1.5">Kids</p>
                    <div className="flex items-center gap-0 border border-stone-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setFormData(f => ({ ...f, kids: Math.max(0, f.kids - 1) }))}
                        className="w-8 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-sm font-medium"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center text-sm font-medium text-stone-900">{formData.kids}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(f => ({ ...f, kids: f.kids + 1 }))}
                        className="w-8 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors text-sm font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-stone-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-stone-400 transition-colors placeholder-stone-400 text-stone-700"
                />

                {/* Email */}
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-stone-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:border-stone-400 transition-colors placeholder-stone-400 text-stone-700"
                />

                {/* Total */}
                <div className="flex items-center justify-between pt-1 pb-1">
                  <span className="text-xs text-stone-500">Total</span>
                  <span className="text-sm font-semibold text-stone-900">${total}</span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-stone-950 text-white text-xs font-semibold tracking-widest uppercase py-3.5 rounded-lg hover:bg-stone-800 transition-all duration-300 active:scale-95"
                >
                  Confirm Booking
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
