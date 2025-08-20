<!-- 你的原始Markdown内容从这里开始 -->
# 关于我们Q＆A

这是一个段落，**这是加粗文字**。
## 二级标题
<!-- 你的原始Markdown内容到这里结束 -->

---

<!-- 神奇的自适应脚本从这里开始 -->
<script>
// 1. 阻止浏览器默认的纯文本渲染行为
document.open();
document.close();

// 2. 获取当前文档的整个Markdown文本
let rawText = document.documentElement.textContent;

// 3. 找到内容的分隔点（比如用注释或者特定标记）
// 这里我们用 `---` 作为分隔符，分隔符之前是内容，之后是脚本
let splitIndex = rawText.lastIndexOf('---');
let markdownContent = rawText.substring(0, splitIndex).trim();

// 4. 创建一个简单的Markdown解析器（非常基础，可根据需要增强）
function parseMarkdown(md) {
  // 替换标题
  md = md.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  md = md.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  md = md.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  // 替换加粗
  md = md.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  // 替换斜体
  md = md.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  // 替换链接
  md = md.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
  // 替换图片
  md = md.replace(/\!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" />');
  // 替换无序列表
  md = md.replace(/^- (.*$)/gim, '<li>$1</li>');
  md = md.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
  // 替换代码块
  md = md.replace(/```(\w+)?\s([\s\S]*?)```/gim, '<pre><code>$2</code></pre>');
  // 替换行内代码
  md = md.replace(/`(.*?)`/gim, '<code>$1</code>');
  // 替换段落
  md = md.replace(/\n\n(.*?)\n\n/gims, '<p>$1</p>');
  md = md.replace(/^\s*(\w+)/gim, '<p>$1</p>');
  
  return md;
}

// 5. 解析Markdown内容
let parsedHTML = parseMarkdown(markdownContent);

// 6. 构建完整的HTML页面，并添加关键的Viewport和CSS
let fullHTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown 文档</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #24292e;
            background-color: #ffffff;
            margin: 0;
            padding: 20px;
            max-width: 100vw;
            overflow-x: hidden;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        /* 响应式设计 */
        @media (max-width: 768px) {
            body {
                padding: 10px;
                font-size: 14px;
            }
            .container {
                padding: 10px;
            }
        }
        img {
            max-width: 100%;
            height: auto;
        }
        pre, code {
            background-color: #f6f8fa;
            border-radius: 6px;
            overflow-x: auto;
        }
        pre {
            padding: 16px;
        }
        code {
            padding: 0.2em 0.4em;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        ${parsedHTML}
    </div>
</body>
</html>
`;

// 7. 用美化后的页面替换当前文档
document.write(fullHTML);
document.close();
</script>