# Implementation Plan - .NET Web API Backend & MySQL Database

This plan details the design and setup of the enterprise-ready **.NET Web API** backend and **MySQL Database** inside the `backend/` folder to persist bookings, table reservations, pool slots, lounge seats, and event inquiries from our frontend.

---

## Proposed Database Schema (MySQL)

We will create a database named `etheria_resort_db`. The Entity Framework Core migrations will automatically construct the following tables:

### 1. `SuiteBookings`
Stores room and suite reservations made via the main booking modal.
- `Id` (INT, Primary Key, Auto Increment)
- `SuiteId` (VARCHAR(50), Nullable)
- `CheckInDate` (DATE)
- `CheckOutDate` (DATE)
- `Guests` (VARCHAR(20))
- `FullName` (VARCHAR(100))
- `Email` (VARCHAR(100))
- `Phone` (VARCHAR(20))
- `CreatedAt` (DATETIME)

### 2. `TableReservations`
Stores dining table bookings.
- `Id` (INT, Primary Key, Auto Increment)
- `Date` (DATE)
- `Time` (TIME)
- `Guests` (VARCHAR(20))
- `FullName` (VARCHAR(100))
- `Email` (VARCHAR(100))
- `CreatedAt` (DATETIME)

### 3. `PoolBookings`
Stores pool access passes.
- `Id` (INT, Primary Key, Auto Increment)
- `Package` (VARCHAR(50))
- `Date` (DATE)
- `TimeSlot` (VARCHAR(50))
- `FullName` (VARCHAR(100))
- `Email` (VARCHAR(100))
- `CreatedAt` (DATETIME)

### 4. `LoungeReservations`
Stores lounge table bookings.
- `Id` (INT, Primary Key, Auto Increment)
- `FullName` (VARCHAR(100))
- `Phone` (VARCHAR(20))
- `Email` (VARCHAR(100))
- `Date` (DATE)
- `Time` (TIME)
- `Guests` (INT)
- `SeatingPreference` (VARCHAR(50))
- `Occasion` (VARCHAR(50))
- `SpecialRequest` (TEXT, Nullable)
- `CreatedAt` (DATETIME)

### 5. `EventInquiries`
Stores custom wedding and conference banquet quotations requests.
- `Id` (INT, Primary Key, Auto Increment)
- `EventType` (VARCHAR(50))
- `Guests` (VARCHAR(50))
- `Date` (DATE)
- `FullName` (VARCHAR(100))
- `Email` (VARCHAR(100))
- `Message` (TEXT, Nullable)
- `CreatedAt` (DATETIME)

---

## Proposed API Endpoints

### 1. Suite Bookings
- `POST /api/bookings/suites` -> Create a new suite reservation.
- `GET /api/bookings/suites` -> List all suite reservations (for resort concierge).

### 2. Reservations
- `POST /api/reservations/tables` -> Reserve a dining table.
- `POST /api/reservations/pools` -> Book pool access slot.
- `POST /api/reservations/lounges` -> Reserve lounge seating.

### 3. Event Inquiries
- `POST /api/inquiries/events` -> Submit custom event/wedding quotation inquiry.

---

## Project Structure & Files

We will initialize a standard .NET Web API template inside `backend/` with the following files:

### [NEW] [backend/App.csproj](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/App.csproj)
- Contains EF Core package references:
  - `Microsoft.EntityFrameworkCore`
  - `Microsoft.EntityFrameworkCore.Design`
  - `Pomelo.EntityFrameworkCore.MySql` (MySQL provider)

### [NEW] [backend/appsettings.json](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/appsettings.json)
- Configures connection string to MySQL:
  ```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=etheria_resort_db;User=root;Password=your_password;"
  }
  ```

### [NEW] [backend/Data/AppDbContext.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Data/AppDbContext.cs)
- Coordinates EF Core contexts, linking models to DB tables.

### [NEW] [backend/Models/Entities.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Models/Entities.cs)
- Defines C# classes for `SuiteBooking`, `TableReservation`, `PoolBooking`, `LoungeReservation`, and `EventInquiry`.

### [NEW] [backend/Controllers/...](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Controllers)
- `BookingsController.cs`
- `ReservationsController.cs`
- `InquiriesController.cs`

### [NEW] [backend/Program.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Program.cs)
- Configures services, CORS policies, Dependency Injections, DB context pipelines, and mounts controllers.

---

## Verification Plan

### Automated Verification
- Verify compilation by running:
  ```bash
  cd backend
  dotnet build
  ```
- Run DB migration creation and check status:
  ```bash
  dotnet ef migrations add InitialCreate
  ```
