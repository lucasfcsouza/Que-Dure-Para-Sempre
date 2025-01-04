const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Rota pública para criar pagamento
router.post('/create', paymentController.createPayment);

// Rota pública para webhook do ASAAS
router.post('/webhook', paymentController.handleWebhook);

// Rota protegida para verificar status do pagamento
router.get('/status/:paymentId', protect, paymentController.getPaymentStatus);

module.exports = router;
