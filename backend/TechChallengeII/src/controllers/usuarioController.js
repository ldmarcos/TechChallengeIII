const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

exports.signup = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hashedSenha });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Falha no cadastro do usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    const isSenhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!isSenhaValida) {
      return res.status(401).json({ error: 'Senha inválida' });
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Falha no login' });
  }
};
