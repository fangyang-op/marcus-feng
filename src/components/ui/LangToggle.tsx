"use client";

import { useLocale, type Locale } from "@/i18n";

/**
 * 中 / EN 語系切換鈕(分段式)。體積小,桌機與手機 header 都放得下。
 */
export function LangToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  const seg = (value: Locale, label: string) => {
    const active = locale === value;
    return (
      <button
        type="button"
        onClick={() => setLocale(value)}
        aria-pressed={active}
        aria-label={value === "zh" ? "切換為中文" : "Switch to English"}
        className={`rounded-md px-2.5 py-1 text-sm font-semibold transition-colors ${
          active
            ? "bg-brand-700 text-white shadow-sm"
            : "text-ink-muted hover:text-ink-soft"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-slate-300 bg-white p-0.5 ${className}`}
    >
      {seg("zh", "中")}
      {seg("en", "EN")}
    </div>
  );
}
