export interface DualTimeDisplay {
  dateString: string;
  candidateLocalTime: string;
  candidateTimeZoneLabel: string;
  uaeTime: string;
  uaeTimeZoneLabel: string;
  isBrowserFallback: boolean;
}

export function formatDualInterviewTime(
  utcTimestamp?: string | null,
  candidateProfileTimeZone?: string | null
): DualTimeDisplay {
  const defaultRes: DualTimeDisplay = {
    dateString: 'Date To Be Confirmed',
    candidateLocalTime: '--:--',
    candidateTimeZoneLabel: 'Local Time',
    uaeTime: '--:--',
    uaeTimeZoneLabel: 'UAE time — Asia/Dubai',
    isBrowserFallback: false,
  };

  if (!utcTimestamp) return defaultRes;

  const dateObj = new Date(utcTimestamp);
  if (isNaN(dateObj.getTime())) return defaultRes;

  // Determine Candidate IANA Time Zone
  let targetZone = candidateProfileTimeZone?.trim();
  let isFallback = false;

  if (!targetZone) {
    try {
      targetZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      isFallback = true;
    } catch {
      targetZone = 'UTC';
    }
  }

  // Format Date String
  const dateString = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: targetZone,
  }).format(dateObj);

  // Format Candidate Local Time
  const candidateLocalTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: targetZone,
  }).format(dateObj);

  // Format UAE Time (Asia/Dubai)
  const uaeTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Dubai',
  }).format(dateObj);

  return {
    dateString,
    candidateLocalTime,
    candidateTimeZoneLabel: isFallback ? `${targetZone} (Device Time)` : targetZone,
    uaeTime,
    uaeTimeZoneLabel: 'UAE time — Asia/Dubai',
    isBrowserFallback: isFallback,
  };
}
