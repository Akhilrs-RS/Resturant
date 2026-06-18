export const INITIAL_MENU = [
  // Appetizers
  { id: 'app-1', name: 'Truffle Fries', category: 'Appetizers', price: 12.00, description: 'Crispy golden fries tossed in white truffle oil, grated parmesan, and fresh herbs.' },
  { id: 'app-2', name: 'Calimari Fritti', category: 'Appetizers', price: 16.00, description: 'Tender calamari rings, lightly dusted and fried, served with spicy aioli.' },
  { id: 'app-3', name: 'Burrata & Heirloom', category: 'Appetizers', price: 15.00, description: 'Creamy burrata, ripe heirloom tomatoes, basil pesto, balsamic reduction.' },
  { id: 'app-4', name: 'Garlic Butter Prawns', category: 'Appetizers', price: 18.00, description: 'Sautéed tiger prawns in rich white wine garlic butter sauce with crusty bread.' },

  // Mains
  { id: 'main-1', name: 'Prime Filet Mignon', category: 'Mains', price: 48.00, description: '8oz center-cut filet, garlic mashed potatoes, grilled asparagus, red wine jus.' },
  { id: 'main-2', name: 'Pan-Seared Salmon', category: 'Mains', price: 34.00, description: 'Atlantic salmon filet, saffron risotto, butter-poached baby carrots, lemon-dill cream.' },
  { id: 'main-3', name: 'Wild Mushroom Pappardelle', category: 'Mains', price: 26.00, description: 'Fresh egg pasta, wild mushroom ragout, shaved pecorino, truffle froth.' },
  { id: 'main-4', name: 'Herb Crusted Lamb Rack', category: 'Mains', price: 44.00, description: 'New Zealand lamb rack, pea purée, roasted fingerling potatoes, rosemary jus.' },

  // Desserts
  { id: 'des-1', name: 'Deconstructed Tiramisu', category: 'Desserts', price: 11.00, description: 'Espresso-soaked ladyfingers, mascarpone sabayon, cocoa dusting.' },
  { id: 'des-2', name: 'Lava Chocolate Cake', category: 'Desserts', price: 12.00, description: 'Warm dark chocolate cake with molten core, Tahitian vanilla bean gelato.' },
  { id: 'des-3', name: 'Madagascar Crème Brûlée', category: 'Desserts', price: 10.00, description: 'Classic baked vanilla custard with caramelized sugar crust, fresh berries.' },

  // Drinks
  { id: 'drk-1', name: 'Cabernet Sauvignon', category: 'Drinks', price: 14.00, description: 'Full-bodied red wine with notes of dark berries and oak.' },
  { id: 'drk-2', name: 'Smoked Rosemary Old Fashioned', category: 'Drinks', price: 16.00, description: 'Bourbon, angostura bitters, smoked rosemary sprig, orange peel.' },
  { id: 'drk-3', name: 'Cucumber Basil Gimlet', category: 'Drinks', price: 14.00, description: 'Gin, fresh lime juice, muddled cucumber, fresh basil syrup.' },
  { id: 'drk-4', name: 'Sparkling Mineral Water', category: 'Drinks', price: 6.00, description: 'Refreshing sparkling water served with lemon.' }
];

export const INITIAL_ROOMS = [
  // Floor 1
  { 
    id: 101, 
    type: 'Suite', 
    floor: 1, 
    status: 'Booked', 
    price: 280, 
    features: ['Sea View', 'King Bed', 'Living Room', 'Bathtub', 'Minibar'],
    currentGuest: {
      name: 'Alexander Wright',
      email: 'alex.wright@example.com',
      checkIn: '2026-06-16',
      checkOut: '2026-06-20',
      nights: 4,
      foodCharges: 84.00,
      roomCharges: 1120.00,
    }
  },
  { 
    id: 102, 
    type: 'Deluxe', 
    floor: 1, 
    status: 'Available', 
    price: 180, 
    features: ['King Bed', 'Balcony', 'Work Desk', 'Minibar'],
    currentGuest: null
  },
  { 
    id: 103, 
    type: 'Standard', 
    floor: 1, 
    status: 'Booked', 
    price: 130, 
    features: ['Queen Bed', 'Smart TV', 'Coffee Station'],
    currentGuest: {
      name: 'Elena Rostova',
      email: 'elena.ros@example.com',
      checkIn: '2026-06-18',
      checkOut: '2026-06-22',
      nights: 4,
      foodCharges: 0.00,
      roomCharges: 520.00,
    }
  },
  { 
    id: 104, 
    type: 'Single', 
    floor: 1, 
    status: 'Cleaning', 
    price: 90, 
    features: ['Twin Bed', 'Desk', 'High-speed Wi-Fi'],
    currentGuest: null 
  },
  { 
    id: 105, 
    type: 'Deluxe', 
    floor: 1, 
    status: 'Available', 
    price: 180, 
    features: ['King Bed', 'Balcony', 'Minibar'],
    currentGuest: null
  },

  // Floor 2
  { 
    id: 201, 
    type: 'Suite', 
    floor: 2, 
    status: 'Booked', 
    price: 320, 
    features: ['Panoramic View', 'King Bed', 'Living Room', 'Jacuzzi', 'Kitchenette'],
    currentGuest: {
      name: 'Marcus Sterling',
      email: 'm.sterling@example.com',
      checkIn: '2026-06-15',
      checkOut: '2026-06-19',
      nights: 4,
      foodCharges: 145.50,
      roomCharges: 1280.00,
    }
  },
  { 
    id: 202, 
    type: 'Deluxe', 
    floor: 2, 
    status: 'Maintenance', 
    price: 190, 
    features: ['King Bed', 'Balcony', 'Shower Jets'],
    currentGuest: null 
  },
  { 
    id: 203, 
    type: 'Standard', 
    floor: 2, 
    status: 'Available', 
    price: 140, 
    features: ['Queen Bed', 'Work Desk', 'City View'],
    currentGuest: null
  },
  { 
    id: 204, 
    type: 'Standard', 
    floor: 2, 
    status: 'Booked', 
    price: 140, 
    features: ['Double Beds', 'Garden View', 'Espresso Maker'],
    currentGuest: {
      name: 'Dr. Sarah Jenkins',
      email: 'sjenkins@academia.edu',
      checkIn: '2026-06-17',
      checkOut: '2026-06-21',
      nights: 4,
      foodCharges: 32.00,
      roomCharges: 560.00,
    }
  },
  { 
    id: 205, 
    type: 'Suite', 
    floor: 2, 
    status: 'Available', 
    price: 300, 
    features: ['Ocean View', 'King Bed', 'Balcony Tub'],
    currentGuest: null
  }
];

export const INITIAL_TABLES = [
  { id: 1, name: 'Table 1', capacity: 2, status: 'Vacant', activeOrder: null },
  { id: 2, name: 'Table 2', capacity: 2, status: 'Vacant', activeOrder: null },
  { 
    id: 3, 
    name: 'Table 3', 
    capacity: 4, 
    status: 'Dining', 
    activeOrder: {
      id: 'ord-101',
      items: [
        { id: 'main-1', name: 'Prime Filet Mignon', price: 48.00, quantity: 2, status: 'Cooking' },
        { id: 'drk-1', name: 'Cabernet Sauvignon', price: 14.00, quantity: 2, status: 'Ready' },
        { id: 'app-3', name: 'Burrata & Heirloom', price: 15.00, quantity: 1, status: 'Ready' }
      ],
      total: 139.00,
      roomChargeId: null
    }
  },
  { id: 4, name: 'Table 4', capacity: 4, status: 'Reserved', activeOrder: null },
  { 
    id: 5, 
    name: 'VIP Booth A', 
    capacity: 6, 
    status: 'Dining', 
    activeOrder: {
      id: 'ord-102',
      items: [
        { id: 'app-4', name: 'Garlic Butter Prawns', price: 18.00, quantity: 2, status: 'Ready' },
        { id: 'main-4', name: 'Herb Crusted Lamb Rack', price: 44.00, quantity: 2, status: 'Cooking' },
        { id: 'des-2', name: 'Lava Chocolate Cake', price: 12.00, quantity: 3, status: 'Pending' }
      ],
      total: 160.00,
      roomChargeId: 101 // Linked to Room 101 guest (Alexander Wright)
    }
  },
  { id: 6, name: 'VIP Booth B', capacity: 8, status: 'Vacant', activeOrder: null },
  { id: 7, name: 'Terrace 1', capacity: 4, status: 'Vacant', activeOrder: null },
  { id: 8, name: 'Terrace 2', capacity: 4, status: 'Vacant', activeOrder: null }
];

export const INITIAL_KDS = [
  {
    id: 'kot-101',
    tableId: 3,
    tableName: 'Table 3',
    timestamp: '2026-06-18T16:30:00Z',
    items: [
      { id: 'main-1', name: 'Prime Filet Mignon', quantity: 2, status: 'Cooking' }
    ]
  },
  {
    id: 'kot-102',
    tableId: 5,
    tableName: 'VIP Booth A',
    timestamp: '2026-06-18T16:45:00Z',
    items: [
      { id: 'main-4', name: 'Herb Crusted Lamb Rack', quantity: 2, status: 'Cooking' },
      { id: 'des-2', name: 'Lava Chocolate Cake', quantity: 3, status: 'Pending' }
    ]
  }
];

export const INITIAL_BILLING_HISTORY = [
  {
    id: 'INV-2026-001',
    guestName: 'Jessica Thorne',
    roomCharged: 104,
    roomAmount: 270.00,
    restaurantAmount: 85.50,
    tax: 42.66,
    discount: 0.00,
    total: 398.16,
    date: '2026-06-17',
    status: 'Paid'
  },
  {
    id: 'INV-2026-002',
    guestName: 'Robert Vance',
    roomCharged: null, // Restaurant only walk-in
    roomAmount: 0.00,
    restaurantAmount: 112.00,
    tax: 13.44,
    discount: 10.00,
    total: 115.44,
    date: '2026-06-18',
    status: 'Paid'
  }
];
