"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Trophy,
  MapPin,
  BadgeCheck,
  Handshake,
  X,
  GraduationCap,
  DollarSign,
  Filter,
  ChevronDown,
  ChevronUp,
  Settings,
  Sparkles,
  Download,
  Plus,
  TriangleAlert,
  Users,
} from "lucide-react";
import { PageContainer, PageTitle, Card, Pill } from "@/components/demo/primitives";
import { DemoModal, DemoToast } from "@/components/demo/widgets";
import {
  SCHOOLS,
  SCHOOL_COUNTRIES,
  SCHOOL_TYPES,
  SCHOOL_SORTS,
  SCHOOL_UNMAINTAINED_COUNT,
  SCHOOL_VECTORIZED,
  type SchoolSortKey,
  type NexusSchool,
} from "@/data/demo/nexus";

const NEXUS_ACCENT = "bg-nexus-pink";

/** 把語言學校的 null 排名 / 空門檻排到最後 */
const nullLast = (v: number | null) => (v == null ? Number.POSITIVE_INFINITY : v);
/** 把「—」或空字串視為 0(供成績門檻過濾/排序) */
const numOrZero = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

export function SchoolDatabaseView() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<string>("全部");
  const [type, setType] = useState<string>("全部");
  const [sortKey, setSortKey] = useState<SchoolSortKey>("admits");
  // 成功錄取數預設由高到低(降冪);排名 / 門檻預設由低到高(升冪)
  const [sortAsc, setSortAsc] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);
  const [gpaMin, setGpaMin] = useState("");
  const [toeflMin, setToeflMin] = useState("");
  const [ieltsMin, setIeltsMin] = useState("");
  const [openSchool, setOpenSchool] = useState<NexusSchool | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [modal, setModal] = useState<{ title: string; body: string } | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const setSort = (key: SchoolSortKey) => {
    if (key === sortKey) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      // 成功錄取數預設降冪(多→少);其餘預設升冪
      setSortAsc(key !== "admits");
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const gpaThreshold = parseFloat(gpaMin);
    const toeflThreshold = parseFloat(toeflMin);
    const ieltsThreshold = parseFloat(ieltsMin);

    const rows = SCHOOLS.filter((s) => {
      if (country !== "全部" && s.country !== country) return false;
      if (type !== "全部" && s.type !== type) return false;
      // 成績門檻:輸入值代表「我能接受的最低門檻」,只顯示要求 <= 輸入值的學校
      if (Number.isFinite(gpaThreshold) && numOrZero(s.requirements.gpa) > gpaThreshold) return false;
      if (Number.isFinite(toeflThreshold) && numOrZero(s.requirements.toefl) > toeflThreshold) return false;
      if (Number.isFinite(ieltsThreshold) && numOrZero(s.requirements.ielts) > ieltsThreshold) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.chineseName.includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.programs.some((p) => p.toLowerCase().includes(q)) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.description.includes(q)
      );
    });

    const sorted = [...rows].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "admits":
          cmp = a.successfulAdmits - b.successfulAdmits;
          break;
        case "usnews":
          cmp = nullLast(a.usNewsRanking) - nullLast(b.usNewsRanking);
          break;
        case "qs":
          cmp = nullLast(a.qsRanking) - nullLast(b.qsRanking);
          break;
        case "gpa":
          cmp = numOrZero(a.requirements.gpa) - numOrZero(b.requirements.gpa);
          break;
        case "toefl":
          cmp = numOrZero(a.requirements.toefl) - numOrZero(b.requirements.toefl);
          break;
        case "ielts":
          cmp = numOrZero(a.requirements.ielts) - numOrZero(b.requirements.ielts);
          break;
      }
      return sortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [search, country, type, gpaMin, toeflMin, ieltsMin, sortKey, sortAsc]);

  return (
    <PageContainer>
      <PageTitle
        title={
          <span className="flex flex-wrap items-center gap-2">
            常用院校資料庫
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
              <TriangleAlert className="h-3 w-3" />
              尚有 {SCHOOL_UNMAINTAINED_COUNT} 筆學校資料未維護
            </span>
          </span>
        }
        subtitle="全方位搜尋課程、要求與地理位置"
        right={
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              aria-label="設定"
              title="設定"
              onClick={() =>
                setModal({
                  title: "院校資料庫設定",
                  body: "在正式系統中可設定資料來源、欄位顯示與維護負責人。此為 Demo 示意。",
                })
              }
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-ink-soft hover:bg-slate-50"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setModal({
                  title: "向量化狀態",
                  body: `目前已向量化 ${SCHOOL_VECTORIZED.done} / ${SCHOOL_VECTORIZED.total} 所院校,供 AI 助理檢索課程與門檻。此為 Demo 示意。`,
                })
              }
              className="inline-flex items-center gap-1 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-100"
            >
              <Sparkles className="h-3.5 w-3.5" />
              向量化 ({SCHOOL_VECTORIZED.done}/{SCHOOL_VECTORIZED.total})
            </button>
            <button
              type="button"
              onClick={() => showToast("已開始匯出院校資料(Demo 示意)")}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5" />
              匯出
              <ChevronDown className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() =>
                setModal({
                  title: "新增校所",
                  body: "在正式系統中可新增院校並填入排名、學費與門檻。此為 Demo 示意,不會寫入資料。",
                })
              }
              className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="h-3.5 w-3.5" />
              新增校所
            </button>
          </div>
        }
      />

      {/* 可收合篩選面板 */}
      <Card padded={false} className="mb-4 overflow-hidden">
        <button
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-ink">
            <Filter className="h-4 w-4 text-nexus-pink" />
            展開搜尋與成績篩選
          </span>
          {filterOpen ? (
            <ChevronUp className="h-4 w-4 text-ink-muted" />
          ) : (
            <ChevronDown className="h-4 w-4 text-ink-muted" />
          )}
        </button>

        {filterOpen && (
          <div className="space-y-3 border-t border-slate-100 p-4">
            {/* 搜尋 + 成績 Min */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
              <div className="relative lg:col-span-6">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜尋學校名稱、熱門科系、地點、標籤或簡介…"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
                />
              </div>
              <MinInput label="GPA Min" value={gpaMin} onChange={setGpaMin} placeholder="3.0" step="0.1" />
              <MinInput label="TOEFL Min" value={toeflMin} onChange={setToeflMin} placeholder="90" step="1" />
              <MinInput label="IELTS Min" value={ieltsMin} onChange={setIeltsMin} placeholder="6.5" step="0.5" />
            </div>

            {/* 國家 / 類型 */}
            <div className="space-y-2.5 border-t border-slate-100 pt-3">
              <ChipRow
                label="國家"
                options={SCHOOL_COUNTRIES as readonly string[]}
                value={country}
                onChange={setCountry}
              />
              <ChipRow
                label="類型"
                options={SCHOOL_TYPES as readonly string[]}
                value={type}
                onChange={setType}
              />
            </div>

            {/* 排序方式 */}
            <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
              <span className="mr-1 text-xs font-bold text-ink-muted">排序方式:</span>
              {SCHOOL_SORTS.map((opt) => {
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
                    {active &&
                      (sortAsc ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      ))}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
        <span>
          篩選結果:<span className="font-bold text-ink">{filtered.length}</span> 所
        </span>
        <span className="text-slate-300">·</span>
        <span>
          排序依{" "}
          <span className="font-bold text-nexus-pink">
            {SCHOOL_SORTS.find((s) => s.key === sortKey)?.label}
          </span>{" "}
          ({sortAsc ? "升冪" : "降冪"})
        </span>
      </div>

      {/* 學校卡 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <button
            type="button"
            key={s.id}
            onClick={() => setOpenSchool(s)}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-nexus-pink/40 hover:shadow-md"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="truncate font-bold text-ink group-hover:text-nexus-pink">
                  {s.chineseName}
                </h4>
                <p className="truncate text-xs text-ink-muted">{s.name}</p>
              </div>
              <div className="flex flex-none gap-1">
                {s.isPartner && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-50 text-violet-600" title="合作院校">
                    <Handshake className="h-3.5 w-3.5" />
                  </span>
                )}
                {s.isVerified && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-500" title="已驗證">
                    <BadgeCheck className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between gap-2 text-xs text-ink-muted">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {s.location} · {s.country}
              </span>
              <span
                className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-bold text-emerald-600"
                title="成功錄取數"
              >
                <Users className="h-3 w-3" />
                錄取 {s.successfulAdmits}
              </span>
            </div>

            {/* 排名 */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {s.qsRanking != null && (
                <RankPill label="QS" value={s.qsRanking} />
              )}
              {s.usNewsRanking != null && (
                <RankPill label="US News" value={s.usNewsRanking} />
              )}
              {s.theRanking != null && (
                <RankPill label="THE" value={s.theRanking} />
              )}
              {s.qsRanking == null &&
                s.usNewsRanking == null &&
                s.theRanking == null && (
                  <span className="text-[11px] text-ink-muted">非排名類院校</span>
                )}
            </div>

            {/* 學費 + 要求 */}
            <div className="mb-3 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-ink-soft">
                <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                {s.tuitionRange}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <ReqTag>GPA {s.requirements.gpa}</ReqTag>
                <ReqTag>TOEFL {s.requirements.toefl}</ReqTag>
                <ReqTag>IELTS {s.requirements.ielts}</ReqTag>
              </div>
            </div>

            {/* tags */}
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {s.tags.slice(0, 3).map((t) => (
                <Pill key={t} color="pink">
                  {t}
                </Pill>
              ))}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="text-center text-sm text-ink-muted">
          找不到符合條件的院校,請調整搜尋或成績篩選。
        </Card>
      )}

      {/* 詳細 / 編輯 modal */}
      {openSchool && (
        <SchoolModal
          school={openSchool}
          onClose={() => setOpenSchool(null)}
          onSave={() => {
            const name = openSchool.chineseName;
            setOpenSchool(null);
            showToast(`已儲存「${name}」資料(Demo 示意)`);
          }}
        />
      )}

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

function MinInput({
  label,
  value,
  onChange,
  placeholder,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  step: string;
}) {
  return (
    <div className="lg:col-span-2">
      <label className="mb-1 block text-[11px] font-bold text-ink-muted">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
      />
    </div>
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

function RankPill({ label, value }: { label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-ink-soft">
      <Trophy className="h-3 w-3 text-amber-500" />
      {label} #{value}
    </span>
  );
}

function ReqTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-ink-soft">
      {children}
    </span>
  );
}

function SchoolModal({
  school,
  onClose,
  onSave,
}: {
  school: NexusSchool;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        {/* header */}
        <div className="flex items-start justify-between gap-3 bg-gradient-to-br from-nexus-pink to-nexus-purple p-5 text-white">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <h3 className="truncate text-lg font-bold">{school.chineseName}</h3>
            </div>
            <p className="mt-0.5 truncate text-sm text-white/80">{school.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            className="rounded-md p-1 text-white/80 hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div className="scrollbar-thin flex-1 overflow-y-auto p-5">
          <p className="mb-4 text-sm leading-relaxed text-ink-soft">
            {school.description}
          </p>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <Field label="國家 / 城市" value={`${school.country} · ${school.location}`} />
            <Field label="類型" value={school.type} />
            <Field label="QS 排名" value={school.qsRanking != null ? `#${school.qsRanking}` : "—"} />
            <Field label="US News 排名" value={school.usNewsRanking != null ? `#${school.usNewsRanking}` : "—"} />
            <Field label="THE 排名" value={school.theRanking != null ? `#${school.theRanking}` : "—"} />
            <Field label="成功錄取數" value={`${school.successfulAdmits} 人`} />
            <Field label="學費(假值)" value={school.tuitionRange} />
            <Field label="GPA 要求" value={school.requirements.gpa} />
            <Field label="TOEFL / IELTS" value={`${school.requirements.toefl} / ${school.requirements.ielts}`} />
          </div>

          <div className="mb-4">
            <p className="mb-1.5 text-xs font-bold text-ink-muted">熱門學程</p>
            <div className="flex flex-wrap gap-1.5">
              {school.programs.map((p) => (
                <Pill key={p} color="indigo">
                  {p}
                </Pill>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-bold text-ink-muted">標籤</p>
            <div className="flex flex-wrap gap-1.5">
              {school.tags.map((t) => (
                <Pill key={t} color="pink">
                  {t}
                </Pill>
              ))}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-ink-soft hover:bg-slate-50"
          >
            關閉
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-nexus-pink px-4 py-2 text-sm font-semibold text-white hover:bg-nexus-purple"
          >
            儲存資料 (展示用)
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
      <div className="text-[11px] font-bold text-ink-muted">{label}</div>
      <div className="mt-0.5 truncate text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}
