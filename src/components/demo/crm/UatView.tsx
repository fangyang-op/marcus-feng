"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  ListChecks,
  CheckCircle2,
  AlertTriangle,
  CircleDashed,
} from "lucide-react";

import {
  PageContainer,
  PageTitle,
  Card,
  StatCard,
  Pill,
} from "@/components/demo/primitives";
import { DemoModal, DemoToast } from "@/components/demo/widgets";
import {
  UAT_SECTIONS,
  UAT_SUMMARY,
  UAT_STATUS_META,
  type UatCase,
} from "@/data/demo/crm";

export function UatView() {
  const [toast, setToast] = useState<string | null>(null);
  /** 開啟回報視窗的測試項;null = 關閉 */
  const [reporting, setReporting] = useState<UatCase | null>(null);

  const fireToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <PageContainer>
      <PageTitle
        icon={ClipboardCheck}
        title="內部封測 (UAT)"
        subtitle={`${UAT_SECTIONS.length} 個測試章節 · 合計 ${UAT_SUMMARY.total} 項驗收項目`}
      />

      {/* 統計卡 */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="總項目"
          value={UAT_SUMMARY.total}
          hint="本輪驗收"
          icon={ListChecks}
        />
        <StatCard
          label="已通過"
          value={UAT_SUMMARY.pass}
          hint="符合預期"
          icon={CheckCircle2}
          accentClass="text-emerald-600"
        />
        <StatCard
          label="異常"
          value={UAT_SUMMARY.fail}
          hint="待修復"
          icon={AlertTriangle}
          accentClass="text-rose-600"
        />
        <StatCard
          label="未測"
          value={UAT_SUMMARY.untested}
          hint="尚待驗收"
          icon={CircleDashed}
          accentClass="text-ink-soft"
        />
      </div>

      {/* 測試章節 */}
      <div className="space-y-4">
        {UAT_SECTIONS.map((section) => {
          const passCount = section.cases.filter(
            (c) => c.status === "pass"
          ).length;
          return (
            <Card key={section.key}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    {section.title}
                  </h3>
                  <p className="text-xs text-ink-muted">{section.desc}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                  {passCount} / {section.cases.length} 通過
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs font-semibold text-ink-muted">
                      <th className="py-2 pr-3">測試項目</th>
                      <th className="py-2 pr-3">預期結果</th>
                      <th className="py-2 pr-3 w-20">狀態</th>
                      <th className="py-2 w-16 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.cases.map((c) => {
                      const meta = UAT_STATUS_META[c.status];
                      return (
                        <tr
                          key={c.id}
                          className="border-b border-slate-50 last:border-0"
                        >
                          <td className="py-2.5 pr-3 font-medium text-ink">
                            {c.title}
                          </td>
                          <td className="py-2.5 pr-3 text-ink-muted">
                            {c.expected}
                          </td>
                          <td className="py-2.5 pr-3">
                            <Pill color={meta.pill}>{meta.label}</Pill>
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (c.status === "fail") {
                                  setReporting(c);
                                } else {
                                  fireToast(
                                    `已記錄「${c.title}」回報(Demo 示意)`
                                  );
                                }
                              }}
                              className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:bg-crm-soft/40 hover:text-crm"
                            >
                              回報
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 異常項回報視窗 */}
      <DemoModal
        open={reporting !== null}
        onClose={() => setReporting(null)}
        title={reporting ? `回報異常 · ${reporting.title}` : ""}
        accentClass="bg-crm"
      >
        {reporting && (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-ink-muted">預期結果</p>
              <p className="mt-0.5 text-sm text-ink-soft">
                {reporting.expected}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-muted">
                實際情況(範例)
              </p>
              <div className="mt-1 rounded-lg border border-rose-200 bg-rose-50/60 p-3 text-sm text-rose-700">
                與預期不符，需開立修復工單交由開發確認。
              </div>
            </div>
            <label className="block">
              <span className="text-xs font-semibold text-ink-muted">
                補充說明
              </span>
              <textarea
                rows={3}
                placeholder="描述重現步驟與影響範圍…(Demo 示意，不會送出)"
                className="mt-1 w-full resize-none rounded-lg border border-slate-200 p-2.5 text-sm text-ink-soft outline-none focus:border-crm"
              />
            </label>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReporting(null)}
                className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-slate-50"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = reporting.title;
                  setReporting(null);
                  fireToast(`已送出「${title}」修復工單(Demo 示意)`);
                }}
                className="rounded-lg bg-crm px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                送出工單
              </button>
            </div>
          </div>
        )}
      </DemoModal>

      <DemoToast message={toast} accentClass="bg-crm" />
    </PageContainer>
  );
}
