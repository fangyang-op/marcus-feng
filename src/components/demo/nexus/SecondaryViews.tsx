"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Activity,
  Award,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Settings,
  Sparkles,
  Download,
  RefreshCw,
  Trash2,
  Coins,
  Check,
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
import { DemoModal, DemoToast } from "@/components/demo/widgets";
import {
  RANKING_ROWS,
  RANKING_YEARS,
  RANKING_COUNTRY_CODES,
  RANKING_COUNTRY_LABEL,
  RANKING_SCHOLARSHIP_TOTAL_NTD,
  CRM_STUDENTS,
  CRM_STAGES,
  USAGE_STATS,
  USAGE_ROWS,
  USAGE_DAILY,
  type RankingCountryCode,
} from "@/data/demo/nexus";

const NEXUS_TAB = "border-nexus-pink text-nexus-pink";
const NEXUS_ACCENT = "bg-nexus-pink";

// ── 歷屆榜單查詢(對齊真實產品 UI)─────────────────────────────────
const RESULT_COLOR: Record<string, PillColor> = {
  錄取: "emerald",
  備取: "amber",
  婉拒: "rose",
};

export function RankingsView() {
  const [year, setYear] = useState<string>("總覽");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(true);
  // 三個 checkbox
  const [onlyDaShuo, setOnlyDaShuo] = useState(false);
  const [onlyYangShuo, setOnlyYangShuo] = useState(false);
  const [onlyScholarship, setOnlyScholarship] = useState(false);
  // 國家快篩:空集合 = 全部
  const [countries, setCountries] = useState<Set<RankingCountryCode>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const allCountries = countries.size === 0;

  const toggleCountry = (code: RankingCountryCode) => {
    setCountries((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RANKING_ROWS.filter((r) => {
      if (year !== "總覽" && r.year !== year) return false;
      if (onlyDaShuo && !r.isDaShuo) return false;
      if (onlyYangShuo && !r.isYangShuo) return false;
      if (onlyScholarship && !r.hasScholarship) return false;
      if (!allCountries && !countries.has(r.countryCode)) return false;
      if (q) {
        const hit =
          r.student.toLowerCase().includes(q) ||
          r.school.toLowerCase().includes(q) ||
          r.program.toLowerCase().includes(q) ||
          r.major.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [year, search, onlyDaShuo, onlyYangShuo, onlyScholarship, allCountries, countries]);

  // 篩選後的累積獎學金(由資料加總);無篩選時顯示寫死的總額對齊真實畫面
  const noFilter =
    year === "總覽" &&
    !search.trim() &&
    !onlyDaShuo &&
    !onlyYangShuo &&
    !onlyScholarship &&
    allCountries;
  const filteredScholarship = rows.reduce((sum, r) => sum + r.scholarshipNtd, 0);
  const scholarshipTotal = noFilter
    ? RANKING_SCHOLARSHIP_TOTAL_NTD
    : filteredScholarship;

  const admitCount = rows.filter((r) => r.result === "錄取").length;

  return (
    <PageContainer>
      <PageTitle
        title="歷屆榜單查詢"
        subtitle="即時同步 Google Sheet 榜單資料庫"
        right={
          <div className="flex flex-wrap items-center gap-1.5">
            <IconBtn
              icon={Settings}
              label="設定"
              onClick={() =>
                setModal({
                  title: "榜單同步設定",
                  body: "在正式系統中可設定 Google Sheet 來源、同步頻率與欄位對應。此為 Demo 示意。",
                })
              }
            />
            <button
              type="button"
              onClick={() =>
                setModal({
                  title: "向量化狀態",
                  body: "目前已向量化 593 筆榜單資料,供 AI 助理檢索歷屆相似背景。此為 Demo 示意。",
                })
              }
              className="inline-flex items-center gap-1 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-100"
            >
              <Sparkles className="h-3.5 w-3.5" />
              已向量化 593
            </button>
            <button
              type="button"
              onClick={() => showToast("已開始匯出榜單(Demo 示意)")}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5" />
              匯出
              <ChevronDown className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => showToast("請先選擇要同步的年份(Demo 示意)")}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              請選擇年份同步
            </button>
            <IconBtn
              icon={Trash2}
              label="清除"
              tone="danger"
              onClick={() =>
                setModal({
                  title: "清除榜單快取",
                  body: "在正式系統中可清除本地榜單快取並重新拉取 Google Sheet。此為 Demo 示意,不會刪除任何資料。",
                })
              }
            />
          </div>
        }
      />

      {/* KPI 摘要 */}
      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="總筆數" value={`${RANKING_ROWS.length}`} hint="歷屆累計" />
        <StatCard label="篩選結果" value={`${rows.length}`} hint="符合條件" accentClass="text-nexus-pink" />
        <StatCard label="其中錄取" value={`${admitCount}`} hint="本篩選下" accentClass="text-emerald-600" />
        <StatCard label="涵蓋國家" value={`${RANKING_COUNTRY_CODES.length}`} hint="AUS/CAD/IE/SCT/UK/USA" />
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

      {/* 可收合的篩選面板 */}
      <Card padded={false} className="mb-4 overflow-hidden">
        <button
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-ink">
            <Filter className="h-4 w-4 text-nexus-pink" />
            展開搜尋與國家過濾
          </span>
          {filterOpen ? (
            <ChevronUp className="h-4 w-4 text-ink-muted" />
          ) : (
            <ChevronDown className="h-4 w-4 text-ink-muted" />
          )}
        </button>

        {filterOpen && (
          <div className="space-y-3 border-t border-slate-100 p-4">
            {/* 搜尋 + 統計卡 */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              <div className="relative lg:col-span-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜尋學生姓名、學校名稱、錄取科系或在台科系…"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
                />
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Coins className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-emerald-700">
                    累積獲取獎學金
                  </div>
                  <div className="truncate font-mono text-sm font-bold text-emerald-700">
                    NTD$ {scholarshipTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>

            {/* checkbox + 國家快篩 */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3">
              <CheckChip label="大碩" checked={onlyDaShuo} onChange={() => setOnlyDaShuo((v) => !v)} />
              <CheckChip label="洋碩" checked={onlyYangShuo} onChange={() => setOnlyYangShuo((v) => !v)} />
              <CheckChip label="獎學金" checked={onlyScholarship} onChange={() => setOnlyScholarship((v) => !v)} />

              <span className="ml-2 text-xs font-bold text-ink-muted">國家快篩:</span>
              <button
                type="button"
                onClick={() => setCountries(new Set())}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  allCountries
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-slate-200 bg-white text-ink-soft hover:bg-slate-50"
                }`}
              >
                全部
              </button>
              {RANKING_COUNTRY_CODES.map((code) => {
                const active = countries.has(code);
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => toggleCountry(code)}
                    title={RANKING_COUNTRY_LABEL[code]}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      active
                        ? "border-nexus-pink bg-nexus-pink/10 text-nexus-pink"
                        : "border-slate-200 bg-white text-ink-soft hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${
                        active ? "border-nexus-pink bg-nexus-pink text-white" : "border-slate-300 bg-white"
                      }`}
                    >
                      {active && <Check className="h-2.5 w-2.5" />}
                    </span>
                    {code}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      <Card padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-ink-muted">
                <th className="px-4 py-3">學生 / 在台科系</th>
                <th className="px-4 py-3">年度</th>
                <th className="px-4 py-3">國家</th>
                <th className="px-4 py-3">錄取校</th>
                <th className="px-4 py-3">錄取科系</th>
                <th className="px-4 py-3">類別</th>
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
                  <td className="px-4 py-3">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-soft">
                      {r.countryCode}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{r.school}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.program}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {r.isDaShuo && <Pill color="blue">大碩</Pill>}
                      {r.isYangShuo && <Pill color="violet">洋碩</Pill>}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-ink-soft">{r.gpa}</td>
                  <td className="px-4 py-3 font-mono text-ink-soft">{r.toefl}</td>
                  <td className="px-4 py-3">
                    {!r.hasScholarship ? (
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
                  <td colSpan={10} className="px-4 py-10 text-center text-sm text-ink-muted">
                    找不到符合條件的歷屆紀錄,請調整搜尋或國家過濾。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <DemoModal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title ?? ""}
        accentClass={NEXUS_ACCENT}
      >
        <p>{modal?.body}</p>
      </DemoModal>
      <DemoToast message={toast} accentClass={NEXUS_ACCENT} />
    </PageContainer>
  );
}

/** 頂部 icon 按鈕(no-op) */
function IconBtn({
  icon: Icon,
  label,
  onClick,
  tone = "default",
}: {
  icon: typeof Settings;
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
        tone === "danger"
          ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
          : "border-slate-300 bg-white text-ink-soft hover:bg-slate-50"
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

/** checkbox 樣式 chip */
function CheckChip({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft"
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
          checked ? "border-nexus-pink bg-nexus-pink text-white" : "border-slate-300 bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3" />}
      </span>
      {label}
    </button>
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
