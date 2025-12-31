import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tickers');
        setTickers(res.data.filter(t => ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'].includes(t.symbol)));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickers();
    const interval = setInterval(fetchTickers, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  // Example chart data (you can expand with historical klines)
  const chartData = {
    labels: ['1', '2', '3', '4', '5'], // Placeholder
    datasets: tickers.map(t => ({
      label: t.symbol,
      data: tickers.map(() => Math.random() * 100000), // Replace with real data
      borderColor: 'rgb(75, 192, 192)',
    })),
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Bybit Crypto Dashboard</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Symbol</th><th>Last Price</th><th>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {tickers.map(t => (
            <tr key={t.symbol}>
              <td>{t.symbol}</td>
              <td>${parseFloat(t.lastPrice).toFixed(2)}</td>
              <td style={{ color: parseFloat(t.price24hPcnt) > 0 ? 'green' : 'red' }}>
                { (parseFloat(t.price24hPcnt) * 100).toFixed(2) }%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Price Chart (Demo)</h2>
      <Line data={chartData} />
    </div>
  );
}

export default App;