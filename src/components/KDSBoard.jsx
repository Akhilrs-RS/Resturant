import React from 'react';
import { ChefHat, Timer, CheckSquare, Play, ClipboardList } from 'lucide-react';

export default function KDSBoard({ kds, onUpdateKDSItemStatus }) {
  
  // Calculate elapsed time (simulated based on system date or current date)
  const getElapsedTimeText = (timestamp) => {
    const orderTime = new Date(timestamp);
    const now = new Date("2026-06-18T16:55:00Z"); // Locked mock time matching local timezone
    const diffMs = now - orderTime;
    const diffMins = Math.max(0, Math.floor(diffMs / 60000));
    
    return {
      minutes: diffMins,
      isLate: diffMins >= 15
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-indigo-400" />
          Kitchen Display System (KDS)
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">Real-time tracking of orders sent to the cooking lines</p>
      </div>

      {/* Grid of KDS Tickets */}
      {kds.length === 0 ? (
        <div className="glass-panel p-10 rounded-2xl border border-slate-800/80 text-center py-20 space-y-3">
          <CheckSquare className="w-10 h-10 text-emerald-500/50 mx-auto" />
          <p className="text-sm text-slate-400 font-semibold">Kitchen Clear!</p>
          <p className="text-xs text-slate-500">No active tickets currently in preparation.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {kds.map((ticket) => {
            const timeInfo = getElapsedTimeText(ticket.timestamp);
            
            return (
              <div 
                key={ticket.id}
                className={`glass-panel rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 relative ${
                  timeInfo.isLate 
                    ? 'border-rose-500/40 shadow-lg shadow-rose-950/20' 
                    : 'border-slate-850 bg-slate-900/40 hover:border-slate-750'
                }`}
              >
                {/* Header card banner */}
                <div className={`p-4 flex items-center justify-between border-b ${
                  timeInfo.isLate 
                    ? 'bg-rose-950/25 border-rose-900/30' 
                    : 'bg-slate-950/40 border-slate-800/80'
                }`}>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{ticket.tableName}</h3>
                    <p className="text-[10px] text-slate-500 font-semibold">Ticket ID: {ticket.id}</p>
                  </div>
                  
                  <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                    timeInfo.isLate 
                      ? 'bg-rose-500/20 text-rose-300' 
                      : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    <Timer className={`w-3.5 h-3.5 ${timeInfo.isLate ? 'animate-spin' : ''}`} />
                    <span>{timeInfo.minutes} Mins Ago</span>
                  </div>
                </div>

                {/* Items list */}
                <div className="p-4 flex-1 space-y-3">
                  {ticket.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between bg-slate-950/20 p-3 rounded-xl border border-slate-800/40"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-slate-100">{item.quantity}x</span>
                          <p className="text-xs font-semibold text-slate-300 truncate">{item.name}</p>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">Status: <span className="font-semibold">{item.status}</span></p>
                      </div>

                      {/* Item state switches */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.status === 'Pending' && (
                          <button
                            onClick={() => onUpdateKDSItemStatus(ticket.id, item.id, 'Cooking')}
                            className="glass-btn bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/10 p-1.5 rounded-lg text-[10px] flex items-center gap-1"
                            title="Start cooking"
                          >
                            <Play className="w-3.5 h-3.5" />
                            Cook
                          </button>
                        )}
                        {item.status === 'Cooking' && (
                          <button
                            onClick={() => onUpdateKDSItemStatus(ticket.id, item.id, 'Ready')}
                            className="glass-btn bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/10 p-1.5 rounded-lg text-[10px] flex items-center gap-1"
                            title="Finish prep"
                          >
                            <CheckSquare className="w-3.5 h-3.5" />
                            Finish
                          </button>
                        )}
                        {item.status === 'Ready' && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md flex items-center gap-1">
                            <CheckSquare className="w-3 h-3" />
                            Ready
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer notes */}
                <div className="px-4 pb-4 pt-1 text-[10px] text-slate-500 flex items-center gap-1.5">
                  <ClipboardList className="w-3.5 h-3.5 text-slate-500" />
                  <span>Serve together when all items are flagged ready.</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
