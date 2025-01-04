const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Tratar requisições OPTIONS (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Extrair o caminho da URL
  const path = req.url.split('?')[0];

  // Log para debug
  console.log('Request:', {
    method: req.method,
    path: path,
    body: req.body,
    headers: req.headers
  });

  // Roteamento
  try {
    switch (path) {
      case '/api/health':
        return res.json({
          status: 'ok',
          message: 'API está funcionando!',
          timestamp: new Date().toISOString()
        });

      case '/api/auth/login':
        return await auth.login(req, res);

      case '/api/auth/register':
        return await auth.register(req, res);

      default:
        // Rota padrão
        return res.json({
          status: 'ok',
          message: 'Bem-vindo à API!',
          path: path,
          method: req.method,
          availableRoutes: [
            '/api/health',
            '/api/auth/login',
            '/api/auth/register'
          ]
        });
    }
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
