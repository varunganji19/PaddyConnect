export const dashboardSnapshot = {
  owner: "Ravi",
  date: "Saturday, 9 May 2026",
  stats: [
    { label: "Today's Purchase", value: "150 bags", tone: "paddy" },
    { label: "Pending Payments", value: "₹45,000", tone: "ledger" },
    { label: "Stock in Godown", value: "320 bags", tone: "success" },
    { label: "Month Profit", value: "₹18,500", tone: "government" }
  ],
  activityItems: [
    { title: "Paddy Received: Farmer Subbarao", subtitle: "10:30 AM • Lorry AP16XX1234", value: "+50 bags", type: "purchase", valueColor: "text-ink" },
    { title: "Payment Dispatched", subtitle: "Yesterday • Bank Transfer", value: "-₹15,000", type: "payment", valueColor: "text-danger" },
    { title: "Milling Batch Completed", subtitle: "Yesterday • Batch #402", value: "120qtl", type: "milling", valueColor: "text-ink" }
  ],
  alerts: [
    { title: "CMR deadline", message: "200 bags due in 3 days", variant: "warning" as const },
    { title: "Overdue khata", message: "Srinivas Traders is 5 days overdue", variant: "danger" as const }
  ]
};

export const purchases = [
  { farmer: "Ramu Reddy", meta: "100 bags · Fine", rate: "₹2,100/q", total: "₹1,59,500", time: "Today, 9:00 AM" },
  { farmer: "Suresh Kumar", meta: "50 bags · Coarse", rate: "₹1,950/q", total: "₹73,125", time: "Today, 11:30 AM" }
];

export const sales = [
  { buyer: "Srinivas Traders", meta: "80 bags · Fine Boiled", rate: "₹35/kg", total: "₹2,20,500", paid: false },
  { buyer: "Lakshmi Foods", meta: "40 bags · Raw Rice", rate: "₹32/kg", total: "₹96,000", paid: true }
];

export const khataRows = [
  { party: "Srinivas Traders", amount: "₹45,000", meta: "Since 5 May 2026", overdue: "5 days overdue", type: "receivable" },
  { party: "Ravi Fertilizers", amount: "₹33,000", meta: "Due 15 May 2026", overdue: "", type: "payable" }
];

export const stockGroups = [
  { title: "Paddy (Raw)", icon: "grain" as const, rows: [
    { name: "Fine", qty: "12,450", unit: "Qtl", status: "Sufficient", variant: "success" as const },
    { name: "Coarse", qty: "8,200", unit: "Qtl", status: "Reorder Soon", variant: "warning" as const }
  ]},
  { title: "Milled Rice", icon: "cube" as const, rows: [
    { name: "Fine", qty: "4,500", unit: "Qtl", status: "", variant: "info" as const },
    { name: "Boiled", qty: "2,100", unit: "Qtl", status: "", variant: "info" as const },
    { name: "Coarse", qty: "150", unit: "Qtl", status: "Low Stock", variant: "danger" as const }
  ]},
  { title: "By-Products", icon: "leaf" as const, rows: [
    { name: "Bran", qty: "1,850", unit: "Qtl", status: "", variant: "info" as const },
    { name: "Husk", qty: "3,200", unit: "Qtl", status: "", variant: "info" as const },
    { name: "Broken", qty: "450", unit: "Qtl", status: "", variant: "info" as const }
  ]},
  { title: "Inputs", icon: "bag" as const, rows: [
    { name: "Gunny Bags", qty: "15,000", unit: "Pcs", status: "Adequate", variant: "success" as const }
  ]}
];

export const deliveryLog = [
  { truck: "Truck AP16 TX 4590", date: "Oct 24, 2024", receipt: "#RC-9021", bags: "+400", status: "ACCEPTED" },
  { truck: "Truck TS08 AB 1234", date: "Oct 20, 2024", receipt: "#RC-8842", bags: "+600", status: "ACCEPTED" },
  { truck: "Truck TS09 CD 5678", date: "Oct 26, 2024", receipt: "Dispatched", bags: "+350", status: "IN TRANSIT" }
];
