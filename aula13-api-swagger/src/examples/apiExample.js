const Hapi = require('hapi')

const Context  = require('../db/strategies/base/ContextStratagy')
const Postgres = require('../db/strategies/postgres/Postgres')
const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema')

let context = {}

const app  = new Hapi.Server({
    port:5000
})

async function main(){

    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection,HeroiSchema)
    context = new Context(new Postgres(connection,model))

    app.route({
        path:'/herois',
        method:'GET',
        handler:(req,res)=>{
            return context.read()
        }
    })
    await app.start()
    console.log('api ok')
}
main()