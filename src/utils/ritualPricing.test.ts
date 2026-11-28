import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRitualPrice,
  getDurationOptions,
  buildRitualWhatsAppMessage,
  buildRitualWhatsAppUrl,
  computeBundleBreakup,
  formatINR,
} from './ritualPricing.ts';

describe('Ritual Builder Pricing', () => {
  it('calculates Solo suite rates accurately for 60, 90, and 120 minutes', () => {
    assert.equal(calculateRitualPrice('Solo', 60), 999);
    assert.equal(calculateRitualPrice('Solo', 90), 1399);
    assert.equal(calculateRitualPrice('Solo', 120), 1799);
  });

  it('calculates Couple suite rates accurately for 60, 90, and 120 minutes', () => {
    assert.equal(calculateRitualPrice('Couple', 60), 1999);
    assert.equal(calculateRitualPrice('Couple', 90), 2399);
    assert.equal(calculateRitualPrice('Couple', 120), 2799);
  });

  it('returns ordered duration options matching selected guest type', () => {
    const coupleOptions = getDurationOptions('Couple');
    assert.deepEqual(coupleOptions, [
      { mins: 60, price: 1999 },
      { mins: 90, price: 2399 },
      { mins: 120, price: 2799 },
    ]);
  });
});

describe('WhatsApp Booking Message & URL', () => {
  it('embeds guests, duration, preferred time, and formatted INR price cleanly', () => {
    const msg = buildRitualWhatsAppMessage({
      guests: 'Couple',
      durationMins: 90,
      timeSlot: 'Late Night (10 PM – 3 AM)',
    });
    assert.match(msg, /Couples Candlelit Suite/);
    assert.match(msg, /90 Minutes/);
    assert.match(msg, /Late Night \(10 PM – 3 AM\)/);
    assert.match(msg, /₹2,399/);

    const url = buildRitualWhatsAppUrl('919199561258', {
      guests: 'Couple',
      durationMins: 90,
      timeSlot: 'Late Night (10 PM – 3 AM)',
    });
    assert.ok(url.startsWith('https://wa.me/919199561258?text='));
    assert.ok(decodeURIComponent(url).includes('₹2,399'));
  });
});

describe('Transparent Bundle Price Break-Up', () => {
  it('verifies The Everyday Reset arithmetic (₹1,399 + ₹699 = ₹2,098 → Bundle ₹1,699)', () => {
    const result = computeBundleBreakup([1399, 699], 1699);
    assert.equal(result.regularTotal, 2098);
    assert.equal(result.savings, 399);
    assert.equal(result.formula, '₹1,399 + ₹699 = ₹2,098 → Bundle ₹1,699');
  });

  it('verifies The Couple Retreat arithmetic (₹1,999 + ₹1,998 = ₹3,997 → Bundle ₹3,499)', () => {
    const result = computeBundleBreakup([1999, 1998], 3499);
    assert.equal(result.regularTotal, 3997);
    assert.equal(result.savings, 498);
    assert.equal(result.formula, '₹1,999 + ₹1,998 = ₹3,997 → Bundle ₹3,499');
  });

  it('verifies The Glow Ritual arithmetic (₹999 + ₹999 = ₹1,998 → Bundle ₹1,699)', () => {
    const result = computeBundleBreakup([999, 999], 1699);
    assert.equal(result.regularTotal, 1998);
    assert.equal(result.savings, 299);
    assert.equal(result.formula, '₹999 + ₹999 = ₹1,998 → Bundle ₹1,699');
  });

  it('formats INR amounts with Indian grouping', () => {
    assert.equal(formatINR(999), '₹999');
    assert.equal(formatINR(3499), '₹3,499');
  });
});
