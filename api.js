const apiKey = "1a6bfcf1ba4a4947b4736aabc0e5d42f"; // 
const apiUrl = "https://newsapi.org/v2/top-headlines"; // 

function fetchData(region, lang, startDate, endDate) {
    const url = `${apiUrl}?region=${region}&lang=${lang}&start=${startDate}&end=${endDate}&apikey=${apiKey}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error("API verisi alınırken hata oluştu:", error));
}