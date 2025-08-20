//  markdown-loader.js - 通用Markdown美化加载器
(function() {
    // 配置选项
    const config = {
        theme: 'light', // 'light' 或 'dark'
        maxWidth: '800px',
        codeHighlight: true
    };

    // 简单的Markdown解析器
    function parseMarkdown(md) {
        let html = md;
        
        // 移除脚本标签内容（避免递归执行）
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // 解析标题
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
        
        // 解析粗体和斜体
        html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
        html = html.replace(/_(.*?)_/gim, '<em>$1</em>');
        
        // 解析代码块
        html = html.replace(/```(\w+)?\s([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>');
        html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
        
        // 解析引用
        html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
        
        // 解析列表
        html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
        html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/gims, '<ol>$1</ol>');
        
        // 解析分割线
        html = html.replace(/^---$/gim, '<hr>');
        html = html.replace(/^\*\*\*$/gim, '<hr>');
        
        // 解析链接和图片
        html = html.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" loading="lazy">');
        html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        
        // 解析段落（处理连续的空行）
        html = html.replace(/\n\n+/g, '</p><p>');
        html = html.replace(/(<(\/)?(h\d|ul|ol|li|blockquote|pre|code|img|a|hr)[^>]*>)/gim, '</p>$1<p>');
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>(\s*<(\/)?(h\d|ul|ol|li|blockquote|pre|code|img|a|hr)[^>]*>\s*)<\/p>/gim, '$1');
        html = '<p>' + html + '</p>';
        
        return html;
    }

    // 应用样式
    function applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #24292e;
                background: #ffffff;
                padding: 20px;
                min-height: 100vh;
            }
            
            .markdown-container {
                max-width: ${config.maxWidth};
                margin: 0 auto;
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            h1, h2, h3, h4 {
                margin: 1.5em 0 0.5em 0;
                color: #2c3e50;
                line-height: 1.2;
            }
            
            h1 { font-size: 2.2em; border-bottom: 2px solid #eaecef; padding-bottom: 0.3em; }
            h2 { font-size: 1.8em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
            h3 { font-size: 1.5em; }
            h4 { font-size: 1.2em; }
            
            p {
                margin: 1em 0;
            }
            
            ul, ol {
                margin: 1em 0;
                padding-left: 2em;
            }
            
            li {
                margin: 0.5em 0;
            }
            
            code {
                background: #f6f8fa;
                padding: 0.2em 0.4em;
                border-radius: 3px;
                font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                font-size: 0.9em;
            }
            
            pre {
                background: #f6f8fa;
                padding: 1em;
                border-radius: 6px;
                overflow-x: auto;
                margin: 1em 0;
            }
            
            pre code {
                background: none;
                padding: 0;
            }
            
            blockquote {
                border-left: 4px solid #dfe2e5;
                padding-left: 1em;
                margin: 1em 0;
                color: #6a737d;
            }
            
            img {
                max-width: 100%;
                height: auto;
                border-radius: 6px;
                margin: 1em 0;
            }
            
            a {
                color: #0366d6;
                text-decoration: none;
            }
            
            a:hover {
                text-decoration: underline;
            }
            
            hr {
                border: none;
                border-top: 2px solid #eaecef;
                margin: 2em 0;
            }
            
            /* 响应式设计 */
            @media (max-width: 768px) {
                body {
                    padding: 10px;
                }
                
                .markdown-container {
                    padding: 1rem;
                    margin: 0;
                    border-radius: 0;
                    box-shadow: none;
                }
                
                h1 { font-size: 1.8em; }
                h2 { font-size: 1.5em; }
                h3 { font-size: 1.3em; }
            }
            
            /* 暗色主题 */
            .dark-theme {
                color: #c9d1d9;
                background: #0d1117;
            }
            
            .dark-theme .markdown-container {
                background: #161b22;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            }
            
            .dark-theme h1, 
            .dark-theme h2, 
            .dark-theme h3, 
            .dark-theme h4 {
                color: #58a6ff;
                border-color: #30363d;
            }
            
            .dark-theme code,
            .dark-theme pre {
                background: #21262d;
            }
            
            .dark-theme blockquote {
                border-color: #3fb950;
                color: #8b949e;
            }
        `;
        
        document.head.appendChild(style);
        
        // 应用主题
        if (config.theme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    // 主函数
    function renderMarkdown() {
        // 获取原始Markdown内容
        const originalContent = document.body.textContent || document.documentElement.textContent;
        
        // 解析Markdown
        const parsedHTML = parseMarkdown(originalContent);
        
        // 清空原始内容并应用样式
        document.body.innerHTML = '';
        applyStyles();
        
        // 创建容器并插入解析后的内容
        const container = document.createElement('div');
        container.className = 'markdown-container';
        container.innerHTML = parsedHTML;
        
        document.body.appendChild(container);
        
        // 移除所有脚本（防止重复执行）
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        
        console.log('✅ Markdown渲染完成！');
    }

    // 页面加载后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderMarkdown);
    } else {
        renderMarkdown();
    }
})();