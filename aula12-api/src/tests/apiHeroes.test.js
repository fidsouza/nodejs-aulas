const assert = require('assert')
const api = require('../api')

let app = {}

describe('Testes da API Heroes', function(){
    this.beforeAll(async()=>{
        app = await api
    })

    it('Listar /herois', async()=>{
        const result = await app.inject({
            method:'GET',
            url:'/herois?skip=0&limit=10'
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)


        assert.deepEqual(statusCode,200)
        assert.ok(Array.isArray(dados))

    })
    it('Listar /herois caractere inválido',async() =>{
        const TAMANHO_LIMITE = 'AEEE'
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        assert.deepEqual(result.payload,'Erro interno no servidor')
    })
    it('Listar /herois limitando por 3 ids',async() =>{
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)


        assert.deepEqual(statusCode,200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })
})