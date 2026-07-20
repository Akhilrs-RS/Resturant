import React, { useState } from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import Footer from './Footer';

export default function Contact({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    msg: ''
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for reaching out, ${formData.name}! Your message has been sent to our concierge team. We will get back to you shortly.`);
    setFormData({
      name: '',
      email: '',
      msg: ''
    });
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[45vh] w-full flex items-end bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-20 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-[0.4em] text-resort-gold uppercase block">
              CONTACT
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Adventure meets serenity
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
              Our concierge team is here to assist you with reservations, events, and special requests.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Info & Maps */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-[11px] font-bold tracking-[0.35em] text-resort-gold uppercase block">GET IN TOUCH</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
                Reach Us Directly
              </h2>
              <div className="w-16 h-[1px] bg-resort-gold/60 pt-2" />
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-resort-gold flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Reservations & Desk</p>
                  <p className="text-sm font-medium text-stone-800 mt-1">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-resort-gold flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Email Inquiry</p>
                  <a href="mailto:reservations@etheria.com" className="text-sm font-medium text-stone-800 hover:text-resort-gold transition-colors mt-1 block">
                    reservations@etheria.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-resort-gold flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Resort Location</p>
                  <p className="text-sm font-medium text-stone-800 mt-1">Coral Bay Road, Palm Cove, Goa 403001, India</p>
                </div>
              </div>
            </div>

            {/* Google Maps link & graphic placeholder */}
            <div className="pt-6 space-y-4">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-resort-gold hover:text-resort-gold-hover transition-colors uppercase"
              >
                View on Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Stylized vector map drawing card */}
              <div className="h-64 w-full rounded-2xl overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-stone-200/40">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
                  alt="Goa beach map location" 
                  className="w-full h-full object-cover grayscale opacity-90"
                />
                <div className="absolute inset-0 bg-[#f7f4eb]/40 mix-blend-color" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-resort-gold flex items-center justify-center text-stone-950 shadow-lg animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-stone-200/40 shadow-[0_10px_35px_rgba(0,0,0,0.02)] relative text-left">
              <h3 className="font-serif text-xl font-light text-stone-900 mb-6">
                Send us inquiry
              </h3>
              
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                {/* Message */}
                <div>
                  <label className="text-[9px] tracking-wider uppercase text-stone-400 font-bold block mb-1.5">Your Message</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Tell us what you are looking for..." 
                    value={formData.msg}
                    onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-resort-gold transition-colors placeholder-stone-400 resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-stone-950 text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 mt-4 active:scale-95 shadow-md"
                >
                  Send Message
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
