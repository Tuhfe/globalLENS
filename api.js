const apiKey = "1a6bfcf1ba4a4947b4736aabc0e5d42f";
const apiUrl = "https://newsapi.org/v2/everything";

function fetchData(region, lang, startDate, endDate) {
    const url = `${apiUrl}?q=${region}&from=${startDate.toISOString()}&to=${endDate.toISOString()}&language=${lang}&apiKey=${apiKey}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data!');
            }
            return response.json();
        })
        .then(data => {
            return data.articles;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}