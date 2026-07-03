export const riskTrend = [
  { month: "Jan", critical: 34, enhanced: 54 },
  { month: "Feb", critical: 42, enhanced: 58 },
  { month: "Mar", critical: 37, enhanced: 64 },
  { month: "Apr", critical: 55, enhanced: 68 },
  { month: "May", critical: 49, enhanced: 61 },
  { month: "Jun", critical: 70, enhanced: 74 },
]

export const riskDrivers = [
  { driver: "Split invoice", score: 95 },
  { driver: "Blacklisted supplier", score: 71 },
  { driver: "Invoice z-score", score: 42 },
  { driver: "Supplier risk score", score: 33 },
]

export const complianceControls = [
  { control: "Policy", score: 82 },
  { control: "Supplier", score: 74 },
  { control: "Invoice", score: 68 },
  { control: "Approval", score: 59 },
]