const Sequelize = require('sequelize')
const driver    = new Sequelize(
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

async function main(){
    const Herois = driver.define('herois',{
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
}