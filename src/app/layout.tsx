import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { siteConfig } from "@/data/site";
import { LocaleProvider } from "@/i18n";
import "./globals.css";

// 拉丁字母 / 數字
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// 繁體中文
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-zh",
  display: "swap",
});

// metadata 為伺服器端、固定值（站內可前端切 En）。
// 分享卡：標題用「姓名・中文定位」、描述用英文標語；皆取自 siteConfig，改標語會自動同步。
const ogTitle = `${siteConfig.name}・${siteConfig.tagline.zh}`;
const ogDescription = siteConfig.tagline.en;
const ogImage = {
  // 換圖後沿用同檔名，加版本號讓 FB / LinkedIn / 104 重新抓圖（避開舊快取）
  url: "/og-image.png?v=3",
  width: 1264,
  height: 622,
  alt: ogTitle,
  type: "image/png",
};

export const metadata: Metadata = {
  // 讓相對路徑（/og-image.png）被解析成絕對網址，分享到 104/LinkedIn/FB 才抓得到圖
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role.zh}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.summary.zh,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "zh_TW",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className={`${inter.variable} ${notoSansTC.variable}`}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
