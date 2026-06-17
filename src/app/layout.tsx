import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { siteConfig } from "@/data/site";
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

const ogTitle = `${siteConfig.name} — ${siteConfig.tagline}`;
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: ogTitle,
  type: "image/png",
};

export const metadata: Metadata = {
  // 讓相對路徑(/og-image.png)被解析成絕對網址，分享到 104/LinkedIn/FB 才抓得到圖
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.summary,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: ogTitle,
    description: siteConfig.summary,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "zh_TW",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: siteConfig.summary,
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
      <body>{children}</body>
    </html>
  );
}
