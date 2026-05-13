export type GstInput = {
  amount: number;
  isBranded: boolean;
  isInterState: boolean;
};

export type GstBreakdown = {
  gstRate: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
};

export function calculateGst({ amount, isBranded, isInterState }: GstInput): GstBreakdown {
  const gstRate = isBranded ? 5 : 0;
  const gstAmount = (amount * gstRate) / 100;

  return {
    gstRate,
    gstAmount,
    cgst: isInterState ? 0 : gstAmount / 2,
    sgst: isInterState ? 0 : gstAmount / 2,
    igst: isInterState ? gstAmount : 0,
    total: amount + gstAmount
  };
}

export function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number.isFinite(value) ? value : 0);
}
