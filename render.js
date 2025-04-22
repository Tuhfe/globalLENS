export function renderNews(articles) {
  const container = document.getElementById('newsContainer');
  container.innerHTML = articles.map(article => `
    <div class="news-item">
      <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
      <p>${article.description || ''}</p>
      <p class="source">${article.source?.name || 'Unknown'} • ${new Date(article.publishedAt).toLocaleDateString()}</p>
    </div>
  `).join('');
}

export function renderWordCloud(articles) {
  const keywords = articles.flatMap(article => article.keywords);
  WordCloud(document.getElementById('wordcloud'), { 
    list: keywords.map(word => [word, Math.floor(Math.random() * 50) + 10]) 
  });
}