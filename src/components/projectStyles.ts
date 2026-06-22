import type { AccentKey } from "@/data/types";

/**
 * 各專案強調色。class 寫成完整字串，讓 Tailwind JIT 能正確掃描。
 * （對應 tailwind.config.ts 內的 crm / nexus / matrix / brand / slate 色）
 */
export const ACCENT: Record<
  AccentKey,
  { bar: string; text: string; btn: string; check: string; ring: string; soft: string }
> = {
  crm: {
    bar: "bg-crm",
    text: "text-crm",
    btn: "bg-crm hover:bg-crm-ink",
    check: "text-crm",
    ring: "ring-crm",
    soft: "bg-crm/5",
  },
  nexus: {
    bar: "bg-nexus-pink",
    text: "text-nexus-pink",
    btn: "bg-nexus-pink hover:bg-nexus-purple",
    check: "text-nexus-pink",
    ring: "ring-nexus-pink",
    soft: "bg-nexus-pink/5",
  },
  matrix: {
    bar: "bg-matrix-rose",
    text: "text-matrix-rose",
    btn: "bg-matrix-rose hover:bg-matrix-orange",
    check: "text-matrix-rose",
    ring: "ring-matrix-rose",
    soft: "bg-matrix-rose/5",
  },
  brand: {
    bar: "bg-brand-600",
    text: "text-brand-700",
    btn: "bg-brand-700 hover:bg-brand-800",
    check: "text-brand-600",
    ring: "ring-brand-600",
    soft: "bg-brand-600/5",
  },
  slate: {
    bar: "bg-slate-500",
    text: "text-slate-700",
    btn: "bg-slate-700 hover:bg-slate-900",
    check: "text-slate-500",
    ring: "ring-slate-500",
    soft: "bg-slate-500/5",
  },
};

/** 中文標籤的英文對照（技術名詞不在表內，英文模式直接沿用原字串） */
export const TAG_EN: Record<string, string> = {
  品牌設計: "Brand Design",
  資料建模: "Data Modeling",
  資料清洗: "Data Cleaning",
  資安稽核: "Security Auditing",
  風險評估: "Risk Assessment",
};

/** 標籤在 en 模式下的顯示字串 */
export function tagLabel(tag: string, locale: string): string {
  return locale === "en" ? TAG_EN[tag] ?? tag : tag;
}
