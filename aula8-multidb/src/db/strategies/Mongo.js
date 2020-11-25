const ICrud = require('./interface/ICrud')



class MongoDB extends ICrud{
    constructor(){
        super()

    }
    create(item){
        console.log('cadastrado no mongo')
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

module.exports = MongoDB