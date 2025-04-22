export async function fetchNewsData() {
  const API_KEY = "1a6bfcf1ba4a4947b4736aabc0e5d42f";
  
  try {
    const response = await fetch(
      `https://corsproxy.io/?https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP hatası! Durum kodu: ${response.status}`);
    }
    
    const data = await response.json();
    
    alert(`${data.articles.length} haber başarıyla çekildi!`);
    
    return data;
    
  } catch (error) {
    
    alert("API hatası: " + error.message);
    throw error;
  }
}