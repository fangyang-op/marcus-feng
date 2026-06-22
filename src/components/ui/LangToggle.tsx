"use client";

import { useLocale, type Locale } from "@/i18n";

/**
 * 中 / EN 語系切換鈕（分段式）。體積小，桌機與手機 header 都放得下。
 * onDark: 在深色 Hero 上(header 透明)時用淺色/霧面樣式。
 */
export function LangToggle({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const { locale, setLocale } = useLocale();

  const seg = (value: Locale, label: string) => {
    const active = locale === value;
    const activeCls = onDark
      ? "bg-white text-brand-900 shadow-sm"
      : "bg-brand-700 text-white shadow-sm";
    const idleCls = onDark
      ? "text-white/70 hover:text-white"
      : "text-ink-muted hover:text-ink-soft";
    return (
      <button
        type="button"
        onClick={() => setLocale(value)}
        aria-pressed={active}
        aria-label={value === "zh" ? "切換為中文" : "Switch to English"}
        className={`rounded-md px-2.5 py-1 text-sm font-semibold transition-colors ${
          active ? activeCls : idleCls
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`inline-flex items-center rounded-lg border p-0.5 transition-colors ${
        onDark
          ? "border-white/20 bg-white/10 backdrop-blur-sm"
          : "border-slate-300 bg-white"
      } ${className}`}
    >
      {seg("zh", "中")}
      {seg("en", "EN")}
    </div>
  );
}
