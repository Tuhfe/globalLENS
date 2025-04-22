document.getElementById("fetchDataBtn").addEventListener("click", async function() {
  const region = document.getElementById("regionSelect").value;
  const language = document.getElementById("languageSelect").value;
  const dateRange = document.getElementById("dateRange").value;

  if (!region || !language || !dateRange) {
    document.getElementById("analysisResult").innerText = "Lütfen tüm alanları doldurun.";
    return;
  }

  const [startDate, endDate] = dateRange.split(" to ");
  if (!startDate || !endDate) {
    document.getElementById("analysisResult").innerText = "Geçerli bir tarih aralığı girin.";
    return;
  }

  try {
    const apiUrl = `https://example.com/api/region=${region}&lang=${language}&start=${startDate}&end=${endDate}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.length > 0) {
      // Anahtar kelime çıkarımı ve görselleştirme yapılabilir
      const keywords = extractKeywords(data);
      const visualization = generateVisualization(data);

      document.getElementById("analysisResult").innerHTML = `
        <p><strong>Gündem:</strong></p>
        <p>${keywords}</p>
        <p>${visualization}</p>
      `;
    } else {
      document.getElementById("analysisResult").innerText = "Veri bulunamadı.";
    }
  } catch (error) {
    document.getElementById("analysisResult").innerText = "Hata oluştu: " + error.message;
  }
});

function extractKeywords(data) {
  // Basit anahtar kelime çıkarımı için örnek
  const keywords = ['conflict', 'summit', 'sanction', 'military', 'diplomacy'];
  return keywords.join(', ');
}

function generateVisualization(data) {
  // Bu fonksiyon görselleştirme için grafik oluşturabilir
  return "Grafik Görselleştirme Yapılabilir.";
}