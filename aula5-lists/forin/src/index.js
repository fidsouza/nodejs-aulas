const service = require('./service/getpeoples')

main()

async function main(){
    try {
        const result = await service.getPeoples('a')
        const names = []
        console.time('for')
        for (let index = 0; index < result.results.length -1; index++) {
            const people  = result.results[index]
            names.push(people.name)
        }
        console.timeEnd('for')

        console.time('forin')
        for (const i in result.results) {
            const people = result.results[i]
            names.push(people.name)
        }
        console.timeEnd('forin')

        console.time('forof')
        for (const people of result.results) {
            names.push(people.name)
        }
        console.timeEnd('forof')


        console.log('resultado:', names)
    } catch (error) {
        console.error('ops... alguma coisa inesperada ocorreu',error)
    }
}