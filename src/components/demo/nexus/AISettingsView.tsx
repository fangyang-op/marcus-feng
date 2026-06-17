"use client";

import { useState } from "react";
import {
  Sparkles,
  Eye,
  EyeOff,
  KeyRound,
  Check,
  Wrench,
  Save,
} from "lucide-react";
import {
  PageContainer,
  PageTitle,
  Card,
  ProgressBar,
} from "@/components/demo/primitives";
import { DemoToast } from "@/components/demo/widgets";
import {
  AI_MODEL_OPTIONS,
  AI_MAINTENANCE_TOOLS,
  AI_VECTORIZE_PROGRESS,
} from "@/data/demo/nexus";

const NEXUS_ACCENT = "bg-nexus-pink";

// 寫死的遮罩字串(非真實金鑰,純示意)
const MASKED_GEMINI = "AIza••••••••••••••••••••••••••3xQ7";
const MASKED_CLAUDE = "sk-ant-••••••••••••••••••••••••9fD2";

export function AISettingsView() {
  const [showGemini, setShowGemini] = useState(false);
  const [showClaude, setShowClaude] = useState(false);
  const [model, setModel] = useState<string>("claude-sonnet");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const pct = Math.round(
    (AI_VECTORIZE_PROGRESS.done / AI_VECTORIZE_PROGRESS.total) * 100,
  );

  return (
    <PageContainer>
      <PageTitle
        icon={Sparkles}
        title="AI 設定"
        subtitle="模型金鑰、對話模型與向量化維護(全為示意,互動為純前端)"
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* API Key 區 */}
        <Card>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
            <KeyRound className="h-4 w-4 text-nexus-pink" />
            API 金鑰
          </h3>
          <div className="space-y-4">
            <KeyField
              label="Gemini API Key"
              value={MASKED_GEMINI}
              shown={showGemini}
              onToggle={() => setShowGemini((v) => !v)}
            />
            <KeyField
              label="Claude API Key"
              value={MASKED_CLAUDE}
              shown={showClaude}
              onToggle={() => setShowClaude((v) => !v)}
            />
          </div>
          <button
            type="button"
            onClick={() => showToast("金鑰設定已儲存(Demo 示意)")}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-nexus-pink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-nexus-purple"
          >
            <Save className="h-4 w-4" />
            儲存金鑰
          </button>
        </Card>

        {/* 向量化進度 + 維護工具 */}
        <Card>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
            <Wrench className="h-4 w-4 text-nexus-pink" />
            向量化與維護
          </h3>

          <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-ink">目前向量化進度</span>
              <span className="font-mono font-bold text-nexus-pink">
                {AI_VECTORIZE_PROGRESS.done} / {AI_VECTORIZE_PROGRESS.total}
              </span>
            </div>
            <ProgressBar
              value={AI_VECTORIZE_PROGRESS.done}
              max={AI_VECTORIZE_PROGRESS.total}
              className="bg-gradient-to-r from-nexus-pink to-nexus-purple"
            />
            <div className="mt-1.5 text-right text-xs text-ink-muted">{pct}% 完成</div>
          </div>

          <div className="space-y-2">
            {AI_MAINTENANCE_TOOLS.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => showToast(`已觸發「${tool.label}」(Demo 示意)`)}
                className="flex w-full items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left transition-colors hover:border-nexus-pink/40 hover:bg-nexus-pink/5"
              >
                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-nexus-pink/10 text-nexus-pink">
                  <Wrench className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{tool.label}</span>
                  <span className="block text-xs text-ink-muted">{tool.description}</span>
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* 對話模型選擇 */}
      <Card className="mt-5">
        <h3 className="mb-1 flex items-center gap-2 text-sm font-bold text-ink">
          <Sparkles className="h-4 w-4 text-nexus-pink" />
          對話模型
        </h3>
        <p className="mb-4 text-xs text-ink-muted">
          選擇 AI 助理使用的對話模型。不同模型在速度與品質間有所取捨。
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {AI_MODEL_OPTIONS.map((m) => {
            const active = model === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setModel(m.id);
                  showToast(`已切換對話模型為 ${m.name}(Demo 示意)`);
                }}
                className={`relative flex flex-col rounded-xl border-2 p-4 text-left transition-all ${
                  active
                    ? "border-nexus-pink bg-nexus-pink/5 shadow-sm"
                    : "border-slate-200 bg-white hover:border-nexus-pink/40"
                }`}
              >
                {active && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-nexus-pink text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <span
                  className={`mb-1 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    m.provider === "Claude"
                      ? "bg-violet-100 text-violet-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {m.provider}
                </span>
                <span className="text-sm font-bold text-ink">{m.name}</span>
                <span className="mt-1 text-xs leading-relaxed text-ink-soft">{m.tagline}</span>
                <span className="mt-3 flex gap-1.5">
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-ink-soft">
                    速度 {m.speedLabel}
                  </span>
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-ink-soft">
                    {m.qualityLabel}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      <DemoToast message={toast} accentClass={NEXUS_ACCENT} />
    </PageContainer>
  );
}

function KeyField({
  label,
  value,
  shown,
  onToggle,
}: {
  label: string;
  value: string;
  shown: boolean;
  onToggle: () => void;
}) {
  // 遮罩時統一顯示圓點;顯示時露出寫死的示意字串
  const masked = "•".repeat(28);
  return (
    <div>
      <label className="mb-1 block text-xs font-bold text-ink-muted">{label}</label>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={shown ? value : masked}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-ink outline-none"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={shown ? "隱藏金鑰" : "顯示金鑰"}
          title={shown ? "隱藏金鑰" : "顯示金鑰"}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-slate-300 bg-white text-ink-soft hover:bg-slate-50"
        >
          {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
