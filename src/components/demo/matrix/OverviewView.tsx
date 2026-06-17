"use client";

import { useState } from "react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, BarChart,
} from "recharts";
import {
  Users, TrendingUp, DollarSign, ShieldCheck, Sparkles,
  PieChart as PieIcon, Activity, BarChart3, LineChart as LineIcon, RotateCw,
  type LucideIcon,
} from "lucide-react";
import { PageContainer, Card, ProgressBar } from "@/components/demo/primitives";
import { FlipCard } from "@/components/demo/widgets";
import { type YearData, MATRIX_PALETTE } from "@/data/demo/matrix";

const wan = (n: number) => `$ ${(n / 10000).toFixed(1)} 萬`;
const wanInt = (n: number) => `$ ${Math.round(n / 10000).toLocaleString()} 萬`;

function Inline({ value, pp = false }: { value: number; pp?: boolean }) {
  const positive = value >= 0;
  return (
    <span className={`font-bold ${positive ? "text-emerald-600" : "text-rose-600"}`}>
      {positive ? "▲" : "▼"}
      {Math.abs(value).toFixed(1)}
      {pp ? " 個百分點" : "%"}
    </span>
  );
}

/** KPI 翻轉卡：正面為數字卡（沿用 StatCard 視覺），背面為口徑/拆分補充。 */
function KpiFlip({
  icon: Icon,
  label,
  value,
  delta,
  hint,
  accentClass = "text-ink",
  backTitle,
  backRows,
  backNote,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  hint: string;
  accentClass?: string;
  backTitle: string;
  backRows: { k: string; v: string }[];
  backNote: string;
}) {
  const front = (
    <div className="relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-ink-muted">{label}</span>
        <Icon className="h-4 w-4 text-slate-400" />
      </div>
      <div className={`mt-2 text-2xl font-bold tabular ${accentClass}`}>{value}</div>
      <div className="mt-1 flex items-center gap-2">
        {delta && (
          <span
            className={`rounded px-1.5 py-0.5 text-xs font-semibold ${
              delta.positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            }`}
          >
            {delta.value}
          </span>
        )}
        <span className="text-xs text-ink-muted">{hint}</span>
      </div>
      <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-medium text-slate-300">
        <RotateCw className="h-3 w-3" /> 點擊翻轉
      </span>
    </div>
  );
  const back = (
    <div className="flex h-full flex-col rounded-xl border border-matrix-rose/30 bg-gradient-to-br from-rose-50 to-orange-50 p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-matrix-rose">{backTitle}</p>
      <div className="mt-2 flex-1 space-y-1.5">
        {backRows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-2 text-[13px]">
            <span className="shrink-0 text-ink-muted">{r.k}</span>
            <span className="text-right font-semibold text-ink-soft">{r.v}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 border-t border-rose-200/60 pt-2 text-[10.5px] leading-snug text-ink-muted">
        {backNote}
      </p>
    </div>
  );
  return <FlipCard front={front} back={back} minHeight={150} />;
}

export function OverviewView({ data }: { data: YearData }) {
  const [conversionMode, setConversionMode] = useState<"conversion" | "revenue">("conversion");
  const [demoMode, setDemoMode] = useState<"pie" | "radar">("pie");
  const { summary, kpi, monthlyStats, demographics, countryStats, packages } = data;

  const maxPkg = packages[0]?.count || 1;
  const sortedDemo = [...demographics].sort((a, b) => b.count - a.count);

  // 年度 B2C / B2B 拆分（由月度序列彙總，寫死資料、可重現）
  const b2cTotal = monthlyStats.reduce((a, m) => a + m.b2cStudentRevenue, 0);
  const b2bTotal = monthlyStats.reduce((a, m) => a + m.b2bCommissionRevenue, 0);
  const b2bShare = kpi.totalRevenue > 0 ? (b2bTotal / kpi.totalRevenue) * 100 : 0;
  const avgDeal = kpi.totalSales > 0 ? kpi.totalRevenue / kpi.totalSales : 0;
  const peakMonth = [...monthlyStats].sort((a, b) => b.revenue - a.revenue)[0];
  const peakConvMonth = [...monthlyStats].sort((a, b) => b.conversionRate - a.conversionRate)[0];
  const avgConsultPerMonth = Math.round(kpi.totalConsultations / 12);

  return (
    <PageContainer className="space-y-6">
      {/* ── 本月焦點摘要帶 ── */}
      <div className="rounded-xl border border-rose-100 bg-gradient-to-r from-rose-50 to-orange-50 p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Sparkles className="h-4 w-4 text-matrix-rose" />
          <span className="text-sm font-bold text-ink-soft">本月焦點</span>
          <span className="text-xs text-ink-muted">資料月份：{summary.monthLabel}</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-600">
            旺季高峰
          </span>
        </div>
        <p className="mb-4 text-base font-semibold text-ink">{summary.headline}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white/70 p-3">
            <p className="mb-1 text-xs text-ink-muted">本月總營收</p>
            <p className="text-lg font-bold text-ink">{wan(summary.revenue)}</p>
            <p className="mt-1 whitespace-nowrap text-xs text-ink-muted">
              較去年同期 <Inline value={summary.revenueYoY} />
              <span className="mx-1.5 text-slate-300">·</span>
              較上月 <Inline value={summary.revenueMoM} />
            </p>
            <p className="mt-0.5 whitespace-nowrap text-[11px] text-ink-muted">
              B2C 學收 {wan(summary.b2c)}・B2B 回傭 {wan(summary.b2b)}
            </p>
          </div>
          <div className="rounded-lg bg-white/70 p-3">
            <p className="mb-1 text-xs text-ink-muted">本月簽約轉換率</p>
            <p className="text-lg font-bold text-ink">{summary.conversionRate.toFixed(1)}%</p>
            <p className="mt-1 whitespace-nowrap text-xs text-ink-muted">
              較去年同期 <Inline value={summary.conversionYoY} pp />
              <span className="mx-1.5 text-slate-300">·</span>
              較上月 <Inline value={summary.conversionMoM} pp />
            </p>
          </div>
          <div className="rounded-lg bg-white/70 p-3">
            <p className="mb-1 text-xs text-ink-muted">本年度最強招生來源</p>
            <p className="text-lg font-bold text-ink">{summary.topSource}</p>
            <p className="mt-1 text-xs text-ink-muted">本年度營收 {wan(summary.topSourceRevenue)}</p>
            <p className="mt-0.5 text-[11px] text-ink-muted">
              成交 {summary.topSourceSales} 筆・轉換率 {summary.topSourceConv.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* ── 4 張 KPI(FlipCard：點擊翻轉看口徑與拆分)── */}
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-[11px] text-ink-muted">
          <RotateCw className="h-3 w-3 text-matrix-rose" />
          四張 KPI 皆可點擊翻轉，背面為 B2C/B2B 拆分、YoY/MoM 與口徑說明
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <KpiFlip
            icon={Users}
            label="本年度總諮詢"
            value={kpi.totalConsultations.toLocaleString()}
            delta={kpi.consultationsYoY ? { value: `▲ ${kpi.consultationsYoY}%`, positive: true } : undefined}
            hint="vs 去年同期"
            backTitle="諮詢量口徑"
            backRows={[
              { k: "月均諮詢", v: `${avgConsultPerMonth.toLocaleString()} 件` },
              { k: "全年成交", v: `${kpi.totalSales.toLocaleString()} 筆` },
              { k: "旺季高峰", v: `${peakMonth.month}・${peakMonth.consults} 件` },
              { k: "較去年同期", v: `▲ ${kpi.consultationsYoY}%` },
            ]}
            backNote="口徑：含四來源（洋碩/通路/網單/自招）所有進線諮詢，不去重。"
          />
          <KpiFlip
            icon={TrendingUp}
            label="簽約轉換率"
            value={`${kpi.conversionRate.toFixed(1)}%`}
            accentClass="text-matrix-rose"
            delta={kpi.conversionYoY ? { value: `▲ ${kpi.conversionYoY} pp`, positive: true } : undefined}
            hint={`成交 ${kpi.totalSales} 筆`}
            backTitle="轉換率拆分"
            backRows={[
              { k: "最高轉換月", v: `${peakConvMonth.month}・${peakConvMonth.conversionRate.toFixed(1)}%` },
              { k: "平均客單", v: wan(avgDeal) },
              { k: "YoY", v: `▲ ${kpi.conversionYoY} 個百分點` },
              { k: "標桿值", v: "25.0%" },
            ]}
            backNote="口徑：成交筆數 ÷ 實際諮詢數；標桿為內部年度目標線。"
          />
          <KpiFlip
            icon={DollarSign}
            label="總營收 （含回傭）"
            value={wanInt(kpi.totalRevenue)}
            delta={kpi.revenueYoY ? { value: `▲ ${kpi.revenueYoY}%`, positive: true } : undefined}
            hint={`B2B 回傭 ${kpi.commissionCount} 筆`}
            backTitle="B2C / B2B 拆分"
            backRows={[
              { k: "B2C 學費收入", v: `${wan(b2cTotal)}・${(100 - b2bShare).toFixed(0)}%` },
              { k: "B2B 通路回傭", v: `${wan(b2bTotal)}・${b2bShare.toFixed(0)}%` },
              { k: "最強月份", v: `${peakMonth.month}・${wan(peakMonth.revenue)}` },
              { k: "較去年同期", v: `▲ ${kpi.revenueYoY}%` },
            ]}
            backNote="口徑：B2C 為學生端簽約學費；B2B 為合作通路完成媒合後之回傭。"
          />
          <KpiFlip
            icon={ShieldCheck}
            label="有效單維護率"
            value={`${kpi.maintenanceRate.toFixed(1)}%`}
            delta={kpi.maintenanceYoY ? { value: `▲ ${kpi.maintenanceYoY} pp`, positive: true } : undefined}
            hint="表單填寫完整度"
            backTitle="維護品質口徑"
            backRows={[
              { k: "在庫有效單", v: `${kpi.internalStudentCount.toLocaleString()} 件` },
              { k: "B2B 回傭筆數", v: `${kpi.commissionCount} 筆` },
              { k: "YoY", v: `▲ ${kpi.maintenanceYoY} 個百分點` },
              { k: "判定門檻", v: "必填欄位 ≥ 90%" },
            ]}
            backNote="口徑：必填欄位（學歷/目標國/預算/時程）完整度達門檻者計為有效維護。"
          />
        </div>
      </div>

      {/* ── 月度轉換/營收 + 年級分佈 ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                {conversionMode === "conversion" ? (
                  <TrendingUp className="h-5 w-5 text-matrix-rose" />
                ) : (
                  <DollarSign className="h-5 w-5 text-matrix-rose" />
                )}
                {conversionMode === "conversion" ? "月度簽約轉換率分析" : "月度營收金額趨勢"}
              </h3>
              <p className="mt-0.5 text-xs text-ink-muted">
                {conversionMode === "conversion"
                  ? "諮詢/成交雙長條 + 轉換率折線（雙 Y 軸）"
                  : "B2C 學收 / B2B 回傭 / 總營收"}
              </p>
            </div>
            <div className="flex rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setConversionMode("conversion")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  conversionMode === "conversion"
                    ? "bg-white text-matrix-rose shadow-sm"
                    : "text-ink-muted hover:text-ink-soft"
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" /> 轉換率
              </button>
              <button
                type="button"
                onClick={() => setConversionMode("revenue")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  conversionMode === "revenue"
                    ? "bg-white text-matrix-rose shadow-sm"
                    : "text-ink-muted hover:text-ink-soft"
                }`}
              >
                <DollarSign className="h-3.5 w-3.5" /> 營收
              </button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {conversionMode === "conversion" ? (
                <ComposedChart data={monthlyStats} margin={{ top: 10, right: 8, bottom: 0, left: -8 }}>
                  <CartesianGrid stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#FF2D6C", fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    formatter={(value: number, name) => {
                      if (name === "轉換率") return [`${value.toFixed(1)}%`, name];
                      return [value, name];
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
                  <Bar yAxisId="left" dataKey="consults" name="諮詢數" fill="#cbd5e1" barSize={18} radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="sales" name="成交數" fill="#334155" barSize={18} radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversionRate"
                    name="轉換率"
                    stroke="#FF2D6C"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#fff", strokeWidth: 2, stroke: "#FF2D6C" }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              ) : (
                <ComposedChart data={monthlyStats} margin={{ top: 10, right: 8, bottom: 0, left: 8 }}>
                  <defs>
                    <linearGradient id="b2cG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#334155" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#334155" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(v) => `${(v / 10000).toFixed(0)}萬`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    formatter={(value: number, name) => [wan(value), name]}
                  />
                  <Legend wrapperStyle={{ paddingTop: 8, fontSize: 12 }} />
                  <Bar dataKey="b2bCommissionRevenue" name="B2B 回傭" stackId="a" fill="#FF9F29" barSize={20} />
                  <Bar dataKey="b2cStudentRevenue" name="B2C 學收" stackId="a" fill="#FF5C8D" barSize={20} radius={[4, 4, 0, 0]} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="總營收"
                    stroke="#FF2D6C"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#fff", strokeWidth: 2, stroke: "#FF2D6C" }}
                  />
                </ComposedChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 年級分佈 */}
        <Card className="flex flex-col">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-ink">消費者年級分佈</h3>
            <div className="flex rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setDemoMode("pie")}
                className={`rounded-md p-1.5 transition-all ${
                  demoMode === "pie" ? "bg-white text-matrix-rose shadow-sm" : "text-ink-muted"
                }`}
                aria-label="圓餅圖"
              >
                <PieIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDemoMode("radar")}
                className={`rounded-md p-1.5 transition-all ${
                  demoMode === "radar" ? "bg-white text-matrix-rose shadow-sm" : "text-ink-muted"
                }`}
                aria-label="雷達圖"
              >
                <Activity className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="min-h-[230px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              {demoMode === "pie" ? (
                <PieChart>
                  <Pie
                    data={sortedDemo}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={78}
                    paddingAngle={4}
                    dataKey="count"
                    nameKey="grade"
                  >
                    {sortedDemo.map((_, i) => (
                      <Cell key={i} fill={MATRIX_PALETTE[i % MATRIX_PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, _n, p: { payload?: { grade?: string } }) => [
                      `${value} 人`,
                      p.payload?.grade,
                    ]}
                    contentStyle={{ borderRadius: 8, border: "none", padding: "8px 12px" }}
                  />
                </PieChart>
              ) : (
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={demographics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="grade" tick={{ fontSize: 12, fill: "#64748b" }} />
                  <PolarRadiusAxis tick={false} axisLine={false} />
                  <Radar name="學生人數" dataKey="count" stroke="#FF2D6C" fill="#FF2D6C" fillOpacity={0.55} />
                  <Tooltip
                    formatter={(value: number, _n, p: { payload?: { grade?: string } }) => [
                      `${value} 人`,
                      p.payload?.grade,
                    ]}
                    contentStyle={{ borderRadius: 8, border: "none" }}
                  />
                </RadarChart>
              )}
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1.5">
            {sortedDemo.map((d, i) => (
              <div key={d.grade} className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: MATRIX_PALETTE[i % MATRIX_PALETTE.length] }}
                />
                {d.grade}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── 熱門國家 + 熱門方案 ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-5 flex items-center gap-2 text-base font-semibold text-ink">
            <LineIcon className="h-5 w-5 text-matrix-rose" />
            熱門留學國家 （申請意向）
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryStats} layout="vertical" margin={{ left: 16, right: 24, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={64}
                  tick={{ fontSize: 13, fill: "#475569" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#fff1f2" }}
                  contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  formatter={(value: number) => [`${value} 人`, "意向人數"]}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={26}>
                  {countryStats.map((_, i) => (
                    <Cell key={i} fill={MATRIX_PALETTE[i % MATRIX_PALETTE.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-base font-semibold text-ink">熱門銷售方案</h3>
          <div className="scrollbar-thin max-h-[280px] space-y-3 overflow-y-auto pr-1">
            {packages.map((pkg) => {
              const intensity = pkg.count / maxPkg;
              return (
                <div key={pkg.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="truncate font-medium text-ink-soft">{pkg.name}</span>
                    <span className="text-ink-muted">{pkg.count}</span>
                  </div>
                  <ProgressBar
                    value={intensity * 100}
                    className="bg-gradient-to-r from-matrix-orange to-matrix-rose"
                  />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
