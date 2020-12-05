//npm install mongoose 
const Mongoose = require('mongoose')

Mongoose.connect('mongodb://fidsouza:minhasenhanode@localhost:27017/herois',
    {useNewUrlParser:true,useUnifiedTopology: true},(error) =>{
        if(!error) return;
        console.error('Falha na conexao',error)
    })

const connection = Mongoose.connection

connection.once('open',() =>console.log('database rodando'))
const state = connection.readyState
console.log('state',state)

const heroiSchema = new Mongoose.Schema({
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

const model = Mongoose.model('herois',heroiSchema)

async function main(){
    const resultCadastrar = await model.create({
        nome:'Batman',
        poder:'Inteligência'
    })
    console.log('Resultado Cadastrar',resultCadastrar)

    const listItems = await model.find()

    console.log('Retornando Todos',listItems)
}
main()