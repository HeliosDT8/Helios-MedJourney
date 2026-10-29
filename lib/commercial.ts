/** Central source for publicly displayed commercial terms. Confirm the draft guarantee with counsel before launch. */
export const COMMERCIAL = {
  currency: "CAD",
  foundingPlacementFee: 15_000,
  standardPlacementFee: 18_000,
  upfrontPlacementFee: 0,
  replacementSearchCount: 1,
  replacementPeriodCalendarDays: 90,
  replacementNoticeDays: 10,
  paymentTrigger: "The placement invoice trigger and payment deadline will be set out in the signed recruitment agreement.",
  taxes: "Applicable taxes, if any, are additional.",
  additionalCosts: "Additional services or third-party costs require disclosure and your written approval in advance.",
} as const;

export const formatFee = (amount: number) => new Intl.NumberFormat("en-CA", {
  style: "currency", currency: COMMERCIAL.currency, maximumFractionDigits: 0,
}).format(amount);

export const replacementSummary = `One eligible replacement search within ${COMMERCIAL.replacementPeriodCalendarDays} calendar days of the physician's start date, subject to the signed recruitment agreement. A replacement search does not guarantee that another suitable candidate will be found or hired.`;

export const upfrontPlacementSummary = COMMERCIAL.upfrontPlacementFee === 0
  ? "No upfront recruitment placement fee."
  : `${formatFee(COMMERCIAL.upfrontPlacementFee)} upfront recruitment placement fee.`;
