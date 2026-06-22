import type { Project } from "./types";

/**
 * ── 精選專案 ──────────────────────────────────────────────
 * 每張卡：name(專案名)+ tagline(一句解決什麼問題)+ tags(技術標籤)
 *   + description / highlights(展開「查看說明」時顯示)
 *   + demoHref(僅 CRM / Nexus / Matrix 有 Demo 子頁)
 *
 * 要新增專案：複製一個物件、填欄位即可。順序就是顯示順序。
 */
export const projects: Project[] = [
  {
    id: "crm",
    name: {
      zh: "CRM 全端營運平台",
      en: "Full-Stack CRM Operations Platform",
    },
    tagline: {
      zh: "把「學生即專案」的留學全流程，從招生到入學收進同一個系統協作管理。",
      en: "A \"student-as-project\" model that brings the entire study-abroad journey — from recruitment to enrollment — into one collaborative system.",
    },
    description: {
      zh: "為留學代辦團隊打造的內部 CRM。以「每位學生就是一個專案」為核心，串起招生、諮詢、成交、選校、文件、申請到入學的完整生命週期，讓前後端顧問在同一平台協作，並把字數帳本、選校表版控、申請進度與績效拆分制度化。系統由我主導開發、資安整改獨立完成，目前正逐步移交資訊部維運。",
      en: "An internal CRM built for a study-abroad consultancy. Centered on the principle that every student is a project, it connects the full lifecycle — recruitment, consultation, closing, school selection, documents, applications, and enrollment — so front- and back-end consultants collaborate on a single platform. It systematizes the word-count ledger, school-list version control, application tracking, and commission splits. I led development end to end and completed the security remediation single-handedly; the system is now being progressively handed over to the IT department for maintenance.",
    },
    highlights: [
      {
        zh: "學生 360 詳情頁：概覽 / 時間軸 / 成績 / 成交 / 選校表 / 文件 / 申請 七大分頁",
        en: "Student 360 detail page with seven tabs: Overview, Timeline, Scores, Deals, School List, Documents, and Applications.",
      },
      {
        zh: "申請看板（9 種狀態）與表格雙視圖，跨校追蹤截止與結果",
        en: "Application board (9 statuses) with a dual board/table view, tracking deadlines and outcomes across schools.",
      },
      {
        zh: "服務方案、成交與績效拆分制度化，支援多角色權限（顧問 / 主管 / Admin）",
        en: "Systematized service plans, deal closing, and commission splits, with multi-role access control (consultant / manager / admin).",
      },
      {
        zh: "字數帳本（只進不改的流水帳）與文件三層版控，杜絕版本混亂",
        en: "An append-only word-count ledger and three-tier document version control eliminate version chaos.",
      },
      {
        zh: "資安整改 E→A（獨立完成）：公司資訊部提供一份初步資安檢查報告作為標準（初始 Security Review 為 E 級），我獨立完成所有整改",
        en: "Security remediation from E to A, completed independently: the IT department supplied an initial security assessment as the benchmark (Security Review starting at grade E), and I carried out every remediation myself.",
      },
      {
        zh: "導入 SonarQube、Semgrep 靜態掃描並自行修補所有問題 → Security B→A、資安複審 Security Review E→A、可靠性 C→A",
        en: "Introduced SonarQube and Semgrep static analysis and fixed every finding myself → Security B→A, re-audited Security Review E→A, and Reliability C→A.",
      },
      {
        zh: "建立 91 項自動化測試（單元 + 跨角色權限實測 + 端到端），漏洞與重大 Bug 歸零",
        en: "Built 91 automated tests (unit, cross-role permission, and end-to-end), driving vulnerabilities and critical bugs to zero.",
      },
      {
        zh: "production 級存取控制：Supabase RLS 列級權限（預設 deny）+ 欄位級權限（防越權改派學生 / 改收款人）+ 敏感帳密加密",
        en: "Production-grade access control: Supabase RLS row-level permissions (deny by default) + field-level permissions (preventing unauthorized student reassignment or payee changes) + encryption of sensitive credentials.",
      },
      {
        zh: "將整套整改寫成可複用資安稽核 Playbook，並沿用至後續其他平台",
        en: "Documented the entire remediation as a reusable security-audit playbook, since applied to other platforms.",
      },
    ],
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "shadcn/ui", "Vercel"],
    demoHref: "/demo/crm",
    accent: "crm",
  },
  {
    id: "nexus",
    name: {
      zh: "Nexus 顧問資訊整合中心",
      en: "Nexus Consultant Intelligence Hub",
    },
    tagline: {
      zh: "把散落的院校資料、榜單、SOP 與 AI 助理整合成顧問的一站式工作台。",
      en: "Consolidates scattered school data, admission records, SOPs, and an AI assistant into a single workspace for consultants.",
    },
    description: {
      zh: "顧問日常要查院校、看歷屆榜單、翻 SOP、出報價、產推薦——以前散在各種檔案與群組。Nexus 把它們整合成單一中控台，再加上 AI 落點分析與 AI 助理，讓顧問查資料、做決策、出文件都在同一個地方完成。",
      en: "Consultants spend their days looking up schools, reviewing past admission results, digging through SOPs, preparing quotes, and drafting recommendations — work that used to be scattered across files and group chats. Nexus brings it all into one control center, adding AI placement analysis and an AI assistant so consultants can research, decide, and produce documents in a single place.",
    },
    highlights: [
      {
        zh: "院校資料庫：搜尋 / 篩選 / 排名 / 合作標籤 + 表格內編輯",
        en: "School database with search, filtering, rankings, partnership tags, and inline table editing.",
      },
      {
        zh: "AI 落點分析：輸入學生背景產出 Dream / Match / Safety 與錄取機率，附 What-if 滑桿即時模擬",
        en: "AI placement analysis: enter a student profile to generate Dream / Match / Safety tiers and admission probabilities, with What-if sliders for real-time simulation.",
      },
      {
        zh: "遊學報價系統：7 步驟精靈 + 右側即時費用試算",
        en: "Study-tour quoting system: a 7-step wizard with live cost estimation in the right panel.",
      },
      {
        zh: "全域浮動 AI 助理：多對話 thread、模型切換、可綁定歷屆案例",
        en: "Global floating AI assistant: multiple conversation threads, model switching, and the ability to attach past cases.",
      },
      {
        zh: "知識庫 Wiki（TipTap 富文本）、公告、歷屆榜單、遊學 CRM",
        en: "Knowledge-base wiki (TipTap rich text), announcements, historical admission records, and a study-tour CRM.",
      },
    ],
    tags: ["React", "TypeScript", "Tailwind", "Supabase", "Gemini API", "TipTap"],
    demoHref: "/demo/nexus",
    accent: "nexus",
  },
  {
    id: "matrix",
    name: {
      zh: "Matrix 營運數據分析中心",
      en: "Matrix Operations Analytics Center",
    },
    tagline: {
      zh: "把試算表裡的業務名單，變成可決策的營收、轉換與顧問績效儀表板。",
      en: "Turns spreadsheet lead lists into decision-ready dashboards for revenue, conversion, and consultant performance.",
    },
    description: {
      zh: "營運會議以前靠手動拉 Excel。Matrix 直接把名單資料轉成多年度的營運 BI 儀表板：營收、轉換率、顧問績效、招生來源、產品組成一次看清，再用 AI 助理產出決策洞察，讓「看數字」變成「做決策」。",
      en: "Operations reviews used to rely on manually pulling Excel files. Matrix turns lead data directly into a multi-year operations BI dashboard — revenue, conversion rates, consultant performance, recruitment sources, and product mix all in one view — then uses an AI assistant to surface decision-ready insights, turning \"looking at numbers\" into \"making decisions.\"",
    },
    highlights: [
      {
        zh: "總覽儀表板：可翻轉 KPI 卡 + 月度轉換/營收複合圖（ComposedChart）",
        en: "Overview dashboard with flippable KPI cards and a monthly conversion/revenue composite chart (ComposedChart).",
      },
      {
        zh: "即時績效監控：年度/月度達成率進度條與 SVG 環形圖、各區與顧問對標",
        en: "Real-time performance monitoring: annual/monthly attainment progress bars, SVG ring charts, and benchmarking across regions and consultants.",
      },
      {
        zh: "個別顧問分析：國別轉化漏斗 + 學生年級雙層雷達圖",
        en: "Individual consultant analysis: country-level conversion funnel and a two-layer radar chart by student grade.",
      },
      {
        zh: "來源績效：佔比圓餅 / 諮詢對成交長條 / 月度面積趨勢",
        en: "Source performance: share pie chart, consultation-to-close bar chart, and monthly area trend.",
      },
      {
        zh: "產品 × 月份營收熱力圖、2024–2026 年度切換與同期比較",
        en: "Product × month revenue heatmap with 2024–2026 year switching and year-over-year comparison.",
      },
    ],
    tags: ["React", "TypeScript", "Recharts", "Tailwind", "Supabase", "GAS"],
    demoHref: "/demo/matrix",
    accent: "matrix",
  },
  {
    id: "saleskit",
    name: {
      zh: "顧問 Sales Kit 行銷站",
      en: "Consultant Sales Kit Marketing Site",
    },
    tagline: {
      zh: "把品牌定位與服務方案，變成業務談單時能直接打開的對外形象頁。",
      en: "Turns brand positioning and service plans into a client-facing site consultants can open right in the room.",
    },
    description: {
      zh: "一套對外的品牌與業務素材網站，統一服務方案、成功案例與品牌語氣，讓每位顧問談單時都拿得出一致、專業的對外形象，也支撐品牌重塑後的市場溝通。",
      en: "A client-facing brand and sales-asset site that unifies service plans, success stories, and brand voice, so every consultant presents a consistent, professional image when closing — and that backs the company's market messaging after its rebrand.",
    },
    highlights: [
      {
        zh: "品牌重塑後的一致視覺與訊息架構",
        en: "Consistent visual identity and messaging architecture following the rebrand.",
      },
      {
        zh: "服務方案、成功案例、品牌故事模組化呈現",
        en: "Service plans, success stories, and the brand story presented in modular blocks.",
      },
      {
        zh: "顧問可直接於會談中展示，縮短信任建立時間",
        en: "Consultants can present it live during meetings, shortening the time it takes to build trust.",
      },
    ],
    tags: ["Next.js", "Tailwind", "Vercel", "品牌設計"],
    accent: "brand",
  },
  {
    id: "placement",
    name: {
      zh: "落點分析資料庫",
      en: "Admission Placement Database",
    },
    tagline: {
      zh: "把歷屆錄取結果結構化，讓「這個背景能上哪」有資料可依。",
      en: "Structures past admission results so \"where can this profile get in\" becomes a data-backed answer.",
    },
    description: {
      zh: "整理歷屆學生的背景（GPA、語言成績、在台科系）與錄取結果（學校、科系、排名、獎學金），建立可查詢、可比對的結構化資料庫，成為 AI 落點分析與顧問選校建議的事實基礎。",
      en: "Organizes past students' profiles (GPA, language scores, home-university major) and admission outcomes (school, program, ranking, scholarship) into a queryable, comparable structured database — the factual foundation for AI placement analysis and consultants' school-selection advice.",
    },
    highlights: [
      {
        zh: "歷屆榜單結構化：背景條件 × 錄取結果可交叉查詢",
        en: "Structured admission records: profile attributes × outcomes are cross-queryable.",
      },
      {
        zh: "支撐 AI 落點分析的相似案例比對",
        en: "Powers similar-case matching for AI placement analysis.",
      },
      {
        zh: "資料脫敏輸出（姓名遮罩），兼顧分析與隱私",
        en: "De-identified output (name masking) balances analysis with privacy.",
      },
    ],
    tags: ["資料建模", "SQL", "資料清洗", "Google Sheets"],
    accent: "slate",
  },
  {
    id: "content-training",
    name: {
      zh: "內容與培訓系統",
      en: "Content & Training System",
    },
    tagline: {
      zh: "把分散的新人訓練、業務工具與品牌素材，標準化成可重複使用、可交接的內容資產。",
      en: "Standardizes scattered onboarding, sales tools, and brand assets into reusable, handoff-ready content.",
    },
    description: {
      zh: "新人訓練、業務工具、品牌素材過去散落各處、靠口耳相傳。我把它們整理成標準化、模組化的內容資產：從顧問 onboarding 教材、業務 Sales Kit 到 Notion 品牌模板，讓團隊能重複使用、也方便交接。",
      en: "Onboarding, sales tools, and brand assets used to be scattered everywhere and passed on by word of mouth. I organized them into standardized, modular content assets — from consultant onboarding materials and the sales kit to Notion brand templates — so the team can reuse them and hand them off with ease.",
    },
    highlights: [
      {
        zh: "新人訓練手冊：設計前後端顧問完整 onboarding 教材，縮短上手時間",
        en: "Onboarding handbook: complete onboarding materials for front- and back-end consultants that shorten ramp-up time.",
      },
      {
        zh: "Sales Kit 與報價單：標準化業務工具包，讓每位顧問談單品質一致",
        en: "Sales kit and quote sheets: a standardized sales toolkit that keeps every consultant's pitch consistent in quality.",
      },
      {
        zh: "Notion 品牌模板：活動 / 工作坊專業模板，可重複套用",
        en: "Notion brand templates: professional templates for events and workshops, ready to reuse.",
      },
      {
        zh: "這些內容與「知識傳承」一脈相承——把個人經驗變成團隊資產",
        en: "All of this follows the same thread as knowledge transfer — turning individual experience into team assets.",
      },
    ],
    tags: ["Notion", "Figma", "SOP", "Onboarding"],
    accent: "brand",
  },
  {
    id: "security",
    name: {
      zh: "資安工程與稽核",
      en: "Security Engineering & Auditing",
    },
    tagline: {
      zh: "把「系統能不能被打」這件事，變成可檢測、可稽核、可交接的流程。",
      en: "Turns \"can this system be breached\" into a process that's testable, auditable, and handoff-ready.",
    },
    description: {
      zh: "在自建系統上線前後，主動導入資安檢測與稽核流程：從靜態掃描、相依套件、權限與機敏資料外洩風險逐項檢查，並把過程寫成可重複執行的 Playbook，讓資安從「靠運氣」變成「有制度」。",
      en: "Before and after launching in-house systems, I proactively introduced security testing and audit processes — checking static analysis, dependencies, permissions, and sensitive-data leakage risks item by item — and documented the process as a repeatable playbook, turning security from a matter of luck into a matter of discipline.",
    },
    highlights: [
      {
        zh: "SonarQube / Semgrep 資安整改：Security Review E→A、Security B→A、91 項自動化測試（獨立完成）",
        en: "SonarQube / Semgrep security remediation: Security Review E→A, Security B→A, and 91 automated tests (completed independently).",
      },
      {
        zh: "靜態程式碼掃描（Semgrep / SonarQube）與相依套件稽核",
        en: "Static code scanning (Semgrep / SonarQube) and dependency auditing.",
      },
      {
        zh: "RLS 權限、機敏資料加密、金鑰外洩風險檢查",
        en: "RLS permissions, sensitive-data encryption, and key-leakage risk checks.",
      },
      {
        zh: "資安檢測報告書 + 可重複執行的稽核 Playbook",
        en: "Security assessment reports plus a repeatable audit playbook.",
      },
    ],
    tags: ["Semgrep", "SonarQube", "資安稽核", "風險評估"],
    accent: "slate",
  },
];
