import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Footer from './Footer';
import heroBg from '../assets/e.jpg';
import mapImg from '../assets/s.png';

export default function Contact({ handleScrollTo, setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    msg: ''
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    try {
      const response = await fetch('http://localhost:5210/api/inquiries/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          message: `${formData.subject} - ${formData.msg}`
        })
      });
      if (response.ok) {
        setInquirySubmitted(true);
      } else {
        alert("Inquiry submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend database server.");
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen text-stone-900 select-none">
      
      {/* 1. HERO BANNER */}
      <section 
        className="relative h-[65vh] w-full flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Banner text */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 relative z-20 text-left">
          <div className="space-y-3">
            <span className="text-[11px] font-bold tracking-[0.4em] text-white/95 uppercase block">
              OFFERS & PROMOTIONS
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight">
              Adventure meets serenity
            </h1>
            <p className="text-white/80 text-xs md:text-sm font-light max-w-lg mt-2 leading-relaxed uppercase">
              SEASONAL PRIVILEGES AND EXCLUSIVE RATES FOR THE DISCERNING TRAVELER.
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
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-stone-955 leading-tight">
                Reach Us Directly
              </h2>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-resort-gold flex-shrink-0 mt-1">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-medium text-stone-800 mt-1">+91 9876543210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-resort-gold flex-shrink-0 mt-1">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Email</p>
                  <a href="mailto:reservations@etheria.com" className="text-sm font-medium text-stone-800 hover:text-resort-gold transition-colors mt-1 block">
                    reservations@etheria.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-resort-gold flex-shrink-0 mt-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">Address</p>
                  <p className="text-sm font-medium text-stone-800 mt-1">Coral Bay Road, Palm Cove Goa 403001 India</p>
                </div>
              </div>
            </div>

            {/* Whatsapp Chat Button */}
            <div className="pt-4">
              <button 
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="bg-[#1b4332] text-white hover:bg-emerald-800 font-bold px-6 py-3 rounded-full text-xs tracking-wider transition-all duration-300 flex items-center gap-2 active:scale-95 shadow-md uppercase"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on Whatsapp
              </button>
            </div>

            {/* Social media icons row */}
            <div className="flex items-center gap-3 pt-4">
              {[
                { name: 'Instagram', svg: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
                { name: 'Facebook', svg: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
                { name: 'Twitter', svg: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-resort-gold hover:border-resort-gold transition-colors duration-300 bg-white"
                >
                  {social.svg}
                </a>
              ))}
            </div>

            {/* Map image from s.png */}
            <div className="pt-6">
              <div className="h-64 w-full rounded-3xl overflow-hidden relative shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-stone-100">
                <img 
                  src={mapImg} 
                  alt="Palm Cove map location" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-stone-100 shadow-[0_10px_35px_rgba(0,0,0,0.03)] relative text-left">
              {!inquirySubmitted ? (
                <>
                  <h3 className="font-serif text-xl font-normal text-stone-955 mb-8">
                    Send an inquiry
                  </h3>
                  
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <input 
                          required 
                          type="text" 
                          placeholder="Full name" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-700" 
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <input 
                          required 
                          type="email" 
                          placeholder="Email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-700" 
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <input 
                        required 
                        type="text" 
                        placeholder="Subject" 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-700" 
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <textarea 
                        required
                        rows={6}
                        placeholder="Your Message" 
                        value={formData.msg}
                        onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                        className="w-full bg-stone-50/50 border border-stone-200 text-xs rounded-xl px-4 py-3.5 focus:outline-none focus:border-stone-400 placeholder-stone-400 text-stone-750 resize-none" 
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={inquiryLoading}
                      className="w-full bg-black text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-md hover:bg-resort-gold hover:text-stone-950 transition-all duration-300 mt-4 active:scale-95 shadow-md flex items-center justify-center"
                    >
                      {inquiryLoading ? 'Sending Inquiry...' : 'Send Message'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-resort-gold/15 border border-resort-gold/30 flex items-center justify-center text-resort-gold mb-6 animate-pulse">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-2xl font-normal text-stone-955 mb-2">Message Sent</h4>
                  <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry has been sent to our desk. We will reach you back at <strong>{formData.email}</strong> shortly.
                  </p>
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
