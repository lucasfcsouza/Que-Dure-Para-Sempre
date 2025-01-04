const axios = require('axios');

class AsaasService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.ASAAS_API_URL,
      headers: {
        'access_token': process.env.ASAAS_API_KEY,
        'Content-Type': 'application/json',
      },
    });
  }

  async createCustomer(data) {
    try {
      const response = await this.api.post('/customers', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        cpfCnpj: data.cpfCnpj,
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar cliente no ASAAS: ' + error.message);
    }
  }

  async createPayment(data) {
    try {
      const payload = {
        customer: data.customerId,
        billingType: 'CREDIT_CARD',
        value: data.value,
        dueDate: new Date().toISOString().split('T')[0],
        description: data.description,
      };

      if (data.plan === 'annual') {
        payload.cycle = 'YEARLY';
        payload.maxPayments = 0; // Recorrente indefinidamente
      }

      const response = await this.api.post('/payments', payload);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar pagamento no ASAAS: ' + error.message);
    }
  }

  async createCreditCardPayment(data) {
    try {
      const payload = {
        customer: data.customerId,
        billingType: 'CREDIT_CARD',
        value: data.value,
        dueDate: new Date().toISOString().split('T')[0],
        description: data.description,
        creditCard: {
          holderName: data.creditCard.holderName,
          number: data.creditCard.number,
          expiryMonth: data.creditCard.expiryMonth,
          expiryYear: data.creditCard.expiryYear,
          ccv: data.creditCard.ccv,
        },
        creditCardHolderInfo: {
          name: data.creditCard.holderName,
          email: data.email,
          cpfCnpj: data.cpfCnpj,
          phone: data.phone,
        },
      };

      const response = await this.api.post('/payments', payload);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar pagamento com cartão no ASAAS: ' + error.message);
    }
  }

  async getPaymentStatus(paymentId) {
    try {
      const response = await this.api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao consultar status do pagamento: ' + error.message);
    }
  }

  async cancelSubscription(subscriptionId) {
    try {
      const response = await this.api.delete(`/subscriptions/${subscriptionId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao cancelar assinatura: ' + error.message);
    }
  }
}

module.exports = new AsaasService();
