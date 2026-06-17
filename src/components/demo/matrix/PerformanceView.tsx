"use client";

import { Target, TrendingUp, Building2, Users, Flame } from "lucide-react";
import { PageContainer, Card, PageTitle } from "@/components/demo/primitives";
import { type YearData } from "@/data/demo/matrix";

const wan = (n: number) => `${Math.round(n / 10000).toLocaleString()}萬`;

function statusColor(rate: number) {
  if (rate >= 100) return { bar: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50" };
  if (rate >= 80) return { bar: "bg-amber-500", text: "text-amber-600", light: "bg-amber-50" };
  return { bar: "bg-rose-500", text: "text-rose-600", light: "bg-rose-50" };
}

/** 自繪 SVG 環形進度圖 */
function ProgressRing({ rate, size = 132, strokeWidth = 11 }: { rate: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(rate, 100) / 100) * circumference;
  const c = statusColor(rate);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size}>
        <circle
          className="text-slate-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={c.text}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.6s ease-in-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${c.text}`}>{rate.toFixed(0)}%</span>
        <span className="text-[11px] text-ink-muted">達成</span>
      </div>
    </div>
  );
}

export function PerformanceView({ data, year }: { data: YearData; year: string }) {
  const yearlyRate = Math.min((data.yearlyActual / data.yearlyTarget) * 100, 150);
  const monthlyRate = Math.min((data.monthlyActual / data.monthlyTarget) * 100, 150);
  const convRate = data.kpi.conversionRate;

  const consultantRows = data.consultants.map((c) => ({
    name: c.name,
    region: c.region,
    status: c.status,
    actual: c.totalRevenue,
    target: c.targetRevenue,
    rate: Math.min((c.totalRevenue / c.targetRevenue) * 100, 150),
  }));
  const orderOf = (s: string) => (s === "inactive" ? 2 : s === "on_leave" ? 1 : 0);
  const sortedRows = [...consultantRows].sort((a, b) => orderOf(a.status) - orderOf(b.status));

  const statusBadge = (s: string) => {
    if (s === "active") return null;
    const label = s === "inactive" ? "離職" : "留停";
    const cls = s === "inactive" ? "bg-slate-200 text-slate-500" : "bg-amber-100 text-amber-600";
    return <span className={`ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium ${cls}`}>{label}</span>;
  };

  return (
    <PageContainer className="space-y-6">
      <PageTitle icon={Flame} title="即時績效監控" subtitle={`${year} 年度營收達成率與各區、各顧問績效追蹤`} />

      {/* 年度 / 月度達成率 + 環形 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <div className="mb-5 flex items-center gap-2">
            <Target className="h-5 w-5 text-matrix-rose" />
            <h3 className="text-base font-semibold text-ink">年度績效達成率</h3>
          </div>
          <div className="mb-2 flex items-end justify-between">
            <div>
              <span className="text-4xl font-bold text-ink">{yearlyRate.toFixed(1)}%</span>
              <span className="ml-2 text-sm text-ink-muted">營收達成</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-ink-soft">{wan(data.yearlyActual)}</p>
              <p className="text-xs text-ink-muted">目標 {wan(data.yearlyTarget)}</p>
            </div>
          </div>
          <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-700 ${statusColor(yearlyRate).bar}`}
              style={{ width: `${Math.min(yearlyRate, 100)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between px-1 text-[10px] font-medium text-ink-muted">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <h3 className="text-base font-semibold text-ink">{data.focusMonthLabel} 績效達成率</h3>
          </div>
          <div className="mb-2 flex items-end justify-between">
            <div>
              <span className="text-4xl font-bold text-ink">{monthlyRate.toFixed(1)}%</span>
              <span className="ml-2 text-sm text-ink-muted">營收達成</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-ink-soft">{wan(data.monthlyActual)}</p>
              <p className="text-xs text-ink-muted">目標 {wan(data.monthlyTarget)}</p>
            </div>
          </div>
          <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-700 ${statusColor(monthlyRate).bar}`}
              style={{ width: `${Math.min(monthlyRate, 100)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between px-1 text-[10px] font-medium text-ink-muted">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <h3 className="mb-3 flex items-center gap-2 self-start text-base font-semibold text-ink">
            <Target className="h-5 w-5 text-matrix-rose" />
            年度成交轉換率
          </h3>
          <ProgressRing rate={(convRate / 25) * 100} />
          <p className="mt-3 text-center text-xs text-ink-muted">
            實際轉換率 <span className="font-bold text-matrix-rose">{convRate.toFixed(1)}%</span>・標桿 25%
          </p>
        </Card>
      </div>

      {/* 各區達成率四宮格 */}
      <Card>
        <div className="mb-5 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-indigo-500" />
          <h3 className="text-base font-semibold text-ink">各區績效達成率</h3>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-ink-muted">{year} 年度</span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.regionRates.map((r) => {
            const rate = Math.min((r.actual / r.target) * 100, 150);
            const c = statusColor(rate);
            return (
              <div key={r.name} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="text-lg font-bold text-ink-soft">{r.name}</div>
                    <div className="text-[11px] text-ink-muted">{r.headcount} 位顧問</div>
                  </div>
                  <div className={`text-xl font-bold ${c.text}`}>{rate.toFixed(0)}%</div>
                </div>
                <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${Math.min(rate, 100)}%` }} />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-ink-muted">達成 / 目標</span>
                  <span className="font-medium text-ink-soft">
                    {r.actual.toLocaleString()}萬 <span className="mx-0.5 text-slate-400">/</span>{" "}
                    {r.target.toLocaleString()}萬
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 顧問達成率表格 */}
      <Card padded={false}>
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
          <Users className="h-5 w-5 text-violet-500" />
          <h3 className="text-base font-semibold text-ink">個別顧問績效達成率</h3>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-ink-muted">{year} 年度</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 text-left text-sm font-semibold text-ink-soft">顧問</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-ink-soft">所屬區域</th>
                <th className="px-5 py-3 text-right text-sm font-semibold text-ink-soft">營收 / 目標</th>
                <th className="px-5 py-3 text-right text-sm font-semibold text-ink-soft">達成率</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((c) => {
                const rc = statusColor(c.rate);
                return (
                  <tr key={c.name} className="border-b border-slate-50 last:border-0">
                    <td className="px-5 py-3.5 font-medium text-ink">
                      {c.name}
                      {statusBadge(c.status)}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-muted">{c.region}</td>
                    <td className="px-5 py-3.5 text-right text-sm">
                      <span className="font-medium text-ink-soft">{wan(c.actual)}</span>
                      <span className="mx-1 text-slate-400">/</span>
                      <span className="text-xs text-ink-muted">{wan(c.target)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-3">
                        <div className="h-2 min-w-[90px] flex-1 rounded-full bg-slate-200">
                          <div
                            className={`h-2 rounded-full ${rc.bar}`}
                            style={{ width: `${Math.min(c.rate, 100)}%` }}
                          />
                        </div>
                        <span className={`w-12 text-right text-sm font-bold ${rc.text}`}>{c.rate.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
