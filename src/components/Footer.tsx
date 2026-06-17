import { Linkedin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { CopyEmail } from "./ui/CopyEmail";

/** 頁尾:聯絡方式 + 自建宣告 */
export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Get in touch
            </p>
            <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              想找一位「能自己動手建系統的營運人」?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              無論是營運制度、CRM / 數據系統建置，或 AI 導入，歡迎聊聊。
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end md:justify-center">
            <CopyEmail
              email={siteConfig.email}
              className="inline-flex items-center gap-2.5 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-400 hover:text-brand-700"
            />
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              <Linkedin className="h-4 w-4" />
              linkedin.com/in/marcus-jyfeng
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="font-medium">{siteConfig.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
