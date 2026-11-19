# 个人简历生成工具（CV Generator）

一个**零依赖、纯前端**的个人简历生成工具：在左侧编辑简历数据（JSON），右侧**实时同步预览**简历效果，一键**下载 PDF**。同时提供离线构建脚本，与网页预览共用同一套 HTML 模板与样式，生成完全一致的 PDF。

简历样式参考现代技术岗简历模板：A4 两页、蓝色章节分隔条、灰底公司条、蓝色项目下划线、关键成果灰色高亮、■ 方块项目符号。

## 一、快速开始

```bash
cd cv-generator
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

> 直接双击 index.html 无法加载模板文件（浏览器限制），请务必通过本地服务器或 GitHub Pages 打开。

界面说明：

| 区域 | 作用 |
|---|---|
| 左侧编辑区 | 简历数据（JSON 格式），修改后 **300ms 内自动刷新**右侧预览，并自动保存到浏览器 localStorage |
| 右侧预览区 | A4 页面实时预览（自动缩放适配窗口） |
| 「下载 PDF」 | 打开浏览器打印对话框 → 目标选「**另存为 PDF**」→ 保存（仅输出简历本体，已配置 A4 打印样式） |
| 「导出数据」 | 把当前编辑的内容下载为 data.js，替换 `js/data.js` 即永久生效 |
| 「导入数据」 | 导入之前导出的 data.js / JSON 文件 |
| 「重置为默认」 | 恢复为 `js/data.js` 中的默认数据 |

## 二、目录结构

```
cv-generator/
├── index.html              # 工具界面（编辑 + 预览 + 工具栏）
├── resume.template.html    # ★ 简历模板（HTML + {{}} 占位符，预览与 PDF 共用）
├── css/
│   ├── app.css             # 工具界面样式
│   └── resume.css          # ★ 简历样式（A4、配色、字号；改样式在这里）
├── js/
│   ├── data.js             # ★ 简历数据（唯一数据源，JSON 格式）
│   ├── template.js         # 极简模板引擎（与 build_cv.py 语法一致）
│   └── app.js              # 工具逻辑：实时渲染、localStorage、导入导出、打印
├── build/
│   ├── build_cv.py         # 离线构建：同模板 + 同数据 → PDF（weasyprint）
│   └── build_cv.sh         # 一键构建（自动检查依赖）
└── output/                 # 构建产出的 PDF
```

## 三、数据格式（js/data.js）

```jsonc
{
  "profile": {
    "name": "林镇标",
    "contact": [{ "text": "手机号" }, { "text": "邮箱" }],
    "summary": "一句话定位（职位 · 方向 · Open to opportunities）",
    "github": "github.com/你的用户名（留空则整行隐藏）",
    "education_line": "学校 专业 学位（时间）| 学校 专业 学位（时间）"
  },
  "sections": [
    { "title": "专业技能", "items": [{ "lead": "加粗前缀", "text": "内容" }] },
    {
      "title": "工作经历",
      "entries": [{
        "org": "公司名", "role": "职位", "period": "2025.07 – 至今",
        "projects": [{
          "title": "项目名",
          "descLabel": "项目简介", "desc": "项目介绍……",
          "points": [{ "text": "工作内容要点" }],
          "resultLabel": "成果描述", "result": "**高亮成果**"
        }]
      }]
    },
    { "title": "荣誉奖项", "items": [{ "text": "奖项" }] }
  ]
}
```

规则：

- 文本中的 `**文字**` 会渲染为**灰色高亮**（用于突出关键成果 / 奖项），普通 `**` 不要单独出现。
- `lead` 字段（可选）会以加粗前缀 + 冒号显示，适合「深度学习 / 强化学习：……」这类技能条目。
- 不需要的字段（`github`、`desc`、`result`、`lead` 等）直接删除，对应内容自动隐藏。
- `entries` 既支持带 `projects` 的经历条目，也支持不带 projects 的纯条目（如教育背景）。
- 技能、奖项用 `items`；工作 / 实习 / 竞赛 / 教育用 `entries`。板块顺序 = `sections` 数组顺序，可自由增删。

## 四、生成 PDF 的两种方式

### 方式 1：网页「下载 PDF」（推荐，随时可用）

点击工具页「下载 PDF」→ 浏览器打印对话框 → 目标选「另存为 PDF」。
打印样式已配置为 A4、仅输出简历本体，效果与预览一致。

### 方式 2：离线构建（生成与预览完全一致的 PDF 文件）

```bash
cd cv-generator
./build/build_cv.sh --out output/林镇标-个人简历.pdf
```

依赖：`pip install weasyprint`（系统需有 pango/cairo 与 Noto Sans CJK SC 等中文字体）。
构建脚本读取 `js/data.js` 与 `resume.template.html`，与网页预览共用同一份模板和样式。

## 五、常见问题

**Q：双击 index.html 打开后右侧是空白/报错？**
A：浏览器禁止 file:// 下加载本地文件。请用 `python3 -m http.server 8000` 启动后访问 http://localhost:8000。

**Q：下载的 PDF 有浏览器页眉页脚（网址/日期）？**
A：打印对话框里勾掉「页眉和页脚」即可；内容本身已按 A4 排版。

**Q：想改配色 / 字号 / 页边距？**
A：编辑 `css/resume.css`：顶部 `@page` 是页边距，`:root` 变量是配色，各区块字号都有注释。改完网页刷新即可预览，构建 PDF 同步生效。

**Q：修改后如何让离线构建也生效？**
A：先把编辑器里的数据「导出数据」→ 用下载的 data.js 替换 `js/data.js` → 再运行构建脚本。
