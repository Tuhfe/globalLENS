require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
const PORT = 3001;

app.get('/api/news', async (req, res) => {
  try {
    const { region = 'global' } = req.query;
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ error: 'API failed' });
  }
});

app.listen(PORT, () => console.log(`Server running!`));