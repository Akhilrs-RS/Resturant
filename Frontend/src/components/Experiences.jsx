import React from 'react';
import { Calendar, Clock, MapPin, Shield } from 'lucide-react';
import Footer from './Footer';

const ACTIVITIES = [
  {
    name: 'Kayaking',
    price: '₹2,400',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80',
    desc: 'Glide through quiet island mangroves and coral lagoons led by experienced naturalists.'
  },
  {
    name: 'Spark Ayurveda',
    price: '₹4,800',
    duration: '90 Mins',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80',
    desc: 'Traditional healing massages, herbal compresses, and steam baths tailored to your bio-type.'
  },
  {
    name: 'Zip Line Adventure',
    price: '₹7,200',
    duration: '1 Hour',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80',
    desc: 'Fly across tropical ocean tree lines and enjoy a birds-eye view of Coral Bay.'
  },
  {
    name: 'Sunrise Yoga',
    price: '₹1,200',
    duration: '60 Mins',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
    desc: 'Gentle morning yoga flows on the quiet beach as the sun slowly rises over the horizon.'
  },
  {
    name: 'Snorkeling',
    price: '₹3,400',
    duration: '3 Hours',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    desc: 'Discover colorful coral reefs, tropical reef fish, and sea turtles with safety escorts.'
  },
  {
    name: 'Kids Water Games',
    price: '₹1,600',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80',
    desc: 'Supervised splash play, pool treasure hunts, and friendly team games for children.'
  }
];

const PACKAGES = [
  {
    name: 'Honeymoon Package',
    price: '₹12,000 / Night',
    desc: 'Includes romantic suite stay, couples spa massage, and a private sunset candlelit beach dinner.',
    details: 'Min. 3 Nights stay'
  },
  {
    name: 'Family Package',
    price: '₹18,000 / Night',
    desc: 'Includes 2 interconnected bedrooms, free kids splash club access, and a guided garden tour.',
    details: 'Min. 2 Nights stay'
  },
  {
    name: 'Adventure Package',
    price: '₹15,000 / Night',
    desc: 'Includes kayaking tours, zip line passes, and daily snorkeling excursions with equipment.',
    details: 'Min. 3 Nights stay'
  },
  {
    name: 'Wellness Package',
    price: '₹14,000 / Night',
    desc: 'Includes daily yoga therapy sessions, organic meal plans, and ayurvedic detox body treatments.',
    details: 'Min. 5 Nights stay'
  },
  {
    name: 'Corporate Package',
    price: '₹16,000 / Night',
    desc: 'Includes high-speed private WiFi hubs, standard meeting rooms, and mid-day tea breaks.',
    details: 'Min. 10 Guests'
  },
  {
    name: 'Weekend Getaway',
    price: '₹11,000 / Night',
    desc: 'Includes early morning check-in, late afternoon check-out, and premium sunset lounge drinks.',
    details: 'Fri - Sun bookings'
  }
];

export default function Experiences({ handleScrollTo, setCurrentPage }) {
  const handleInquiryClick = (pkgName) => {
    alert(`Thank you for inquiring about the ${pkgName}. Our reservations manager will contact you shortly!`);
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[45vh] w-full flex items-end bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">
              ACTIVITIES & PACKAGES
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Adventure meets serenity
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              From adrenaline to deep calm — curated experiences for every kind of traveler.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ACTIVITIES GRID */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
        <div className="space-y-3 mb-16">
          <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">RESORT ACTIVITIES</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
            Curated Experiences
          </h2>
          <div className="w-16 h-[1px] bg-resort-gold/60 pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity, idx) => (
            <div 
              key={idx}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200/40 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(196,155,85,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col group"
            >
              {/* Image */}
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={activity.image} 
                  alt={activity.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-resort-gold transition-colors duration-300">
                    {activity.name}
                  </h3>
                  <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed">
                    {activity.desc}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] text-stone-400 font-medium pt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-resort-gold" />
                      {activity.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-stone-100 mt-6">
                  <span className="text-stone-900 font-semibold text-sm md:text-base">
                    {activity.price}
                  </span>
                  <button 
                    onClick={() => handleInquiryClick(activity.name)}
                    className="bg-stone-950 hover:bg-resort-gold text-white hover:text-stone-950 font-bold px-6 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 uppercase"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. RESORT PACKAGES (DARK NAVY BACKGROUND) */}
      <section className="py-24 bg-[#050b16] px-6 md:px-12 text-white relative">
        <div className="max-w-7xl mx-auto text-left">
          
          <div className="space-y-3 mb-16">
            <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">CURATED STAYS</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
              Resort packages
            </h2>
            <div className="w-16 h-[1px] bg-resort-gold/60 pt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between h-72"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-lg font-light text-white">{pkg.name}</h3>
                    <span className="text-xs text-resort-gold font-sans whitespace-nowrap">{pkg.details}</span>
                  </div>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-6">
                  <span className="text-resort-gold text-sm font-semibold">{pkg.price}</span>
                  <button 
                    onClick={() => handleInquiryClick(pkg.name)}
                    className="border border-resort-gold/30 hover:border-resort-gold text-resort-gold hover:text-stone-950 hover:bg-resort-gold font-bold px-5 py-2 rounded-full text-xs tracking-wider transition-all duration-300 uppercase"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer handleScrollTo={handleScrollTo} setCurrentPage={setCurrentPage} />
    </div>
  );
}
