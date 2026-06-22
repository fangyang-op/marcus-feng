"use client";

import { ArrowRight, Download, Linkedin, Sparkles } from "lucide-react";
import { siteConfig, heroCtas } from "@/data/site";
import { useLocale } from "@/i18n";
import { HeroBackdrop } from "./HeroBackdrop";

const ctaIcon = [ArrowRight, Download, Linkedin];

/** Hero 區（深色）：能量匯聚動畫背景 + 姓名、定位標語、一句話、三顆 CTA(中英切換) */
export function Hero() {
  const { locale, t } = useLocale();
  return (
    <section
      id="top"
      // -mt-16 把深色 Hero 拉到 sticky header 後面(內容用 pt 補回),
      // 讓最頂端的透明 header 後面是深色 Hero 而非白色 body → 白字可見。
      className="relative -mt-16 overflow-hidden bg-[#090e22] text-white"
    >
      {/* 深色漸層底 + 中央光暈(與 Canvas 核心呼應) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_42%,#16225a_0%,#0b1228_55%,#070b1c_100%)]" />
      {/* 能量匯聚 Canvas */}
      <HeroBackdrop />
      {/* 底部與下方淺色區銜接的淡出 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#070b1c]" />

      <div className="relative z-10 mx-auto w-full max-w-content px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-brand-200 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {t(siteConfig.role)} @ {t(siteConfig.org)}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t(siteConfig.tagline)}
          </h1>
          {/* 副標只在中文模式顯示英文標語；英文模式不再倒過來顯示中文標語 */}
          {locale === "zh" && (
            <p className="mt-3 text-lg font-medium text-brand-300 sm:text-xl">
              {siteConfig.tagline.en}
            </p>
          )}

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
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
                      ? "inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(59,101,246,0.45)] transition-all hover:bg-brand-400"
                      : "inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
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
    </section>
  );
}
