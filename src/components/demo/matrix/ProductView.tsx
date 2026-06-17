"use client";

import { useState } from "react";
import { Grid3x3, DollarSign, BarChart2, Search } from "lucide-react";
import { PageContainer, Card } from "@/components/demo/primitives";
import { MONTHS, type YearData } from "@/data/demo/matrix";

type Metric = "revenue" | "count";

export function ProductView({ data }: { data: YearData }) {
  const [metric, setMetric] = useState<Metric>("revenue");
  const [search, setSearch] = useState("");

  const products = data.products;
  const maxVal = Math.max(
    1,
    ...products.flatMap((p) => p.monthly.map((m) => (metric === "revenue" ? m.revenue : m.count))),
  );

  // 玫紅色階熱力（inline rgba，數值越大越深）
  const cellStyle = (value: number) => {
    if (value === 0) return { background: "#f8fafc", color: "#cbd5e1" };
    const intensity = Math.min(value / maxVal, 1);
    const alpha = 0.12 + intensity * 0.88;
    return {
      background: `rgba(255, 45, 108, ${alpha.toFixed(2)})`,
      color: intensity > 0.45 ? "#fff" : "#334155",
    };
  };

  const filtered = products.filter((p) => p.productName.includes(search.trim()));

  return (
    <PageContainer className="space-y-6">
      {/* Header & Controls */}
      <Card>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
              <Grid3x3 className="h-6 w-6 text-matrix-rose" />
              產品組成統計
            </h2>
            <p className="mt-1 text-sm text-ink-muted">產品 × 12 月玫紅色階熱力圖，數值越大底色越深</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setMetric("revenue")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  metric === "revenue" ? "bg-white text-matrix-rose shadow-sm" : "text-ink-muted hover:text-ink-soft"
                }`}
              >
                <DollarSign className="h-4 w-4" /> 金額
              </button>
              <button
                type="button"
                onClick={() => setMetric("count")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  metric === "count" ? "bg-white text-matrix-rose shadow-sm" : "text-ink-muted hover:text-ink-soft"
                }`}
              >
                <BarChart2 className="h-4 w-4" /> 件數
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="搜尋產品…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-44 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-matrix-rose"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Heatmap */}
      <Card padded={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 z-10 min-w-[180px] whitespace-nowrap bg-slate-50 px-4 py-3 font-semibold text-ink-soft shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  產品名稱
                </th>
                <th className="w-28 whitespace-nowrap px-4 py-3 text-center font-semibold text-ink-soft">總計</th>
                {MONTHS.map((m) => (
                  <th key={m} className="min-w-[64px] px-2 py-3 text-center font-semibold text-ink-soft">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => {
                const totalVal = metric === "revenue" ? prod.totalRevenue : prod.totalCount;
                return (
                  <tr key={prod.productName} className="hover:bg-slate-50">
                    <td className="sticky left-0 z-10 whitespace-nowrap border-r border-slate-100 bg-white px-4 py-3 font-medium text-ink shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      {prod.productName}
                    </td>
                    <td className="whitespace-nowrap bg-slate-50/50 px-4 py-3 text-center font-bold text-ink-soft">
                      {metric === "revenue" ? `$${(totalVal / 10000).toFixed(1)}萬` : `${totalVal} 件`}
                    </td>
                    {prod.monthly.map((m, i) => {
                      const cellVal = metric === "revenue" ? m.revenue : m.count;
                      return (
                        <td key={i} className="border-l border-slate-100 px-1.5 py-1.5 text-center">
                          <div
                            className="mx-auto rounded px-1 py-2 text-xs font-medium transition-colors"
                            style={cellStyle(cellVal)}
                          >
                            {cellVal === 0 ? "-" : metric === "revenue" ? (cellVal / 10000).toFixed(1) : cellVal}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={14} className="px-4 py-8 text-center text-ink-muted">
                    沒有找到符合的產品資料
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="px-1 text-xs text-ink-muted">
        ※ {metric === "revenue" ? "數值單位為萬元" : "數值單位為件數"}；色塊越深代表該月銷售越強。第一欄固定不隨橫向捲動。
      </p>
    </PageContainer>
  );
}
