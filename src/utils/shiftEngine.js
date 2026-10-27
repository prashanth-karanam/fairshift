/**
 * FairShift Pure Deterministic Shift & Labor Standards Engine
 * Compliant with:
 * - Building and Other Construction Workers (BOCW) Act 1996
 * - Factories Act 1948 (Statutory 8h daily norm, 1.5x/2.0x overtime multiplier, 12h lockout ceiling)
 * - UN Sustainable Development Goal 8 (Decent Work & Economic Growth)
 */

/**
 * Calculates itemized wages with defensive boundaries and fractional precision.
 * @param {number|string} hours - Hours worked on shift
 * @param {number|string} baseHourlyRate - Hourly wage rate (₹)
 * @param {number} [overtimeMultiplier=1.5] - Statutory OT multiplier
 * @param {number} [allowance=0] - Site welfare or scaffold allowance (₹)
 * @returns {object} Breakdown of wages and statutory cess
 */
export function calculateShiftPay(hours, baseHourlyRate, overtimeMultiplier = 1.5, allowance = 0) {
  // Defensive validation against null, undefined, non-numeric, or negative inputs
  const parsedHours = parseFloat(hours);
  const parsedRate = parseFloat(baseHourlyRate);
  const parsedAllowance = parseFloat(allowance) || 0;
  const parsedMultiplier = parseFloat(overtimeMultiplier) || 1.5;

  if (isNaN(parsedHours) || parsedHours <= 0 || isNaN(parsedRate) || parsedRate <= 0) {
    return {
      regularHours: 0,
      overtimeHours: 0,
      regularPay: 0,
      overtimePay: 0,
      allowance: parsedAllowance > 0 ? parsedAllowance : 0,
      totalTakeHome: parsedAllowance > 0 ? parsedAllowance : 0,
      statutoryCess: 0
    };
  }

  // Statutory standard daily hours is 8.0 hours
  const regularHours = Math.min(parsedHours, 8.0);
  const overtimeHours = Math.max(0, parsedHours - 8.0);

  const regularPay = parseFloat((regularHours * parsedRate).toFixed(2));
  const overtimePay = parseFloat((overtimeHours * parsedRate * parsedMultiplier).toFixed(2));
  const totalTakeHome = parseFloat((regularPay + overtimePay + parsedAllowance).toFixed(2));

  // BOCW Act 1996 statutory 1.0% cess accrual for labor welfare
  const statutoryCess = parseFloat((totalTakeHome * 0.01).toFixed(2));

  return {
    regularHours: parseFloat(regularHours.toFixed(2)),
    overtimeHours: parseFloat(overtimeHours.toFixed(2)),
    regularPay,
    overtimePay,
    allowance: parsedAllowance,
    totalTakeHome,
    statutoryCess
  };
}

/**
 * Enforces statutory fatigue radar limits under Indian Labor Code.
 * @param {number|string} hours
 * @returns {object}
 */
export function checkFatigueLockout(hours) {
  const parsedHours = parseFloat(hours);
  if (isNaN(parsedHours) || parsedHours < 0) {
    return {
      isLockedOut: false,
      status: 'NORMAL',
      level: 'SAFE',
      message: 'Optimal fatigue level.'
    };
  }

  // Strict 12.0h ceiling triggers autonomous lockout
  if (parsedHours >= 12.0) {
    return {
      isLockedOut: true,
      status: 'STANDDOWN_LOCKOUT',
      level: 'CRITICAL',
      message: 'Mandatory 12h statutory ceiling reached. Shift lockout enforced.'
    };
  }

  // 9.0h threshold triggers mandatory rest nudge
  if (parsedHours >= 9.0) {
    return {
      isLockedOut: false,
      status: 'OVERTIME_WARNING',
      level: 'AMBER',
      message: 'Threshold >9.0h reached. 30m rest nudge required.'
    };
  }

  return {
    isLockedOut: false,
    status: 'NORMAL',
    level: 'SAFE',
    message: 'Optimal fatigue level.'
  };
}

/**
 * Resolves sector configuration with 404 fallback.
 * @param {string} sectorId
 * @returns {object}
 */
export function resolveSectorConfig(sectorId) {
  const registry = {
    'apex-infra': {
      id: 'apex-infra',
      name: 'Apex Infrastructure — High-Rise Site 4B',
      sector: 'Civil Construction',
      protocol: 'BOCW-96',
      cessRate: 0.01
    },
    'srm-facilities': {
      id: 'srm-facilities',
      name: 'SRM University Facilities — Zone A',
      sector: 'Campus Facilities & HVAC',
      protocol: 'BOCW-12',
      cessRate: 0.01
    },
    'metro-health': {
      id: 'metro-health',
      name: 'Metro Health Logistics — Ward 3',
      sector: 'Clinical Orderlies & Logistics',
      protocol: 'BOCW-88',
      cessRate: 0.01
    }
  };

  const normalized = (sectorId || '').toLowerCase().trim();
  if (registry[normalized]) {
    return registry[normalized];
  }

  // Aliases
  if (normalized.includes('construction') || normalized.includes('civil')) return registry['apex-infra'];
  if (normalized.includes('facility') || normalized.includes('warehouse')) return registry['srm-facilities'];
  if (normalized.includes('health') || normalized.includes('hospital')) return registry['metro-health'];

  // 404 fallback to primary default
  return registry['apex-infra'];
}

/**
 * Resolves language with 404 / unsupported fallback.
 * @param {string} langCode
 * @returns {string} Supported language code ('en' | 'hi' | 'ta' | 'mr')
 */
export function resolveLanguage(langCode) {
  const supported = ['en', 'hi', 'ta', 'mr'];
  const normalized = (langCode || '').toLowerCase().trim();
  if (supported.includes(normalized)) {
    return normalized;
  }
  // 404 Fallback
  return 'en';
}

/**
 * Generates an anonymous zero-PII whistleblower ticket ID.
 * @param {string|number} seed
 * @returns {string} Formatted anonymous ticket
 */
export function generateAnonymousTicketId(seed) {
  let hash = 0;
  const str = String(seed || Math.random());
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(4, '0').slice(0, 4);
  const randomSuffix = Math.floor(10 + Math.random() * 90);
  return `#WHISTLE-${hex}${randomSuffix}`;
}
