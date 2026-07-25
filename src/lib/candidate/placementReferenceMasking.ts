export function maskWorkPermitReference(ref?: string | null): string {
  if (!ref || ref.trim().length === 0) return 'Not Available';
  const clean = ref.trim();
  if (clean.length <= 4) return `WP-••••-${clean}`;
  const suffix = clean.slice(-4);
  return `WP-••••-${suffix}`;
}

export function maskVisaReference(ref?: string | null): string {
  if (!ref || ref.trim().length === 0) return 'Not Available';
  const clean = ref.trim();
  if (clean.length <= 4) return `VIS-••••-${clean}`;
  const suffix = clean.slice(-4);
  return `VIS-••••-${suffix}`;
}

export function maskPassportNumber(num?: string | null): string {
  if (!num || num.trim().length === 0) return '••••••••';
  const clean = num.trim();
  if (clean.length <= 4) return `••••${clean}`;
  const suffix = clean.slice(-4);
  return `••••••${suffix}`;
}
