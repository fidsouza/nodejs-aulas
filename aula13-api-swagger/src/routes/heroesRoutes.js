const BaseRoute = require('./base/baseRoute')
const Joi = require ('joi')

class HeroRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db

    }

    list(){
        return {
            path: '/herois',
            method: 'GET',
            config:{
                tags:['api'],
                description:'Deve listar todos os heróis',
                notes:'pode paginar resultados para filtrar ou não',      
                validate: {
                    query: Joi.object({
                        skip: Joi.number()
                            .default(0)
                            .description('pular quantos primeiros registros'),
            
                        limit: Joi.number()
                            .default(10)
                            .description('no máximo quantos registros')
                    })
                },
            },
            handler:(request,response)=>{   
                try {
                    const {skip,limit} = request.query
                    let query = {}
                    // const {value,error} = schema.validate({skip:skip,limit:limit})
                    // if(error)
                    //     return console.log('Erro na validação',error.details[0].message)

                    return this.db.read(query,skip,limit)

                } catch (error) {
                    console.log('Deu Ruim',error)
                    return 'Erro interno no servidor'
                }
            }
        }
    }
    create(){
        return {
            path: '/herois',
            method: 'POST',
            config:{
                tags:['api'],
                description:'Deve cadastrar heróis',
                notes:'deve cadastrar heroi por nome e poder',
                validate: {
                    payload: Joi.object({
                        nome: Joi.string()
                            .required()
                            .description('nome do herói'),
            
                        poder: Joi.string()
                            .required()
                            .description('nome do poder')
                    })
                },
            },
            handler: async (request)=>{
                try {
                    const value = request.payload
    
                    const result = await this.db.create(value)
                    return result
                } catch (error) {
                    console.error('DEU RUIM',error)
                    return 'Erro interno'
                }
            }

        }

    }
    update(){
        return{
            path:'/herois/{id}',
            method:'PATCH',
            config:{
                tags:['api'],
                description:'Deve atualizar heróis',
                notes:'deve atualizar heroi por id',
                validate: {
                    params: Joi.object({
                        id: Joi.number()
                            .required()
                            .description('id do herói')
                    }),
                    payload: Joi.object({
                        nome: Joi.string()
                            .description('nome do herói'),
            
                        poder: Joi.string()
                            .description('nome do poder')
                    }),
                },
            },
            handler: async (request)=>{
                try {

                    const {
                        id
                    } = request.params
                    const {payload} = request

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)
                    
                    const result = await this.db.update(id,payload ? payload : dados)
                    
                    return result

                } catch (error) {
                    console.error('Deu RUIM',error)
                    return 'Erro Interno'
                }
            }


        }
    }
    delete(){
        return{
            path:'/herois/{id}',
            method:'DELETE',
            config:{
                tags:['api'],
                description:'Deve remover heróis',
                notes:'deve remover heroi por id',
                validate: {
                    params: Joi.object({
                        id: Joi.number()
                            .required()
                            .description('id do herói')
                    }),
                },
            },
            handler: async(request)=> {
                try {

                    const {id} = request.params
                    console.log('Id ao deletar',id)
                    const result = await this.db.delete(id)

                    if(result !== 1){
                        return {message:'Erro ao remover heroi'}
                    }

                    return {message:'Heroi Removido com sucesso'}

                } catch (error) {
                    console.error('DEU RUIM',error)
                    return 'Erro interno ao deletar'
                }
            }
        }

    }

}

module.exports = HeroRoutes