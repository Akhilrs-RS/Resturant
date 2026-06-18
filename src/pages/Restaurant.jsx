import React, { useState } from 'react';
import TableMap from '../components/TableMap';
import POSSimulator from '../components/POSSimulator';

export default function Restaurant({ 
  tables, 
  rooms, 
  menu, 
  onAddToOrder, 
  onRemoveFromOrder, 
  onSendToKitchen, 
  onSettleOrder, 
  onChargeToRoom, 
  onSeatTable 
}) {
  const [selectedTableId, setSelectedTableId] = useState(null);

  const activeTable = tables.find(t => t.id === selectedTableId);

  const handleSelectTable = (table) => {
    setSelectedTableId(table.id);
  };

  // Re-link table selections to verify orders
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Floor Layout Block */}
      <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-800/80">
        <TableMap 
          tables={tables}
          activeTableId={selectedTableId}
          onSelectTable={handleSelectTable}
        />
      </div>

      {/* Ordering Terminal Block */}
      <div className="lg:col-span-6">
        <POSSimulator 
          table={activeTable}
          rooms={rooms}
          menu={menu}
          onAddToOrder={onAddToOrder}
          onRemoveFromOrder={onRemoveFromOrder}
          onSendToKitchen={onSendToKitchen}
          onSettleOrder={onSettleOrder}
          onChargeToRoom={onChargeToRoom}
          onSeatTable={onSeatTable}
        />
      </div>
    </div>
  );
}
