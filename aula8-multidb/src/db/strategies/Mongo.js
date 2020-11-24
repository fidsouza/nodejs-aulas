const ICrud = require('./interface/ICrud')

class MongoDB extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log('cadastrado no mongo')
    }
}

module.exports = MongoDB