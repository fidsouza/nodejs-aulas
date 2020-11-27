const assert = require('assert')
const Postgres    = require('../db/strategies/Postgres')
const Context     = require('../db/strategies/base/ContextStratagy')

const Heroi       = require('../models/heroi')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome:'Mestre Kami',
    poder: 'Kamehameha'
}

describe('Teste estratégia PostGres', function ()  {
    this.timeout(Infinity)
    this.beforeAll(async function(){
        await context.connect()
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
        const result = await context.read({nome:MOCK_HEROI_CADASTRAR.nome})
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR)
    })
})