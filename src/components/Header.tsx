"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useLocale } from "@/i18n";
import { LangToggle } from "./ui/LangToggle";

/**
 * 頂部導覽：sticky、捲動感知。
 * 在深色 Hero 上時 → 透明背景 + 白字;捲過 Hero 後 → 白底毛玻璃 + 深字。
 * 桌機顯示錨點;中/EN 切換鈕桌機手機都顯示。
 */
export function Header() {
  const { t } = useLocale();
  // 預設 false = 一開始在深色 Hero 上(透明)。SSR 與首幀一致,避免 hydration 不符。
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 用 scrollY 判斷,並加「樓地板門檻」:scroll≈0(在 Hero 頂端)時保證為 false(透明),
    // 避免初次載入量測未就緒而誤判成已捲過 → 頂部變白底、白字看不見。
    const update = () => {
      const hero = document.getElementById("top");
      const threshold = Math.max(120, (hero?.offsetHeight ?? 600) - 72);
      setScrolled(window.scrollY > threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onDark = !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-md"
          : // 在 Hero 上:液態玻璃(霧面底塊,讓導覽有依託但仍透出電路)。
            // 用 inset 底緣高光當玻璃邊,不佔高度 → 不會再露頂部白線。
            "bg-white/10 shadow-[inset_0_-1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-2 px-5 sm:px-8">
        <Link href="#top" className="group flex shrink-0 items-center gap-2.5">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white transition-colors ${
              onDark
                ? "border border-white/20 bg-white/10 backdrop-blur-sm"
                : "bg-brand-600"
            }`}
          >
            MF
          </span>
          <span
            className={`hidden text-sm font-semibold transition-colors sm:inline ${
              onDark ? "text-white" : "text-ink"
            }`}
          >
            馮若陽{" "}
            <span className={onDark ? "text-white/60" : "text-ink-muted"}>
              Marcus Feng
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                onDark
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-ink-soft hover:bg-slate-100 hover:text-brand-700"
              }`}
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LangToggle onDark={onDark} />
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
              onDark
                ? "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                : "bg-brand-700 text-white shadow-sm hover:bg-brand-800"
            }`}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
