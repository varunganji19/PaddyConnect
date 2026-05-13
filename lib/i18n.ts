import 'intl-pluralrules';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import te from "@/locales/te.json";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    te: { translation: te }
  },
  lng: "te",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
