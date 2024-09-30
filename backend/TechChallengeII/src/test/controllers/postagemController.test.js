const { listarPostagens, criarPostagem, atualizarPostagem, obterPostagem, deletarPostagem, pesquisarPostagem } = require('../../controllers/postagemController');
const Postagem = require('../../models/postagemModel');

describe('Testando o controller de Postagens', () => {
  it('Deve listar todas as postagens com sucesso', async () => {
    Postagem.findAll = jest.fn().mockResolvedValue([
      { id: 1, titulo: 'Post 1', conteudo: 'Conteudo do post 1', autor: 'Autor 1' },
      { id: 2, titulo: 'Post 2', conteudo: 'Conteudo do post 2', autor: 'Autor 2' }
    ]);

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await listarPostagens(req, res);

    expect(Postagem.findAll).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith([
      { id: 1, titulo: 'Post 1', conteudo: 'Conteudo do post 1', autor: 'Autor 1' },
      { id: 2, titulo: 'Post 2', conteudo: 'Conteudo do post 2', autor: 'Autor 2' }
    ]);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Deve listar postagem especificada', async () => {
    const PostagemExistente = {
        id: 10,
        titulo: 'Novo Post',
        conteudo: 'Conteudo do post',
        autor: 'Professor',
        created_at: '2024-07-01',
        updated_at: '2024-07-01',
      };
    
    Postagem.findByPk = jest.fn().mockResolvedValue(PostagemExistente);

    const req = {
        params:{
            id: PostagemExistente.id
        }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await obterPostagem(req, res);

    expect(Postagem.findByPk).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith({
        id: 10,
        titulo: 'Novo Post',
        conteudo: 'Conteudo do post',
        autor: 'Professor',
        created_at: '2024-07-01',
        updated_at: '2024-07-01',
    });

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Deve retornar erro 404 se a postagem não for encontrada para exibição', async () => {
    Postagem.findByPk = jest.fn().mockResolvedValue(null);

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await obterPostagem(req, res);
    expect(Postagem.findByPk).toHaveBeenCalledWith(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Postagem não encontrada' });
  });


  it('Deve buscar postagem de acordo com palavra chave', async () => {
    const postagens = [
        { id: 1, titulo: 'Postagem Teste', conteudo: 'Conteudo teste', autor: 'Professor Teste' },
        { id: 2, titulo: 'Outro post', conteudo: 'Conteudo teste 2', autor: 'Professor Teste' },
      ];
    
      const palavraChave = 'post';
    
      Postagem.findAll = jest.fn().mockResolvedValue(postagens.filter(postagem =>
        postagem.titulo.includes(palavraChave) || postagem.conteudo.includes(palavraChave)
      ));
    
      const req = {
        query: {
          q: palavraChave
        }
      };
    
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
    
      await pesquisarPostagem(req, res);
    
      expect(Postagem.findAll).toHaveBeenCalledTimes(1);
    
      expect(res.json).toHaveBeenCalledWith([
        { id: 2, titulo: 'Outro post', conteudo: 'Conteudo teste 2', autor: 'Professor Teste' }
      ]);
    
      expect(res.status).toHaveBeenCalledWith(200);
  });


  it('Deve criar uma postagem', async () => {
    const novaPostagem = {
      titulo: 'Novo Post',
      conteudo: 'Conteudo do post',
      autor: 'Professor'
    };

    Postagem.create = jest.fn().mockResolvedValue({
      id: 10,
      ...novaPostagem,
      created_at: '2024-07-01',
      updated_at: '2024-07-01'
    });

    const req = {
      body: novaPostagem
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await criarPostagem(req, res);

    expect(Postagem.create).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith({
      id: 10,
      ...novaPostagem,
      created_at: '2024-07-01',
      updated_at: '2024-07-01'
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  it('Deve atualizar uma postagem', async () => {
    const PostagemExistente = {
        id: 10,
        titulo: 'Novo Post',
        conteudo: 'Conteudo do post',
        autor: 'Professor'
      };
    
      const PostagemAtualizada = {
        titulo: 'Post Atualizado',
        conteudo: 'Conteudo do post atualizado',
        autor: 'Professor Atualizado',
      };
    
      Postagem.findByPk = jest.fn().mockResolvedValue(PostagemExistente);
    
      PostagemExistente.save = jest.fn().mockResolvedValue();
    
      const req = {
        params: { id: PostagemExistente.id },
        body: PostagemAtualizada
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
    
      await atualizarPostagem(req, res);
    
      expect(Postagem.findByPk).toHaveBeenCalledTimes(1);
      expect(Postagem.findByPk).toHaveBeenCalledWith(PostagemExistente.id);
    
      expect(PostagemExistente.titulo).toBe(PostagemAtualizada.titulo);
      expect(PostagemExistente.conteudo).toBe(PostagemAtualizada.conteudo);
      expect(PostagemExistente.autor).toBe(PostagemAtualizada.autor);
    
      expect(res.json).toHaveBeenCalledWith(PostagemExistente);
    
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status).toHaveBeenCalledTimes(1);
  });

  it('Deve retornar erro 404 se a postagem não for encontrada para atualizar', async () => {
    Postagem.findByPk = jest.fn().mockResolvedValue(null);

    const req = { 
        params: { 
            id: 1 
        }, 
        body: {
            titulo: 'Post Atualizado',
            conteudo: 'Conteudo do post atualizado',
            autor: 'Professor Atualizado',
        }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await atualizarPostagem(req, res);
    expect(Postagem.findByPk).toHaveBeenCalledWith(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Postagem não encontrada' });
  });

  it('Deve excluir uma postagem', async () => {
    const PostagemExistente = {
        id: 10,
        titulo: 'Novo Post',
        conteudo: 'Conteudo do post',
        autor: 'Professor',
        created_at: '2024-07-01',
        updated_at: '2024-07-01',
      };
    
      Postagem.findByPk = jest.fn().mockResolvedValue(PostagemExistente);
    
      const destroyMock = jest.fn().mockResolvedValue();
      PostagemExistente.destroy = destroyMock;
    
      const req = {
        params: { id: PostagemExistente.id },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    
      await deletarPostagem(req, res);
    
      expect(Postagem.findByPk).toHaveBeenCalledTimes(1);
      expect(Postagem.findByPk).toHaveBeenCalledWith(PostagemExistente.id);
    
      expect(destroyMock).toHaveBeenCalledTimes(1);
    
      expect(res.json).toHaveBeenCalledWith({
        message: 'Postagem deletada com sucesso',
      });
  });

  it('Deve retornar erro 404 se a postagem não for encontrada para exclusão', async () => {
    Postagem.findByPk = jest.fn().mockResolvedValue(null);

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deletarPostagem(req, res);
    expect(Postagem.findByPk).toHaveBeenCalledWith(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Postagem não encontrada' });
  });
});
