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
}

export const STUDENTS: StudentRow[] = [
  { id: "s01", fullName: "測試學生 A", englishName: "Student A", statusCode: "submitting", frontend: "顧問 B", backend: "顧問 G", country: ["美國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-09-12" },
  { id: "s02", fullName: "測試學生 B", englishName: "Student B", statusCode: "closed_won", frontend: "顧問 C", backend: null, country: ["英國"], degree: "碩士", intake: "2025 秋季", createdAt: "2025-01-05" },
  { id: "s03", fullName: "測試學生 C", englishName: "Student C", statusCode: "school_selection", frontend: "顧問 A", backend: "顧問 H", country: ["美國", "加拿大"], degree: "碩士", intake: "2026 春季", createdAt: "2024-11-21" },
  { id: "s04", fullName: "測試學生 D", englishName: "Student D", statusCode: "consulting", frontend: "顧問 D", backend: null, country: ["澳洲"], degree: "學士", intake: "2026 秋季", createdAt: "2025-02-18" },
  { id: "s05", fullName: "測試學生 E", englishName: "Student E", statusCode: "awaiting_decision", frontend: "顧問 B", backend: "顧問 I", country: ["美國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-08-30" },
  { id: "s06", fullName: "測試學生 F", englishName: "Student F", statusCode: "closed_won", frontend: "顧問 E", backend: null, country: ["英國"], degree: "碩士", intake: "2025 秋季", createdAt: "2025-01-22" },
  { id: "s07", fullName: "測試學生 G", englishName: "Student G", statusCode: "document_prep", frontend: "顧問 A", backend: "顧問 G", country: ["美國"], degree: "博士", intake: "2026 秋季", createdAt: "2024-10-09" },
  { id: "s08", fullName: "測試學生 H", englishName: "Student H", statusCode: "new_lead", frontend: "顧問 F", backend: null, country: ["加拿大"], degree: "碩士", intake: "2026 秋季", createdAt: "2025-03-02" },
  { id: "s09", fullName: "測試學生 I", englishName: "Student I", statusCode: "enrolled", frontend: "顧問 C", backend: "顧問 J", country: ["英國"], degree: "碩士", intake: "2024 秋季", createdAt: "2023-12-14" },
  { id: "s10", fullName: "測試學生 J", englishName: "Student J", statusCode: "submitting", frontend: "顧問 D", backend: "顧問 H", country: ["美國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-09-28" },
  { id: "s11", fullName: "測試學生 K", englishName: "Student K", statusCode: "qualified", frontend: "顧問 B", backend: null, country: ["美國", "英國"], degree: "碩士", intake: "2026 秋季", createdAt: "2025-02-25" },
  { id: "s12", fullName: "測試學生 L", englishName: "Student L", statusCode: "decision_making", frontend: "顧問 E", backend: "顧問 I", country: ["澳洲"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-07-19" },
  { id: "s13", fullName: "測試學生 M", englishName: "Student M", statusCode: "contacted", frontend: "顧問 F", backend: null, country: ["加拿大"], degree: "學士", intake: "2026 秋季", createdAt: "2025-03-08" },
  { id: "s14", fullName: "測試學生 N", englishName: "Student N", statusCode: "closed_won", frontend: "顧問 A", backend: null, country: ["美國"], degree: "碩士", intake: "2025 秋季", createdAt: "2025-01-30" },
  { id: "s15", fullName: "測試學生 O", englishName: "Student O", statusCode: "pre_departure", frontend: "顧問 C", backend: "顧問 J", country: ["英國"], degree: "碩士", intake: "2025 秋季", createdAt: "2024-06-11" },
  { id: "s16", fullName: "測試學生 P", englishName: "Student P", statusCode: "consulting", frontend: "顧問 D", backend: null, country: ["美國"], degree: "碩士", intake: "2026 秋季", createdAt: "2025-03-14" },
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

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: "學生總數", value: "16", hint: "全公司在管", delta: { value: "+3", positive: true } },
  { label: "招生中", value: "5", hint: "尚未成交", delta: { value: "+2", positive: true } },
  { label: "申請中", value: "8", hint: "已啟動服務", delta: { value: "+1", positive: true } },
  { label: "本月成交", value: "4", hint: "2025 年 3 月", delta: { value: "+1", positive: true } },
];

/* ── 學生 360 詳情(以測試學生 A 為主檔)──────────────────── */
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

export const STUDENT_DETAIL: Record<string, StudentDetail> = {
  s01: {
    id: "s01",
    fullName: "測試學生 A",
    englishName: "Student A",
    statusCode: "submitting",
    basic: [
      { label: "中文姓名", value: "測試學生 A" },
      { label: "英文姓名", value: "Student A" },
      { label: "Email", value: "student-a@example.com" },
      { label: "電話", value: "09xx-xxx-x01" },
      { label: "LINE ID", value: "demo_line_a" },
      { label: "生日", value: "2000-04-18" },
    ],
    currentEdu: [
      { label: "學校", value: "國立臺灣大學" },
      { label: "科系", value: "電機工程學系" },
      { label: "學歷", value: "大四" },
      { label: "畢業年份", value: "2025" },
    ],
    target: [
      { label: "國家", value: "美國" },
      { label: "學位", value: "碩士" },
      { label: "科系", value: "Electrical Engineering" },
      { label: "入學期間", value: "2025 秋季" },
    ],
    relations: [
      { label: "來源類型", value: "同事轉介" },
      { label: "來源同事", value: "顧問 E" },
      { label: "來源備註", value: "校友推薦,意願高" },
      { label: "前端顧問", value: "顧問 B" },
      { label: "後端顧問", value: "顧問 G" },
    ],
    wordQuota: { balance: 18400, total: 30000, used: 11600 },
    checklist: [
      { label: "履歷 CV", done: true },
      { label: "自傳 SOP", done: true },
      { label: "推薦信 LOR ×3", done: false },
      { label: "成績單(英文版)", done: true },
      { label: "財力證明", done: false },
      { label: "TOEFL 成績單", done: true },
    ],
    timeline: [
      { date: "2025-03-14", title: "送出第一所申請", desc: "UIUC EE 碩士已於系統送件", color: "blue" },
      { date: "2025-02-20", title: "選校表定稿", desc: "共 8 所(2 衝刺 / 4 主攻 / 2 保底)", color: "violet" },
      { date: "2025-01-15", title: "啟動後端服務", desc: "後端顧問 G 接手文件作業", color: "teal" },
      { date: "2024-12-28", title: "完成成交", desc: "簽署旗艦全套方案", color: "emerald" },
      { date: "2024-09-12", title: "建立名單", desc: "由顧問 E 轉介進線", color: "slate" },
    ],
    scores: [
      { type: "GPA", total: "3.85 / 4.0", sub: "主修 3.92", date: "2024-12-01", color: "emerald" },
      { type: "TOEFL", total: "108", sub: "R29 L28 S25 W26", date: "2024-11-10", color: "blue" },
      { type: "GRE", total: "327", sub: "V158 Q169 AWA4.0", date: "2024-10-22", color: "violet" },
    ],
    deals: {
      plan: "美國碩士 · 旗艦全套方案",
      amount: "NT$ 168,000",
      signedAt: "2024-12-28",
      splits: [
        { name: "顧問 B", role: "前端", share: "40%" },
        { name: "顧問 G", role: "後端", share: "45%" },
        { name: "顧問 E", role: "轉介", share: "15%" },
      ],
    },
    schoolList: [
      { tier: "dream", school: "Stanford University", program: "MS in EE", country: "美國" },
      { tier: "dream", school: "MIT", program: "MEng in EECS", country: "美國" },
      { tier: "match", school: "UIUC", program: "MS in ECE", country: "美國" },
      { tier: "match", school: "University of Michigan", program: "MS in ECE", country: "美國" },
      { tier: "match", school: "Purdue University", program: "MS in ECE", country: "美國" },
      { tier: "match", school: "UT Austin", program: "MS in ECE", country: "美國" },
      { tier: "safety", school: "Arizona State University", program: "MS in EE", country: "美國" },
      { tier: "safety", school: "Northeastern University", program: "MS in EE", country: "美國" },
    ],
    applications: [
      { id: "a01", studentName: "測試學生 A", school: "UIUC", program: "MS in ECE", country: "美國", deadline: "2025-12-15", round: "R1", statusCode: "submitted" },
      { id: "a02", studentName: "測試學生 A", school: "Purdue University", program: "MS in ECE", country: "美國", deadline: "2025-01-15", round: "R1", statusCode: "pending_send" },
      { id: "a03", studentName: "測試學生 A", school: "Arizona State University", program: "MS in EE", country: "美國", deadline: "2025-02-01", round: "R2", statusCode: "admitted" },
    ],
  },
};

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
  { id: "k01", studentName: "測試學生 A", school: "UIUC", program: "MS in ECE", country: "美國", deadline: "2025-12-15", round: "R1", statusCode: "submitted" },
  { id: "k02", studentName: "測試學生 A", school: "Purdue University", program: "MS in ECE", country: "美國", deadline: "2025-05-30", round: "R1", statusCode: "pending_send" },
  { id: "k03", studentName: "測試學生 C", school: "University of Toronto", program: "MEng in ECE", country: "加拿大", deadline: "2025-06-01", round: "R2", statusCode: "docs_required" },
  { id: "k04", studentName: "測試學生 E", school: "University of Michigan", program: "MS in ECE", country: "美國", deadline: "2025-01-15", round: "R1", statusCode: "interview" },
  { id: "k05", studentName: "測試學生 J", school: "UT Austin", program: "MS in ECE", country: "美國", deadline: "2025-12-01", round: "R1", statusCode: "submitted" },
  { id: "k06", studentName: "測試學生 G", school: "Carnegie Mellon University", program: "MS in ECE", country: "美國", deadline: "2025-12-10", round: "R1", statusCode: "docs_required" },
  { id: "k07", studentName: "測試學生 L", school: "University of Melbourne", program: "Master of EE", country: "澳洲", deadline: "2025-10-31", round: "R1", statusCode: "waitlisted" },
  { id: "k08", studentName: "測試學生 A", school: "Arizona State University", program: "MS in EE", country: "美國", deadline: "2025-02-01", round: "R2", statusCode: "admitted" },
  { id: "k09", studentName: "測試學生 I", school: "Imperial College London", program: "MSc in EEE", country: "英國", deadline: "2024-11-30", round: "R1", statusCode: "admitted" },
  { id: "k10", studentName: "測試學生 D", school: "University of Sydney", program: "Master of EE", country: "澳洲", deadline: "2025-09-30", round: "R1", statusCode: "rejected" },
  { id: "k11", studentName: "測試學生 O", school: "University of Manchester", program: "MSc in ECE", country: "英國", deadline: "2024-12-31", round: "R1", statusCode: "enrolled" },
  { id: "k12", studentName: "測試學生 E", school: "Northeastern University", program: "MS in EE", country: "美國", deadline: "2025-01-10", round: "R1", statusCode: "declined_by_us" },
  { id: "k13", studentName: "測試學生 C", school: "University of British Columbia", program: "MEng in ECE", country: "加拿大", deadline: "2025-06-20", round: "R2", statusCode: "submitted" },
  { id: "k14", studentName: "測試學生 G", school: "Georgia Tech", program: "MS in ECE", country: "美國", deadline: "2025-12-15", round: "R1", statusCode: "pending_send" },
  { id: "k15", studentName: "測試學生 J", school: "Cornell University", program: "MEng in ECE", country: "美國", deadline: "2025-02-01", round: "R1", statusCode: "interview" },
  { id: "k16", studentName: "測試學生 L", school: "Monash University", program: "Master of EE", country: "澳洲", deadline: "2025-08-15", round: "R1", statusCode: "admitted" },
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
  { shortName: "ASU", nameEn: "Arizona State University", nameZh: "亞利桑那州立大學", country: "US", rankingQs: 179, rankingUsNews: 105, isPartner: true },
  { shortName: "Imperial", nameEn: "Imperial College London", nameZh: "帝國理工學院", country: "UK", rankingQs: 2, rankingUsNews: null, isPartner: true },
  { shortName: "UCL", nameEn: "University College London", nameZh: "倫敦大學學院", country: "UK", rankingQs: 9, rankingUsNews: null, isPartner: false },
  { shortName: "Edinburgh", nameEn: "University of Edinburgh", nameZh: "愛丁堡大學", country: "UK", rankingQs: 27, rankingUsNews: null, isPartner: true },
  { shortName: "Manchester", nameEn: "University of Manchester", nameZh: "曼徹斯特大學", country: "UK", rankingQs: 34, rankingUsNews: null, isPartner: false },
  { shortName: "Toronto", nameEn: "University of Toronto", nameZh: "多倫多大學", country: "CA", rankingQs: 25, rankingUsNews: 18, isPartner: true },
  { shortName: "UBC", nameEn: "University of British Columbia", nameZh: "英屬哥倫比亞大學", country: "CA", rankingQs: 38, rankingUsNews: 35, isPartner: true },
  { shortName: "McGill", nameEn: "McGill University", nameZh: "麥基爾大學", country: "CA", rankingQs: 29, rankingUsNews: null, isPartner: false },
  { shortName: "Melbourne", nameEn: "University of Melbourne", nameZh: "墨爾本大學", country: "AU", rankingQs: 13, rankingUsNews: null, isPartner: true },
  { shortName: "Sydney", nameEn: "University of Sydney", nameZh: "雪梨大學", country: "AU", rankingQs: 18, rankingUsNews: null, isPartner: false },
  { shortName: "Monash", nameEn: "Monash University", nameZh: "蒙納許大學", country: "AU", rankingQs: 37, rankingUsNews: null, isPartner: true },
];
