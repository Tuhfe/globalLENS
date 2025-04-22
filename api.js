const API_KEY = '1a6bfcf1ba4a4947b4736aabc0e5d42f';
const BASE_URL = 'https://newsapi.org/v2';

export async function fetchNewsData(region, timeframe) {
    const date = new Date();
    date.setDate(date.getDate() - parseInt(timeframe));
    const fromDate = date.toISOString().split('T')[0];
    
    let endpoint, params;
    
    if (region === 'global') {
        endpoint = '/everything';
        params = new URLSearchParams({
            q: 'international OR global OR world',
            from: fromDate,
            sortBy: 'publishedAt',
            pageSize: '100',
            apiKey: API_KEY
        });
    } else {
        const regionQueries = {
            'europe': 'europe OR EU OR "European Union"',
            'asia': 'asia OR "East Asia" OR "South Asia"',
            'americas': 'americas OR "North America" OR "South America"',
            'middle_east': '"Middle East" OR "Gulf region"',
            'africa': 'africa OR "North Africa" OR "Sub-Saharan"'
        };
        endpoint = '/everything';
        params = new URLSearchParams({
            q: regionQueries[region],
            from: fromDate,
            sortBy: 'publishedAt',
            pageSize: '100',
            apiKey: API_KEY
        });
    }

    try {
        const url = `${BASE_URL}${endpoint}?${params.toString()}`;
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        throw new Error(`Failed to fetch news: ${error.message}`);
    }
}