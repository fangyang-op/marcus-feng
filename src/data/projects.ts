import type { Project } from "./types";

/**
 * ── 精選專案 ──────────────────────────────────────────────
 * 每張卡:name(專案名)+ tagline(一句解決什麼問題)+ tags(技術標籤)
 *   + description / highlights(展開「查看說明」時顯示)
 *   + demoHref(僅 CRM / Nexus / Matrix 有 Demo 子頁)
 *
 * 要新增專案:複製一個物件、填欄位即可。順序就是顯示順序。
 */
export const projects: Project[] = [
  {
    id: "crm",
    name: "CRM 全端營運平台",
    tagline: "把「學生即專案」的留學全流程,從招生到入學收進同一個系統協作管理。",
    description:
      "為留學代辦團隊打造的內部 CRM。以「每位學生就是一個專案」為核心,串起招生、諮詢、成交、選校、文件、申請到入學的完整生命週期,讓前後端顧問在同一平台協作,並把字數帳本、選校表版控、申請進度與績效拆分制度化。",
    highlights: [
      "學生 360 詳情頁:概覽 / 時間軸 / 成績 / 成交 / 選校表 / 文件 / 申請 七大分頁",
      "申請看板(9 種狀態)與表格雙視圖,跨校追蹤截止與結果",
      "服務方案、成交與績效拆分制度化,支援多角色權限(顧問 / 主管 / Admin)",
      "字數帳本(只進不改的流水帳)與文件三層版控,杜絕版本混亂",
      "Supabase RLS 列級權限 + 加密儲存敏感帳密",
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "shadcn/ui", "Vercel"],
    demoHref: "/demo/crm",
    accent: "crm",
  },
  {
    id: "nexus",
    name: "Nexus 顧問資訊整合中心",
    tagline: "把散落的院校資料、榜單、SOP 與 AI 助理整合成顧問的一站式工作台。",
    description:
      "顧問日常要查院校、看歷屆榜單、翻 SOP、出報價、產推薦——以前散在各種檔案與群組。Nexus 把它們整合成單一中控台,再加上 AI 落點分析與 AI 助理,讓顧問查資料、做決策、出文件都在同一個地方完成。",
    highlights: [
      "院校資料庫:搜尋 / 篩選 / 排名 / 合作標籤 + 表格內編輯",
      "AI 落點分析:輸入學生背景產出 Dream / Match / Safety 與錄取機率,附 What-if 滑桿即時模擬",
      "EP 遊學報價系統:7 步驟精靈 + 右側即時費用試算",
      "全域浮動 AI 助理:多對話 thread、模型切換、可綁定歷屆案例",
      "知識庫 Wiki(TipTap 富文本)、公告、歷屆榜單、遊學 CRM",
    ],
    tags: ["React", "TypeScript", "Tailwind", "Firebase", "Gemini API", "TipTap"],
    demoHref: "/demo/nexus",
    accent: "nexus",
  },
  {
    id: "matrix",
    name: "Matrix 營運數據分析中心",
    tagline: "把試算表裡的業務名單,變成可決策的營收、轉換與顧問績效儀表板。",
    description:
      "營運會議以前靠手動拉 Excel。Matrix 直接把名單資料轉成多年度的營運 BI 儀表板:營收、轉換率、顧問績效、招生來源、產品組成一次看清,再用 AI 助理產出決策洞察,讓「看數字」變成「做決策」。",
    highlights: [
      "總覽儀表板:可翻轉 KPI 卡 + 月度轉換/營收複合圖(ComposedChart)",
      "即時績效監控:年度/月度達成率進度條與 SVG 環形圖、各區與顧問對標",
      "個別顧問分析:國別轉化漏斗 + 學生年級雙層雷達圖",
      "來源績效:佔比圓餅 / 諮詢對成交長條 / 月度面積趨勢",
      "產品 × 月份營收熱力圖、2024–2026 年度切換與同期比較",
    ],
    tags: ["React", "TypeScript", "Recharts", "Tailwind", "Firebase", "GAS"],
    demoHref: "/demo/matrix",
    accent: "matrix",
  },
  {
    id: "saleskit",
    name: "顧問 Sales Kit 行銷站",
    tagline: "把品牌定位與服務方案,變成業務談單時能直接打開的對外形象頁。",
    description:
      "一套對外的品牌與業務素材網站,統一服務方案、成功案例與品牌語氣,讓每位顧問談單時都拿得出一致、專業的對外形象,也支撐品牌重塑後的市場溝通。",
    highlights: [
      "品牌重塑後的一致視覺與訊息架構",
      "服務方案、成功案例、品牌故事模組化呈現",
      "顧問可直接於會談中展示,縮短信任建立時間",
    ],
    tags: ["Next.js", "Tailwind", "Vercel", "品牌設計"],
    accent: "brand",
  },
  {
    id: "placement",
    name: "落點分析資料庫",
    tagline: "把歷屆錄取結果結構化,讓「這個背景能上哪」有資料可依。",
    description:
      "整理歷屆學生的背景(GPA、語言成績、在台科系)與錄取結果(學校、科系、排名、獎學金),建立可查詢、可比對的結構化資料庫,成為 AI 落點分析與顧問選校建議的事實基礎。",
    highlights: [
      "歷屆榜單結構化:背景條件 × 錄取結果可交叉查詢",
      "支撐 AI 落點分析的相似案例比對",
      "資料脫敏輸出(姓名遮罩),兼顧分析與隱私",
    ],
    tags: ["資料建模", "SQL", "資料清洗", "Google Sheets"],
    accent: "slate",
  },
  {
    id: "content-training",
    name: "內容與培訓系統",
    tagline:
      "把分散的新人訓練、業務工具與品牌素材,標準化成可重複使用、可交接的內容資產。",
    description:
      "新人訓練、業務工具、品牌素材過去散落各處、靠口耳相傳。我把它們整理成標準化、模組化的內容資產:從顧問 onboarding 教材、業務 Sales Kit 到 Notion 品牌模板,讓團隊能重複使用、也方便交接。",
    highlights: [
      "新人訓練手冊:設計前後端顧問完整 onboarding 教材,縮短上手時間",
      "Sales Kit 與報價單:標準化業務工具包,讓每位顧問談單品質一致",
      "Notion 品牌模板:活動 / 工作坊專業模板,可重複套用",
      "這些內容與「知識傳承」一脈相承——把個人經驗變成團隊資產",
    ],
    tags: ["Notion", "Figma", "SOP", "Onboarding"],
    accent: "brand",
  },
  {
    id: "security",
    name: "資安工程與稽核",
    tagline: "把「系統能不能被打」這件事,變成可檢測、可稽核、可交接的流程。",
    description:
      "在自建系統上線前後,主動導入資安檢測與稽核流程:從靜態掃描、相依套件、權限與機敏資料外洩風險逐項檢查,並把過程寫成可重複執行的 Playbook,讓資安從「靠運氣」變成「有制度」。",
    highlights: [
      "靜態程式碼掃描(Semgrep / SonarQube)與相依套件稽核",
      "RLS 權限、機敏資料加密、金鑰外洩風險檢查",
      "資安檢測報告書 + 可重複執行的稽核 Playbook",
    ],
    tags: ["Semgrep", "SonarQube", "資安稽核", "風險評估"],
    accent: "slate",
  },
];
