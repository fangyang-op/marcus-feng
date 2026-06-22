import type { Metric } from "./types";

/**
 * ── 核心成果條（4 個數字卡片）──────────────────────────────
 * 要改數字就改這裡。value 是大字、label 是標題、detail 是補充說明。
 */
export const metrics: Metric[] = [
  {
    value: { zh: "+140%", en: "+140%" },
    label: { zh: "營收成長", en: "Revenue Growth" },
    detail: { zh: "NT$748 萬 → 1,795 萬", en: "NT$7.48M → NT$17.95M" },
  },
  {
    value: { zh: "450 萬", en: "NT$4.5M" },
    label: { zh: "促成年框合約", en: "Annual Framework Deal Closed" },
    detail: { zh: "B2B 年度框架合作", en: "B2B annual framework partnership" },
  },
  {
    value: { zh: "4 人團隊", en: "Team of 4" },
    label: { zh: "帶領與指導", en: "Led & Mentored" },
    detail: { zh: "支援 30 人部門營運", en: "Supporting a 30-person department" },
  },
  {
    value: { zh: "3 套系統", en: "3 systems" },
    label: { zh: "親手打造、導入團隊日常工作流", en: "Hand-built into daily workflow" },
    detail: {
      zh: "全端 CRM、數據分析、知識庫",
      en: "Full-stack CRM, analytics & knowledge base",
    },
  },
];
