/**
 * ── CRM 全端營運平台 — Demo 假資料 + 型別 ─────────────────────
 * 留學代辦內部 CRM 的 UI 骨架還原。所有資料皆為固定常數(無亂數、無 Date.now),
 * 以避免 SSR/hydration 不一致。姓名/顧問/區域一律假名;校名為公開大學,數字為合理假值。
 */

import type { PillColor } from "@/components/demo/primitives";

/* ── 學生狀態(對應原系統 student_statuses)──────────────── */
export type StudentCategory = "recruitment" | "closed" | "application" | "special";

export interface StatusMeta {
  code: string;
  label: string;
  category: StudentCategory;
  color: PillColor;
}

/** code → 狀態設定 */
export const STATUS_META: Record<string, StatusMeta> = {
  new_lead: { code: "new_lead", label: "新名單", category: "recruitment", color: "slate" },
  contacted: { code: "contacted", label: "已聯絡", category: "recruitment", color: "blue" },
  consulting: { code: "consulting", label: "諮詢中", category: "recruitment", color: "cyan" },
  qualified: { code: "qualified", label: "已確認需求", category: "recruitment", color: "indigo" },
  closed_won: { code: "closed_won", label: "已成交", category: "closed", color: "emerald" },
  onboarding: { code: "onboarding", label: "啟動服務", category: "application", color: "teal" },
  school_selection: { code: "school_selection", label: "選校中", category: "application", color: "violet" },
  document_prep: { code: "document_prep", label: "文件準備", category: "application", color: "violet" },
  submitting: { code: "submitting", label: "送件中", category: "application", color: "blue" },
  awaiting_decision: { code: "awaiting_decision", label: "等待結果", category: "application", color: "amber" },
  decision_making: { code: "decision_making", label: "選擇學校", category: "application", color: "pink" },
  pre_departure: { code: "pre_departure", label: "行前準備", category: "application", color: "orange" },
  enrolled: { code: "enrolled", label: "已入學", category: "application", color: "green" },
  paused: { code: "paused", label: "暫停", category: "special", color: "slate" },
};

/* ── 學生列表 ────────────────────────────────────────────── */
export interface StudentRow {
  id: string;
  fullName: string;
  englishName: string;
  statusCode: string;
  frontend: string | null;
  backend: string | null;
  country: string[];
  degree: string;
  intake: string;
  createdAt: string;
  /** 當前學校 / 科系(用於詳情頁,固定常數) */
  schoolZh: string;
  majorZh: string;
  /** 目標主修(英文,用於詳情頁) */
  targetMajor: string;
  gpa: string;
  /** 語言成績(顯示用字串,如 "TOEFL 105" 或 "IELTS 7.0") */
  langTest: string;
  langScore: string;
}

export const STUDENTS: StudentRow[] = [
  { id: "s01", fullName: "陳柏宇", englishName: "Brian Chen", statusCode: "submitting", frontend: "顧問 周庭安", backend: "顧問 高承翰", country: ["美國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-09-12", schoolZh: "國立臺灣大學 電機工程學系", majorZh: "電機工程", targetMajor: "Electrical Engineering", gpa: "3.85", langTest: "TOEFL", langScore: "108" },
  { id: "s02", fullName: "林芷晴", englishName: "Cindy Lin", statusCode: "closed_won", frontend: "顧問 蔡欣怡", backend: null, country: ["英國"], degree: "碩士", intake: "2025 秋季", createdAt: "2025-01-05", schoolZh: "國立政治大學 企業管理學系", majorZh: "企業管理", targetMajor: "Management", gpa: "3.62", langTest: "IELTS", langScore: "7.0" },
  { id: "s03", fullName: "張家瑋", englishName: "Wayne Chang", statusCode: "school_selection", frontend: "顧問 吳孟潔", backend: "顧問 黃柏勳", country: ["美國", "加拿大"], degree: "碩士", intake: "2026 春季", createdAt: "2024-11-21", schoolZh: "國立成功大學 資訊工程學系", majorZh: "資訊工程", targetMajor: "Computer Science", gpa: "3.71", langTest: "TOEFL", langScore: "102" },
  { id: "s04", fullName: "黃詩涵", englishName: "Sophie Huang", statusCode: "consulting", frontend: "顧問 鄭詠晴", backend: null, country: ["澳洲"], degree: "學士", intake: "2026 秋季", createdAt: "2025-02-18", schoolZh: "臺北市立第一女子高級中學", majorZh: "社會組", targetMajor: "Business", gpa: "3.40", langTest: "IELTS", langScore: "6.5" },
  { id: "s05", fullName: "王志明", englishName: "Jimmy Wang", statusCode: "awaiting_decision", frontend: "顧問 周庭安", backend: "顧問 許芷瑜", country: ["美國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-08-30", schoolZh: "國立清華大學 動力機械工程學系", majorZh: "機械工程", targetMajor: "Mechanical Engineering", gpa: "3.78", langTest: "TOEFL", langScore: "104" },
  { id: "s06", fullName: "李宛庭", englishName: "Wendy Lee", statusCode: "closed_won", frontend: "顧問 賴俊賢", backend: null, country: ["英國"], degree: "碩士", intake: "2025 秋季", createdAt: "2025-01-22", schoolZh: "國立臺灣師範大學 英語學系", majorZh: "英語教學", targetMajor: "TESOL", gpa: "3.55", langTest: "IELTS", langScore: "7.5" },
  { id: "s07", fullName: "吳承恩", englishName: "Allen Wu", statusCode: "document_prep", frontend: "顧問 吳孟潔", backend: "顧問 高承翰", country: ["美國"], degree: "博士", intake: "2026 秋季", createdAt: "2024-10-09", schoolZh: "國立交通大學 電子工程學系", majorZh: "電子工程", targetMajor: "Electrical & Computer Engineering", gpa: "3.88", langTest: "TOEFL", langScore: "110" },
  { id: "s08", fullName: "劉冠廷", englishName: "Kevin Liu", statusCode: "new_lead", frontend: "顧問 林佩諭", backend: null, country: ["加拿大"], degree: "碩士", intake: "2026 秋季", createdAt: "2025-03-02", schoolZh: "國立中央大學 資訊管理學系", majorZh: "資訊管理", targetMajor: "Information Systems", gpa: "3.48", langTest: "TOEFL", langScore: "95" },
  { id: "s09", fullName: "周詠晴", englishName: "Yvonne Chou", statusCode: "enrolled", frontend: "顧問 蔡欣怡", backend: "顧問 簡均誠", country: ["英國"], degree: "碩士", intake: "2024 秋季", createdAt: "2023-12-14", schoolZh: "國立臺灣大學 經濟學系", majorZh: "經濟學", targetMajor: "Economics", gpa: "3.69", langTest: "IELTS", langScore: "7.5" },
  { id: "s10", fullName: "鄭宇翔", englishName: "Sean Cheng", statusCode: "submitting", frontend: "顧問 鄭詠晴", backend: "顧問 黃柏勳", country: ["美國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-09-28", schoolZh: "國立陽明交通大學 資訊工程學系", majorZh: "資訊工程", targetMajor: "Computer Science", gpa: "3.74", langTest: "TOEFL", langScore: "106" },
  { id: "s11", fullName: "許家華", englishName: "Howard Hsu", statusCode: "qualified", frontend: "顧問 周庭安", backend: null, country: ["美國", "英國"], degree: "碩士", intake: "2026 秋季", createdAt: "2025-02-25", schoolZh: "國立臺灣科技大學 電機工程系", majorZh: "電機工程", targetMajor: "Electrical Engineering", gpa: "3.52", langTest: "TOEFL", langScore: "98" },
  { id: "s12", fullName: "蔡依璇", englishName: "Ariel Tsai", statusCode: "decision_making", frontend: "顧問 賴俊賢", backend: "顧問 許芷瑜", country: ["澳洲"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-07-19", schoolZh: "國立中山大學 海洋科學系", majorZh: "海洋科學", targetMajor: "Environmental Science", gpa: "3.45", langTest: "IELTS", langScore: "6.5" },
  { id: "s13", fullName: "楊承翰", englishName: "Henry Yang", statusCode: "contacted", frontend: "顧問 林佩諭", backend: null, country: ["加拿大"], degree: "學士", intake: "2026 秋季", createdAt: "2025-03-08", schoolZh: "國立臺中第一高級中學", majorZh: "自然組", targetMajor: "Engineering", gpa: "3.58", langTest: "IELTS", langScore: "6.0" },
  { id: "s14", fullName: "謝佩珊", englishName: "Peggy Hsieh", statusCode: "closed_won", frontend: "顧問 吳孟潔", backend: null, country: ["美國"], degree: "碩士", intake: "2025 秋季", createdAt: "2025-01-30", schoolZh: "國立政治大學 傳播學院", majorZh: "傳播", targetMajor: "Media Studies", gpa: "3.66", langTest: "TOEFL", langScore: "101" },
  { id: "s15", fullName: "羅志豪", englishName: "Leo Lo", statusCode: "pre_departure", frontend: "顧問 蔡欣怡", backend: "顧問 簡均誠", country: ["英國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-06-11", schoolZh: "國立臺灣大學 財務金融學系", majorZh: "財務金融", targetMajor: "Finance", gpa: "3.81", langTest: "IELTS", langScore: "7.5" },
  { id: "s16", fullName: "高于婷", englishName: "Tina Kao", statusCode: "consulting", frontend: "顧問 鄭詠晴", backend: null, country: ["美國"], degree: "碩士", intake: "2026 秋季", createdAt: "2025-03-14", schoolZh: "國立成功大學 工業設計學系", majorZh: "工業設計", targetMajor: "Industrial Design", gpa: "3.60", langTest: "TOEFL", langScore: "97" },
  { id: "s17", fullName: "簡子涵", englishName: "Hannah Chien", statusCode: "school_selection", frontend: "顧問 周庭安", backend: "顧問 高承翰", country: ["美國"], degree: "碩士", intake: "2026 春季", createdAt: "2024-11-05", schoolZh: "國立臺灣大學 化學工程學系", majorZh: "化學工程", targetMajor: "Chemical Engineering", gpa: "3.77", langTest: "TOEFL", langScore: "105" },
  { id: "s18", fullName: "潘建宏", englishName: "Jason Pan", statusCode: "document_prep", frontend: "顧問 賴俊賢", backend: "顧問 黃柏勳", country: ["加拿大"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-10-26", schoolZh: "國立中興大學 生命科學系", majorZh: "生命科學", targetMajor: "Biotechnology", gpa: "3.53", langTest: "TOEFL", langScore: "96" },
  { id: "s19", fullName: "曾雅筑", englishName: "Joanne Tseng", statusCode: "awaiting_decision", frontend: "顧問 林佩諭", backend: "顧問 許芷瑜", country: ["澳洲"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-08-08", schoolZh: "國立高雄大學 應用經濟學系", majorZh: "應用經濟", targetMajor: "Data Analytics", gpa: "3.49", langTest: "IELTS", langScore: "6.5" },
  { id: "s20", fullName: "邱柏睿", englishName: "Ryan Chiu", statusCode: "qualified", frontend: "顧問 吳孟潔", backend: null, country: ["美國"], degree: "碩士", intake: "2026 秋季", createdAt: "2025-02-12", schoolZh: "國立清華大學 資訊工程學系", majorZh: "資訊工程", targetMajor: "Data Science", gpa: "3.83", langTest: "TOEFL", langScore: "107" },
  { id: "s21", fullName: "宋宜蓁", englishName: "Jenny Sung", statusCode: "decision_making", frontend: "顧問 蔡欣怡", backend: "顧問 簡均誠", country: ["英國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-07-30", schoolZh: "國立臺北大學 法律學系", majorZh: "法律", targetMajor: "International Law", gpa: "3.57", langTest: "IELTS", langScore: "7.0" },
  { id: "s22", fullName: "馮俊毅", englishName: "Marcus Feng", statusCode: "onboarding", frontend: "顧問 鄭詠晴", backend: "顧問 高承翰", country: ["美國"], degree: "碩士", intake: "2026 秋季", createdAt: "2025-01-18", schoolZh: "國立臺灣大學 機械工程學系", majorZh: "機械工程", targetMajor: "Robotics", gpa: "3.79", langTest: "TOEFL", langScore: "109" },
];

/** 目標欄位字串組合 */
export function formatTarget(s: StudentRow): string {
  return [s.country.join(" / "), s.degree, s.intake].filter(Boolean).join(" · ");
}

/** 待分配後端 = 已成交/申請中 且 backend 為 null */
export function isUnassignedBackend(s: StudentRow): boolean {
  const cat = STATUS_META[s.statusCode]?.category;
  return s.backend === null && (cat === "closed" || cat === "application");
}

/* ── 儀表板 KPI ───────────────────────────────────────────── */
export interface DashboardStat {
  label: string;
  value: string;
  hint: string;
  delta?: { value: string; positive?: boolean };
}

const RECRUITMENT_COUNT = STUDENTS.filter(
  (s) => STATUS_META[s.statusCode]?.category === "recruitment"
).length;
const APPLICATION_COUNT = STUDENTS.filter(
  (s) => STATUS_META[s.statusCode]?.category === "application"
).length;
const CLOSED_THIS_MONTH = STUDENTS.filter(
  (s) => s.statusCode === "closed_won"
).length;

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: "學生總數", value: String(STUDENTS.length), hint: "全公司在管", delta: { value: "+4", positive: true } },
  { label: "招生中", value: String(RECRUITMENT_COUNT), hint: "尚未成交", delta: { value: "+2", positive: true } },
  { label: "申請中", value: String(APPLICATION_COUNT), hint: "已啟動服務", delta: { value: "+3", positive: true } },
  { label: "本月成交", value: String(CLOSED_THIS_MONTH), hint: "2025 年 3 月", delta: { value: "+1", positive: true } },
];

/* ── 學生 360 詳情 ────────────────────────────────────────── */
export interface StudentDetail {
  id: string;
  fullName: string;
  englishName: string;
  statusCode: string;
  basic: { label: string; value: string }[];
  currentEdu: { label: string; value: string }[];
  target: { label: string; value: string }[];
  relations: { label: string; value: string }[];
  /** 字數餘額 */
  wordQuota: { balance: number; total: number; used: number };
  checklist: { label: string; done: boolean }[];
  timeline: { date: string; title: string; desc: string; color: PillColor }[];
  scores: { type: string; total: string; sub: string; date: string; color: PillColor }[];
  deals: { plan: string; amount: string; signedAt: string; splits: { name: string; role: string; share: string }[] };
  schoolList: { tier: "dream" | "match" | "safety"; school: string; program: string; country: string }[];
  applications: ApplicationCard[];
}

/* ── 詳情建構用的固定資料池(deterministic,無亂數)──────── */

/** 國家 → 選校表候選(衝刺/主攻/保底,依目標主修無關,純展示) */
const SCHOOL_POOL_BY_COUNTRY: Record<
  string,
  { dream: string[]; match: string[]; safety: string[] }
> = {
  美國: {
    dream: ["Stanford University", "MIT", "Carnegie Mellon University"],
    match: ["UIUC", "University of Michigan", "UT Austin", "Purdue University"],
    safety: ["Arizona State University", "Northeastern University"],
  },
  英國: {
    dream: ["Imperial College London", "University College London"],
    match: ["University of Edinburgh", "University of Manchester", "University of Bristol"],
    safety: ["University of Leeds", "University of Glasgow"],
  },
  加拿大: {
    dream: ["University of Toronto", "University of British Columbia"],
    match: ["McGill University", "University of Waterloo"],
    safety: ["University of Alberta", "Simon Fraser University"],
  },
  澳洲: {
    dream: ["University of Melbourne", "University of Sydney"],
    match: ["Monash University", "University of New South Wales"],
    safety: ["University of Queensland", "RMIT University"],
  },
};

/** 主修 → program 字尾(英文,展示用) */
function programFor(targetMajor: string, country: string): string {
  const uk = country === "英國";
  const au = country === "澳洲";
  const prefix = uk || au ? "MSc in" : "MS in";
  // 簡化主修縮寫
  const short = targetMajor
    .replace("Electrical & Computer Engineering", "ECE")
    .replace("Electrical Engineering", "EE")
    .replace("Mechanical Engineering", "ME")
    .replace("Computer Science", "CS")
    .replace("Chemical Engineering", "ChE");
  if (au) return `Master of ${short}`;
  return `${prefix} ${short}`;
}

/** 來源類型池 */
const SOURCE_TYPES = ["線上廣告", "校園講座", "同事轉介", "舊生介紹", "官網表單", "教育展"];
const CONSULT_NOTES = [
  "意願高,已預約二訪",
  "預算明確,鎖定排名前段",
  "家長同行,需補申請時程說明",
  "校友推薦,信任度高",
  "比較多家,需強化方案差異",
  "目標清楚,時間較趕",
];

/** 把 id "s07" → 7;非數字回退 0 */
function idIndex(id: string): number {
  const n = parseInt(id.replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

/** 申請狀態(展示用,依序對應 timeline 階段) */
const DETAIL_APP_STATUSES: ApplicationStatusCode[] = [
  "submitted", "pending_send", "admitted", "docs_required", "interview", "waitlisted",
];

/**
 * 依學生列表資料,deterministic 組出該學生「自己的」360 詳情。
 * 全部由 id index 與列表欄位推導,無亂數、無讀取系統時間,確保 SSR 一致且不張冠李戴。
 */
function buildDetail(s: StudentRow): StudentDetail {
  const idx = idIndex(s.id);
  const status = STATUS_META[s.statusCode];
  const cat = status?.category;
  const primaryCountry = s.country[0] ?? "美國";
  const pool = SCHOOL_POOL_BY_COUNTRY[primaryCountry] ?? SCHOOL_POOL_BY_COUNTRY["美國"];

  // 字數方案:旗艦 30000 / 標準 18000;已用依 id 變化但寫死推導
  const isFlagship = idx % 2 === 0;
  const total = isFlagship ? 30000 : 18000;
  const used = isFlagship ? 8000 + (idx % 6) * 1400 : 4200 + (idx % 6) * 1100;
  const balance = total - used;

  // checklist 完成度依狀態階段遞增
  const stage =
    cat === "recruitment" ? 0 : cat === "closed" ? 1 : cat === "application" ? 2 : 1;
  const checklist = [
    { label: "履歷 CV", done: stage >= 1 },
    { label: "自傳 SOP", done: stage >= 2 },
    { label: "推薦信 LOR ×3", done: stage >= 2 && idx % 3 !== 0 },
    { label: "成績單(英文版)", done: stage >= 1 },
    { label: "財力證明", done: stage >= 2 && idx % 2 === 0 },
    { label: `${s.langTest} 成績單`, done: stage >= 1 },
  ];

  // 文件清單(用 checklist 同源)
  const basic = [
    { label: "中文姓名", value: s.fullName },
    { label: "英文姓名", value: s.englishName },
    { label: "Email", value: `${s.englishName.toLowerCase().replace(/\s+/g, ".")}@example.com` },
    { label: "電話", value: `09xx-xxx-${String(idx).padStart(3, "0")}` },
    { label: "LINE ID", value: `demo_${s.englishName.toLowerCase().split(" ")[0]}` },
    { label: "建立時間", value: s.createdAt },
  ];

  const [schoolName, ...majorParts] = s.schoolZh.split(" ");
  const currentEdu = [
    { label: "學校", value: schoolName },
    { label: "科系", value: majorParts.join(" ") || s.majorZh },
    { label: "學歷", value: s.degree === "學士" ? "高中三年級" : "大四 / 應屆" },
    { label: "在校 GPA", value: `${s.gpa} / 4.0` },
  ];

  const target = [
    { label: "國家", value: s.country.join(" / ") },
    { label: "學位", value: s.degree },
    { label: "科系", value: s.targetMajor },
    { label: "入學期間", value: s.intake },
  ];

  const relations = [
    { label: "來源類型", value: SOURCE_TYPES[idx % SOURCE_TYPES.length] },
    { label: "諮詢備註", value: CONSULT_NOTES[idx % CONSULT_NOTES.length] },
    { label: "前端顧問", value: s.frontend ?? "—" },
    { label: "後端顧問", value: s.backend ?? "待分配" },
  ];

  // 時間軸:依狀態階段顯示已發生的事件(較新在上)
  const allEvents: { date: string; title: string; desc: string; color: PillColor; minStage: number }[] = [
    { date: dateAfter(s.createdAt, 0), title: "建立名單", desc: `經由${SOURCE_TYPES[idx % SOURCE_TYPES.length]}進線,由 ${s.frontend ?? "前端顧問"} 接洽`, color: "slate", minStage: 0 },
    { date: dateAfter(s.createdAt, 14), title: "完成需求諮詢", desc: `鎖定 ${primaryCountry} ${s.degree}・${s.targetMajor}`, color: "cyan", minStage: 0 },
    { date: dateAfter(s.createdAt, 40), title: "完成成交", desc: `簽署${isFlagship ? "旗艦全套" : "標準"}方案,啟動後端服務`, color: "emerald", minStage: 1 },
    { date: dateAfter(s.createdAt, 75), title: "選校表定稿", desc: `共 ${pool.dream.length + pool.match.length + pool.safety.length} 所(衝刺/主攻/保底)`, color: "violet", minStage: 2 },
    { date: dateAfter(s.createdAt, 120), title: "送出第一所申請", desc: `${pool.match[0]} 已於系統送件`, color: "blue", minStage: 2 },
  ];
  const timeline = allEvents
    .filter((e) => e.minStage <= stage)
    .reverse()
    .map(({ minStage, ...rest }) => { void minStage; return rest; });

  // 成績卡:語言 + GPA + (理工才有 GRE)
  const isQuant = /Engineering|Science|Computer|Data|Robotics|Finance|Economics/.test(
    s.targetMajor
  );
  const langSub =
    s.langTest === "TOEFL"
      ? `R${26 + (idx % 4)} L${25 + (idx % 4)} S${22 + (idx % 4)} W${24 + (idx % 3)}`
      : `Listening ${(6 + (idx % 3) * 0.5).toFixed(1)} · Reading ${(6.5 + (idx % 2) * 0.5).toFixed(1)}`;
  const scores: StudentDetail["scores"] = [
    { type: "GPA", total: `${s.gpa} / 4.0`, sub: `主修 ${(parseFloat(s.gpa) + 0.05).toFixed(2)}`, date: dateAfter(s.createdAt, -30), color: "emerald" },
    { type: s.langTest, total: s.langScore, sub: langSub, date: dateAfter(s.createdAt, -10), color: "blue" },
  ];
  if (isQuant && s.degree !== "學士") {
    const gre = 320 + (idx % 8);
    scores.push({
      type: "GRE",
      total: String(gre),
      sub: `V${152 + (idx % 8)} Q${166 + (idx % 4)} AWA${(3.5 + (idx % 2) * 0.5).toFixed(1)}`,
      date: dateAfter(s.createdAt, 20),
      color: "violet",
    });
  }

  // 成交:已成交/申請中才有金額;招生中顯示待成交
  const closed = cat === "closed" || cat === "application";
  const amount = isFlagship ? "NT$ 168,000" : "NT$ 98,000";
  const deals: StudentDetail["deals"] = {
    plan: closed
      ? `${primaryCountry}${s.degree} · ${isFlagship ? "旗艦全套方案" : "標準申請方案"}`
      : "尚未成交",
    amount: closed ? amount : "—",
    signedAt: closed ? dateAfter(s.createdAt, 40) : "—",
    splits: closed
      ? [
          { name: s.frontend ?? "前端顧問", role: "前端", share: s.backend ? "45%" : "60%" },
          ...(s.backend ? [{ name: s.backend, role: "後端", share: "45%" }] : []),
          { name: SOURCE_TYPES[idx % SOURCE_TYPES.length] === "同事轉介" ? "轉介同事" : s.frontend ?? "前端顧問", role: "轉介", share: "10%" },
        ].slice(0, s.backend ? 3 : 2)
      : [],
  };

  // 選校表:由國家池組合
  const schoolList: StudentDetail["schoolList"] = [
    ...pool.dream.map((school) => ({ tier: "dream" as const, school, program: programFor(s.targetMajor, primaryCountry), country: primaryCountry })),
    ...pool.match.map((school) => ({ tier: "match" as const, school, program: programFor(s.targetMajor, primaryCountry), country: primaryCountry })),
    ...pool.safety.map((school) => ({ tier: "safety" as const, school, program: programFor(s.targetMajor, primaryCountry), country: primaryCountry })),
  ];

  // 申請卡:取選校表前幾所,依狀態給不同申請狀態
  const appsSource = [...pool.match, ...pool.dream, ...pool.safety].slice(0, stage >= 2 ? 4 : stage === 1 ? 2 : 1);
  const applications: ApplicationCard[] = appsSource.map((school, i) => ({
    id: `${s.id}-app${i + 1}`,
    studentName: s.fullName,
    school,
    program: programFor(s.targetMajor, primaryCountry),
    country: primaryCountry,
    deadline: dateAfter(s.createdAt, 130 + i * 12),
    round: i % 2 === 0 ? "R1" : "R2",
    statusCode: DETAIL_APP_STATUSES[i % DETAIL_APP_STATUSES.length],
  }));

  return {
    id: s.id,
    fullName: s.fullName,
    englishName: s.englishName,
    statusCode: s.statusCode,
    basic,
    currentEdu,
    target,
    relations,
    wordQuota: { balance, total, used },
    checklist,
    timeline,
    scores,
    deals,
    schoolList,
    applications,
  };
}

/** 在 base 日期(YYYY-MM-DD)上加 days 天,回傳 YYYY-MM-DD。純字串運算,不讀系統時間。 */
function dateAfter(base: string, days: number): string {
  // 用 UTC 固定運算,避免時區造成的非決定性
  const [y, m, d] = base.split("-").map((n) => parseInt(n, 10));
  const t = Date.UTC(y, m - 1, d) + days * 86400000;
  const dt = new Date(t);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

/** 預先建好所有學生的詳情(module scope 常數,無亂數無時間依賴) */
export const STUDENT_DETAIL: Record<string, StudentDetail> = Object.fromEntries(
  STUDENTS.map((s) => [s.id, buildDetail(s)])
);

/** 取得學生詳情;找不到時用 s01 當保底(理論上不會發生) */
export function getStudentDetail(id: string): StudentDetail {
  return STUDENT_DETAIL[id] ?? STUDENT_DETAIL.s01;
}

/* ── 申請進度看板 ─────────────────────────────────────────── */
export type ApplicationStatusCode =
  | "pending_send"
  | "submitted"
  | "docs_required"
  | "interview"
  | "waitlisted"
  | "admitted"
  | "rejected"
  | "declined_by_us"
  | "enrolled";

export interface AppStatusMeta {
  code: ApplicationStatusCode;
  label: string;
  /** 欄位標題色票 */
  headClass: string;
  pill: PillColor;
}

export const APP_STATUS_ORDER: ApplicationStatusCode[] = [
  "pending_send", "submitted", "docs_required", "interview",
  "waitlisted", "admitted", "rejected", "declined_by_us", "enrolled",
];

export const APP_STATUS_META: Record<ApplicationStatusCode, AppStatusMeta> = {
  pending_send: { code: "pending_send", label: "待寄出", headClass: "bg-slate-100 text-slate-700", pill: "slate" },
  submitted: { code: "submitted", label: "已送出", headClass: "bg-blue-100 text-blue-700", pill: "blue" },
  docs_required: { code: "docs_required", label: "補件", headClass: "bg-amber-100 text-amber-700", pill: "amber" },
  interview: { code: "interview", label: "面試", headClass: "bg-violet-100 text-violet-700", pill: "violet" },
  waitlisted: { code: "waitlisted", label: "候補", headClass: "bg-orange-100 text-orange-700", pill: "orange" },
  admitted: { code: "admitted", label: "錄取", headClass: "bg-emerald-100 text-emerald-700", pill: "emerald" },
  rejected: { code: "rejected", label: "拒絕", headClass: "bg-rose-100 text-rose-700", pill: "rose" },
  declined_by_us: { code: "declined_by_us", label: "放棄", headClass: "bg-zinc-100 text-zinc-700", pill: "slate" },
  enrolled: { code: "enrolled", label: "確定入學", headClass: "bg-green-600 text-white", pill: "green" },
};

export interface ApplicationCard {
  id: string;
  studentName: string;
  school: string;
  program: string;
  country: string;
  /** 寫死字串;逾期判斷用固定「今天」常數比較,不讀系統時間 */
  deadline: string;
  round: string;
  statusCode: ApplicationStatusCode;
}

/** 看板逾期判斷基準日(寫死,避免 hydration 不一致) */
export const TODAY = "2025-06-17";

export const APPLICATIONS: ApplicationCard[] = [
  // pending_send ×3
  { id: "k01", studentName: "陳柏宇", school: "Purdue University", program: "MS in ECE", country: "美國", deadline: "2025-05-30", round: "R1", statusCode: "pending_send" },
  { id: "k02", studentName: "吳承恩", school: "Georgia Tech", program: "MS in ECE", country: "美國", deadline: "2025-12-15", round: "R1", statusCode: "pending_send" },
  { id: "k03", studentName: "邱柏睿", school: "University of Washington", program: "MS in Data Science", country: "美國", deadline: "2025-12-01", round: "R1", statusCode: "pending_send" },
  // submitted ×4
  { id: "k04", studentName: "陳柏宇", school: "UIUC", program: "MS in ECE", country: "美國", deadline: "2025-12-15", round: "R1", statusCode: "submitted" },
  { id: "k05", studentName: "鄭宇翔", school: "UT Austin", program: "MS in CS", country: "美國", deadline: "2025-12-01", round: "R1", statusCode: "submitted" },
  { id: "k06", studentName: "張家瑋", school: "University of British Columbia", program: "MEng in CS", country: "加拿大", deadline: "2025-06-20", round: "R2", statusCode: "submitted" },
  { id: "k07", studentName: "簡子涵", school: "University of Michigan", program: "MS in ChE", country: "美國", deadline: "2025-12-10", round: "R1", statusCode: "submitted" },
  // docs_required ×3
  { id: "k08", studentName: "張家瑋", school: "University of Toronto", program: "MEng in CS", country: "加拿大", deadline: "2025-06-01", round: "R2", statusCode: "docs_required" },
  { id: "k09", studentName: "吳承恩", school: "Carnegie Mellon University", program: "MS in ECE", country: "美國", deadline: "2025-12-10", round: "R1", statusCode: "docs_required" },
  { id: "k10", studentName: "潘建宏", school: "University of Waterloo", program: "MSc in Biotechnology", country: "加拿大", deadline: "2025-07-15", round: "R1", statusCode: "docs_required" },
  // interview ×2
  { id: "k11", studentName: "王志明", school: "University of Michigan", program: "MS in ME", country: "美國", deadline: "2025-01-15", round: "R1", statusCode: "interview" },
  { id: "k12", studentName: "鄭宇翔", school: "Cornell University", program: "MEng in CS", country: "美國", deadline: "2025-02-01", round: "R1", statusCode: "interview" },
  // waitlisted ×2
  { id: "k13", studentName: "蔡依璇", school: "University of Melbourne", program: "Master of Environmental Science", country: "澳洲", deadline: "2025-10-31", round: "R1", statusCode: "waitlisted" },
  { id: "k14", studentName: "曾雅筑", school: "University of Sydney", program: "Master of Data Analytics", country: "澳洲", deadline: "2025-09-30", round: "R1", statusCode: "waitlisted" },
  // admitted ×3
  { id: "k15", studentName: "陳柏宇", school: "Arizona State University", program: "MS in EE", country: "美國", deadline: "2025-02-01", round: "R2", statusCode: "admitted" },
  { id: "k16", studentName: "周詠晴", school: "Imperial College London", program: "MSc in Economics", country: "英國", deadline: "2024-11-30", round: "R1", statusCode: "admitted" },
  { id: "k17", studentName: "蔡依璇", school: "Monash University", program: "Master of Environmental Science", country: "澳洲", deadline: "2025-08-15", round: "R1", statusCode: "admitted" },
  // rejected ×2
  { id: "k18", studentName: "黃詩涵", school: "University of Sydney", program: "Bachelor of Business", country: "澳洲", deadline: "2025-09-30", round: "R1", statusCode: "rejected" },
  { id: "k19", studentName: "許家華", school: "Stanford University", program: "MS in EE", country: "美國", deadline: "2025-12-05", round: "R1", statusCode: "rejected" },
  // declined_by_us ×2
  { id: "k20", studentName: "王志明", school: "Northeastern University", program: "MS in ME", country: "美國", deadline: "2025-01-10", round: "R1", statusCode: "declined_by_us" },
  { id: "k21", studentName: "曾雅筑", school: "RMIT University", program: "Master of Data Analytics", country: "澳洲", deadline: "2025-07-20", round: "R1", statusCode: "declined_by_us" },
  // enrolled ×3
  { id: "k22", studentName: "羅志豪", school: "University of Manchester", program: "MSc in Finance", country: "英國", deadline: "2024-12-31", round: "R1", statusCode: "enrolled" },
  { id: "k23", studentName: "李宛庭", school: "University of Edinburgh", program: "MSc in TESOL", country: "英國", deadline: "2024-12-20", round: "R1", statusCode: "enrolled" },
  { id: "k24", studentName: "謝佩珊", school: "Northeastern University", program: "MS in Media Studies", country: "美國", deadline: "2024-12-15", round: "R1", statusCode: "enrolled" },
];

/** 逾期判斷:截止日 < TODAY 且尚在 active 狀態 */
export function isOverdue(app: ApplicationCard): boolean {
  const active: ApplicationStatusCode[] = ["pending_send", "submitted", "docs_required", "interview", "waitlisted"];
  return app.deadline < TODAY && active.includes(app.statusCode);
}

/* ── 常用院校檢索 ─────────────────────────────────────────── */
export type SchoolCountry = "US" | "UK" | "CA" | "AU";

export const COUNTRY_LABELS: Record<SchoolCountry, string> = {
  US: "美國",
  UK: "英國",
  CA: "加拿大",
  AU: "澳洲",
};

export interface SchoolRow {
  shortName: string;
  nameEn: string;
  nameZh: string;
  country: SchoolCountry;
  rankingQs: number;
  rankingUsNews: number | null;
  isPartner: boolean;
}

export const SCHOOLS: SchoolRow[] = [
  { shortName: "MIT", nameEn: "Massachusetts Institute of Technology", nameZh: "麻省理工學院", country: "US", rankingQs: 1, rankingUsNews: 2, isPartner: true },
  { shortName: "Stanford", nameEn: "Stanford University", nameZh: "史丹佛大學", country: "US", rankingQs: 6, rankingUsNews: 3, isPartner: true },
  { shortName: "CMU", nameEn: "Carnegie Mellon University", nameZh: "卡內基美隆大學", country: "US", rankingQs: 52, rankingUsNews: 24, isPartner: false },
  { shortName: "UIUC", nameEn: "University of Illinois Urbana-Champaign", nameZh: "伊利諾大學香檳分校", country: "US", rankingQs: 69, rankingUsNews: 35, isPartner: true },
  { shortName: "GT", nameEn: "Georgia Institute of Technology", nameZh: "喬治亞理工學院", country: "US", rankingQs: 84, rankingUsNews: 33, isPartner: false },
  { shortName: "UMich", nameEn: "University of Michigan", nameZh: "密西根大學安娜堡分校", country: "US", rankingQs: 33, rankingUsNews: 21, isPartner: true },
  { shortName: "UT Austin", nameEn: "University of Texas at Austin", nameZh: "德州大學奧斯汀分校", country: "US", rankingQs: 58, rankingUsNews: 30, isPartner: false },
  { shortName: "Purdue", nameEn: "Purdue University", nameZh: "普渡大學", country: "US", rankingQs: 99, rankingUsNews: 43, isPartner: true },
  { shortName: "UW", nameEn: "University of Washington", nameZh: "華盛頓大學", country: "US", rankingQs: 63, rankingUsNews: 40, isPartner: false },
  { shortName: "Cornell", nameEn: "Cornell University", nameZh: "康乃爾大學", country: "US", rankingQs: 16, rankingUsNews: 12, isPartner: false },
  { shortName: "ASU", nameEn: "Arizona State University", nameZh: "亞利桑那州立大學", country: "US", rankingQs: 179, rankingUsNews: 105, isPartner: true },
  { shortName: "Northeastern", nameEn: "Northeastern University", nameZh: "東北大學", country: "US", rankingQs: 189, rankingUsNews: 53, isPartner: true },
  { shortName: "Imperial", nameEn: "Imperial College London", nameZh: "帝國理工學院", country: "UK", rankingQs: 2, rankingUsNews: null, isPartner: true },
  { shortName: "UCL", nameEn: "University College London", nameZh: "倫敦大學學院", country: "UK", rankingQs: 9, rankingUsNews: null, isPartner: false },
  { shortName: "Edinburgh", nameEn: "University of Edinburgh", nameZh: "愛丁堡大學", country: "UK", rankingQs: 27, rankingUsNews: null, isPartner: true },
  { shortName: "Manchester", nameEn: "University of Manchester", nameZh: "曼徹斯特大學", country: "UK", rankingQs: 34, rankingUsNews: null, isPartner: false },
  { shortName: "Bristol", nameEn: "University of Bristol", nameZh: "布里斯托大學", country: "UK", rankingQs: 54, rankingUsNews: null, isPartner: true },
  { shortName: "Leeds", nameEn: "University of Leeds", nameZh: "里茲大學", country: "UK", rankingQs: 82, rankingUsNews: null, isPartner: true },
  { shortName: "Toronto", nameEn: "University of Toronto", nameZh: "多倫多大學", country: "CA", rankingQs: 25, rankingUsNews: 18, isPartner: true },
  { shortName: "UBC", nameEn: "University of British Columbia", nameZh: "英屬哥倫比亞大學", country: "CA", rankingQs: 38, rankingUsNews: 35, isPartner: true },
  { shortName: "McGill", nameEn: "McGill University", nameZh: "麥基爾大學", country: "CA", rankingQs: 29, rankingUsNews: null, isPartner: false },
  { shortName: "Waterloo", nameEn: "University of Waterloo", nameZh: "滑鐵盧大學", country: "CA", rankingQs: 112, rankingUsNews: null, isPartner: true },
  { shortName: "Melbourne", nameEn: "University of Melbourne", nameZh: "墨爾本大學", country: "AU", rankingQs: 13, rankingUsNews: null, isPartner: true },
  { shortName: "Sydney", nameEn: "University of Sydney", nameZh: "雪梨大學", country: "AU", rankingQs: 18, rankingUsNews: null, isPartner: false },
  { shortName: "Monash", nameEn: "Monash University", nameZh: "蒙納許大學", country: "AU", rankingQs: 37, rankingUsNews: null, isPartner: true },
  { shortName: "UNSW", nameEn: "University of New South Wales", nameZh: "新南威爾斯大學", country: "AU", rankingQs: 19, rankingUsNews: null, isPartner: true },
];
