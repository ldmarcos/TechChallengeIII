const Postagem = require('../../models/postagemModel');
const { describe, expect, it } = require('@jest/globals');

describe('Testando model de Postagem', () => {
    const objetoPost = {
        nome: 'Novo Post',
        conteudo: 'Conteudo do post',
        autor: 'Professor'
    };

    const postagemExistente = {
        id: 1,
        nome: 'Post Antigo',
        conteudo: 'Conteudo antigo do post',
        autor: 'Autor Antigo',
        created_at: '2024-07-19T12:00:00Z',
        updated_at: '2024-07-19T12:00:00Z'
    };

    const dadosAtualizados = {
        nome: 'Post Atualizado',
        conteudo: 'Conteudo atualizado do post',
        autor: 'Novo Autor'
    };

    it('Deve Listar as Postagens', async () => {
        Postagem.findAll = jest.fn().mockResolvedValue([
            {
                id: 1,
                nome: 'Post 1',
                conteudo: 'Conteudo do post 1',
                autor: 'Autor 1',
                created_at: '2024-07-19T12:00:00Z',
                updated_at: '2024-07-19T12:00:00Z'
            },
            {
                id: 2,
                nome: 'Post 2',
                conteudo: 'Conteudo do post 2',
                autor: 'Autor 2',
                created_at: '2024-07-20T12:00:00Z',
                updated_at: '2024-07-20T12:00:00Z'
            }
        ]);

        const postagens = await Postagem.findAll();

        expect(Postagem.findAll).toHaveBeenCalledTimes(1);

        expect(postagens).toHaveLength(2);
        expect(postagens[0]).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                conteudo: expect.any(String),
                autor: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        );
        expect(postagens[1]).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
                conteudo: expect.any(String),
                autor: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        );
    });


    it('Deve criar uma postagem', async () => {
        Postagem.create = jest.fn().mockReturnValue({
            id: expect.any(Number),
            nome: 'Novo Post',
            conteudo: 'Conteudo do post',
            autor: 'Professor',
            created_at: expect.any(String),
            updated_at: expect.any(String)
        });

        const retorno = await Postagem.create();

        expect(retorno).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoPost,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );
    });

    it('Deve atualizar uma postagem', async () => {
        Postagem.save = jest.fn().mockResolvedValue([1]);
        
        const retorno = await Postagem.save(dadosAtualizados, {
            where: { id: postagemExistente.id }
        });

        expect(Postagem.save).toHaveBeenCalledTimes(1);
        expect(Postagem.save).toHaveBeenCalledWith(
            dadosAtualizados, 
            { where: { id: postagemExistente.id } }
        );
        expect(retorno).toEqual([1]);
    });
});
