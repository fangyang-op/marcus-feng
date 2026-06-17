"use client";

import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Cell,
} from "recharts";
import { Trophy, Map, TrendingUp, Target, Zap, AlertCircle, UserCog } from "lucide-react";
import { PageContainer, Card } from "@/components/demo/primitives";
import { type YearData, type ConsultantRow } from "@/data/demo/matrix";

type SortMode = "conversion" | "revenue";

export function ConsultantView({ data }: { data: YearData }) {
  const [sortMode, setSortMode] = useState<SortMode>("conversion");
  const [selectedName, setSelectedName] = useState<string>(data.consultants[0]?.name ?? "");

  const sorted = useMemo(() => {
    return [...data.consultants].sort((a, b) =>
      sortMode === "revenue" ? b.totalRevenue - a.totalRevenue : b.conversionRate - a.conversionRate,
    );
  }, [data.consultants, sortMode]);

  // keep selection valid for the current year
  const selected: ConsultantRow =
    data.consultants.find((c) => c.name === selectedName) ?? data.consultants[0];

  const maxRevenue = Math.max(...data.consultants.map((c) => c.totalRevenue));

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 左:排行榜 */}
        <div className="lg:col-span-4">
          <Card padded={false} className="flex h-full flex-col">
            <div className="space-y-3 border-b border-slate-100 bg-slate-50 p-4">
              <h3 className="flex items-center gap-2 text-base font-bold text-ink">
                <Trophy className="h-5 w-5 text-amber-500" />
                顧問績效排行榜
              </h3>
              <div className="flex rounded-lg bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setSortMode("conversion")}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    sortMode === "conversion" ? "bg-matrix-rose text-white" : "text-ink-muted hover:text-ink-soft"
                  }`}
                >
                  按轉換率
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode("revenue")}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    sortMode === "revenue" ? "bg-matrix-rose text-white" : "text-ink-muted hover:text-ink-soft"
                  }`}
                >
                  按總營收
                </button>
              </div>
            </div>
            <div className="scrollbar-thin max-h-[640px] flex-1 space-y-2 overflow-y-auto p-3">
              {sorted.map((c, idx) => {
                const active = selected?.name === c.name;
                const barWidth =
                  sortMode === "revenue"
                    ? Math.min(100, (c.totalRevenue / maxRevenue) * 100)
                    : Math.min(100, (c.conversionRate / 25) * 100);
                return (
                  <button
                    type="button"
                    key={c.name}
                    onClick={() => setSelectedName(c.name)}
                    className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                      active
                        ? "border-matrix-rose bg-rose-50 shadow-md"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-lg text-sm font-bold ${
                            idx < 3 ? "bg-amber-100 text-amber-600" : "bg-slate-200 text-ink-muted"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <span className="block font-bold text-ink">{c.name}</span>
                          <span className="text-[10px] uppercase text-ink-muted">{c.region}</span>
                        </div>
                      </div>
                      <span className={`text-base font-bold ${sortMode === "revenue" ? "text-emerald-600" : "text-matrix-rose"}`}>
                        {sortMode === "revenue"
                          ? `$${(c.totalRevenue / 10000).toFixed(0)}萬`
                          : `${c.conversionRate.toFixed(1)}%`}
                      </span>
                    </div>
                    <div className="mb-2 flex justify-between px-0.5 text-xs text-ink-muted">
                      <span>諮詢 {c.consults} / 成交 {c.sales}</span>
                      <span>佔比 {c.revenueShare.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${
                          idx < 5
                            ? "bg-gradient-to-r from-matrix-orange to-matrix-rose"
                            : "bg-gradient-to-r from-emerald-500 to-teal-500"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* 右:選定顧問詳情 */}
        {selected && (
          <div className="flex flex-col gap-6 lg:col-span-8">
            <div className="mb-1 flex items-center gap-2">
              <UserCog className="h-5 w-5 text-ink-soft" />
              <h2 className="text-lg font-bold text-ink">{selected.name}</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-ink-muted">{selected.region}</span>
            </div>

            {/* 3 張統計卡 */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <Card>
                <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">平均處理天數</div>
                <div className="mt-1 text-3xl font-bold text-ink">
                  {selected.avgProcessDays} <span className="text-sm font-normal text-ink-muted">天</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded bg-blue-50 px-2 py-1 text-xs text-blue-600">
                  <Target className="h-3 w-3" /> 標準 45 天
                </div>
              </Card>
              <Card>
                <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">GP 產值</div>
                <div className="mt-1 text-3xl font-bold text-ink">
                  ${(selected.totalRevenue / 10000).toFixed(1)} <span className="text-sm font-normal text-ink-muted">萬</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded bg-emerald-50 px-2 py-1 text-xs text-emerald-600">
                  <Zap className="h-3 w-3" /> 佔公司 {selected.revenueShare.toFixed(1)}%
                </div>
              </Card>
              <Card className="flex flex-col items-center justify-center text-center">
                {selected.tag === "warn" ? (
                  <>
                    <div className="mb-2 rounded-full bg-orange-100 p-3 text-orange-500">
                      <AlertCircle className="h-7 w-7" />
                    </div>
                    <div className="text-base font-bold text-orange-600">建議輔導</div>
                    <div className="mt-0.5 text-xs text-ink-muted">轉化率低或週期偏長</div>
                  </>
                ) : selected.tag === "star" ? (
                  <>
                    <div className="mb-2 rounded-full bg-amber-100 p-3 text-amber-600">
                      <Zap className="h-7 w-7" />
                    </div>
                    <div className="text-base font-bold text-amber-600">明星顧問</div>
                    <div className="mt-0.5 text-xs text-ink-muted">高產值且高效率</div>
                  </>
                ) : (
                  <>
                    <div className="mb-2 rounded-full bg-slate-100 p-3 text-ink-muted">
                      <Target className="h-7 w-7" />
                    </div>
                    <div className="text-base font-bold text-ink-soft">表現平穩</div>
                    <div className="mt-0.5 text-xs text-ink-muted">持續累積數據中</div>
                  </>
                )}
              </Card>
            </div>

            {/* 圖表 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                {/* 國別漏斗 */}
                <Card>
                  <h4 className="mb-4 flex items-center gap-2 font-bold text-ink-soft">
                    <Map className="h-5 w-5 text-matrix-rose" /> 國別轉化漏斗
                  </h4>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selected.funnel} layout="vertical" margin={{ left: 8, right: 12 }}>
                        <CartesianGrid stroke="#e2e8f0" horizontal={false} strokeDasharray="3 3" />
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="country"
                          type="category"
                          width={52}
                          tick={{ fill: "#475569", fontSize: 13, fontWeight: 600 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: "#f1f5f9" }}
                          contentStyle={{ borderRadius: 8, border: "none" }}
                          formatter={(v: number, n) => [v, n === "成交數" ? "成交" : "諮詢"]}
                        />
                        <Bar dataKey="consults" name="諮詢數" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={16} />
                        <Bar dataKey="sales" name="成交數" fill="#FF2D6C" radius={[0, 4, 4, 0]} barSize={16}>
                          {selected.funnel.map((_, i) => (
                            <Cell key={i} fillOpacity={0.85} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* 月度趨勢 */}
                <Card>
                  <h4 className="mb-4 flex items-center gap-2 font-bold text-ink-soft">
                    <TrendingUp className="h-5 w-5 text-emerald-500" /> 月度轉化率趨勢
                  </h4>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selected.monthlyTrends}>
                        <CartesianGrid stroke="#e2e8f0" vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis hide domain={[0, "auto"]} />
                        <Tooltip
                          contentStyle={{ borderRadius: 8, border: "none" }}
                          formatter={(v: number) => [`${v.toFixed(1)}%`, "轉化率"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="conversionRate"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* 雙層雷達 */}
              <Card className="flex flex-col">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-ink-soft">
                  <Target className="h-5 w-5 text-blue-500" /> 各學生年級諮詢／成交分佈
                </h4>
                <div className="min-h-[300px] flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="72%" data={selected.gradePerformance}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="grade" tick={{ fill: "#475569", fontSize: 13 }} />
                      <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={false} axisLine={false} />
                      <Radar name="諮詢" dataKey="consults" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.35} />
                      <Radar name="成交" dataKey="sales" stroke="#FF2D6C" fill="#FF2D6C" fillOpacity={0.55} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: "none" }}
                        formatter={(v: number, n, p: { payload?: { conversion?: number } }) =>
                          n === "成交"
                            ? [`${v} 筆(轉化率 ${(p.payload?.conversion ?? 0).toFixed(1)}%)`, "成交"]
                            : [`${v} 筆`, n]
                        }
                      />
                      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} iconSize={10} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
