// In frontend App.js, add:
useEffect(() => {
  const { WebsocketClient } = require('bybit-api');
  const ws = new WebsocketClient({ market: 'v5' });

  ws.subscribe(['tickers.BTCUSDT', 'tickers.ETHUSDT']);

  ws.on('update', (message) => {
    if (message.topic.startsWith('tickers')) {
      // Update state with live price
      console.log(message.data.lastPrice);
    }
  });
}, []);