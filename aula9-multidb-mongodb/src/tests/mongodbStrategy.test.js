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
const MOCK_HEROI_CADASTRAR_UPDATE = {
    nome:`Joana Dark - ${Date.now()}`,
    poder:'Guerreira'
}

let MOCK_HEROI_ID = ''

const context = new Context(new MongoDB())

describe('MongoDB suite de testes', function() {
    this.beforeAll(async()=> {
        await context.connect()
        await context.create(MOCK_HEROI_CADASTRAR_DEFAULT)
        const resultUpdate = await context.create(MOCK_HEROI_CADASTRAR_UPDATE)
        MOCK_HEROI_ID = resultUpdate._id
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
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR_DEFAULT)
    })
    it('Atualizar Heroi', async()=>{
        const result =  await context.update(MOCK_HEROI_ID,{
            nome:'Homem Aranha'
        })
        assert.deepEqual(result.nModified,1)

    })
    it('remover herói',async() =>{
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n,1)
    })
})