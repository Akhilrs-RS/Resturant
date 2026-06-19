import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  User, 
  BedDouble, 
  Utensils, 
  Printer, 
  CreditCard, 
  IndianRupee, 
  Calendar,
  X,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function BillingInvoice({ 
  rooms, 
  billingHistory, 
  onSettleCheckout, 
  forcedActiveRoomId,
  clearForcedActiveRoomId 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState(forcedActiveRoomId || '');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printInvoiceData, setPrintInvoiceData] = useState(null);

  // Sync forced selection from Room panel if triggered
  React.useEffect(() => {
    if (forcedActiveRoomId) {
      setSelectedRoomId(forcedActiveRoomId);
    }
  }, [forcedActiveRoomId]);

  // Filters historical invoices
  const filteredHistory = billingHistory.filter(inv => {
    return inv.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (inv.roomCharged && inv.roomCharged.toString().includes(searchTerm));
  });

  // Rooms currently occupied and awaiting checkout
  const occupiedRooms = rooms.filter(r => r.status === 'Booked' && r.currentGuest);
  
  // Find currently selected room for checkout details
  const activeCheckoutRoom = rooms.find(r => r.id === parseInt(selectedRoomId));

  // Billing Math
  const roomStayCost = activeCheckoutRoom?.currentGuest?.roomCharges || 0;
  const restaurantCost = activeCheckoutRoom?.currentGuest?.foodCharges || 0;
  const subtotal = roomStayCost + restaurantCost;
  const discount = parseFloat(discountAmount) || 0;
  const subtotalAfterDiscount = Math.max(0, subtotal - discount);
  const tax = subtotalAfterDiscount * 0.12;
  const finalBillAmount = subtotalAfterDiscount + tax;

  const handleCheckoutSettle = () => {
    if (!activeCheckoutRoom) return;

    const invoicePayload = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      guestName: activeCheckoutRoom.currentGuest.name,
      roomCharged: activeCheckoutRoom.id,
      roomAmount: roomStayCost,
      restaurantAmount: restaurantCost,
      tax: tax,
      discount: discount,
      total: finalBillAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      paymentMethod
    };

    onSettleCheckout(activeCheckoutRoom.id, invoicePayload);
    
    // Clear selections
    setPrintInvoiceData(invoicePayload);
    setShowPrintModal(true);
    setSelectedRoomId('');
    setDiscountAmount(0);
    if (clearForcedActiveRoomId) {
      clearForcedActiveRoomId();
    }
  };

  const handlePrintHistorical = (invoice) => {
    setPrintInvoiceData(invoice);
    setShowPrintModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-indigo-400" />
          Billing & Invoicing Panel
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Settle checked-out room stays, compute dining ledger lists, and print receipts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Hand: Settle Active Stay Checkout (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-5">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <BedDouble className="w-4 h-4 text-indigo-400" />
              Guest Checkout Settlement
            </h3>

            {/* Select Room */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Select Room Awaiting Checkout</label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full glass-input text-sm py-2 px-3 rounded-lg bg-slate-900 focus:outline-none"
              >
                <option value="">-- Choose Room --</option>
                {occupiedRooms.map(room => (
                  <option key={room.id} value={room.id}>
                    Room {room.id} - {room.currentGuest.name}
                  </option>
                ))}
              </select>
            </div>

            {activeCheckoutRoom ? (
              <div className="space-y-5 border-t border-slate-800/60 pt-4 animate-in fade-in duration-200">
                {/* Guest Profile Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-850">
                  <div className="space-y-1 text-xs">
                    <p className="text-slate-500 uppercase tracking-wider font-bold text-[9px]">Guest Information</p>
                    <p className="font-bold text-slate-200 text-sm">{activeCheckoutRoom.currentGuest.name}</p>
                    <p className="text-slate-400">{activeCheckoutRoom.currentGuest.email}</p>
                  </div>
                  <div className="space-y-1 text-xs sm:border-l sm:border-slate-800 sm:pl-4">
                    <p className="text-slate-500 uppercase tracking-wider font-bold text-[9px]">Stay Schedule</p>
                    <p className="font-semibold text-slate-200">
                      {activeCheckoutRoom.currentGuest.checkIn} to {activeCheckoutRoom.currentGuest.checkOut}
                    </p>
                    <p className="text-indigo-400 font-bold">{activeCheckoutRoom.currentGuest.nights} Nights Stayed</p>
                  </div>
                </div>

                {/* Detailed Item Ledger */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">Accounting Ledger</h4>
                  <div className="space-y-2">
                    {/* Accommodation Charges */}
                    <div className="flex justify-between items-center bg-slate-950/20 p-3 rounded-xl border border-slate-800/40">
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-indigo-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-200">Room Accommodation ({activeCheckoutRoom.type})</p>
                          <p className="text-[10px] text-slate-500">₹{activeCheckoutRoom.price} / night x {activeCheckoutRoom.currentGuest.nights} nights</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-200">₹{roomStayCost.toFixed(2)}</span>
                    </div>

                    {/* Food & Bistro Charges */}
                    <div className="flex justify-between items-center bg-slate-950/20 p-3 rounded-xl border border-slate-800/40">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-amber-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-200">Bistro & Room Service Dining</p>
                          <p className="text-[10px] text-slate-500">Consolidated restaurant tickets charged to room</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-200">₹{restaurantCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Settle Panel Calculations */}
                <div className="border-t border-slate-800/60 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Controls */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Discount (₹)</label>
                      <input 
                        type="number"
                        min="0"
                        placeholder="Discount amount"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        className="w-full glass-input text-xs py-1.5 px-3 rounded-lg"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payment Method</label>
                      <div className="flex gap-2">
                        {['Card', 'Cash', 'Online'].map(method => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`flex-1 text-[11px] font-bold py-1.5 rounded-lg border transition-all ${
                              paymentMethod === method 
                                ? 'bg-indigo-600/35 border-indigo-500 text-indigo-200' 
                                : 'bg-slate-950/50 border-slate-850 text-slate-400 hover:text-slate-300'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Output */}
                  <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-850 flex flex-col justify-between space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-200">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Discount</span>
                      <span className="font-semibold text-rose-400">-₹{discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>12% VAT / Taxes</span>
                      <span className="font-semibold text-slate-200">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-bold">
                      <span className="text-slate-200">Amount Due</span>
                      <span className="text-emerald-400">₹{finalBillAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Settle Action */}
                <button
                  onClick={handleCheckoutSettle}
                  className="w-full glass-btn bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 active:scale-95 transition-all"
                >
                  <CheckCircle className="w-4.5 h-4.5" />
                  Settle Payment & Check-Out Guest
                </button>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-slate-850 rounded-xl">
                Please select an active occupied guest room above to process and settle checkout balances.
              </div>
            )}
          </div>
        </div>

        {/* Right Hand: Transaction logs (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Receipt className="w-4 h-4 text-indigo-400" />
              Settle History Ledger
            </h3>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search history by guest/room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full glass-input pl-9 text-xs py-1.5 rounded-lg"
              />
            </div>

            {/* List */}
            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {filteredHistory.map((invoice) => (
                <div 
                  key={invoice.id}
                  className="bg-slate-950/30 p-3 rounded-xl border border-slate-850 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{invoice.id}</span>
                      <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-semibold">{invoice.date}</span>
                    </div>
                    <p className="text-slate-400 font-medium truncate mt-1">Guest: {invoice.guestName}</p>
                    <p className="text-[10px] text-slate-500">
                      {invoice.roomCharged ? `Room ${invoice.roomCharged} Check-out` : 'Walk-in Diner'}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-200">₹{invoice.total.toFixed(2)}</p>
                    <button
                      onClick={() => handlePrintHistorical(invoice)}
                      className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 mt-1 flex items-center gap-1 ml-auto"
                    >
                      <Printer className="w-3 h-3" />
                      Invoice
                    </button>
                  </div>
                </div>
              ))}
              {filteredHistory.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500">
                  No invoices matched search terms.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Printable Receipt Preview Modal */}
      {showPrintModal && printInvoiceData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setShowPrintModal(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          <div className="glass-panel w-full max-w-sm rounded-3xl border border-slate-800 p-6 relative z-10 animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowPrintModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Invoice Layout */}
            <div id="print-area" className="text-slate-300 font-serif space-y-5 text-center mt-2">
              <div>
                <h3 className="text-lg font-bold tracking-wider text-slate-100 font-sans uppercase">GUSTO & STAY</h3>
                <p className="text-[10px] text-slate-500 font-sans mt-0.5">100 Boutique Vista, Ocean Boulevard</p>
                <p className="text-[9px] text-slate-500 font-sans">Phone: +1 (555) 019-9283</p>
              </div>

              <div className="border-y border-dashed border-slate-850 py-3 text-left space-y-1 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span>Invoice Ref:</span>
                  <span className="text-slate-100 font-semibold">{printInvoiceData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date Issued:</span>
                  <span>{printInvoiceData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guest Name:</span>
                  <span className="text-slate-100 font-semibold">{printInvoiceData.guestName}</span>
                </div>
                {printInvoiceData.roomCharged && (
                  <div className="flex justify-between">
                    <span>Room Settled:</span>
                    <span>Room {printInvoiceData.roomCharged}</span>
                  </div>
                )}
                {printInvoiceData.paymentMethod && (
                  <div className="flex justify-between">
                    <span>Paid Via:</span>
                    <span>{printInvoiceData.paymentMethod}</span>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="text-left text-[11px] font-mono space-y-2">
                <p className="font-bold border-b border-slate-850 pb-1 uppercase tracking-wider font-sans text-[9px] text-slate-500">Summary of Charges</p>
                
                {printInvoiceData.roomAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Room Accommodation</span>
                    <span>₹{printInvoiceData.roomAmount.toFixed(2)}</span>
                  </div>
                )}
                
                {printInvoiceData.restaurantAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Bistro & Room Food</span>
                    <span>₹{printInvoiceData.restaurantAmount.toFixed(2)}</span>
                  </div>
                )}

                {printInvoiceData.discount > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Staff Discount Deduction</span>
                    <span>-₹{printInvoiceData.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-slate-900 pt-1">
                  <span>Taxes (12% VAT)</span>
                  <span>₹{printInvoiceData.tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t border-dashed border-slate-800 pt-2 font-bold text-sm text-slate-100">
                  <span>Invoice Total</span>
                  <span className="text-emerald-400">₹{printInvoiceData.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-4">
                <p className="text-[10px] text-slate-400 italic">Thank you for stay and dining with us!</p>
                <p className="text-[8px] text-slate-500 uppercase tracking-widest font-sans font-bold">Please retain this receipt for tax purposes</p>
              </div>
            </div>

            {/* Print Trigger */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 glass-btn-primary text-xs py-2"
              >
                <Printer className="w-4 h-4" />
                Trigger Print
              </button>
              <button
                onClick={() => setShowPrintModal(false)}
                className="flex-1 glass-btn-secondary text-xs py-2"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
