"use client";

import { ArrowRight, Download, Linkedin, Sparkles } from "lucide-react";
import { siteConfig, heroCtas } from "@/data/site";
import { useLocale } from "@/i18n";

const ctaIcon = [ArrowRight, Download, Linkedin];

/** Hero 區:姓名、定位標語、一句話、三顆 CTA(中英切換) */
export function Hero() {
  const { locale, t } = useLocale();
  // 副標顯示「另一個語系」的標語,維持中英並陳的質感
  const otherTagline =
    locale === "zh" ? siteConfig.tagline.en : siteConfig.tagline.zh;

  return (
    <div id="top" className="relative overflow-hidden">
      {/* 背景:深藍漸層光暈 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="absolute -top-24 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-content px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-brand-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {t(siteConfig.role)} @ {siteConfig.org}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t(siteConfig.tagline)}
          </h1>
          <p className="mt-3 text-lg font-medium text-brand-700 sm:text-xl">
            {otherTagline}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {t(siteConfig.summary)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {heroCtas.map((cta, i) => {
              const Icon = ctaIcon[i] ?? ArrowRight;
              const primary = i === 0;
              return (
                <a
                  key={cta.href}
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noopener noreferrer" : undefined}
                  className={
                    primary
                      ? "inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-800 hover:shadow-card-hover"
                      : "inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-400 hover:text-brand-700"
                  }
                >
                  <Icon className="h-4 w-4" />
                  {t(cta.label)}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
