const ICrud = require('../interface/ICrud')
const Sequelize = require('sequelize')


class Postgres extends ICrud{
    constructor(connection,schema){
        super()
        this._connection = connection
        this._schema = schema
    }
    async isConnected(){
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.error('Erro inesperado:',error)
        }
    }
   static async defineModel(connection,schema){
        const model = connection.define(
            schema.name,schema.schema
        )
        await model.sync()
        return model
    }
    async create(item){
        try {
            const {dataValues:{
                id,
                nome,
                poder
            }} = await this._schema.create(item)
            return {id,nome,poder}
        } catch (error) {
            console.error('Error Inesperado ao Cadastrar',error)
        }
    }
    async read(item ={},skip,limit){
        try {
            const result =  await this._schema.findAll({where:item,raw:true,skip:skip,limit:limit})
            return result
        } catch (error) {
            console.error('Erro ao realizar a consulta',error)
        }
    }
    async update(id,item){
        try {
            const result =  await this._schema.update(item,{where:{id:id},returning:true})
            return result[1][0].get()
        } catch (error) {
            console.error('Erro ao atualizar',error)
        }
    }
    async delete(id){
        try {
            const query = id ? {id}  : console.error('ID para deleção Inválido')
            return await this._schema.destroy({where:query})

        } catch (error) {
            console.error('Erro inesperado ao deletar',error)
        }
    }
   static async connect(){
      const connection =   this._connection    = new Sequelize(
             'heroes',  //database
             'fidsouza',//user
             'minhasenhanova', //password
             {
                 host:'localhost',
                 dialect:'postgres',
                 quoteIdentifiers:false,
                 operatorAliases:false,
                 logging:false                
             }
         
         )
      console.log('database ok')
      return connection
     }


}


module.exports = Postgres