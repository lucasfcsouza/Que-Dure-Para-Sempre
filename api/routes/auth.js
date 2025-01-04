const jwt = require('jsonwebtoken');
const User = require('../models/User');
const connectDB = require('../config/database');

const auth = {
  async login(req, res) {
    try {
      await connectDB();
      
      const { email, password } = req.body;
      
      // Validar entrada
      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Email e senha são obrigatórios'
        });
      }

      // Buscar usuário
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Credenciais inválidas'
        });
      }

      // Verificar senha
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          status: 'error',
          message: 'Credenciais inválidas'
        });
      }

      // Gerar token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.json({
        status: 'ok',
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          subscription: user.subscription
        }
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Erro ao realizar login'
      });
    }
  },

  async register(req, res) {
    try {
      await connectDB();
      
      const { name, email, password } = req.body;
      
      // Validar entrada
      if (!name || !email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Nome, email e senha são obrigatórios'
        });
      }

      // Verificar se usuário já existe
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          status: 'error',
          message: 'Email já cadastrado'
        });
      }

      // Criar novo usuário
      user = new User({
        name,
        email,
        password
      });

      await user.save();

      // Gerar token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        status: 'ok',
        message: 'Usuário registrado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Erro ao registrar usuário'
      });
    }
  }
};

module.exports = auth;
