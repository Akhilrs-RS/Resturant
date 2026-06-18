import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Restaurant from './pages/Restaurant';
import KDSBoard from './components/KDSBoard';
import Billing from './pages/Billing';

import { 
  INITIAL_ROOMS, 
  INITIAL_TABLES, 
  INITIAL_MENU, 
  INITIAL_KDS, 
  INITIAL_BILLING_HISTORY 
} from './data/mockData';

export default function App() {
  // Centralized Application State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [menu] = useState(INITIAL_MENU);
  const [kds, setKds] = useState(INITIAL_KDS);
  const [billingHistory, setBillingHistory] = useState(INITIAL_BILLING_HISTORY);
  
  // Checkout flow target redirection
  const [forcedActiveRoomId, setForcedActiveRoomId] = useState(null);

  // --- ROOM BOOKING ACTION HANDLERS ---
  const handleCheckIn = (roomId, guestData) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          status: 'Booked',
          currentGuest: guestData
        };
      }
      return room;
    }));
  };

  const handleCleanRoom = (roomId) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          status: 'Available'
        };
      }
      return room;
    }));
  };

  const handleMaintenanceRoom = (roomId, underMaintenance) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          status: underMaintenance ? 'Maintenance' : 'Available'
        };
      }
      return room;
    }));
  };

  const handleTriggerBillingTab = (roomId) => {
    setForcedActiveRoomId(roomId);
    setActiveTab('billing');
  };

  // --- RESTAURANT POS ACTION HANDLERS ---
  const handleAddToOrder = (tableId, menuItem) => {
    setTables(prevTables => prevTables.map(table => {
      if (table.id === tableId) {
        const activeOrder = table.activeOrder || {
          id: `ord-${Date.now()}`,
          items: [],
          total: 0,
          roomChargeId: null
        };

        const existingItemIndex = activeOrder.items.findIndex(item => item.id === menuItem.id);
        let updatedItems = [...activeOrder.items];

        if (existingItemIndex > -1) {
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1
          };
        } else {
          updatedItems.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
            status: null // unsent to kitchen
          });
        }

        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return {
          ...table,
          activeOrder: {
            ...activeOrder,
            items: updatedItems,
            total: newTotal
          }
        };
      }
      return table;
    }));
  };

  const handleRemoveFromOrder = (tableId, menuItemId) => {
    setTables(prevTables => prevTables.map(table => {
      if (table.id === tableId && table.activeOrder) {
        const existingItemIndex = table.activeOrder.items.findIndex(item => item.id === menuItemId);
        if (existingItemIndex === -1) return table;

        let updatedItems = [...table.activeOrder.items];
        const currentItem = updatedItems[existingItemIndex];

        if (currentItem.quantity > 1) {
          updatedItems[existingItemIndex] = {
            ...currentItem,
            quantity: currentItem.quantity - 1
          };
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }

        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return {
          ...table,
          activeOrder: updatedItems.length > 0 ? {
            ...table.activeOrder,
            items: updatedItems,
            total: newTotal
          } : null
        };
      }
      return table;
    }));
  };

  const handleSeatTable = (tableId, status) => {
    setTables(prevTables => prevTables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          status,
          activeOrder: status === 'Dining' ? {
            id: `ord-${Date.now()}`,
            items: [],
            total: 0,
            roomChargeId: null
          } : null
        };
      }
      return table;
    }));
  };

  const handleSendToKitchen = (tableId) => {
    const table = tables.find(t => t.id === tableId);
    if (!table || !table.activeOrder) return;

    // Filter items that have status = null (not sent yet)
    const unsentItems = table.activeOrder.items.filter(item => !item.status);
    if (unsentItems.length === 0) return;

    // Create a KDS Ticket
    const newKDSTicket = {
      id: `kot-${Math.floor(100 + Math.random() * 900)}`,
      tableId: table.id,
      tableName: table.name,
      timestamp: new Date().toISOString(),
      items: unsentItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        status: 'Pending'
      }))
    };

    // Update KDS State
    setKds(prevKDS => [...prevKDS, newKDSTicket]);

    // Update Table Active Order item statuses
    setTables(prevTables => prevTables.map(t => {
      if (t.id === tableId && t.activeOrder) {
        const updatedItems = t.activeOrder.items.map(item => {
          if (!item.status) {
            return { ...item, status: 'Pending' };
          }
          return item;
        });

        return {
          ...t,
          activeOrder: {
            ...t.activeOrder,
            items: updatedItems
          }
        };
      }
      return t;
    }));
  };

  const handleSettleOrder = (tableId, paymentMethod) => {
    const table = tables.find(t => t.id === tableId);
    if (!table || !table.activeOrder) return;

    const invoicePayload = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      guestName: `Walk-in Diner (${table.name})`,
      roomCharged: null,
      roomAmount: 0.00,
      restaurantAmount: table.activeOrder.total,
      tax: table.activeOrder.total * 0.12,
      discount: 0.00,
      total: table.activeOrder.total * 1.12,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      paymentMethod
    };

    // Add to billing history
    setBillingHistory(prevHistory => [...prevHistory, invoicePayload]);

    // Reset Table
    setTables(prevTables => prevTables.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          status: 'Vacant',
          activeOrder: null
        };
      }
      return t;
    }));

    // Filter KDS tickets related to this table
    setKds(prevKDS => prevKDS.filter(kot => kot.tableId !== tableId));
    alert(`Order for ${table.name} settled. Invoice logged: ${invoicePayload.id}`);
  };

  const handleChargeToRoom = (tableId, roomId) => {
    const table = tables.find(t => t.id === tableId);
    if (!table || !table.activeOrder) return;

    // Check if room has guest
    const targetRoom = rooms.find(r => r.id === roomId);
    if (!targetRoom || !targetRoom.currentGuest) {
      alert("Selected room is not occupied.");
      return;
    }

    // Add food charges to Room
    setRooms(prevRooms => prevRooms.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          currentGuest: {
            ...r.currentGuest,
            foodCharges: r.currentGuest.foodCharges + table.activeOrder.total
          }
        };
      }
      return r;
    }));

    // Reset table order and vacancy
    setTables(prevTables => prevTables.map(t => {
      if (t.id === tableId) {
        return {
          ...t,
          status: 'Vacant',
          activeOrder: null
        };
      }
      return t;
    }));

    // Filter KDS tickets
    setKds(prevKDS => prevKDS.filter(kot => kot.tableId !== tableId));
    alert(`Bill of $${table.activeOrder.total.toFixed(2)} charged to Room ${roomId} (${targetRoom.currentGuest.name}).`);
  };

  // --- KITCHEN (KDS) ACTION HANDLERS ---
  const handleUpdateKDSItemStatus = (ticketId, itemId, newStatus) => {
    // 1. Update KDS ticket
    setKds(prevKDS => {
      const updatedKDS = prevKDS.map(kot => {
        if (kot.id === ticketId) {
          const updatedItems = kot.items.map(item => {
            if (item.id === itemId) {
              return { ...item, status: newStatus };
            }
            return item;
          });
          return { ...kot, items: updatedItems };
        }
        return kot;
      });

      // Filter out KDS tickets where all items are ready (clean preparation board)
      return updatedKDS.filter(kot => !kot.items.every(i => i.status === 'Ready'));
    });

    // 2. Reflect change in active table orders
    const ticket = kds.find(k => k.id === ticketId);
    if (!ticket) return;

    setTables(prevTables => prevTables.map(t => {
      if (t.id === ticket.tableId && t.activeOrder) {
        const updatedItems = t.activeOrder.items.map(item => {
          if (item.id === itemId) {
            return { ...item, status: newStatus };
          }
          return item;
        });

        return {
          ...t,
          activeOrder: {
            ...t.activeOrder,
            items: updatedItems
          }
        };
      }
      return t;
    }));
  };

  // --- BILLING / CHECKOUT ACTION HANDLERS ---
  const handleSettleCheckout = (roomId, invoicePayload) => {
    // 1. Add to billing history
    setBillingHistory(prevHistory => [...prevHistory, invoicePayload]);

    // 2. Set Room status to Cleaning, and clear guest details
    setRooms(prevRooms => prevRooms.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          status: 'Cleaning',
          currentGuest: null
        };
      }
      return r;
    }));

    alert(`Guest checked out successfully from Room ${roomId}. Invoice generated: ${invoicePayload.id}`);
  };

  // Render correct tab page
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            rooms={rooms}
            tables={tables}
            kds={kds}
            billingHistory={billingHistory}
            setActiveTab={setActiveTab}
          />
        );
      case 'rooms':
        return (
          <Rooms 
            rooms={rooms}
            onCheckIn={handleCheckIn}
            onCleanRoom={handleCleanRoom}
            onMaintenanceRoom={handleMaintenanceRoom}
            onTriggerBillingTab={handleTriggerBillingTab}
          />
        );
      case 'restaurant':
        return (
          <Restaurant 
            tables={tables}
            rooms={rooms}
            menu={menu}
            onAddToOrder={handleAddToOrder}
            onRemoveFromOrder={handleRemoveFromOrder}
            onSendToKitchen={handleSendToKitchen}
            onSettleOrder={handleSettleOrder}
            onChargeToRoom={handleChargeToRoom}
            onSeatTable={handleSeatTable}
          />
        );
      case 'kitchen':
        return (
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80">
            <KDSBoard 
              kds={kds}
              onUpdateKDSItemStatus={handleUpdateKDSItemStatus}
            />
          </div>
        );
      case 'billing':
        return (
          <Billing 
            rooms={rooms}
            billingHistory={billingHistory}
            onSettleCheckout={handleSettleCheckout}
            forcedActiveRoomId={forcedActiveRoomId}
            clearForcedActiveRoomId={() => setForcedActiveRoomId(null)}
          />
        );
      default:
        return <div>Tab not found.</div>;
    }
  };

  return (
    <div className="flex bg-slate-950 text-slate-100 min-h-screen font-sans antialiased">
      {/* Sidebar Layout */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Primary Page Canvas */}
      <main className="flex-1 min-h-screen pl-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
