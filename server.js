const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (adjust as needed)
app.use(cors());

// Serve static files from the "public" folder
const PUBLIC_PATH = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_PATH));

// Serve index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});

// Secure proxy route for claim URL (hides authKey from frontend)
app.get('/claim-url', async (req, res) => {
  try {
    const apiUrl = 'https://api.prod.kanvas.trili.tech/claim-url?campaignId=momi-x-melissa-wiederrecht&authKey=fd58d25269079cec142af70a320a7597';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      return res.status(502).json({ error: 'Failed to fetch claim URL' });
    }

    const json = await response.json();
    if (!json.url) {
      return res.status(500).json({ error: 'Malformed response from Kanvas API' });
    }

    res.json({ url: json.url });
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Server proxy error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});



