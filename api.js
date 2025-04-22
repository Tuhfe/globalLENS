const API_KEY = '1a6bfcf1ba4a4947b4736aabc0e5d42f';

export async function fetchNewsData(region, timeframe) {
    const date = new Date();
    date.setDate(date.getDate() - parseInt(timeframe));
    const fromDate = date.toISOString().split('T')[0];
    
    let url;
    if (region === 'global') {
        url = `https://newsapi.org/v2/everything?q=international+OR+global+OR+world&from=${fromDate}&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;
    } else {
        const regionQueries = {
            'europe': 'europe OR EU OR "European Union"',
            'asia': 'asia OR "East Asia" OR "South Asia"',
            'americas': 'americas OR "North America" OR "South America"',
            'middle_east': '"Middle East" OR "Gulf region"',
            'africa': 'africa OR "North Africa" OR "Sub-Saharan"'
        };
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(regionQueries[region])}&from=${fromDate}&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        const data = await response.json();
        if (data.status === 'error') throw new Error(data.message);
        return data.articles || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}