export async function fetchNewsData() {
  try {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=tr');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("API Hatası:", error);
    throw error;
  }
}