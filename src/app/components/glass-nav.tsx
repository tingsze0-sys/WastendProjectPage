import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage === "zh" ? "zh" : "en";
  const nextLanguage = currentLanguage === "en" ? "zh" : "en";

  useEffect(() => {
    document.documentElement.lang = currentLanguage === "zh" ? "zh-Hant" : "en";
    window.localStorage.setItem("wastend-language", currentLanguage);
  }, [currentLanguage]);

  return (
    <button
      type="button"
      onClick={() => void i18n.changeLanguage(nextLanguage)}
      aria-label={t("nav.switchTo")}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/65 px-2 py-1 text-[12px] text-[var(--ink)] shadow-[0_10px_28px_-24px_rgba(0,0,0,0.4)] transition-colors hover:bg-white"
    >
      <span className={currentLanguage === "en" ? "rounded-full bg-[var(--ink)] px-2.5 py-1 text-white" : "px-2.5 py-1 text-[var(--ink-soft)]"}>
        EN
      </span>
      <span className={currentLanguage === "zh" ? "rounded-full bg-[var(--ink)] px-2.5 py-1 text-white" : "px-2.5 py-1 text-[var(--ink-soft)]"}>
        中文
      </span>
    </button>
  );
}

export function GlassNav() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 md:px-10">
        <span className="text-[14px] font-medium tracking-[0.02em] text-[var(--ink)]">
          {t("nav.owner", { defaultValue: "Sze Wa Ting" })}
        </span>
        <LanguageToggle />
      </nav>
    </header>
  );
}
