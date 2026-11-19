/* =====================================================================
 * template.js — 极简模板引擎（与 build/build_cv.py 中的实现保持一致）
 * ---------------------------------------------------------------------
 * 语法：
 *   {{ path }}        → 输出字段值（HTML 转义，**文字** 渲染为灰底高亮）
 *   {{ $path }}       → 显式从根数据取值（在 #each 循环内使用）
 *   {{#if path}}...{{/if}}      → 字段非空时输出内容
 *   {{#each path}}...{{/each}}  → 遍历数组，循环体内 {{ field }} 取当前项
 * ===================================================================== */
(function () {
  'use strict';

  function getPath(obj, path) {
    if (obj == null) return undefined;
    var keys = path.split('.');
    var cur = obj;
    for (var i = 0; i < keys.length; i++) {
      if (cur == null) return undefined;
      cur = cur[keys[i]];
    }
    return cur;
  }

  function truthy(v) {
    if (v === undefined || v === null || v === false) return false;
    if (typeof v === 'string') return v.trim() !== '';
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'number') return v !== 0;
    return true;
  }

  /* HTML 转义 + **文字** → 灰底高亮 <mark> */
  function esc(s) {
    return String(s)
      .replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      })
      .replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>');
  }

  /* 把模板字符串切成 token 流 */
  function tokenize(tpl) {
    var tokens = [];
    var re = /\{\{([\s\S]*?)\}\}/g;
    var last = 0, m;
    while ((m = re.exec(tpl)) !== null) {
      if (m.index > last) tokens.push(['text', tpl.slice(last, m.index)]);
      var expr = m[1].trim();
      if (expr.indexOf('#if ') === 0) tokens.push(['if', expr.slice(4).trim()]);
      else if (expr.indexOf('#each ') === 0) tokens.push(['each', expr.slice(6).trim()]);
      else if (expr === '/if' || expr === '/each') tokens.push(['end']);
      else tokens.push(['value', expr]);
      last = m.index + m[0].length;
    }
    if (last < tpl.length) tokens.push(['text', tpl.slice(last)]);
    return tokens;
  }

  /* 跳过当前块的剩余内容（含嵌套），返回块结束后的下标 */
  function skipBlock(tokens, i) {
    var depth = 0;
    while (i < tokens.length) {
      var t = tokens[i][0];
      if (t === 'if' || t === 'each') depth++;
      else if (t === 'end') {
        if (depth === 0) return i + 1;
        depth--;
      }
      i++;
    }
    return i;
  }

  /* 递归解析 token 流 */
  function parse(tokens, i, ctx, root) {
    var out = [];
    while (i < tokens.length) {
      var tok = tokens[i];
      var kind = tok[0];
      if (kind === 'text') {
        out.push(tok[1]);
        i++;
      } else if (kind === 'value') {
        var key = tok[1];
        var val = key.charAt(0) === '$' ? getPath(root, key.slice(1)) : getPath(ctx, key);
        if (val === undefined || val === null) val = key.charAt(0) !== '$' ? getPath(root, key) : undefined;
        out.push(esc(val === undefined || val === null ? '' : val));
        i++;
      } else if (kind === 'if') {
        var v = getPath(ctx, tok[1]);
        if (v === undefined) v = getPath(root, tok[1]);
        if (truthy(v)) {
          var inner = parse(tokens, i + 1, ctx, root);
          out.push(inner.html);
          i = inner.next;
        } else {
          i = skipBlock(tokens, i + 1);
        }
      } else if (kind === 'each') {
        var items = getPath(ctx, tok[1]);
        if (items === undefined) items = getPath(root, tok[1]);
        var list = Array.isArray(items) ? items : [];
        for (var j = 0; j < list.length; j++) {
          var sub = parse(tokens, i + 1, list[j], root);
          out.push(sub.html);
        }
        i = skipBlock(tokens, i + 1);
      } else if (kind === 'end') {
        return { html: out.join(''), next: i + 1 };
      }
    }
    return { html: out.join(''), next: i };
  }

  /* 对外入口：renderTemplate(templateString, dataObject) → HTML 字符串 */
  window.renderTemplate = function (tpl, data) {
    return parse(tokenize(tpl), 0, data, data).html;
  };
})();
