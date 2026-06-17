"use client";

import { useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  Network, PieChart as PieIcon, TrendingUp, DollarSign, Users,
  Gauge, Crown, Layers,
} from "lucide-react";
import { PageContainer, PageTitle, StatCard } from "@/components/demo/primitives";
import { Card } from "@/components/demo/primitives";
import {
  MATRIX_DATA, MATRIX_YEARS, MATRIX_PALETTE, MONTHS,
  type MatrixYear, type YearData, type ConsultantRow,
} from "@/data/demo/matrix";

const REGIONS = ["北一區", "桃竹區", "中一區", "南一區"] as const;
type RegionName = (typeof REGIONS)[number];

const REGION_SUB: Record<string, string> = {
  北一區: "北部一區",
  桃竹區: "桃園新竹",
  中一區: "中部一區",
  南一區: "南部一區",
};

const wan = (n: number) => `$ ${(n / 10000).toFixed(0)} 萬`;
const wan1 = (n: number) => `$ ${(n / 10000).toFixed(1)} 萬`;

type Mode = "share" | "trend";

/** 取某區在某年度的在職顧問（營收 > 0 即納入計算） */
function consultantsOf(data: YearData, region: RegionName): ConsultantRow[] {
  return data.consultants.filter((c) => c.region === region);
}

export function OrgView({ data, year }: { data: YearData; year: MatrixYear }) {
  const [mode, setMode] = useState<Mode>("share");
  const [compareYoY, setCompareYoY] = useState(false);

  // ── 頂部 KPI ──────────────────────────────
  const totalRevenue = useMemo(
    () => data.consultants.reduce((a, c) => a + c.totalRevenue, 0),
    [data.consultants],
  );
  const headcount = data.consultants.length;
  const perCapita = headcount > 0 ? totalRevenue / headcount : 0;

  // 各區營收 → 找最高效區（人均產值最高）
  const regionStats = useMemo(() => {
    return REGIONS.map((r) => {
      const members = consultantsOf(data, r);
      const rev = members.reduce((a, c) => a + c.totalRevenue, 0);
      const headc = members.length;
      const active = members.filter((m) => m.status === "active").length;
      return { region: r, revenue: rev, headcount: headc, active, perCapita: headc > 0 ? rev / headc : 0 };
    });
  }, [data]);

  const topRegion = useMemo(
    () => [...regionStats].sort((a, b) => b.perCapita - a.perCapita)[0],
    [regionStats],
  );

  return (
    <PageContainer className="space-y-6">
      <PageTitle
        icon={Network}
        title="組織人效統計"
        subtitle={`四大區 × ${headcount} 位顧問的營收結構與人效分析（${year} 年度）`}
        right={
          <div className="flex items-center gap-2">
            {/* 全域 toggle:營收佔比 ↔ 月度趨勢 */}
            <div className="flex rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setMode("share")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  mode === "share" ? "bg-white text-matrix-rose shadow-sm" : "text-ink-muted hover:text-ink-soft"
                }`}
              >
                <PieIcon className="h-3.5 w-3.5" /> 營收佔比
              </button>
              <button
                type="button"
                onClick={() => setMode("trend")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  mode === "trend" ? "bg-white text-matrix-rose shadow-sm" : "text-ink-muted hover:text-ink-soft"
                }`}
              >
                <TrendingUp className="h-3.5 w-3.5" /> 月度趨勢
              </button>
            </div>
            {mode === "trend" && (
              <button
                type="button"
                onClick={() => setCompareYoY((v) => !v)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  compareYoY
                    ? "border-matrix-rose bg-rose-50 text-matrix-rose"
                    : "border-slate-300 bg-white text-ink-soft hover:bg-slate-50"
                }`}
              >
                <Layers className="h-3.5 w-3.5" /> 同期比較
              </button>
            )}
          </div>
        }
      />

      {/* 頂部 4 張 StatCard */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="全域總營收"
          value={wan(totalRevenue)}
          hint={`${year} 年度 · 四區合計`}
          icon={DollarSign}
          accentClass="text-matrix-rose"
        />
        <StatCard
          label="人均產值"
          value={wan1(perCapita)}
          hint={`平均每位顧問 / 共 ${headcount} 位`}
          icon={Gauge}
          accentClass="text-emerald-600"
        />
        <StatCard
          label="最高效區"
          value={topRegion.region}
          hint={`人均 ${wan1(topRegion.perCapita)}`}
          icon={Crown}
          accentClass="text-amber-600"
        />
        <StatCard
          label="顧問總數"
          value={`${headcount} 位`}
          hint={`在職 ${regionStats.reduce((a, r) => a + r.active, 0)} 位`}
          icon={Users}
          accentClass="text-indigo-600"
        />
      </div>

      {/* 四大區卡片網格 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {regionStats.map((rs) => {
          const members = consultantsOf(data, rs.region);
          // 該區各顧問營收佔比（以本區總額為母數）
          const ranked = [...members].sort((a, b) => b.totalRevenue - a.totalRevenue);
          const pieData = ranked.map((c, i) => ({
            name: c.name,
            value: c.totalRevenue,
            pct: rs.revenue > 0 ? (c.totalRevenue / rs.revenue) * 100 : 0,
            color: MATRIX_PALETTE[i % MATRIX_PALETTE.length],
          }));

          return (
            <Card key={rs.region} padded={false} className="overflow-hidden">
              {/* 區卡標頭 */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-rose-50/70 to-orange-50/40 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-matrix-rose to-matrix-orange text-white">
                    <Network className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{rs.region}</h3>
                    <p className="text-xs text-ink-muted">{REGION_SUB[rs.region]} · {rs.headcount} 位顧問</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-matrix-rose">{wan(rs.revenue)}</p>
                  <p className="text-xs text-ink-muted">人均 {wan1(rs.perCapita)}</p>
                </div>
              </div>

              <div className="p-5">
                {mode === "share" ? (
                  <ShareBlock key={`share-${rs.region}`} pieData={pieData} regionRevenue={rs.revenue} />
                ) : (
                  <TrendBlock
                    key={`trend-${rs.region}-${compareYoY ? "yoy" : "ind"}`}
                    region={rs.region}
                    members={members}
                    year={year}
                    compareYoY={compareYoY}
                  />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}

/* ─────────────────────────────────────────────
   營收佔比:PieChart + 顧問營收清單與 %
───────────────────────────────────────────── */
function ShareBlock({
  pieData,
  regionRevenue,
}: {
  pieData: { name: string; value: number; pct: number; color: string }[];
  regionRevenue: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={44}
              outerRadius={78}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "none" }}
              formatter={(v: number, n, p: { payload?: { pct?: number } }) => [
                `${wanLabel(v)}(${(p.payload?.pct ?? 0).toFixed(1)}%)`,
                n,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* 顧問營收清單與 % */}
      <div className="flex flex-col justify-center gap-2">
        {pieData.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
            <span className="font-medium text-ink-soft">{d.name}</span>
            <span className="ml-auto tabular text-ink-muted">{wanLabel(d.value)}</span>
            <span className="w-12 shrink-0 text-right font-bold text-matrix-rose">
              {d.pct.toFixed(1)}%
            </span>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
          <span className="text-ink-muted">本區合計</span>
          <span className="font-bold text-ink-soft">{wanLabel(regionRevenue)}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   月度趨勢:LineChart(該區總營收虛線 + 各顧問彩線)
   同期比較:疊三年度該區總營收
───────────────────────────────────────────── */
function TrendBlock({
  region,
  members,
  year,
  compareYoY,
}: {
  region: RegionName;
  members: ConsultantRow[];
  year: MatrixYear;
  compareYoY: boolean;
}) {
  // 各顧問彩線（取本區前 5 名，避免線太多）
  const topMembers = useMemo(
    () => [...members].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5),
    [members],
  );

  const chartData = useMemo(() => {
    return MONTHS.map((month, i) => {
      const row: Record<string, number | string> = { month };
      // 該區總營收（本年度）
      row["區總營收"] = members.reduce((s, c) => s + (c.monthlyTrends[i]?.revenue ?? 0), 0);
      if (compareYoY) {
        // 疊三年度該區總營收
        MATRIX_YEARS.forEach((y) => {
          const yMembers = MATRIX_DATA[y].consultants.filter((c) => c.region === region);
          row[`${y}年`] = yMembers.reduce((s, c) => s + (c.monthlyTrends[i]?.revenue ?? 0), 0);
        });
      } else {
        // 各顧問彩線
        topMembers.forEach((m) => {
          row[m.name] = m.monthlyTrends[i]?.revenue ?? 0;
        });
      }
      return row;
    });
  }, [members, topMembers, compareYoY, region]);

  // 同期比較的三年度色（當前年度突顯）
  const yoyColors = ["#FFB761", "#FF5C8D", "#FF2D6C"];

  // 重要:recharts 的 <Line> 必須是 <LineChart> 的「直接子節點」，
  // 不可包在 React Fragment 裡（否則 recharts 偵測不到、整條線不會畫）。
  // 因此這裡先攤平成一個 <Line> 陣列再交給 LineChart。
  const lineElements = compareYoY
    ? MATRIX_YEARS.map((y, i) => (
        <Line
          key={y}
          type="monotone"
          dataKey={`${y}年`}
          stroke={yoyColors[i]}
          strokeWidth={y === year ? 3 : 1.8}
          strokeDasharray={y === year ? undefined : "5 4"}
          dot={false}
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />
      ))
    : [
        // 該區總營收:虛線
        <Line
          key="__region_total"
          type="monotone"
          dataKey="區總營收"
          stroke="#0f172a"
          strokeWidth={2.4}
          strokeDasharray="6 4"
          dot={false}
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />,
        // 各顧問彩線
        ...topMembers.map((m, i) => (
          <Line
            key={m.name}
            type="monotone"
            dataKey={m.name}
            stroke={MATRIX_PALETTE[i % MATRIX_PALETTE.length]}
            strokeWidth={1.8}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        )),
      ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} interval={0} />
          <YAxis
            tick={{ fontSize: 10, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 10000).toFixed(0)}萬`}
            width={42}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "none", fontSize: 12 }}
            formatter={(v: number, n) => [wanLabel(v), n]}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} iconSize={9} />
          {lineElements}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function wanLabel(n: number) {
  return `$ ${(n / 10000).toFixed(1)} 萬`;
}
