const Hapi = require('@hapi/hapi')
const HeroRoutes = require('./routes/heroesRoutes')

const Context  = require('./db/strategies/base/ContextStratagy')
const Postgres = require('./db/strategies/postgres/Postgres')
const HeroiSchema = require('./db/strategies/postgres/schemas/heroiSchema')

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

let context = {}

const app  = new Hapi.Server({
    port:5000
})

function mapRoutes(instance,methods){
    return methods.map(method => instance[method]())
}

async function main(){

    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection,HeroiSchema)
    context = new Context(new Postgres(connection,model))
    const swaggeroptions = {
        info:{
            title:'Api Herois',
            version:'v1.0',

        }}
    await app.register([Vision
                        ,Inert
                        ,{
                            plugin:HapiSwagger,
                            options:swaggeroptions  
                        }])

    app.route(
        mapRoutes(new HeroRoutes(context),HeroRoutes.methods())
    )
    await app.start()
    console.log('api ok e voando 🚀 na porta 5000')
    return app
}

module.exports = main()