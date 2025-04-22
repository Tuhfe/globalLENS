export async function fetchNewsData() {
  const API_KEY = "1a6bfcf1ba4a4947b4736aabc0e5d42f";
  
  try {
    const response = await fetch(
      `https://corsproxy.io/?https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`
    );
    
    if (!response.ok) throw new Error(`HTTP hatası! Kod: ${response.status}`);
    
    const data = await response.json();
    
    if (!data.articles) {
      alert("API'den articles gelmedi! Veri yapısı: " + JSON.stringify(data));
      return { articles: [] }; 
    }
    
    return data;
    
  } catch (error) {
    alert("API ÇÖKTÜ: " + error.message);
    return { articles: [] }; 
  }
}