fetchButton.addEventListener('click', async () => {
    const region = document.getElementById('region').value;
    const timeframe = document.getElementById('timeframe').value;
    
    fetchButton.disabled = true;
    fetchButton.textContent = 'Loading...';
    newsContainer.innerHTML = '<div class="loading">Fetching latest news...</div>';
    
    try {
        const articles = await fetchNewsData(region, timeframe);
        if (articles.length === 0) {
            newsContainer.innerHTML = '<div class="info">No articles found for the selected criteria.</div>';
            return;
        }
        
        currentArticles = processArticles(articles);
        renderNews(currentArticles);
        renderTrendChart(currentArticles);
        renderWordCloud(currentArticles);
        
    } catch (error) {
        console.error('Fetch error:', error);
        newsContainer.innerHTML = `
            <div class="error">
                <p>Error fetching data: ${error.message}</p>
                <p>Possible solutions:</p>
                <ul>
                    <li>Ensure you're using HTTPS connection</li>
                    <li>Try again later (API might have rate limits)</li>
                    <li>Check your API key validity</li>
                </ul>
            </div>
        `;
    } finally {
        fetchButton.disabled = false;
        fetchButton.textContent = 'Analyze';
    }
});