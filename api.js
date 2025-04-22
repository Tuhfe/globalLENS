export async function fetchNewsData() {
  const response = await fetch('http://localhost:3001/api/news');
  return await response.json();
}