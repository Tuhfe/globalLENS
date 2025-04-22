function generateChartData(data) {
    const labels = data.map(article => article.title);
    const values = data.map(article => article.source.name.length);

    return {
        labels: labels,
        datasets: [{
            label: 'Article Source Length',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };
}