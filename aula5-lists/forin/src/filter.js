const {getPeoples} = require('./service/getpeoples')

async function main() {
    try {
        const {results} = await getPeoples('a')
        const familiaLars = results.filter((item)=>{
            const result = item.name.toLowerCase().indexOf(`lars`) !== -1
            return result
        })
        const names = familiaLars.map((pessoa)=>pessoa.name)
        console.log(names)
    } catch (error) {
        console.error('deu errado',error)
    }
}
main()