import React from 'react';
import QuickStats from '../components/QuickStats';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Activity, Bell, ListTodo, BedDouble, ChefHat, Sparkles } from 'lucide-react';

export default function Dashboard({ rooms, tables, kds, billingHistory, setActiveTab }) {
  
  // Chart Data: Weekly Sales Trend (Mock)
  const revenueData = [
    { day: 'Mon', Bistro: 1240, Lodging: 2400 },
    { day: 'Tue', Bistro: 1580, Lodging: 2800 },
    { day: 'Wed', Bistro: 1890, Lodging: 2800 },
    { day: 'Thu', Bistro: 2100, Lodging: 3200 },
    { day: 'Fri', Bistro: 3200, Lodging: 4500 },
    { day: 'Sat', Bistro: 4100, Lodging: 5100 },
    { day: 'Sun', Bistro: 3500, Lodging: 3800 },
  ];

  // Room status breakdown for Pie Chart
  const roomStatusBreakdown = [
    { name: 'Available', value: rooms.filter(r => r.status === 'Available').length, color: '#10b981' },
    { name: 'Booked', value: rooms.filter(r => r.status === 'Booked').length, color: '#6366f1' },
    { name: 'Cleaning', value: rooms.filter(r => r.status === 'Cleaning').length, color: '#f59e0b' },
    { name: 'Maintenance', value: rooms.filter(r => r.status === 'Maintenance').length, color: '#f43f5e' },
  ];

  // Quick Action Alerts: List of tasks needing manager attention
  const alerts = [];
  
  // Alert: Rooms that need cleaning
  const cleaningRooms = rooms.filter(r => r.status === 'Cleaning');
  if (cleaningRooms.length > 0) {
    alerts.push({
      id: 'clean-alert',
      type: 'cleaning',
      message: `${cleaningRooms.length} room(s) awaiting housekeeping service`,
      actionLabel: 'View Rooms',
      tab: 'rooms',
      icon: Sparkles,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    });
  }

  // Alert: Active late kitchen tickets
  const now = new Date("2026-06-18T16:55:00Z");
  const lateTicketsCount = kds.filter(ticket => {
    const elapsed = Math.floor((now - new Date(ticket.timestamp)) / 60000);
    return elapsed >= 15;
  }).length;
  
  if (lateTicketsCount > 0) {
    alerts.push({
      id: 'kds-alert',
      type: 'kds',
      message: `${lateTicketsCount} food ticket(s) are delayed in the kitchen (>15 mins)`,
      actionLabel: 'View KDS',
      tab: 'kitchen',
      icon: ChefHat,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    });
  }

  // Alert: Settle checkout prompt
  const todayDate = new Date().toISOString().split('T')[0];
  const checkoutRooms = rooms.filter(r => r.status === 'Booked' && r.currentGuest && r.currentGuest.checkOut <= todayDate);
  if (checkoutRooms.length > 0) {
    alerts.push({
      id: 'checkout-alert',
      type: 'checkout',
      message: `Room ${checkoutRooms.map(r => r.id).join(', ')} scheduled checkout is pending today`,
      actionLabel: 'Billing',
      tab: 'billing',
      icon: BedDouble,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    });
  }

  // Activity Feed logs
  const activities = [
    { text: 'Room 201 guest charged $160 for a dinner ticket (VIP Booth A).', time: '10 mins ago', type: 'restaurant' },
    { text: 'Checked in guest Elena Rostova in Room 103.', time: '40 mins ago', type: 'rooms' },
    { text: 'Housekeeping marked Room 104 as Dirty/Cleaning.', time: '1 hour ago', type: 'rooms' },
    { text: 'Settled invoice INV-2026-002 for walk-in guest Robert Vance.', time: '2 hours ago', type: 'billing' },
    { text: 'Kitchen ticket completed for Table 3.', time: '3 hours ago', type: 'kitchen' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Performance Dashboard</h2>
        <p className="text-xs text-slate-500 mt-0.5">Hotel and Restaurant consolidated metrics overview</p>
      </div>

      {/* KPI Stats Row */}
      <QuickStats 
        rooms={rooms} 
        tables={tables} 
        kds={kds} 
        billingHistory={billingHistory} 
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Revenue Trend Area Chart (8 Columns) */}
        <div className="xl:col-span-8 glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Consolidated Revenue Trends
            </h3>
            <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-bold">Live Feed</span>
          </div>

          <div className="w-full h-80 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBistro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLodging" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="day" stroke="#64748b" tickLine={false} />
                <YAxis stroke="#64748b" tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#cbd5e1' }}
                  labelStyle={{ fontWeight: 'bold', color: '#f1f5f9' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Bistro" stroke="#818cf8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBistro)" />
                <Area type="monotone" dataKey="Lodging" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLodging)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Allocations Pie Chart (4 Columns) */}
        <div className="xl:col-span-4 glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Room Allocation States</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Real-time status proportions</p>
          </div>

          <div className="w-full h-52 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomStatusBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {roomStatusBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-100">
                {rooms.filter(r => r.status === 'Booked').length}
              </span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Booked</span>
            </div>
          </div>

          {/* Legends */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {roomStatusBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 p-1.5 bg-slate-950/20 rounded-lg border border-slate-850">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-slate-400 font-medium truncate">
                  {item.name}: <span className="font-bold text-slate-200">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Layout Row: Live Alerts (6 Cols) & Activity Feed (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts / Housekeeping Checklist */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-indigo-400" />
            Operations Attention Required
          </h3>

          <div className="space-y-3">
            {alerts.map((alert, idx) => {
              const Icon = alert.icon;
              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${alert.color}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4.5 h-4.5 shrink-0" />
                    <span className="font-semibold text-slate-200">{alert.message}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab(alert.tab)}
                    className="text-[10px] font-bold uppercase tracking-wider bg-slate-950/50 hover:bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300 transition-colors shrink-0"
                  >
                    {alert.actionLabel}
                  </button>
                </div>
              );
            })}
            {alerts.length === 0 && (
              <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-850 rounded-xl">
                Operations clear! All logs show smooth execution.
              </div>
            )}
          </div>
        </div>

        {/* Activity feed */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-400" />
            Recent Activity Log
          </h3>

          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
            {activities.map((act, idx) => (
              <div 
                key={idx}
                className="flex justify-between items-start gap-4 text-xs bg-slate-950/30 p-2.5 rounded-xl border border-slate-850"
              >
                <p className="text-slate-300 font-medium leading-normal">{act.text}</p>
                <span className="text-[10px] text-slate-500 font-medium shrink-0 pt-0.5">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
