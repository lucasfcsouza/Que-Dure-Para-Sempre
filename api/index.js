const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está funcionando!' });
});

// Handler para Vercel
module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Rota de teste
  if (req.url === '/api/health') {
    return res.json({
      status: 'ok',
      message: 'API está funcionando!',
      timestamp: new Date().toISOString()
    });
  }

  // Rota padrão
  return res.json({
    status: 'ok',
    message: 'Bem-vindo à API!',
    path: req.url,
    method: req.method
  });
};
