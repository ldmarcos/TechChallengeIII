const Postagem = require('../models/postagemModel');
const {Op} = require('sequelize')
exports.listarPostagens = async (req, res) => {
  try {
    const postagens = await Postagem.findAll();
    res.status(200).json(postagens);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao listar postagens' });
  }
};

exports.obterPostagem = async (req, res) => {
  const { id } = req.params;
  try {
    const postagem = await Postagem.findByPk(id);
    if (!postagem) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }
    res.status(200).json(postagem);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao obter postagem' });
  }
};

exports.pesquisarPostagem = async (req, res) => {
  const { pesquisa } = req.query;

  try {
    const conteudo = await Postagem.findAll({
      where: {
        [Op.or]: [
          { titulo: { [Op.iLike]: `%${pesquisa}%` } },
          { conteudo: { [Op.iLike]: `%${pesquisa}%` } }
        ]
      }
    });

    if (conteudo.length === 0) {
      return res.status(404).json({ error: 'Nenhuma postagem encontrada' });
    }

    res.status(200).json(conteudo);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Falha ao realizar a pesquisa' });
  }
};

exports.criarPostagem = async (req, res) => {
  const { titulo, img, conteudo, autor } = req.body;
  try {
    const postagem = await Postagem.create({ titulo, conteudo, img, autor });
    res.status(201).json(postagem);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao criar postagem' });
  }
};

exports.atualizarPostagem = async (req, res) => {
  const { id } = req.params;
  const { titulo, img, conteudo, autor } = req.body;
  try {
    const postagem = await Postagem.findByPk(id);
    if (!postagem) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }
    postagem.titulo = titulo;
    postagem.img = img;
    postagem.conteudo = conteudo;
    postagem.autor = autor;
    await postagem.save();
    res.status(200).json(postagem);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao atualizar postagem' });
  }
};

exports.deletarPostagem = async (req, res) => {
  const { id } = req.params;
  try {
    const postagem = await Postagem.findByPk(id);
    if (!postagem) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }
    await postagem.destroy();
    res.json({ message: 'Postagem deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Falha ao deletar postagem' });
  }
};
