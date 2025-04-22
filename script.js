document.getElementById("settingsForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    if (startDate > endDate) {
        alert("Başlangıç tarihi, bitiş tarihinden sonra olamaz!");
        return;
    }

    const region = document.getElementById("region").value;
    const lang = document.getElementById("lang").value;

    fetchData(region, lang, startDate, endDate);
});

const apiKey = "1a6bfcf1ba4a4947b4736aabc0e5d42f";
const apiUrl = "https://api.example.com/data";

function fetchData(region, lang, startDate, endDate) {
    const url = `${apiUrl}?region=${region}&lang=${lang}&start=${startDate.toISOString()}&end=${endDate.toISOString()}&apikey=${apiKey}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('API yanıtı alırken hata oluştu!');
            }
            return response.json();
        })
        .then(data => {
            console.log("Veri başarıyla alındı:", data);
            updateChart(data);
        })
        .catch(error => {
            console.error("Veri çekme hatası:", error);
        });
}

function updateChart(data) {
    const ctx = document.getElementById("dataChart").getContext("2d");

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.date),
            datasets: [{
                label: 'Veri Değeri',
                data: data.map(item => item.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
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