/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{ts,tsx}", "./screens/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        "surface-low": "var(--color-surface-low)",
        "surface-container": "var(--color-surface-container)",
        "surface-high": "var(--color-surface-high)",
        "surface-highest": "var(--color-surface-highest)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        outline: "var(--color-outline)",
        "outline-soft": "var(--color-outline-soft)",
        primary: "var(--color-primary)",
        "primary-container": "var(--color-primary-container)",
        "primary-fixed": "var(--color-primary-fixed)",
        secondary: "var(--color-secondary)",
        "secondary-container": "var(--color-secondary-container)",
        tertiary: "var(--color-tertiary)",
        "tertiary-container": "var(--color-tertiary-container)",
        danger: "var(--color-danger)",
        "danger-soft": "var(--color-danger-soft)",
        card: "var(--color-card)",
        paddy: "var(--color-paddy)",
        rice: "var(--color-rice)",
        ledger: "var(--color-ledger)",
        government: "var(--color-government)",
        success: "var(--color-success)",
        warning: "var(--color-warning)"
      },
      fontFamily: {
        sans: ["Inter"],
        display: ["Work Sans"],
        mono: ["JetBrains Mono"]
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px"
      }
    }
  },
  plugins: []
};
