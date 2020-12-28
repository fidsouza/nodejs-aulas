const ICrud = require('../interface/ICrud')
const Mongoose = require('mongoose')
const STATUS = {
    0:'Disconectado',
    1:'Conectado',
    2:'Conectando',
    3:'Disconectado'
}


class MongoDB extends ICrud{
    constructor(connection,schema){
        super()
        this._schema=schema
        this._connection=connection

    }

    async isConnected(){

        const state = STATUS[this._connection.readyState]
        if(state === 'Conectado') return state;

        await new Promise(resolve => setTimeout(resolve,1000))
        return STATUS[this._connection.readyState]

    }

    static connect(){

        Mongoose.connect('mongodb://fidsouza:minhasenhanode@localhost:27017/herois',
        {useNewUrlParser:true,useUnifiedTopology: true},(error) =>{
            if(!error) return;
            console.error('Falha na conexao',error)
        })
        const connection  = Mongoose.connection
        connection.once('open',()=>console.log('database ok'))
        return connection

    }

  async  create(item){
        return await this._schema.create(item)
    }

 async read(item,skip=0,limit=10){

       return await this._schema.find(item).skip(skip).limit(limit)
    }
  update(id,item){
      return this._schema.updateOne({_id:id},{$set:item}) 
 }
 delete(id){
     return this._schema.deleteOne({_id:id})
 }


}

module.exports = MongoDB