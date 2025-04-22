export function exportData(articles, notes) {
    try {
        const data = {
            timestamp: new Date().toISOString(),
            articles: articles.map(article => ({
                title: article.title,
                source: article.source?.name,
                url: article.url,
                publishedAt: article.publishedAt,
                tags: [...article.tags],
                keywords: article.keywords
            })),
            analystNotes: notes
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `globalens-export-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Export failed:', error);
        alert('Export failed: ' + error.message);
    }
}