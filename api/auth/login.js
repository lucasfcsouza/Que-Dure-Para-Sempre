const supabase = require('../config/supabase');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email e senha são obrigatórios'
      });
    }

    // Tenta fazer login no Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Erro no login:', authError);
      return res.status(400).json({
        status: 'error',
        message: 'Email ou senha inválidos'
      });
    }

    // Busca informações adicionais do perfil
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('Erro ao buscar perfil:', profileError);
      return res.status(400).json({
        status: 'error',
        message: 'Erro ao buscar informações do usuário'
      });
    }

    return res.status(200).json({
      status: 'ok',
      message: 'Login realizado com sucesso',
      data: {
        user: {
          id: authData.user.id,
          name: profileData.name,
          email: profileData.email
        },
        session: authData.session
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno ao realizar login'
    });
  }
};
