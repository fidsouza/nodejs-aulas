const {ok,deepEqual} = require('assert')

const DEFAULT_ITEM_CADASTRADO = {
    nome:'Flash',
    poder:'Speed',
    id:1
}

const database = require('../service/database')

describe('Suite de manipulação de Heróis',()=>{
    it('deve pesquisar um herói, usando arquivos.', async () => {
        const expected = DEFAULT_ITEM_CADASTRADO
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado,expected)
    })
})