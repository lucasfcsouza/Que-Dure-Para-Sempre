require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rota básica para teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está funcionando!' });
});

// Conectar ao MongoDB (apenas se a URL estiver disponível)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

  // Rotas da API (apenas se conectado ao MongoDB)
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/pages', require('./routes/pages'));
  app.use('/api/admin', require('./routes/admin'));
  app.use('/api/payments', require('./routes/payments'));
}

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Algo deu errado!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Vercel serverless function export
module.exports = app;
