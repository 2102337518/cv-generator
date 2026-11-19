#!/usr/bin/env bash
# build_cv.sh — 一键构建简历 PDF（自动检查/安装依赖）
#
# 用法：
#   ./build/build_cv.sh                          # 输出 output/简历.pdf
#   ./build/build_cv.sh --out 林镇标-个人简历.pdf   # 指定输出路径
set -e
cd "$(dirname "$0")/.."

if ! python3 -c "import weasyprint" 2>/dev/null; then
  echo "正在安装 weasyprint（使用阿里云镜像）..."
  pip install weasyprint -i https://mirrors.aliyun.com/pypi/simple/ --timeout 60
fi

python3 build/build_cv.py "$@"
