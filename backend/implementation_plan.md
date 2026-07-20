# Implementation Plan - .NET Backend, MySQL Database, and Dockerization

This plan details the design, setup, and **Dockerization** of the full application stack (React Frontend, .NET Web API Backend, and MySQL Database). The configuration is optimized for Docker Desktop orchestration, and exposes the database port to allow direct queries via DBeaver.

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

## Proposed Docker Topology & Services

- **Orchestration**: A `docker-compose.yml` file will sit at the project root, linking the three services (`frontend`, `backend`, and `database`).
- **DBeaver Database Connection**: The MySQL database container will expose port `3306:3306` to localhost, enabling external database clients (like **DBeaver**) to connect using:
  - **Host**: `localhost`
  - **Port**: `3306`
  - **Database**: `etheria_resort_db`
  - **User**: `root`
  - **Password**: `rootpassword`
- **Frontend Access**: The React frontend container will bind to host port `80:80`.
- **Backend Access**: The .NET Web API container will bind to host port `5000:80`.

### 1. Database Service (`database`)
- **Image**: `mysql:8.0`
- **Ports**: Exposes `3306` to allow DBeaver clients to connect.
- **Environment**:
  - `MYSQL_DATABASE=etheria_resort_db`
  - `MYSQL_ROOT_PASSWORD=rootpassword`
- **Volume**: `db_data` volume is mounted to preserve data across container restarts.

### 2. Backend Service (`backend`)
- **Base Image**: `.NET 8.0 SDK` (build) & `ASP.NET 8.0 Runtime` (run).
- **Ports**: Exposes `5000` to the host.
- **Environment**:
  - `ConnectionStrings__DefaultConnection=Server=database;Port=3306;Database=etheria_resort_db;Uid=root;Pwd=rootpassword;`
- **Dependencies**: Wait for `database` container healthcheck.

### 3. Frontend Service (`frontend`)
- **Base Image**: `node:20` (build) & `nginx:alpine` (serve).
- **Ports**: Exposes `80` to the host.
- **Nginx Config**: Setup proxy rules to forward `/api` routes from the frontend to `http://backend:80/api` seamlessly.

---

## Verification Plan

### Automated Verification
- Verify Docker compose builds cleanly:
  ```bash
  docker compose build
  ```
- Start the entire stack:
  ```bash
  docker compose up -d
  ```
- Check service health status inside **Docker Desktop**.
- Establish a connection from **DBeaver** to `localhost:3306` and query the schema tables.
