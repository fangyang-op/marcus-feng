"use client";

import { useState, type ReactNode } from "react";
import { Check, Info, X, type LucideIcon } from "lucide-react";
import { PageContainer, PageTitle, Card } from "./primitives";

/**
 * ── Demo 共用互動 widget ──────────────────────────────────────
 * 三個 Demo（CRM / Nexus / Matrix）共用，確保「說明卡 / Modal / Toast / 翻轉卡」風格一致。
 * 用途:消除「點不動的尷尬」——次要頁用 FeatureNotice,no-op 按鈕用 DemoModal/DemoToast,
 * 招牌 KPI 卡用 FlipCard。
 */

/**
 * FeatureNotice — 次要功能頁的「功能說明卡」（原則 B）。
 * 左:功能說明 + 條列重點；右:CSS 示意 mockup（可自訂，否則用預設骨架）。
 * 讓「點不動」變成「有內容可讀」。
 */
export function FeatureNotice({
  icon,
  title,
  subtitle,
  description,
  features,
  mockup,
  footnote = "此為 Demo 示意 · 完整功能見原始系統",
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  mockup?: ReactNode;
  footnote?: string;
}) {
  return (
    <PageContainer>
      <PageTitle icon={icon} title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
          <ul className="mt-4 space-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <Check className="h-3.5 w-3.5 text-slate-500" />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="flex flex-col">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <span className="flex h-2 w-2 rounded-full bg-slate-300" />
            介面示意
          </div>
          <div className="flex-1">{mockup ?? <DefaultMockup />}</div>
        </Card>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
        <Info className="h-3.5 w-3.5" />
        {footnote}
      </p>
    </PageContainer>
  );
}

/** 預設 CSS 骨架 mockup（灰階區塊），不使用真實截圖 */
function DefaultMockup() {
  return (
    <div className="space-y-3 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-slate-200" />
        <div className="space-y-1.5">
          <div className="h-2.5 w-28 rounded bg-slate-200" />
          <div className="h-2 w-20 rounded bg-slate-100" />
        </div>
        <div className="ml-auto h-7 w-20 rounded-md bg-slate-200" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-md border border-slate-100 bg-white p-3">
          <div className="h-2.5 flex-1 rounded bg-slate-100" />
          <div className="h-2.5 w-16 rounded bg-slate-100" />
          <div className="h-5 w-12 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

/**
 * DemoModal — 受控小視窗（原則 C）。
 * 用於 no-op 按鈕點下去的回應:「Demo 環境示意，此功能在正式系統中可用」。
 * open / onClose 由呼叫端的 useState 控制。
 */
export function DemoModal({
  open,
  onClose,
  title,
  children,
  accentClass = "bg-brand-700",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  accentClass?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md animate-fade-up rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-ink-muted hover:bg-slate-100"
          aria-label="關閉"
        >
          <X className="h-4 w-4" />
        </button>
        <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg text-white ${accentClass}`}>
          <Info className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold text-ink">{title}</h3>
        <div className="mt-2 text-sm leading-relaxed text-ink-soft">
          {children ?? (
            <p>此功能於作品集 Demo 中為示意，在正式系統中可實際操作（含資料寫入與 API）。</p>
          )}
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${accentClass}`}
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * DemoToast — 受控提示條（原則 C 的輕量版）。
 * 呼叫端:const [toast,setToast]=useState<string|null>(null);
 *   onClick={()=>{ setToast('已存入（Demo 示意）'); setTimeout(()=>setToast(null),2000); }}
 * 然後在頁面尾端放 <DemoToast message={toast} />
 */
export function DemoToast({
  message,
  accentClass = "bg-slate-900",
}: {
  message: string | null;
  accentClass?: string;
}) {
  if (!message) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2">
      <div
        className={`animate-fade-up flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-lg ${accentClass}`}
      >
        <Check className="h-4 w-4" />
        {message}
      </div>
    </div>
  );
}

/**
 * FlipCard — 點擊翻轉卡（招牌 KPI 用）。
 * front / back 等大；點擊整張卡會翻面。請給固定高度（minHeight）讓兩面對齊。
 */
export function FlipCard({
  front,
  back,
  minHeight = 132,
  className = "",
}: {
  front: ReactNode;
  back: ReactNode;
  minHeight?: number;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`group cursor-pointer [perspective:1200px] ${className}`}
      onClick={() => setFlipped((v) => !v)}
      style={{ minHeight }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ minHeight, transform: flipped ? "rotateY(180deg)" : undefined }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">{front}</div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
