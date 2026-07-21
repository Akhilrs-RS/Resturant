import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Utensils, RefreshCw, Trash2, Check, Send, AlertTriangle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5210/api';

export default function Admin({ handleScrollTo, setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('suites');
  const [dbConnected, setDbConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lists states
  const [suiteBookings, setSuiteBookings] = useState([]);
  const [tableReservations, setTableReservations] = useState([]);
  const [poolBookings, setPoolBookings] = useState([]);
  const [loungeReservations, setLoungeReservations] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Fetch real-time data from .NET backend
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 1. Check Suite Bookings
      const resSuites = await fetch(`${API_BASE_URL}/bookings/suites`);
      if (resSuites.ok) {
        const data = await resSuites.json();
        setSuiteBookings(data || []);
      }

      // 2. Check Table Reservations
      const resTables = await fetch(`${API_BASE_URL}/reservations/tables`);
      if (resTables.ok) {
        const data = await resTables.json();
        setTableReservations(data || []);
      }

      // 3. Check Pool Bookings
      const resPools = await fetch(`${API_BASE_URL}/reservations/pools`);
      if (resPools.ok) {
        const data = await resPools.json();
        setPoolBookings(data || []);
      }

      // 4. Check Lounge Reservations
      const resLounges = await fetch(`${API_BASE_URL}/reservations/lounges`);
      if (resLounges.ok) {
        const data = await resLounges.json();
        setLoungeReservations(data || []);
      }

      // 5. Check Inquiries & Contacts
      const resEvents = await fetch(`${API_BASE_URL}/inquiries/events`);
      const resContacts = await fetch(`${API_BASE_URL}/inquiries/contact`).catch(() => null);
      
      let combinedInquiries = [];
      if (resEvents.ok) {
        const eventsData = await resEvents.json();
        combinedInquiries = [...combinedInquiries, ...eventsData];
      }
      if (resContacts && resContacts.ok) {
        const contactsData = await resContacts.json();
        combinedInquiries = [...combinedInquiries, ...contactsData.map(c => ({
          ...c,
          eventType: 'General Contact',
          guests: 'N/A'
        }))];
      }

      setInquiries(combinedInquiries);
      setDbConnected(true);

    } catch (err) {
      console.error("API Server connection error:", err);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Action Handlers
  const handleApproveSuite = (id) => {
    setSuiteBookings(prev => 
      prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item)
    );
  };

  const handleDeleteItem = (category, id) => {
    if (category === 'suites') setSuiteBookings(prev => prev.filter(i => i.id !== id));
    if (category === 'tables') setTableReservations(prev => prev.filter(i => i.id !== id));
    if (category === 'pools') setPoolBookings(prev => prev.filter(i => i.id !== id));
    if (category === 'lounges') setLoungeReservations(prev => prev.filter(i => i.id !== id));
    if (category === 'inquiries') setInquiries(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="bg-[#121a28] min-h-screen text-slate-100 font-sans select-none flex flex-col">
      
      {/* HEADER BAR */}
      <header className="bg-[#0b121f] border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-resort-gold rounded-xl flex items-center justify-center text-stone-950 font-serif font-bold text-lg">
            E
          </div>
          <div>
            <h1 className="font-serif text-lg font-light tracking-wide text-white">Etheria Resort</h1>
            <span className="text-[9px] tracking-wider text-slate-500 font-bold uppercase">Admin Console</span>
          </div>
        </div>

        {/* Database Connection Status Indicator */}
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchAllData}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Refresh database records"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            dbConnected 
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            {dbConnected ? 'Database Connected' : 'Database Offline'}
          </div>
        </div>
      </header>

      {/* DASHBOARD BODY */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* SIDEBAR TABS SELECTOR */}
        <aside className="w-full lg:w-64 bg-[#0e1624] border-r border-slate-800 p-6 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4">RESERVATIONS</p>
          
          <button
            onClick={() => setActiveTab('suites')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
              activeTab === 'suites' 
                ? 'bg-resort-gold text-stone-950 font-bold' 
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" /> Suite Bookings
          </button>

          <button
            onClick={() => setActiveTab('tables')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
              activeTab === 'tables' 
                ? 'bg-resort-gold text-stone-950 font-bold' 
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
            }`}
          >
            <Utensils className="w-4 h-4" /> Table Bookings
          </button>

          <button
            onClick={() => setActiveTab('pools')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
              activeTab === 'pools' 
                ? 'bg-resort-gold text-stone-950 font-bold' 
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Pool Access
          </button>

          <button
            onClick={() => setActiveTab('lounges')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
              activeTab === 'lounges' 
                ? 'bg-resort-gold text-stone-950 font-bold' 
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" /> Lounge bookings
          </button>

          <div className="pt-6">
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4 font-sans">FEEDBACK</p>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeTab === 'inquiries' 
                  ? 'bg-resort-gold text-stone-950 font-bold' 
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <Send className="w-4 h-4" /> Inquiries & Queries
            </button>
          </div>
        </aside>

        {/* DETAILS LIST GRID */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-x-hidden text-left">
          
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#0e1624] border border-slate-800 rounded-2xl p-6">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Suite Bookings</span>
              <p className="font-serif text-3xl font-light mt-2 text-white">{suiteBookings.length}</p>
            </div>
            <div className="bg-[#0e1624] border border-slate-800 rounded-2xl p-6">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Table Bookings</span>
              <p className="font-serif text-3xl font-light mt-2 text-white">{tableReservations.length}</p>
            </div>
            <div className="bg-[#0e1624] border border-slate-800 rounded-2xl p-6">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Lounge bookings</span>
              <p className="font-serif text-3xl font-light mt-2 text-white">{loungeReservations.length}</p>
            </div>
            <div className="bg-[#0e1624] border border-slate-800 rounded-2xl p-6">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Inquiries Received</span>
              <p className="font-serif text-3xl font-light mt-2 text-white">{inquiries.length}</p>
            </div>
          </div>

          {/* Offline Server Notice */}
          {!dbConnected && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="text-xs font-light">
                <strong>API Server Offline:</strong> We are currently unable to reach the backend API server on <code>{API_BASE_URL}</code>. Please check your docker containers and ensure the server is active.
              </p>
            </div>
          )}

          {/* DATA TABLES GRID CONTAINER */}
          <div className="bg-[#0e1624] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            
            {/* Table title */}
            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
              <h2 className="font-serif text-base font-light text-white capitalize">
                {activeTab === 'suites' && 'Suite Bookings Catalog'}
                {activeTab === 'tables' && 'Dining Table Bookings'}
                {activeTab === 'pools' && 'Pool Access Passes'}
                {activeTab === 'lounges' && 'Lounge Seating Catalog'}
                {activeTab === 'inquiries' && 'Quotation Request Inquiries'}
              </h2>
            </div>

            {/* TAB CONTENT GRID */}
            <div className="overflow-x-auto w-full">
              
              {/* 1. SUITES TABLE */}
              {activeTab === 'suites' && (
                <table className="w-full text-xs text-left min-w-[700px]">
                  <thead className="bg-[#121b2a] text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Guest Name</th>
                      <th className="px-6 py-4">Contact Details</th>
                      <th className="px-6 py-4">Suite Category</th>
                      <th className="px-6 py-4">Check-In</th>
                      <th className="px-6 py-4">Check-Out</th>
                      <th className="px-6 py-4">Guests</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {suiteBookings.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">{item.fullName}</td>
                        <td className="px-6 py-4">
                          <p>{item.email}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{item.phone}</p>
                        </td>
                        <td className="px-6 py-4 font-mono text-[10px] uppercase text-resort-gold">{item.suiteId}</td>
                        <td className="px-6 py-4 font-light">{new Date(item.checkInDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-light">{new Date(item.checkOutDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-light">{item.guests}</td>
                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          {item.status === 'Pending' && (
                            <button 
                              onClick={() => handleApproveSuite(item.id)}
                              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-1.5 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors"
                              title="Approve Reservation"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteItem('suites', item.id)}
                            className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-colors"
                            title="Cancel Reservation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* 2. DINING TABLES TABLE */}
              {activeTab === 'tables' && (
                <table className="w-full text-xs text-left min-w-[600px]">
                  <thead className="bg-[#121b2a] text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Guest Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Reservation Date</th>
                      <th className="px-6 py-4">Time Slot</th>
                      <th className="px-6 py-4">Guests</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {tableReservations.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">{item.fullName}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4 font-light">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-mono font-semibold text-resort-gold">{item.time}</td>
                        <td className="px-6 py-4 font-light">{item.guests}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteItem('tables', item.id)}
                            className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* 3. POOL ACCESS TABLE */}
              {activeTab === 'pools' && (
                <table className="w-full text-xs text-left min-w-[600px]">
                  <thead className="bg-[#121b2a] text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Guest Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Access Package</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Time Slot</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {poolBookings.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">{item.fullName}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4 font-semibold text-resort-gold uppercase tracking-wider">{item.package}</td>
                        <td className="px-6 py-4 font-light">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-mono">{item.timeSlot}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteItem('pools', item.id)}
                            className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* 4. LOUNGES TABLE */}
              {activeTab === 'lounges' && (
                <table className="w-full text-xs text-left min-w-[700px]">
                  <thead className="bg-[#121b2a] text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Guest Name</th>
                      <th className="px-6 py-4">Contacts</th>
                      <th className="px-6 py-4">Reservation Details</th>
                      <th className="px-6 py-4">Seating</th>
                      <th className="px-6 py-4">Occasion</th>
                      <th className="px-6 py-4">Special Requests</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {loungeReservations.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">{item.fullName}</td>
                        <td className="px-6 py-4">
                          <p>{item.email}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{item.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-light">{new Date(item.date).toLocaleDateString()}</p>
                          <p className="font-mono text-[10px] text-resort-gold mt-0.5">{item.time} | {item.guests} Guests</p>
                        </td>
                        <td className="px-6 py-4 font-light">{item.seatingPreference}</td>
                        <td className="px-6 py-4 text-[10px] uppercase font-bold text-slate-400">{item.occasion}</td>
                        <td className="px-6 py-4 text-slate-400 font-light max-w-[200px] truncate" title={item.specialRequest}>
                          {item.specialRequest || 'None'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteItem('lounges', item.id)}
                            className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* 5. INQUIRIES & CONTACTS TABLE */}
              {activeTab === 'inquiries' && (
                <table className="w-full text-xs text-left min-w-[700px]">
                  <thead className="bg-[#121b2a] text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Guest Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Details</th>
                      <th className="px-6 py-4">Message Context</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {inquiries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4">
                          <span className="bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                            {item.eventType || 'Contact Inquiry'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">{item.fullName}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">
                          <p>{item.guests}</p>
                          {item.date && <p className="text-[10px] text-slate-500 mt-0.5">{new Date(item.date).toLocaleDateString()}</p>}
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-light max-w-sm whitespace-normal leading-relaxed">
                          {item.message}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteItem('inquiries', item.id)}
                            className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-1.5 rounded-lg hover:bg-rose-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
