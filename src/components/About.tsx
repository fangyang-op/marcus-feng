import { Section } from "./ui/Section";
import { about } from "@/data/about";

/** 關於我 / About:照片 + 一段有故事性的短文 */
export function About() {
  return (
    <Section id="about" className="py-16 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* 照片 */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:mx-0">
            {/* 背後柔和品牌色塊 */}
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-brand-100 to-brand-50" />
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.photo}
                alt={about.photoAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 短文 */}
        <div className="lg:col-span-7">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
            {about.eyebrow}
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {about.title}
          </h2>
          <div className="mt-6 space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-soft sm:text-[17px]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
