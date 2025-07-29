const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // enables CORS for all origins

app.get('/claim-url', async (req, res) => {
  try {
    const response = await fetch('https://api.prod.kanvas.trili.tech/claim-url?campaignId=momi-x-melissa-wiederrecht&authKey=fd58d25269079cec142af70a320a7597');
    
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch from Kanvas API' });
    }
    const data = await response.json();
    
    // Redirect user directly to the claim URL
    res.redirect(data.url);
  } catch (e) {
    console.error('Proxy error:', e);
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
