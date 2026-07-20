using System;

namespace backend.Models
{
    public class SuiteBooking
    {
        public int Id { get; set; }
        public string? SuiteId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string? Guests { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class TableReservation
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string? Time { get; set; }
        public string? Guests { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class PoolBooking
    {
        public int Id { get; set; }
        public string? Package { get; set; }
        public DateTime Date { get; set; }
        public string? TimeSlot { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class LoungeReservation
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public DateTime Date { get; set; }
        public string? Time { get; set; }
        public int Guests { get; set; }
        public string? SeatingPreference { get; set; }
        public string? Occasion { get; set; }
        public string? SpecialRequest { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class EventInquiry
    {
        public int Id { get; set; }
        public string? EventType { get; set; }
        public string? Guests { get; set; }
        public DateTime Date { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
