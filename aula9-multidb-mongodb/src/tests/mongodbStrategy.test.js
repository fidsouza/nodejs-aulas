const assert = require('assert')
const MongoDB    = require('../db/strategies/Mongo')
const Context     = require('../db/strategies/base/ContextStratagy')

const context = new Context(new MongoDB())

describe('MongoDB suite de testes', function() {
    this.beforeAll(async()=> {
        await context.connect()
    })
    it('verifica conexão', async()=>{
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result,expected)
    })
})