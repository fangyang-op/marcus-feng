import type { Metric } from "./types";

/**
 * ── 核心成果條（4 個數字卡片）──────────────────────────────
 * 要改數字就改這裡。value 是大字、label 是標題、detail 是補充說明。
 */
export const metrics: Metric[] = [
  {
    value: "+140%",
    label: { zh: "營收成長", en: "Revenue Growth" },
    detail: { zh: "NT$748 萬 → 1,795 萬", en: "NT$7.48M → NT$17.95M" },
  },
  {
    value: "450 萬",
    label: { zh: "促成年框合約", en: "Annual Framework Deal Closed" },
    detail: { zh: "B2B 年度框架合作", en: "B2B annual framework partnership" },
  },
  {
    value: "4 人團隊",
    label: { zh: "帶領與指導", en: "Led & Mentored" },
    detail: { zh: "支援 30 人部門營運", en: "Supporting a 30-person department" },
  },
  {
    value: "3,300 萬+",
    label: { zh: "學生累計獲取獎學金", en: "Student Scholarships Secured" },
    detail: { zh: "經手學生海外獎助總額", en: "Total overseas aid won by students I advised" },
  },
];
