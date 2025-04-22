const apiKey = "1a6bfcf1ba4a4947b4736aabc0e5d42f"; // 
const apiUrl = "https://newsapi.org/v2/top-headlines"; // 

async function fetchData(region) {
  const response = await fetch(`${apiUrl}?country=${region}&apiKey=${apiKey}`);
  const data = await response.json();
  return data;
}