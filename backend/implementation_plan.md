# Implementation Plan - Backend Verification & Completing Contact Inquiries

This plan verifies backend coverage for all frontend pages and implements the missing **ContactInquiry** entity to fully complete all backend endpoints matching the frontend forms.

---

## Verification & Gap Analysis

Upon reviewing the frontend pages and corresponding C# backend models:
- **Suite Bookings (Rooms)** -> Supported by `SuiteBookings` table (`BookingsController.cs`). [PASSED]
- **Dining Reservations (Dining)** -> Supported by `TableReservations` table (`ReservationsController.cs`). [PASSED]
- **Pool Bookings (Pool)** -> Supported by `PoolBookings` table (`ReservationsController.cs`). [PASSED]
- **Lounge Reservations (Lounge/Bar)** -> Supported by `LoungeReservations` table (`ReservationsController.cs`). [PASSED]
- **Event Quotation Request (Events)** -> Supported by `EventInquiries` table (`InquiriesController.cs`). [PASSED]
- **General Contact Inquiry (Contact Page)** -> **[GAP FOUND]** No C# entity, DbContext mapping, or controller endpoints exist to save messages sent from the Contact page inquiry form!

---

## Proposed Changes to Resolve the Gap

### [Component Name] backend

#### [MODIFY] [Entities.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Models/Entities.cs)
Add a new `ContactInquiry` class:
```csharp
public class ContactInquiry
{
    public int Id { get; set; }
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string? Message { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

#### [MODIFY] [AppDbContext.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Data/AppDbContext.cs)
Add `DbSet<ContactInquiry> ContactInquiries { get; set; }`.

#### [MODIFY] [InquiriesController.cs](file:///Users/akhilrs/Desktop/Galletrix/Resturant/backend/Controllers/InquiriesController.cs)
Add endpoints:
- `POST api/inquiries/contact` -> Save a general inquiry message.
- `GET api/inquiries/contact` -> Retrieve all general inquiries.

---

## Verification Plan

### Automated Tests
- Run `dotnet ef migrations add AddContactInquiry` to verify migration scripts generation.
- Build checking:
  ```bash
  cd backend
  dotnet build
  ```
