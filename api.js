const API_KEY = "1a6bfcf1ba4a4947b4736aabc0e5d42f";

fetch(`https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    
    console.log(data);
   
    alert("API'den " + data.articles.length + " haber geldi!");
    
    if (data.articles && data.articles.length > 0) {
      let headlines = "";
      data.articles.slice(0, 5).forEach(article => {
        headlines += "📰 " + article.title + "\n\n";
      });
      alert("Son Haberler:\n" + headlines);
    }
  })
  .catch(error => {
    alert("HATA: " + error.message); // Hata mesajını göster
  });