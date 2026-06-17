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
  Building,
} from "lucide-react";
import { PageContainer, PageTitle, Card, Pill } from "@/components/demo/primitives";
import {
  SCHOOLS,
  SCHOOL_COUNTRIES,
  SCHOOL_TYPES,
  type NexusSchool,
} from "@/data/demo/nexus";

export function SchoolDatabaseView() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<string>("全部");
  const [type, setType] = useState<string>("全部");
  const [openSchool, setOpenSchool] = useState<NexusSchool | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SCHOOLS.filter((s) => {
      if (country !== "全部" && s.country !== country) return false;
      if (type !== "全部" && s.type !== type) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.chineseName.includes(q) ||
        s.programs.some((p) => p.toLowerCase().includes(q)) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [search, country, type]);

  return (
    <PageContainer>
      <PageTitle
        icon={Building}
        title="常用院校資料庫"
        subtitle={`共 ${SCHOOLS.length} 所院校 · 排名 / 學費 / 語言門檻一站查詢`}
      />

      {/* 搜尋 + 篩選 */}
      <Card className="mb-5">
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋學校名稱、科系或標籤…"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
          />
        </div>

        <div className="space-y-2.5">
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
      </Card>

      <div className="mb-3 text-sm text-ink-muted">
        篩選結果:<span className="font-bold text-ink">{filtered.length}</span> 所
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

            <div className="mb-3 flex items-center gap-1 text-xs text-ink-muted">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {s.location} · {s.country}
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
          找不到符合條件的院校,請調整搜尋或篩選。
        </Card>
      )}

      {/* 詳細 / 編輯 modal */}
      {openSchool && (
        <SchoolModal school={openSchool} onClose={() => setOpenSchool(null)} />
      )}
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
}: {
  school: NexusSchool;
  onClose: () => void;
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
            className="rounded-lg bg-nexus-pink px-4 py-2 text-sm font-semibold text-white hover:bg-nexus-purple"
          >
            編輯資料 (展示用)
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
