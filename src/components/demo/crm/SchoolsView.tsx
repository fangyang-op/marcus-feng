"use client";

import { useMemo, useState } from "react";
import { GraduationCap, Search } from "lucide-react";

import {
  PageContainer,
  PageTitle,
  Card,
  Pill,
} from "@/components/demo/primitives";
import { DemoModal } from "@/components/demo/widgets";
import {
  SCHOOLS,
  COUNTRY_LABELS,
  type SchoolCountry,
  type SchoolRow,
} from "@/data/demo/crm";

export function SchoolsView() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<"" | SchoolCountry>("");
  const [openSchool, setOpenSchool] = useState<SchoolRow | null>(null);

  const filtered = useMemo(() => {
    return SCHOOLS.filter((s) => {
      if (country && s.country !== country) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (
          !s.shortName.toLowerCase().includes(q) &&
          !s.nameEn.toLowerCase().includes(q) &&
          !s.nameZh.includes(q)
        )
          return false;
      }
      return true;
    });
  }, [query, country]);

  return (
    <PageContainer>
      <PageTitle
        icon={GraduationCap}
        title="常用院校檢索"
        subtitle={`${filtered.length} 所學校${
          query || country ? " · 已套用篩選" : " · 點任一列查看門檻"
        }`}
      />

      <Card className="mb-4" padded={false}>
        <div className="flex flex-wrap items-center gap-3 p-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="簡稱 / 英文 / 中文"
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-ink outline-none focus:border-crm focus:ring-2 focus:ring-crm/20"
            />
          </div>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as "" | SchoolCountry)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-ink-soft outline-none focus:border-crm focus:ring-2 focus:ring-crm/20"
          >
            <option value="">全部國家</option>
            {(Object.keys(COUNTRY_LABELS) as SchoolCountry[]).map((c) => (
              <option key={c} value={c}>
                {COUNTRY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-3">學校</th>
                <th className="px-4 py-3">國家</th>
                <th className="px-4 py-3 text-right">QS</th>
                <th className="px-4 py-3 text-right">US News</th>
                <th className="px-4 py-3">標籤</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-sm text-ink-muted"
                  >
                    目前的篩選沒有結果
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr
                    key={s.shortName}
                    onClick={() => setOpenSchool(s)}
                    className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-crm-soft/40"
                  >
                    <td className="px-4 py-3">
                      <span className="font-bold text-ink">{s.shortName}</span>
                      <span className="ml-2 text-xs text-ink-muted">{s.nameEn}</span>
                      <div className="text-xs text-ink-muted">{s.nameZh}</div>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">
                      {COUNTRY_LABELS[s.country]}
                    </td>
                    <td className="px-4 py-3 text-right tabular text-ink-soft">
                      #{s.rankingQs}
                    </td>
                    <td className="px-4 py-3 text-right tabular text-ink-soft">
                      {s.rankingUsNews ? `#${s.rankingUsNews}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {s.isPartner ? <Pill color="green">合作</Pill> : <span className="text-ink-muted">—</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <DemoModal
        open={openSchool !== null}
        onClose={() => setOpenSchool(null)}
        title={openSchool ? `${openSchool.shortName} · 申請門檻` : ""}
        accentClass="bg-crm"
      >
        {openSchool && <SchoolDetail s={openSchool} />}
      </DemoModal>
    </PageContainer>
  );
}

/** 由排名 deterministic 推導出示意門檻(無亂數) */
function SchoolDetail({ s }: { s: SchoolRow }) {
  const top = s.rankingQs <= 20;
  const mid = s.rankingQs <= 60;
  const gpa = top ? "3.7+" : mid ? "3.4+" : "3.2+";
  const toefl = top ? "105+" : mid ? "100+" : "90+";
  const ielts = top ? "7.0+" : mid ? "6.5+" : "6.0+";
  const rows: { label: string; value: string }[] = [
    { label: "全名", value: `${s.nameEn}（${s.nameZh}）` },
    { label: "國家", value: COUNTRY_LABELS[s.country] },
    { label: "QS 排名", value: `#${s.rankingQs}` },
    { label: "US News", value: s.rankingUsNews ? `#${s.rankingUsNews}` : "未列入" },
    { label: "建議 GPA", value: gpa },
    { label: "TOEFL / IELTS", value: `${toefl} / ${ielts}` },
    { label: "合作關係", value: s.isPartner ? "合作院校(可加速審件)" : "一般申請" },
  ];
  return (
    <div>
      <dl className="grid grid-cols-[96px_1fr] gap-y-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <dt className="text-ink-muted">{r.label}</dt>
            <dd className="text-ink-soft">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-ink-muted">
        以上門檻為依排名推導之示意值，正式系統會串接各校官方申請資料。
      </p>
    </div>
  );
}
