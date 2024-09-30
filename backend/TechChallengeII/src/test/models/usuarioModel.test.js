const Usuario = require('../../models/usuarioModel.js')
const { describe, expect, it } = require('@jest/globals');


describe('Testando model dos usuários', ()=>{
    const objetoUsuario = {
        nome: 'Usuario Teste',
        email: 'teste@gmail.com',
        senha: 'testando123'
    };

    it('Deve criar um usuario', async () => {
        Usuario.create = jest.fn().mockReturnValue({
            id: expect.any(Number),
            nome: 'Usuario Teste',
            email: 'teste@gmail.com',
            senha: 'testando123',
            created_at: expect.any(String),
            updated_at: expect.any(String)
        });

        const retorno = await Usuario.create();

        expect(retorno).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoUsuario,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );
    });
})