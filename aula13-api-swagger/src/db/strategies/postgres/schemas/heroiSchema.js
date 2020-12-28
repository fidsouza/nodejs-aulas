const Sequelize = require('sequelize')

const HeroiSchema = {
    nome:'herois',
    schema:{
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
    }
}

module.exports = HeroiSchema