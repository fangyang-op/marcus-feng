/**
 * ── Nexus 顧問資訊整合中心 — Demo 假資料 ─────────────────────────────
 *
 * 重建自內部產品「Nexus（顧問一站式中控台）」的 UI 骨架。
 * 全部為示意假資料（寫死成固定常數，無亂數、無 Date.now），
 * 已移除任何真實客戶 / 員工 / 公司字樣。學校名為公開大學校名，
 * 但排名 / 學費 / 要求等數字皆為合理假值。
 */

import type { PillColor } from "@/components/demo/primitives";

// ============================================================================
// 1) 總覽 Dashboard
// ============================================================================

export interface NexusActivity {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
}

/** 即將到來的活動（漸層大卡 + 次要卡） */
export const UPCOMING_ACTIVITIES: NexusActivity[] = [
  {
    id: "act-1",
    name: "美國名校線上招生說明會 — CS / Data Science 學程",
    date: "2025-07-08",
    time: "19:00 - 20:30",
    location: "線上 Webinar",
  },
  {
    id: "act-2",
    name: "英國一年制碩士秋季申請工作坊",
    date: "2025-07-15",
    time: "14:00 - 15:30",
    location: "北一區辦公室",
  },
  {
    id: "act-3",
    name: "加拿大學簽 SDS 新制說明 （顧問內訓）",
    date: "2025-07-22",
    time: "10:30 - 11:30",
    location: "線上 Webinar",
  },
];

export interface DashboardStat {
  key: string;
  label: string;
  value: number;
  unit: string;
  hint: string;
}

export const DASHBOARD_STATS: DashboardStat[] = [
  { key: "announcements", label: "最新公告", value: 18, unit: "則", hint: "檢視所有公告" },
  { key: "issues", label: "待處理問題", value: 4, unit: "項", hint: "前往處理" },
  { key: "schools", label: "常用院校數", value: 312, unit: "所", hint: "檢視院校庫" },
  { key: "wiki", label: "知識庫文章", value: 86, unit: "篇", hint: "檢視 SOP 指南" },
];

export interface FeedItem {
  id: string;
  type: "WIKI" | "ANNOUNCEMENT";
  title: string;
  preview: string;
  date: string;
  isVerified?: boolean;
}

/** 最新公告與動態（已依日期降冪寫死） */
export const RECENT_FEED: FeedItem[] = [
  {
    id: "feed-1",
    type: "ANNOUNCEMENT",
    title: "2026 Fall 美國研究所申請時程總表已更新",
    preview: "各校 Deadline、文件清單與 GRE/TOEFL 門檻已彙整為單一表格，請顧問下載最新版。",
    date: "2025-06-14",
    isVerified: true,
  },
  {
    id: "feed-2",
    type: "WIKI",
    title: "如何撰寫具差異化的 SOP / Personal Statement",
    preview: "從動機鋪陳到研究經驗收斂，附 3 段範例與常見地雷句型，協助學生跳脫罐頭模板。",
    date: "2025-06-12",
    isVerified: true,
  },
  {
    id: "feed-3",
    type: "ANNOUNCEMENT",
    title: "英國 Graduate Route 簽證效期維持兩年 （官方公告）",
    preview: "近期傳聞調整為 18 個月並未通過；現行畢業生工作簽維持原 24 個月，碩博另計。",
    date: "2025-06-10",
    isVerified: true,
  },
  {
    id: "feed-4",
    type: "WIKI",
    title: "TOEFL vs IELTS 選擇指南 （依目標國家）",
    preview: "美國多數理工科系兩者皆收；部分英國與澳洲學程偏好 IELTS，附各校接受度速查。",
    date: "2025-06-08",
  },
  {
    id: "feed-5",
    type: "ANNOUNCEMENT",
    title: "加拿大 SDS 學簽制度更新提醒",
    preview: "GIC 金額與語言成績要求調整，遞件前請以官網最新版本為準並重新確認財力證明。",
    date: "2025-06-05",
    isVerified: true,
  },
];

// ============================================================================
// 2) 常用院校資料庫
// ============================================================================

export interface NexusSchool {
  id: string;
  name: string;
  chineseName: string;
  country: string;
  location: string;
  type: "研究所" | "大學" | "語言學校";
  qsRanking: number | null;
  usNewsRanking: number | null;
  theRanking: number | null;
  tuitionRange: string; // 每年學費區間（假值）
  /** 每年學費中位數（統一換算為美元等值，僅供排序用，寫死假值） */
  tuitionSortUsd: number;
  requirements: { gpa: string; toefl: string; ielts: string };
  /** 成功錄取數（歷屆累計，排序用假值） */
  successfulAdmits: number;
  programs: string[];
  tags: string[];
  isPartner: boolean;
  isVerified: boolean;
  description: string;
}

export const SCHOOLS: NexusSchool[] = [
  {
    id: "sch-ucla",
    name: "University of California, Los Angeles",
    chineseName: "加州大學洛杉磯分校",
    country: "美國",
    location: "Los Angeles, CA",
    type: "研究所",
    qsRanking: 42,
    usNewsRanking: 15,
    theRanking: 18,
    tuitionRange: "US$ 33,000 – 41,000 / 年",
    tuitionSortUsd: 37000,
    requirements: { gpa: "3.5", toefl: "100", ielts: "7.0" },
    successfulAdmits: 24,
    programs: ["Computer Science", "Data Science", "Electrical Engineering"],
    tags: ["理工強校", "公立名校", "申請競爭高"],
    isPartner: true,
    isVerified: true,
    description: "加州大學系統旗艦校之一，理工與商科皆具國際聲望，國際生比例高。",
  },
  {
    id: "sch-cmu",
    name: "Carnegie Mellon University",
    chineseName: "卡內基美隆大學",
    country: "美國",
    location: "Pittsburgh, PA",
    type: "研究所",
    qsRanking: 52,
    usNewsRanking: 21,
    theRanking: 24,
    tuitionRange: "US$ 47,000 – 58,000 / 年",
    tuitionSortUsd: 52500,
    requirements: { gpa: "3.6", toefl: "102", ielts: "7.5" },
    successfulAdmits: 9,
    programs: ["Computer Science", "Machine Learning", "Robotics"],
    tags: ["CS 頂尖", "申請競爭高"],
    isPartner: false,
    isVerified: true,
    description: "電腦科學與人工智慧領域全球頂尖，研究資源豐沛，業界連結強。",
  },
  {
    id: "sch-mit",
    name: "Massachusetts Institute of Technology",
    chineseName: "麻省理工學院",
    country: "美國",
    location: "Cambridge, MA",
    type: "研究所",
    qsRanking: 1,
    usNewsRanking: 2,
    theRanking: 3,
    tuitionRange: "US$ 56,000 – 62,000 / 年",
    tuitionSortUsd: 59000,
    requirements: { gpa: "3.8", toefl: "108", ielts: "7.5" },
    successfulAdmits: 3,
    programs: ["EECS", "Operations Research", "AI & Decision Making"],
    tags: ["世界頂尖", "理工強校", "申請競爭高"],
    isPartner: false,
    isVerified: true,
    description: "全球理工指標學府，研究能量與創業生態極強，申請難度最高一檔。",
  },
  {
    id: "sch-gatech",
    name: "Georgia Institute of Technology",
    chineseName: "喬治亞理工學院",
    country: "美國",
    location: "Atlanta, GA",
    type: "研究所",
    qsRanking: 88,
    usNewsRanking: 33,
    theRanking: 38,
    tuitionRange: "US$ 28,000 – 35,000 / 年",
    tuitionSortUsd: 31500,
    requirements: { gpa: "3.4", toefl: "100", ielts: "7.0" },
    successfulAdmits: 31,
    programs: ["Computer Science", "Analytics", "Electrical Engineering"],
    tags: ["理工強校", "CP 值高", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "公立理工名校，CS 與分析學程實務導向，線上碩士也具國際聲譽。",
  },
  {
    id: "sch-uiuc",
    name: "University of Illinois Urbana-Champaign",
    chineseName: "伊利諾大學香檳分校",
    country: "美國",
    location: "Urbana, IL",
    type: "研究所",
    qsRanking: 64,
    usNewsRanking: 35,
    theRanking: 40,
    tuitionRange: "US$ 32,000 – 39,000 / 年",
    tuitionSortUsd: 35500,
    requirements: { gpa: "3.4", toefl: "100", ielts: "6.5" },
    successfulAdmits: 18,
    programs: ["Computer Science", "Information Management", "Statistics"],
    tags: ["理工強校", "公立名校"],
    isPartner: false,
    isVerified: true,
    description: "工程與資訊領域長年名列前段，研究型學程選擇多，校友網絡綿密。",
  },
  {
    id: "sch-imperial",
    name: "Imperial College London",
    chineseName: "倫敦帝國學院",
    country: "英國",
    location: "London",
    type: "研究所",
    qsRanking: 6,
    usNewsRanking: 11,
    theRanking: 9,
    tuitionRange: "£ 38,000 – 43,000 / 年",
    tuitionSortUsd: 51000,
    requirements: { gpa: "3.5", toefl: "100", ielts: "7.0" },
    successfulAdmits: 16,
    programs: ["Computing", "Data Science", "Mechanical Engineering"],
    tags: ["理工強校", "一年制碩士", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "英國理工與醫學重鎮，一年制碩士學程密集，畢業即可申請 Graduate Route。",
  },
  {
    id: "sch-ucl",
    name: "University College London",
    chineseName: "倫敦大學學院",
    country: "英國",
    location: "London",
    type: "研究所",
    qsRanking: 9,
    usNewsRanking: 12,
    theRanking: 22,
    tuitionRange: "£ 31,000 – 38,000 / 年",
    tuitionSortUsd: 43000,
    requirements: { gpa: "3.3", toefl: "96", ielts: "6.5" },
    successfulAdmits: 27,
    programs: ["Computer Science", "Business Analytics", "Urban Design"],
    tags: ["綜合名校", "一年制碩士", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "倫敦市區綜合型名校，科系選擇多元，商管與工程學程國際生熱門。",
  },
  {
    id: "sch-edinburgh",
    name: "University of Edinburgh",
    chineseName: "愛丁堡大學",
    country: "英國",
    location: "Edinburgh",
    type: "研究所",
    qsRanking: 27,
    usNewsRanking: 32,
    theRanking: 29,
    tuitionRange: "£ 28,000 – 35,000 / 年",
    tuitionSortUsd: 39500,
    requirements: { gpa: "3.2", toefl: "92", ielts: "6.5" },
    successfulAdmits: 22,
    programs: ["Informatics", "Data Science", "AI"],
    tags: ["綜合名校", "一年制碩士", "合作院校"],
    isPartner: true,
    isVerified: false,
    description: "蘇格蘭歷史名校，資訊學院規模大，一年制碩士為國際生熱門選項。",
  },
  {
    id: "sch-manchester",
    name: "University of Manchester",
    chineseName: "曼徹斯特大學",
    country: "英國",
    location: "Manchester",
    type: "研究所",
    qsRanking: 34,
    usNewsRanking: 51,
    theRanking: 56,
    tuitionRange: "£ 26,000 – 32,000 / 年",
    tuitionSortUsd: 36000,
    requirements: { gpa: "3.0", toefl: "90", ielts: "6.5" },
    successfulAdmits: 29,
    programs: ["Computer Science", "Data Science", "Management"],
    tags: ["綜合名校", "一年制碩士", "CP 值高"],
    isPartner: false,
    isVerified: true,
    description: "羅素集團綜合大學，學費相對親民，商管與工程學程招生規模大。",
  },
  {
    id: "sch-toronto",
    name: "University of Toronto",
    chineseName: "多倫多大學",
    country: "加拿大",
    location: "Toronto, ON",
    type: "研究所",
    qsRanking: 21,
    usNewsRanking: 18,
    theRanking: 21,
    tuitionRange: "C$ 45,000 – 58,000 / 年",
    tuitionSortUsd: 38000,
    requirements: { gpa: "3.4", toefl: "100", ielts: "7.0" },
    successfulAdmits: 25,
    programs: ["Computer Science", "Applied Computing", "Statistics"],
    tags: ["移民友善", "公立名校"],
    isPartner: false,
    isVerified: true,
    description: "加拿大研究型旗艦大學，CS 與資料科學學程強，畢業後工作簽路徑清晰。",
  },
  {
    id: "sch-ubc",
    name: "University of British Columbia",
    chineseName: "英屬哥倫比亞大學",
    country: "加拿大",
    location: "Vancouver, BC",
    type: "研究所",
    qsRanking: 38,
    usNewsRanking: 35,
    theRanking: 41,
    tuitionRange: "C$ 38,000 – 50,000 / 年",
    tuitionSortUsd: 32000,
    requirements: { gpa: "3.3", toefl: "97", ielts: "6.5" },
    successfulAdmits: 21,
    programs: ["Computer Science", "Data Science", "Forestry"],
    tags: ["移民友善", "風景宜人"],
    isPartner: true,
    isVerified: false,
    description: "溫哥華濱海校區，國際生友善，資料科學與環境相關學程具特色。",
  },
  {
    id: "sch-mcgill",
    name: "McGill University",
    chineseName: "麥基爾大學",
    country: "加拿大",
    location: "Montreal, QC",
    type: "研究所",
    qsRanking: 29,
    usNewsRanking: 41,
    theRanking: 49,
    tuitionRange: "C$ 30,000 – 42,000 / 年",
    tuitionSortUsd: 27000,
    requirements: { gpa: "3.2", toefl: "94", ielts: "6.5" },
    successfulAdmits: 19,
    programs: ["Computer Science", "Statistics", "Bioinformatics"],
    tags: ["移民友善", "CP 值高", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "蒙特婁英語名校，學費相對親民，理工與生醫資訊學程國際生比例高。",
  },
  {
    id: "sch-melbourne",
    name: "University of Melbourne",
    chineseName: "墨爾本大學",
    country: "澳洲",
    location: "Melbourne, VIC",
    type: "研究所",
    qsRanking: 13,
    usNewsRanking: 27,
    theRanking: 39,
    tuitionRange: "A$ 45,000 – 52,000 / 年",
    tuitionSortUsd: 31000,
    requirements: { gpa: "3.2", toefl: "94", ielts: "6.5" },
    successfulAdmits: 26,
    programs: ["Information Technology", "Data Science", "Engineering"],
    tags: ["澳洲八大", "移民友善"],
    isPartner: false,
    isVerified: true,
    description: "澳洲八大之一，IT 與資料科學碩士兩年制，畢業後工作簽路徑明確。",
  },
  {
    id: "sch-sydney",
    name: "University of Sydney",
    chineseName: "雪梨大學",
    country: "澳洲",
    location: "Sydney, NSW",
    type: "研究所",
    qsRanking: 18,
    usNewsRanking: 28,
    theRanking: 60,
    tuitionRange: "A$ 46,000 – 54,000 / 年",
    tuitionSortUsd: 32500,
    requirements: { gpa: "3.2", toefl: "96", ielts: "6.5" },
    successfulAdmits: 23,
    programs: ["Information Technology", "Data Science", "Project Management"],
    tags: ["澳洲八大", "移民友善", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "澳洲八大老牌名校，IT 與資料科學碩士招生規模大，城市生活機能佳。",
  },
  {
    id: "sch-tum",
    name: "Technical University of Munich",
    chineseName: "慕尼黑工業大學",
    country: "德國",
    location: "Munich",
    type: "研究所",
    qsRanking: 28,
    usNewsRanking: 47,
    theRanking: 30,
    tuitionRange: "€ 0 – 6,000 / 年 （公立）",
    tuitionSortUsd: 3000,
    requirements: { gpa: "3.0", toefl: "88", ielts: "6.5" },
    successfulAdmits: 14,
    programs: ["Informatics", "Data Engineering", "Mechanical Engineering"],
    tags: ["低學費", "理工強校", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "德國理工頂尖，公立大學學費極低，英授碩士學程逐年增加。",
  },
  {
    id: "sch-rwth",
    name: "RWTH Aachen University",
    chineseName: "亞琛工業大學",
    country: "德國",
    location: "Aachen",
    type: "研究所",
    qsRanking: 99,
    usNewsRanking: 96,
    theRanking: 90,
    tuitionRange: "€ 0 – 5,000 / 年 （公立）",
    tuitionSortUsd: 2500,
    requirements: { gpa: "2.9", toefl: "88", ielts: "6.0" },
    successfulAdmits: 11,
    programs: ["Computer Science", "Data Science", "Automotive Engineering"],
    tags: ["低學費", "理工強校"],
    isPartner: false,
    isVerified: false,
    description: "德國理工聯盟成員，工程與資訊學程扎實，與產業合作緊密、學費極低。",
  },
  {
    id: "sch-nus",
    name: "National University of Singapore",
    chineseName: "新加坡國立大學",
    country: "新加坡",
    location: "Singapore",
    type: "研究所",
    qsRanking: 8,
    usNewsRanking: 26,
    theRanking: 19,
    tuitionRange: "S$ 38,000 – 48,000 / 年",
    tuitionSortUsd: 32000,
    requirements: { gpa: "3.5", toefl: "100", ielts: "6.5" },
    successfulAdmits: 13,
    programs: ["Computing", "Business Analytics", "Statistics"],
    tags: ["亞洲頂尖", "申請競爭高"],
    isPartner: false,
    isVerified: true,
    description: "亞洲排名長期領先，地理與文化距離近，理工與商管皆強。",
  },
  {
    id: "sch-ep-vancouver",
    name: "EP Language School — Vancouver",
    chineseName: "EP 語言學校 溫哥華校",
    country: "加拿大",
    location: "Vancouver, BC",
    type: "語言學校",
    qsRanking: null,
    usNewsRanking: null,
    theRanking: null,
    tuitionRange: "C$ 1,400 – 1,800 / 月",
    tuitionSortUsd: 14000,
    requirements: { gpa: "—", toefl: "—", ielts: "—" },
    successfulAdmits: 48,
    programs: ["General English", "IELTS 衝刺班", "升學銜接"],
    tags: ["遊學", "升學銜接", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "市中心語言學校，提供升學銜接與考試衝刺課程，可搭配寄宿家庭。",
  },
  {
    id: "sch-ep-london",
    name: "EP Language School — London",
    chineseName: "EP 語言學校 倫敦校",
    country: "英國",
    location: "London",
    type: "語言學校",
    qsRanking: null,
    usNewsRanking: null,
    theRanking: null,
    tuitionRange: "£ 1,200 – 1,600 / 月",
    tuitionSortUsd: 18000,
    requirements: { gpa: "—", toefl: "—", ielts: "—" },
    successfulAdmits: 42,
    programs: ["General English", "IELTS 衝刺班", "商務英語"],
    tags: ["遊學", "升學銜接", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "倫敦市中心語言學校，提供商務英語與考試衝刺，可銜接合作大學學位。",
  },
  {
    id: "sch-glasgow",
    name: "University of Glasgow",
    chineseName: "格拉斯哥大學",
    country: "蘇格蘭",
    location: "Glasgow",
    type: "研究所",
    qsRanking: 78,
    usNewsRanking: 72,
    theRanking: 85,
    tuitionRange: "£ 25,000 – 30,000 / 年",
    tuitionSortUsd: 33500,
    requirements: { gpa: "3.0", toefl: "90", ielts: "6.5" },
    successfulAdmits: 20,
    programs: ["Computing Science", "Data Analytics", "Mechanical Engineering"],
    tags: ["一年制碩士", "CP 值高", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "蘇格蘭老牌綜合大學，工程與資訊學程一年制，學費相對親民，國際生友善。",
  },
  {
    id: "sch-tcd",
    name: "Trinity College Dublin",
    chineseName: "都柏林聖三一學院",
    country: "愛爾蘭",
    location: "Dublin",
    type: "研究所",
    qsRanking: 87,
    usNewsRanking: 91,
    theRanking: 134,
    tuitionRange: "€ 25,000 – 32,000 / 年",
    tuitionSortUsd: 30000,
    requirements: { gpa: "3.2", toefl: "90", ielts: "6.5" },
    successfulAdmits: 17,
    programs: ["Computer Science", "Data Science", "Management"],
    tags: ["一年制碩士", "英語系國家", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "愛爾蘭歷史最悠久的大學，英語授課，畢業後可申請愛爾蘭畢業生工作簽。",
  },
  {
    id: "sch-ucd",
    name: "University College Dublin",
    chineseName: "都柏林大學",
    country: "愛爾蘭",
    location: "Dublin",
    type: "研究所",
    qsRanking: 126,
    usNewsRanking: 201,
    theRanking: 198,
    tuitionRange: "€ 23,000 – 29,000 / 年",
    tuitionSortUsd: 27500,
    requirements: { gpa: "3.0", toefl: "88", ielts: "6.5" },
    successfulAdmits: 15,
    programs: ["Business Analytics", "Computer Science", "Finance"],
    tags: ["一年制碩士", "英語系國家", "商管強"],
    isPartner: false,
    isVerified: false,
    description: "愛爾蘭規模最大的大學，商管與資訊學程招生量大，鄰近科技業聚落。",
  },
  {
    id: "sch-uci",
    name: "University of California, Irvine",
    chineseName: "加州大學爾灣分校",
    country: "美國",
    location: "Irvine, CA",
    type: "研究所",
    qsRanking: 256,
    usNewsRanking: 33,
    theRanking: 90,
    tuitionRange: "US$ 30,000 – 38,000 / 年",
    tuitionSortUsd: 34000,
    requirements: { gpa: "3.3", toefl: "96", ielts: "6.5" },
    successfulAdmits: 28,
    programs: ["Computer Science", "Software Engineering", "Data Science"],
    tags: ["理工強校", "公立名校", "CP 值高"],
    isPartner: true,
    isVerified: true,
    description: "加州大學系統成員，CS 與軟體工程學程實務導向，氣候宜人且鄰近科技業。",
  },
  {
    id: "sch-monash",
    name: "Monash University",
    chineseName: "蒙納許大學",
    country: "澳洲",
    location: "Melbourne, VIC",
    type: "研究所",
    qsRanking: 37,
    usNewsRanking: 39,
    theRanking: 54,
    tuitionRange: "A$ 42,000 – 49,000 / 年",
    tuitionSortUsd: 29500,
    requirements: { gpa: "3.0", toefl: "90", ielts: "6.5" },
    successfulAdmits: 24,
    programs: ["Information Technology", "Data Science", "Business"],
    tags: ["澳洲八大", "移民友善", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "澳洲八大之一，IT 與資料科學碩士招生規模大，畢業後工作簽路徑明確。",
  },
];

export const SCHOOL_COUNTRIES = [
  "全部",
  "美國",
  "英國",
  "蘇格蘭",
  "愛爾蘭",
  "加拿大",
  "澳洲",
  "德國",
  "新加坡",
] as const;
export const SCHOOL_TYPES = ["全部", "研究所", "大學", "語言學校"] as const;

/** 院校資料庫排序選項（對齊真實畫面的「排序方式」chips） */
export type SchoolSortKey =
  | "admits"
  | "usnews"
  | "qs"
  | "gpa"
  | "toefl"
  | "ielts";
export const SCHOOL_SORTS: { key: SchoolSortKey; label: string }[] = [
  { key: "admits", label: "成功錄取數" },
  { key: "usnews", label: "US News 排名" },
  { key: "qs", label: "QS 排名" },
  { key: "gpa", label: "GPA 要求" },
  { key: "toefl", label: "TOEFL 要求" },
  { key: "ielts", label: "IELTS 要求" },
];

/** 尚未維護的學校筆數（對齊真實畫面琥珀色提示，寫死） */
export const SCHOOL_UNMAINTAINED_COUNT = 5;
/** 院校向量化進度（已/總，對齊真實畫面徽章） */
export const SCHOOL_VECTORIZED = { done: 294, total: 302 };

// ============================================================================
// 3) AI 落點分析 — 候選校（含 AI 給的基準機率與因子）
// ============================================================================

export interface PlacementSchool {
  id: string;
  name: string;
  chineseName: string;
  country: string;
  location: string;
  rank: number | null;
  tier: "dream" | "match" | "safety";
  baseProbability: number; // AI 給的基準錄取機率（0-100）
  reqGpa: string;
  reqToefl: string;
  /** 學術因子（0-10），What-if 以此為基準做線性推估 */
  academicFactor: number;
  reasoningShort: string;
  similarOffers: number;
}

export const PLACEMENT_SCHOOLS: PlacementSchool[] = [
  // Dream
  {
    id: "p-cmu",
    name: "Carnegie Mellon University",
    chineseName: "卡內基美隆大學",
    country: "美國",
    location: "Pittsburgh, PA",
    rank: 52,
    tier: "dream",
    baseProbability: 22,
    reqGpa: "3.6",
    reqToefl: "102",
    academicFactor: 6.2,
    reasoningShort: "CS 競爭極高，背景需再強化研究或實作經歷以提升錄取機會。",
    similarOffers: 3,
  },
  {
    id: "p-imperial",
    name: "Imperial College London",
    chineseName: "倫敦帝國學院",
    country: "英國",
    location: "London",
    rank: 6,
    tier: "dream",
    baseProbability: 31,
    reqGpa: "3.5",
    reqToefl: "100",
    academicFactor: 6.6,
    reasoningShort: "理工頂尖，一年制碩士；GPA 達門檻但仍屬衝刺校。",
    similarOffers: 5,
  },
  // Match
  {
    id: "p-ucla",
    name: "University of California, Los Angeles",
    chineseName: "加州大學洛杉磯分校",
    country: "美國",
    location: "Los Angeles, CA",
    rank: 42,
    tier: "match",
    baseProbability: 54,
    reqGpa: "3.5",
    reqToefl: "100",
    academicFactor: 7.4,
    reasoningShort: "背景與該校過往錄取輪廓相符，屬主力申請目標。",
    similarOffers: 8,
  },
  {
    id: "p-ucl",
    name: "University College London",
    chineseName: "倫敦大學學院",
    country: "英國",
    location: "London",
    rank: 9,
    tier: "match",
    baseProbability: 61,
    reqGpa: "3.3",
    reqToefl: "96",
    academicFactor: 7.7,
    reasoningShort: "綜合名校、科系選擇多，門檻適中，命中率高。",
    similarOffers: 11,
  },
  // Safety
  {
    id: "p-melbourne",
    name: "University of Melbourne",
    chineseName: "墨爾本大學",
    country: "澳洲",
    location: "Melbourne, VIC",
    rank: 13,
    tier: "safety",
    baseProbability: 78,
    reqGpa: "3.2",
    reqToefl: "94",
    academicFactor: 8.3,
    reasoningShort: "兩年制 IT 碩士，門檻友善，可作為保底兼移民路徑。",
    similarOffers: 9,
  },
  {
    id: "p-tum",
    name: "Technical University of Munich",
    chineseName: "慕尼黑工業大學",
    country: "德國",
    location: "Munich",
    rank: 28,
    tier: "safety",
    baseProbability: 71,
    reqGpa: "3.0",
    reqToefl: "88",
    academicFactor: 8.0,
    reasoningShort: "公立低學費、理工強，英授學程門檻相對親民。",
    similarOffers: 4,
  },
];

/** AI 落點分析的預設輸入（寫死） */
export const PLACEMENT_DEFAULT_INPUT = {
  gpa: 3.6,
  toefl: 102,
  major: "Computer Science",
  country: "美國 / 英國",
};

export const PLACEMENT_REASONING =
  "依據輸入的 GPA 3.6（4.0 制）、TOEFL 102 與目標科系 Computer Science，並比對歷屆 40 筆相似背景錄取榜單後，建議採「2 衝刺 / 2 主力 / 2 保底」的選校結構。學術因子在主力與保底校已達標，夢幻校仍需以研究經歷與作品集補強。拖動下方 What-if 滑桿可即時觀察成績變動對各校錄取機率的影響（採線性推估，不重新呼叫 AI）。";

// ============================================================================
// 4) EP 報價系統 — 7 步驟精靈資料
// ============================================================================

export const QUOTE_STEPS = [
  "選擇校區",
  "選擇課程",
  "週數與日期",
  "住宿安排",
  "加購項目",
  "折扣方案",
  "確認報價",
] as const;

export interface EPCampus {
  id: string;
  city: string;
  country: string;
  flag: string;
  currency: string;
  exchangeRate: number; // 1 外幣 = N 台幣
}

export const EP_CAMPUSES: EPCampus[] = [
  { id: "vancouver", city: "Vancouver", country: "加拿大", flag: "🇨🇦", currency: "CAD", exchangeRate: 23.5 },
  { id: "toronto", city: "Toronto", country: "加拿大", flag: "🇨🇦", currency: "CAD", exchangeRate: 23.5 },
  { id: "london", city: "London", country: "英國", flag: "🇬🇧", currency: "GBP", exchangeRate: 40.2 },
  { id: "brisbane", city: "Brisbane", country: "澳洲", flag: "🇦🇺", currency: "AUD", exchangeRate: 21.0 },
  { id: "malta", city: "Malta", country: "馬爾他", flag: "🇲🇹", currency: "EUR", exchangeRate: 35.4 },
  { id: "dublin", city: "Dublin", country: "愛爾蘭", flag: "🇮🇪", currency: "EUR", exchangeRate: 35.4 },
];

export interface EPCourse {
  name: string;
  pricePerWeek: number; // 外幣 / 週
  note: string;
}

export const EP_COURSES: EPCourse[] = [
  { name: "General English (一般英語)", pricePerWeek: 380, note: "每週 20 堂，最常見入門課程" },
  { name: "Intensive English (密集班)", pricePerWeek: 460, note: "每週 30 堂，進度較快" },
  { name: "IELTS 考試衝刺班", pricePerWeek: 520, note: "針對升學門檻設計" },
  { name: "升學銜接課程 （Pathway）", pricePerWeek: 560, note: "可銜接合作大學" },
];

export interface EPAccommodation {
  id: string;
  name: string;
  pricePerWeek: number; // 外幣 / 週，0 = 不需住宿
  note: string;
}

export const EP_ACCOMMODATIONS: EPAccommodation[] = [
  { id: "none", name: "自行安排 / 不需住宿", pricePerWeek: 0, note: "" },
  { id: "homestay", name: "寄宿家庭 （含早晚餐）", pricePerWeek: 320, note: "沉浸式語言環境" },
  { id: "residence", name: "學生宿舍 （單人房）", pricePerWeek: 410, note: "近校區、獨立空間" },
  { id: "apartment", name: "共享公寓", pricePerWeek: 360, note: "彈性高、可自炊" },
];

export interface EPAddOn {
  id: string;
  name: string;
  price: number; // 外幣，一次性
  note: string;
}

export const EP_ADDONS: EPAddOn[] = [
  { id: "reg", name: "註冊費", price: 150, note: "報名一次性收取" },
  { id: "material", name: "教材費", price: 90, note: "依課程提供" },
  { id: "airport", name: "機場接送", price: 120, note: "單程，含司機" },
  { id: "insurance", name: "海外醫療保險", price: 200, note: "建議投保" },
  { id: "visa", name: "簽證代辦規費", price: 180, note: "依國家不同" },
];

export interface DiscountOption {
  id: string;
  label: string;
  type: "none" | "percent" | "fixed";
  value: number;
}

export const DISCOUNT_OPTIONS: DiscountOption[] = [
  { id: "none", label: "原價（不折）", type: "none", value: 0 },
  { id: "early", label: "早鳥優惠 8% off", type: "percent", value: 8 },
  { id: "clear", label: "出清優惠 12% off", type: "percent", value: 12 },
  { id: "fix3000", label: "折抵固定 NT$3,000", type: "fixed", value: 3000 },
];

// ============================================================================
// 5) 浮動 AI 助理 — 罐頭對話
// ============================================================================

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export const AI_QUICK_PROMPTS = [
  { id: "qp-1", icon: "🎓", label: "查歷屆", text: "歷屆有多少相似背景學生錄取美國 UCLA CS？背景如何？" },
  { id: "qp-2", icon: "🎯", label: "推薦選校", text: "GPA 3.6、TOEFL 102、想申請美國 CS，給我 5 間推薦學校" },
  { id: "qp-3", icon: "📋", label: "查門檻", text: "倫敦帝國學院 Computing 碩士的申請門檻是什麼？" },
] as const;

export const AI_THREADS: ChatThread[] = [
  {
    id: "th-1",
    title: "UCLA CS 歷屆錄取背景",
    updatedAt: "2025-06-16",
    messages: [
      { id: "m1", role: "ai", text: "您好！我是 Nexus AI 助手 ✨\n您可以直接輸入問題，或點選下方的快速模板。", time: "09:12" },
      { id: "m2", role: "user", text: "歷屆有多少相似背景學生錄取美國 UCLA CS？背景如何？", time: "09:13" },
      {
        id: "m3",
        role: "ai",
        text: "依歷屆榜單，共有 8 位相似背景學生錄取 UCLA Computer Science。\n\n• 平均 GPA：3.62 / 4.0\n• 平均 TOEFL：104\n• 多數具備 1 段研究或實習經歷\n\n建議申請者強化作品集與推薦信來源。",
        time: "09:13",
      },
    ],
  },
  {
    id: "th-2",
    title: "英國一年制碩士選校",
    updatedAt: "2025-06-15",
    messages: [
      { id: "m1", role: "ai", text: "您好！我是 Nexus AI 助手 ✨\n請問需要哪方面的協助？", time: "14:02" },
      { id: "m2", role: "user", text: "GPA 3.4 想申請英國一年制 CS 碩士，有哪些合適校？", time: "14:03" },
      {
        id: "m3",
        role: "ai",
        text: "以 GPA 3.4、目標英國一年制 CS 碩士，建議參考：\n\n• 主力：倫敦大學學院 UCL（門檻 GPA 3.3）\n• 衝刺：倫敦帝國學院（門檻 GPA 3.5）\n• 保底：可搭配其他羅素集團綜合校\n\n需要我幫你拉出完整落點分析嗎？",
        time: "14:03",
      },
    ],
  },
  {
    id: "th-3",
    title: "EP 溫哥華遊學報價",
    updatedAt: "2025-06-13",
    messages: [
      { id: "m1", role: "ai", text: "您好！我是 Nexus AI 助手 ✨", time: "11:20" },
      { id: "m2", role: "user", text: "EP 溫哥華 12 週一般英語 + 寄宿家庭大約多少？", time: "11:21" },
      {
        id: "m3",
        role: "ai",
        text: "粗估 12 週 General English 搭配寄宿家庭：\n\n• 課程：CAD 4,560\n• 住宿：CAD 3,840\n• 規費：約 CAD 240\n\n外幣合計約 CAD 8,640，依當日匯率換算台幣。實際金額請以「EP 報價系統」即時試算為準。",
        time: "11:21",
      },
    ],
  },
];

/** 送出訊息後 append 的罐頭回覆（輪流取用，避免亂數） */
export const AI_CANNED_REPLIES: string[] = [
  "收到！這是 Demo 環境的示意回覆。實際版本會即時查詢院校庫與歷屆榜單後回答。",
  "已為您整理重點：可至「AI 落點分析」輸入學生條件，取得 Dream / Match / Safety 三檔建議。",
  "建議搭配「常用院校資料庫」交叉比對排名、學費與語言門檻，再決定最終選校清單。",
];

// ============================================================================
// 6) 歷屆榜單（精簡表格）
// ============================================================================

/** 榜單國家代碼（對齊真實產品的國家快篩 chips） */
export type RankingCountryCode = "AUS" | "CAD" | "Ireland" | "SCT" | "UK" | "USA";

export interface RankingRow {
  id: string;
  student: string; // 脫敏假名
  major: string; // 在台原科系（公開系所）
  year: string;
  /** 國家代碼（對應快篩 chips） */
  countryCode: RankingCountryCode;
  school: string;
  program: string; // 錄取科系
  gpa: string;
  toefl: string;
  /** 是否大碩錄取 */
  isDaShuo: boolean;
  /** 是否洋碩錄取 */
  isYangShuo: boolean;
  /** 是否取得獎學金 */
  hasScholarship: boolean;
  /** 獎學金金額（NTD，無則 0；用於上方累積加總） */
  scholarshipNtd: number;
  /** 獎學金顯示字串（無則「—」） */
  scholarship: string;
  result: "錄取" | "備取" | "婉拒";
}

export const RANKING_YEARS = ["總覽", "2026", "2025", "2024"] as const;

/** 國家快篩 chips(對齊真實畫面；「全部」為預設藍底) */
export const RANKING_COUNTRY_CODES: RankingCountryCode[] = [
  "AUS",
  "CAD",
  "Ireland",
  "SCT",
  "UK",
  "USA",
];

/** 國家代碼 → 中文（顯示用） */
export const RANKING_COUNTRY_LABEL: Record<RankingCountryCode, string> = {
  AUS: "澳洲",
  CAD: "加拿大",
  Ireland: "愛爾蘭",
  SCT: "蘇格蘭",
  UK: "英國",
  USA: "美國",
};

export const RANKING_ROWS: RankingRow[] = [
  { id: "r-1", student: "王＊明", major: "成功大學 資工系", year: "2026", countryCode: "USA", school: "UCLA", program: "Computer Science", gpa: "3.7", toefl: "106", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-2", student: "陳＊君", major: "政治大學 企管系", year: "2026", countryCode: "UK", school: "UCL", program: "Business Analytics", gpa: "3.5", toefl: "98", isDaShuo: false, isYangShuo: true, hasScholarship: true, scholarshipNtd: 201000, scholarship: "£ 5,000 減免", result: "錄取" },
  { id: "r-3", student: "林＊豪", major: "臺灣大學 電機系", year: "2026", countryCode: "CAD", school: "University of Toronto", program: "Applied Computing", gpa: "3.6", toefl: "101", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-4", student: "張＊瑋", major: "清華大學 資工系", year: "2026", countryCode: "USA", school: "Georgia Tech", program: "Analytics", gpa: "3.5", toefl: "100", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-5", student: "黃＊涵", major: "交通大學 資科系", year: "2026", countryCode: "UK", school: "Imperial College", program: "Computing", gpa: "3.7", toefl: "105", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-6", student: "吳＊安", major: "中央大學 資工系", year: "2026", countryCode: "SCT", school: "Edinburgh", program: "Data Science", gpa: "3.4", toefl: "95", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "備取" },
  { id: "r-7", student: "李＊庭", major: "成功大學 外文系", year: "2026", countryCode: "AUS", school: "University of Sydney", program: "Information Technology", gpa: "3.3", toefl: "93", isDaShuo: false, isYangShuo: true, hasScholarship: true, scholarshipNtd: 168000, scholarship: "A$ 8,000 減免", result: "錄取" },
  { id: "r-8", student: "周＊妤", major: "輔仁大學 資工系", year: "2026", countryCode: "Ireland", school: "Trinity College Dublin", program: "Computer Science", gpa: "3.4", toefl: "96", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-9", student: "鄭＊翰", major: "臺灣科大 電子系", year: "2026", countryCode: "USA", school: "Carnegie Mellon", program: "Machine Learning", gpa: "3.8", toefl: "110", isDaShuo: true, isYangShuo: false, hasScholarship: true, scholarshipNtd: 620000, scholarship: "US$ 20,000 助學金", result: "錄取" },
  { id: "r-10", student: "蕭＊柏", major: "中山大學 資管系", year: "2026", countryCode: "CAD", school: "UBC", program: "Data Science", gpa: "3.6", toefl: "102", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-11", student: "陳＊樺", major: "中山大學 資管系", year: "2025", countryCode: "AUS", school: "University of Melbourne", program: "Information Technology", gpa: "3.3", toefl: "92", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-12", student: "許＊宇", major: "臺北科大 資工系", year: "2025", countryCode: "UK", school: "Manchester", program: "Computer Science", gpa: "3.2", toefl: "90", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-13", student: "蔡＊妏", major: "政治大學 資科系", year: "2025", countryCode: "UK", school: "UCL", program: "Computer Science", gpa: "3.5", toefl: "99", isDaShuo: false, isYangShuo: true, hasScholarship: true, scholarshipNtd: 241200, scholarship: "£ 6,000 減免", result: "錄取" },
  { id: "r-14", student: "潘＊辰", major: "臺灣大學 資工系", year: "2025", countryCode: "CAD", school: "University of Toronto", program: "Applied Computing", gpa: "3.6", toefl: "102", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-15", student: "曾＊蓉", major: "清華大學 統計所", year: "2025", countryCode: "USA", school: "UIUC", program: "Statistics", gpa: "3.7", toefl: "104", isDaShuo: true, isYangShuo: false, hasScholarship: true, scholarshipNtd: 465000, scholarship: "TA 助教獎助 US$ 15,000", result: "錄取" },
  { id: "r-16", student: "賴＊宏", major: "成功大學 機械系", year: "2025", countryCode: "SCT", school: "University of Glasgow", program: "Mechanical Engineering", gpa: "3.0", toefl: "88", isDaShuo: false, isYangShuo: true, hasScholarship: true, scholarshipNtd: 120600, scholarship: "£ 3,000 國際生獎", result: "備取" },
  { id: "r-17", student: "謝＊綺", major: "東吳大學 企管系", year: "2025", countryCode: "UK", school: "UCL", program: "Business Analytics", gpa: "3.4", toefl: "96", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "婉拒" },
  { id: "r-18", student: "高＊維", major: "交通大學 電機系", year: "2025", countryCode: "UK", school: "Imperial College", program: "Computing", gpa: "3.6", toefl: "104", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "婉拒" },
  { id: "r-19", student: "邱＊婷", major: "中央大學 資管系", year: "2025", countryCode: "Ireland", school: "University College Dublin", program: "Business Analytics", gpa: "3.7", toefl: "103", isDaShuo: false, isYangShuo: true, hasScholarship: true, scholarshipNtd: 180000, scholarship: "€ 5,000 入學獎", result: "錄取" },
  { id: "r-20", student: "羅＊誠", major: "臺灣大學 資工系", year: "2025", countryCode: "USA", school: "UCLA", program: "Data Science", gpa: "3.5", toefl: "99", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "備取" },
  { id: "r-21", student: "簡＊妤", major: "輔仁大學 資工系", year: "2025", countryCode: "CAD", school: "McGill", program: "Computer Science", gpa: "3.3", toefl: "94", isDaShuo: true, isYangShuo: false, hasScholarship: true, scholarshipNtd: 138000, scholarship: "C$ 6,000 入學獎", result: "錄取" },
  { id: "r-22", student: "宋＊翔", major: "中興大學 資工系", year: "2025", countryCode: "AUS", school: "University of Sydney", program: "Data Science", gpa: "3.2", toefl: "91", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-23", student: "馮＊柔", major: "成功大學 資工系", year: "2025", countryCode: "USA", school: "Georgia Tech", program: "Computer Science", gpa: "3.6", toefl: "101", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-24", student: "葉＊軒", major: "臺灣科大 資工系", year: "2025", countryCode: "SCT", school: "Edinburgh", program: "AI", gpa: "3.4", toefl: "97", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "備取" },
  { id: "r-25", student: "杜＊霖", major: "中央大學 數學系", year: "2024", countryCode: "USA", school: "UIUC", program: "Computer Science", gpa: "3.5", toefl: "100", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-26", student: "范＊瑄", major: "政治大學 資科系", year: "2024", countryCode: "UK", school: "Manchester", program: "Data Science", gpa: "3.3", toefl: "93", isDaShuo: false, isYangShuo: true, hasScholarship: true, scholarshipNtd: 160800, scholarship: "£ 4,000 減免", result: "錄取" },
  { id: "r-27", student: "孫＊雅", major: "臺灣大學 經濟系", year: "2024", countryCode: "CAD", school: "University of Toronto", program: "Statistics", gpa: "3.6", toefl: "101", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-28", student: "顏＊豪", major: "成功大學 工科系", year: "2024", countryCode: "AUS", school: "University of Melbourne", program: "Engineering", gpa: "3.2", toefl: "92", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-29", student: "白＊蓁", major: "清華大學 資工系", year: "2024", countryCode: "USA", school: "Carnegie Mellon", program: "Computer Science", gpa: "3.8", toefl: "108", isDaShuo: true, isYangShuo: false, hasScholarship: true, scholarshipNtd: 558000, scholarship: "US$ 18,000 助學金", result: "錄取" },
  { id: "r-30", student: "莊＊翰", major: "交通大學 資工系", year: "2024", countryCode: "UK", school: "Edinburgh", program: "Informatics", gpa: "3.4", toefl: "96", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-31", student: "方＊晴", major: "中山大學 資管系", year: "2024", countryCode: "Ireland", school: "Trinity College Dublin", program: "Data Science", gpa: "3.5", toefl: "98", isDaShuo: false, isYangShuo: true, hasScholarship: true, scholarshipNtd: 216000, scholarship: "€ 6,000 入學獎", result: "錄取" },
  { id: "r-32", student: "金＊宏", major: "臺北科大 資工系", year: "2024", countryCode: "SCT", school: "University of Glasgow", program: "Computer Science", gpa: "3.3", toefl: "94", isDaShuo: false, isYangShuo: true, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "備取" },
  { id: "r-33", student: "夏＊涵", major: "輔仁大學 統計系", year: "2024", countryCode: "USA", school: "Georgia Tech", program: "Analytics", gpa: "3.6", toefl: "102", isDaShuo: true, isYangShuo: false, hasScholarship: false, scholarshipNtd: 0, scholarship: "—", result: "錄取" },
  { id: "r-34", student: "童＊安", major: "中興大學 應數系", year: "2024", countryCode: "CAD", school: "UBC", program: "Computer Science", gpa: "3.4", toefl: "95", isDaShuo: true, isYangShuo: false, hasScholarship: true, scholarshipNtd: 92000, scholarship: "C$ 4,000 入學獎", result: "錄取" },
];

/** 榜單累積獲取獎學金（NTD，由上方資料加總；留尾數對齊真實畫面樣式） */
export const RANKING_SCHOLARSHIP_TOTAL_NTD = 32427333.74;

// ============================================================================
// 7) 遊學學員 CRM(看板)
// ============================================================================

export interface CrmStudent {
  id: string;
  name: string;
  consultant: string;
  destination: string;
  program: string;
  stage: "諮詢中" | "報價中" | "已報名" | "出發前" | "已出發";
  amount: string;
  updatedAt: string;
}

export const CRM_STAGES = ["諮詢中", "報價中", "已報名", "出發前", "已出發"] as const;

export const CRM_STUDENTS: CrmStudent[] = [
  { id: "c-1", name: "王＊婷", consultant: "顧問 A", destination: "加拿大 · 溫哥華", program: "General English 24 週", stage: "諮詢中", amount: "—", updatedAt: "2025-06-16" },
  { id: "c-2", name: "陳＊豪", consultant: "顧問 B", destination: "英國 · 倫敦", program: "IELTS 衝刺 12 週", stage: "諮詢中", amount: "—", updatedAt: "2025-06-15" },
  { id: "c-3", name: "林＊瑜", consultant: "顧問 D", destination: "馬爾他 · 斯利馬", program: "General English 8 週", stage: "諮詢中", amount: "—", updatedAt: "2025-06-15" },
  { id: "c-4", name: "張＊宇", consultant: "顧問 A", destination: "馬爾他 · 瓦萊塔", program: "General English 16 週", stage: "報價中", amount: "NT$ 198,000", updatedAt: "2025-06-15" },
  { id: "c-5", name: "黃＊安", consultant: "顧問 C", destination: "澳洲 · 布里斯本", program: "升學銜接 30 週", stage: "報價中", amount: "NT$ 412,000", updatedAt: "2025-06-14" },
  { id: "c-6", name: "吳＊潔", consultant: "顧問 B", destination: "加拿大 · 溫哥華", program: "Intensive 24 週", stage: "報價中", amount: "NT$ 356,000", updatedAt: "2025-06-14" },
  { id: "c-7", name: "李＊軒", consultant: "顧問 A", destination: "愛爾蘭 · 都柏林", program: "General English 20 週", stage: "已報名", amount: "NT$ 264,000", updatedAt: "2025-06-13" },
  { id: "c-8", name: "周＊妤", consultant: "顧問 B", destination: "加拿大 · 多倫多", program: "Intensive 20 週", stage: "已報名", amount: "NT$ 286,000", updatedAt: "2025-06-12" },
  { id: "c-9", name: "鄭＊翔", consultant: "顧問 D", destination: "英國 · 倫敦", program: "IELTS 衝刺 16 週", stage: "已報名", amount: "NT$ 318,000", updatedAt: "2025-06-12" },
  { id: "c-10", name: "許＊蓉", consultant: "顧問 C", destination: "澳洲 · 布里斯本", program: "General English 12 週", stage: "出發前", amount: "NT$ 172,000", updatedAt: "2025-06-11" },
  { id: "c-11", name: "蔡＊辰", consultant: "顧問 D", destination: "愛爾蘭 · 都柏林", program: "General English 12 週", stage: "出發前", amount: "NT$ 156,000", updatedAt: "2025-06-10" },
  { id: "c-12", name: "潘＊維", consultant: "顧問 A", destination: "加拿大 · 溫哥華", program: "升學銜接 24 週", stage: "出發前", amount: "NT$ 388,000", updatedAt: "2025-06-09" },
  { id: "c-13", name: "曾＊綺", consultant: "顧問 C", destination: "英國 · 倫敦", program: "Pathway 36 週", stage: "已出發", amount: "NT$ 520,000", updatedAt: "2025-06-02" },
  { id: "c-14", name: "賴＊宏", consultant: "顧問 B", destination: "馬爾他 · 瓦萊塔", program: "General English 24 週", stage: "已出發", amount: "NT$ 298,000", updatedAt: "2025-05-29" },
  { id: "c-15", name: "謝＊妏", consultant: "顧問 D", destination: "加拿大 · 多倫多", program: "Intensive 16 週", stage: "已出發", amount: "NT$ 242,000", updatedAt: "2025-05-26" },
];

// ============================================================================
// 8) 使用量監測（StatCard + 簡表）
// ============================================================================

export interface UsageStat {
  key: string;
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  hint: string;
}

export const USAGE_STATS: UsageStat[] = [
  { key: "active", label: "本月活躍顧問", value: "32", delta: "+5", positive: true, hint: "較上月" },
  { key: "ai", label: "AI 落點分析次數", value: "418", delta: "+23%", positive: true, hint: "較上月" },
  { key: "quote", label: "EP 報價產生數", value: "276", delta: "+12%", positive: true, hint: "較上月" },
  { key: "search", label: "院校庫查詢數", value: "5,120", delta: "-3%", positive: false, hint: "較上月" },
];

export interface UsageRow {
  id: string;
  feature: string;
  count: number;
  trend: string;
}

export const USAGE_ROWS: UsageRow[] = [
  { id: "u-1", feature: "AI 落點分析", count: 418, trend: "↑ 23%" },
  { id: "u-2", feature: "EP 報價系統", count: 276, trend: "↑ 12%" },
  { id: "u-3", feature: "院校資料庫搜尋", count: 5120, trend: "↓ 3%" },
  { id: "u-4", feature: "歷屆榜單查詢", count: 1340, trend: "↑ 8%" },
  { id: "u-5", feature: "AI 助理對話", count: 2860, trend: "↑ 31%" },
];

/** 近 7 日活躍量（給 recharts 折線圖，寫死） */
export interface UsageDaily {
  day: string;
  active: number;
  aiRuns: number;
}

export const USAGE_DAILY: UsageDaily[] = [
  { day: "06/10", active: 21, aiRuns: 48 },
  { day: "06/11", active: 24, aiRuns: 55 },
  { day: "06/12", active: 19, aiRuns: 41 },
  { day: "06/13", active: 28, aiRuns: 67 },
  { day: "06/14", active: 26, aiRuns: 59 },
  { day: "06/15", active: 30, aiRuns: 72 },
  { day: "06/16", active: 32, aiRuns: 80 },
];

// ============================================================================
// 9) 最新公告
// ============================================================================

export type AnnouncementCategory = "合作廠商" | "內部" | "規則" | "活動";

export interface Announcement {
  id: string;
  category: AnnouncementCategory;
  title: string;
  date: string; // 寫死字串
  pinned: boolean;
  verified: boolean;
  summary: string;
  content: string;
  /** 活動類專屬 */
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
}

export const ANNOUNCEMENT_CATEGORIES: ("全部" | AnnouncementCategory)[] = [
  "全部",
  "合作廠商",
  "內部",
  "規則",
  "活動",
];

export const ANNOUNCEMENT_CATEGORY_COLOR: Record<AnnouncementCategory, PillColor> = {
  合作廠商: "violet",
  內部: "blue",
  規則: "amber",
  活動: "emerald",
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "an-1",
    category: "規則",
    title: "2026 Fall 美國研究所申請時程總表已更新",
    date: "2026-06-16",
    pinned: true,
    verified: true,
    summary: "各校 Deadline、文件清單與 GRE/TOEFL 門檻已彙整為單一表格，請顧問下載最新版。",
    content:
      "本季已將美國前 80 名研究所的申請時程整併為單一總表，內容包含：\n\n• 各校 Round 1 / Round 2 Deadline（含 Rolling 校名單）\n• 文件清單（SOP、CV、推薦信數量、Writing Sample 需求）\n• GRE / TOEFL / IELTS 最低門檻與是否 Waiver\n• 是否收 Duolingo English Test\n\n請所有顧問改用最新版本，舊表將於月底封存。如發現任一校門檻與官網不符，請於知識庫提出勘誤。",
  },
  {
    id: "an-2",
    category: "合作廠商",
    title: "EP 語言學校 2026 秋季學費調整公告",
    date: "2026-06-14",
    pinned: true,
    verified: true,
    summary: "溫哥華與倫敦校區一般英語週費小幅調整，寄宿家庭費用維持不變，報價系統已同步。",
    content:
      "合作語言學校 EP 已公布 2026 秋季新價：\n\n• 溫哥華校 General English 週費調整為 CAD 395\n• 倫敦校 General English 週費調整為 £ 320\n• 寄宿家庭與註冊費維持原價\n• 早鳥優惠（開課前 60 天報名 8% off）延續至 2026 年底\n\n「EP 報價系統」內的定價已同步更新，舊報價單請於 7 天內重新產生以免價差。",
  },
  {
    id: "an-3",
    category: "活動",
    title: "美國名校線上招生說明會 — CS / Data Science 學程",
    date: "2026-06-12",
    pinned: false,
    verified: true,
    summary: "邀請合作院校招生官線上分享 CS 與資料科學學程選校與申請重點，開放顧問與學生報名。",
    content:
      "本場 Webinar 將由合作院校招生窗口分享：\n\n• CS / Data Science 學程的選校策略\n• 近兩年錄取輪廓變化\n• 作品集與研究經歷的加分方式\n• Q&A 現場提問\n\n顧問可代學生報名，名額有限額滿為止。會後將提供錄影回放連結。",
    eventDate: "2026-07-08",
    eventTime: "19:00 - 20:30",
    eventLocation: "線上 Webinar（Zoom）",
  },
  {
    id: "an-4",
    category: "活動",
    title: "英國一年制碩士秋季申請工作坊",
    date: "2026-06-10",
    pinned: false,
    verified: true,
    summary: "實體工作坊，帶領顧問逐步完成英國一年制碩士的選校清單與文件時程規劃。",
    content:
      "工作坊內容：\n\n• 英國一年制碩士的選校邏輯（衝刺 / 主力 / 保底）\n• UCAS 與各校直申系統操作\n• Graduate Route 畢業生工作簽最新效期\n• 現場演練：用 Nexus 拉一份完整落點清單\n\n請攜帶筆電，現場將提供實作帳號。",
    eventDate: "2026-07-15",
    eventTime: "14:00 - 15:30",
    eventLocation: "北一區辦公室 3F 會議室",
  },
  {
    id: "an-5",
    category: "規則",
    title: "加拿大學簽 SDS 新制說明",
    date: "2026-06-08",
    pinned: false,
    verified: true,
    summary: "GIC 金額與語言成績要求調整，遞件前請以官網最新版本為準並重新確認財力證明。",
    content:
      "加拿大 SDS（Student Direct Stream）近期調整重點：\n\n• GIC 金額門檻上調，請以官方公告金額為準\n• 語言成績需 IELTS 6.0（單項不限）或同等\n• 須先取得學費繳費證明\n\n所有送件前請再次核對官網最新版本，避免因舊資訊退件。本則為內部提醒，非官方文件。",
  },
  {
    id: "an-6",
    category: "內部",
    title: "Nexus 知識庫改版：新增「話術」與「合約」分類",
    date: "2026-06-06",
    pinned: false,
    verified: true,
    summary: "顧問知識庫新增兩個分類，並開放全文搜尋與向量化問答，歡迎試用並回報。",
    content:
      "知識庫本次更新：\n\n• 新增「話術」分類，收錄常見諮詢情境的應對範例\n• 新增「合約」分類，整理報名合約條款與退費規則重點\n• 文章支援全文搜尋與分類篩選\n• 後續將串接 AI 問答（向量化）\n\n如有想補充的主題，請在內部頻道提出。",
  },
  {
    id: "an-7",
    category: "合作廠商",
    title: "澳洲八大 2026 入學國際生獎學金開放申請",
    date: "2026-06-04",
    pinned: false,
    verified: false,
    summary: "多所合作澳洲八大開放國際生入學獎學金，金額與名額不一，請協助學生於截止前送件。",
    content:
      "本季合作的澳洲八大院校開放國際生獎學金：\n\n• 部分校提供學費 10–25% 減免\n• 多以學術成績與申請時間先後審核\n• 名額有限，建議盡早送件\n\n各校金額與條件不同，詳情請見院校資料庫各校頁面。本則尚未經官方二次確認（未驗證）。",
  },
  {
    id: "an-8",
    category: "內部",
    title: "顧問月會：6 月績效回顧與下季重點",
    date: "2026-06-02",
    pinned: false,
    verified: true,
    summary: "月會將回顧 6 月各區諮詢與成交概況，並說明下季主推的英國與愛爾蘭一年制碩士。",
    content:
      "月會議程：\n\n• 6 月各區諮詢量與成交概況\n• AI 落點分析使用率分享\n• 下季主推：英國 / 愛爾蘭一年制碩士\n• 新進顧問 Nexus 操作 QA\n\n請各區主管彙整本月案例帶至會議分享。",
  },
  {
    id: "an-9",
    category: "規則",
    title: "推薦信收件規範更新：請統一使用學校官方系統",
    date: "2026-05-30",
    pinned: false,
    verified: true,
    summary: "多數美國研究所僅接受透過官方申請系統寄出的推薦信，請提醒推薦人勿用個人信箱直寄。",
    content:
      "推薦信收件規範：\n\n• 美國多數研究所僅承認透過官方系統送出的推薦信\n• 請提醒推薦人使用收到的官方連結上傳\n• 個人信箱直寄之推薦信多數不被採認\n• 截止前 7 天請追蹤推薦信送出狀態\n\n如遇推薦人技術問題，請協助聯繫該校 admission office。",
  },
  {
    id: "an-10",
    category: "活動",
    title: "加拿大遊學說明會（含寄宿家庭體驗分享）",
    date: "2026-05-28",
    pinned: false,
    verified: true,
    summary: "邀請已出發學員線上分享溫哥華遊學與寄宿家庭生活，協助潛在學員建立期待值。",
    content:
      "說明會內容：\n\n• 溫哥華語言學校課程與分班制度\n• 寄宿家庭實際生活分享（已出發學員連線）\n• 打工度假與升學銜接路徑\n• 行前準備清單\n\n適合正在評估加拿大遊學的學員與家長參加。",
    eventDate: "2026-06-25",
    eventTime: "20:00 - 21:00",
    eventLocation: "線上 Webinar（Google Meet）",
  },
  {
    id: "an-11",
    category: "合作廠商",
    title: "愛爾蘭都柏林院校加入合作名單",
    date: "2026-05-25",
    pinned: false,
    verified: true,
    summary: "新增兩所愛爾蘭都柏林院校至合作名單，英語授課且具畢業生工作簽路徑，已建檔院校資料庫。",
    content:
      "本季新增愛爾蘭合作院校：\n\n• 都柏林聖三一學院（Trinity College Dublin）\n• 都柏林大學（University College Dublin）\n\n兩校均為英語授課，畢業後可申請愛爾蘭畢業生工作簽（最長兩年）。院校資料庫已建檔，落點分析亦可納入。",
  },
  {
    id: "an-12",
    category: "內部",
    title: "系統維護通知：本週六凌晨例行更新",
    date: "2026-05-22",
    pinned: false,
    verified: true,
    summary: "本週六凌晨將進行例行系統維護，期間 AI 問答與報價系統可能短暫無法使用。",
    content:
      "維護資訊：\n\n• 時間：本週六 02:00 - 04:00\n• 影響範圍：AI 問答、EP 報價系統、向量化索引重建\n• 期間院校資料庫與榜單仍可瀏覽\n\n維護完成後將於內部頻道公告。造成不便敬請見諒。",
  },
];

// ============================================================================
// 10) 顧問知識庫
// ============================================================================

export type WikiCategory =
  | "申請流程"
  | "FAQ"
  | "辭典"
  | "話術"
  | "合約"
  | "廠商"
  | "遊學";

export interface WikiArticle {
  id: string;
  category: WikiCategory;
  title: string;
  pinned: boolean;
  verified: boolean;
  updatedAt: string; // 寫死字串
  summary: string;
  content: string;
}

export const WIKI_CATEGORIES: ("全部" | WikiCategory)[] = [
  "全部",
  "申請流程",
  "FAQ",
  "辭典",
  "話術",
  "合約",
  "廠商",
  "遊學",
];

export const WIKI_CATEGORY_COLOR: Record<WikiCategory, PillColor> = {
  申請流程: "blue",
  FAQ: "cyan",
  辭典: "indigo",
  話術: "pink",
  合約: "amber",
  廠商: "violet",
  遊學: "teal",
};

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    id: "w-1",
    category: "申請流程",
    title: "美國研究所申請全流程 SOP（從選校到送件）",
    pinned: true,
    verified: true,
    updatedAt: "2026-06-15",
    summary: "完整列出美國研究所從評估、選校、文件準備到送件追蹤的標準作業步驟與時間軸。",
    content:
      "一、評估期（申請前 12 個月）\n盤點 GPA、語言成績、研究/實習經歷，初步設定目標國家與科系。\n\n二、選校期（申請前 8 個月）\n以落點分析拉出衝刺 / 主力 / 保底清單，確認各校門檻與 Deadline。\n\n三、文件準備期（申請前 4 個月）\nSOP、CV、推薦信、成績單與財力證明分批備齊，推薦信提早一個月通知推薦人。\n\n四、送件與追蹤期\n依各校系統送件，留存截圖；送件後追蹤推薦信與成績寄送狀態，等待面試或補件通知。",
  },
  {
    id: "w-2",
    category: "申請流程",
    title: "英國一年制碩士直申步驟與 UCAS 差異",
    pinned: false,
    verified: true,
    updatedAt: "2026-06-13",
    summary: "說明英國碩士多採各校官網直申，與大學部 UCAS 的差異，以及 conditional offer 的處理。",
    content:
      "英國碩士申請要點：\n\n• 多數碩士採各校官網直申，無需透過 UCAS（UCAS 主要用於大學部）\n• 可同時申請多校，無嚴格數量限制\n• 多採 Rolling 審核，越早送件越有利\n• 常見 conditional offer：補件語言成績或畢業證明後轉 unconditional\n\n收到 offer 後需於期限內接受並繳交留位費，再申請 CAS 辦理學生簽證。",
  },
  {
    id: "w-3",
    category: "FAQ",
    title: "TOEFL 與 IELTS 該考哪一個？",
    pinned: true,
    verified: true,
    updatedAt: "2026-06-12",
    summary: "依目標國家與科系判斷該準備 TOEFL 或 IELTS，並提供雙軌準備的時間建議。",
    content:
      "判斷原則：\n\n• 美國理工科系：多數 TOEFL / IELTS 皆收，依個人口說/寫作強項選擇\n• 英國 / 澳洲 / 愛爾蘭：IELTS 接受度較廣，部分學程指定 IELTS\n• 加拿大學簽 SDS：以 IELTS 為主\n\n若同時申請多國，建議優先準備接受度最廣的一項，避免分散準備時間。實際以各校官網要求為準。",
  },
  {
    id: "w-4",
    category: "FAQ",
    title: "GPA 不到 3.0 還有機會申請嗎？",
    pinned: false,
    verified: true,
    updatedAt: "2026-06-11",
    summary: "GPA 偏低時的補強策略：以研究經歷、作品集、語言成績與 SOP 故事線拉高整體競爭力。",
    content:
      "GPA 偏低的補強方向：\n\n• 以後期成績上升曲線說明學習軌跡\n• 強化研究 / 實習 / 專題作品集\n• 語言成績考高一點，降低學術以外的疑慮\n• SOP 誠實說明、聚焦動機與未來規劃\n• 選校時納入門檻較友善的主力與保底校\n\n部分學校接受附加說明信（addendum），可適度解釋特殊情況。",
  },
  {
    id: "w-5",
    category: "辭典",
    title: "留學常見縮寫辭典（SOP / LOR / CAS / I-20…）",
    pinned: false,
    verified: true,
    updatedAt: "2026-06-10",
    summary: "彙整申請過程最常出現的英文縮寫與中文對照，供新進顧問與學生快速查閱。",
    content:
      "常見縮寫：\n\n• SOP：Statement of Purpose，讀書計畫\n• PS：Personal Statement，個人陳述\n• LOR：Letter of Recommendation，推薦信\n• CV / Résumé：履歷\n• I-20：美國學校核發的入學許可文件（辦 F1 簽證用）\n• CAS：英國學校核發的就讀確認（辦學生簽用）\n• GIC：加拿大 SDS 所需的擔保投資證明\n• Graduate Route：英國畢業生工作簽",
  },
  {
    id: "w-6",
    category: "辭典",
    title: "OPT / CPT / PGWP 工作簽名詞解釋",
    pinned: false,
    verified: true,
    updatedAt: "2026-06-09",
    summary: "解釋美國 OPT/CPT 與加拿大 PGWP 等畢業後工作許可的差異，協助學生規劃職涯。",
    content:
      "工作簽名詞：\n\n• CPT：就學期間的實習工作許可（與課程相關）\n• OPT：美國畢業後工作許可，STEM 學程可延長\n• STEM OPT Extension：理工科系額外延長期\n• PGWP：加拿大畢業後工作簽，長度依課程而定\n• Graduate Route：英國畢業生工作簽，碩士後最長兩年\n\n各國規定可能調整，請以官方移民機關公告為準。",
  },
  {
    id: "w-7",
    category: "話術",
    title: "首次諮詢開場與需求釐清話術",
    pinned: true,
    verified: true,
    updatedAt: "2026-06-08",
    summary: "提供首次諮詢的開場、需求釐清提問與預期管理的範例語句，降低生硬感。",
    content:
      "開場（建立信任）：\n「我們先不急著談方案，想先了解你目前的規劃和最在意的點，這樣我才能給你最合適的建議。」\n\n需求釐清提問：\n• 「你心中有沒有特別想去的國家或學校？原因是什麼？」\n• 「預算大概抓在什麼範圍會比較安心？」\n• 「畢業後是想留當地工作，還是回台灣發展？」\n\n預期管理：\n「我會誠實跟你說哪些是衝刺、哪些是穩的，不會只挑你想聽的講。」",
  },
  {
    id: "w-8",
    category: "話術",
    title: "處理「我再考慮看看」的回應話術",
    pinned: false,
    verified: false,
    updatedAt: "2026-06-07",
    summary: "當學生表示要再考慮時，以釐清顧慮、提供資訊而非施壓的方式延續對話。",
    content:
      "原則：先理解顧慮，不施壓。\n\n回應範例：\n「完全可以，這是重要決定。方便讓我了解一下，你主要在考慮的是費用、學校選擇，還是時間點呢？」\n\n依顧慮提供資訊：\n• 費用 → 拆解各項目並說明可分期或早鳥優惠\n• 選校 → 提議先拉一份免費落點分析參考\n• 時間 → 說明各校 Deadline 與越早送件越有利\n\n收尾：「不論你最後決定如何，我都可以先幫你把資料整理好，你再決定要不要往下走。」",
  },
  {
    id: "w-9",
    category: "合約",
    title: "服務合約退費規則重點整理",
    pinned: false,
    verified: true,
    updatedAt: "2026-06-06",
    summary: "整理報名合約中的退費級距、不可退項目與爭議處理流程，供顧問正確說明。",
    content:
      "退費規則重點（示意）：\n\n• 服務未啟動：可全額退費\n• 服務已啟動、未送件：依完成階段比例退費\n• 已送件：行政與文件作業費用不退\n• 第三方規費（簽證、考試、學校申請費）一律不退\n\n說明合約時請逐條帶過退費級距與不可退項目，並確認學生理解後簽署。爭議請循內部流程處理，勿自行承諾。",
  },
  {
    id: "w-10",
    category: "合約",
    title: "個資與文件保管須知",
    pinned: false,
    verified: true,
    updatedAt: "2026-06-05",
    summary: "說明學生個資、成績單與護照影本的保管與銷毀原則，符合內部資安規範。",
    content:
      "保管原則：\n\n• 學生文件僅存放於指定系統，勿留存於個人裝置\n• 護照影本、成績單等敏感文件不得外流\n• 服務結束後依保存期限歸檔或銷毀\n• 對外溝通避免在訊息中直接夾帶完整證件\n\n如遇學生要求刪除個資，請依內部流程處理並留存紀錄。",
  },
  {
    id: "w-11",
    category: "廠商",
    title: "合作語言學校報價與佣金結算流程",
    pinned: false,
    verified: true,
    updatedAt: "2026-06-04",
    summary: "說明合作語言學校的報價產生、開立與後續結算的標準流程，避免價差與漏單。",
    content:
      "流程：\n\n一、以「EP 報價系統」產生報價單，確認校區、課程、週數與住宿\n二、報價單經主管確認後提供學生\n三、學生報名後於 CRM 建立案件並更新階段\n四、依合作條件結算，留存報名與繳費憑證\n\n價格異動時請重新產生報價單，舊單作廢，避免價差爭議。",
  },
  {
    id: "w-12",
    category: "廠商",
    title: "合作院校窗口聯繫與 offer 追蹤要點",
    pinned: false,
    verified: false,
    updatedAt: "2026-06-03",
    summary: "整理與合作院校招生窗口聯繫的禮節、追蹤節奏與常見問題回報方式。",
    content:
      "聯繫要點：\n\n• 以正式信件聯繫窗口，標題含學生案件編號\n• offer 追蹤建議每兩週一次，避免過度催促\n• 補件需求統一彙整後一次回覆\n• 特殊個案（gap year、轉換領域）先內部討論再對外\n\n窗口回覆內容請同步建檔，供後續案件參考。",
  },
  {
    id: "w-13",
    category: "遊學",
    title: "遊學行前準備清單（簽證 / 保險 / 住宿）",
    pinned: true,
    verified: true,
    updatedAt: "2026-06-02",
    summary: "出發前的證件、保險、住宿與生活用品清單，協助學員與顧問逐項確認。",
    content:
      "行前清單：\n\n證件：護照、簽證、入學許可、住宿證明、機票\n保險：海外醫療保險（建議涵蓋意外與疾病）\n住宿：確認寄宿家庭或宿舍地址與入住時間\n金流：少量現金 + 國際金融卡 / 信用卡\n生活：轉接頭、常用藥品、學校要求文件\n\n出發前一週與學員逐項核對，並提供當地緊急聯絡方式。",
  },
  {
    id: "w-14",
    category: "遊學",
    title: "寄宿家庭 vs 學生宿舍怎麼選？",
    pinned: false,
    verified: true,
    updatedAt: "2026-06-01",
    summary: "比較寄宿家庭與學生宿舍在語言環境、費用、自由度與飲食上的差異，協助學員選擇。",
    content:
      "比較：\n\n寄宿家庭\n• 語言沉浸感強，含早晚餐\n• 較有生活規範，適合首次出國\n\n學生宿舍\n• 自由度高、近校區\n• 多需自理飲食，社交以同學為主\n\n共享公寓\n• 彈性最高、可自炊，費用視地點\n\n建議依學員年齡、語言程度與獨立性綜合判斷，首次短期遊學多推薦寄宿家庭。",
  },
  {
    id: "w-15",
    category: "FAQ",
    title: "申請費與留位費常見問題",
    pinned: false,
    verified: true,
    updatedAt: "2026-05-30",
    summary: "說明申請費、留位費（deposit）的性質、是否可退與抵學費的常見情況。",
    content:
      "常見問題：\n\n• 申請費：送件時繳交，一般不退\n• 留位費 / Deposit：接受 offer 後繳交以保留名額\n• 留位費多數可抵未來學費，但放棄入學通常不退\n• 部分校於特定期限前放棄可部分退還\n\n各校政策不同，請以該校 offer 文件載明條款為準，並於繳費前向學生說明清楚。",
  },
  {
    id: "w-16",
    category: "申請流程",
    title: "推薦信邀請與追蹤標準作業",
    pinned: false,
    verified: true,
    updatedAt: "2026-05-28",
    summary: "從選定推薦人、提供素材到送出追蹤的推薦信標準流程，確保如期送達。",
    content:
      "步驟：\n\n一、選定 2–3 位熟悉學生的推薦人（教授 / 主管）\n二、提供推薦人 CV、SOP 與重點事蹟摘要\n三、於系統發出推薦信邀請，附上各校連結與截止日\n四、送出前一週禮貌提醒，並追蹤送達狀態\n\n避免最後一刻才邀請推薦人，建議至少提前一個月啟動。",
  },
];

// ============================================================================
// 11) AI 設定
// ============================================================================

export interface AiModelOption {
  id: string;
  provider: "Gemini" | "Claude";
  name: string;
  tagline: string;
  speedLabel: string; // 例：「最快」
  qualityLabel: string; // 例：「品質最高」
}

export const AI_MODEL_OPTIONS: AiModelOption[] = [
  {
    id: "gemini-flash",
    provider: "Gemini",
    name: "Gemini Flash",
    tagline: "高速、低成本，適合即時問答與大量查詢。",
    speedLabel: "最快",
    qualityLabel: "品質佳",
  },
  {
    id: "gemini-pro",
    provider: "Gemini",
    name: "Gemini Pro",
    tagline: "平衡速度與推理，適合多步驟比對與整理。",
    speedLabel: "快",
    qualityLabel: "品質高",
  },
  {
    id: "claude-sonnet",
    provider: "Claude",
    name: "Claude Sonnet",
    tagline: "推理穩定、語氣自然，適合撰寫與細緻回覆。",
    speedLabel: "快",
    qualityLabel: "品質高",
  },
  {
    id: "claude-opus",
    provider: "Claude",
    name: "Claude Opus",
    tagline: "最強推理，適合複雜選校策略與長文件分析。",
    speedLabel: "中等",
    qualityLabel: "品質最高",
  },
];

export interface AiMaintenanceTool {
  id: string;
  label: string;
  description: string;
}

export const AI_MAINTENANCE_TOOLS: AiMaintenanceTool[] = [
  { id: "vectorize-schools", label: "重新向量化院校庫", description: "將院校資料重新建立向量索引，供 AI 問答檢索。" },
  { id: "vectorize-wiki", label: "重新向量化知識庫", description: "更新知識庫文章的向量索引。" },
  { id: "vectorize-rankings", label: "重新向量化榜單", description: "更新歷屆榜單的向量索引。" },
  { id: "rebuild-index", label: "重建全文索引", description: "重建跨資料源的搜尋索引。" },
  { id: "clear-cache", label: "清除問答快取", description: "清除 AI 問答的暫存結果。" },
];

/** 目前向量化進度（寫死） */
export const AI_VECTORIZE_PROGRESS = { done: 887, total: 905 };

// ============================================================================
// 12) 權限管理系統
// ============================================================================

export type UserRole = "admin" | "editor" | "viewer";

export const USER_ROLE_COLOR: Record<UserRole, PillColor> = {
  admin: "rose",
  editor: "violet",
  viewer: "slate",
};

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  admin: "管理員",
  editor: "編輯者",
  viewer: "檢視者",
};

export interface PermissionUser {
  id: string;
  empId: string; // 員工編號假值，如 EMP-1024
  name: string; // 中文假名
  role: UserRole;
  team: string;
  active: boolean; // 啟用 / 停權
  lastActive: string; // 寫死字串
}

export const PERMISSION_USERS: PermissionUser[] = [
  { id: "user-1", empId: "EMP-1024", name: "王＊伶", role: "admin", team: "系統管理組", active: true, lastActive: "2026-06-16" },
  { id: "user-2", empId: "EMP-1031", name: "陳＊翰", role: "admin", team: "北一區", active: true, lastActive: "2026-06-16" },
  { id: "user-3", empId: "EMP-1047", name: "林＊蓉", role: "editor", team: "北一區", active: true, lastActive: "2026-06-15" },
  { id: "user-4", empId: "EMP-1052", name: "張＊豪", role: "editor", team: "北二區", active: true, lastActive: "2026-06-15" },
  { id: "user-5", empId: "EMP-1068", name: "黃＊婷", role: "editor", team: "中區", active: true, lastActive: "2026-06-14" },
  { id: "user-6", empId: "EMP-1073", name: "吳＊宇", role: "viewer", team: "中區", active: true, lastActive: "2026-06-14" },
  { id: "user-7", empId: "EMP-1089", name: "周＊潔", role: "editor", team: "南區", active: true, lastActive: "2026-06-13" },
  { id: "user-8", empId: "EMP-1095", name: "鄭＊軒", role: "viewer", team: "南區", active: false, lastActive: "2026-05-20" },
  { id: "user-9", empId: "EMP-1102", name: "許＊瑜", role: "editor", team: "北一區", active: true, lastActive: "2026-06-13" },
  { id: "user-10", empId: "EMP-1118", name: "蔡＊辰", role: "viewer", team: "北二區", active: true, lastActive: "2026-06-12" },
  { id: "user-11", empId: "EMP-1126", name: "潘＊維", role: "editor", team: "中區", active: true, lastActive: "2026-06-12" },
  { id: "user-12", empId: "EMP-1134", name: "曾＊綺", role: "viewer", team: "南區", active: false, lastActive: "2026-04-30" },
  { id: "user-13", empId: "EMP-1147", name: "賴＊宏", role: "editor", team: "北二區", active: true, lastActive: "2026-06-11" },
  { id: "user-14", empId: "EMP-1153", name: "謝＊妏", role: "viewer", team: "中區", active: true, lastActive: "2026-06-11" },
  { id: "user-15", empId: "EMP-1168", name: "高＊維", role: "editor", team: "北一區", active: true, lastActive: "2026-06-10" },
  { id: "user-16", empId: "EMP-1172", name: "邱＊婷", role: "viewer", team: "南區", active: true, lastActive: "2026-06-10" },
  { id: "user-17", empId: "EMP-1185", name: "羅＊誠", role: "editor", team: "中區", active: false, lastActive: "2026-05-08" },
  { id: "user-18", empId: "EMP-1199", name: "簡＊妤", role: "viewer", team: "北二區", active: true, lastActive: "2026-06-09" },
];
