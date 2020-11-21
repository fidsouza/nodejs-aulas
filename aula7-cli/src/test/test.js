const {ok,deepEqual} = require('assert')

const DEFAULT_ITEM_CADASTRADO = {
    nome:'Flash',
    poder:'Speed',
    id:1
}

const database = require('../service/database')

describe('Suite de manipulação de Heróis',()=>{
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
    })
    it('deve pesquisar um herói, usando arquivos.', async () => {
        const expected = DEFAULT_ITEM_CADASTRADO
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado,expected)
    })
    it('deve cadastrar um herói, usando arquivos.', async () => {
        const expected  = DEFAULT_ITEM_CADASTRADO
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
        const [actual]  = await database.listar(DEFAULT_ITEM_CADASTRADO.id)

        deepEqual(actual,expected)
    })
    it('deve remover um herói por id, usando arquivos.', async () => {
        const expected  = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRADO.id)

        deepEqual(resultado,expected)
    })
})