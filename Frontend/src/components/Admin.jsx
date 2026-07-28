import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, Utensils, RefreshCw, Trash2, Check, Send, AlertTriangle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5210/api';

export default function Admin({ handleScrollTo, setCurrentPage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('suites');
  const [dbConnected, setDbConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lists states
  const [suiteBookings, setSuiteBookings] = useState([]);
  const [tableReservations, setTableReservations] = useState([]);
  const [poolBookings, setPoolBookings] = useState([]);
  const [loungeReservations, setLoungeReservations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [catalogPrices, setCatalogPrices] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const [editPriceValue, setEditPriceValue] = useState('');
  const [editPriceImage, setEditPriceImage] = useState('');
  const [editRoomTitle, setEditRoomTitle] = useState('');
  const [editRoomDesc, setEditRoomDesc] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'thabasya2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid username or password.');
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    if (recoveryEmail.trim()) {
      setRecoverySuccess(true);
      setAuthError('');
    } else {
      setAuthError('Please enter a valid email address.');
    }
  };

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

      // 6. Fetch Catalog Prices
      const resPrices = await fetch(`${API_BASE_URL}/catalog/prices`);
      if (resPrices.ok) {
        const data = await resPrices.json();
        setCatalogPrices(data || []);
      }

      setDbConnected(true);

    } catch (err) {
      console.error("API Server connection error:", err);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  // Action Handlers
  const handleSavePrice = async (itemKey) => {
    try {
      const response = await fetch(`${API_BASE_URL}/catalog/prices/${itemKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: parseFloat(editPriceValue),
          imageUrl: editPriceImage || undefined
        })
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setCatalogPrices(prev =>
          prev.map(p => p.itemKey === itemKey ? updatedItem : p)
        );
        setEditingKey(null);
        setEditPriceImage('');
        alert("Price details updated successfully!");
      } else {
        alert("Failed to update price details.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend database server.");
    }
  };

  const handleSaveRoomDetails = async (itemKey) => {
    try {
      const response = await fetch(`${API_BASE_URL}/catalog/prices/${itemKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          price: parseFloat(editPriceValue),
          displayName: editRoomTitle,
          description: editRoomDesc,
          imageUrl: editPriceImage || undefined
        })
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setCatalogPrices(prev =>
          prev.map(p => p.itemKey === itemKey ? updatedItem : p)
        );
        setEditingKey(null);
        setEditPriceImage('');
        alert("Suite details and image updated successfully!");
      } else {
        alert("Failed to update suite details.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend database server.");
    }
  };

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

  if (!isAuthenticated) {
    return (
      <div className="bg-[#0b121f] min-h-screen text-slate-100 font-sans flex items-center justify-center p-6 select-none">
        <div className="w-full max-w-md bg-[#121a28] border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
          
          {/* Logo / Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-resort-gold rounded-2xl flex items-center justify-center text-stone-950 font-serif font-bold text-xl mb-3">
              E
            </div>
            <h2 className="font-serif text-2xl font-light text-white tracking-wide">
              {recoveryMode ? 'Reset Password' : 'Admin Login'}
            </h2>
            <p className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold mt-1">
              Thabasiya Resort Console
            </p>
          </div>

          {authError && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-3 text-xs mb-6 text-center">
              {authError}
            </div>
          )}

          {recoveryMode ? (
            /* Forgot Password / Recovery mode */
            recoverySuccess ? (
              <div className="text-center space-y-4">
                <div className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-xs leading-relaxed">
                  A password reset link has been sent to <strong>{recoveryEmail}</strong>. Please check your inbox.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRecoveryMode(false);
                    setRecoverySuccess(false);
                    setRecoveryEmail('');
                    setAuthError('');
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-slate-400 font-semibold block mb-2">EMAIL ADDRESS</label>
                  <input
                    required
                    type="email"
                    placeholder="Enter your registered email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    className="w-full bg-[#182333] border border-slate-700 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold placeholder-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-resort-gold hover:bg-resort-gold/80 text-stone-950 text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-205 active:scale-98"
                >
                  Send Reset Link
                </button>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryMode(false);
                      setAuthError('');
                    }}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel &amp; Return to Login
                  </button>
                </div>
              </form>
            )
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] tracking-wider uppercase text-slate-400 font-semibold block mb-2">USERNAME</label>
                <input
                  required
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#182333] border border-slate-700 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold placeholder-slate-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] tracking-wider uppercase text-slate-400 font-semibold">PASSWORD</label>
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryMode(true);
                      setAuthError('');
                    }}
                    className="text-[10px] text-resort-gold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  required
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#182333] border border-slate-700 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-resort-gold placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-resort-gold hover:bg-resort-gold/80 text-stone-950 text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-200 active:scale-98 mt-2"
              >
                Log In
              </button>
            </form>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121a28] min-h-screen text-slate-100 font-sans select-none flex flex-col">
      
      {/* HEADER BAR */}
      <header className="bg-[#0b121f] border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-resort-gold rounded-xl flex items-center justify-center text-stone-950 font-serif font-bold text-lg">
            E
          </div>
          <div>
            <h1 className="font-serif text-lg font-light tracking-wide text-white">Thabasiya Resorts</h1>
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

          <button
            onClick={() => {
              setIsAuthenticated(false);
              sessionStorage.removeItem('admin_auth');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-colors"
          >
            Sign Out
          </button>
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

          <div className="pt-6">
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4 font-sans">SETTINGS</p>
            <button
              onClick={() => setActiveTab('prices')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeTab === 'prices' 
                  ? 'bg-resort-gold text-stone-950 font-bold' 
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <RefreshCw className="w-4 h-4" /> Manage Catalog Prices
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 mt-2 ${
                activeTab === 'rooms' 
                  ? 'bg-resort-gold text-stone-950 font-bold' 
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" /> Manage Rooms &amp; Suites
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
                {activeTab === 'prices' && 'Manage Catalog Rates'}
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

              {/* 6. CATALOG PRICES TABLE */}
              {activeTab === 'prices' && (
                <table className="w-full text-xs text-left min-w-[600px]">
                  <thead className="bg-[#121b2a] text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Item Name</th>
                      <th className="px-6 py-4">Rate (INR)</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {catalogPrices.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4">
                          <span className="bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-md uppercase">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">
                          <div className="flex items-center gap-3">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.displayName}
                                className="w-8 h-8 rounded-md object-cover border border-slate-700"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 text-[10px]" title="Default Asset Image">
                                Img
                              </div>
                            )}
                            <span>{item.displayName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {editingKey === item.itemKey ? (
                            <div className="space-y-2">
                              <input 
                                type="number"
                                value={editPriceValue}
                                onChange={(e) => setEditPriceValue(e.target.value)}
                                className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1 w-28 text-xs focus:outline-none focus:border-resort-gold"
                              />
                              {item.category === "Suites" && (
                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-400 block font-semibold uppercase tracking-wider">Upload Suite Image</label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          setEditPriceImage(reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-slate-850 file:text-slate-200 hover:file:bg-slate-750 cursor-pointer"
                                  />
                                  {editPriceImage && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-[9px] text-emerald-400 font-semibold">Selected</span>
                                      <button
                                        type="button"
                                        onClick={() => setEditPriceImage('')}
                                        className="text-[9px] text-rose-400 hover:underline"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="font-mono text-resort-gold font-bold">₹{item.price.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {editingKey === item.itemKey ? (
                            <>
                              <button 
                                onClick={() => handleSavePrice(item.itemKey)}
                                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors"
                              >
                                Save
                              </button>
                              <button 
                                onClick={() => {
                                  setEditingKey(null);
                                  setEditPriceImage('');
                                }}
                                className="bg-slate-700 border border-slate-600 text-slate-300 px-3 py-1 rounded-lg hover:bg-slate-600 hover:text-white transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => {
                                setEditingKey(item.itemKey);
                                setEditPriceValue(item.price);
                                setEditPriceImage(item.imageUrl || '');
                              }}
                              className="bg-resort-gold/10 border border-resort-gold/30 text-resort-gold px-3 py-1 rounded-lg hover:bg-resort-gold hover:text-stone-950 transition-colors"
                            >
                              Edit Rate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* 7. MANAGE ROOMS & SUITES (GRID OF EDITABLE CARDS) */}
              {activeTab === 'rooms' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {catalogPrices.filter(item => item.category === 'Suites').map((room) => {
                    const isEditingThis = editingKey === room.itemKey;
                    return (
                      <div key={room.id} className="bg-[#121b2a] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                        
                        {/* Image Preview */}
                        <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                          {(isEditingThis ? (editPriceImage || room.imageUrl) : room.imageUrl) ? (
                            <img 
                              src={isEditingThis ? (editPriceImage || room.imageUrl) : room.imageUrl} 
                              alt={room.displayName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-slate-500 text-xs text-center flex flex-col items-center gap-2">
                              <Shield className="w-8 h-8 text-slate-650" />
                              No custom image uploaded. Using default system asset.
                            </div>
                          )}
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider mb-2">Room Title</label>
                            {isEditingThis ? (
                              <input 
                                type="text"
                                value={editRoomTitle}
                                onChange={(e) => setEditRoomTitle(e.target.value)}
                                className="w-full bg-[#182333] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-resort-gold"
                              />
                            ) : (
                              <h3 className="font-serif text-lg font-light text-white">{room.displayName}</h3>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider mb-2">Nightly Rate (INR)</label>
                              {isEditingThis ? (
                                <input 
                                  type="number"
                                  value={editPriceValue}
                                  onChange={(e) => setEditPriceValue(e.target.value)}
                                  className="w-full bg-[#182333] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-resort-gold"
                                />
                              ) : (
                                <span className="font-mono text-resort-gold font-bold text-sm">₹{room.price.toLocaleString()}</span>
                              )}
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider mb-2">Category Key</label>
                              <span className="font-mono text-xs text-slate-500 block py-2">{room.itemKey}</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider mb-2">Description</label>
                            {isEditingThis ? (
                              <textarea
                                rows={3}
                                value={editRoomDesc}
                                onChange={(e) => setEditRoomDesc(e.target.value)}
                                className="w-full bg-[#182333] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-resort-gold resize-none"
                              />
                            ) : (
                              <p className="text-slate-400 text-xs font-light leading-relaxed">{room.description || 'No description configured.'}</p>
                            )}
                          </div>

                          {isEditingThis && (
                            <div>
                              <label className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider mb-2">Upload Custom Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setEditPriceImage(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer w-full"
                              />
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-3">
                          {isEditingThis ? (
                            <>
                              <button 
                                onClick={() => handleSaveRoomDetails(room.itemKey)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                              >
                                Save Changes
                              </button>
                              <button 
                                onClick={() => {
                                  setEditingKey(null);
                                  setEditPriceImage('');
                                }}
                                className="bg-slate-800 hover:bg-slate-750 text-slate-300 px-4 py-2 rounded-xl text-xs transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => {
                                setEditingKey(room.itemKey);
                                setEditPriceValue(room.price);
                                setEditRoomTitle(room.displayName);
                                setEditRoomDesc(room.description || '');
                                setEditPriceImage(room.imageUrl || '');
                              }}
                              className="bg-resort-gold hover:bg-resort-gold/80 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
                            >
                              Edit Suite Details
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
