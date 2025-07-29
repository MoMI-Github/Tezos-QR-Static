const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // enables CORS for all origins

// Serve static files (like index.html, fonts, js, etc.)
const PUBLIC_PATH = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_PATH));

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});

// Proxy route for claim URL — returns the URL in JSON
app.get('/claim-url', async (req, res) => {
  try {
    const response = await fetch('https://api.prod.kanvas.trili.tech/claim-url?campaignId=momi-x-melissa-wiederrecht&authKey=fd58d25269079cec142af70a320a7597');
    
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch from Kanvas API' });
    }

    const data = await response.json();
    res.json({ url: data.url }); // ✅ Return the URL as JSON
  } catch (e) {
    console.error('Proxy error:', e);
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});


