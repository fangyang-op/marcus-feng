import { Section, SectionHeading } from "./ui/Section";
import { CountUp } from "./ui/CountUp";
import { metrics } from "@/data/metrics";

/** 核心成果條:4 個數字卡片 */
export function MetricsBar() {
  return (
    <Section id="metrics" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Impact"
        title="可量化的營運成果"
        description="不只「做過」，而是把營運決策變成能用數字驗證的結果。"
      />
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <CountUp
              value={m.value}
              className="tabular block text-3xl font-extrabold tracking-tight text-brand-700 sm:text-4xl"
            />
            <div className="mt-2 text-sm font-semibold text-ink">{m.label}</div>
            <div className="mt-1 text-xs leading-relaxed text-ink-muted">
              {m.detail}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
