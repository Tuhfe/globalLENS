export async function fetchNewsData() {
  const response = await fetch('http://localhost:3001/api/news'); // Port 3001 olmalı!
  return await response.json();
}