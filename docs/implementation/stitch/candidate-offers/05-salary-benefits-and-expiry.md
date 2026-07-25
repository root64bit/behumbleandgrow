# Salary, Benefits & Expiry Logic — Phase A8

## Salary Formatting & Currency Preservation
- Preserves exact currency (`AED`) without automatic conversion.
- Displays monthly base salary formatted with locale grouping (e.g. `AED 4,500 / month`).

## Benefits Integration
- Displays structured benefit tags (Accommodation, Transport, Health Insurance, Flight Ticket, Annual Leave).

## Expiry Calculation Thresholds
- **Valid**: > 72 hours remaining.
- **Expiring Soon**: <= 72 hours remaining.
- **Expires Today**: Expires on current UTC calendar day.
- **Expired**: Past `valid_until` date.
