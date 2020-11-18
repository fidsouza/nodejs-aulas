const {get} = require('axios')


const URLBASE = 'https://swapi.dev/api/people'

async function obterPessoas(nome){
    const url = `${URLBASE}/?search=${nome}&format=json`
    const result = await get(url)
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas(item){
    return {
        nome:item.name,
        peso:item.height
    }
}

module.exports = {
    obterPessoas
}