const assert = require('assert')
const Postgres    = require('../db/strategies/postgres/Postgres')
const Context     = require('../db/strategies/base/ContextStratagy')

const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema')



const MOCK_HEROI_CADASTRAR = {
    nome:'Mestre Kami',
    poder: 'Kamehameha'
}
const MOCK_HEROI_ATUALIZAR = {
    nome:'Batman',
    poder: 'Inteligência'
}

let context = {}

describe('Teste estratégia PostGres', function ()  {
    this.timeout(Infinity)
    this.beforeAll(async function(){
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection,HeroiSchema)
        context = new Context(new Postgres(connection,model))

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
    it('remover por id',async() => {
        const item = await context.read({})
        const result = await context.delete(item.id)

        assert.deepEqual(result,1)
    })
})