import React, { useState } from 'react';
import { 
  Utensils, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ChefHat, 
  Receipt, 
  Hotel,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function POSSimulator({ 
  table, 
  rooms, 
  menu, 
  onAddToOrder, 
  onRemoveFromOrder, 
  onSendToKitchen, 
  onSettleOrder, 
  onChargeToRoom, 
  onSeatTable 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRoomId, setSelectedRoomId] = useState('');

  if (!table) {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 text-center py-16 space-y-3">
        <Utensils className="w-10 h-10 text-slate-600 mx-auto" />
        <p className="text-sm text-slate-400 font-medium">No table selected. Click on any table in the Bistro Map to open POS simulator and place orders.</p>
      </div>
    );
  }

  // Filter Menu Items
  const filteredMenu = menu.filter(item => {
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Calculate order metrics
  const orderItems = table.activeOrder?.items || [];
  const subtotal = table.activeOrder?.total || 0;
  const tax = subtotal * 0.12;
  const grandTotal = subtotal + tax;

  // Rooms with active guests for "Charge to Room" selection
  const occupiedRooms = rooms.filter(r => r.status === 'Booked' && r.currentGuest);

  const categories = ['All', 'Appetizers', 'Mains', 'Desserts', 'Drinks'];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Menu Catalog Section (8 Columns) */}
      <div className="xl:col-span-7 space-y-5">
        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search dishes or drinks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass-input pl-10 text-sm"
            />
          </div>
          <div className="flex gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80 overflow-x-auto shrink-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-slate-800 text-slate-200' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
          {filteredMenu.map(dish => (
            <div 
              key={dish.id}
              className="glass-panel p-4 rounded-xl border border-slate-800/60 hover:border-slate-700/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-sm font-bold text-slate-200 leading-tight">{dish.name}</h4>
                  <span className="text-xs font-bold text-indigo-400 shrink-0">${dish.price.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">{dish.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] bg-slate-800 text-slate-400 font-semibold px-2 py-0.5 rounded-md">
                  {dish.category}
                </span>
                
                {table.status === 'Dining' && (
                  <button
                    onClick={() => onAddToOrder(table.id, dish)}
                    className="w-7 h-7 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/20 flex items-center justify-center transition-all active:scale-90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POS Active Ticket (5 Columns) */}
      <div className="xl:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-5">
        <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-200">{table.name} Ticket</h3>
            <p className="text-[10px] text-slate-500 font-medium">Capacity: {table.capacity} diners</p>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
            table.status === 'Dining' ? 'bg-indigo-500/20 text-indigo-300' :
            table.status === 'Reserved' ? 'bg-amber-500/20 text-amber-300' :
            'bg-emerald-500/20 text-emerald-300'
          }`}>
            {table.status}
          </span>
        </div>

        {/* Dynamic Table State Actions */}
        {table.status === 'Vacant' && (
          <div className="space-y-4 py-6 text-center">
            <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="space-y-1.5 px-4">
              <p className="text-xs text-slate-400 font-semibold">Table is currently empty</p>
              <p className="text-[11px] text-slate-500">Seat walk-in customers or link a room reservation to activate order taking.</p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => onSeatTable(table.id, 'Dining')}
                className="glass-btn-primary text-xs py-2 px-4 font-semibold"
              >
                Seat Diners
              </button>
              <button
                onClick={() => onSeatTable(table.id, 'Reserved')}
                className="glass-btn-secondary text-xs py-2 px-4 font-semibold"
              >
                Reserve Table
              </button>
            </div>
          </div>
        )}

        {table.status === 'Reserved' && (
          <div className="space-y-4 py-6 text-center">
            <AlertCircle className="w-8 h-8 text-amber-500/50 mx-auto" />
            <div className="space-y-1.5 px-4">
              <p className="text-xs text-amber-400 font-semibold">Table is Reserved</p>
              <p className="text-[11px] text-slate-500">Seat the reserving party to open ordering features.</p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => onSeatTable(table.id, 'Dining')}
                className="glass-btn-primary text-xs py-2 px-4 font-semibold"
              >
                Arrived & Seated
              </button>
              <button
                onClick={() => onSeatTable(table.id, 'Vacant')}
                className="glass-btn-secondary text-xs py-2 px-4 font-semibold text-rose-400 hover:text-rose-300 border-rose-900/40"
              >
                Cancel Reservation
              </button>
            </div>
          </div>
        )}

        {table.status === 'Dining' && (
          <div className="space-y-5">
            {/* Ticket Item List */}
            {orderItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                Order sheet is empty. Add dishes from the menu catalog on the left.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {orderItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/60"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-200">{item.name}</span>
                        {item.status && (
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            item.status === 'Ready' ? 'bg-emerald-500/20 text-emerald-300' :
                            item.status === 'Cooking' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {item.status}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500">${(item.price * item.quantity).toFixed(2)} (${item.price.toFixed(2)} each)</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemoveFromOrder(table.id, item.id)}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 active:scale-90"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-200 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onAddToOrder(table.id, item)}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 active:scale-90"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Kitchen Submit Trigger */}
            {orderItems.some(i => !i.status) && (
              <button
                onClick={() => onSendToKitchen(table.id)}
                className="w-full glass-btn bg-amber-600/35 text-amber-300 border-amber-500/30 hover:bg-amber-600/50 text-xs py-2 flex items-center justify-center gap-2"
              >
                <ChefHat className="w-4 h-4 text-amber-400 animate-bounce" />
                Send New Items to Kitchen KDS
              </button>
            )}

            {/* Financial Summary */}
            <div className="border-t border-slate-800/60 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (12% VAT)</span>
                <span className="font-semibold text-slate-200">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/40 pt-2 text-sm font-bold">
                <span className="text-slate-100">Ticket Total</span>
                <span className="text-indigo-400">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Options */}
            <div className="space-y-2 pt-2 border-t border-slate-800/60">
              {/* Direct Settlement */}
              <button
                onClick={() => onSettleOrder(table.id, 'Cash')}
                disabled={orderItems.length === 0}
                className="w-full glass-btn-primary text-xs py-2.5 disabled:opacity-50 disabled:pointer-events-none"
              >
                <Receipt className="w-4 h-4" />
                Settle & Print Invoice (Paid Cash/Card)
              </button>

              {/* Room Link (Charge to Room) */}
              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Hotel className="w-3.5 h-3.5 text-indigo-400" />
                  Charge to Guest Room
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="flex-1 glass-input text-xs py-1.5 px-2.5 rounded-lg bg-slate-900 focus:outline-none"
                  >
                    <option value="">-- Choose Active Room --</option>
                    {occupiedRooms.map(room => (
                      <option key={room.id} value={room.id}>
                        Room {room.id} - {room.currentGuest.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      if (!selectedRoomId) {
                        alert("Select a guest room first.");
                        return;
                      }
                      onChargeToRoom(table.id, parseInt(selectedRoomId));
                      setSelectedRoomId('');
                    }}
                    disabled={orderItems.length === 0 || !selectedRoomId}
                    className="glass-btn bg-indigo-600/30 text-indigo-300 border-indigo-500/25 hover:bg-indigo-600/60 text-xs py-1.5 px-3 disabled:opacity-50"
                  >
                    Charge Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
