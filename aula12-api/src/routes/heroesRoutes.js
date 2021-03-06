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
            handler:(request,response)=>{   
                try {
                    const {skip,limit} = request.query
                    let query = {}
                    const schema = Joi.object({
                        skip:Joi.number().integer().default(0),
                        limit:Joi.number().integer().default(10)
                    })
                    
                    const {value,error} = schema.validate({skip:skip,limit:limit})
                    if(error)
                        return console.log('Erro na validação',error.details[0].message)

                    return this.db.read(query,parseInt(value.skip),parseInt(value.limit))

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
            handler: async (request)=>{
                try {
                    const {nome,poder} = request.payload
                    const schema = Joi.object({
                        nome:Joi.string().required().min(3).max(100),
                        poder:Joi.string().required().min(3).max(20)
                    })
                    
                    const {value,error} = schema.validate({nome,poder})
                    if(error)
                        return console.log('Erro na validação',error)

                    

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
            handler: async (request)=>{
                try {

                    const {
                        id
                    } = request.params
                    const {payload} = request

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)
                    const result = await this.db.update(id,dados)
                    
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