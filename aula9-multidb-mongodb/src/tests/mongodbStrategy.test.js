const assert = require('assert')
const MongoDB    = require('../db/strategies/Mongo')
const Context     = require('../db/strategies/base/ContextStratagy')

const MOCK_HEROI_CADASTRAR = {
    nome:'Gaviào Arqueiro',
    poder:'Velocidade e Pontaria'
}

const MOCK_HEROI_CADASTRAR_DEFAULT = {
    nome:`Gaviào Arqueiro - ${Date.now()}`,
    poder:'Velocidade e Pontaria'
}

const context = new Context(new MongoDB())

describe('MongoDB suite de testes', function() {
    this.beforeAll(async()=> {
        await context.connect()
        await context.create(MOCK_HEROI_CADASTRAR_DEFAULT)
    })
    it('verifica conexão', async()=>{
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result,expected)
    })
    it('Cadastrar Heroi',async()=>{
        const {nome,poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome,poder},MOCK_HEROI_CADASTRAR)
    })
    it('Listar Heroi',async()=>{
        const [{nome,poder}] = await context.read({nome:MOCK_HEROI_CADASTRAR_DEFAULT.nome})
        const result = {
            nome,
            poder
        }
        console.log('Result Read',result)
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR_DEFAULT)
    })
})