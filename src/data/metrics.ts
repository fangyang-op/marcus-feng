import type { Metric } from "./types";

/**
 * ── 核心成果條（4 個數字卡片）──────────────────────────────
 * 要改數字就改這裡。value 是大字、label 是標題、detail 是補充說明。
 */
export const metrics: Metric[] = [
  {
    value: "+140%",
    label: "營收成長",
    detail: "NT$748 萬 → 1,795 萬",
  },
  {
    value: "450 萬",
    label: "促成年框合約",
    detail: "B2B 年度框架合作",
  },
  {
    value: "4 人團隊",
    label: "帶領與指導",
    detail: "支援 30 人部門營運",
  },
  {
    value: "3,300 萬+",
    label: "學生累計獲取獎學金",
    detail: "經手學生海外獎助總額",
  },
];
