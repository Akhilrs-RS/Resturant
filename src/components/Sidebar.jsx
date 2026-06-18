import React from 'react';
import { 
  LayoutDashboard, 
  BedDouble, 
  Utensils, 
  ChefHat, 
  Receipt, 
  Settings, 
  LogOut,
  Hotel
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'rooms', name: 'Rooms Booking', icon: BedDouble },
    { id: 'restaurant', name: 'Restaurant POS', icon: Utensils },
    { id: 'kitchen', name: 'Kitchen (KDS)', icon: ChefHat },
    { id: 'billing', name: 'Billing & Invoices', icon: Receipt },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 glass-panel border-r border-slate-800/80 flex flex-col justify-between z-30">
      {/* Brand Logo */}
      <div className="p-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Hotel className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Gusto & Stay
            </h1>
            <p className="text-xs text-slate-500 font-medium">Boutique & Bistro</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase px-3 mb-2">Main Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative ${
                isActive 
                  ? 'bg-indigo-600/25 text-indigo-200 border-l-4 border-indigo-500 pl-3 shadow-inner' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-l-4 border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'
              }`} />
              {item.name}
              
              {isActive && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Info & Settings */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <button 
          onClick={() => alert("Settings panel mock opened.")}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-sm transition-all"
        >
          <Settings className="w-4 h-4" />
          <span>System Settings</span>
        </button>

        <div className="flex items-center gap-3 p-3 bg-slate-950/40 rounded-2xl border border-slate-800/50">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-sm text-indigo-400 border border-slate-700/50">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">Akhil R. S.</p>
            <p className="text-[10px] text-slate-500 font-medium">Hotel Manager</p>
          </div>
          <button 
            onClick={() => alert("Mock log out initiated.")}
            className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg transition-colors hover:bg-slate-800/50"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
