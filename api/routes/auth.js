const auth = {
  async login(req, res) {
    try {
      return res.json({
        status: 'ok',
        message: 'Rota de login - Em desenvolvimento'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  async register(req, res) {
    try {
      return res.json({
        status: 'ok',
        message: 'Rota de registro - Em desenvolvimento'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
};

module.exports = auth;
