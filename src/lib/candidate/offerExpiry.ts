export type OfferExpiryState = 'valid' | 'expiring_soon' | 'expires_today' | 'expired' | 'unknown';

export interface OfferExpiryInfo {
  state: OfferExpiryState;
  label: string;
  badgeClass: string;
  formattedDate: string;
  isExpired: boolean;
}

const SEVENTY_TWO_HOURS_MS = 72 * 60 * 60 * 1000;

export function calculateOfferExpiry(expiryIsoDate?: string | null, referenceTimeMs: number = Date.now()): OfferExpiryInfo {
  if (!expiryIsoDate) {
    return {
      state: 'unknown',
      label: 'No Expiry Set',
      badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
      formattedDate: 'TBD',
      isExpired: false,
    };
  }

  const expiryMs = new Date(expiryIsoDate).getTime();
  if (isNaN(expiryMs)) {
    return {
      state: 'unknown',
      label: 'Expiry Date Pending',
      badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
      formattedDate: 'TBD',
      isExpired: false,
    };
  }

  const diffMs = expiryMs - referenceTimeMs;
  const formattedDate = new Date(expiryMs).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (diffMs <= 0) {
    return {
      state: 'expired',
      label: `Expired on ${formattedDate}`,
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
      formattedDate,
      isExpired: true,
    };
  }

  const expiryDateObj = new Date(expiryMs);
  const refDateObj = new Date(referenceTimeMs);
  const isSameCalendarDay =
    expiryDateObj.getUTCFullYear() === refDateObj.getUTCFullYear() &&
    expiryDateObj.getUTCMonth() === refDateObj.getUTCMonth() &&
    expiryDateObj.getUTCDate() === refDateObj.getUTCDate();

  if (isSameCalendarDay) {
    return {
      state: 'expires_today',
      label: 'Expires Today',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
      formattedDate,
      isExpired: false,
    };
  }

  if (diffMs <= SEVENTY_TWO_HOURS_MS) {
    const hoursLeft = Math.ceil(diffMs / (1000 * 60 * 60));
    return {
      state: 'expiring_soon',
      label: `Expires in ${hoursLeft}h (${formattedDate})`,
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      formattedDate,
      isExpired: false,
    };
  }

  return {
    state: 'valid',
    label: `Expires: ${formattedDate}`,
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    formattedDate,
    isExpired: false,
  };
}
