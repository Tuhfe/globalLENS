document.getElementById("fetchData").addEventListener("click", async () => {
  const button = document.getElementById("fetchData");
  const newsContainer = document.getElementById("newsContainer");
  
  button.disabled = true;
  button.textContent = "Yükleniyor...";
  newsContainer.innerHTML = '<div class="loading">Haberler getiriliyor...</div>';

  try {
    const data = await fetchNewsData();
    if (data.articles.length === 0) throw new Error("Haber bulunamadı");
    
    newsContainer.innerHTML = data.articles.map(article => `
      <div class="news-item">
        <h3>${article.title}</h3>
        <p>${article.description || "Açıklama yok"}</p>
      </div>
    `).join("");

  } catch (error) {
    newsContainer.innerHTML = `
      <div class="error">
        <p>⛔ Hata: ${error.message}</p>
        <p>Çözüm için:</p>
        <ul>
          <li>İnternet bağlantınızı kontrol edin</li>
          <li>Daha sonra tekrar deneyin</li>
        </ul>
      </div>
    `;
  } finally {
    button.disabled = false;
    button.textContent = "Analiz Et";
  }
});
document.addEventListener("DOMContentLoaded", function() {
    const analyzeBtn = document.getElementById("analyzeBtn");
    analyzeBtn.addEventListener("click", function() {
        fetchData();  
    });
});
function fetchData() {
    fetch("API_URL")  
        .then(response => {
            if (!response.ok) {
                throw new Error("API Bağlantı Hatası");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  
            processData(data);  
        })
        .catch(error => console.error("Hata: ", error));
}
function displayError(message) {
    const errorElement = document.getElementById("error-message");
    errorElement.innerText = message;
}
function exportData(data) {
    const csvContent = "data:text/csv;charset=utf-8," 
        + data.map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    link.click();
}