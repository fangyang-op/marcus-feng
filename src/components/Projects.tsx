import { Section, SectionHeading } from "./ui/Section";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

/** 精選專案:卡片式，可展開說明，部分可進入 Demo */
export function Projects() {
  return (
    <Section id="projects" className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Featured Projects"
        title="我親手建出來的系統"
        description="每一個都從真實營運痛點出發，由我設計、用 AI 協作開發、實際導入團隊使用。點「進入 Demo」可操作 UI 骨架(資料皆為示意)。"
      />
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}
