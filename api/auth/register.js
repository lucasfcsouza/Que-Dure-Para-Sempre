const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Nome, email e senha são obrigatórios'
      });
    }

    // Registra o usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      console.error('Erro no registro Supabase Auth:', authError);
      return res.status(400).json({
        status: 'error',
        message: authError.message
      });
    }

    // Adiciona informações adicionais na tabela de perfis
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          name,
          email,
          created_at: new Date().toISOString()
        }
      ]);

    if (profileError) {
      console.error('Erro ao criar perfil:', profileError);
      return res.status(400).json({
        status: 'error',
        message: 'Erro ao criar perfil do usuário'
      });
    }

    return res.status(200).json({
      status: 'ok',
      message: 'Usuário registrado com sucesso',
      data: {
        id: authData.user.id,
        name,
        email
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno ao registrar usuário'
    });
  }
};
