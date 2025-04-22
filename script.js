document.getElementById("settingsForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    if (startDate > endDate) {
        alert("Start date cannot be later than end date!");
        return;
    }

    const region = document.getElementById("region").value;
    const lang = document.getElementById("lang").value;

    fetchData(region, lang, startDate, endDate);
});

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
            updateChart(data.articles);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function updateChart(articles) {
    const ctx = document.getElementById("dataChart").getContext("2d");

    const labels = articles.map(article => article.title);
    const values = articles.map(article => article.source.name.length);  // You can modify this to analyze data differently.

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Article Source Length',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}