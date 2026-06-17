"use client";

import { useMemo, useState } from "react";
import {
  Target,
  Sparkles,
  Trophy,
  CheckCircle,
  AlertCircle,
  MapPin,
  History,
  Sliders,
  RotateCcw,
  BookOpen,
  Loader2,
} from "lucide-react";
import { PageContainer, PageTitle, Card } from "@/components/demo/primitives";
import {
  PLACEMENT_SCHOOLS,
  PLACEMENT_DEFAULT_INPUT,
  PLACEMENT_REASONING,
  type PlacementSchool,
} from "@/data/demo/nexus";

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/**
 * 客戶端 What-if 線性推估（對齊原產品邏輯）:
 * 以 AI 給的基準機率為錨點，依 GPA / TOEFL 相對基準的變動量推估學術因子位移，
 * 再換算為機率位移。delta 為 0 時即回到 AI 原始機率。
 */
function simulate(
  s: PlacementSchool,
  gpaDelta: number, // 4.0 制
  toeflDelta: number,
) {
  const academicShift = gpaDelta * 2.5 * 0.5 + toeflDelta * 0.1 * 0.5;
  const newAcademic = clamp(s.academicFactor + academicShift, 0, 10);
  const actualShift = newAcademic - s.academicFactor;
  const probabilityShift = actualShift * 4; // 1 學術點 ≈ 4 個百分點
  const probability = clamp(s.baseProbability + probabilityShift, 0, 100);
  return { probability, academic: newAcademic };
}

function probColor(p: number) {
  if (p >= 70) return { bar: "bg-emerald-500", text: "text-emerald-700" };
  if (p >= 40) return { bar: "bg-amber-500", text: "text-amber-700" };
  return { bar: "bg-rose-500", text: "text-rose-700" };
}

interface Profile {
  gpa: number;
  toefl: number;
  major: string;
  country: string;
}

export function PlacementView() {
  // 表單草稿（尚未分析）
  const [draft, setDraft] = useState<Profile>({ ...PLACEMENT_DEFAULT_INPUT });
  // 已分析後鎖定的基準輪廓（分析動作的產物）
  const [analyzed, setAnalyzed] = useState<Profile | null>({ ...PLACEMENT_DEFAULT_INPUT });
  const [analyzing, setAnalyzing] = useState(false);
  // What-if 模擬器在「已分析基準」之上即時調整 GPA / TOEFL
  const [whatIfGpa, setWhatIfGpa] = useState(PLACEMENT_DEFAULT_INPUT.gpa);
  const [whatIfToefl, setWhatIfToefl] = useState(PLACEMENT_DEFAULT_INPUT.toefl);

  // 草稿是否與已分析輪廓不同 → 顯示「待分析」提示
  const dirty = useMemo(() => {
    if (!analyzed) return true;
    return (
      Math.abs(draft.gpa - analyzed.gpa) > 0.001 ||
      draft.toefl !== analyzed.toefl ||
      draft.major !== analyzed.major ||
      draft.country !== analyzed.country
    );
  }, [draft, analyzed]);

  /** 「分析」動作:鎖定草稿為基準、重置 What-if 滑桿到該基準 */
  const runAnalysis = () => {
    setAnalyzing(true);
    const snapshot = { ...draft };
    // 短暫 loading 讓「分析」動作有明確回饋（非亂數、非讀時鐘）
    window.setTimeout(() => {
      setAnalyzed(snapshot);
      setWhatIfGpa(snapshot.gpa);
      setWhatIfToefl(snapshot.toefl);
      setAnalyzing(false);
    }, 650);
  };

  // What-if 基準鎖在「已分析」的輪廓上
  const baseGpa = analyzed?.gpa ?? PLACEMENT_DEFAULT_INPUT.gpa;
  const baseToefl = analyzed?.toefl ?? PLACEMENT_DEFAULT_INPUT.toefl;
  const gpaDelta = whatIfGpa - baseGpa;
  const toeflDelta = whatIfToefl - baseToefl;
  const hasWhatIf = Math.abs(gpaDelta) > 0.001 || Math.abs(toeflDelta) > 0.5;

  const resetWhatIf = () => {
    setWhatIfGpa(baseGpa);
    setWhatIfToefl(baseToefl);
  };

  const dream = PLACEMENT_SCHOOLS.filter((s) => s.tier === "dream");
  const match = PLACEMENT_SCHOOLS.filter((s) => s.tier === "match");
  const safety = PLACEMENT_SCHOOLS.filter((s) => s.tier === "safety");

  const hasResult = analyzed != null;

  return (
    <PageContainer>
      <PageTitle
        icon={Target}
        title="AI 落點分析"
        subtitle="參考歷屆 40 筆相似背景榜單 · 分析後可即時 What-if 模擬（示意）"
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* 左:輸入 */}
        <div className="w-full flex-none lg:w-80">
          <Card className="lg:sticky lg:top-4">
            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-nexus-pink to-nexus-purple text-white shadow-md shadow-nexus-pink/30">
                <Target className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-ink">學生條件輸入</h3>
                <p className="text-xs text-ink-muted">Student Profile</p>
              </div>
            </div>

            <div className="space-y-4">
              <Field label="GPA (4.0 制)">
                <input
                  type="number"
                  step="0.05"
                  min={2}
                  max={4}
                  value={draft.gpa}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, gpa: parseFloat(e.target.value) || 0 }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
                />
              </Field>
              <Field label="TOEFL">
                <input
                  type="number"
                  min={60}
                  max={120}
                  value={draft.toefl}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, toefl: parseInt(e.target.value, 10) || 0 }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
                />
              </Field>
              <Field label="目標科系">
                <input
                  value={draft.major}
                  onChange={(e) => setDraft((d) => ({ ...d, major: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
                />
              </Field>
              <Field label="目標國家">
                <input
                  value={draft.country}
                  onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-ink outline-none focus:border-nexus-pink focus:bg-white focus:ring-2 focus:ring-nexus-pink/20"
                />
              </Field>

              <button
                type="button"
                onClick={runAnalysis}
                disabled={analyzing}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-nexus-pink to-nexus-purple py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-95 disabled:opacity-70"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> AI 分析中…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />{" "}
                    {hasResult ? "重新分析" : "開始 AI 分析"}
                  </>
                )}
              </button>

              {dirty && hasResult && !analyzing && (
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700">
                  條件已修改，點「重新分析」以更新右側落點結果。
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* 右:結果 */}
        <div className="min-w-0 flex-1 space-y-6">
          {analyzing && (
            <div className="flex items-center gap-3 rounded-xl border border-nexus-pink/20 bg-nexus-pink/5 px-5 py-4 text-sm font-medium text-nexus-pink">
              <Loader2 className="h-5 w-5 animate-spin" />
              正在比對歷屆榜單與院校門檻，計算各校落點機率…
            </div>
          )}

          {hasResult && !analyzing && (
            <>
              {/* 已分析輪廓摘要 */}
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs shadow-sm">
                <span className="font-bold text-ink-muted">本次分析輪廓</span>
                <ProfileChip label="GPA" value={analyzed.gpa.toFixed(2)} />
                <ProfileChip label="TOEFL" value={`${analyzed.toefl}`} />
                <ProfileChip label="科系" value={analyzed.major} />
                <ProfileChip label="國家" value={analyzed.country} />
              </div>

              {/* AI 推理說明 */}
              <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-lg">
                <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
                  <BookOpen className="h-5 w-5" /> AI 推理說明
                </h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  {PLACEMENT_REASONING}
                </p>
              </div>

              {/* What-if 滑桿 */}
              <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                    <Sliders className="h-4 w-4 text-indigo-600" /> What-if 模擬器
                    {hasWhatIf && (
                      <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        已模擬
                      </span>
                    )}
                  </h3>
                  {hasWhatIf && (
                    <button
                      type="button"
                      onClick={resetWhatIf}
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100"
                    >
                      <RotateCcw className="h-3 w-3" /> 重設
                    </button>
                  )}
                </div>
                <p className="mb-4 text-xs leading-relaxed text-ink-soft">
                  拖動滑桿即時模擬:若學生 GPA 或 TOEFL 改變，各校錄取機率如何變動?(以本次分析輪廓為基準線性推估，不重新呼叫 AI)
                </p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Slider
                    label="GPA (4.0 制)"
                    value={whatIfGpa}
                    min={2}
                    max={4}
                    step={0.05}
                    onChange={setWhatIfGpa}
                    display={whatIfGpa.toFixed(2)}
                    delta={Math.abs(gpaDelta) > 0.005 ? `${gpaDelta > 0 ? "+" : ""}${gpaDelta.toFixed(2)}` : null}
                    deltaPositive={gpaDelta > 0}
                    marks={["2.0", "3.0", "4.0"]}
                  />
                  <Slider
                    label="TOEFL"
                    value={whatIfToefl}
                    min={60}
                    max={120}
                    step={1}
                    onChange={(v) => setWhatIfToefl(Math.round(v))}
                    display={`${whatIfToefl}`}
                    delta={Math.abs(toeflDelta) > 0.5 ? `${toeflDelta > 0 ? "+" : ""}${toeflDelta.toFixed(0)}` : null}
                    deltaPositive={toeflDelta > 0}
                    marks={["60", "90", "120"]}
                  />
                </div>
              </div>

              {/* 三欄結果 */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <Column
                  title="夢幻 (Dream)"
                  note="衝刺嘗試"
                  color="text-rose-600 border-rose-200"
                  icon={<Trophy className="h-5 w-5" />}
                  schools={dream}
                  gpaDelta={gpaDelta}
                  toeflDelta={toeflDelta}
                  hasWhatIf={hasWhatIf}
                />
                <Column
                  title="合適 (Match)"
                  note="主力申請"
                  color="text-emerald-600 border-emerald-200"
                  icon={<CheckCircle className="h-5 w-5" />}
                  schools={match}
                  gpaDelta={gpaDelta}
                  toeflDelta={toeflDelta}
                  hasWhatIf={hasWhatIf}
                />
                <Column
                  title="保底 (Safety)"
                  note="低風險"
                  color="text-blue-600 border-blue-200"
                  icon={<AlertCircle className="h-5 w-5" />}
                  schools={safety}
                  gpaDelta={gpaDelta}
                  toeflDelta={toeflDelta}
                  hasWhatIf={hasWhatIf}
                />
              </div>
            </>
          )}

          {!hasResult && !analyzing && (
            <Card className="flex flex-col items-center justify-center py-16 text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-nexus-pink/10 text-nexus-pink">
                <Sparkles className="h-7 w-7" />
              </span>
              <h3 className="text-base font-bold text-ink">輸入學生條件後開始分析</h3>
              <p className="mt-2 max-w-sm text-sm text-ink-muted">
                填寫左側 GPA / TOEFL / 目標科系與國家，點「開始 AI 分析」即可取得 Dream / Match / Safety 三檔落點與錄取機率。
              </p>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

function ProfileChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-semibold text-ink-soft">
      <span className="text-ink-muted">{label}</span>
      <span className="font-mono text-ink">{value}</span>
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  delta,
  deltaPositive,
  marks,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  delta: string | null;
  deltaPositive: boolean;
  marks: string[];
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-ink-soft">
          {label}
        </label>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg font-black text-indigo-700">
            {display}
          </span>
          {delta && (
            <span
              className={`font-mono text-[10px] font-bold ${
                deltaPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {delta}
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full cursor-pointer accent-indigo-600"
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-muted">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function Column({
  title,
  note,
  color,
  icon,
  schools,
  gpaDelta,
  toeflDelta,
  hasWhatIf,
}: {
  title: string;
  note: string;
  color: string;
  icon: React.ReactNode;
  schools: PlacementSchool[];
  gpaDelta: number;
  toeflDelta: number;
  hasWhatIf: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className={`flex items-center gap-2 border-b-2 pb-2.5 font-bold ${color}`}>
        {icon}
        <h3 className="text-sm">{title}</h3>
        <span className="ml-auto text-xs font-medium text-ink-muted">{note}</span>
      </div>
      {schools.map((s) => (
        <SchoolCard
          key={s.id}
          school={s}
          gpaDelta={gpaDelta}
          toeflDelta={toeflDelta}
          hasWhatIf={hasWhatIf}
        />
      ))}
    </div>
  );
}

function SchoolCard({
  school,
  gpaDelta,
  toeflDelta,
  hasWhatIf,
}: {
  school: PlacementSchool;
  gpaDelta: number;
  toeflDelta: number;
  hasWhatIf: boolean;
}) {
  const sim = simulate(school, gpaDelta, toeflDelta);
  const probability = hasWhatIf ? sim.probability : school.baseProbability;
  const probDelta = probability - school.baseProbability;
  const c = probColor(probability);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold leading-tight text-ink">
          {school.chineseName}
        </h4>
        {school.rank != null && (
          <span className="flex flex-none items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold text-ink-soft">
            <Trophy className="h-3 w-3 text-amber-500" /> #{school.rank}
          </span>
        )}
      </div>

      <div className="mb-3 flex items-center gap-1 text-[11px] text-ink-muted">
        <MapPin className="h-3 w-3 text-slate-400" />
        {school.location} · {school.country}
      </div>

      {/* 機率橫條 */}
      <div className="mb-3">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
            錄取機率
          </span>
          <div className="flex items-center gap-1.5">
            {hasWhatIf && Math.abs(probDelta) > 0.5 && (
              <span
                className={`font-mono text-[10px] font-bold ${
                  probDelta > 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {probDelta > 0 ? "+" : ""}
                {probDelta.toFixed(0)}
              </span>
            )}
            <span className={`font-mono text-sm font-black ${c.text}`}>
              {probability.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${c.bar} transition-all duration-300`}
            style={{ width: `${probability}%` }}
          />
        </div>
      </div>

      {school.similarOffers > 0 && (
        <span className="mb-2 inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
          <History className="h-3 w-3" /> 歷屆 {school.similarOffers} 筆
        </span>
      )}

      <p className="mb-3 text-xs italic leading-relaxed text-ink-soft">
        “{school.reasoningShort}”
      </p>

      <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-2.5">
        <span className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-ink-soft">
          GPA {school.reqGpa}
        </span>
        <span className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-ink-soft">
          TOEFL {school.reqToefl}
        </span>
      </div>
    </div>
  );
}
