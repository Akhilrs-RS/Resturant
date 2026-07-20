import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ handleScrollTo, setCurrentPage }) {
  return (
    <>
      {/* Top Accent Transition Line */}
      <div className="w-full h-[4px] bg-[#1c3a27] pointer-events-none" />
      
      {/* Footer Container */}
      <footer className="bg-[#050b16] py-16 md:py-20 px-6 md:px-12 text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Logo & Socials */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="flex flex-col select-none cursor-pointer" onClick={() => handleScrollTo('home')}>
              <span className="font-cinzel text-3xl font-light tracking-[0.05em] text-white">
                Etheria
              </span>
              <span className="text-[10px] font-sans tracking-[0.25em] text-resort-gold font-bold mt-1.5 uppercase">
                RESORT & SPA
              </span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed max-w-xs font-light">
              Experience luxury, comfort & nature in one destination. Your sanctuary awaits.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { name: 'Instagram', svg: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
                { name: 'Facebook', svg: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
                { name: 'Twitter', svg: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg> },
                { name: 'YouTube', svg: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg> }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-resort-gold hover:border-resort-gold transition-colors duration-300 bg-white/[0.01]"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col space-y-5">
            <span className="text-[11px] font-bold tracking-[0.2em] text-resort-gold uppercase">
              EXPLORE
            </span>
            <div className="flex flex-col space-y-3.5 text-xs text-white/70 font-medium">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Rooms & Suites', id: 'accommodation' },
                { name: 'Dining', id: 'dining' },
                { name: 'The Pool', id: 'pool' },
                { name: 'Activities & Packages', id: 'experiences' },
                { name: 'Weddings & Events', id: 'events' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-left hover:text-resort-gold transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: DISCOVER */}
          <div className="lg:col-span-2 flex flex-col space-y-5">
            <span className="text-[11px] font-bold tracking-[0.2em] text-resort-gold uppercase">
              DISCOVER
            </span>
            <div className="flex flex-col space-y-3.5 text-xs text-white/70 font-medium">
              {[
                { name: 'Gallery', id: 'gallery' },
                { name: 'Offers', id: 'offers' },
                { name: 'About', id: 'about' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-left hover:text-resort-gold transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: REACH US (Location details, placed in the rightmost column) */}
          <div className="lg:col-span-3 flex flex-col space-y-5">
            <span className="text-[11px] font-bold tracking-[0.2em] text-resort-gold uppercase">
              REACH US
            </span>
            <div className="flex flex-col space-y-4 text-xs text-white/70 leading-relaxed font-medium">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-resort-gold flex-shrink-0 mt-0.5" />
                <span>Coral Bay Road, Palm Cove, Goa 403001, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-resort-gold flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-resort-gold flex-shrink-0" />
                <a href="mailto:reservations@etheria.com" className="hover:text-resort-gold transition-colors">
                  reservations@etheria.com
                </a>
              </div>

            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
