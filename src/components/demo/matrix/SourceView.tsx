"use client";

import { useState, useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar,
} from "recharts";
import { Target, ArrowRightLeft, TrendingUp, Share2 } from "lucide-react";
import { PageContainer, Card, PageTitle } from "@/components/demo/primitives";
import { type YearData, SOURCE_COLORS } from "@/data/demo/matrix";

const SOURCE_ORDER = ["洋碩", "通路", "網單", "自招"];

function Diff({ value, pct = false }: { value: number; pct?: boolean }) {
  if (value === 0)
    return <span className="ml-1 rounded bg-slate-100 px-1 text-[10px] font-medium text-slate-500">0</span>;
  const positive = value > 0;
  return (
    <span
      className={`ml-1 rounded px-1 text-[10px] font-medium ${
        positive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
      }`}
    >
      {positive ? "+" : ""}
      {value}
      {pct ? "pp" : ""}
    </span>
  );
}

export function SourceView({ data, year }: { data: YearData; year: string }) {
  const [trendMetric, setTrendMetric] = useState<"sales" | "revenue">("sales");
  const sources = data.sources;

  const totalConsults = sources.reduce((a, s) => a + s.consults, 0);
  const totalSales = sources.reduce((a, s) => a + s.sales, 0);
  const totalConv = totalConsults > 0 ? (totalSales / totalConsults) * 100 : 0;

  const pieData = sources.map((s) => ({ name: s.sourceName, value: s.sales, conv: s.conversionRate }));
  const barData = sources.map((s) => ({ name: s.sourceName, 諮詢: s.consults, 成交: s.sales }));

  const areaData = useMemo(() => {
    return data.monthlyStats.map((_, i) => {
      const row: Record<string, number | string> = { month: data.monthlyStats[i].month };
      sources.forEach((s) => {
        row[s.sourceName] = trendMetric === "sales" ? s.monthly[i].sales : s.monthly[i].revenue;
      });
      return row;
    });
  }, [data.monthlyStats, sources, trendMetric]);

  return (
    <PageContainer className="space-y-6">
      <PageTitle icon={Share2} title="來源績效統計" subtitle="分析各招生管道的諮詢與成交轉化表現" />

      {/* 三張總計卡 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Card className="bg-gradient-to-br from-indigo-50 to-violet-50">
          <p className="text-xs font-medium text-indigo-600">總諮詢數</p>
          <p className="mt-1 text-2xl font-bold text-indigo-700">{totalConsults.toLocaleString()}</p>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50">
          <p className="text-xs font-medium text-emerald-600">總成交數</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{totalSales.toLocaleString()}</p>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
          <p className="text-xs font-medium text-amber-600">整體轉化率</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{totalConv.toFixed(1)}%</p>
        </Card>
      </div>

      {/* 四張來源轉換卡 */}
      <div>
        <h3 className="mb-1 text-lg font-bold text-ink">各來源諮詢轉換分析</h3>
        <p className="mb-4 text-sm text-ink-muted">{year} 年度總覽・含去年同期 diff 徽章</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sources.map((s) => {
            const convRate = s.consults > 0 ? (s.sales / s.consults) * 100 : 0;
            return (
              <Card key={s.sourceName} padded={false} className="overflow-hidden">
                <div className="px-4 pt-4">
                  <div
                    className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 text-lg font-bold text-ink-soft"
                  >
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ background: SOURCE_COLORS[s.sourceName] }}
                    />
                    {s.sourceName}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-ink-muted">分配名單數</div>
                      <div className="flex items-center text-lg font-semibold text-ink">
                        {s.assigned}
                        <Diff value={s.assignedDiff} />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted">有效名單數</div>
                      <div className="text-lg font-semibold text-ink">{s.invited}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted">實際諮詢數</div>
                      <div className="text-lg font-semibold text-ink">{s.consults}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted">有效名單率</div>
                      <div className="text-lg font-bold text-matrix-rose">{s.inviteRate.toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <span className="mr-1.5 text-xs text-ink-muted">成交</span>
                      <span className="font-bold text-ink-soft">{s.sales}</span>
                      <Diff value={s.salesDiff} />
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-1.5 text-xs text-ink-muted">轉化率</span>
                      <span className="font-bold text-ink-soft">{convRate.toFixed(1)}%</span>
                      <Diff value={s.convDiff} pct />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-slate-200/70 pt-2">
                    <span className="text-xs text-ink-muted">營收產值</span>
                    <span className="font-bold text-emerald-600">$ {(s.revenue / 10000).toFixed(1)} 萬</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 圓餅 + 長條 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 flex items-center gap-2 font-bold text-ink">
            <Target className="h-5 w-5 text-violet-500" /> 來源佔比 (成交件數)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={58} outerRadius={98} paddingAngle={3} dataKey="value" stroke="none">
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={SOURCE_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "none" }}
                  formatter={(v: number, n, p: { payload?: { conv?: number } }) => [
                    `${v} 筆(轉化率 ${(p.payload?.conv ?? 0).toFixed(1)}%)`,
                    n,
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 flex items-center gap-2 font-bold text-ink">
            <ArrowRightLeft className="h-5 w-5 text-teal-500" /> 諮詢 vs 成交 轉化分析
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barCategoryGap="22%">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#cbd5e1" }} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#cbd5e1" }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                <Bar dataKey="諮詢" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="成交" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 月度面積趨勢 */}
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 font-bold text-ink">
            <TrendingUp className="h-5 w-5 text-matrix-orange" /> 年度月度趨勢圖
          </h3>
          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setTrendMetric("sales")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                trendMetric === "sales" ? "bg-white text-matrix-rose shadow-sm" : "text-ink-muted"
              }`}
            >
              成交件數
            </button>
            <button
              type="button"
              onClick={() => setTrendMetric("revenue")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                trendMetric === "revenue" ? "bg-white text-matrix-rose shadow-sm" : "text-ink-muted"
              }`}
            >
              營收金額
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                {SOURCE_ORDER.map((s) => (
                  <linearGradient key={s} id={`grad-${s}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={SOURCE_COLORS[s]} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={SOURCE_COLORS[s]} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#cbd5e1" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#cbd5e1" }}
                tickFormatter={(v) => (trendMetric === "revenue" ? `${(v / 10000).toFixed(0)}萬` : `${v}`)}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
                formatter={(v: number, n) => [
                  trendMetric === "revenue" ? `$${(v / 10000).toFixed(1)}萬` : v,
                  n,
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              {SOURCE_ORDER.map((s) => (
                <Area
                  key={s}
                  type="monotone"
                  dataKey={s}
                  stroke={SOURCE_COLORS[s]}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#grad-${s})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </PageContainer>
  );
}
