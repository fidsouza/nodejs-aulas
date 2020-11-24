const ICrud = require('./interface/ICrud')
const Sequelize = require('sequilize')

class Postgres extends ICrud{
    constructor(){
        super()
        this._driver = null
        this._herois = null
        this._connect()
    }
    async isConnected(){
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error('Erro inesperado:',error)
        }
    }
    defineModel(){
         this._herois = _driver.define('herois',{
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
        await Herois.sync()
    }
    _connect(){
        this._driver = new Sequelize(
            'herois',  //database
            'fidsouza',//user
            'minhasenhanova', //password
            {
                host:'localhost',
                dialect:'postgres',
                quoteIdentifiers:false,
                operatorAliases:false
            }        
        )

    }
    create(item){
        console.log('cadastrado no postgres')
    }
}

module.exports = Postgres