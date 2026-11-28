export type GuestOption = 'Solo' | 'Couple';
export type DurationOption = 60 | 90 | 120;

export const RITUAL_TIME_SLOTS = [
  'Today Evening',
  'Late Night (10 PM – 3 AM)',
  'Tomorrow',
] as const;

export type TimeSlotOption = (typeof RITUAL_TIME_SLOTS)[number];

export const SOLO_BASE_PRICE = 999;
export const COUPLE_BASE_PRICE = 1999;
export const EXTRA_HALF_HOUR_PRICE = 400;

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export function calculateRitualPrice(
  guests: GuestOption,
  durationMins: DurationOption
): number {
  const base = guests === 'Couple' ? COUPLE_BASE_PRICE : SOLO_BASE_PRICE;
  const extraHalfHours = Math.max(0, Math.ceil((durationMins - 60) / 30));
  return base + extraHalfHours * EXTRA_HALF_HOUR_PRICE;
}

export function getDurationOptions(guests: GuestOption): Array<{
  mins: DurationOption;
  price: number;
}> {
  const durations: DurationOption[] = [60, 90, 120];
  return durations.map((mins) => ({
    mins,
    price: calculateRitualPrice(guests, mins),
  }));
}

export function buildRitualWhatsAppMessage(params: {
  guests: GuestOption;
  durationMins: DurationOption;
  timeSlot: TimeSlotOption;
}): string {
  const price = calculateRitualPrice(params.guests, params.durationMins);
  const suiteLabel =
    params.guests === 'Solo' ? 'Solo Private Suite' : 'Couples Candlelit Suite';

  return [
    'Hello The Elite Spa Centre (Kalyani Nagar),',
    'I would like to check instant availability for my spa ritual:',
    `• Suite: ${suiteLabel} (${params.guests})`,
    `• Duration: ${params.durationMins} Minutes`,
    `• Preferred Time: ${params.timeSlot}`,
    `• Ritual Rate: ${formatINR(price)}`,
    '',
    'Please confirm the earliest available suite.',
  ].join('\n');
}

export function buildRitualWhatsAppUrl(
  whatsappNumber: string,
  params: {
    guests: GuestOption;
    durationMins: DurationOption;
    timeSlot: TimeSlotOption;
  }
): string {
  const message = buildRitualWhatsAppMessage(params);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface BundleBreakupResult {
  regularTotal: number;
  offerPrice: number;
  savings: number;
  formula: string;
}

export function computeBundleBreakup(
  regularItems: number[],
  offerPrice: number
): BundleBreakupResult {
  const regularTotal = regularItems.reduce((sum, val) => sum + val, 0);
  const savings = Math.max(0, regularTotal - offerPrice);
  const parts = regularItems.map((price) => formatINR(price)).join(' + ');
  const formula = `${parts} = ${formatINR(regularTotal)} → Bundle ${formatINR(offerPrice)}`;

  return {
    regularTotal,
    offerPrice,
    savings,
    formula,
  };
}
