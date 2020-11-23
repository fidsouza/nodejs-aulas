const Commander = require('commander')
const Database  = require('./service/database')
const Heroi = require('./models/heroi')

async function main(){
    Commander
    .version('v1')
    .option('-n,--nome [value]',"Nome do Heroi")
    .option('-p,--poder [value]',"Poder do Heroi")
    .option('-c,--cadastrar',"Cadastrar um heroi")
    .option('-i,--id [value]',"ID do herói")
    .option('-l,--listar',"Listar Herói")
    .option('-r,--remover',"Remover Herói")
    .option('-u,--atualizar',"Atualizar um Herói")

    .parse(process.argv)

    const heroi = new Heroi(Commander)
    try {
        if(Commander.cadastrar){
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Erro ao cadastrar',error)
                return
            }
            console.log('Sucesso:Heroi Cadastrado',heroi)
        }
        if(Commander.listar){
            const resultado = await Database.listar()
            console.log('Herois:',resultado)
            return
        }
        if(Commander.remover){
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.error('Erro ao Remover Herói',error)
            }
            console.log('Herói removido com sucesso')
        }
        if(Commander.atualizar){
            const DadosHeroi = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(DadosHeroi)
            heroiAtualizar.id = parseInt(heroi.id)
            const resultado = await Database.atualizar(parseInt(heroi.id),heroiAtualizar)
            if(!resultado){
                console.error('Erro ao atualizar',error)
                return
            }
            console.log(`Herói com o id ${heroi.id} atualizado`)
        }

        
    } catch (error) {
        console.error('Deu erro:',error)
    }
}
main()