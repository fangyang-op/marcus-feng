# 馮若陽 Marcus Feng — 個人作品集網站

> 能自己動手建系統的營運人 · Operations leader who builds systems

以 **Next.js (App Router) + TypeScript + Tailwind CSS** 自建、部署於 **Vercel** 的單頁式作品集,
含三個可互動的產品 Demo 子頁(CRM / Nexus / Matrix)。**無後端、無資料庫**,所有內容都是本地設定檔,你可以自己改。

---

## 🚀 快速開始

```bash
npm install      # 安裝相依套件
npm run dev      # 本地開發 (http://localhost:3000)
npm run build    # 產生正式版
npm run start    # 跑正式版
```

需要 Node.js 18.18+(建議 20 以上)。

---

## 📁 目錄結構

```
marcus-portfolio/
├─ src/
│  ├─ app/                 # 頁面 (App Router)
│  │  ├─ page.tsx          # 主頁(組合各區塊)
│  │  ├─ layout.tsx        # 全站外框、字型、SEO
│  │  ├─ globals.css       # 全域樣式
│  │  └─ demo/             # 三個 Demo 子頁
│  │     ├─ crm/page.tsx
│  │     ├─ nexus/page.tsx
│  │     └─ matrix/page.tsx
│  ├─ components/          # 所有 UI 元件(每區塊一支)
│  │  └─ demo/             # Demo 共用殼與各 Demo 元件
│  └─ data/                # ★ 你要改的東西全在這 ★
│     ├─ site.ts           # 姓名、標語、聯絡方式、導覽
│     ├─ metrics.ts        # 核心成果 4 個數字
│     ├─ projects.ts       # 精選專案清單
│     ├─ knowledge.ts      # 知識傳承文件
│     ├─ skills.ts         # 工具鏈 + 營運能力
│     ├─ timeline.ts       # 經歷時間軸
│     └─ demo/             # 三個 Demo 的假資料(seed data)
├─ public/
│  ├─ images/              # 截圖(自行替換)
│  └─ docs/                # PDF(履歷、知識傳承文件)
└─ tailwind.config.ts      # 主色與品牌色(想換色改這裡)
```

---

## ✏️ 怎麼改內容(不用碰元件)

所有文字、數字、連結都集中在 **`src/data/`**。改完存檔,畫面即時更新。

| 想改什麼 | 改哪個檔案 |
|---|---|
| 姓名 / 標語 / Email / LinkedIn / 履歷連結 / 導覽 | `src/data/site.ts` |
| 核心成果 4 個數字(營收、年框、團隊、獎學金) | `src/data/metrics.ts` |
| 精選專案(名稱、一句話、技術標籤、說明、Demo 連結) | `src/data/projects.ts` |
| 知識傳承文件(標題、摘要、PDF 連結) | `src/data/knowledge.ts` |
| 能力與技術(工具鏈 / 營運能力) | `src/data/skills.ts` |
| 經歷時間軸 | `src/data/timeline.ts` |
| Demo 子頁的假資料 | `src/data/demo/*.ts` |

每個檔案最上方都有註解說明各欄位的用途。

### 範例:改一個成果數字

打開 `src/data/metrics.ts`,找到對應物件改 `value` / `label` / `detail`:

```ts
{
  value: "+140%",            // 大字
  label: "營收成長",          // 標題
  detail: "NT$748 萬 → 1,795 萬", // 補充說明
}
```

---

## 🎨 怎麼換主色

主站是「深藍系」單一主色,全部定義在 `tailwind.config.ts` 的 `brand` 色階。
想換成別的色,把 `brand.50` ~ `brand.950` 換成你要的色階即可,全站會一起變。

> 註:三個 Demo 子頁各自的品牌色(`crm` 粉 / `nexus` 粉紫 / `matrix` 玫紅橙)也在同一支檔案,
> 那是為了還原各產品的真實視覺,**建議不要改**。

---

## 🖼️ 怎麼換截圖

1. 把截圖放進 `public/images/`(例如 `crm.png`)。
2. 在程式中用 `/images/crm.png` 引用(主頁目前未放截圖,你可自行加在專案卡)。

---

## 📄 怎麼放 PDF(履歷 / 知識傳承文件)

1. 把 PDF 放進 `public/docs/`,沿用以下檔名即可自動生效(目前是 placeholder):
   - `resume.pdf` — 履歷(Hero「下載履歷」)
   - `crm-build-log.pdf` — CRM 建置實錄
   - `ai-collab-log.pdf` — AI 協作開發實錄
   - `security-playbook.pdf` — 資安檢測報告書與稽核 Playbook
2. 想用別的檔名,去 `src/data/site.ts`(履歷)或 `src/data/knowledge.ts`(文件)改對應的 `href` / `pdfHref`。

---

## 🧪 關於三個 Demo 子頁

`/demo/crm`、`/demo/nexus`、`/demo/matrix` 是三套真實內部產品的 **UI 骨架重建**:

- **資料全部為假**(seed data),不含任何真實客戶 / 學生 / 員工資訊,也不接任何 API。
- 每頁頂部都有「Demo 環境 · 所有資料為示意」橫幅。
- 互動(切 tab、篩選、分頁、圖表渲染)都在前端完成。

---

## ▲ 部署到 Vercel

最簡單的方式:

1. 把這個資料夾推到 GitHub。
2. 到 [vercel.com](https://vercel.com) → **Add New Project** → 匯入該 repo。
3. Vercel 會自動偵測為 Next.js,**不需任何額外設定**,直接 Deploy。
4. 完成後會得到一個 `*.vercel.app` 網址;之後每次 push 都會自動重新部署。

> 本專案無環境變數、無資料庫,所以 Vercel 預設設定即可直接 build & deploy。

---

## 技術棧

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Recharts(Matrix 圖表)· lucide-react(icon)· next/font
