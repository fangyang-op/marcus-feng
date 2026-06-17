"use client";

import { useMemo, useState } from "react";
import {
  Trophy,
  Users,
  Activity,
  ArrowUp,
  ArrowDown,
  Award,
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
  RANKING_COUNTRIES,
  RANKING_RESULTS,
  RANKING_SORTS,
  CRM_STUDENTS,
  CRM_STAGES,
  USAGE_STATS,
  USAGE_ROWS,
  USAGE_DAILY,
  type RankingSortKey,
} from "@/data/demo/nexus";

const NEXUS_TAB = "border-nexus-pink text-nexus-pink";

// ── 歷屆榜單(可篩選 + 排序表格)──────────────────────────────────
const RESULT_COLOR: Record<string, PillColor> = {
  錄取: "emerald",
  備取: "amber",
  婉拒: "rose",
};

export function RankingsView() {
  const [year, setYear] = useState<string>("全部");
  const [country, setCountry] = useState<string>("全部");
  const [result, setResult] = useState<string>("全部");
  const [sortKey, setSortKey] = useState<RankingSortKey>("year");
  const [sortAsc, setSortAsc] = useState(false); // 預設年度新→舊

  const setSort = (key: RankingSortKey) => {
    if (key === sortKey) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(false); // 年度/GPA/TOEFL 預設由高到低
    }
  };

  const rows = useMemo(() => {
    const filtered = RANKING_ROWS.filter((r) => {
      if (year !== "全部" && r.year !== year) return false;
      if (country !== "全部" && r.country !== country) return false;
      if (result !== "全部" && r.result !== result) return false;
      return true;
    });
    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "year") cmp = a.year.localeCompare(b.year);
      else if (sortKey === "gpa") cmp = parseFloat(a.gpa) - parseFloat(b.gpa);
      else cmp = parseInt(a.toefl, 10) - parseInt(b.toefl, 10);
      return sortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [year, country, result, sortKey, sortAsc]);

  const admitCount = rows.filter((r) => r.result === "錄取").length;

  return (
    <PageContainer>
      <PageTitle
        icon={Trophy}
        title="歷屆榜單查詢"
        subtitle="歷屆錄取資料(姓名已脫敏,全為示意假資料)"
      />

      {/* KPI 摘要 */}
      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="總筆數" value={`${RANKING_ROWS.length}`} hint="歷屆累計" />
        <StatCard label="篩選結果" value={`${rows.length}`} hint="符合條件" accentClass="text-nexus-pink" />
        <StatCard label="其中錄取" value={`${admitCount}`} hint="本篩選下" accentClass="text-emerald-600" />
        <StatCard label="涵蓋國家" value={`${RANKING_COUNTRIES.length - 1}`} hint="美英加澳德星" />
      </div>

      {/* 年度 Tabs */}
      <div className="mb-4">
        <Tabs
          items={RANKING_YEARS.map((y) => ({ key: y, label: y }))}
          value={year}
          onChange={setYear}
          accentClass={NEXUS_TAB}
        />
      </div>

      {/* 國家 / 結果 篩選 + 排序 */}
      <Card className="mb-4">
        <div className="space-y-2.5">
          <ChipRow label="國家" options={RANKING_COUNTRIES as readonly string[]} value={country} onChange={setCountry} />
          <ChipRow label="結果" options={RANKING_RESULTS as readonly string[]} value={result} onChange={setResult} />
          <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2.5">
            <span className="mr-1 w-8 text-xs font-bold text-ink-muted">排序</span>
            {RANKING_SORTS.map((opt) => {
              const active = sortKey === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSort(opt.key)}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    active
                      ? "border-nexus-pink bg-nexus-pink/10 text-nexus-pink"
                      : "border-slate-200 bg-white text-ink-soft hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                  {active && (sortAsc ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <Card padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-ink-muted">
                <th className="px-4 py-3">學生 / 原校系</th>
                <th className="px-4 py-3">年度</th>
                <th className="px-4 py-3">國家</th>
                <th className="px-4 py-3">錄取校</th>
                <th className="px-4 py-3">學程</th>
                <th className="px-4 py-3">GPA</th>
                <th className="px-4 py-3">TOEFL</th>
                <th className="px-4 py-3">獎學金</th>
                <th className="px-4 py-3">結果</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-rose-50/30">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-ink">{r.student}</div>
                    <div className="text-[11px] text-ink-muted">{r.major}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{r.year}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.country}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.school}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.program}</td>
                  <td className="px-4 py-3 font-mono text-ink-soft">{r.gpa}</td>
                  <td className="px-4 py-3 font-mono text-ink-soft">{r.toefl}</td>
                  <td className="px-4 py-3">
                    {r.scholarship === "—" ? (
                      <span className="text-ink-muted">—</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                        <Award className="h-3.5 w-3.5" />
                        {r.scholarship}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Pill color={RESULT_COLOR[r.result]}>{r.result}</Pill>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-sm text-ink-muted">
                    找不到符合條件的歷屆紀錄,請調整篩選。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}

function ChipRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 w-8 text-xs font-bold text-ink-muted">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            value === o
              ? "border-nexus-pink bg-nexus-pink/10 text-nexus-pink"
              : "border-slate-200 bg-white text-ink-soft hover:bg-slate-50"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
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

/** 由「NT$ 286,000」字串解析出數字,無金額(—)回傳 0 */
const parseAmount = (s: string) => {
  const n = parseInt(s.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
};

export function CrmView() {
  const total = CRM_STUDENTS.length;
  const closed = CRM_STUDENTS.filter(
    (s) => s.stage === "已報名" || s.stage === "出發前" || s.stage === "已出發",
  );
  const pipelineValue = CRM_STUDENTS.reduce((sum, s) => sum + parseAmount(s.amount), 0);
  const consultants = new Set(CRM_STUDENTS.map((s) => s.consultant)).size;

  return (
    <PageContainer>
      <PageTitle
        icon={Users}
        title="遊學學員 CRM"
        subtitle="依階段檢視學員(全為示意假資料)"
      />

      {/* KPI 摘要 */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="學員總數" value={`${total}`} hint="目前在管" />
        <StatCard
          label="已成交"
          value={`${closed.length}`}
          hint="已報名以後"
          accentClass="text-emerald-600"
        />
        <StatCard
          label="開單金額"
          value={`NT$ ${pipelineValue.toLocaleString("en-US")}`}
          hint="已報價總額"
          accentClass="text-nexus-pink"
        />
        <StatCard label="承辦顧問" value={`${consultants}`} hint="本看板涵蓋" />
      </div>

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
