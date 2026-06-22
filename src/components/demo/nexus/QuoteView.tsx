"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Coins,
  Calculator,
  Save,
  FileImage,
  Copy,
  RefreshCw,
} from "lucide-react";
import { PageContainer, PageTitle } from "@/components/demo/primitives";
import { DemoToast } from "@/components/demo/widgets";
import {
  QUOTE_STEPS,
  QUOTE_CAMPUSES,
  QUOTE_COURSES,
  QUOTE_ACCOMMODATIONS,
  QUOTE_ADDONS,
  DISCOUNT_OPTIONS,
  type QuoteCampus,
} from "@/data/demo/nexus";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const NEXUS_ACCENT = "bg-nexus-pink";

export function QuoteView() {
  const [step, setStep] = useState(0);
  const [campusId, setCampusId] = useState(QUOTE_CAMPUSES[0].id);
  const [courseName, setCourseName] = useState(QUOTE_COURSES[0].name);
  const [weeks, setWeeks] = useState(12);
  const [startDate, setStartDate] = useState("2025-09-01");
  const [accId, setAccId] = useState("homestay");
  const [addOnIds, setAddOnIds] = useState<string[]>(["reg", "insurance"]);
  const [discountId, setDiscountId] = useState("early");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const campus = QUOTE_CAMPUSES.find((c) => c.id === campusId) as QuoteCampus;
  const course = QUOTE_COURSES.find((c) => c.name === courseName) ?? QUOTE_COURSES[0];
  const acc = QUOTE_ACCOMMODATIONS.find((a) => a.id === accId) ?? QUOTE_ACCOMMODATIONS[0];
  const addOns = QUOTE_ADDONS.filter((a) => addOnIds.includes(a.id));
  const discount = DISCOUNT_OPTIONS.find((d) => d.id === discountId) ?? DISCOUNT_OPTIONS[0];

  const computed = useMemo(() => {
    const courseForeign = course.pricePerWeek * weeks;
    const accForeign = acc.pricePerWeek * weeks;
    const addOnForeign = addOns.reduce((sum, a) => sum + a.price, 0);
    const foreignTotal = courseForeign + accForeign + addOnForeign;
    const rawTWD = foreignTotal * campus.exchangeRate;

    let discountAmount = 0;
    if (discount.type === "percent") discountAmount = rawTWD * (discount.value / 100);
    else if (discount.type === "fixed") discountAmount = discount.value;
    const finalTWD = Math.max(0, rawTWD - discountAmount);

    return {
      lines: [
        { label: `課程費 · ${course.name}`, detail: `${campus.currency} ${fmt(course.pricePerWeek)} × ${weeks} 週`, value: courseForeign },
        ...(acc.pricePerWeek > 0
          ? [{ label: `住宿 · ${acc.name}`, detail: `${campus.currency} ${fmt(acc.pricePerWeek)} × ${weeks} 週`, value: accForeign }]
          : []),
        ...addOns.map((a) => ({ label: `加購 · ${a.name}`, detail: "一次性", value: a.price })),
      ],
      foreignTotal,
      rawTWD,
      discountAmount,
      finalTWD,
    };
  }, [campus, course, weeks, acc, addOns, discount]);

  const canNext = () => {
    if (step === 0) return !!campusId;
    if (step === 1) return !!courseName;
    if (step === 2) return weeks > 0;
    return true;
  };

  const reset = () => {
    setStep(0);
    setCampusId(QUOTE_CAMPUSES[0].id);
    setCourseName(QUOTE_COURSES[0].name);
    setWeeks(12);
    setAccId("homestay");
    setAddOnIds(["reg", "insurance"]);
    setDiscountId("early");
  };

  return (
    <PageContainer>
      <PageTitle
        icon={Calculator}
        title="遊學報價系統"
        subtitle="7 步驟報價精靈 · 右側即時費用試算（示意）"
      />

      {/* Stepper */}
      <div className="mb-5 flex items-center gap-1.5 overflow-x-auto pb-1">
        {QUOTE_STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => i <= step && setStep(i)}
            disabled={i > step}
            className={`flex flex-none items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
              i === step
                ? "bg-nexus-pink text-white"
                : i < step
                  ? "bg-nexus-pink/10 text-nexus-pink"
                  : "bg-slate-100 text-slate-400"
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                i === step ? "bg-white/25" : i < step ? "bg-nexus-pink/20" : "bg-slate-200"
              }`}
            >
              {i < step ? <Check className="h-2.5 w-2.5" /> : i + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* 左：目前步驟表單 */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {step === 0 && (
              <StepWrap title="選擇校區">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {QUOTE_CAMPUSES.map((c) => (
                    <SelectButton
                      key={c.id}
                      active={campusId === c.id}
                      onClick={() => setCampusId(c.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{c.flag}</span>
                        <div>
                          <div className="text-sm font-bold text-ink">{c.city}</div>
                          <div className="text-[11px] text-ink-muted">
                            {c.country} · {c.currency}
                          </div>
                        </div>
                      </div>
                    </SelectButton>
                  ))}
                </div>
              </StepWrap>
            )}

            {step === 1 && (
              <StepWrap title="選擇課程">
                <div className="space-y-2">
                  {QUOTE_COURSES.map((c) => (
                    <SelectButton
                      key={c.name}
                      active={courseName === c.name}
                      onClick={() => setCourseName(c.name)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-sm font-bold text-ink">{c.name}</div>
                          <div className="text-[11px] text-ink-muted">{c.note}</div>
                        </div>
                        <span className="font-mono text-xs text-ink-soft">
                          {campus.currency} {fmt(c.pricePerWeek)}/週
                        </span>
                      </div>
                    </SelectButton>
                  ))}
                </div>
              </StepWrap>
            )}

            {step === 2 && (
              <StepWrap title="週數與開始日期">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <span className="mb-1.5 block text-xs font-bold text-ink-soft">週數</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={1}
                        max={48}
                        value={weeks}
                        onChange={(e) => setWeeks(parseInt(e.target.value, 10))}
                        className="flex-1 cursor-pointer accent-nexus-pink"
                      />
                      <span className="w-16 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-center font-mono text-sm font-bold text-ink">
                        {weeks} 週
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-muted">
                      <span>1</span>
                      <span>24</span>
                      <span>48</span>
                    </div>
                  </div>
                  <div>
                    <span className="mb-1.5 block text-xs font-bold text-ink-soft">開始日期</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-ink outline-none focus:border-nexus-pink focus:bg-white"
                    />
                  </div>
                </div>
              </StepWrap>
            )}

            {step === 3 && (
              <StepWrap title="住宿安排">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {QUOTE_ACCOMMODATIONS.map((a) => (
                    <SelectButton
                      key={a.id}
                      active={accId === a.id}
                      onClick={() => setAccId(a.id)}
                    >
                      <div className="text-sm font-bold text-ink">{a.name}</div>
                      <div className="text-[11px] text-ink-muted">
                        {a.pricePerWeek > 0
                          ? `${campus.currency} ${fmt(a.pricePerWeek)}/週`
                          : "不需住宿"}
                        {a.note ? ` · ${a.note}` : ""}
                      </div>
                    </SelectButton>
                  ))}
                </div>
              </StepWrap>
            )}

            {step === 4 && (
              <StepWrap title="加購項目">
                <div className="space-y-1.5">
                  {QUOTE_ADDONS.map((a) => {
                    const on = addOnIds.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() =>
                          setAddOnIds((prev) =>
                            on ? prev.filter((x) => x !== a.id) : [...prev, a.id],
                          )
                        }
                        className={`flex w-full items-center justify-between gap-2 rounded-lg border p-2.5 text-left transition-all ${
                          on
                            ? "border-nexus-pink bg-nexus-pink/5"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-ink">{a.name}</span>
                          <span className="ml-1.5 text-[11px] text-ink-muted">{a.note}</span>
                        </div>
                        <div className="flex flex-none items-center gap-2">
                          <span className="font-mono text-[11px] text-ink-soft">
                            {campus.currency} {fmt(a.price)}
                          </span>
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded border ${
                              on
                                ? "border-nexus-pink bg-nexus-pink"
                                : "border-slate-300"
                            }`}
                          >
                            {on && <Check className="h-2.5 w-2.5 text-white" />}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </StepWrap>
            )}

            {step === 5 && (
              <StepWrap title="折扣方案">
                <div className="space-y-1.5">
                  {DISCOUNT_OPTIONS.map((d) => (
                    <label
                      key={d.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2.5 transition-all ${
                        discountId === d.id
                          ? "border-nexus-pink bg-nexus-pink/5"
                          : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="discount"
                        checked={discountId === d.id}
                        onChange={() => setDiscountId(d.id)}
                        className="accent-nexus-pink"
                      />
                      <span className="text-sm text-ink-soft">{d.label}</span>
                    </label>
                  ))}
                </div>
              </StepWrap>
            )}

            {step === 6 && (
              <StepWrap title="確認報價 / 儲存">
                <div className="mb-4 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-ink-soft">
                  已選擇 <b className="text-ink">{campus.city}</b> ·{" "}
                  <b className="text-ink">{course.name}</b> ·{" "}
                  <b className="text-ink">{weeks} 週</b> · 住宿{" "}
                  <b className="text-ink">{acc.name}</b> · 加購{" "}
                  <b className="text-ink">{addOns.length}</b> 項 · 折扣{" "}
                  <b className="text-ink">{discount.label}</b>。
                  <br />
                  台幣總額約{" "}
                  <b className="text-nexus-pink">NT$ {fmt(computed.finalTWD)}</b>。
                </div>
                <div className="flex flex-wrap gap-2">
                  <ActionBtn
                    icon={Save}
                    primary
                    onClick={() =>
                      showToast(`已建立 ${campus.city} ${weeks} 週報價並存入 CRM(Demo 示意)`)
                    }
                  >
                    存入 CRM
                  </ActionBtn>
                  <ActionBtn
                    icon={FileImage}
                    onClick={() => showToast("報價單 PNG 已產生並下載（Demo 示意）")}
                  >
                    下載 PNG
                  </ActionBtn>
                  <ActionBtn
                    icon={Copy}
                    onClick={() => showToast("開單內容已複製到剪貼簿（Demo 示意）")}
                  >
                    複製開單內容
                  </ActionBtn>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-ink-muted hover:text-ink"
                  >
                    <RefreshCw className="h-4 w-4" /> 重新報價
                  </button>
                </div>
                <p className="mt-3 text-xs text-ink-muted">
                  以上按鈕於 Demo 中為展示用，不會實際送出。
                </p>
              </StepWrap>
            )}

            {/* 步驟控制 */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-ink-soft hover:bg-slate-100 disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> 上一步
              </button>
              {step < QUOTE_STEPS.length - 1 && (
                <button
                  type="button"
                  onClick={() => canNext() && setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-nexus-pink px-5 py-2 text-sm font-bold text-white hover:bg-nexus-purple disabled:opacity-50"
                >
                  下一步 <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 右：即時費用預覽 */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-nexus-pink to-nexus-purple px-4 py-3 text-white">
              <div className="flex items-center gap-1.5 text-sm font-bold">
                <Coins className="h-4 w-4" /> 即時費用預覽
              </div>
              <div className="mt-0.5 text-xs text-white/90">
                Lumina · {campus.city} · {weeks} 週
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 text-[11px] font-bold uppercase text-ink-muted">
                費用項目（{campus.currency}）
              </div>
              <div className="mb-3 max-h-64 space-y-1.5 overflow-y-auto">
                {computed.lines.map((l, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 text-xs">
                    <div className="min-w-0">
                      <span className="text-ink-soft">{l.label}</span>
                      <div className="text-[10px] text-ink-muted">{l.detail}</div>
                    </div>
                    <span className="flex-none font-mono text-ink">
                      {campus.currency} {fmt(l.value)}
                    </span>
                  </div>
                ))}
              </div>

              {computed.discountAmount > 0 && (
                <div className="flex justify-between border-t border-slate-100 pt-2 text-xs font-semibold text-rose-600">
                  <span>優惠折扣 {discount.label}</span>
                  <span>- NT$ {fmt(computed.discountAmount)}</span>
                </div>
              )}

              <div className="mt-2 border-t-2 border-nexus-pink/30 pt-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-ink">台幣總額</span>
                  <span className="font-mono text-xl font-black text-nexus-pink">
                    NT$ {fmt(computed.finalTWD)}
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-ink-muted">
                  外幣原價:{campus.currency} {fmt(computed.foreignTotal)} · 匯率{" "}
                  {campus.exchangeRate}
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-slate-50 p-2 text-[11px] text-ink-muted">
                金額為示意假值，實際開單以最新匯率與廠商報價為準。
              </div>
            </div>
          </div>
        </div>
      </div>

      <DemoToast message={toast} accentClass={NEXUS_ACCENT} />
    </PageContainer>
  );
}

function StepWrap({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 font-bold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function SelectButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border p-3 text-left transition-all ${
        active
          ? "border-nexus-pink bg-nexus-pink/5"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

function ActionBtn({
  icon: Icon,
  children,
  primary,
  onClick,
}: {
  icon: typeof Save;
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
        primary
          ? "bg-nexus-pink text-white hover:bg-nexus-purple"
          : "border border-slate-200 bg-white text-ink-soft hover:bg-slate-50"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}
