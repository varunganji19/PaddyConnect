# 🌾 Rice Miller App — Build Brief
> This file is the single source of truth for AI coding agents (Claude Code, Codex).
> Read this fully before writing any code. Follow the decisions made here exactly.

---

## 1. WHAT WE ARE BUILDING

A mobile-first Android app (with web support) for rice millers in Telangana, India.
It replaces pen-and-paper and broken Excel workflows with a clean, Telugu-language app
that handles invoicing, GST, khata (ledger), and stock management.

**Target User:** Small to mid-size rice miller in Telangana/Andhra Pradesh, India
**Primary Language:** Telugu (తెలుగు) with English fallback
**Primary Device:** Android phone (4G connectivity, WhatsApp-savvy users)

---

## 2. TECH STACK

Do not deviate from this stack. Every decision is final.

| Layer | Technology | Notes |
|---|---|---|
| Mobile App | React Native + Expo (SDK 51+) | Use Expo Router for navigation |
| Web App | React (shared codebase via Expo Web) | Same components, web-compatible |
| Database | Supabase (PostgreSQL) | Use the JS client `@supabase/supabase-js` |
| Auth | Supabase Auth — Phone OTP | Indian mobile numbers, +91 prefix |
| Storage | Supabase Storage | For mill logo uploads |
| AI | Anthropic Claude API (`claude-sonnet-4-20250514`) | For chatbot + smart form fill |
| Styling | NativeWind (Tailwind for React Native) | Use utility classes only |
| Forms | React Hook Form | All forms must use this |
| PDF | expo-print + expo-sharing | For invoice generation and WhatsApp share |
| Offline | @react-native-async-storage/async-storage | Queue offline entries, sync on connect |
| i18n | i18next + react-i18next | Telugu (`te`) default, English (`en`) fallback |
| Icons | @expo/vector-icons (Ionicons) | Use Ionicons set only |

### Environment Variables (create `.env` file)
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_CLAUDE_API_KEY=
```

---

## 3. PROJECT STRUCTURE

Scaffold exactly this folder structure. Do not add extra folders without reason.

```
RiceMillerApp/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout with auth check
│   ├── login.tsx                 # OTP login screen
│   ├── onboarding.tsx            # First-time mill profile setup
│   └── (tabs)/                   # Bottom tab navigator
│       ├── _layout.tsx           # Tab bar config
│       ├── index.tsx             # Dashboard (Home)
│       ├── purchase.tsx          # Paddy Purchase list + entry
│       ├── sales.tsx             # Sales list + entry
│       ├── khata.tsx             # Ledger / Khata
│       └── reports.tsx           # Reports screen
│
├── screens/                      # Non-tab screens
│   ├── gst-calculator.tsx
│   ├── invoice.tsx
│   ├── godown.tsx
│   ├── cmr-tracker.tsx
│   ├── ai-assistant.tsx
│   └── settings.tsx
│
├── components/                   # Reusable UI components
│   ├── SummaryCard.tsx           # Dashboard stat card
│   ├── PurchaseCard.tsx          # Purchase list item
│   ├── KhataRow.tsx              # Ledger row
│   ├── InvoiceTemplate.tsx       # HTML invoice for PDF
│   ├── AlertBanner.tsx           # CMR deadline / overdue alerts
│   └── LoadingScreen.tsx         # Full screen loader
│
├── lib/                          # Business logic (no UI here)
│   ├── supabase.ts               # Supabase client init
│   ├── auth.ts                   # Login, logout, session
│   ├── database.ts               # All DB read/write functions
│   ├── gst.ts                    # GST calculation logic
│   ├── invoice.ts                # PDF generation logic
│   ├── ai.ts                     # Claude API calls
│   ├── offline.ts                # Offline queue manager
│   └── i18n.ts                   # Language setup
│
├── locales/
│   ├── te.json                   # Telugu strings
│   └── en.json                   # English strings
│
├── constants/
│   ├── theme.ts                  # Colors, fonts, spacing
│   └── config.ts                 # App-wide constants
│
└── assets/
    └── images/
        └── logo.png
```

---

## 4. DATABASE SCHEMA

Run this SQL in Supabase SQL Editor exactly as written.

```sql
-- MILLS
CREATE TABLE mills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mill_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  phone TEXT,
  village TEXT,
  district TEXT,
  gstin TEXT,
  mill_type TEXT DEFAULT 'raw',     -- 'raw' or 'boiled'
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PURCHASES (Paddy bought from farmers)
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id) ON DELETE CASCADE,
  farmer_name TEXT NOT NULL,
  variety TEXT NOT NULL DEFAULT 'Fine',   -- 'Fine' or 'Coarse'
  bags INTEGER NOT NULL,
  weight_per_bag DECIMAL NOT NULL,        -- in kg
  total_weight_quintals DECIMAL GENERATED ALWAYS AS
    (bags * weight_per_bag / 100) STORED,
  price_per_quintal DECIMAL NOT NULL,
  base_amount DECIMAL NOT NULL,
  hamali_charges DECIMAL DEFAULT 0,
  lorry_charges DECIMAL DEFAULT 0,
  mandi_charges DECIMAL DEFAULT 0,
  total_charges DECIMAL GENERATED ALWAYS AS
    (hamali_charges + lorry_charges + mandi_charges) STORED,
  total_cost DECIMAL NOT NULL,
  cost_per_kg DECIMAL,
  purchase_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SALES (Rice sold to buyers)
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id) ON DELETE CASCADE,
  buyer_name TEXT NOT NULL,
  buyer_phone TEXT,
  rice_type TEXT NOT NULL,               -- e.g. 'Fine Raw', 'Boiled Coarse'
  bags INTEGER NOT NULL,
  weight_per_bag DECIMAL NOT NULL,
  total_weight_kg DECIMAL GENERATED ALWAYS AS
    (bags * weight_per_bag) STORED,
  price_per_kg DECIMAL NOT NULL,
  base_amount DECIMAL NOT NULL,
  is_branded BOOLEAN DEFAULT FALSE,       -- TRUE = 5% GST, FALSE = 0%
  is_inter_state BOOLEAN DEFAULT FALSE,
  gst_rate DECIMAL DEFAULT 0,            -- 0 or 5
  cgst DECIMAL DEFAULT 0,
  sgst DECIMAL DEFAULT 0,
  igst DECIMAL DEFAULT 0,
  grand_total DECIMAL NOT NULL,
  is_paid BOOLEAN DEFAULT FALSE,
  invoice_no TEXT,
  sale_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- KHATA (Ledger — money owed to/by miller)
CREATE TABLE khata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id) ON DELETE CASCADE,
  party_name TEXT NOT NULL,
  party_phone TEXT,
  party_type TEXT NOT NULL,              -- 'farmer' or 'buyer'
  transaction_type TEXT NOT NULL,        -- 'receivable' or 'payable'
  amount DECIMAL NOT NULL,
  paid_amount DECIMAL DEFAULT 0,
  balance DECIMAL,
  description TEXT,
  is_settled BOOLEAN DEFAULT FALSE,
  due_date DATE,
  linked_sale_id UUID REFERENCES sales(id),
  linked_purchase_id UUID REFERENCES purchases(id),
  transaction_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- STOCK (Godown inventory — auto-updated by triggers)
CREATE TABLE stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  -- 'paddy_fine','paddy_coarse','rice_fine_raw','rice_fine_boiled',
  -- 'rice_coarse_raw','rice_coarse_boiled','bran','husk','broken_rice',
  -- 'gunny_new','gunny_used'
  bags INTEGER DEFAULT 0,
  weight_kg DECIMAL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CMR RECORDS (Government custom milling quota)
CREATE TABLE cmr_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id) ON DELETE CASCADE,
  season TEXT NOT NULL,                  -- e.g. 'Kharif 2025'
  allocated_bags INTEGER NOT NULL,
  delivered_bags INTEGER DEFAULT 0,
  deadline DATE NOT NULL,
  variety TEXT DEFAULT 'Fine',
  status TEXT DEFAULT 'pending',         -- 'pending','partial','complete','overdue'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CMR DELIVERIES (Log of each delivery against a CMR record)
CREATE TABLE cmr_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cmr_id UUID REFERENCES cmr_records(id) ON DELETE CASCADE,
  bags_delivered INTEGER NOT NULL,
  delivery_date DATE DEFAULT CURRENT_DATE,
  delivery_point TEXT,                   -- e.g. 'FCI Nalgonda'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EXPENSES (Electricity, maintenance, staff, misc)
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  -- 'electricity','staff_wages','maintenance','gunny_bags','transport','misc'
  amount DECIMAL NOT NULL,
  description TEXT,
  expense_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY
ALTER TABLE mills ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE khata ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE cmr_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE cmr_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES (user sees only their own mill's data)
CREATE POLICY "owner_mills" ON mills FOR ALL
  USING (owner_id = auth.uid());

CREATE POLICY "mill_purchases" ON purchases FOR ALL
  USING (mill_id IN (SELECT id FROM mills WHERE owner_id = auth.uid()));

CREATE POLICY "mill_sales" ON sales FOR ALL
  USING (mill_id IN (SELECT id FROM mills WHERE owner_id = auth.uid()));

CREATE POLICY "mill_khata" ON khata FOR ALL
  USING (mill_id IN (SELECT id FROM mills WHERE owner_id = auth.uid()));

CREATE POLICY "mill_stock" ON stock FOR ALL
  USING (mill_id IN (SELECT id FROM mills WHERE owner_id = auth.uid()));

CREATE POLICY "mill_cmr" ON cmr_records FOR ALL
  USING (mill_id IN (SELECT id FROM mills WHERE owner_id = auth.uid()));

CREATE POLICY "mill_cmr_deliveries" ON cmr_deliveries FOR ALL
  USING (cmr_id IN (
    SELECT id FROM cmr_records
    WHERE mill_id IN (SELECT id FROM mills WHERE owner_id = auth.uid())
  ));

CREATE POLICY "mill_expenses" ON expenses FOR ALL
  USING (mill_id IN (SELECT id FROM mills WHERE owner_id = auth.uid()));
```

---

## 5. BUILD ORDER

Build in this exact sequence. Do not jump ahead.

```
PHASE 1 — Foundation
  ├── 1.1  Project scaffold (folder structure, dependencies)
  ├── 1.2  Supabase client + env setup
  ├── 1.3  i18n setup (Telugu default, English fallback)
  ├── 1.4  Theme / design tokens
  └── 1.5  Auth flow (OTP login → onboarding → tab navigator)

PHASE 2 — Core Screens (No AI yet)
  ├── 2.1  Dashboard
  ├── 2.2  Paddy Purchase (list + new entry form)
  ├── 2.3  GST Calculator (standalone, no DB)
  ├── 2.4  Sales (list + new entry form)
  ├── 2.5  Invoice Generator (PDF + WhatsApp share)
  └── 2.6  Khata (ledger list + party detail + add payment)

PHASE 3 — Secondary Screens
  ├── 3.1  Godown / Stock overview
  ├── 3.2  CMR Tracker + delivery log
  ├── 3.3  Expenses entry
  ├── 3.4  Reports (P&L, GST summary, purchase/sales summary)
  └── 3.5  Settings (profile edit, language toggle, notifications)

PHASE 4 — AI Features
  ├── 4.1  GST chatbot in Telugu (Claude API)
  ├── 4.2  Smart form fill from natural language (Claude API)
  └── 4.3  Monthly business summary in Telugu (Claude API)

PHASE 5 — Polish
  ├── 5.1  Offline queue (AsyncStorage → sync on reconnect)
  ├── 5.2  Push notifications (CMR deadlines, overdue khata)
  ├── 5.3  Error boundaries and loading states on all screens
  └── 5.4  APK build via Expo EAS
```

---

## 6. MODULE SPECIFICATIONS

### 6.1 AUTH

- Phone OTP login via Supabase Auth
- After login, check if mill profile exists
- If no profile → redirect to `onboarding.tsx`
- If profile exists → redirect to `(tabs)/index.tsx`
- Persist session using AsyncStorage

---

### 6.2 DASHBOARD

Read from DB and display:
- Today's total paddy purchased (bags)
- Total pending receivables from khata (₹)
- Total stock in godown (bags, across all types)
- This month's net profit (sales revenue − purchase cost − expenses)
- Last 5 activities (latest rows across purchases + sales + khata payments)
- Active CMR alerts (records where deadline < 7 days away and status ≠ 'complete')
- Overdue khata alerts (rows where due_date < today and is_settled = false)

---

### 6.3 PADDY PURCHASE

**New Entry Form fields:**
- farmer_name (text, required)
- variety (picker: Fine / Coarse, required)
- bags (number, required)
- weight_per_bag in kg (number, required)
- price_per_quintal in ₹ (number, required)
- hamali_charges ₹ (number, default 0)
- lorry_charges ₹ (number, default 0)
- mandi_charges ₹ (number, default 0)
- purchase_date (date picker, default today)
- notes (optional text)

**Auto-calculate and display live:**
- total_weight_quintals = bags × weight_per_bag / 100
- base_amount = total_weight_quintals × price_per_quintal
- total_charges = hamali + lorry + mandi
- total_cost = base_amount + total_charges
- cost_per_kg = total_cost / (bags × weight_per_bag)

**On save:**
- Insert into `purchases`
- Update `stock` (increase paddy_fine or paddy_coarse by bags count)
- If payment is pending, optionally create a `khata` row (payable)

---

### 6.4 GST CALCULATOR

**Inputs:**
- amount ₹ (number)
- rice_type toggle: Unbranded/Loose (0%) | Branded/Packaged (5%)
- sale_type toggle: Intra-State (CGST+SGST) | Inter-State (IGST)

**Logic in `lib/gst.ts`:**
```
gst_rate = rice_type === 'branded' ? 5 : 0
gst_amount = (amount × gst_rate) / 100
if intra_state:
  cgst = gst_amount / 2
  sgst = gst_amount / 2
  igst = 0
else:
  cgst = 0
  sgst = 0
  igst = gst_amount
total = amount + gst_amount
```

This screen does NOT save to DB. It is a calculator only.

---

### 6.5 SALES

**New Entry Form fields:**
- buyer_name (text, required)
- buyer_phone (text, optional)
- rice_type (text, required — e.g. "Fine Boiled", "Coarse Raw")
- bags (number, required)
- weight_per_bag in kg (number, required)
- price_per_kg in ₹ (number, required)
- is_branded (boolean toggle — determines GST rate)
- is_inter_state (boolean toggle — determines CGST+SGST vs IGST)
- sale_date (date picker, default today)
- notes (optional)

**Auto-calculate and display live:**
- total_weight_kg = bags × weight_per_bag
- base_amount = total_weight_kg × price_per_kg
- gst values using the same logic as 6.4
- grand_total = base_amount + gst_amount

**On save:**
- Insert into `sales`
- Update `stock` (decrease corresponding rice type bags)
- Create `khata` row (receivable) if not paid immediately
- Auto-generate invoice_no: `INV-{YYYY}-{sequential 3-digit number}`

---

### 6.6 INVOICE

**Input:** sale_id (passed from sales screen)

**Generate HTML invoice with:**
- Mill name, GSTIN, village (from mill profile)
- Buyer name, phone
- Invoice number, date
- Line items table (rice type, bags, weight, rate, amount)
- GST breakdown (CGST/SGST or IGST)
- Grand total
- Footer: "ధన్యవాదాలు | Thank you for your business"

**Actions:**
- Share as PDF via WhatsApp (expo-print → expo-sharing)
- Download PDF
- Mark as paid (updates sales.is_paid + khata.is_settled)

---

### 6.7 KHATA

**List screen:** Two tabs — Receivable | Payable
- Show party name, total balance, days overdue (if past due_date)
- Sort by: oldest first (most overdue at top)
- Highlight in red if overdue

**Party detail screen:**
- Show all transactions for that party
- Running balance
- "Add Payment" button → opens amount input → updates paid_amount and balance
- "Send Reminder" button → opens WhatsApp with pre-drafted message:
  `"నమస్కారం {party_name} గారు, మీరు {mill_name} కి ₹{balance} చెల్లించాలి. దయచేసి చెల్లించగలరు."`

---

### 6.8 GODOWN / STOCK

Display current bags for each item_type.
Group into sections: Paddy | Milled Rice | By-Products | Inputs.

Stock auto-updates via DB writes from purchases and sales.
Manual adjustment: allow miller to correct counts (physical audit).
Low stock alert: if bags < threshold (default 20), show warning badge.

---

### 6.9 CMR TRACKER

- Show current season's CMR record
- Progress bar: delivered_bags / allocated_bags
- Days remaining to deadline (highlight red if < 7 days)
- Delivery log list (from cmr_deliveries)
- "Add Delivery" button → input bags delivered + delivery point → inserts cmr_deliveries row + updates cmr_records.delivered_bags
- CMR Yield Calculator:
  - Input: paddy bags in quintals
  - Output: expected rice yield at 67 kg/quintal (fine), 65 kg/quintal (coarse)
  - Show variance if actual differs

---

### 6.10 REPORTS

All reports filter by: This Week | This Month | Custom Date Range

Reports to build:
- **Purchase Report:** list of all purchases, total bags, total cost
- **Sales Report:** list of all sales, total bags, total revenue
- **P&L Report:** revenue − (purchase cost + expenses) = net profit
- **GST Summary:** total taxable sales (5%), total exempt (0%), CGST, SGST collected
- **Khata Report:** total receivable, total payable, net position
- **CMR Status:** current season progress

All reports must have a Share button (share as image or PDF).

---

### 6.11 AI ASSISTANT (`lib/ai.ts`)

Use `claude-sonnet-4-20250514`. Max tokens: 1000.

**Function 1 — GST Chatbot:**
```typescript
system: `You are a GST expert for rice millers in Telangana, India.
HSN Code 1006. Rules:
- Unbranded, loose rice = 0% GST
- Branded, pre-packaged rice = 5% GST (CGST 2.5% + SGST 2.5% intra-state)
- Inter-state = IGST 5%
Answer in Telugu if question is in Telugu, else English.
Be concise and practical.`
```

**Function 2 — Smart Form Fill:**
```typescript
system: `Extract paddy purchase details from natural language by rice millers.
Return ONLY valid JSON. Fields: farmerName, bags, weightPerBag,
pricePerQuintal, variety (Fine/Coarse), hamaliCharges, lorryCharges, mandiCharges.
Omit fields not mentioned. No explanation, only JSON.`
```

**Function 3 — Monthly Summary:**
```typescript
system: `You are a business advisor for a rice miller in Telangana.
Generate a monthly performance summary in Telugu (with key numbers in English).
Be encouraging. Under 120 words. Mention top concern if expenses are high.`
```

---

### 6.12 SETTINGS

- Edit mill profile (all fields)
- Language toggle (Telugu / English) → updates i18n + persists to AsyncStorage
- Notification toggles (CMR alerts, khata overdue, stock low)
- Subscription info (plan name, expiry date — hardcoded for v1)
- Export data (trigger CSV export of purchases + sales — nice to have)
- Logout (clear session)

---

## 7. DESIGN SYSTEM

### Colors
```typescript
// constants/theme.ts
export const colors = {
  primary: '#1B5E20',       // Deep green — main brand color
  primaryLight: '#2E7D32',  // Buttons, active states
  primaryBg: '#E8F5E9',     // Light green backgrounds
  danger: '#B71C1C',        // Overdue, errors
  dangerLight: '#FFEBEE',   // Error backgrounds
  warning: '#E65100',       // Alerts, pending
  warningLight: '#FFF3E0',  // Warning backgrounds
  neutral: '#757575',       // Labels, secondary text
  dark: '#212121',          // Primary text
  border: '#E0E0E0',        // Input borders, dividers
  background: '#F5F5F5',    // Screen background
  white: '#FFFFFF',         // Cards, inputs
};
```

### Typography
- Headers: 20–24px, fontWeight bold, color `dark`
- Labels: 13px, color `neutral`
- Values / amounts: 15–18px, fontWeight bold, color `primary`
- Body: 14–15px, color `dark`

### Card Style (apply to all list items and summary boxes)
```
backgroundColor: white
borderRadius: 8
padding: 16
elevation: 2 (Android shadow)
marginBottom: 12
```

### Input Style
```
backgroundColor: white
borderRadius: 8
padding: 12
borderWidth: 1
borderColor: colors.border
fontSize: 15
```

### Primary Button
```
backgroundColor: colors.primaryLight
padding: 16
borderRadius: 8
alignItems: center
```

---

## 8. LOCALIZATION KEYS

All user-facing strings must use i18n keys. Never hardcode Telugu or English text directly in components.

**Required keys to implement in both `te.json` and `en.json`:**

```
auth.title, auth.subtitle, auth.phonePlaceholder, auth.sendOtp,
auth.otpPlaceholder, auth.verify,

onboarding.title, onboarding.millName, onboarding.ownerName,
onboarding.village, onboarding.district, onboarding.gstin,
onboarding.millType, onboarding.raw, onboarding.boiled, onboarding.save,

dashboard.greeting, dashboard.todayPurchase, dashboard.pendingPayments,
dashboard.stockInGodown, dashboard.monthProfit, dashboard.recentActivity,
dashboard.cmrAlert, dashboard.overdueAlert,

purchase.title, purchase.farmerName, purchase.variety, purchase.fine,
purchase.coarse, purchase.bags, purchase.weightPerBag, purchase.pricePerQuintal,
purchase.hamali, purchase.lorry, purchase.mandi, purchase.totalWeight,
purchase.baseAmount, purchase.totalCharges, purchase.totalCost, purchase.save,

gst.title, gst.amount, gst.branded, gst.unbranded, gst.intraState,
gst.interState, gst.calculate, gst.cgst, gst.sgst, gst.igst,
gst.total, gst.exempt,

sales.title, sales.buyerName, sales.buyerPhone, sales.riceType,
sales.isBranded, sales.isInterState, sales.grandTotal, sales.save,

invoice.title, invoice.share, invoice.download, invoice.markPaid,
invoice.thankYou,

khata.title, khata.receivable, khata.payable, khata.balance,
khata.overdue, khata.addPayment, khata.sendReminder,

settings.title, settings.language, settings.logout
```

---

## 9. KNOWN CONSTRAINTS

- **No iOS build for v1.** Android APK only via Expo EAS.
- **No payment gateway for v1.** Subscription is tracked manually (hardcoded expiry date in mill profile).
- **No multi-mill for v1.** Schema supports `mill_id` on all tables so it's ready, but UI only handles one mill per user.
- **No background sync.** Offline queue syncs only when app is opened and internet is detected.
- **Invoice numbering is sequential per mill.** Format: `INV-YYYY-NNN` (e.g. INV-2026-001).
- **CMR logic is Telangana-specific.** Fine rice yield target: 67 kg/quintal. Coarse: 65 kg/quintal.
- **GST rule:** HSN 1006. 0% for unbranded loose rice. 5% for branded pre-packaged rice. No other rates apply.

---

## 10. DEFINITION OF DONE

The app is shippable when a miller can complete all of the following without help:

- [ ] Login with Indian mobile number via OTP
- [ ] Set up their mill profile
- [ ] Record a paddy purchase with all charges and see auto-calculated total cost
- [ ] Record a rice sale with correct GST applied
- [ ] Generate a GST invoice as PDF and share it via WhatsApp
- [ ] View who owes them money in the Khata screen
- [ ] Mark a payment as received in Khata
- [ ] Check their godown stock levels
- [ ] Ask an AI question about GST in Telugu and get a correct answer
- [ ] View this month's profit in the Reports screen

---

*Build Brief v1.0 — Rice Miller App*
*Stack: React Native + Expo + Supabase + Claude AI*
*Region: Telangana, India | Language: Telugu-first*
