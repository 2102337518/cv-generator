#!/usr/bin/env python3
"""build_cv.py — 离线构建简历 PDF（与网页预览共用 resume.template.html + css/resume.css）

用法：
    python3 build/build_cv.py                          # 使用 js/data.js，输出 output/简历.pdf
    python3 build/build_cv.py --data js/data.js --out 林镇标-个人简历.pdf

依赖：
    pip install weasyprint
    （系统需有 pango/cairo 与 CJK 字体，如 Noto Sans CJK SC）
"""
import argparse
import html as html_lib
import json
import pathlib
import re
import sys

from weasyprint import HTML

PROJECT_DIR = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_TEMPLATE = PROJECT_DIR / "resume.template.html"
DEFAULT_DATA = PROJECT_DIR / "js" / "data.js"
DEFAULT_OUT = PROJECT_DIR / "output" / "简历.pdf"


# ----------------------------------------------------------------------
# 极简模板引擎（与 js/template.js 语法一致）
#   {{ path }}  输出字段（转义，**文字** → 灰底高亮）
#   {{ $path }} 显式根数据取值
#   {{#if path}}...{{/if}} / {{#each path}}...{{/each}}
# ----------------------------------------------------------------------

def get_path(obj, path):
    cur = obj
    for key in path.split("."):
        if cur is None:
            return None
        if not isinstance(cur, dict):
            return None
        cur = cur.get(key)
    return cur


def truthy(v):
    if v is None or v is False:
        return False
    if isinstance(v, str):
        return v.strip() != ""
    if isinstance(v, (list, dict)):
        return len(v) > 0
    if isinstance(v, (int, float)):
        return v != 0
    return True


def esc(s):
    out = html_lib.escape(str(s), quote=True)
    return re.sub(r"\*\*(.+?)\*\*", r"<mark>\1</mark>", out)


def tokenize(tpl):
    tokens = []
    last = 0
    for m in re.finditer(r"\{\{([\s\S]*?)\}\}", tpl):
        if m.start() > last:
            tokens.append(("text", tpl[last:m.start()]))
        expr = m.group(1).strip()
        if expr.startswith("#if "):
            tokens.append(("if", expr[4:].strip()))
        elif expr.startswith("#each "):
            tokens.append(("each", expr[6:].strip()))
        elif expr in ("/if", "/each"):
            tokens.append(("end", None))
        else:
            tokens.append(("value", expr))
        last = m.end()
    if last < len(tpl):
        tokens.append(("text", tpl[last:]))
    return tokens


def skip_block(tokens, i):
    depth = 0
    while i < len(tokens):
        kind = tokens[i][0]
        if kind in ("if", "each"):
            depth += 1
        elif kind == "end":
            if depth == 0:
                return i + 1
            depth -= 1
        i += 1
    return i


def parse(tokens, i, ctx, root):
    out = []
    while i < len(tokens):
        kind, arg = tokens[i]
        if kind == "text":
            out.append(arg)
            i += 1
        elif kind == "value":
            val = get_path(root, arg[1:]) if arg.startswith("$") else get_path(ctx, arg)
            if val is None and not arg.startswith("$"):
                val = get_path(root, arg)
            out.append(esc("" if val is None else val))
            i += 1
        elif kind == "if":
            v = get_path(ctx, arg)
            if v is None:
                v = get_path(root, arg)
            if truthy(v):
                inner, i = parse(tokens, i + 1, ctx, root)
                out.append(inner)
            else:
                i = skip_block(tokens, i + 1)
        elif kind == "each":
            items = get_path(ctx, arg)
            if items is None:
                items = get_path(root, arg)
            items = items if isinstance(items, list) else []
            for item in items:
                inner, _ = parse(tokens, i + 1, item, root)
                out.append(inner)
            i = skip_block(tokens, i + 1)
        elif kind == "end":
            return "".join(out), i + 1
    return "".join(out), i


def render_template(tpl, data):
    return parse(tokenize(tpl), 0, data, data)[0]


# ----------------------------------------------------------------------
# 数据加载：兼容 window.CV_DATA = {...}; 与纯 JSON
# ----------------------------------------------------------------------

def strip_js_comments(text):
    """去除 JS 注释（// 与 /* */），不触碰字符串字面量内部。"""
    out = []
    i, n = 0, len(text)
    in_str = None          # None | '"' | "'"
    while i < n:
        c = text[i]
        nxt = text[i + 1] if i + 1 < n else ""
        if in_str:
            out.append(c)
            if c == "\\" and i + 1 < n:
                out.append(text[i + 1])
                i += 2
                continue
            if c == in_str:
                in_str = None
            i += 1
        elif c == '"' or c == "'":
            in_str = c
            out.append(c)
            i += 1
        elif c == "/" and nxt == "/":
            while i < n and text[i] != "\n":
                i += 1
        elif c == "/" and nxt == "*":
            i += 2
            while i + 1 < n and not (text[i] == "*" and text[i + 1] == "/"):
                i += 1
            i += 2
        else:
            out.append(c)
            i += 1
    return "".join(out)


def load_data(path):
    text = pathlib.Path(path).read_text(encoding="utf-8")
    text = strip_js_comments(text)          # 先剥注释，再剥离 window.CV_DATA(_ZH|_EN) = 包装
    m = re.match(r"^\s*window\.CV_DATA(?:_ZH|_EN)?\s*=\s*([\s\S]*?);?\s*$", text)
    if m:
        text = m.group(1)
    return json.loads(text)


# ----------------------------------------------------------------------
# 主流程
# ----------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description="生成个人简历 PDF")
    ap.add_argument("--data", default=str(DEFAULT_DATA), help="数据文件（默认 js/data.js）")
    ap.add_argument("--template", default=str(DEFAULT_TEMPLATE), help="模板文件（默认 resume.template.html）")
    ap.add_argument("--out", default=str(DEFAULT_OUT), help="输出 PDF 路径")
    args = ap.parse_args()

    data = load_data(args.data)
    tpl = pathlib.Path(args.template).read_text(encoding="utf-8")
    full_html = render_template(tpl, data)

    out = pathlib.Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    HTML(string=full_html, base_url=str(PROJECT_DIR)).write_pdf(str(out))

    name = (data.get("profile") or {}).get("name", "简历")
    print(f"✔ 已生成：{out}（{name}，{out.stat().st_size // 1024} KB）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
