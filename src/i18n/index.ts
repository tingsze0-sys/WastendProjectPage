import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en/common.json";
import zh from "../locales/zh/common.json";

export const supportedLanguages = ["en", "zh"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";

  const storedLanguage = window.localStorage.getItem("wastend-language");
  return storedLanguage === "zh" ? "zh" : "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    zh: { common: zh },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
