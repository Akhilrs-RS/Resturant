import React, { useState } from 'react';
import { 
  Plus, 
  User, 
  Calendar, 
  Layers, 
  Trash2, 
  Sparkles, 
  Wrench, 
  Info, 
  X, 
  CheckCircle,
  FileText
} from 'lucide-react';

export default function RoomGrid({ rooms, onCheckIn, onCleanRoom, onMaintenanceRoom, onTriggerBillingTab }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  
  // Check-In Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-06-18');
  const [checkOutDate, setCheckOutDate] = useState('2026-06-22');
  const [nights, setNights] = useState(4);

  // Filter Logic
  const filteredRooms = rooms.filter(room => {
    const typeMatch = filterType === 'All' || room.type === filterType;
    const statusMatch = filterStatus === 'All' || room.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
          dot: 'bg-emerald-400 pulse-glow-emerald',
          badge: 'bg-emerald-500/20 text-emerald-300'
        };
      case 'Booked':
        return {
          bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
          dot: 'bg-indigo-400 pulse-glow-indigo',
          badge: 'bg-indigo-500/20 text-indigo-300'
        };
      case 'Cleaning':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
          dot: 'bg-amber-400 pulse-glow-amber',
          badge: 'bg-amber-500/20 text-amber-300'
        };
      case 'Maintenance':
        return {
          bg: 'bg-rose-500/10 border-rose-500/20 text-rose-300',
          dot: 'bg-rose-400 pulse-glow-rose',
          badge: 'bg-rose-500/20 text-rose-300'
        };
      default:
        return {
          bg: 'bg-slate-500/10 border-slate-500/20 text-slate-300',
          dot: 'bg-slate-400',
          badge: 'bg-slate-500/20 text-slate-300'
        };
    }
  };

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestEmail) {
      alert("Please fill in guest details.");
      return;
    }
    
    const calculatedRoomCharges = selectedRoom.price * nights;
    
    onCheckIn(selectedRoom.id, {
      name: guestName,
      email: guestEmail,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: parseInt(nights),
      foodCharges: 0.00,
      roomCharges: calculatedRoomCharges
    });

    // Reset Form
    setGuestName('');
    setGuestEmail('');
    setShowCheckInModal(false);
    setSelectedRoom(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters & Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Rooms Board
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage room bookings, cleaning, and maintenance tasks</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Room Class */}
          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            {['All', 'Suite', 'Deluxe', 'Standard', 'Single'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  filterType === type 
                    ? 'bg-indigo-600/35 text-indigo-200 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type}s
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            {['All', 'Available', 'Booked', 'Cleaning', 'Maintenance'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  filterStatus === status 
                    ? 'bg-slate-800 text-slate-200' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Room Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredRooms.map(room => {
            const styles = getStatusColor(room.status);
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`glass-panel p-4.5 rounded-2xl border cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                  selectedRoom?.id === room.id 
                    ? 'border-indigo-500/70 bg-indigo-500/[0.03] ring-1 ring-indigo-500/30' 
                    : 'border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/80'
                }`}
              >
                {/* Accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  room.status === 'Available' ? 'from-emerald-500 to-teal-500' :
                  room.status === 'Booked' ? 'from-indigo-500 to-violet-500' :
                  room.status === 'Cleaning' ? 'from-amber-500 to-yellow-500' :
                  'from-rose-500 to-pink-500'
                }`} />

                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xl font-bold text-slate-100 tracking-tight">
                    {room.id}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badge}`}>
                    {room.type}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Rate / Night</span>
                  <span className="text-sm font-bold text-slate-100">₹{room.price}</span>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                    <span className="text-xs font-semibold text-slate-300">{room.status}</span>
                  </div>
                  {room.currentGuest && (
                    <span className="text-[10px] text-slate-500 font-medium truncate max-w-[90px]">
                      {room.currentGuest.name.split(' ')[0]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Room Details Sidebar / Drawer */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-6">
          {selectedRoom ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Room {selectedRoom.id}</h3>
                  <span className="text-xs text-indigo-400 font-semibold">{selectedRoom.type} Room</span>
                </div>
                <button 
                  onClick={() => setSelectedRoom(null)}
                  className="text-slate-500 hover:text-slate-300 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status & Options */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status & Operations</h4>
                <div className="grid grid-cols-2 gap-2">
                  {/* Clean Action */}
                  {selectedRoom.status === 'Cleaning' && (
                    <button
                      onClick={() => {
                        onCleanRoom(selectedRoom.id);
                        setSelectedRoom(prev => ({ ...prev, status: 'Available' }));
                      }}
                      className="col-span-2 glass-btn bg-emerald-600/30 text-emerald-300 border-emerald-500/25 hover:bg-emerald-600/50 flex items-center justify-center gap-2 text-xs py-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Mark Clean & Ready
                    </button>
                  )}

                  {/* Maintenance Action */}
                  {selectedRoom.status === 'Available' && (
                    <button
                      onClick={() => {
                        onMaintenanceRoom(selectedRoom.id, true);
                        setSelectedRoom(prev => ({ ...prev, status: 'Maintenance' }));
                      }}
                      className="col-span-2 glass-btn bg-rose-600/30 text-rose-300 border-rose-500/25 hover:bg-rose-600/50 flex items-center justify-center gap-2 text-xs py-2"
                    >
                      <Wrench className="w-4 h-4" />
                      Set Out of Order
                    </button>
                  )}

                  {selectedRoom.status === 'Maintenance' && (
                    <button
                      onClick={() => {
                        onMaintenanceRoom(selectedRoom.id, false);
                        setSelectedRoom(prev => ({ ...prev, status: 'Available' }));
                      }}
                      className="col-span-2 glass-btn bg-emerald-600/30 text-emerald-300 border-emerald-500/25 hover:bg-emerald-600/50 flex items-center justify-center gap-2 text-xs py-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Restore to Service
                    </button>
                  )}

                  {/* Check-in Trigger */}
                  {selectedRoom.status === 'Available' && (
                    <button
                      onClick={() => setShowCheckInModal(true)}
                      className="col-span-2 glass-btn bg-indigo-600/80 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 text-xs py-2 shadow-lg shadow-indigo-500/10"
                    >
                      <Plus className="w-4 h-4" />
                      Check-In Guest
                    </button>
                  )}

                  {/* Check-out Settle Trigger */}
                  {selectedRoom.status === 'Booked' && (
                    <button
                      onClick={() => onTriggerBillingTab(selectedRoom.id)}
                      className="col-span-2 glass-btn bg-violet-600/85 hover:bg-violet-500 text-white flex items-center justify-center gap-2 text-xs py-2 shadow-lg shadow-violet-500/10"
                    >
                      <FileText className="w-4 h-4" />
                      Checkout & Invoice
                    </button>
                  )}
                </div>
              </div>

              {/* Guest Information */}
              {selectedRoom.status === 'Booked' && selectedRoom.currentGuest ? (
                <div className="space-y-4 border-t border-slate-800/60 pt-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Guest Information</h4>
                  
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-400">Primary Guest</p>
                        <p className="text-sm font-bold text-slate-200 truncate">{selectedRoom.currentGuest.name}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500 pl-11 truncate">{selectedRoom.currentGuest.email}</p>

                    <div className="flex items-center gap-3 pt-2 border-t border-slate-800/30">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Stay Duration</p>
                        <p className="text-xs font-semibold text-slate-200">
                          {selectedRoom.currentGuest.checkIn} to {selectedRoom.currentGuest.checkOut}
                        </p>
                        <p className="text-[10px] text-indigo-400 font-medium">{selectedRoom.currentGuest.nights} Nights Total</p>
                      </div>
                    </div>
                  </div>

                  {/* Financials Summary */}
                  <div className="space-y-2.5">
                    <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Live Charges</h5>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Room Stay ({selectedRoom.currentGuest.nights} nights)</span>
                        <span className="font-semibold text-slate-200">₹{selectedRoom.currentGuest.roomCharges.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dining Charges (Charged to Room)</span>
                        <span className="font-semibold text-amber-400">₹{selectedRoom.currentGuest.foodCharges.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-800/40 pt-2 font-bold text-sm">
                        <span className="text-slate-200">Total Accumulation</span>
                        <span className="text-indigo-400">
                          ₹{(selectedRoom.currentGuest.roomCharges + selectedRoom.currentGuest.foodCharges).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Room Specifications */}
              <div className="space-y-3 border-t border-slate-800/60 pt-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Features & Specs</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRoom.features.map((feat, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-semibold bg-slate-900 border border-slate-800/80 text-slate-400 px-2 py-1 rounded-md"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <Info className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400 font-medium">Select a room card to view guest sheets, execute check-in actions, or toggle maintenance status.</p>
            </div>
          )}
        </div>
      </div>

      {/* Check-In Modal */}
      {showCheckInModal && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setShowCheckInModal(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          
          {/* Modal Box */}
          <div className="glass-panel w-full max-w-md rounded-3xl border border-slate-800 p-6 relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">Check-In Guest</h3>
                <p className="text-xs text-indigo-400 font-semibold">Room {selectedRoom.id} • {selectedRoom.type} Class</p>
              </div>
              <button 
                onClick={() => setShowCheckInModal(false)}
                className="text-slate-500 hover:text-slate-300 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckInSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Guest Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full glass-input text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Guest Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. johndoe@gmail.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full glass-input text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Check-In Date</label>
                  <input 
                    type="date" 
                    required
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full glass-input text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Check-Out Date</label>
                  <input 
                    type="date" 
                    required
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full glass-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Nights</label>
                  <input 
                    type="number" 
                    required
                    min={1}
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                    className="w-full glass-input text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Est. Price</label>
                  <div className="text-sm font-bold text-emerald-400 py-2.5 pl-1">
                    ₹{(selectedRoom.price * nights).toFixed(2)}
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full glass-btn-primary mt-6 text-sm"
              >
                Confirm Room Assignment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
