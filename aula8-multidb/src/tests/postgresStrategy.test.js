const assert = require('assert')
const Postgres    = require('../db/strategies/Postgres')
const Context     = require('../db/strategies/base/ContextStratagy')

const Heroi       = require('../models/heroi')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome:'Mestre Kami',
    poder: 'Kamehameha'
}
const MOCK_HEROI_ATUALIZAR = {
    nome:'Batman',
    poder: 'Inteligência'
}

describe('Teste estratégia PostGres', function ()  {
    this.timeout(Infinity)
    this.beforeAll(async function(){
        await context.connect()
        await context.create(MOCK_HEROI_CADASTRAR)
    })
    it('Postgres Connection', async() => {
        const result = await context.isConnected()
        assert.equal(result,true)
    })
    it('Cadastrar Heroi',async() =>{
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR)
    })
    it('Retornar Heróis',async()=>{
        //para retornar primeira posição utilize []
        const result = await context.read({nome:MOCK_HEROI_CADASTRAR.nome})
        delete result.id
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR)
    })
    it('Atualizar Herói',async () => {
        const itemAtualizar = await context.read({nome:MOCK_HEROI_CADASTRAR.nome})
        const result = await context.update(itemAtualizar.id,MOCK_HEROI_ATUALIZAR)

        delete result.id
        delete result.createdat
        delete result.updatedat

        assert.deepEqual(result,MOCK_HEROI_ATUALIZAR)
    })
})