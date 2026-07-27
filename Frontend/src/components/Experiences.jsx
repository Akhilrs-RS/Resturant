import React from 'react';
import { Clock, Users, AlertCircle } from 'lucide-react';
import Footer from './Footer';
import heroBg from '../assets/m11.jpg';
import pkg1 from '../assets/m1.jpg';
import pkg2 from '../assets/m4.png';
import pkg3 from '../assets/m2.png';
import pkg4 from '../assets/m3.png';
import pkg5 from '../assets/m11.jpg';
import pkg6 from '../assets/m6.jpg';

const ACTIVITIES = [
  {
    name: 'Kayaking',
    category: 'WATER',
    price: '$47',
    duration: '1.5 hrs',
    people: '6 max',
    note: 'Life jackets provided. Swimming policy recommended.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    desc: 'Glide across calm turquoise water at sunrise.'
  },
  {
    name: 'Spa & Ayurveda',
    category: 'WELLNESS',
    price: '$120',
    duration: '1.5 hrs',
    people: '2 max',
    note: 'Doctor clearance for health conditions',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
    desc: 'Restorative therapies rooted in ancient tradition.'
  },
  {
    name: 'Zip Line Adventure',
    category: 'OUTDOOR',
    price: '$60',
    duration: '1.5 hrs',
    people: '8 max',
    note: 'Weight limit 120kg. Harness training mandatory.',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80',
    desc: 'Soar above the jungle canopy on our thrilling zip line.'
  },
  {
    name: 'Sunrise Yoga',
    category: 'NATURE',
    price: '$30',
    duration: '1.5 hrs',
    people: '8 max',
    note: 'Suitable for anyone.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    desc: 'Greet the day with guided yoga on the ocean terrace.'
  },
  {
    name: 'Bonfire Evening',
    category: 'SOCIAL',
    price: '$25',
    duration: '1.5 hrs',
    people: '20 max',
    note: 'Supervised at all times.',
    image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=600&q=80',
    desc: 'Gather under the stars around a warm beach bonfire.'
  },
  {
    name: 'Kids Water Games',
    category: 'FAMILY',
    price: '$15',
    duration: '1.5 hrs',
    people: '8 max',
    note: 'Lifeguard supervised. Ages 4-12.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    desc: 'Splashing fun and games in our dedicated kids pool.'
  }
];

const CATEGORY_COLORS = {
  WATER:   'bg-sky-100 text-sky-700',
  WELLNESS:'bg-purple-100 text-purple-700',
  OUTDOOR: 'bg-orange-100 text-orange-700',
  NATURE:  'bg-green-100 text-green-700',
  SOCIAL:  'bg-amber-100 text-amber-700',
  FAMILY:  'bg-pink-100 text-pink-700',
};

const PACKAGES = [
  {
    name: 'Honeymoon Package',
    category: 'ROMANCE & ESCAPES',
    price: '$2400',
    nights: '/ 3 nights',
    image: pkg1,
    desc: '3 nights in a honeymoon suite with couples spa, candlelit dinners and sunset cruise.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Family Package',
    category: 'FAMILIES & FRIENDS',
    price: '$1800',
    nights: '/ 3 nights',
    image: pkg2,
    desc: 'Family suite with kids activities, all-day dining and pool access.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Wellness Retreat',
    category: 'RESTORE & RENEW',
    price: '$2100',
    nights: '/ 4 nights',
    image: pkg3,
    desc: 'Daily spa, yoga, ayurveda and wholesome cuisine over 4 nights.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Weekend Getaway',
    category: 'QUICK ESCAPES',
    price: '$800',
    nights: '/ 2 nights',
    image: pkg4,
    desc: '2 nights of pure relaxation with breakfast and pool access.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Adventure Package',
    category: 'FOR THE THRILL SEEKERS',
    price: '$1500',
    nights: '/ 3 nights',
    image: pkg5,
    desc: 'Zip line, kayaking, trekking and bonfire nights over 3 days.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  },
  {
    name: 'Corporate Retreat',
    category: 'WORK AND WELLNESS',
    price: '$3200',
    nights: '/ 3 nights',
    image: pkg6,
    desc: 'Conference facilities, team activities and premium accommodation.',
    includes: ['Honeymoon Suite', 'Couples Spa', 'Candlelit Dinner', 'Sunset Cruise']
  }
];

export default function Experiences({ handleScrollTo, setCurrentPage }) {
  const handleBookNow = (activityName) => {
    alert(`Booking request for "${activityName}" received. Our team will confirm your slot shortly!`);
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">

      {/* 1. HERO BANNER */}
      <section
        className="relative h-[48vh] w-full flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-white/80 uppercase block">
              Activities &amp; Packages
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Adventure meets serenity
            </h1>
            <p className="text-white/75 text-xs md:text-sm font-light max-w-lg mt-2 leading-relaxed">
              From adrenaline to deep calm — curated experiences for every kind of traveller.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ACTIVITIES GRID */}
      <section className="py-14 px-6 md:px-12 max-w-7xl mx-auto text-left">

        {/* Section header */}
        <div className="mb-10">
          <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block mb-1">
            Experiences
          </span>
          <h2 className="font-serif text-3xl md:text-[2rem] font-light text-stone-900 leading-tight">
            Resort activities
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACTIVITIES.map((activity, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden bg-white border border-stone-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Category tag */}
                <span className={`inline-block text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full mb-2 w-fit ${CATEGORY_COLORS[activity.category] || 'bg-stone-100 text-stone-600'}`}>
                  {activity.category}
                </span>

                {/* Name */}
                <h3 className="font-serif text-base font-medium text-stone-900 mb-1">
                  {activity.name}
                </h3>

                {/* Short desc */}
                <p className="text-stone-500 text-xs font-light leading-relaxed mb-3">
                  {activity.desc}
                </p>

                {/* Meta: duration + people */}
                <div className="flex items-center gap-4 text-[11px] text-stone-400 mb-2.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {activity.people}
                  </span>
                </div>

                {/* Note */}
                <div className="flex items-start gap-1.5 mb-4">
                  <AlertCircle className="w-3 h-3 text-stone-400 mt-0.5 shrink-0" />
                  <span className="text-[10px] text-stone-400 leading-snug">{activity.note}</span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
                  <span className="text-stone-900 font-semibold text-sm">
                    {activity.price}
                  </span>
                  <button
                    onClick={() => handleBookNow(activity.name)}
                    className="bg-stone-950 text-white text-[10px] font-semibold tracking-widest uppercase px-4 py-2 rounded-lg hover:bg-stone-700 transition-all duration-200 active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. RESORT PACKAGES — DARK NAVY */}
      <section className="py-16 bg-[#0d1b2e] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-10 text-left">
            <span className="text-[11px] font-semibold tracking-[0.35em] text-[#c5a253] uppercase block mb-1">
              Curated Stays
            </span>
            <h2 className="font-serif text-3xl md:text-[2rem] font-light text-white leading-tight">
              Resort packages
            </h2>
          </div>

          {/* Package cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden bg-[#1a2d45] border border-white/10 hover:border-[#c5a253]/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="h-44 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Category tag */}
                  <span className="text-[8px] font-bold tracking-widest uppercase text-[#c5a253] mb-2 block">
                    {pkg.category}
                  </span>

                  {/* Name */}
                  <h3 className="font-serif text-base font-medium text-white mb-1.5">
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/55 text-[11px] font-light leading-relaxed mb-3">
                    {pkg.desc}
                  </p>

                  {/* Includes bullet list */}
                  <ul className="space-y-1 mb-5">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="text-white/50 text-[11px] flex items-start gap-1.5">
                        <span className="text-[#c5a253] mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                    <div>
                      <span className="text-white font-semibold text-sm">{pkg.price}</span>
                      <span className="text-white/40 text-[10px] ml-1">{pkg.nights}</span>
                    </div>
                    <button
                      onClick={() => alert(`Enquiry for ${pkg.name} received! Our team will reach out shortly.`)}
                      className="bg-[#c5a253] hover:bg-[#d4b56a] text-stone-950 text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-lg transition-all duration-200 active:scale-95"
                    >
                      Enquire
                    </button>
                  </div>
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
