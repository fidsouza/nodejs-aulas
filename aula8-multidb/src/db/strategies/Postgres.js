const ICrud = require('./interface/ICrud')
const Sequelize = require('sequelize')


class Postgres extends ICrud{
    constructor(){
        super()
        this._driver = null
        this._herois = null
    }
    async isConnected(){
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error('Erro inesperado:',error)
        }
    }
   async defineModel(){
         this._herois = this._driver.define('heroes',{
            id:{
                type:Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome:{
                type:Sequelize.STRING,
                required:true
    
            },
            poder:{
                type:Sequelize.STRING,
                required:true
            }
    
        })
        await this._herois.sync()
    }
    async create(item){
        try {
            const {dataValues:{
                nome,
                poder
            }} = await this._herois.create(item)
            return {nome,poder}
        } catch (error) {
            console.error('Error Inesperado ao Cadastrar',error)
        }
    }
    async connect(){
        this._driver    = new Sequelize(
             'heroes',  //database
             'fidsouza',//user
             'minhasenhanova', //password
             {
                 host:'localhost',
                 dialect:'postgres',
                 quoteIdentifiers:false,
                 operatorAliases:false
             }
         
         )
         await this.defineModel()
     }


}


module.exports = Postgres