#!/bin/bash
# 自動修正程式碼的腳本

echo "🔧 開始自動修正程式碼..."

# 1. 移除未使用的 imports 和變數
echo "📦 移除未使用的 imports 和變數..."
uv run autoflake --in-place --remove-all-unused-imports --remove-unused-variables --recursive src/

# 2. 移除尾隨空白
echo "🧹 移除尾隨空白..."
find src -name "*.py" -type f -exec sed -i 's/[[:space:]]*$//' {} +

# 3. 排序 imports
echo "📋 排序 imports..."
uv run isort src/

# 4. 使用 Black 格式化
echo "✨ 使用 Black 格式化..."
uv run black src/

# 5. 檢查是否還有問題
echo "🔍 檢查剩餘問題..."
uv run flake8 src/

echo "✅ 完成！"

