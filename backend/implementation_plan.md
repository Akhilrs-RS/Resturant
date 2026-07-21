# Implementation Plan - Remove Offline Mock Database Mode

This plan details the steps to completely purge the simulated offline/mock database fallback mechanism from the Admin Dashboard (`Admin.jsx`), ensuring it only serves live backend records.

---

## Proposed Changes

### [Component Name] Frontend

#### [MODIFY] [Admin.jsx](file:///Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Admin.jsx)
- **Remove Mock Constants**: Completely delete `MOCK_SUITES`, `MOCK_TABLES`, `MOCK_POOLS`, `MOCK_LOUNGES`, and `MOCK_INQUIRIES`.
- **Reset Initial State**: Set the default state of all booking lists to empty arrays `[]`.
- **Purge Banners**:
  - Remove the amber warning alert banner that says `"Offline Mock Database mode: We were unable to reach..."`.
  - Update the header connection badge to show either `"Connected"` or `"Disconnected"`.
- **API Catch Update**: Log the API connection error directly to the console instead of triggering simulated fallback data.

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
- Navigate to `http://localhost:5173/admin` and verify that:
  - If the database is connected, it fetches live API records.
  - If the database is disconnected, it shows empty lists instead of pre-populated mock data.
