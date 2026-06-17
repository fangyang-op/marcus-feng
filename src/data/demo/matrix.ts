/**
 * ── Matrix 營運數據分析中心 — Demo 假資料 ─────────────────────────
 * 全部寫死成固定常數，不使用亂數或當下時間，避免 SSR / hydration 不一致。
 * 三個年度 (2024 / 2025 / 2026) 各一份，YoY 漸增以便圖表好看。
 * 所有名稱皆為中性假名(顧問 A~L / 北一區~南一區 / 測試方案)，不含任何真實資料。
 */

export type MatrixYear = "2024" | "2025" | "2026";
export const MATRIX_YEARS: MatrixYear[] = ["2024", "2025", "2026"];

export const MONTHS = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
] as const;

/** 圖表調色盤(玫紅橙為主) */
export const MATRIX_PALETTE = [
  "#FF2D6C", "#FF5C8D", "#FF9F29", "#FFB761",
  "#6366f1", "#14b8a6", "#10b981", "#94a3b8",
];

/** 四個來源固定色(通用業務術語) */
export const SOURCE_COLORS: Record<string, string> = {
  洋碩: "#6366f1",
  通路: "#14b8a6",
  網單: "#f59e0b",
  自招: "#ec4899",
};

// ───────────────────────── 型別 ─────────────────────────

export interface MonthlyMetric {
  month: string;
  consults: number;
  sales: number;
  conversionRate: number;
  revenue: number;
  b2cStudentRevenue: number;
  b2bCommissionRevenue: number;
}

export interface SummaryFocus {
  monthLabel: string;
  revenue: number;
  b2c: number;
  b2b: number;
  revenueYoY: number; // %
  revenueMoM: number; // %
  conversionRate: number;
  conversionYoY: number; // 百分點
  conversionMoM: number; // 百分點
  topSource: string;
  topSourceRevenue: number;
  topSourceSales: number;
  topSourceConv: number;
  headline: string;
}

export interface Kpi {
  totalConsultations: number;
  conversionRate: number;
  totalRevenue: number;
  commissionCount: number;
  commissionRevenue: number;
  maintenanceRate: number;
  internalStudentCount: number;
  totalSales: number;
  // YoY
  consultationsYoY: number; // %
  conversionYoY: number; // 百分點
  revenueYoY: number; // %
  maintenanceYoY: number; // 百分點
}

export interface NameCount {
  name: string;
  count: number;
}
export interface GradeCount {
  grade: string;
  count: number;
}
export interface PackageItem {
  name: string;
  count: number;
}

export interface RegionRate {
  name: string;
  actual: number; // 萬
  target: number; // 萬
  headcount: number;
}

export interface ConsultantRow {
  name: string;
  region: string;
  status: "active" | "inactive" | "on_leave";
  hireDate: string; // 寫死字串，如 "2021-03-15"
  consults: number;
  sales: number;
  conversionRate: number;
  totalRevenue: number; // 元
  revenueShare: number; // %
  avgProcessDays: number;
  tag: "star" | "warn" | "normal";
  targetRevenue: number; // 元
  funnel: { country: string; consults: number; sales: number }[];
  gradePerformance: { grade: string; consults: number; sales: number; conversion: number }[];
  monthlyTrends: { month: string; conversionRate: number; revenue: number }[];
}

export interface SourceStat {
  sourceName: string;
  assigned: number;
  invited: number;
  consults: number;
  sales: number;
  revenue: number;
  conversionRate: number;
  inviteRate: number;
  // diff (vs 去年同期，百分點 / 數量已預先算好)
  assignedDiff: number;
  salesDiff: number;
  convDiff: number;
  monthly: { month: string; sales: number; consults: number; revenue: number }[];
}

export interface ProductRow {
  productName: string;
  totalCount: number;
  totalRevenue: number; // 元
  monthly: { count: number; revenue: number }[]; // 12 個月
}

export interface YearData {
  kpi: Kpi;
  summary: SummaryFocus;
  monthlyStats: MonthlyMetric[];
  demographics: GradeCount[];
  countryStats: NameCount[];
  packages: PackageItem[];
  // 即時績效監控
  yearlyTarget: number; // 元
  yearlyActual: number; // 元
  monthlyTarget: number; // 元(焦點月目標)
  monthlyActual: number; // 元(焦點月實際)
  focusMonthLabel: string;
  regionRates: RegionRate[];
  // 顧問
  consultants: ConsultantRow[];
  // 來源
  sources: SourceStat[];
  // 產品熱力圖
  products: ProductRow[];
}

// ───────────────────────── 資料產生輔助 ─────────────────────────

const round1 = (n: number) => Math.round(n * 10) / 10;

/** 由固定的 12 個基礎權重 + 年度倍率，逐月寫出 monthlyStats(固定、可重現) */
function buildMonthly(
  consultsBase: number[],
  conv: number[], // 每月轉換率 %
  avgDeal: number[], // 每月平均客單(元)
  commissionShare: number[], // B2B 回傭佔總營收比例
): MonthlyMetric[] {
  return MONTHS.map((month, i) => {
    const consults = consultsBase[i];
    const sales = Math.round((consults * conv[i]) / 100);
    const revenue = sales * avgDeal[i];
    const b2bCommissionRevenue = Math.round(revenue * commissionShare[i]);
    const b2cStudentRevenue = revenue - b2bCommissionRevenue;
    return {
      month,
      consults,
      sales,
      conversionRate: round1(conv[i]),
      revenue,
      b2cStudentRevenue,
      b2bCommissionRevenue,
    };
  });
}

const REGIONS = ["北一區", "桃竹區", "中一區", "南一區"] as const;

// ───────────────────────── 2024 ─────────────────────────

const m2024 = buildMonthly(
  [120, 138, 165, 150, 142, 158, 175, 168, 190, 205, 188, 160],
  [16.5, 17.2, 18.0, 17.5, 16.8, 18.4, 19.0, 18.2, 19.5, 20.1, 18.8, 17.6],
  [142000, 138000, 145000, 140000, 139000, 148000, 150000, 146000, 152000, 158000, 149000, 144000],
  [0.18, 0.2, 0.16, 0.19, 0.21, 0.17, 0.15, 0.18, 0.16, 0.14, 0.19, 0.2],
);

const consultants2024: ConsultantRow[] = [
  // 北一區(5)
  buildConsultant("顧問 A", "北一區", "active", "2019-03-04", 318, 72, 8200000, 11.8, 38, "star"),
  buildConsultant("顧問 B", "北一區", "active", "2020-07-13", 286, 58, 6400000, 9.2, 44, "normal"),
  buildConsultant("顧問 C", "北一區", "on_leave", "2021-09-01", 198, 33, 3600000, 5.2, 61, "warn"),
  buildConsultant("顧問 M", "北一區", "active", "2022-02-21", 226, 45, 5000000, 7.2, 46, "normal"),
  buildConsultant("顧問 N", "北一區", "active", "2023-06-12", 172, 28, 2800000, 4.0, 57, "warn"),
  // 桃竹區(5)
  buildConsultant("顧問 D", "桃竹區", "active", "2019-11-18", 264, 55, 5900000, 8.5, 42, "normal"),
  buildConsultant("顧問 E", "桃竹區", "active", "2020-05-25", 232, 49, 5100000, 7.3, 47, "normal"),
  buildConsultant("顧問 F", "桃竹區", "active", "2022-08-08", 176, 27, 2900000, 4.2, 58, "warn"),
  buildConsultant("顧問 O", "桃竹區", "active", "2021-04-19", 248, 52, 5500000, 7.9, 44, "normal"),
  buildConsultant("顧問 P", "桃竹區", "on_leave", "2023-10-02", 158, 24, 2400000, 3.5, 60, "warn"),
  // 中一區(5)
  buildConsultant("顧問 G", "中一區", "active", "2018-09-10", 298, 66, 7200000, 10.4, 40, "star"),
  buildConsultant("顧問 H", "中一區", "active", "2020-01-15", 244, 48, 4900000, 7.1, 49, "normal"),
  buildConsultant("顧問 I", "中一區", "inactive", "2021-12-06", 152, 22, 2300000, 3.3, 66, "warn"),
  buildConsultant("顧問 Q", "中一區", "active", "2022-05-30", 232, 47, 5000000, 7.2, 45, "normal"),
  buildConsultant("顧問 R", "中一區", "active", "2023-03-27", 186, 32, 3100000, 4.5, 54, "warn"),
  // 南一區(5)
  buildConsultant("顧問 J", "南一區", "active", "2019-06-24", 271, 57, 6100000, 8.8, 43, "normal"),
  buildConsultant("顧問 K", "南一區", "active", "2020-10-09", 218, 43, 4400000, 6.3, 51, "normal"),
  buildConsultant("顧問 L", "南一區", "active", "2022-03-14", 188, 30, 3200000, 4.6, 55, "warn"),
  buildConsultant("顧問 S", "南一區", "active", "2021-07-21", 236, 49, 5200000, 7.5, 45, "normal"),
  buildConsultant("顧問 T", "南一區", "inactive", "2023-09-05", 162, 25, 2500000, 3.6, 59, "warn"),
];

// ───────────────────────── 2025 ─────────────────────────

const m2025 = buildMonthly(
  [142, 158, 188, 172, 166, 180, 198, 192, 218, 235, 212, 184],
  [17.8, 18.5, 19.4, 18.9, 18.2, 19.8, 20.6, 19.6, 21.2, 21.8, 20.2, 19.0],
  [150000, 146000, 154000, 149000, 148000, 158000, 161000, 156000, 163000, 169000, 159000, 153000],
  [0.19, 0.21, 0.17, 0.2, 0.22, 0.18, 0.16, 0.19, 0.17, 0.15, 0.2, 0.21],
);

const consultants2025: ConsultantRow[] = [
  // 北一區(5)
  buildConsultant("顧問 A", "北一區", "active", "2019-03-04", 372, 89, 10400000, 12.5, 34, "star"),
  buildConsultant("顧問 B", "北一區", "active", "2020-07-13", 334, 72, 8100000, 9.7, 40, "normal"),
  buildConsultant("顧問 C", "北一區", "active", "2021-09-01", 248, 45, 4900000, 5.9, 55, "normal"),
  buildConsultant("顧問 M", "北一區", "active", "2022-02-21", 286, 60, 6600000, 7.9, 42, "normal"),
  buildConsultant("顧問 N", "北一區", "active", "2023-06-12", 224, 39, 4000000, 4.8, 51, "warn"),
  // 桃竹區(5)
  buildConsultant("顧問 D", "桃竹區", "active", "2019-11-18", 312, 70, 7700000, 9.2, 38, "star"),
  buildConsultant("顧問 E", "桃竹區", "active", "2020-05-25", 278, 62, 6600000, 7.9, 43, "normal"),
  buildConsultant("顧問 F", "桃竹區", "active", "2022-08-08", 214, 36, 3800000, 4.6, 52, "warn"),
  buildConsultant("顧問 O", "桃竹區", "active", "2021-04-19", 296, 66, 7200000, 8.6, 40, "star"),
  buildConsultant("顧問 P", "桃竹區", "active", "2023-10-02", 208, 35, 3500000, 4.2, 53, "warn"),
  // 中一區(5)
  buildConsultant("顧問 G", "中一區", "active", "2018-09-10", 348, 82, 9300000, 11.1, 36, "star"),
  buildConsultant("顧問 H", "中一區", "active", "2020-01-15", 290, 61, 6300000, 7.6, 45, "normal"),
  buildConsultant("顧問 I", "中一區", "on_leave", "2021-12-06", 196, 31, 3200000, 3.8, 60, "warn"),
  buildConsultant("顧問 Q", "中一區", "active", "2022-05-30", 282, 60, 6500000, 7.8, 41, "normal"),
  buildConsultant("顧問 R", "中一區", "active", "2023-03-27", 232, 42, 4200000, 5.0, 49, "warn"),
  // 南一區(5)
  buildConsultant("顧問 J", "南一區", "active", "2019-06-24", 322, 74, 8000000, 9.6, 39, "star"),
  buildConsultant("顧問 K", "南一區", "active", "2020-10-09", 262, 54, 5500000, 6.6, 47, "normal"),
  buildConsultant("顧問 L", "南一區", "active", "2022-03-14", 228, 40, 4100000, 4.9, 50, "warn"),
  buildConsultant("顧問 S", "南一區", "active", "2021-07-21", 290, 63, 6800000, 8.1, 41, "star"),
  buildConsultant("顧問 T", "南一區", "active", "2023-09-05", 212, 36, 3600000, 4.3, 52, "warn"),
];

// ───────────────────────── 2026 ─────────────────────────

const m2026 = buildMonthly(
  [168, 186, 220, 202, 196, 212, 232, 226, 256, 274, 248, 216],
  [19.2, 20.0, 21.0, 20.4, 19.8, 21.4, 22.2, 21.2, 22.8, 23.5, 21.8, 20.6],
  [158000, 154000, 163000, 158000, 157000, 168000, 172000, 166000, 174000, 181000, 170000, 163000],
  [0.2, 0.22, 0.18, 0.21, 0.23, 0.19, 0.17, 0.2, 0.18, 0.16, 0.21, 0.22],
);

const consultants2026: ConsultantRow[] = [
  // 北一區(5)
  buildConsultant("顧問 A", "北一區", "active", "2019-03-04", 432, 108, 13200000, 13.0, 31, "star"),
  buildConsultant("顧問 B", "北一區", "active", "2020-07-13", 388, 89, 10100000, 10.0, 37, "star"),
  buildConsultant("顧問 C", "北一區", "active", "2021-09-01", 296, 58, 6300000, 6.2, 50, "normal"),
  buildConsultant("顧問 M", "北一區", "active", "2022-02-21", 344, 78, 8600000, 8.5, 39, "star"),
  buildConsultant("顧問 N", "北一區", "active", "2023-06-12", 268, 49, 5100000, 5.0, 48, "normal"),
  // 桃竹區(5)
  buildConsultant("顧問 D", "桃竹區", "active", "2019-11-18", 362, 86, 9700000, 9.6, 35, "star"),
  buildConsultant("顧問 E", "桃竹區", "active", "2020-05-25", 322, 76, 8300000, 8.2, 40, "normal"),
  buildConsultant("顧問 F", "桃竹區", "active", "2022-08-08", 252, 46, 4900000, 4.8, 48, "warn"),
  buildConsultant("顧問 O", "桃竹區", "active", "2021-04-19", 348, 82, 9200000, 9.1, 37, "star"),
  buildConsultant("顧問 P", "桃竹區", "active", "2023-10-02", 256, 47, 4700000, 4.6, 49, "normal"),
  // 中一區(5)
  buildConsultant("顧問 G", "中一區", "active", "2018-09-10", 404, 100, 11600000, 11.5, 33, "star"),
  buildConsultant("顧問 H", "中一區", "active", "2020-01-15", 338, 75, 7900000, 7.8, 42, "normal"),
  buildConsultant("顧問 I", "中一區", "active", "2021-12-06", 236, 42, 4300000, 4.3, 56, "warn"),
  buildConsultant("顧問 Q", "中一區", "active", "2022-05-30", 334, 74, 8100000, 8.0, 38, "star"),
  buildConsultant("顧問 R", "中一區", "active", "2023-03-27", 274, 50, 5100000, 5.0, 46, "normal"),
  // 南一區(5)
  buildConsultant("顧問 J", "南一區", "active", "2019-06-24", 376, 91, 10000000, 9.9, 36, "star"),
  buildConsultant("顧問 K", "南一區", "active", "2020-10-09", 306, 68, 7000000, 6.9, 44, "normal"),
  buildConsultant("顧問 L", "南一區", "active", "2022-03-14", 268, 51, 5200000, 5.1, 47, "normal"),
  buildConsultant("顧問 S", "南一區", "active", "2021-07-21", 344, 80, 8800000, 8.7, 38, "star"),
  buildConsultant("顧問 T", "南一區", "active", "2023-09-05", 256, 46, 4600000, 4.5, 49, "normal"),
];

// ───────────────────────── 顧問建構器 ─────────────────────────

function buildConsultant(
  name: string,
  region: string,
  status: ConsultantRow["status"],
  hireDate: string,
  consults: number,
  sales: number,
  totalRevenue: number,
  revenueShare: number,
  avgProcessDays: number,
  tag: ConsultantRow["tag"],
): ConsultantRow {
  const conversionRate = round1((sales / consults) * 100);
  // 國別漏斗(固定四國，依顧問成交量比例分配)
  const funnel = [
    { country: "美國", consults: Math.round(consults * 0.34), sales: Math.round(sales * 0.36) },
    { country: "英國", consults: Math.round(consults * 0.26), sales: Math.round(sales * 0.27) },
    { country: "澳洲", consults: Math.round(consults * 0.22), sales: Math.round(sales * 0.21) },
    { country: "加拿大", consults: Math.round(consults * 0.18), sales: Math.round(sales * 0.16) },
  ];
  // 學生年級分佈(固定五級)
  const gradeShares = [
    { grade: "高三", c: 0.3, s: 0.32 },
    { grade: "大四", c: 0.26, s: 0.27 },
    { grade: "研究生", c: 0.2, s: 0.19 },
    { grade: "在職", c: 0.16, s: 0.15 },
    { grade: "其他", c: 0.08, s: 0.07 },
  ];
  const gradePerformance = gradeShares.map((g) => {
    const gc = Math.round(consults * g.c);
    const gs = Math.round(sales * g.s);
    return { grade: g.grade, consults: gc, sales: gs, conversion: gc > 0 ? round1((gs / gc) * 100) : 0 };
  });
  // 月度趨勢(以年度轉換率 + 固定季節權重，逐月寫出)
  const seasonW = [0.86, 0.9, 1.04, 0.98, 0.94, 1.02, 1.08, 1.02, 1.12, 1.18, 1.06, 0.92];
  const monthlyTrends = MONTHS.map((month, i) => ({
    month,
    conversionRate: round1(conversionRate * seasonW[i]),
    revenue: Math.round((totalRevenue / 12) * seasonW[i]),
  }));
  // 顧問目標 = 實際 / 達成率(寫死的達成率，讓績效監控有差異)
  const achievement = tag === "star" ? 1.08 : tag === "warn" ? 0.72 : 0.91;
  const targetRevenue = Math.round(totalRevenue / achievement);
  return {
    name,
    region,
    status,
    hireDate,
    consults,
    sales,
    conversionRate,
    totalRevenue,
    revenueShare,
    avgProcessDays,
    tag,
    targetRevenue,
    funnel,
    gradePerformance,
    monthlyTrends,
  };
}

// ───────────────────────── 來源建構器 ─────────────────────────

function buildSources(yearMul: number): SourceStat[] {
  // 四來源的基礎(2024 基準)，乘上年度倍率
  const defs = [
    { sourceName: "洋碩", assigned: 980, inviteRate: 64, conv: 22.5, avgDeal: 168000, assignedDiff: 12, salesDiff: 9, convDiff: 1.4, w: 1.0 },
    { sourceName: "通路", assigned: 1240, inviteRate: 52, conv: 16.8, avgDeal: 152000, assignedDiff: 22, salesDiff: 14, convDiff: 0.8, w: 0.92 },
    { sourceName: "網單", assigned: 1680, inviteRate: 41, conv: 12.4, avgDeal: 138000, assignedDiff: 35, salesDiff: 11, convDiff: -0.6, w: 0.78 },
    { sourceName: "自招", assigned: 640, inviteRate: 58, conv: 19.6, avgDeal: 158000, assignedDiff: 8, salesDiff: 7, convDiff: 1.1, w: 1.04 },
  ];
  const seasonW = [0.84, 0.9, 1.06, 0.98, 0.92, 1.02, 1.1, 1.02, 1.14, 1.2, 1.04, 0.9];
  return defs.map((d) => {
    const assigned = Math.round(d.assigned * yearMul);
    const invited = Math.round((assigned * d.inviteRate) / 100);
    const consults = Math.round(invited * 0.78);
    const sales = Math.round((consults * d.conv) / 100);
    const revenue = sales * d.avgDeal;
    // 逐月拆分(固定季節權重 normalize)
    const wSum = seasonW.reduce((a, b) => a + b, 0);
    const monthly = MONTHS.map((month, i) => {
      const frac = seasonW[i] / wSum;
      return {
        month,
        sales: Math.round(sales * frac),
        consults: Math.round(consults * frac),
        revenue: Math.round(revenue * frac),
      };
    });
    return {
      sourceName: d.sourceName,
      assigned,
      invited,
      consults,
      sales,
      revenue,
      conversionRate: round1(d.conv),
      inviteRate: round1(d.inviteRate),
      assignedDiff: d.assignedDiff,
      salesDiff: d.salesDiff,
      convDiff: d.convDiff,
      monthly,
    };
  });
}

// ───────────────────────── 產品熱力圖建構器 ─────────────────────────

function buildProducts(yearMul: number): ProductRow[] {
  // 產品 × 12 月，固定逐月權重(數值越大底色越深)
  const defs: { name: string; base: number; avgDeal: number; w: number[] }[] = [
    { name: "全程留學規劃", base: 18, avgDeal: 188000, w: [0.7, 0.8, 1.2, 1.0, 0.9, 1.0, 1.3, 1.1, 1.4, 1.6, 1.2, 0.8] },
    { name: "名校申請方案", base: 14, avgDeal: 168000, w: [0.6, 0.7, 1.1, 1.0, 0.9, 1.1, 1.2, 1.0, 1.5, 1.7, 1.1, 0.7] },
    { name: "研究所衝刺包", base: 11, avgDeal: 152000, w: [0.9, 1.0, 1.3, 1.1, 0.8, 0.9, 1.0, 0.9, 1.2, 1.3, 1.0, 0.8] },
    { name: "語言考試保證班", base: 16, avgDeal: 86000, w: [1.1, 1.2, 1.3, 1.0, 0.9, 0.8, 0.7, 0.8, 1.0, 1.1, 1.0, 0.9] },
    { name: "海外實習銜接", base: 7, avgDeal: 128000, w: [0.5, 0.6, 0.9, 1.1, 1.3, 1.2, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5] },
    { name: "短期遊學營", base: 9, avgDeal: 64000, w: [0.4, 0.5, 0.7, 0.9, 1.4, 1.8, 1.9, 1.6, 0.9, 0.6, 0.5, 0.4] },
    { name: "簽證與文件代辦", base: 13, avgDeal: 38000, w: [0.8, 0.9, 1.1, 1.0, 1.0, 1.1, 1.2, 1.1, 1.3, 1.2, 1.0, 0.8] },
    { name: "職涯定位諮詢", base: 6, avgDeal: 42000, w: [0.9, 1.0, 1.1, 1.0, 0.9, 1.0, 1.0, 1.0, 1.1, 1.1, 1.0, 0.9] },
    { name: "獎學金申請輔導", base: 8, avgDeal: 58000, w: [0.6, 0.7, 1.0, 1.2, 1.3, 1.1, 0.9, 0.8, 1.0, 1.4, 1.5, 0.9] },
    { name: "海外住宿安排", base: 10, avgDeal: 32000, w: [0.5, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.5, 1.1, 0.8, 0.6, 0.5] },
  ];
  return defs.map((d) => {
    const monthly = d.w.map((w) => {
      const count = Math.round(d.base * w * yearMul);
      return { count, revenue: count * d.avgDeal };
    });
    const totalCount = monthly.reduce((a, m) => a + m.count, 0);
    const totalRevenue = monthly.reduce((a, m) => a + m.revenue, 0);
    return { productName: d.name, totalCount, totalRevenue, monthly };
  });
}

// ───────────────────────── 區域達成率建構器 ─────────────────────────

function buildRegionRates(consultants: ConsultantRow[]): RegionRate[] {
  const headcount: Record<string, number> = { 北一區: 0, 桃竹區: 0, 中一區: 0, 南一區: 0 };
  const actual: Record<string, number> = { 北一區: 0, 桃竹區: 0, 中一區: 0, 南一區: 0 };
  const target: Record<string, number> = { 北一區: 0, 桃竹區: 0, 中一區: 0, 南一區: 0 };
  consultants.forEach((c) => {
    headcount[c.region] += 1;
    actual[c.region] += c.totalRevenue;
    target[c.region] += c.targetRevenue;
  });
  return REGIONS.map((r) => ({
    name: r,
    actual: Math.round(actual[r] / 10000),
    target: Math.round(target[r] / 10000),
    headcount: headcount[r],
  }));
}

// ───────────────────────── 彙總每年 ─────────────────────────

function buildYear(
  monthly: MonthlyMetric[],
  consultants: ConsultantRow[],
  yearMul: number,
  kpiYoY: { consultations: number; conversion: number; revenue: number; maintenance: number },
  summary: { yoyRev: number; momRev: number; yoyConv: number; momConv: number },
  demographics: GradeCount[],
  countryStats: NameCount[],
  packages: PackageItem[],
  maintenanceRate: number,
  internalStudentCount: number,
  focusMonthIdx: number,
): YearData {
  const totalConsultations = monthly.reduce((a, m) => a + m.consults, 0);
  const totalSales = monthly.reduce((a, m) => a + m.sales, 0);
  const totalRevenue = monthly.reduce((a, m) => a + m.revenue, 0);
  const commissionRevenue = monthly.reduce((a, m) => a + m.b2bCommissionRevenue, 0);
  const conversionRate = round1((totalSales / totalConsultations) * 100);
  const commissionCount = Math.round(totalSales * 0.22);

  const sources = buildSources(yearMul);
  const topSource = [...sources].sort((a, b) => b.sales - a.sales)[0];

  const focus = monthly[focusMonthIdx];
  const summaryFocus: SummaryFocus = {
    monthLabel: focus.month,
    revenue: focus.revenue,
    b2c: focus.b2cStudentRevenue,
    b2b: focus.b2bCommissionRevenue,
    revenueYoY: summary.yoyRev,
    revenueMoM: summary.momRev,
    conversionRate: focus.conversionRate,
    conversionYoY: summary.yoyConv,
    conversionMoM: summary.momConv,
    topSource: topSource.sourceName,
    topSourceRevenue: topSource.revenue,
    topSourceSales: topSource.sales,
    topSourceConv: topSource.conversionRate,
    headline:
      summary.yoyRev >= 0
        ? `${focus.month}營收較去年同期成長 ${summary.yoyRev}%，招生動能維持正向`
        : `${focus.month}營收較去年同期下滑 ${Math.abs(summary.yoyRev)}%，建議檢視招生管道配置`,
  };

  const regionRates = buildRegionRates(consultants);
  const yearlyActual = totalRevenue;
  // 年度目標 = 各區目標總和
  const yearlyTarget = regionRates.reduce((a, r) => a + r.target, 0) * 10000;

  return {
    kpi: {
      totalConsultations,
      conversionRate,
      totalRevenue,
      commissionCount,
      commissionRevenue,
      maintenanceRate,
      internalStudentCount,
      totalSales,
      consultationsYoY: kpiYoY.consultations,
      conversionYoY: kpiYoY.conversion,
      revenueYoY: kpiYoY.revenue,
      maintenanceYoY: kpiYoY.maintenance,
    },
    summary: summaryFocus,
    monthlyStats: monthly,
    demographics,
    countryStats,
    packages,
    yearlyTarget,
    yearlyActual,
    monthlyTarget: Math.round((yearlyTarget / 12) * 1.02),
    monthlyActual: focus.revenue,
    focusMonthLabel: focus.month,
    regionRates,
    consultants,
    sources,
    products: buildProducts(yearMul),
  };
}

// ───────────────────────── 三年資料 ─────────────────────────

export const MATRIX_DATA: Record<MatrixYear, YearData> = {
  "2024": buildYear(
    m2024,
    consultants2024,
    1.0,
    { consultations: 0, conversion: 0, revenue: 0, maintenance: 0 },
    { yoyRev: 0, momRev: 8.4, yoyConv: 0, momConv: 1.3 },
    [
      { grade: "高三", count: 412 },
      { grade: "大四", count: 358 },
      { grade: "研究生", count: 246 },
      { grade: "在職", count: 188 },
      { grade: "其他", count: 96 },
    ],
    [
      { name: "美國", count: 486 },
      { name: "英國", count: 372 },
      { name: "澳洲", count: 288 },
      { name: "加拿大", count: 214 },
      { name: "其他", count: 132 },
    ],
    [
      { name: "全程留學規劃", count: 184 },
      { name: "名校申請方案", count: 152 },
      { name: "語言考試保證班", count: 138 },
      { name: "研究所衝刺包", count: 116 },
      { name: "簽證與文件代辦", count: 98 },
      { name: "短期遊學營", count: 74 },
    ],
    88.2,
    642,
    9, // 焦點月 = 10月
  ),
  "2025": buildYear(
    m2025,
    consultants2025,
    1.18,
    { consultations: 14.6, conversion: 1.2, revenue: 19.4, maintenance: 2.1 },
    { yoyRev: 16.8, momRev: 9.1, yoyConv: 1.4, momConv: 1.5 },
    [
      { grade: "高三", count: 486 },
      { grade: "大四", count: 422 },
      { grade: "研究生", count: 298 },
      { grade: "在職", count: 224 },
      { grade: "其他", count: 112 },
    ],
    [
      { name: "美國", count: 572 },
      { name: "英國", count: 438 },
      { name: "澳洲", count: 336 },
      { name: "加拿大", count: 252 },
      { name: "其他", count: 158 },
    ],
    [
      { name: "全程留學規劃", count: 218 },
      { name: "名校申請方案", count: 184 },
      { name: "語言考試保證班", count: 162 },
      { name: "研究所衝刺包", count: 138 },
      { name: "簽證與文件代辦", count: 118 },
      { name: "短期遊學營", count: 92 },
    ],
    90.3,
    758,
    9,
  ),
  "2026": buildYear(
    m2026,
    consultants2026,
    1.38,
    { consultations: 16.9, conversion: 1.1, revenue: 21.6, maintenance: 1.8 },
    { yoyRev: 18.5, momRev: 9.6, yoyConv: 1.3, momConv: 1.4 },
    [
      { grade: "高三", count: 568 },
      { grade: "大四", count: 496 },
      { grade: "研究生", count: 352 },
      { grade: "在職", count: 268 },
      { grade: "其他", count: 134 },
    ],
    [
      { name: "美國", count: 678 },
      { name: "英國", count: 512 },
      { name: "澳洲", count: 394 },
      { name: "加拿大", count: 296 },
      { name: "其他", count: 184 },
    ],
    [
      { name: "全程留學規劃", count: 258 },
      { name: "名校申請方案", count: 216 },
      { name: "語言考試保證班", count: 188 },
      { name: "研究所衝刺包", count: 162 },
      { name: "簽證與文件代辦", count: 138 },
      { name: "短期遊學營", count: 108 },
    ],
    92.1,
    892,
    9,
  ),
};

// ───────────────────────── AI 助理罐頭內容 ─────────────────────────

export const AI_SUGGESTED_QUESTIONS = [
  "今年營收與去年同期的差異，以及招生管道績效變動?",
  "哪一個招生管道的成交效率最高?下季預算該往哪投?",
  "今年營收有明顯的季節性波動嗎?預估全年總營收?",
  "用一句話總結:我們今年最核心的營運問題是什麼?",
];

export const AI_CANNED_REPLY: Record<string, string> = {
  default:
    "您好，我是 Matrix 數據決策助理。我可以為您分析各年度的營收數據，提供跨年度趨勢與策略建議。\n\n請從下方建議問題開始，或直接輸入您想了解的指標。",
  "今年營收與去年同期的差異，以及招生管道績效變動?":
    "**營收 YoY 摘要**\n\n- 本年度總營收較去年同期成長約 **18.5%**，動能維持正向。\n- 四大來源中，**洋碩** 與 **自招** 的成交轉化率最高(22.5% / 19.6%)，是營收主力。\n- **網單** 分配量最大但有效名單率偏低(41%)，建議優化名單品質而非單純加量。\n\n> 建議:把網單超量的預算，逐步移轉到自招與洋碩的深度經營。",
  "哪一個招生管道的成交效率最高?下季預算該往哪投?":
    "**管道效率排序(成交轉化率)**\n\n1. 洋碩 — 22.5%\n2. 自招 — 19.6%\n3. 通路 — 16.8%\n4. 網單 — 12.4%\n\n**下季預算建議**\n\n- 自招的單位成本最低且轉化高 → 加碼校園說明會與舊生推薦。\n- 洋碩維持現有投放，並提高有效名單跟進速度。",
  "今年營收有明顯的季節性波動嗎?預估全年總營收?":
    "**季節性觀察**\n\n- 旺季落在 **9–10 月**(開學前申請高峰)，諮詢量與營收同步衝高。\n- 淡季在 **1–2 月** 與年底 **12 月**。\n\n**全年預估**\n\n依目前每月軌跡線性外推，全年總營收可望落在歷史高點，YoY 約 +18~22%。",
  "用一句話總結:我們今年最核心的營運問題是什麼?":
    "**一句話總結**\n\n> 「進件量充足，但網單管道的有效名單率偏低，拖累整體轉化效率;核心課題是名單品質與跟進速度的優化。」",
};
