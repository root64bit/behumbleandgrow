export interface TimeZoneOption {
  iana: string;
  label: string;
  utcOffset: string;
}

export const SUPPORTED_TIME_ZONES: TimeZoneOption[] = [
  { iana: 'Asia/Dubai', label: 'Dubai / Gulf Standard Time (GST)', utcOffset: 'UTC+04:00' },
  { iana: 'Africa/Maputo', label: 'Maputo / Central Africa Time (CAT)', utcOffset: 'UTC+02:00' },
  { iana: 'Africa/Johannesburg', label: 'Johannesburg / South Africa Standard Time (SAST)', utcOffset: 'UTC+02:00' },
  { iana: 'Africa/Nairobi', label: 'Nairobi / East Africa Time (EAT)', utcOffset: 'UTC+03:00' },
  { iana: 'Asia/Kolkata', label: 'Kolkata / India Standard Time (IST)', utcOffset: 'UTC+05:30' },
  { iana: 'Europe/London', label: 'London / Greenwich Mean Time (GMT/BST)', utcOffset: 'UTC+00:00' },
  { iana: 'UTC', label: 'Coordinated Universal Time (UTC)', utcOffset: 'UTC+00:00' },
];

export function validateIanaTimeZone(iana?: string | null): string {
  if (!iana) return 'Asia/Dubai';
  const found = SUPPORTED_TIME_ZONES.find((t) => t.iana.toLowerCase() === iana.toLowerCase().trim());
  return found ? found.iana : 'Asia/Dubai';
}

export function detectBrowserTimeZone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return validateIanaTimeZone(tz);
  } catch {
    // Fall back safely
  }
  return 'Asia/Dubai';
}

export function formatTimeZoneLabel(iana?: string | null): string {
  const valid = validateIanaTimeZone(iana);
  const found = SUPPORTED_TIME_ZONES.find((t) => t.iana === valid);
  return found ? `${found.label} (${found.utcOffset})` : 'Dubai / Gulf Standard Time (GST) (UTC+04:00)';
}
