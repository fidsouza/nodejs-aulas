const BaseRoute = require('./base/baseRoute')
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

                    if(isNaN(skip)){
                        throw Error('tipo skip inválido')
                    }
                    if(isNaN(limit)){
                        throw Error('tipo limit inválido')
                    }

                    return this.db.read(query,parseInt(skip),parseInt(limit))

                } catch (error) {
                    console.log('Deu Ruim',error)
                    return 'Erro interno no servidor'
                }
            }
        }
    }
}

module.exports = HeroRoutes