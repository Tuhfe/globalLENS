import { fetchNewsData } from './api.js';
import { analyzeKeywords } from './keywords.js';
import { renderTrendChart } from './chart.js';
import { exportData } from './export.js';

document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchData');
    const exportButton = document.getElementById('exportData');
    const saveNotesButton = document.getElementById('saveNotes');
    const newsContainer = document.getElementById('newsContainer');
    const wordcloudElement = document.getElementById('wordcloud');
    const analystNotes = document.getElementById('analystNotes');
    
    let currentArticles = [];
    
    fetchButton.addEventListener('click', async () => {
        const region = document.getElementById('region').value;
        const timeframe = document.getElementById('timeframe').value;
        
        fetchButton.disabled = true;
        fetchButton.textContent = 'Loading...';
        
        const articles = await fetchNewsData(region, timeframe);
        currentArticles = processArticles(articles);
        
        renderNews(currentArticles);
        renderTrendChart(currentArticles);
        renderWordCloud(currentArticles);
        
        fetchButton.disabled = false;
        fetchButton.textContent = 'Analyze';
    });
    
    exportButton.addEventListener('click', () => {
        if (currentArticles.length === 0) {
            alert('No data to export. Please fetch data first.');
            return;
        }
        exportData(currentArticles, analystNotes.value);
    });
    
    saveNotesButton.addEventListener('click', () => {
        localStorage.setItem('analystNotes', analystNotes.value);
        alert('Notes saved locally');
    });
    
    // Load saved notes
    const savedNotes = localStorage.getItem('analystNotes');
    if (savedNotes) {
        analystNotes.value = savedNotes;
    }
    
    function processArticles(articles) {
        return articles.map(article => {
            const text = `${article.title} ${article.description || ''}`.toLowerCase();
            const analysis = analyzeKeywords(text);
            return {
                ...article,
                tags: [...analysis.tags],
                keywords: analysis.keywords
            };
        });
    }
    
    function renderNews(articles) {
        newsContainer.innerHTML = '';
        
        if (articles.length === 0) {
            newsContainer.innerHTML = '<p>No articles found for the selected criteria.</p>';
            return;
        }
        
        articles.slice(0, 20).forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'news-item';
            
            const tagsHtml = article.tags.map(tag => 
                `<span class="tag" style="background-color: ${getTagColor(tag)}">${tag}</span>`
            ).join(' ');
            
            articleElement.innerHTML = `
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.description || ''}</p>
                <div class="tags">${tagsHtml}</div>
                <p class="source">${article.source?.name || 'Unknown'} • ${new Date(article.publishedAt).toLocaleDateString()}</p>
            `;
            
            newsContainer.appendChild(articleElement);
        });
    }
    
    function renderWordCloud(articles) {
        wordcloudElement.innerHTML = '';
        
        const keywordCounts = {};
        articles.forEach(article => {
            article.keywords.forEach(keyword => {
                keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
            });
        });
        
        const wordcloudData = Object.entries(keywordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 50)
            .map(([text, size]) => ({ text, size: size * 5 }));
        
        WordCloud(wordcloudElement, { 
            list: wordcloudData,
            weightFactor: 1,
            color: getRandomColor,
            backgroundColor: '#ffffff',
            rotateRatio: 0.5,
            rotationSteps: 2,
            gridSize: 10,
            drawOutOfBound: false
        });
    }
    
    function getTagColor(tag) {
        const colors = {
            'conflict': '#e74c3c',
            'summit': '#3498db',
            'sanction': '#f39c12',
            'military': '#2ecc71',
            'diplomacy': '#9b59b6'
        };
        return colors[tag] || '#95a5a6';
    }
    
    function getRandomColor() {
        const colors = [
            '#2c3e50', '#e74c3c', '#3498db', '#f39c12', '#2ecc71',
            '#1abc9c', '#9b59b6', '#34495e', '#d35400', '#27ae60'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});