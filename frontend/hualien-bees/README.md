# hualien-bees
光復救災資訊整合網 - 蜜蜂配給頁

這是一個以 Vue 3 與 Vite 為基礎的前端專案，用於協助管理與呈現蜜蜂物資配給資訊。以下提供快速的開發與建置指引。

## 開發流程

```bash
npm install
npm run dev
```

## 打包建置

```bash
npm run build
```

## GitHub Pages 部署

專案已透過 GitHub Actions 自動部署到 GitHub Pages：

1. 主要工作流程位於 `.github/workflows/deploy.yml`，會在 `main` 分支有變更或手動觸發時執行。
2. Workflow 會執行 `npm ci && npm run build`，並將 `dist/` 內容推送到 `gh-pages` 分支。
3. 首次部署後，請到 **Repository Settings → Pages**，將 Source 設定為 `gh-pages` 分支（根目錄）。
4. 等待 Actions 完成後，就可以透過 `https://pinkowo.github.io/hualien-bees/` 取得最新部署結果。

若要了解更多關於 Vue 3 `<script setup>` 語法與 IDE 支援，可參考 [Vue 官方文件](https://vuejs.org/guide/scaling-up/tooling.html#ide-support)。
