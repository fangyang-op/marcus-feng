/**
 * 共用型別定義。各資料檔(site / metrics / projects ...)都引用這裡的型別,
 * 你編輯資料時 TypeScript 會即時提示欄位,降低改錯的機會。
 */

export type AccentKey = "crm" | "nexus" | "matrix" | "brand" | "slate";

/** Hero CTA / 一般連結按鈕 */
export interface LinkItem {
  label: string;
  href: string;
  /** 是否為外部連結(開新分頁) */
  external?: boolean;
}

/** 核心成果數字卡 */
export interface Metric {
  /** 主數字,例如 "+140%" */
  value: string;
  /** 數字下方標題,例如 "營收成長" */
  label: string;
  /** 補充說明,例如 "NT$748萬 → 1,795萬" */
  detail: string;
}

/** 精選專案卡 */
export interface Project {
  id: string;
  name: string;
  /** 一句「解決什麼問題」 */
  tagline: string;
  /** 展開「查看說明」時顯示的較長描述 */
  description: string;
  /** 展開後的重點條列 */
  highlights: string[];
  /** 技術標籤 */
  tags: string[];
  /** Demo 子頁連結(僅 CRM / Nexus / Matrix 有,其餘為 undefined) */
  demoHref?: string;
  /** 卡片強調色 */
  accent: AccentKey;
}

/** 知識傳承文件 */
export interface KnowledgeDoc {
  id: string;
  title: string;
  /** 成果摘要 */
  summary: string;
  /** 文件涵蓋重點 */
  points: string[];
  /** 可下載 PDF 路徑(放在 /public/docs/ 下);requestOnly 時可省略 */
  pdfHref?: string;
  /** 不公開下載、改為「來信索取」(例如涉及系統防護細節的資安文件) */
  requestOnly?: boolean;
  /** requestOnly 時顯示的小字說明 */
  requestNote?: string;
  accent: AccentKey;
}

/** 技能分組 */
export interface SkillGroup {
  title: string;
  items: string[];
}

/** 經歷時間軸 */
export interface TimelineItem {
  org: string;
  role: string;
  period: string;
  points: string[];
  /** 是否為現職(視覺上強調) */
  current?: boolean;
}
