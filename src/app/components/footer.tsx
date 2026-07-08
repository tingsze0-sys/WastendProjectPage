import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-8 md:px-10">
        <span className="text-[13px] text-[var(--ink-soft)]">
          {t("footer")}
        </span>
      </div>
    </footer>
  );
}
