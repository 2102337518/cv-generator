/* =====================================================================
 * app.js — 生成工具逻辑
 *   - 加载简历模板（resume.template.html）与中英两份数据（data.zh.js / data.en.js）
 *   - 左侧 JSON 编辑 → 实时渲染右侧 A4 预览（防抖 300ms）
 *   - 「中 / EN」切换中文 / 英文简历（各自独立保存）
 *   - 修改自动保存到 localStorage，支持导入 / 导出 / 重置
 *   - 「下载 PDF」：调用浏览器打印，仅输出简历本体（见 app.css 打印样式）
 * ===================================================================== */
(function () {
  'use strict';

  var LANG_KEY = 'cv-lang';
  var storeKeyOf = function (lang) { return 'cv-data-' + lang; };

  var $ = function (id) { return document.getElementById(id); };
  var editor = $('editor');
  var status = $('editor-status');
  var preview = $('preview');
  var pageScale = $('page-scale');
  var previewScroll = $('preview-scroll');
  var divider = $('divider');
  var editorPane = document.querySelector('.editor-pane');
  var toast = $('toast');

  var TEMPLATE = '';
  var lang = 'zh';
  var DATA_SOURCES = { zh: window.CV_DATA_ZH, en: window.CV_DATA_EN };
  var renderTimer = null;

  /* ---------- 工具函数 ---------- */

  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () { toast.hidden = true; }, 2600);
  }

  /* 读取 data.js 中 window.CV_DATA = {...}; 的 JSON 部分（兼容纯 JSON 文件） */
  function extractJSON(text) {
    var t = text.trim();
    var m = t.match(/^\s*window\.CV_DATA[^=]*\s*=\s*([\s\S]*?);?\s*$/);
    if (m) t = m[1];
    return stripJSComments(t);
  }

  /* 去除 JS 注释（// 与 /* *\/），不触碰字符串字面量内部 */
  function stripJSComments(text) {
    var out = '';
    var i = 0, n = text.length, inStr = null;
    while (i < n) {
      var c = text[i], nx = i + 1 < n ? text[i + 1] : '';
      if (inStr) {
        out += c;
        if (c === '\\' && i + 1 < n) { out += text[i + 1]; i += 2; continue; }
        if (c === inStr) inStr = null;
        i++;
      } else if (c === '"' || c === "'") {
        inStr = c; out += c; i++;
      } else if (c === '/' && nx === '/') {
        while (i < n && text[i] !== '\n') i++;
      } else if (c === '/' && nx === '*') {
        i += 2;
        while (i + 1 < n && !(text[i] === '*' && text[i + 1] === '/')) i++;
        i += 2;
      } else {
        out += c; i++;
      }
    }
    return out;
  }

  function defaultData(l) {
    var d = DATA_SOURCES[l];
    return d ? JSON.parse(JSON.stringify(d)) : {};
  }

  function currentData() {
    return JSON.parse(extractJSON(editor.value));
  }

  function savedData(l) {
    try { return localStorage.getItem(storeKeyOf(l)); } catch (e) { return null; }
  }
  function saveToStorage(l) {
    try { localStorage.setItem(storeKeyOf(l), editor.value); } catch (e) { /* 忽略 */ }
  }

  /* ---------- 渲染 ---------- */

  function render() {
    var data;
    try {
      data = currentData();
      if (!data || typeof data !== 'object') throw new Error('数据必须是一个 JSON 对象');
    } catch (e) {
      status.textContent = '⚠ JSON 解析错误：' + e.message + '（右侧保持最后一次成功渲染的结果）';
      status.classList.add('error');
      return;
    }
    status.classList.remove('error');
    status.textContent = '✔ 解析成功 · ' + editor.value.length + ' 字符 · 修改已自动保存';

    preview.innerHTML = window.renderTemplate(TEMPLATE, data);

    /* 打印时 PDF 文件名跟随简历标题 */
    var title = (data.profile && (data.profile.doc_title || data.profile.name)) || 'Resume';
    document.title = title;

    scalePreview();
    saveToStorage(lang);
  }

  /* 按预览区宽度缩放 A4 页面 */
  function scalePreview() {
    var pane = previewScroll.clientWidth - 40;
    var base = 210 / 0.2645833;              /* 210mm → px ≈ 793.7 */
    var s = Math.min(1, pane / base);
    pageScale.style.transform = 'scale(' + s + ')';
    pageScale.style.width = base + 'px';
    pageScale.style.height = Math.ceil(previewScroll.scrollHeight / s) + 'px';
  }

  /* ---------- 语言切换 ---------- */

  function currentStoredLang() {
    try {
      var l = localStorage.getItem(LANG_KEY);
      return (l === 'zh' || l === 'en') ? l : 'zh';
    } catch (e) { return 'zh'; }
  }

  function switchLang(next) {
    if (next === lang) return;
    saveToStorage(lang);                 /* 先保存当前语言未落盘的修改 */
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    var saved = savedData(lang);
    editor.value = saved !== null ? saved : JSON.stringify(defaultData(lang), null, 2);
    $('btn-lang').textContent = lang === 'zh' ? '中 / EN' : 'EN / 中';
    render();
  }

  /* ---------- 事件 ---------- */

  editor.addEventListener('input', function () {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 300);
  });

  window.addEventListener('resize', scalePreview);

  $('btn-lang').addEventListener('click', function () {
    switchLang(lang === 'zh' ? 'en' : 'zh');
    showToast(lang === 'zh' ? '已切换到中文简历' : 'Switched to English resume');
  });

  /* 下载 PDF：只打印简历本体 */
  $('btn-print').addEventListener('click', function () {
    render();                       /* 先同步一次，保证打印的是最新内容 */
    showToast('请在打印对话框中选择「另存为 PDF」保存');
    setTimeout(function () { window.print(); }, 350);
  });

  /* 导出：下载当前语言的数据文件，替换 js/data.*.js 即可永久生效 */
  $('btn-export').addEventListener('click', function () {
    var data;
    try { data = currentData(); } catch (e) { showToast('当前数据有语法错误，无法导出'); return; }
    var fname = 'data.' + lang + '.js';
    var text = '// 简历数据（由 cv-generator 导出，' + lang.toUpperCase() + '）\n' +
      '// 用本文件替换 js/' + fname + ' 即可永久生效\n' +
      'window.CV_DATA_' + lang.toUpperCase() + ' = ' + JSON.stringify(data, null, 2) + ';\n';
    var blob = new Blob([text], { type: 'application/javascript;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fname;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('已导出 ' + fname);
  });

  /* 导入：选择 data.*.js / JSON 文件 */
  $('btn-import').addEventListener('click', function () { $('file-input').click(); });
  $('file-input').addEventListener('change', function () {
    var f = this.files && this.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var obj = JSON.parse(extractJSON(String(reader.result)));
        editor.value = JSON.stringify(obj, null, 2);
        render();
        showToast('导入成功：' + f.name);
      } catch (e) {
        showToast('导入失败：文件不是有效的简历数据（' + e.message + '）');
      }
    };
    reader.readAsText(f, 'utf-8');
    this.value = '';
  });

  /* 重置当前语言为默认数据 */
  $('btn-reset').addEventListener('click', function () {
    try { localStorage.removeItem(storeKeyOf(lang)); } catch (e) {}
    editor.value = JSON.stringify(defaultData(lang), null, 2);
    render();
    showToast('已重置为默认数据（' + (lang === 'zh' ? '中文' : 'English') + '）');
  });

  /* 左右栏拖动调整宽度 */
  divider.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var startX = e.clientX;
    var startW = editorPane.offsetWidth;
    function move(ev) {
      var w = Math.min(Math.max(startW + ev.clientX - startX, 300), window.innerWidth * 0.72);
      editorPane.style.width = w + 'px';
      scalePreview();
    }
    function up() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  });

  /* ---------- 初始化 ---------- */

  function init(templateText) {
    TEMPLATE = templateText;
    lang = currentStoredLang();
    $('btn-lang').textContent = lang === 'zh' ? '中 / EN' : 'EN / 中';
    var saved = savedData(lang);
    editor.value = saved !== null ? saved : JSON.stringify(defaultData(lang), null, 2);
    render();
    setTimeout(scalePreview, 50);
  }

  fetch('resume.template.html')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    })
    .then(init)
    .catch(function () {
      preview.innerHTML =
        '<div style="padding:40px;text-align:center;color:#888;font-size:14px">' +
        '⚠ 无法加载简历模板 resume.template.html。<br>' +
        '请通过本地服务器打开本工具，例如在 cv-generator 目录下运行：<br>' +
        '<code style="background:#f3f4f6;padding:2px 8px;border-radius:4px">python3 -m http.server 8000</code><br>' +
        '然后访问 http://localhost:8000（直接双击打开 HTML 文件无法加载模板）。</div>';
    });
})();
