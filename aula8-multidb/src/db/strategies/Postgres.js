const ICrud = require('./interface/ICrud')
<<<<<<< HEAD
const Sequelize = require('sequilize')
=======
const Sequelize = require('sequelize')

>>>>>>> c05248336604237f55df6b54dd44ef956fbf0838

class Postgres extends ICrud{
    constructor(){
        super()
        this._driver = null
        this._herois = null
        this._connect()
<<<<<<< HEAD
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

=======
>>>>>>> c05248336604237f55df6b54dd44ef956fbf0838
    }
    create(item){
        console.log('cadastrado no postgres')
    }

    async isConnected(){
        try {
            await this._driver.authenticate()
            return true
            
        } catch (error) {
            console.error('Erro Inesperado:',error)
        }
    }

    _connect(){
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
     }
 
     _defineModel(){
         this._herois = driver.define('herois',{
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
         },{
             tableName: 'TB_HEROIS',
             freezeTableName: false,
             timestamps: false
         })
     }


}


module.exports = Postgres