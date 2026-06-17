/**
 * 共用型別定義。各資料檔（site / metrics / projects ...）都引用這裡的型別。
 * 需要中英切換的欄位型別是 L = { zh, en };不切換的（技術標籤、連結、專有名詞）維持 string。
 */
import type { L } from "@/i18n/types";

export type AccentKey = "crm" | "nexus" | "matrix" | "brand" | "slate";

/** Hero CTA / 一般連結按鈕 */
export interface LinkItem {
  label: L;
  href: string;
  /** 是否為外部連結（開新分頁） */
  external?: boolean;
}

/** 核心成果數字卡 */
export interface Metric {
  /** 主數字，例如 "+140%"（中英相同，不切換） */
  value: string;
  /** 數字下方標題 */
  label: L;
  /** 補充說明 */
  detail: L;
}

/** 精選專案卡 */
export interface Project {
  id: string;
  name: L;
  /** 一句「解決什麼問題」 */
  tagline: L;
  /** 展開「查看說明」時顯示的較長描述 */
  description: L;
  /** 展開後的重點條列 */
  highlights: L[];
  /** 技術標籤（中英相同，不切換） */
  tags: string[];
  /** Demo 子頁連結（僅 CRM / Nexus / Matrix 有，其餘為 undefined） */
  demoHref?: string;
  /** 卡片強調色 */
  accent: AccentKey;
}

/** 知識傳承文件 */
export interface KnowledgeDoc {
  id: string;
  title: L;
  /** 成果摘要 */
  summary: L;
  /** 文件涵蓋重點 */
  points: L[];
  /** 可下載 PDF 路徑（放在 /public/docs/ 下）;requestOnly 時可省略 */
  pdfHref?: string;
  /** 不公開下載、改為「來信索取」（例如涉及系統防護細節的資安文件） */
  requestOnly?: boolean;
  /** requestOnly 時顯示的小字說明 */
  requestNote?: L;
  accent: AccentKey;
}

/** 技能分組 */
export interface SkillGroup {
  title: L;
  items: L[];
}

/** 經歷時間軸 */
export interface TimelineItem {
  /** 公司 / 學校名（專有名詞，中英相同） */
  org: string;
  role: L;
  period: L;
  points: L[];
  /** 是否為現職（視覺上強調） */
  current?: boolean;
}
