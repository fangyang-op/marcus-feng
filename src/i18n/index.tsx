"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * ── 中 / En 語系切換 ──────────────────────────────────────
 * 前端切換(localStorage 記住,網址不變)。主頁全部中英;Demo 子頁維持中文。
 *
 * 雙語文字寫成 { zh, en };用 useLocale() 的 t() 取出當前語系字串。
 * 型別 Locale / L 放在 ./types(無 "use client"),資料檔可安全 import。
 */
import type { Locale, L } from "./types";
export type { Locale, L } from "./types";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** 取出雙語字串的當前語系版本 */
  t: (s: L) => string;
}

const Ctx = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = "mf-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  // 伺服器與首次 render 都用 zh(避免 hydration 不一致),掛載後再讀 localStorage
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "zh" || saved === "en") setLocaleState(saved);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hant" : "en";
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  };

  const value: LocaleCtx = {
    locale,
    setLocale,
    toggle: () => setLocale(locale === "zh" ? "en" : "zh"),
    t: (s: L) => s[locale],
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    // 容錯:未包在 Provider 內時退回中文(理論上不會發生)
    return {
      locale: "zh",
      setLocale: () => {},
      toggle: () => {},
      t: (s: L) => s.zh,
    };
  }
  return ctx;
}
