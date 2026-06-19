import React from 'react';
import { Layout, Check, Sparkles, ChefHat, Receipt, AlertCircle } from 'lucide-react';

export default function TableMap({ tables, activeTableId, onSelectTable, onToggleTableStatus }) {
  const getTableStatusStyle = (status, isActive) => {
    if (isActive) {
      return 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/40 shadow-indigo-500/20';
    }
    
    switch (status) {
      case 'Vacant':
        return 'border-emerald-500/40 bg-emerald-500/[0.04] text-emerald-300 hover:border-emerald-500 hover:bg-emerald-500/[0.08]';
      case 'Dining':
        return 'border-indigo-500/40 bg-indigo-500/[0.04] text-indigo-300 hover:border-indigo-500 hover:bg-indigo-500/[0.08]';
      case 'Reserved':
        return 'border-amber-500/40 bg-amber-500/[0.04] text-amber-300 hover:border-amber-500 hover:bg-amber-500/[0.08]';
      default:
        return 'border-slate-800 bg-slate-900/40 text-slate-400';
    }
  };

  const getTableStatusLight = (status) => {
    switch (status) {
      case 'Vacant':
        return 'bg-emerald-400 pulse-glow-emerald';
      case 'Dining':
        return 'bg-indigo-400 pulse-glow-indigo';
      case 'Reserved':
        return 'bg-amber-400 pulse-glow-amber';
      default:
        return 'bg-slate-400';
    }
  };

  // Group tables into physical sections to make it look like a real architectural map
  const indoorTables = tables.filter(t => t.id <= 4);
  const vipTables = tables.filter(t => t.name.includes('VIP'));
  const terraceTables = tables.filter(t => t.name.includes('Terrace'));

  const renderTable = (table) => {
    const isActive = activeTableId === table.id;
    const style = getTableStatusStyle(table.status, isActive);
    const light = getTableStatusLight(table.status);
    
    // Determine shape representation based on capacity
    const shapeClass = table.capacity <= 2 
      ? 'rounded-full w-24 h-24' 
      : table.capacity <= 4 
        ? 'rounded-2xl w-28 h-24' 
        : 'rounded-xl w-36 h-24';

    return (
      <div
        key={table.id}
        onClick={() => onSelectTable(table)}
        className={`border p-3 flex flex-col justify-between items-center cursor-pointer transition-all duration-300 select-none glass-panel relative ${shapeClass} ${style}`}
      >
        {/* Table Label */}
        <span className="text-xs font-semibold text-slate-400">{table.name}</span>
        
        {/* Indicators */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-bold text-slate-100">{table.capacity}p</span>
          {table.activeOrder && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-full">
              {table.activeOrder.items.some(i => i.status === 'Cooking' || i.status === 'Pending') ? (
                <ChefHat className="w-3 h-3 text-amber-400" />
              ) : (
                <Check className="w-3 h-3 text-emerald-400" />
              )}
              <span>₹{table.activeOrder.total.toFixed(0)}</span>
            </div>
          )}
        </div>

        {/* Live Status indicator */}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${light}`} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Layout className="w-5 h-5 text-indigo-400" />
          Bistro Layout Map
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Click a table block to place orders, allocate guests, or manage tickets</p>
      </div>

      <div className="space-y-8 bg-slate-900/20 p-6 rounded-3xl border border-slate-900/60 backdrop-blur-xs">
        {/* Section 1: Indoor Dining Hall */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 border-l-2 border-indigo-500/50">Indoor Main Hall</h3>
          <div className="flex flex-wrap gap-4">
            {indoorTables.map(renderTable)}
          </div>
        </div>

        {/* Section 2: VIP Booths */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 border-l-2 border-amber-500/50">VIP Lounge Section</h3>
          <div className="flex flex-wrap gap-4">
            {vipTables.map(renderTable)}
          </div>
        </div>

        {/* Section 3: Terrace Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 border-l-2 border-emerald-500/50">Outdoor Skyline Terrace</h3>
          <div className="flex flex-wrap gap-4">
            {terraceTables.map(renderTable)}
          </div>
        </div>
      </div>

      {/* Legends */}
      <div className="flex items-center gap-6 text-xs text-slate-400 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
        <span className="font-semibold text-slate-500">Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-glow-emerald" />
          <span>Vacant Table</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 pulse-glow-indigo" />
          <span>Dining (Active Order)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 pulse-glow-amber" />
          <span>Reserved Spot</span>
        </div>
      </div>
    </div>
  );
}
