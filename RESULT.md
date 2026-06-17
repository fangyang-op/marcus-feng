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

---

## 第三輪強化 — 三個 Demo 互動升級(2026-06-17)

目標:消除「點不動的尷尬」、增加資料密度、讓招牌頁真的能互動。全部維持假資料。
已逐一點過三個 Demo 的每個側欄選項與按鈕,**沒有任何一個點了沒反應或 404**;`npm run build` 成功(7 條靜態路由)。

### 原則 1:消除死頁(每個 nav / 按鈕都有回應)
- **做成真互動的頁**:CRM(儀表板 KPI 翻轉卡+提醒卡、學生列表搜尋/篩選/分頁、學生 360 七分頁、申請看板換狀態、院校檢索搜尋+門檻 modal)、Nexus(院校搜尋/篩選/排序、AI 落點分析、歷屆榜單篩選/排序、遊學 CRM 看板、EP 報價精靈、AI 助理)、Matrix(總覽翻轉卡+圖表、績效監控、顧問分析、來源績效、產品熱力圖、人員狀態切換)。
- **用 DemoModal / DemoToast 回應的 no-op 點**:CRM(設定 6 卡→各自 modal、新增學生/編輯/文件催繳→toast、看板換狀態/還原→toast、院校列→門檻 modal);Nexus(儀表板活動卡/公告 feed→modal、院校編輯儲存→toast、EP 存入CRM/下載PNG/複製開單→toast);Matrix(頂欄「同步」→toast、人員狀態切換→toast、新增編制→modal)。
- **用 FeatureNotice 純說明卡的頁**:無 —— 所有原本「簡化呈現」的死頁都改成「可互動」或「modal/toast 回應」,比說明卡更好。(共用元件 `widgets.tsx` 仍提供 FeatureNotice 備用。)

### 原則 2:招牌頁互動(實測通過)
- **CRM**:學生 360 七分頁(概覽/時間軸/成績/成交/選校表/文件/申請)皆可切換且各顯示「該學生自己的」資料(不再張冠李戴);申請看板卡片可點擊在 9 欄間切換狀態 + 推進 + 還原。
- **Nexus**:AI 落點分析(輸入→點「分析」→Dream/Match/Safety + 機率,What-if 滑桿即時重算);院校資料庫搜尋 + 國家/類型篩選 + 排序(QS/US News/學費/名稱)三者即時生效。
- **Matrix**:總覽 4 張 KPI 卡點擊翻轉(背面顯示 B2C/B2B 拆分、YoY/MoM、口徑);月度 ComposedChart 與來源/顧問下鑽頁的 Recharts 圖表(Pie/Bar/Area/Radar)實際渲染。

### 原則 3:資料密度(加量)
- CRM:學生 16→22、院校 19→26、申請看板 16→24(9 欄每欄 2–5 張,無空欄)、22 位學生各有獨立 360 詳情。
- Nexus:院校 10→20(美/英/澳/加/德/星)、歷屆榜單 9→22(脫敏假名)、遊學 CRM 7→15。
- Matrix:三年度 12 月序列有合理起伏(非平線),產品熱力圖 8→10 列。

### 原則 4:Demo 橫幅
三個 Demo 頂部「Demo 環境 · 所有資料為示意,非真實營運數據」橫幅一致保留(由共用 DemoShell 提供)。

### 安全掃描(再次確認)
grep 掃描 `src/data/demo` 與 `src/components/demo`:**無**任何原始系統真實員工名 / 公司名(放洋·FangYang·TKB)/ GAS·webhook URL / 金鑰;email 皆 example/demo 假網域;無未遮罩真實手機號。假名為「王志明·張家瑋·吳承恩」式、榜單用全形遮罩「王＊明」。
