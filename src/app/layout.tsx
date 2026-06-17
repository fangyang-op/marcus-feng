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

// metadata 為伺服器端、固定值：SEO / 分享預覽以中文為預設（站內可前端切 En）
const ogTitle = `${siteConfig.name} — ${siteConfig.tagline.zh}`;
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
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
    description: siteConfig.summary.zh,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "zh_TW",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: siteConfig.summary.zh,
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
