require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { RestClientV5 } = require('bybit-api');

const app = express();
app.use(cors());
app.use(express.json());

const client = new RestClientV5({
  key: process.env.BYBIT_API_KEY,
  secret: process.env.BYBIT_API_SECRET,
  testnet: process.env.TESTNET === 'true',
});

// Endpoint: Get tickers (prices) for multiple symbols
app.get('/api/tickers', async (req, res) => {
  try {
    const response = await client.getTickers({ category: 'spot' }); // Or 'linear' for perpetuals
    res.json(response.result.list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more endpoints as needed, e.g., wallet balance (private)
app.get('/api/balance', async (req, res) => {
  try {
    const response = await client.getWalletBalance({ accountType: 'UNIFIED' });
    res.json(response.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));