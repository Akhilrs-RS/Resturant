import React from 'react';
import { IndianRupee, BedDouble, Utensils, ChefHat } from 'lucide-react';

export default function QuickStats({ rooms, tables, kds, billingHistory }) {
  // 1. Calculate Revenue
  // Settle invoices sum
  const settledRevenue = billingHistory.reduce((sum, item) => sum + item.total, 0);
  
  // Active/accumulated room charges for currently checked-in guests
  const activeRoomRevenue = rooms
    .filter(r => r.status === 'Booked' && r.currentGuest)
    .reduce((sum, r) => sum + (r.currentGuest.roomCharges || 0) + (r.currentGuest.foodCharges || 0), 0);
  
  // Active/accumulated dining orders
  const activeDiningRevenue = tables
    .filter(t => t.status === 'Dining' && t.activeOrder)
    .reduce((sum, t) => sum + (t.activeOrder.total || 0), 0);
  
  const totalEstimatedRevenue = settledRevenue + activeRoomRevenue + activeDiningRevenue;

  // 2. Room Occupancy
  const bookedRoomsCount = rooms.filter(r => r.status === 'Booked').length;
  const totalRoomsCount = rooms.length;
  const roomOccupancyRate = totalRoomsCount > 0 
    ? Math.round((bookedRoomsCount / totalRoomsCount) * 100) 
    : 0;

  // 3. Table Occupancy
  const diningTablesCount = tables.filter(t => t.status === 'Dining').length;
  const totalTablesCount = tables.length;
  const tableOccupancyRate = totalTablesCount > 0
    ? Math.round((diningTablesCount / totalTablesCount) * 100)
    : 0;

  // 4. Kitchen Prep
  const activeKOTCount = kds.length;

  const statsList = [
    {
      name: 'Total Revenue',
      value: `₹${totalEstimatedRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtext: `Includes ₹${settledRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })} settled bills`,
      icon: IndianRupee,
      color: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400 border-emerald-500/30',
      glow: 'group-hover:shadow-emerald-500/10',
    },
    {
      name: 'Room Occupancy',
      value: `${roomOccupancyRate}%`,
      subtext: `${bookedRoomsCount} of ${totalRoomsCount} rooms booked`,
      icon: BedDouble,
      color: 'from-indigo-500/20 to-violet-500/20',
      iconColor: 'text-indigo-400 border-indigo-500/30',
      glow: 'group-hover:shadow-indigo-500/10',
    },
    {
      name: 'Active Dining',
      value: `${diningTablesCount} Tables`,
      subtext: `${tableOccupancyRate}% table occupancy`,
      icon: Utensils,
      color: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400 border-amber-500/30',
      glow: 'group-hover:shadow-amber-500/10',
    },
    {
      name: 'Kitchen Active KOT',
      value: `${activeKOTCount} Tickets`,
      subtext: `Orders currently prepping`,
      icon: ChefHat,
      color: 'from-rose-500/20 to-pink-500/20',
      iconColor: 'text-rose-400 border-rose-500/30',
      glow: 'group-hover:shadow-rose-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {statsList.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx} 
            className={`glass-panel p-5 rounded-2xl flex items-center justify-between group glow-card transition-all duration-300 ${stat.glow}`}
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {stat.name}
              </span>
              <h3 className="text-2xl font-bold text-slate-100 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {stat.subtext}
              </p>
            </div>
            
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} border flex items-center justify-center ${stat.iconColor} shadow-inner`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
