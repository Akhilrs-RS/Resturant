import React from 'react';
import RoomGrid from '../components/RoomGrid';

export default function Rooms({ rooms, onCheckIn, onCleanRoom, onMaintenanceRoom, onTriggerBillingTab }) {
  return (
    <div className="space-y-6">
      <RoomGrid 
        rooms={rooms}
        onCheckIn={onCheckIn}
        onCleanRoom={onCleanRoom}
        onMaintenanceRoom={onMaintenanceRoom}
        onTriggerBillingTab={onTriggerBillingTab}
      />
    </div>
  );
}
