const ctx = document.getElementById("dataChart").getContext("2d");
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Veri 1', 'Veri 2', 'Veri 3'],
        datasets: [{
            label: 'Veri Değeri',
            data: [10, 20, 30],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
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