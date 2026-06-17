# RESULT — 修正紀錄

## 第二輪修正做了什麼(2026-06-17)

所有變更都只改 `/src/data/` 設定檔(及 README / public 資產 / 本檔),**未動任何 Demo 子頁程式碼**,
也**未動** `Duplication/` 的三個唯讀資料夾。改完已跑 `npm run build`,7 條靜態路由全部編譯成功。

| # | 修正 | 改了哪裡 |
|---|---|---|
| 1 | **新增專案卡「內容與培訓系統」** | `src/data/projects.ts` — 插在「落點分析資料庫」與「資安工程與稽核」之間。標籤 Notion / Figma / SOP / Onboarding,有「查看說明」展開詳述、**無「進入 Demo」按鈕**(與 Sales Kit、落點分析一致)。 |
| 2 | **清除所有 placeholder 佔位文字** | `src/data/timeline.ts` — 全文重寫;全專案已 grep 確認**無任何「請替換 / 請補上」殘留**。 |
| 3 | **經歷區填入正式內容與數字** | `src/data/timeline.ts` — 放洋(現職)/ Group.G 谷汩文化 / Pegatron 和碩 / NTUST 台科大 四段,全部換成正式版本(含 +140%、450 萬年框、180+ 落點表、WONDER Media、TOEIC 950 等)。 |
| 4 | **「下載履歷」接上 PDF** | `src/data/site.ts` — `resumeHref` 改為 `/docs/resume.pdf`;已放 placeholder 檔。實測按鈕 `href=/docs/resume.pdf`、開新分頁、檔案回 `200 application/pdf`(非壞連結)。 |

驗證:`npm run build` ✅、新卡與經歷實際渲染確認 ✅、履歷連結 200 ✅。

---

## ⚠️ 你還需要手動補的東西

1. **履歷真檔(最重要)**:目前 `public/docs/resume.pdf` 是 **placeholder**,
   請把你的正式履歷 PDF **覆蓋**到 `public/docs/resume.pdf`(檔名不用改,覆蓋即生效)。
2. **三份知識傳承 PDF**(目前都是 placeholder):
   `public/docs/crm-build-log.pdf`、`ai-collab-log.pdf`、`security-playbook.pdf` — 換成正式文件。
3. **專案截圖(選用)**:若想在專案卡或主頁放截圖,放進 `public/images/`,再於對應元件引用。
4. **經歷數字複核**:`src/data/timeline.ts` 內所有數字已照你提供的版本填入,上線前再自行核對一次。

> 改任何文字 / 數字都在 `src/data/*.ts`,不用碰元件;詳見 `README.md`。
