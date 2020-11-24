const ICrud = require('./interface/ICrud')

class Postgres extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log('cadastrado no postgres')
    }
}

module.exports = Postgres