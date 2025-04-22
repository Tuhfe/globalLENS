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

    fetchData(region, lang, startDate, endDate);  // Bu fonksiyonu çağırıyoruz
});
document.getElementById("settingsForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const region = document.getElementById("region").value;
    const lang = document.getElementById("lang").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const apiUrl = `https://api.example.com/data?region=${region}&lang=${lang}&start=${startDate}&end=${endDate}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Gelen veriyi konsola yazdırıyoruz.

            // Burada görselleştirmeyi yapmak için Chart.js kullanacağız.
            const labels = data.map(item => item.date); // Verilerin tarih kısmını etiket olarak kullanıyoruz.
            const values = data.map(item => item.value); // Verilerin değer kısmını kullanıyoruz.

            const ctx = document.getElementById("dataChart").getContext("2d");
            new Chart(ctx, {
                type: 'line', // Çizgi grafik
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Veri Değeri',
                        data: values,
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
        })
        .catch(error => console.error("Veri çekme hatası:", error));
});