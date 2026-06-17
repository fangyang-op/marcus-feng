import { Wrench, Compass } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { toolchain, operations } from "@/data/skills";
import type { SkillGroup } from "@/data/types";

function SkillColumn({
  icon,
  title,
  subtitle,
  groups,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  groups: SkillGroup[];
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-ink">{title}</h3>
          <p className="text-xs text-ink-muted">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {g.title}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm font-medium text-ink-soft"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 能力與技術:左工具鏈、右營運能力 */
export function Skills() {
  return (
    <Section id="skills" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Capabilities"
        title="工具鏈 × 營運能力"
        description="左邊是我用來把想法變成系統的技術;右邊是我作為營運人的核心職能。兩者結合,才能既看得到問題、也做得出解法。"
      />
      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SkillColumn
          icon={<Wrench className="h-5 w-5 text-white" />}
          title="工具鏈 Toolchain"
          subtitle="親手建系統用的技術"
          groups={toolchain}
          accent="bg-brand-700"
        />
        <SkillColumn
          icon={<Compass className="h-5 w-5 text-white" />}
          title="營運能力 Operations"
          subtitle="辨識問題與帶團隊的職能"
          groups={operations}
          accent="bg-ink"
        />
      </div>
    </Section>
  );
}
