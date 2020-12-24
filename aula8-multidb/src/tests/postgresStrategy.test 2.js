const assert = require('assert')
const Postgres    = require('../db/strategies/Postgres')
const Context     = require('../db/strategies/base/ContextStratagy')

const context = new Context(new Postgres())

describe('Teste estratégia PostGres', function ()  {
    this.timeout(Infinity)
    it('Postgres Connection', async() => {
        const result = await context.isConnected()
        assert.equal(result,true)
    })
})