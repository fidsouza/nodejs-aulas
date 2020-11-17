const {getPeoples} = require('./service/getpeoples')

Array.prototype.meuReduce =  function(callback,valorinicial){
    let valorFinal = typeof valorinicial !== undefined ? valorinicial : this[0]
    for(let index = 0 ; index <= this.length -1; index++){
        valorFinal = callback(valorFinal,this[index],this)
    }
    return valorFinal
}

async function main(){
    try {
        const {results} = await getPeoples('a')
        const pesos = results.map((item)=>{
             return parseInt(item.height)
        })
        console.log('pesos',pesos)
 /*        const total = pesos.reduce((anterior,proximo) => {
            return anterior + proximo
        }) */
        const minhaLista = [
            ['Marcao','Marcela'],
            ['Nodebr','Malacabado']
        ]
        const total = minhaLista.meuReduce((anterior,proximo) => {
            return anterior.concat(proximo)
        },[])
        .join(', ')
        console.log('total:',total)
    } catch (error) {
        console.error('deu erro', error)
    }
}
main()