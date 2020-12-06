const ICrud = require('./interface/ICrud')
const Mongoose = require('mongoose')
const STATUS = {
    0:'Disconectado',
    1:'Conectando',
    2:'Conectado',
    3:'Disconectado'
}


class MongoDB extends ICrud{
    constructor(){
        super()
        this._herois=null
        this._driver=null

    }

    async isConnected(){

        const state = STATUS[this._driver.readyState]
        if(state === 'Conectado') return state;
        if(state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve,1000))

        return STATUS[this._driver.readyState]

    }

    _defineModel(){
        const heroiSchema= new Mongoose.Schema({
            nome:{
                type:String,
                required:true
            },
            poder:{
                type:String,
                required:true
            },
            insertedAt:{
                type:Date,
                default:new Date()
            }
        
        })
         this._herois = Mongoose.model('herois',heroiSchema)

    }

    connect(){

        Mongoose.connect('mongodb://fidsouza:minhasenhanode@localhost:27017/herois',
        {useNewUrlParser:true,useUnifiedTopology: true},(error) =>{
            if(!error) return;
            console.error('Falha na conexao',error)
        })
        this._driver = Mongoose.connection
        this._driver.once('open',() =>console.log('database rodando'))

        this._defineModel()

    }

  async  create(item){
        return await this._herois.create(item)
    }

}

module.exports = MongoDB