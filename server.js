require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT;

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY);
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ error: 'API failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`);
const cors = require('cors');
app.use(cors()); //