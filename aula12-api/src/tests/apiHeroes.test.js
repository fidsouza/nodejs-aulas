const assert = require('assert')
const api = require('../api')

let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome:'Mestre Kami',
    poder: 'Kamehameha'
}
const MOCK_HEROI_ATUALIZAR = {
    nome:'Hulk',
    poder:'Furia'
}

let MOCK_ID_ATUALIZAR = ''

describe('Testes da API Heroes', function(){
    this.beforeAll(async()=>{
        app = await api
        const result = await app.inject({
            method:'POST',
            url:'/herois',
            payload:MOCK_HEROI_ATUALIZAR
        })

        MOCK_ID_ATUALIZAR = JSON.parse(result.payload)

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

        assert.deepEqual(result.statusCode,500)
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

    it('Cadastrar Heroi',async()=>{
        const result = await app.inject({
            method:'POST',
            url:'/herois?skip=0&limit=10',
            payload: MOCK_HEROI_CADASTRAR
        })

        const statusCode = result.statusCode
        const {nome,poder} = JSON.parse(result.payload)


        assert.ok(statusCode === 200)
        assert.deepEqual({nome,poder},MOCK_HEROI_CADASTRAR)
    })
    it.only('Atualizar Heroi',async()=>{
        const id = MOCK_ID_ATUALIZAR.id
        const expected = {
            poder:'Super Verde'
        }
        const result = await app.inject({
            method:'PATCH',
            url:`/herois/${id}`,
            payload: expected
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)


        assert.ok(statusCode === 200)
        assert.deepEqual(dados.poder,expected.poder)

    })
})