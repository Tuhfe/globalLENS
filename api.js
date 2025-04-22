const API_URL = 'https://your-globalens-backend.herokuapp.com/api'; // Örnek URL

export async function fetchNewsData(region) {
  const response = await fetch(`${API_URL}/news?region=${region}`);
  return await response.json();
}