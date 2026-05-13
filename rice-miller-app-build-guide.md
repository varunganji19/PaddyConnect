# 🌾 Rice Miller App — Complete Build Guide
### From Zero to Functional App (Student Edition)
> Stack: React Native (Expo) + Supabase + Claude AI | Built with Cursor

---

## 🗺️ Overview of All Phases

| Phase | Name | Duration | What You'll Have |
|---|---|---|---|
| **0** | Setup & Design | Day 1–2 | Tools installed, screens designed |
| **1** | Frontend Skeleton | Day 3–7 | All screens built, no data yet |
| **2** | Backend & Database | Day 8–12 | Data saves and loads from Supabase |
| **3** | Core Features | Day 13–18 | GST, Khata, Invoice working |
| **4** | AI Integration | Day 19–22 | Claude AI chatbot + smart input |
| **5** | Telugu & Offline | Day 23–25 | Telugu UI + works without internet |
| **6** | Polish & Launch | Day 26–30 | APK ready, first millers using it |

---

## ⚙️ PHASE 0 — Environment Setup & Design
### Duration: Day 1–2

### Step 1: Install Your Tools

```bash
# 1. Install Node.js (go to nodejs.org, download LTS version)

# 2. Install Expo CLI
npm install -g expo-cli

# 3. Install Cursor (AI code editor)
# Go to cursor.sh and download for free

# 4. Create your project
npx create-expo-app RiceMillerApp --template blank
cd RiceMillerApp

# 5. Start the app
npx expo start
```

> 📱 Install **Expo Go** app on your Android phone from Play Store.
> Scan the QR code in terminal → your app runs on your phone instantly.

---

### Step 2: Install Core Libraries

```bash
# Navigation (moving between screens)
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-paper
npm install @expo/vector-icons

# Storage & Forms
npm install @supabase/supabase-js
npm install react-hook-form
npm install async-storage @react-native-async-storage/async-storage

# PDF Generation (for invoices)
npm install expo-print expo-sharing

# Localization (Telugu support)
npm install i18next react-i18next
```

---

### Step 3: Design Your Screens (Before Coding)

Open **Figma** (free at figma.com) and sketch these screens:

```
App Screens:
├── 1. Splash / Login Screen
├── 2. Dashboard (Home) — daily summary
├── 3. Paddy Purchase Entry
├── 4. Sales Entry
├── 5. GST Calculator
├── 6. Khata (Ledger) — who owes what
├── 7. Invoice Generator
├── 8. Stock / Godown
├── 9. Reports (monthly)
└── 10. Settings (language, profile)
```

> 💡 Don't spend more than 4 hours on design. Rough sketches on paper also work.
> The goal is to know what you're building before you build it.

---

### Step 4: Project Folder Structure

Set up your folders like this inside the project:

```
RiceMillerApp/
├── app/                        ← All screens go here
│   ├── (tabs)/
│   │   ├── index.tsx           ← Dashboard
│   │   ├── purchase.tsx        ← Paddy Purchase
│   │   ├── sales.tsx           ← Sales Entry
│   │   ├── khata.tsx           ← Ledger
│   │   └── reports.tsx         ← Reports
│   ├── gst-calculator.tsx
│   ├── invoice.tsx
│   └── login.tsx
│
├── components/                 ← Reusable UI pieces
│   ├── PurchaseCard.tsx
│   ├── InvoiceTemplate.tsx
│   ├── KhataRow.tsx
│   └── StockSummary.tsx
│
├── lib/                        ← Logic & API calls
│   ├── supabase.ts             ← Database connection
│   ├── gst.ts                  ← GST calculation logic
│   ├── invoice.ts              ← Invoice PDF logic
│   └── ai.ts                   ← Claude API calls
│
├── locales/                    ← Language files
│   ├── en.json                 ← English text
│   └── te.json                 ← Telugu text
│
├── constants/
│   └── theme.ts                ← Colors, fonts
│
└── assets/                     ← Images, icons
```

---

## 🎨 PHASE 1 — Frontend (All Screens, No Data)
### Duration: Day 3–7
### Goal: Every screen is visible and clickable, but data is hardcoded/fake

---

### Step 1: Set Up Navigation

Create `app/_layout.tsx`:

```tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2E7D32' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="purchase"
        options={{
          title: 'Purchase',
          tabBarIcon: ({ color }) => <Ionicons name="bag-add" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="khata"
        options={{
          title: 'Khata',
          tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

---

### Step 2: Build the Dashboard Screen

Create `app/(tabs)/index.tsx`:

```tsx
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// Hardcoded data for now — will connect to DB in Phase 2
const mockData = {
  todayPurchase: '150 bags',
  pendingPayments: '₹45,000',
  stockInGodown: '320 bags',
  monthProfit: '₹18,500',
};

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>నమస్కారం 🙏 | Good Morning</Text>
      <Text style={styles.date}>Today: {new Date().toDateString()}</Text>

      <View style={styles.cardRow}>
        <SummaryCard title="Today's Purchase" value={mockData.todayPurchase} color="#1B5E20" />
        <SummaryCard title="Pending Payments" value={mockData.pendingPayments} color="#B71C1C" />
      </View>
      <View style={styles.cardRow}>
        <SummaryCard title="Stock in Godown" value={mockData.stockInGodown} color="#0D47A1" />
        <SummaryCard title="Month Profit" value={mockData.monthProfit} color="#E65100" />
      </View>
    </ScrollView>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#1B5E20', marginBottom: 4 },
  date: { fontSize: 14, color: '#757575', marginBottom: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  card: {
    backgroundColor: 'white', flex: 1, marginHorizontal: 4,
    padding: 16, borderRadius: 8, borderLeftWidth: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 12, color: '#757575' },
  cardValue: { fontSize: 18, fontWeight: 'bold', marginTop: 4 },
});
```

---

### Step 3: Build the Paddy Purchase Entry Screen

Create `app/(tabs)/purchase.tsx`:

```tsx
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function PurchaseEntry() {
  const [form, setForm] = useState({
    farmerName: '',
    bags: '',
    weightPerBag: '',
    pricePerQuintal: '',
    hамаліCharges: '',
    lorryCharges: '',
    mandiCharges: '',
    variety: 'Fine', // Fine or Coarse
  });

  const totalWeight = (Number(form.bags) * Number(form.weightPerBag)) / 100; // in quintals
  const baseAmount = totalWeight * Number(form.pricePerQuintal);
  const totalCharges =
    Number(form.hamaliCharges) + Number(form.lorryCharges) + Number(form.mandiCharges);
  const totalCost = baseAmount + totalCharges;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Paddy Purchase Entry</Text>

      <InputField label="Farmer Name / రైతు పేరు" value={form.farmerName}
        onChangeText={(v) => setForm({ ...form, farmerName: v })} />

      <InputField label="Number of Bags / బస్తాల సంఖ్య" value={form.bags}
        onChangeText={(v) => setForm({ ...form, bags: v })} keyboardType="numeric" />

      <InputField label="Weight per Bag (kg)" value={form.weightPerBag}
        onChangeText={(v) => setForm({ ...form, weightPerBag: v })} keyboardType="numeric" />

      <InputField label="Price per Quintal (₹)" value={form.pricePerQuintal}
        onChangeText={(v) => setForm({ ...form, pricePerQuintal: v })} keyboardType="numeric" />

      <Text style={styles.sectionTitle}>Charges / చార్జీలు</Text>

      <InputField label="Hamali Charges (₹)" value={form.hamaliCharges}
        onChangeText={(v) => setForm({ ...form, hamaliCharges: v })} keyboardType="numeric" />

      <InputField label="Lorry Charges (₹)" value={form.lorryCharges}
        onChangeText={(v) => setForm({ ...form, lorryCharges: v })} keyboardType="numeric" />

      <InputField label="Mandi Charges (₹)" value={form.mandiCharges}
        onChangeText={(v) => setForm({ ...form, mandiCharges: v })} keyboardType="numeric" />

      {/* Auto-calculated Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Summary / సారాంశం</Text>
        <SummaryRow label="Total Weight" value={`${totalWeight.toFixed(2)} Quintals`} />
        <SummaryRow label="Base Amount" value={`₹${baseAmount.toFixed(2)}`} />
        <SummaryRow label="Total Charges" value={`₹${totalCharges.toFixed(2)}`} />
        <SummaryRow label="Total Cost" value={`₹${totalCost.toFixed(2)}`} bold />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => alert('Saving... (Phase 2)')}>
        <Text style={styles.saveButtonText}>Save Purchase / సేవ్ చేయి</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InputField({ label, value, onChangeText, keyboardType = 'default' }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText}
        keyboardType={keyboardType} placeholder="Enter value" />
    </View>
  );
}

function SummaryRow({ label, value, bold = false }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.summaryValue, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#1B5E20', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#424242', marginTop: 16, marginBottom: 8 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 13, color: '#616161', marginBottom: 4 },
  input: { backgroundColor: 'white', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#E0E0E0', fontSize: 15 },
  summary: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginTop: 16, elevation: 2 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B5E20', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  summaryLabel: { color: '#616161', fontSize: 14 },
  summaryValue: { color: '#212121', fontSize: 14 },
  bold: { fontWeight: 'bold', color: '#1B5E20', fontSize: 15 },
  saveButton: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 8, marginTop: 20, marginBottom: 40, alignItems: 'center' },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
```

> 💡 **Build all other screens the same way** — Sales, Khata, GST Calculator, Reports.
> Use fake/hardcoded data. The goal is: every screen looks real and is clickable.
> We connect real data in Phase 2.

---

## 🗄️ PHASE 2 — Backend with Supabase
### Duration: Day 8–12
### Goal: Data actually saves to a database and loads back

---

### Step 1: Set Up Supabase

1. Go to **supabase.com** → Create free account
2. Click "New Project" → Name it `rice-miller-app`
3. Copy your **Project URL** and **Anon Key** from Settings → API

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://your-project-url.supabase.co';  // paste yours
const SUPABASE_ANON_KEY = 'your-anon-key-here';               // paste yours

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

---

### Step 2: Create Database Tables

Go to Supabase Dashboard → SQL Editor → Run this:

```sql
-- Mills table (one row per miller)
CREATE TABLE mills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_name TEXT NOT NULL,
  mill_name TEXT NOT NULL,
  phone TEXT,
  village TEXT,
  district TEXT,
  gstin TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Paddy Purchases
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id),
  farmer_name TEXT NOT NULL,
  bags INTEGER NOT NULL,
  weight_per_bag DECIMAL NOT NULL,
  total_weight_quintals DECIMAL GENERATED ALWAYS AS (bags * weight_per_bag / 100) STORED,
  price_per_quintal DECIMAL NOT NULL,
  base_amount DECIMAL,
  hamali_charges DECIMAL DEFAULT 0,
  lorry_charges DECIMAL DEFAULT 0,
  mandi_charges DECIMAL DEFAULT 0,
  total_cost DECIMAL,
  variety TEXT DEFAULT 'Fine',   -- Fine or Coarse
  purchase_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sales
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id),
  buyer_name TEXT NOT NULL,
  rice_variety TEXT,
  bags INTEGER,
  weight_kg DECIMAL,
  price_per_kg DECIMAL,
  is_branded BOOLEAN DEFAULT false,  -- decides GST rate
  gst_rate DECIMAL,                   -- 0 or 5
  gst_amount DECIMAL,
  total_amount DECIMAL,
  sale_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Khata (Ledger) — who owes money
CREATE TABLE khata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id),
  party_name TEXT NOT NULL,          -- farmer or buyer name
  party_type TEXT,                   -- 'farmer' or 'buyer'
  transaction_type TEXT,             -- 'credit' or 'debit'
  amount DECIMAL NOT NULL,
  description TEXT,
  is_paid BOOLEAN DEFAULT false,
  due_date DATE,
  transaction_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Stock / Godown
CREATE TABLE stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id),
  item_type TEXT,                   -- 'paddy', 'rice_fine', 'rice_coarse', 'bran', 'husk'
  bags INTEGER,
  weight_kg DECIMAL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CMR (Custom Milled Rice) — government tracking
CREATE TABLE cmr_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mill_id UUID REFERENCES mills(id),
  allocation_bags INTEGER,
  delivered_bags INTEGER DEFAULT 0,
  deadline DATE,
  season TEXT,
  status TEXT DEFAULT 'pending',    -- 'pending', 'partial', 'complete'
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Step 3: Enable Row Level Security

In Supabase Dashboard → Authentication → Policies, enable RLS so each miller only sees their own data:

```sql
-- Allow millers to see only their own data
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Miller sees own purchases"
  ON purchases FOR ALL
  USING (mill_id = auth.uid()::uuid);

-- Repeat similar policies for sales, khata, stock, cmr_records
```

---

### Step 4: Connect Purchase Screen to Database

Update `lib/database.ts`:

```typescript
import { supabase } from './supabase';

// Save a new purchase
export async function savePurchase(data: {
  farmerName: string;
  bags: number;
  weightPerBag: number;
  pricePerQuintal: number;
  hamaliCharges: number;
  lorryCharges: number;
  mandiCharges: number;
  variety: string;
}) {
  const baseAmount = (data.bags * data.weightPerBag / 100) * data.pricePerQuintal;
  const totalCharges = data.hamaliCharges + data.lorryCharges + data.mandiCharges;

  const { data: result, error } = await supabase
    .from('purchases')
    .insert({
      farmer_name: data.farmerName,
      bags: data.bags,
      weight_per_bag: data.weightPerBag,
      price_per_quintal: data.pricePerQuintal,
      base_amount: baseAmount,
      hamali_charges: data.hamaliCharges,
      lorry_charges: data.lorryCharges,
      mandi_charges: data.mandiCharges,
      total_cost: baseAmount + totalCharges,
      variety: data.variety,
    });

  if (error) throw error;
  return result;
}

// Load today's purchases
export async function getTodaysPurchases() {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('purchase_date', today)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Get khata summary
export async function getKhataSummary() {
  const { data, error } = await supabase
    .from('khata')
    .select('*')
    .eq('is_paid', false)
    .order('due_date');

  if (error) throw error;
  return data;
}
```

Now update the Purchase screen's Save button:

```tsx
import { savePurchase } from '../../lib/database';

// Replace the alert in onPress with:
const handleSave = async () => {
  try {
    await savePurchase({
      farmerName: form.farmerName,
      bags: Number(form.bags),
      weightPerBag: Number(form.weightPerBag),
      pricePerQuintal: Number(form.pricePerQuintal),
      hamaliCharges: Number(form.hamaliCharges),
      lorryCharges: Number(form.lorryCharges),
      mandiCharges: Number(form.mandiCharges),
      variety: form.variety,
    });
    alert('Purchase saved! ✅');
    // Reset form
    setForm({ farmerName: '', bags: '', weightPerBag: '', pricePerQuintal: '',
               hamaliCharges: '', lorryCharges: '', mandiCharges: '', variety: 'Fine' });
  } catch (err) {
    alert('Error saving. Please try again.');
    console.error(err);
  }
};
```

> ✅ **Repeat for all other screens** — Sales, Khata, Stock.
> Each screen: write the DB function in `lib/database.ts` → call it from the screen.

---

### Step 5: Set Up Authentication (Miller Login)

```tsx
// app/login.tsx
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const sendOTP = async () => {
    const { error } = await supabase.auth.signInWithOtp({ phone: `+91${phone}` });
    if (!error) setStep('otp');
  };

  const verifyOTP = async () => {
    const { error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token: otp,
      type: 'sms',
    });
    if (error) alert('Wrong OTP. Try again.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌾 Rice Miller App</Text>
      <Text style={styles.subtitle}>లాగిన్ చేయండి / Login</Text>

      {step === 'phone' ? (
        <>
          <TextInput style={styles.input} placeholder="Mobile Number"
            value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TouchableOpacity style={styles.button} onPress={sendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput style={styles.input} placeholder="Enter OTP"
            value={otp} onChangeText={setOtp} keyboardType="numeric" />
          <TouchableOpacity style={styles.button} onPress={verifyOTP}>
            <Text style={styles.buttonText}>Verify & Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F5F5F5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1B5E20', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#757575', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: 'white', padding: 14, borderRadius: 8, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E0E0E0' },
  button: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
```

---

## 🧮 PHASE 3 — Core Features (GST + Invoice + Khata)
### Duration: Day 13–18
### Goal: The three most important miller features are fully working

---

### Feature 1: GST Calculator

Create `lib/gst.ts`:

```typescript
export type RiceType = 'unbranded_loose' | 'branded_packaged';

export interface GSTResult {
  baseAmount: number;
  gstRate: number;        // 0 or 5
  cgst: number;           // half of GST for intra-state
  sgst: number;           // half of GST for intra-state
  igst: number;           // full GST for inter-state
  totalAmount: number;
  isExempt: boolean;
}

export function calculateGST(
  baseAmount: number,
  riceType: RiceType,
  isInterState: boolean = false
): GSTResult {
  // HSN Code 1006 — Rice
  // 0% GST: unbranded, loose rice sold without registered brand
  // 5% GST: branded and pre-packaged rice
  const gstRate = riceType === 'unbranded_loose' ? 0 : 5;
  const isExempt = gstRate === 0;

  const gstAmount = (baseAmount * gstRate) / 100;

  return {
    baseAmount,
    gstRate,
    cgst: isInterState ? 0 : gstAmount / 2,
    sgst: isInterState ? 0 : gstAmount / 2,
    igst: isInterState ? gstAmount : 0,
    totalAmount: baseAmount + gstAmount,
    isExempt,
  };
}
```

Build the GST Calculator Screen `app/gst-calculator.tsx`:

```tsx
import { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { calculateGST } from '../lib/gst';

export default function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [isBranded, setIsBranded] = useState(false);
  const [isInterState, setIsInterState] = useState(false);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const base = parseFloat(amount);
    if (!base) return;
    const gst = calculateGST(base, isBranded ? 'branded_packaged' : 'unbranded_loose', isInterState);
    setResult(gst);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>GST Calculator</Text>
      <Text style={styles.subtitle}>Rice HSN Code: 1006</Text>

      <TextInput style={styles.input} placeholder="Enter amount (₹)"
        value={amount} onChangeText={setAmount} keyboardType="numeric" />

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Branded & Packaged Rice?</Text>
        <Switch value={isBranded} onValueChange={setIsBranded} trackColor={{ true: '#2E7D32' }} />
      </View>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Inter-State Sale? (IGST)</Text>
        <Switch value={isInterState} onValueChange={setIsInterState} trackColor={{ true: '#2E7D32' }} />
      </View>

      <View style={styles.rateInfo}>
        <Text style={styles.rateText}>
          Applicable Rate: {isBranded ? '5% GST' : '0% (Exempt)'}
        </Text>
      </View>

      <TouchableOpacity style={styles.calcButton} onPress={calculate}>
        <Text style={styles.calcButtonText}>Calculate GST</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Result</Text>
          <Row label="Base Amount" value={`₹${result.baseAmount.toFixed(2)}`} />
          <Row label="GST Rate" value={`${result.gstRate}%`} />
          {!isInterState ? (
            <>
              <Row label="CGST" value={`₹${result.cgst.toFixed(2)}`} />
              <Row label="SGST" value={`₹${result.sgst.toFixed(2)}`} />
            </>
          ) : (
            <Row label="IGST" value={`₹${result.igst.toFixed(2)}`} />
          )}
          <Row label="Total Amount" value={`₹${result.totalAmount.toFixed(2)}`} bold />
          {result.isExempt && (
            <Text style={styles.exemptNote}>
              ✅ This rice is GST-exempt (unbranded/loose)
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function Row({ label, value, bold = false }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#1B5E20' },
  subtitle: { color: '#757575', marginBottom: 16 },
  input: { backgroundColor: 'white', padding: 14, borderRadius: 8, fontSize: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 14, borderRadius: 8, marginBottom: 8 },
  toggleLabel: { fontSize: 15, color: '#424242' },
  rateInfo: { backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8, marginBottom: 12 },
  rateText: { color: '#1B5E20', fontWeight: 'bold', textAlign: 'center' },
  calcButton: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  calcButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  resultBox: { backgroundColor: 'white', padding: 16, borderRadius: 8, elevation: 2 },
  resultTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#1B5E20' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  rowLabel: { color: '#616161' },
  rowValue: { color: '#212121' },
  bold: { fontWeight: 'bold', color: '#1B5E20', fontSize: 15 },
  exemptNote: { marginTop: 12, color: '#2E7D32', fontWeight: '600', textAlign: 'center' },
});
```

---

### Feature 2: WhatsApp Invoice Generator

Create `lib/invoice.ts`:

```typescript
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function generateAndShareInvoice(data: {
  invoiceNo: string;
  buyerName: string;
  buyerPhone: string;
  millName: string;
  millGSTIN: string;
  items: { description: string; bags: number; weightKg: number; ratePerKg: number; amount: number }[];
  gstRate: number;
  baseTotal: number;
  gstAmount: number;
  grandTotal: number;
  date: string;
}) {
  const itemRows = data.items.map(item => `
    <tr>
      <td>${item.description}</td>
      <td>${item.bags}</td>
      <td>${item.weightKg} kg</td>
      <td>₹${item.ratePerKg}</td>
      <td>₹${item.amount.toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <html><body style="font-family: Arial; padding: 20px; color: #212121;">
      <div style="text-align:center; background:#1B5E20; color:white; padding:16px; border-radius:8px;">
        <h2 style="margin:0;">${data.millName}</h2>
        <p style="margin:4px 0;">GSTIN: ${data.millGSTIN}</p>
        <p style="margin:4px 0;">TAX INVOICE</p>
      </div>

      <div style="display:flex; justify-content:space-between; margin:16px 0;">
        <div>
          <b>Bill To:</b><br/>
          ${data.buyerName}<br/>
          ${data.buyerPhone}
        </div>
        <div style="text-align:right;">
          <b>Invoice No:</b> ${data.invoiceNo}<br/>
          <b>Date:</b> ${data.date}
        </div>
      </div>

      <table width="100%" border="1" cellpadding="8" cellspacing="0"
        style="border-collapse:collapse; margin-bottom:16px;">
        <thead style="background:#E8F5E9;">
          <tr><th>Description</th><th>Bags</th><th>Weight</th><th>Rate/kg</th><th>Amount</th></tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div style="text-align:right;">
        <p>Base Amount: ₹${data.baseTotal.toFixed(2)}</p>
        <p>GST (${data.gstRate}%): ₹${data.gstAmount.toFixed(2)}</p>
        <h3 style="color:#1B5E20;">Grand Total: ₹${data.grandTotal.toFixed(2)}</h3>
      </div>

      <p style="text-align:center; color:#757575; margin-top:24px;">
        Thank you for your business! | ధన్యవాదాలు
      </p>
    </body></html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Share Invoice via WhatsApp',
  });
}
```

---

## 🤖 PHASE 4 — AI Integration (Claude API)
### Duration: Day 19–22
### Goal: Add 3 AI features that no competitor has

---

### Setup Claude API

Create `lib/ai.ts`:

```typescript
const CLAUDE_API_KEY = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;
const CLAUDE_URL = 'https://api.anthropic.com/v1/messages';

// Main function to call Claude
async function askClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const response = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  const data = await response.json();
  return data.content[0].text;
}
```

---

### AI Feature 1: GST Query Chatbot in Telugu

```typescript
// In lib/ai.ts — add this function

export async function askGSTQuestion(question: string): Promise<string> {
  const system = `You are a GST expert assistant for rice millers in Telangana, India.
  Answer questions about GST on rice (HSN Code 1006).
  Key rules:
  - Unbranded, loose rice = 0% GST
  - Branded, pre-packaged rice = 5% GST (CGST 2.5% + SGST 2.5%)
  - Custom Milled Rice (CMR) for government = follow state rules
  Answer in Telugu if the question is in Telugu, English otherwise.
  Keep answers short and practical. Always mention the rule/notification if relevant.`;

  return await askClaude(system, question);
}
```

Add a "Ask AI" button to the GST Calculator screen:

```tsx
// Add to GSTCalculator screen
const [aiAnswer, setAiAnswer] = useState('');
const [aiQuestion, setAiQuestion] = useState('');
const [aiLoading, setAiLoading] = useState(false);

const askAI = async () => {
  setAiLoading(true);
  const answer = await askGSTQuestion(aiQuestion);
  setAiAnswer(answer);
  setAiLoading(false);
};

// Add this UI below the calculator:
<View style={{ marginTop: 20 }}>
  <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
    🤖 Ask AI about GST / GST గురించి అడగండి
  </Text>
  <TextInput
    style={styles.input}
    placeholder="e.g. 'Is boiled rice GST exempt?' or 'బాయిల్డ్ రైస్ కి GST ఉంటుందా?'"
    value={aiQuestion}
    onChangeText={setAiQuestion}
    multiline
  />
  <TouchableOpacity style={styles.calcButton} onPress={askAI} disabled={aiLoading}>
    <Text style={styles.calcButtonText}>{aiLoading ? 'Thinking...' : 'Ask AI 🤖'}</Text>
  </TouchableOpacity>
  {aiAnswer ? (
    <View style={{ backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8 }}>
      <Text style={{ color: '#1B5E20' }}>{aiAnswer}</Text>
    </View>
  ) : null}
</View>
```

---

### AI Feature 2: Smart Input from Natural Language

```typescript
// In lib/ai.ts
export async function parseVoiceInput(spokenText: string): Promise<{
  farmerName?: string;
  bags?: number;
  pricePerQuintal?: number;
  variety?: string;
}> {
  const system = `Extract paddy purchase details from natural language input by rice millers in India.
  Return ONLY a JSON object with these fields (omit if not mentioned):
  - farmerName (string)
  - bags (number)
  - pricePerQuintal (number)
  - variety ('Fine' or 'Coarse')
  
  Examples:
  "రాముడు నుండి 200 బస్తాలు 2100 కి తీసుకున్నాం" → {"farmerName":"రాముడు","bags":200,"pricePerQuintal":2100}
  "Bought 150 bags fine rice from Suresh at 2300" → {"farmerName":"Suresh","bags":150,"pricePerQuintal":2300,"variety":"Fine"}`;

  const result = await askClaude(system, spokenText);

  try {
    return JSON.parse(result);
  } catch {
    return {};
  }
}
```

---

### AI Feature 3: Monthly Business Summary in Telugu

```typescript
// In lib/ai.ts
export async function generateMonthlySummary(data: {
  totalPurchasedBags: number;
  totalPurchaseCost: number;
  totalSalesBags: number;
  totalSalesRevenue: number;
  pendingPayments: number;
  topFarmer: string;
  topBuyer: string;
  month: string;
}): Promise<string> {
  const system = `You are a business advisor for a rice miller in Telangana.
  Generate a simple monthly summary in Telugu and English mixed (Tenglish).
  Be encouraging, practical, and mention any concern if expenses seem high.
  Keep it under 150 words.`;

  const userMsg = JSON.stringify(data);
  return await askClaude(system, `Generate monthly summary for: ${userMsg}`);
}
```

---

## 🌐 PHASE 5 — Telugu Language + Offline Support
### Duration: Day 23–25

---

### Step 1: Telugu Language Support

Create `locales/te.json`:

```json
{
  "dashboard": {
    "greeting": "నమస్కారం",
    "todayPurchase": "నేటి కొనుగోలు",
    "pendingPayments": "పెండింగ్ చెల్లింపులు",
    "stockInGodown": "గిడ్డంగిలో స్టాక్",
    "monthProfit": "నెల లాభం"
  },
  "purchase": {
    "title": "ధాన్యం కొనుగోలు",
    "farmerName": "రైతు పేరు",
    "bags": "బస్తాల సంఖ్య",
    "price": "క్వింటాలుకు ధర (₹)",
    "hamali": "హమాలీ చార్జీలు",
    "lorry": "లారీ చార్జీలు",
    "mandi": "మండి చార్జీలు",
    "save": "సేవ్ చేయి"
  },
  "gst": {
    "title": "GST కాలిక్యులేటర్",
    "branded": "బ్రాండెడ్ & ప్యాకేజ్డ్ రైస్?",
    "rate": "వర్తించే రేటు",
    "exempt": "ఈ వరి GST మినహాయింపు"
  }
}
```

Create `locales/en.json`:

```json
{
  "dashboard": {
    "greeting": "Good Morning",
    "todayPurchase": "Today's Purchase",
    "pendingPayments": "Pending Payments",
    "stockInGodown": "Stock in Godown",
    "monthProfit": "Month Profit"
  }
}
```

Setup i18n in `lib/i18n.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import te from '../locales/te.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, te: { translation: te } },
  lng: 'te',           // Default: Telugu
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
```

Use in any screen:

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<Text>{t('dashboard.greeting')}</Text>  // shows "నమస్కారం"
```

---

### Step 2: Offline Support

```typescript
// lib/offlineQueue.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// Save to local storage when offline
export async function saveOffline(table: string, data: object) {
  const key = `offline_${table}_${Date.now()}`;
  await AsyncStorage.setItem(key, JSON.stringify({ table, data, timestamp: Date.now() }));
}

// Sync offline data when back online
export async function syncOfflineData() {
  const { isConnected } = await NetInfo.fetch();
  if (!isConnected) return;

  const keys = await AsyncStorage.getAllKeys();
  const offlineKeys = keys.filter(k => k.startsWith('offline_'));

  for (const key of offlineKeys) {
    const raw = await AsyncStorage.getItem(key);
    const { table, data } = JSON.parse(raw);
    // Push to Supabase
    await supabase.from(table).insert(data);
    // Remove from local
    await AsyncStorage.removeItem(key);
  }
}
```

---

## 🚀 PHASE 6 — Polish & Launch
### Duration: Day 26–30

---

### Step 1: Error Handling & Loading States

```tsx
// Add to every screen that loads data:
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  loadData().catch(err => setError('Failed to load. Check connection.'))
            .finally(() => setLoading(false));
}, []);

if (loading) return <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 40 }} />;
if (error) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</Text>;
```

---

### Step 2: Build the Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build Android APK (free tier)
eas build --platform android --profile preview
```

This gives you a `.apk` file you can:
- Send via WhatsApp to millers in your community
- Install directly on their Android phones (no Play Store needed initially)

---

### Step 3: Share with First 5 Millers

```
Onboarding Checklist for each miller:
□ Install APK via WhatsApp
□ Register with their mobile number (OTP login)
□ Enter their mill name and GSTIN
□ Do one test purchase entry together
□ Show them the WhatsApp invoice sharing
□ Add your number for WhatsApp support
□ Collect ₹499 payment (UPI/cash)
```

---

### Step 4: Collect Feedback & Iterate

After first week with real millers, ask:
- What's confusing?
- What do they wish it could do?
- What do they use every day vs never?

Use that to plan your next month's updates.

---

## 📊 Final Architecture Summary

```
┌─────────────────────────────────────┐
│         Miller's Android Phone       │
│                                     │
│   React Native App (Expo)           │
│   ├── Dashboard                     │
│   ├── Purchase Entry                │
│   ├── Sales & Invoice               │
│   ├── GST Calculator + AI Chat      │
│   ├── Khata (Ledger)                │
│   └── Reports                       │
│                                     │
│   Offline Queue (AsyncStorage)      │
└────────────────┬────────────────────┘
                 │ (Internet)
                 ▼
┌─────────────────────────────────────┐
│           Supabase (Backend)        │
│   ├── PostgreSQL Database           │
│   ├── Auth (OTP via SMS)            │
│   ├── Row Level Security            │
│   └── Edge Functions               │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│          Claude AI (Anthropic)      │
│   ├── GST Query Chatbot (Telugu)    │
│   ├── Natural Language → Form Fill  │
│   └── Monthly Business Summary     │
└─────────────────────────────────────┘
```

---

## 🧰 Tools Summary

| Category | Tool | Cost |
|---|---|---|
| Code Editor | Cursor (AI-powered VS Code) | Free |
| App Framework | React Native + Expo | Free |
| Database | Supabase | Free (50k rows) |
| AI | Claude API (Anthropic) | Pay per use (~₹0.01/query) |
| Hosting (Web) | Vercel | Free |
| APK Build | Expo EAS | Free tier |
| Design | Figma | Free |
| Version Control | GitHub | Free |
| Invoice PDF | expo-print | Free |

---

## ✅ Definition of "Done" (Functional App)

Your app is functional when a miller can:

- [ ] Login with their phone number (OTP)
- [ ] Enter a paddy purchase with all charges
- [ ] See the auto-calculated cost breakdown
- [ ] Generate a GST invoice and share via WhatsApp
- [ ] Check who owes them money (Khata)
- [ ] Ask an AI question about GST in Telugu
- [ ] Use the app without internet for basic entries
- [ ] See monthly purchase and sales summary

**When all 8 boxes are checked — you have a product. Ship it. 🚀**

---

*Built with: React Native + Expo + Supabase + Claude AI*
*For: Rice Miller community, Telangana, India*
*By: A B.Tech 2nd year who saw the problem firsthand*
