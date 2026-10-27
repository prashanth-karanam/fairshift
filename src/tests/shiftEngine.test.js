import { describe, it, expect } from 'vitest';
import {
  calculateShiftPay,
  checkFatigueLockout,
  resolveSectorConfig,
  resolveLanguage,
  generateAnonymousTicketId
} from '../utils/shiftEngine';

describe('FairShift Core Shift & Labor Standards Engine (15 Unit Tests)', () => {
  // Test 1: Standard shift
  it('1. calculates standard 8.0h shift pay accurately without overtime', () => {
    const res = calculateShiftPay(8.0, 80);
    expect(res.regularHours).toBe(8.0);
    expect(res.overtimeHours).toBe(0);
    expect(res.regularPay).toBe(640.00);
    expect(res.overtimePay).toBe(0);
    expect(res.totalTakeHome).toBe(640.00);
  });

  // Test 2: Overtime multiplier
  it('2. calculates statutory 1.5x overtime pay for 9.5h shift', () => {
    const res = calculateShiftPay(9.5, 80, 1.5);
    expect(res.regularHours).toBe(8.0);
    expect(res.overtimeHours).toBe(1.5);
    expect(res.regularPay).toBe(640.00);
    expect(res.overtimePay).toBe(180.00); // 1.5h * 80 * 1.5 = 180
  });

  // Test 3: Total take home with site allowance (₹920 specification)
  it('3. computes site bonus allowance and total take home to match ₹920.00 specification', () => {
    const res = calculateShiftPay(9.5, 80, 1.5, 100);
    expect(res.allowance).toBe(100);
    expect(res.totalTakeHome).toBe(920.00);
  });

  // Test 4: Statutory 1.0% BOCW cess
  it('4. computes statutory 1.0% BOCW cess accrual accurately', () => {
    const res = calculateShiftPay(9.5, 80, 1.5, 100);
    expect(res.statutoryCess).toBe(9.20); // 1% of 920 = 9.20
  });

  // Test 5: Fractional shift hours
  it('5. handles fractional shift hours (4.25h) accurately', () => {
    const res = calculateShiftPay(4.25, 100);
    expect(res.regularHours).toBe(4.25);
    expect(res.regularPay).toBe(425.00);
    expect(res.totalTakeHome).toBe(425.00);
  });

  // Test 6: Defensive boundary - null / undefined
  it('6. defensive boundary: returns 0 pay when hours or rate is null or undefined', () => {
    const res1 = calculateShiftPay(null, 80);
    const res2 = calculateShiftPay(8.0, undefined);
    expect(res1.totalTakeHome).toBe(0);
    expect(res2.totalTakeHome).toBe(0);
  });

  // Test 7: Defensive boundary - negative hours
  it('7. defensive boundary: returns 0 pay when hours is negative', () => {
    const res = calculateShiftPay(-5.0, 80);
    expect(res.totalTakeHome).toBe(0);
    expect(res.regularHours).toBe(0);
  });

  // Test 8: Defensive boundary - non-numeric string
  it('8. defensive boundary: returns 0 pay when inputs are non-numeric strings', () => {
    const res = calculateShiftPay('invalid_hours', 'not_a_number');
    expect(res.totalTakeHome).toBe(0);
    expect(res.regularPay).toBe(0);
  });

  // Test 9: Fatigue level - SAFE
  it('9. enforces fatigue level: NORMAL / SAFE when shift hours are below 9.0h', () => {
    const radar = checkFatigueLockout(6.5);
    expect(radar.isLockedOut).toBe(false);
    expect(radar.status).toBe('NORMAL');
    expect(radar.level).toBe('SAFE');
  });

  // Test 10: Fatigue level - AMBER OVERTIME_WARNING
  it('10. enforces fatigue level: AMBER / OVERTIME_WARNING when shift hours reach 9.5h', () => {
    const radar = checkFatigueLockout(9.5);
    expect(radar.isLockedOut).toBe(false);
    expect(radar.status).toBe('OVERTIME_WARNING');
    expect(radar.level).toBe('AMBER');
  });

  // Test 11: Statutory lockout ceiling - CRITICAL STANDDOWN_LOCKOUT
  it('11. enforces statutory lockout ceiling: STANDDOWN_LOCKOUT when shift hours reach 12.0h', () => {
    const radar = checkFatigueLockout(12.0);
    expect(radar.isLockedOut).toBe(true);
    expect(radar.status).toBe('STANDDOWN_LOCKOUT');
    expect(radar.level).toBe('CRITICAL');
  });

  // Test 12: Resolves 3 standard cross-sector configurations
  it('12. resolves 3 standard cross-sector configurations (Apex, SRM, Metro Health)', () => {
    const s1 = resolveSectorConfig('apex-infra');
    const s2 = resolveSectorConfig('srm-facilities');
    const s3 = resolveSectorConfig('metro-health');

    expect(s1.protocol).toBe('BOCW-96');
    expect(s2.protocol).toBe('BOCW-12');
    expect(s3.protocol).toBe('BOCW-88');
  });

  // Test 13: 404 / Unknown sector fallback
  it('13. 404 / Unknown sector fallback: defaults to Apex Infrastructure without throwing', () => {
    const sUnknown = resolveSectorConfig('unregistered_random_sector_404');
    expect(sUnknown).toBeDefined();
    expect(sUnknown.id).toBe('apex-infra');
    expect(sUnknown.protocol).toBe('BOCW-96');
  });

  // Test 14: 404 / Unsupported language fallback
  it('14. 404 / Unsupported language fallback: defaults to English without throwing', () => {
    expect(resolveLanguage('hi')).toBe('hi');
    expect(resolveLanguage('ta')).toBe('ta');
    expect(resolveLanguage('fr_UNKNOWN_404')).toBe('en');
    expect(resolveLanguage(null)).toBe('en');
  });

  // Test 15: Cryptographic zero-PII assertion
  it('15. cryptographic zero-PII assertion: verifies anonymous ticket ID format matches regex with zero PII', () => {
    const ticketId = generateAnonymousTicketId('worker-identity-hash-salt-9812');
    const whistleRegex = /^#WHISTLE-[A-Z0-9]{6}$/;
    expect(whistleRegex.test(ticketId)).toBe(true);
    expect(ticketId).not.toContain('+91');
    expect(ticketId).not.toContain('Patel');
  });
});
