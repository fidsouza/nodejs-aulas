const EventEmitter = require("events")

class Emissor extends EventEmitter{

}

Emissor = new Emissor()
const nomeEvento = 'usuario:click'

Emissor.on(nomeEvento,(click)=>{
    console.log('usuário clicou',click)
}) 

const stdin = process.openStdin()
stdin.addListener('data',(value)=>{
    console.log(`você digitou: ${value.toString()}`)
})