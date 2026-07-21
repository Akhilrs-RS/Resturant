# Implementation Plan - Admin Dashboard Integration

This plan implements a premium **Admin Dashboard** page (`Admin.jsx`) to manage all bookings, table reservations, pool passes, lounge seating, and customer inquiries. The admin panel will be accessible by appending `/admin` (or `#admin` fallback) to the URL.

---

## Proposed Changes

### [New Components]

#### [NEW] [Admin.jsx](file:///Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Admin.jsx)
- **Visuals**:
  - Premium dark dashboard header with title `"Etheria Resort Admin Dashboard"`.
  - Stats row with metrics: Total Bookings, Active Inquiries, Pool passes sold, and Lounge seating reservations.
  - Interactive tab toggles to inspect different categories.
  - Table grid with scroll containers, action buttons (Approve, Delete), and search filters.
  - Connection status badge showing whether the client is successfully connected to the backend API.

---

### [Component Modifications]

#### [MODIFY] [App.jsx](file:///Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/App.jsx)
- Import `Admin` component.
- Add path-detection routing block in a `useEffect` hook:
  ```javascript
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || window.location.hash === '#admin') {
      setCurrentPage('admin');
    }
  }, []);
  ```
- Conditionally render `<Admin />` when `currentPage === 'admin'`.

---

## Verification Plan

### Automated Tests
- Run `npm run build` in the `Frontend/` folder to check for compilation errors.

### Manual Verification
- Start the development server locally:
  ```bash
  cd Frontend
  npm run dev
  ```
- Navigate to `http://localhost:5173/admin` or `http://localhost:5173/#admin` and verify that the Admin Dashboard loads.
- Toggle between tabs (Suite Bookings, Table Reservations, etc.) to inspect data.
