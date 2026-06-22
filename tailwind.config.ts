import type { Config } from "tailwindcss";

/**
 * 主站採用「深藍系」單一主色。所有顏色集中在這裡,日後想換色只要改 brand 色階即可。
 * 三個 Demo 子頁各自的品牌色(CRM 粉 / Nexus 粉紫 / Matrix 玫紅橙)也定義在這,
 * 讓 Demo 能還原各產品的真實視覺。
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── 主站深藍主色(可調)──────────────────────────────
        brand: {
          50: "#eff4ff",
          100: "#dbe6fe",
          200: "#bfd3fe",
          300: "#93b4fd",
          400: "#608cfa",
          500: "#3b65f6",
          600: "#2547eb",
          700: "#1d36d8",
          800: "#1e2eaf",
          900: "#1d2c8a",
          950: "#161e54",
        },
        ink: {
          DEFAULT: "#0f172a",
          soft: "#334155",
          muted: "#64748b",
        },
        // ── Demo 各產品品牌色(請勿改,用於還原真實產品視覺)──
        crm: {
          DEFAULT: "#C7315C",
          soft: "#fce7ef",
          ink: "#8a1f3d",
        },
        nexus: {
          pink: "#FF4B7D",
          purple: "#DF54E9",
          deep: "#89009B",
        },
        matrix: {
          rose: "#FF2D6C",
          orange: "#FF9F29",
          slate: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-zh)", "system-ui", "sans-serif"],
        zh: ["var(--font-zh)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1120px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        "card-hover": "0 2px 4px rgba(15,23,42,0.06), 0 16px 40px rgba(15,23,42,0.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // 較快的淡入(切換旗艦詳情面板用)
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // 現職時間軸藍點的雷達脈衝(由中心放大後消散,持續不斷)
        radar: {
          "0%": { opacity: "0.5", transform: "scale(1)" },
          "70%": { opacity: "0.12" },
          "100%": { opacity: "0", transform: "scale(2)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.25s ease-out both",
        radar: "radar 2.4s ease-out infinite",
        // 第二圈:延遲半個週期,讓雷達持續不斷(延遲寫進簡寫,避免被覆蓋)
        "radar-2": "radar 2.4s ease-out 1.2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
