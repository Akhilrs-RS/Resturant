# Implementation Plan - Manage & Edit Catalog Prices

This plan details the steps to introduce dynamic catalog price editing inside the Admin Dashboard, persisting records in the MySQL database and rendering live updates across the user-facing catalog views.

---

## Proposed Changes

### Backend Components

#### [NEW] [CatalogPrice.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Models/Entities.cs) (Appended)
- Declare `CatalogPrice` database entity containing `Id`, `ItemKey`, `Category`, `DisplayName`, `Price` (decimal), and `Description`.

#### [MODIFY] [AppDbContext.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Data/AppDbContext.cs)
- Register `DbSet<CatalogPrice>` in the DbContext.
- Override `OnModelCreating` to seed the database with initial standard rates for Suites, Dining specials, Pool access, and Wedding packages.

#### [NEW] [CatalogController.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Controllers/CatalogController.cs)
- Create controller endpoints under `/api/catalog`:
  - `GET /api/catalog/prices`: Fetches all catalog prices.
  - `PUT /api/catalog/prices/{itemKey}`: Updates a specific price by key.

---

### Frontend Components

#### [MODIFY] [Admin.jsx](file:///Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Admin.jsx)
- **New Tab Option**: Add a **"Manage Catalog Prices"** tab to the sidebar navigation panel.
- **Price Grid**: Render a categorized list of all rates with quick inline numeric input fields and "Save Rate" update buttons.
- **Update Actions**: Fetch updated prices on load, and trigger `PUT /api/catalog/prices/{itemKey}` on save.

#### [MODIFY] [Home.jsx](file:///Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Home.jsx)
- Fetch current room rates on component mount, updating display suites array dynamically. Fall back to static constants if offline.

#### [MODIFY] [Dining.jsx](file:///Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Dining.jsx)
- Fetch current dining specials rates on mount, updating menu display list dynamically.

#### [MODIFY] [Pool.jsx](file:///Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Pool.jsx)
- Fetch current pool pass rates on mount, updating package display list dynamically.

#### [MODIFY] [Events.jsx](file:///Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Events.jsx)
- Fetch current wedding rates on mount, updating wedding packages display list dynamically.

---

## Verification Plan

### Automated Tests
- Run database migrations:
  ```bash
  dotnet ef migrations add AddCatalogPrices
  dotnet ef database update
  ```
- Run frontend build checks:
  ```bash
  npm run build
  ```

### Manual Verification
1. Open Admin console and navigate to the **"Manage Prices"** tab.
2. Edit the price of **"Deluxe Room"** to **₹299**. Click **"Save"**.
3. Verify that navigating back to the homepage reflects **₹299** for the Deluxe Room dynamic billing calculator.
