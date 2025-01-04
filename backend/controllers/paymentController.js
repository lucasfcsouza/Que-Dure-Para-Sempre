const asaasService = require('../services/asaasService');
const User = require('../models/User');
const Page = require('../models/Page');

exports.createPayment = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      cpfCnpj,
      plan,
      creditCard,
      coupleName
    } = req.body;

    // 1. Criar cliente no ASAAS
    const customer = await asaasService.createCustomer({
      name,
      email,
      phone,
      cpfCnpj
    });

    // 2. Definir valor baseado no plano
    const value = plan === 'lifetime' ? 29.90 : 19.90;
    const description = plan === 'lifetime' 
      ? 'Plano Vitalício - Relógio do Amor'
      : 'Plano Anual - Relógio do Amor';

    // 3. Criar pagamento
    const payment = await asaasService.createCreditCardPayment({
      customerId: customer.id,
      value,
      description,
      plan,
      creditCard,
      email,
      cpfCnpj,
      phone
    });

    // 4. Criar usuário no sistema
    const user = await User.create({
      name,
      email,
      plan,
      asaasCustomerId: customer.id,
      planExpiresAt: plan === 'annual' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : null
    });

    // 5. Criar página inicial
    const page = await Page.create({
      userId: user._id,
      coupleName,
      status: 'draft'
    });

    res.status(200).json({
      status: 'success',
      data: {
        payment,
        user,
        page
      }
    });
  } catch (error) {
    console.error('Erro no processamento do pagamento:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.handleWebhook = async (req, res) => {
  try {
    const event = req.body;

    switch (event.event) {
      case 'PAYMENT_CONFIRMED':
        // Ativar a página do usuário
        const user = await User.findOne({ asaasCustomerId: event.customer });
        if (user) {
          await Page.updateMany(
            { userId: user._id },
            { status: 'published' }
          );
        }
        break;

      case 'PAYMENT_RECEIVED':
        // Atualizar data de expiração para planos anuais
        const payment = event.payment;
        if (payment.billingType === 'SUBSCRIPTION') {
          await User.findOneAndUpdate(
            { asaasCustomerId: event.customer },
            { 
              planExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }
          );
        }
        break;

      case 'PAYMENT_OVERDUE':
      case 'PAYMENT_DECLINED':
        // Desativar página temporariamente
        const overdueUser = await User.findOne({ asaasCustomerId: event.customer });
        if (overdueUser) {
          await Page.updateMany(
            { userId: overdueUser._id },
            { status: 'disabled' }
          );
        }
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const status = await asaasService.getPaymentStatus(paymentId);
    
    res.json({
      status: 'success',
      data: status
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
