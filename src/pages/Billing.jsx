import React from 'react';
import BillingInvoice from '../components/BillingInvoice';

export default function Billing({ 
  rooms, 
  billingHistory, 
  onSettleCheckout, 
  forcedActiveRoomId, 
  clearForcedActiveRoomId 
}) {
  return (
    <div className="space-y-6">
      <BillingInvoice 
        rooms={rooms}
        billingHistory={billingHistory}
        onSettleCheckout={onSettleCheckout}
        forcedActiveRoomId={forcedActiveRoomId}
        clearForcedActiveRoomId={clearForcedActiveRoomId}
      />
    </div>
  );
}
