"use client";

import { useMemo, useState } from "react";
import { GraduationCap, Search } from "lucide-react";

import {
  PageContainer,
  PageTitle,
  Card,
  Pill,
} from "@/components/demo/primitives";
import {
  SCHOOLS,
  COUNTRY_LABELS,
  type SchoolCountry,
} from "@/data/demo/crm";

export function SchoolsView() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<"" | SchoolCountry>("");

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
          query || country ? " · 已套用篩選" : ""
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
                    className="border-b border-slate-100 last:border-0 hover:bg-crm-soft/40"
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
    </PageContainer>
  );
}
