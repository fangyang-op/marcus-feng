/**
 * ── Nexus 顧問資訊整合中心 — Demo 假資料 ─────────────────────────────
 *
 * 重建自內部產品「Nexus（顧問一站式中控台）」的 UI 骨架。
 * 全部為示意假資料(寫死成固定常數，無亂數、無 Date.now)，
 * 已移除任何真實客戶 / 員工 / 公司字樣。學校名為公開大學校名，
 * 但排名 / 學費 / 要求等數字皆為合理假值。
 */

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

/** 即將到來的活動(漸層大卡 + 次要卡) */
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
    name: "加拿大學簽 SDS 新制說明 (顧問內訓)",
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

/** 最新公告與動態(已依日期降冪寫死) */
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
    title: "英國 Graduate Route 簽證效期維持兩年 (官方公告)",
    preview: "近期傳聞調整為 18 個月並未通過；現行畢業生工作簽維持原 24 個月，碩博另計。",
    date: "2025-06-10",
    isVerified: true,
  },
  {
    id: "feed-4",
    type: "WIKI",
    title: "TOEFL vs IELTS 選擇指南 (依目標國家)",
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
  tuitionRange: string; // 每年學費區間(假值)
  requirements: { gpa: string; toefl: string; ielts: string };
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
    requirements: { gpa: "3.5", toefl: "100", ielts: "7.0" },
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
    requirements: { gpa: "3.6", toefl: "102", ielts: "7.5" },
    programs: ["Computer Science", "Machine Learning", "Robotics"],
    tags: ["CS 頂尖", "申請競爭高"],
    isPartner: false,
    isVerified: true,
    description: "電腦科學與人工智慧領域全球頂尖，研究資源豐沛，業界連結強。",
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
    requirements: { gpa: "3.5", toefl: "100", ielts: "7.0" },
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
    requirements: { gpa: "3.3", toefl: "96", ielts: "6.5" },
    programs: ["Computer Science", "Business Analytics", "Urban Design"],
    tags: ["綜合名校", "一年制碩士", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "倫敦市區綜合型名校，科系選擇多元，商管與工程學程國際生熱門。",
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
    requirements: { gpa: "3.4", toefl: "100", ielts: "7.0" },
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
    requirements: { gpa: "3.3", toefl: "97", ielts: "6.5" },
    programs: ["Computer Science", "Data Science", "Forestry"],
    tags: ["移民友善", "風景宜人"],
    isPartner: true,
    isVerified: false,
    description: "溫哥華濱海校區，國際生友善，資料科學與環境相關學程具特色。",
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
    requirements: { gpa: "3.2", toefl: "94", ielts: "6.5" },
    programs: ["Information Technology", "Data Science", "Engineering"],
    tags: ["澳洲八大", "移民友善"],
    isPartner: false,
    isVerified: true,
    description: "澳洲八大之一，IT 與資料科學碩士兩年制，畢業後工作簽路徑明確。",
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
    tuitionRange: "€ 0 – 6,000 / 年 (公立)",
    requirements: { gpa: "3.0", toefl: "88", ielts: "6.5" },
    programs: ["Informatics", "Data Engineering", "Mechanical Engineering"],
    tags: ["低學費", "理工強校", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "德國理工頂尖，公立大學學費極低，英授碩士學程逐年增加。",
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
    requirements: { gpa: "3.5", toefl: "100", ielts: "6.5" },
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
    requirements: { gpa: "—", toefl: "—", ielts: "—" },
    programs: ["General English", "IELTS 衝刺班", "升學銜接"],
    tags: ["遊學", "升學銜接", "合作院校"],
    isPartner: true,
    isVerified: true,
    description: "市中心語言學校，提供升學銜接與考試衝刺課程，可搭配寄宿家庭。",
  },
];

export const SCHOOL_COUNTRIES = ["全部", "美國", "英國", "加拿大", "澳洲", "德國", "新加坡"] as const;
export const SCHOOL_TYPES = ["全部", "研究所", "大學", "語言學校"] as const;

// ============================================================================
// 3) AI 落點分析 — 候選校(含 AI 給的基準機率與因子)
// ============================================================================

export interface PlacementSchool {
  id: string;
  name: string;
  chineseName: string;
  country: string;
  location: string;
  rank: number | null;
  tier: "dream" | "match" | "safety";
  baseProbability: number; // AI 給的基準錄取機率(0-100)
  reqGpa: string;
  reqToefl: string;
  /** 學術因子(0-10)，What-if 以此為基準做線性推估 */
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

/** AI 落點分析的預設輸入(寫死) */
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
  { name: "升學銜接課程 (Pathway)", pricePerWeek: 560, note: "可銜接合作大學" },
];

export interface EPAccommodation {
  id: string;
  name: string;
  pricePerWeek: number; // 外幣 / 週，0 = 不需住宿
  note: string;
}

export const EP_ACCOMMODATIONS: EPAccommodation[] = [
  { id: "none", name: "自行安排 / 不需住宿", pricePerWeek: 0, note: "" },
  { id: "homestay", name: "寄宿家庭 (含早晚餐)", pricePerWeek: 320, note: "沉浸式語言環境" },
  { id: "residence", name: "學生宿舍 (單人房)", pricePerWeek: 410, note: "近校區、獨立空間" },
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
  { id: "qp-1", icon: "🎓", label: "查歷屆", text: "有多少測試學生錄取美國 UCLA CS？背景如何？" },
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
      { id: "m2", role: "user", text: "有多少測試學生錄取美國 UCLA CS？背景如何？", time: "09:13" },
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

/** 送出訊息後 append 的罐頭回覆(輪流取用，避免亂數) */
export const AI_CANNED_REPLIES: string[] = [
  "收到！這是 Demo 環境的示意回覆。實際版本會即時查詢院校庫與歷屆榜單後回答。",
  "已為您整理重點：可至「AI 落點分析」輸入學生條件，取得 Dream / Match / Safety 三檔建議。",
  "建議搭配「常用院校資料庫」交叉比對排名、學費與語言門檻，再決定最終選校清單。",
];

// ============================================================================
// 6) 歷屆榜單(精簡表格)
// ============================================================================

export interface RankingRow {
  id: string;
  student: string;
  year: string;
  country: string;
  school: string;
  program: string;
  gpa: string;
  toefl: string;
  result: "錄取" | "備取" | "婉拒";
}

export const RANKING_YEARS = ["全部", "2025", "2024", "2023"] as const;

export const RANKING_ROWS: RankingRow[] = [
  { id: "r-1", student: "測試學生 A", year: "2025", country: "美國", school: "UCLA", program: "Computer Science", gpa: "3.7", toefl: "106", result: "錄取" },
  { id: "r-2", student: "測試學生 B", year: "2025", country: "英國", school: "UCL", program: "Business Analytics", gpa: "3.5", toefl: "98", result: "錄取" },
  { id: "r-3", student: "測試學生 C", year: "2025", country: "加拿大", school: "University of Toronto", program: "Applied Computing", gpa: "3.6", toefl: "101", result: "錄取" },
  { id: "r-4", student: "測試學生 D", year: "2024", country: "美國", school: "Carnegie Mellon", program: "Machine Learning", gpa: "3.8", toefl: "110", result: "備取" },
  { id: "r-5", student: "測試學生 E", year: "2024", country: "澳洲", school: "University of Melbourne", program: "Information Technology", gpa: "3.3", toefl: "92", result: "錄取" },
  { id: "r-6", student: "測試學生 F", year: "2024", country: "德國", school: "TU Munich", program: "Informatics", gpa: "3.2", toefl: "90", result: "錄取" },
  { id: "r-7", student: "測試學生 G", year: "2023", country: "英國", school: "Imperial College", program: "Computing", gpa: "3.6", toefl: "104", result: "婉拒" },
  { id: "r-8", student: "測試學生 H", year: "2023", country: "新加坡", school: "NUS", program: "Business Analytics", gpa: "3.7", toefl: "103", result: "錄取" },
  { id: "r-9", student: "測試學生 I", year: "2023", country: "美國", school: "UCLA", program: "Data Science", gpa: "3.5", toefl: "99", result: "備取" },
];

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
  { id: "c-1", name: "測試學員 甲", consultant: "顧問 A", destination: "加拿大 · 溫哥華", program: "General English 24 週", stage: "諮詢中", amount: "—", updatedAt: "2025-06-16" },
  { id: "c-2", name: "測試學員 乙", consultant: "顧問 B", destination: "英國 · 倫敦", program: "IELTS 衝刺 12 週", stage: "諮詢中", amount: "—", updatedAt: "2025-06-15" },
  { id: "c-3", name: "測試學員 丙", consultant: "顧問 A", destination: "馬爾他", program: "General English 16 週", stage: "報價中", amount: "NT$ 198,000", updatedAt: "2025-06-15" },
  { id: "c-4", name: "測試學員 丁", consultant: "顧問 C", destination: "澳洲 · 布里斯本", program: "升學銜接 30 週", stage: "報價中", amount: "NT$ 412,000", updatedAt: "2025-06-14" },
  { id: "c-5", name: "測試學員 戊", consultant: "顧問 B", destination: "加拿大 · 多倫多", program: "Intensive 20 週", stage: "已報名", amount: "NT$ 286,000", updatedAt: "2025-06-12" },
  { id: "c-6", name: "測試學員 己", consultant: "顧問 D", destination: "愛爾蘭 · 都柏林", program: "General English 12 週", stage: "出發前", amount: "NT$ 156,000", updatedAt: "2025-06-10" },
  { id: "c-7", name: "測試學員 庚", consultant: "顧問 C", destination: "英國 · 倫敦", program: "Pathway 36 週", stage: "已出發", amount: "NT$ 520,000", updatedAt: "2025-06-02" },
];

// ============================================================================
// 8) 使用量監測(StatCard + 簡表)
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

/** 近 7 日活躍量(給 recharts 折線圖，寫死) */
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
