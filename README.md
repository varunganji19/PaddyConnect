[README.md](https://github.com/user-attachments/files/27644067/README.md)
# PaddyConnect
An app to manage your rice mill
# 🌾 Rice Miller App
### తెలుగు రైస్ మిల్లర్స్ కోసం — Built for Rice Millers in Telangana, India

> A mobile-first Android app that replaces pen-and-paper workflows for rice millers with GST invoicing, Khata tracking, stock management, and an AI assistant in Telugu.

---

## 📱 Screenshots

> _Coming soon — screenshots will be added after first build_

---

## 🧩 What It Does

| Feature | Description |
|---|---|
| 📦 Paddy Purchase | Record purchases with hamali, lorry & mandi charges auto-calculated |
| 🧮 GST Calculator | HSN 1006 — 0% or 5% with CGST/SGST/IGST breakdown |
| 📄 Invoice Generator | PDF invoice shareable directly via WhatsApp |
| 📒 Khata (Ledger) | Track who owes you and who you owe, with overdue alerts |
| 🏚️ Godown / Stock | Live stock count auto-updated on every purchase and sale |
| 🏛️ CMR Tracker | Government quota tracking with deadline alerts |
| 📊 Reports | P&L, GST summary, purchase/sales reports |
| 🤖 AI Assistant | Ask GST questions in Telugu, smart form fill from natural language |

---

## 🛠️ Tech Stack

- **Frontend:** React Native + Expo (SDK 51)
- **Navigation:** Expo Router
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Auth:** Phone OTP via Supabase (Indian +91 numbers)
- **AI:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Styling:** NativeWind (Tailwind for React Native)
- **PDF:** expo-print + expo-sharing
- **i18n:** i18next (Telugu default, English fallback)
- **Forms:** React Hook Form

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- A Supabase account (free at [supabase.com](https://supabase.com))
- An Anthropic API key (at [console.anthropic.com](https://console.anthropic.com))
- Expo Go app on your Android phone

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/rice-miller-app.git
cd rice-miller-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Fill in your `.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_CLAUDE_API_KEY=your_anthropic_api_key
```

### Database Setup

1. Go to your Supabase project → SQL Editor
2. Run the full schema from [`docs/schema.sql`](docs/schema.sql)
3. This creates all tables and sets up Row Level Security

### Run the App

```bash
npx expo start
```

Scan the QR code with Expo Go on your Android phone. That's it.

---

## 📁 Project Structure

```
RiceMillerApp/
├── app/                    # Expo Router screens
│   ├── (tabs)/             # Bottom tab screens
│   │   ├── index.tsx       # Dashboard
│   │   ├── purchase.tsx    # Paddy Purchase
│   │   ├── sales.tsx       # Sales
│   │   ├── khata.tsx       # Ledger
│   │   └── reports.tsx     # Reports
│   ├── login.tsx
│   └── onboarding.tsx
├── screens/                # Non-tab screens (GST, Invoice, CMR...)
├── components/             # Reusable UI components
├── lib/                    # Business logic
│   ├── supabase.ts         # DB client
│   ├── gst.ts              # GST calculation
│   ├── invoice.ts          # PDF generation
│   └── ai.ts               # Claude API calls
├── locales/
│   ├── te.json             # Telugu strings
│   └── en.json             # English strings
└── constants/
    └── theme.ts            # Colors, fonts
```

---

## 🌐 Localization

The app is **Telugu-first**. All strings live in `locales/te.json` and `locales/en.json`.

To switch language, go to **Settings → Language**.

To add a new string:
1. Add the key to both `te.json` and `en.json`
2. Use it in any component: `const { t } = useTranslation(); t('your.key')`

---

## 🤖 AI Features

Powered by [Claude](https://anthropic.com) (claude-sonnet-4-20250514):

- **GST Chatbot** — Ask any GST question in Telugu or English. Knows HSN 1006 rules.
- **Smart Form Fill** — Type or speak naturally ("రాముడు నుండి 200 బస్తాలు 2100 కి") and the purchase form auto-fills.
- **Monthly Summary** — Get your month's business performance explained in Telugu.

---

## 📦 Building the APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure (first time only)
eas build:configure

# Build Android APK
eas build --platform android --profile preview
```

The APK can be shared directly via WhatsApp for installation — no Play Store needed for testing.

---

## 🗺️ Roadmap

### v1.0 — Current
- [x] Project setup & design system
- [ ] Auth (OTP login + onboarding)
- [ ] Dashboard
- [ ] Paddy Purchase
- [ ] GST Calculator
- [ ] Sales + Invoice
- [ ] Khata (Ledger)

### v1.5
- [ ] Godown / Stock management
- [ ] CMR Tracker
- [ ] Expenses
- [ ] Reports (P&L, GST summary)
- [ ] AI Assistant (Claude)
- [ ] Settings + Telugu/English toggle

### v2.0
- [ ] Multi-mill support (switch between mills)
- [ ] Offline mode (sync when reconnected)
- [ ] Push notifications (CMR deadlines, overdue payments)
- [ ] Play Store release
- [ ] Payment gateway for subscriptions

---

## 💰 Pricing Model

| Plan | Price | Features |
|---|---|---|
| Free Trial | 30 days | Full access |
| Basic | ₹499/year | Core features |
| Pro | ₹999/year | Core + Reports + AI |

---

## 🤝 Contributing

This is a solo student project for now. Contributions welcome after v1.0 ships.

If you're a rice miller or know one in Telangana and want to be a beta tester — reach out via WhatsApp or open an Issue.

---

## 👨‍💻 Author

Built by a B.Tech 2nd year student from Hyderabad, for the rice miller community in Telangana.

> *"No software company can replicate the trust of 'this app was built by someone from our community.'"*

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙏 Acknowledgements

- [Expo](https://expo.dev) — for making React Native actually easy
- [Supabase](https://supabase.com) — for the free, powerful backend
- [Anthropic](https://anthropic.com) — for Claude AI
- Rice miller community in Telangana — for the real-world validation
