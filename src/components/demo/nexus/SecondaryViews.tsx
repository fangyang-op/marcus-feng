"use client";

import { useMemo, useState } from "react";
import {
  Trophy,
  Users,
  Activity,
  Construction,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  PageContainer,
  PageTitle,
  Card,
  StatCard,
  Pill,
  Tabs,
  type PillColor,
} from "@/components/demo/primitives";
import {
  RANKING_ROWS,
  RANKING_YEARS,
  CRM_STUDENTS,
  CRM_STAGES,
  USAGE_STATS,
  USAGE_ROWS,
  USAGE_DAILY,
} from "@/data/demo/nexus";

const NEXUS_TAB = "border-nexus-pink text-nexus-pink";

// ── 歷屆榜單(可篩選表格)──────────────────────────────────────────
const RESULT_COLOR: Record<string, PillColor> = {
  錄取: "emerald",
  備取: "amber",
  婉拒: "rose",
};

export function RankingsView() {
  const [year, setYear] = useState<string>("全部");

  const rows = useMemo(
    () =>
      year === "全部"
        ? RANKING_ROWS
        : RANKING_ROWS.filter((r) => r.year === year),
    [year],
  );

  return (
    <PageContainer>
      <PageTitle
        icon={Trophy}
        title="歷屆榜單查詢"
        subtitle="歷屆錄取資料(全為示意假資料)"
      />

      <div className="mb-4">
        <Tabs
          items={RANKING_YEARS.map((y) => ({ key: y, label: y }))}
          value={year}
          onChange={setYear}
          accentClass={NEXUS_TAB}
        />
      </div>

      <Card padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-ink-muted">
                <th className="px-4 py-3">學生</th>
                <th className="px-4 py-3">年度</th>
                <th className="px-4 py-3">國家</th>
                <th className="px-4 py-3">學校</th>
                <th className="px-4 py-3">學程</th>
                <th className="px-4 py-3">GPA</th>
                <th className="px-4 py-3">TOEFL</th>
                <th className="px-4 py-3">結果</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-rose-50/30">
                  <td className="px-4 py-3 font-semibold text-ink">{r.student}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.year}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.country}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.school}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.program}</td>
                  <td className="px-4 py-3 font-mono text-ink-soft">{r.gpa}</td>
                  <td className="px-4 py-3 font-mono text-ink-soft">{r.toefl}</td>
                  <td className="px-4 py-3">
                    <Pill color={RESULT_COLOR[r.result]}>{r.result}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}

// ── 遊學學員 CRM(狀態看板)─────────────────────────────────────────
const STAGE_COLOR: Record<string, PillColor> = {
  諮詢中: "slate",
  報價中: "amber",
  已報名: "blue",
  出發前: "violet",
  已出發: "emerald",
};

export function CrmView() {
  return (
    <PageContainer>
      <PageTitle
        icon={Users}
        title="遊學學員 CRM"
        subtitle="依階段檢視學員(全為示意假資料)"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {CRM_STAGES.map((stage) => {
          const list = CRM_STUDENTS.filter((s) => s.stage === stage);
          return (
            <div key={stage} className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-ink">{stage}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-ink-soft">
                  {list.length}
                </span>
              </div>
              <div className="flex-1 space-y-2 rounded-xl bg-slate-50 p-2">
                {list.length === 0 && (
                  <div className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-xs text-ink-muted">
                    無學員
                  </div>
                )}
                {list.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-ink">{s.name}</span>
                      <Pill color={STAGE_COLOR[s.stage]}>{s.consultant}</Pill>
                    </div>
                    <div className="mt-1.5 text-xs text-ink-soft">{s.destination}</div>
                    <div className="text-[11px] text-ink-muted">{s.program}</div>
                    <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                      <span className="font-mono text-xs font-bold text-nexus-pink">
                        {s.amount}
                      </span>
                      <span className="text-[10px] text-ink-muted">{s.updatedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}

// ── 使用量監測(StatCard + 折線圖 + 表)───────────────────────────────
export function UsageView() {
  return (
    <PageContainer>
      <PageTitle
        icon={Activity}
        title="使用量監測"
        subtitle="平台功能使用概況(全為示意假資料)"
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {USAGE_STATS.map((s) => (
          <StatCard
            key={s.key}
            label={s.label}
            value={s.value}
            hint={s.hint}
            delta={{ value: s.delta, positive: s.positive }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold text-ink">近 7 日活躍量趨勢</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={USAGE_DAILY} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  name="活躍顧問"
                  stroke="#FF4B7D"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="aiRuns"
                  name="AI 分析次數"
                  stroke="#DF54E9"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padded={false} className="overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-sm font-bold text-ink">功能使用排行</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {USAGE_ROWS.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span className="text-ink-soft">{r.feature}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-ink">
                    {r.count.toLocaleString("en-US")}
                  </span>
                  <span
                    className={`w-12 text-right text-xs font-bold ${
                      r.trend.startsWith("↑") ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {r.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

// ── 通用佔位 view ────────────────────────────────────────────────
export function PlaceholderView({ title }: { title: string }) {
  return (
    <PageContainer>
      <PageTitle title={title} />
      <Card className="flex flex-col items-center justify-center py-16 text-center">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-nexus-pink/10 text-nexus-pink">
          <Construction className="h-8 w-8" />
        </span>
        <h3 className="text-lg font-bold text-ink">此頁於 Demo 中簡化呈現</h3>
        <p className="mt-2 max-w-md text-sm text-ink-muted">
          完整功能屬內部產品。本作品集著重重建核心高光頁面的 UI 骨架與互動,
          其餘次要頁面以佔位呈現。
        </p>
      </Card>
    </PageContainer>
  );
}
