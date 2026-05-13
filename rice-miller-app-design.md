# 🌾 Rice Miller App — Module Design
### What the App is Made Of, Screen by Screen

---

## 📦 Module Overview

```
Rice Miller App
│
├── 🔐 Module 1 — Auth & Profile
├── 🏠 Module 2 — Dashboard
├── 🌾 Module 3 — Paddy Purchase
├── 💰 Module 4 — Sales
├── 🧮 Module 5 — GST Calculator
├── 📄 Module 6 — Invoice Generator
├── 📒 Module 7 — Khata (Ledger)
├── 🏚️ Module 8 — Godown / Stock
├── 🏛️ Module 9 — CMR Tracker (Govt)
├── 📊 Module 10 — Reports
├── 🤖 Module 11 — AI Assistant
└── ⚙️  Module 12 — Settings
```

---

## 🔐 Module 1 — Auth & Profile

### What it does
Handles miller login and their mill information.

### Screens

#### 1.1 Login Screen
```
┌──────────────────────────┐
│   🌾 Rice Miller App     │
│   లాగిన్ చేయండి          │
│                          │
│  [ Mobile Number       ] │
│  [ Send OTP Button     ] │
│                          │
│  [ OTP Input           ] │
│  [ Verify & Enter      ] │
└──────────────────────────┘
```
**Fields:** Mobile number, OTP
**Logic:** Supabase OTP via SMS → Auto-detect if new user → Redirect to Profile Setup

---

#### 1.2 Mill Profile Setup (First Time Only)
```
┌──────────────────────────┐
│   Setup Your Mill        │
│                          │
│  Mill Name          [ ] │
│  Owner Name         [ ] │
│  Village            [ ] │
│  District           [ ] │
│  GSTIN (optional)   [ ] │
│  Mill Type:              │
│  ○ Raw Rice  ○ Boiled   │
│                          │
│  [ Save & Continue ]    │
└──────────────────────────┘
```
**Fields:** Mill name, owner name, village, district, GSTIN, mill type (raw/boiled)
**Logic:** Saved once, editable in Settings later

---

## 🏠 Module 2 — Dashboard

### What it does
The first screen after login. Shows today's snapshot at a glance.

### Screen: Home Dashboard
```
┌──────────────────────────────────────┐
│  నమస్కారం, రవి గారు 🙏               │
│  Saturday, 10 May 2026               │
│                                      │
│  ┌─────────────┐  ┌─────────────┐   │
│  │ Today's     │  │ Pending     │   │
│  │ Purchase    │  │ Payments    │   │
│  │ 150 bags    │  │ ₹45,000    │   │
│  └─────────────┘  └─────────────┘   │
│                                      │
│  ┌─────────────┐  ┌─────────────┐   │
│  │ Stock in    │  │ Month       │   │
│  │ Godown      │  │ Profit      │   │
│  │ 320 bags    │  │ ₹18,500    │   │
│  └─────────────┘  └─────────────┘   │
│                                      │
│  ── Recent Activity ──               │
│  • Bought 50 bags from Ramu  10min  │
│  • Invoice sent to Suresh    1hr    │
│  • Payment received ₹12,000  2hr    │
│                                      │
│  ── CMR Alert ──                     │
│  ⚠️ 200 bags due in 3 days          │
└──────────────────────────────────────┘
```

**Cards shown:**
- Today's Paddy Purchased (bags)
- Pending Payments (₹)
- Stock in Godown (bags)
- This Month's Profit (₹)

**List shown:**
- Last 5 activities (purchases, sales, payments)

**Alerts shown:**
- CMR deadline warnings
- Overdue khata payments

---

## 🌾 Module 3 — Paddy Purchase

### What it does
Record every paddy purchase from farmers with all charges.

### Screens

#### 3.1 Purchase List
```
┌──────────────────────────────┐
│  Paddy Purchases    [+ New]  │
│  Filter: Today ▼             │
│                              │
│  ┌────────────────────────┐  │
│  │ Ramu Reddy             │  │
│  │ 100 bags · Fine        │  │
│  │ ₹2,100/q · ₹42,000   │  │
│  │ Today, 9:00 AM         │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ Suresh Kumar           │  │
│  │ 50 bags · Coarse       │  │
│  │ ₹1,950/q · ₹19,500   │  │
│  │ Today, 11:30 AM        │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```
**Filters:** Today / This Week / This Month / Custom Date

---

#### 3.2 New Purchase Entry
```
┌──────────────────────────────┐
│  New Purchase                │
│                              │
│  Farmer Name / రైతు పేరు     │
│  [ Ramu Reddy             ]  │
│                              │
│  Variety:  ○ Fine  ○ Coarse │
│                              │
│  Bags / బస్తాలు              │
│  [ 100                    ]  │
│                              │
│  Weight per Bag (kg)         │
│  [ 75                     ]  │
│                              │
│  Price per Quintal (₹)       │
│  [ 2100                   ]  │
│                              │
│  ── Charges / చార్జీలు ──    │
│  Hamali  [ 500  ]            │
│  Lorry   [ 1200 ]            │
│  Mandi   [ 300  ]            │
│                              │
│  ── Auto Calculated ──       │
│  Total Weight  75 Quintals   │
│  Base Amount   ₹1,57,500     │
│  Total Charges ₹2,000        │
│  Total Cost    ₹1,59,500     │
│                              │
│  [ 🤖 Fill from Text/Voice ] │
│                              │
│  [ Save Purchase ]           │
└──────────────────────────────┘
```

**Fields:**
- Farmer name
- Variety (Fine / Coarse)
- Number of bags
- Weight per bag (kg)
- Price per quintal (₹)
- Hamali charges (₹)
- Lorry / transport charges (₹)
- Mandi / market committee charges (₹)

**Auto-calculated:**
- Total weight in quintals
- Base amount
- All-in total cost
- Cost per kg (for profit calculation later)

**AI button:** Tap → speak or type naturally → form auto-fills

---

#### 3.3 Purchase Detail View
- Full breakdown of one purchase
- Option to edit or delete
- Add to Khata button (if payment is pending)

---

## 💰 Module 4 — Sales

### What it does
Record every rice sale made to buyers/traders.

### Screens

#### 4.1 Sales List
Same layout as Purchase List but for sales.

---

#### 4.2 New Sale Entry
```
┌──────────────────────────────┐
│  New Sale                    │
│                              │
│  Buyer Name                  │
│  [ Srinivas Traders       ]  │
│                              │
│  Rice Type                   │
│  [ Fine Boiled Rice       ]  │
│                              │
│  Bags  [ 80  ]               │
│  Weight per bag (kg) [ 75 ]  │
│  Price per kg (₹) [ 35    ]  │
│                              │
│  ── GST ──                   │
│  Is Branded & Packaged?      │
│  ○ No (0% GST)               │
│  ○ Yes (5% GST)              │
│                              │
│  ── Auto Calculated ──       │
│  Total Weight   6000 kg      │
│  Base Amount    ₹2,10,000    │
│  GST (5%)       ₹10,500      │
│  Grand Total    ₹2,20,500    │
│                              │
│  [ Save & Generate Invoice ] │
└──────────────────────────────┘
```

**Fields:**
- Buyer name
- Rice type (Fine/Coarse, Raw/Boiled)
- Bags and weight
- Price per kg
- Branded/packaged toggle (decides GST)
- Inter-state toggle (IGST vs CGST+SGST)

**Auto-calculated:**
- Total weight
- Base amount
- GST (0% or 5%)
- Grand total

---

## 🧮 Module 5 — GST Calculator

### What it does
Standalone calculator for quick GST queries. Works without saving anything.

### Screen: GST Calculator
```
┌──────────────────────────────┐
│  GST Calculator              │
│  HSN Code: 1006 (Rice)       │
│                              │
│  Enter Amount (₹)            │
│  [ 1,00,000               ]  │
│                              │
│  Rice Type:                  │
│  ○ Unbranded / Loose (0%)   │
│  ○ Branded / Packaged (5%)  │
│                              │
│  Sale Type:                  │
│  ○ Intra-State (CGST+SGST)  │
│  ○ Inter-State (IGST)        │
│                              │
│  [ Calculate ]               │
│                              │
│  ┌────────────────────────┐  │
│  │ Base Amount  ₹1,00,000 │  │
│  │ GST Rate     5%        │  │
│  │ CGST (2.5%)  ₹2,500   │  │
│  │ SGST (2.5%)  ₹2,500   │  │
│  │ Total        ₹1,05,000 │  │
│  └────────────────────────┘  │
│                              │
│  ── Ask AI about GST ──      │
│  [ Type your question...  ]  │
│  [ Ask 🤖 ]                  │
└──────────────────────────────┘
```

**Inputs:** Amount, rice type toggle, sale type toggle
**Output:** CGST, SGST or IGST breakdown, total
**AI section:** Free-text question → Claude answers in Telugu/English

---

## 📄 Module 6 — Invoice Generator

### What it does
Generate professional PDF invoices and share via WhatsApp in one tap.

### Screens

#### 6.1 Invoice List
- All past invoices with buyer name, amount, date
- Status: Paid / Unpaid
- Tap to view, reshare, or mark paid

---

#### 6.2 Create Invoice
```
┌──────────────────────────────┐
│  Create Invoice              │
│                              │
│  From Sale: Srinivas Traders │
│  (auto-filled from sale)     │
│                              │
│  Invoice No: INV-2026-047    │
│  Date: 10 May 2026           │
│                              │
│  Mill Name & GSTIN           │
│  (auto-filled from profile)  │
│                              │
│  Preview:                    │
│  ┌────────────────────────┐  │
│  │ [Mill Name]            │  │
│  │ GSTIN: XXXXXXXXXXXX    │  │
│  │ TAX INVOICE            │  │
│  │ ─────────────────────  │  │
│  │ To: Srinivas Traders   │  │
│  │ Item  Bags  Wt  Rate   │  │
│  │ Fine  80   6000  ₹35   │  │
│  │ ─────────────────────  │  │
│  │ Base:      ₹2,10,000   │  │
│  │ GST 5%:    ₹10,500     │  │
│  │ Total:     ₹2,20,500   │  │
│  └────────────────────────┘  │
│                              │
│  [ 📤 Share via WhatsApp ]   │
│  [ 📥 Download PDF       ]   │
│  [ 🖨️ Print              ]   │
└──────────────────────────────┘
```

**Auto-filled from:** Sale entry + Mill profile
**Output options:** WhatsApp share, PDF download, Print

---

## 📒 Module 7 — Khata (Ledger)

### What it does
Track who owes you money and who you owe. The digital version of the miller's notebook.

### Screens

#### 7.1 Khata Summary
```
┌──────────────────────────────┐
│  Khata / లెక్కలు              │
│                              │
│  You will Receive: ₹78,000  │
│  You have to Pay:  ₹23,000  │
│  Net Balance:      ₹55,000  │
│                              │
│  Tabs: [Receivable][Payable] │
│                              │
│  ┌────────────────────────┐  │
│  │ Srinivas Traders       │  │
│  │ ₹45,000 pending        │  │
│  │ Since: 5 May 2026      │  │
│  │ ⚠️ 5 days overdue      │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ Ravi Fertilizers       │  │
│  │ ₹33,000 pending        │  │
│  │ Due: 15 May 2026       │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

#### 7.2 Party Khata Detail
```
┌──────────────────────────────┐
│  ← Srinivas Traders          │
│  Phone: 9876543210           │
│                              │
│  Total Due: ₹45,000          │
│                              │
│  Transaction History:        │
│  ┌────────────────────────┐  │
│  │ Sale — 80 bags         │  │
│  │ + ₹2,20,500   5 May   │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ Payment Received       │  │
│  │ - ₹1,75,000   7 May   │  │
│  └────────────────────────┘  │
│                              │
│  Balance: ₹45,500            │
│                              │
│  [ + Add Payment ]           │
│  [ 📤 Send Reminder ]        │
└──────────────────────────────┘
```

**Features:**
- Receivable vs Payable tabs
- Per-party transaction history
- Overdue highlight (red after due date)
- Send WhatsApp reminder button (auto-drafted message)
- Mark payment received

---

#### 7.3 Add Manual Khata Entry
For cash transactions or adjustments not linked to a sale/purchase.

**Fields:** Party name, type (receivable/payable), amount, description, due date

---

## 🏚️ Module 8 — Godown / Stock

### What it does
Track what's physically sitting in your godown right now.

### Screen: Stock Overview
```
┌──────────────────────────────┐
│  Godown Stock                │
│  Last updated: Today 2:00 PM │
│                              │
│  ── Paddy (Raw) ──           │
│  Fine Paddy     120 bags     │
│  Coarse Paddy    40 bags     │
│                              │
│  ── Milled Rice ──           │
│  Fine Rice      200 bags     │
│  Boiled Rice     80 bags     │
│  Coarse Rice     60 bags     │
│                              │
│  ── By-Products ──           │
│  Rice Bran       15 bags     │
│  Husk            30 bags     │
│  Broken Rice      8 bags     │
│                              │
│  ── Inputs ──                │
│  Gunny Bags (new)  250 pcs   │
│  Gunny Bags (used)  80 pcs   │
│                              │
│  [ + Manual Adjustment ]     │
└──────────────────────────────┘
```

**Stock auto-updates when:**
- Purchase is saved → paddy stock increases
- Sale is saved → rice stock decreases
- Manual adjustment → for physical audit corrections

**Alerts:**
- Low stock warning (below set threshold)
- Gunny bag stock low

---

## 🏛️ Module 9 — CMR Tracker (Government)

### What it does
Track Custom Milled Rice obligations to the government — the most stressful part of being a miller in Telangana.

### Screen: CMR Dashboard
```
┌──────────────────────────────┐
│  CMR Tracker                 │
│  Custom Milled Rice          │
│                              │
│  Current Season: Kharif 2025 │
│                              │
│  Allocated:    5,000 bags    │
│  Delivered:    3,200 bags    │
│  Remaining:    1,800 bags    │
│                              │
│  ━━━━━━━━━━━━━━━━  64%      │
│                              │
│  Deadline: 30 May 2026       │
│  ⚠️ 20 days remaining        │
│                              │
│  ── Delivery Log ──          │
│  ┌────────────────────────┐  │
│  │ 500 bags to FCI Nalgonda│  │
│  │ 28 April 2026          │  │
│  └────────────────────────┘  │
│                              │
│  [ + Add Delivery ]          │
│  [ CMR Yield Calculator ]    │
└──────────────────────────────┘
```

**CMR Yield Calculator sub-screen:**
- Input: Paddy bags received from govt
- Output: Expected rice yield (58–67 kg per quintal)
- Variance tracking (actual vs expected — millers get penalized for shortfall)

---

## 📊 Module 10 — Reports

### What it does
Show the miller where their money went and how much they made.

### Screens

#### 10.1 Report Selection
```
┌──────────────────────────────┐
│  Reports                     │
│                              │
│  Period: [ This Month ▼ ]    │
│                              │
│  [ 📦 Purchase Report     ]  │
│  [ 💰 Sales Report        ]  │
│  [ 📒 Khata Report        ]  │
│  [ 💹 Profit & Loss       ]  │
│  [ 🏚️ Stock Report        ]  │
│  [ 🧾 GST Summary         ]  │
│  [ 🏛️ CMR Status Report   ]  │
└──────────────────────────────┘
```

---

#### 10.2 Profit & Loss Report
```
┌──────────────────────────────┐
│  P&L — May 2026              │
│                              │
│  INCOME                      │
│  Sales Revenue    ₹8,40,000  │
│  By-product Sales   ₹12,000  │
│  Total Income     ₹8,52,000  │
│                              │
│  EXPENSES                    │
│  Paddy Purchase   ₹6,30,000  │
│  Hamali Charges     ₹18,000  │
│  Lorry Charges      ₹24,000  │
│  Mandi Charges       ₹9,000  │
│  Electricity         ₹8,500  │
│  Staff Wages        ₹22,000  │
│  Gunny Bags          ₹4,500  │
│  Total Expenses   ₹7,16,000  │
│                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Net Profit       ₹1,36,000  │
│  Profit Margin        15.9%  │
│                              │
│  [ 📤 Share Report ]         │
└──────────────────────────────┘
```

---

#### 10.3 GST Summary Report
- Total taxable sales (5% slab)
- Total exempt sales (0% slab)
- Total CGST collected
- Total SGST collected
- Ready-to-file GSTR-1 summary

---

## 🤖 Module 11 — AI Assistant

### What it does
A smart helper that answers questions, fills forms, and summarizes business in Telugu.

### Screens

#### 11.1 AI Chat Screen
```
┌──────────────────────────────┐
│  🤖 AI Assistant             │
│                              │
│  ┌────────────────────────┐  │
│  │ You: బాయిల్డ్ రైస్ కి  │  │
│  │ GST ఉంటుందా?           │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ AI: అవును, బ్రాండెడ్  │  │
│  │ & ప్యాకేజ్డ్ బాయిల్డ్  │  │
│  │ రైస్ కి 5% GST వర్తి-  │  │
│  │ స్తుంది (HSN 1006).    │  │
│  │ లూస్ / అన్‌బ్రాండెడ్  │  │
│  │ రైస్ కి GST లేదు.      │  │
│  └────────────────────────┘  │
│                              │
│  Quick Questions:            │
│  [CMR deadline?]             │
│  [This month profit?]        │
│  [Who owes me most?]         │
│                              │
│  [ Type or speak... 🎤 ]     │
└──────────────────────────────┘
```

**AI can answer:**
- GST questions (Telugu/English)
- "How much profit did I make this month?"
- "Who hasn't paid me yet?"
- "When is my CMR deadline?"
- "What was my best selling rice this month?"

**AI can do:**
- Fill purchase form from voice/text
- Generate monthly summary in Telugu
- Draft WhatsApp payment reminder message

---

#### 11.2 Smart Entry (AI Form Fill)
```
┌──────────────────────────────┐
│  🤖 Smart Entry              │
│                              │
│  Speak or type what happened:│
│                              │
│  [ రాముడు నుండి 200 బస్తాలు  │
│    fine paddy 2100 కి         │
│    తీసుకున్నాం, 800 hamali  ] │
│                              │
│  [ Parse & Fill Form 🤖 ]    │
│                              │
│  Result:                     │
│  ┌────────────────────────┐  │
│  │ Farmer: రాముడు         │  │
│  │ Bags: 200              │  │
│  │ Variety: Fine          │  │
│  │ Price/Q: ₹2,100        │  │
│  │ Hamali: ₹800           │  │
│  └────────────────────────┘  │
│                              │
│  [ ✅ Save This Purchase ]   │
└──────────────────────────────┘
```

---

## ⚙️ Module 12 — Settings

### What it does
App configuration, language, and profile management.

### Screen: Settings
```
┌──────────────────────────────┐
│  Settings                    │
│                              │
│  ── Mill Profile ──          │
│  Mill Name       Sai Mills   │
│  Owner           Ravi Kumar  │
│  Village         Nalgonda    │
│  GSTIN           36XXXXX     │
│  [ Edit Profile ]            │
│                              │
│  ── Preferences ──           │
│  Language    [ Telugu ▼ ]    │
│  Theme       [ Light  ▼ ]    │
│  Default Variety [Fine ▼]    │
│                              │
│  ── Notifications ──         │
│  CMR Deadline Alerts   ✅    │
│  Khata Overdue Alerts  ✅    │
│  Stock Low Alerts      ✅    │
│                              │
│  ── Subscription ──          │
│  Plan: Basic (₹499/yr)       │
│  Expires: 1 Jan 2027         │
│  [ Upgrade to Pro ]          │
│                              │
│  ── Data ──                  │
│  [ Export All Data ]         │
│  [ Backup to Drive ]         │
│                              │
│  [ Logout ]                  │
└──────────────────────────────┘
```

---

## 🔗 How Modules Connect

```
LOGIN
  │
  ▼
DASHBOARD ──────────────────────────────────┐
  │                                         │
  ├──► PADDY PURCHASE ──► KHATA (if credit) │
  │         │                               │
  │         ▼                               │
  │      GODOWN STOCK (auto-update)         │
  │                                         │
  ├──► SALES ──► INVOICE ──► KHATA          │
  │       │           │                     │
  │       │           └──► WhatsApp Share   │
  │       │                                 │
  │       └──► GODOWN STOCK (auto-update)   │
  │                                         │
  ├──► GST CALCULATOR (standalone)          │
  │                                         │
  ├──► CMR TRACKER (government)             │
  │                                         │
  ├──► REPORTS (reads all modules)          │
  │                                         │
  ├──► AI ASSISTANT (reads all modules)     │
  │                                         │
  └──► SETTINGS                             │
              ▲                             │
              └─────────────────────────────┘
```

---

## 📱 Navigation Structure

```
Bottom Tab Bar (always visible):
├── 🏠 Home (Dashboard)
├── 🌾 Purchase
├── 💰 Sales
├── 📒 Khata
└── 📊 Reports

Accessible from Home or side menu:
├── 🧮 GST Calculator
├── 📄 Invoice Generator
├── 🏚️ Godown / Stock
├── 🏛️ CMR Tracker
├── 🤖 AI Assistant
└── ⚙️ Settings
```

---

## 🚦 Module Build Priority

| Priority | Module | Why |
|---|---|---|
| 🔴 Build First | Auth & Profile | Nothing works without login |
| 🔴 Build First | Paddy Purchase | Core daily activity |
| 🔴 Build First | GST Calculator | Immediate value, no DB needed |
| 🔴 Build First | Khata | Millers check this every day |
| 🟡 Build Second | Sales + Invoice | Needed to complete the loop |
| 🟡 Build Second | Dashboard | Needs data from other modules |
| 🟡 Build Second | Godown / Stock | Useful but not urgent Day 1 |
| 🟢 Build Third | Reports | Needs 2–3 weeks of data first |
| 🟢 Build Third | CMR Tracker | Seasonal, not daily |
| 🟢 Build Third | AI Assistant | Differentiator, add after core works |
| 🟢 Build Last | Settings | Polish phase |

---

## 🧩 Data Each Module Reads / Writes

| Module | Reads From | Writes To |
|---|---|---|
| Dashboard | All tables | Nothing (display only) |
| Paddy Purchase | — | purchases, stock, khata |
| Sales | stock | sales, khata |
| GST Calculator | — | Nothing (calculator only) |
| Invoice | sales, mill profile | invoices |
| Khata | purchases, sales | khata payments |
| Godown | purchases, sales | stock (manual adjust) |
| CMR Tracker | — | cmr_records |
| Reports | All tables | Nothing (display only) |
| AI Assistant | All tables | Nothing (reads & answers) |
| Settings | mill profile | mill profile |

---

*Module Design v1.0 — Rice Miller App*
*Telangana, India | Built for small & mid-size rice millers*
