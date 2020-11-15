/*
0 function get a number id 
1 function get a number telephone from id client
2 function get a adress from id client
*/

const util = require('util')

const getAdressClientAsync = util.promisify(getAdressClient)

function getClient() {
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            return resolve ({
                id: 1 ,
                name: 'Magayver',
                dataDeNascimento : new Date()
            })
        }, 1000);
    })  

}

function getTelefhoneNumber (idClient){
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            return resolve({
                ddd:11,
                telefone: '11-99222'
            })
        }, 2000);
    })
}

function getAdressClient (idClient,callback){

     setTimeout(() => {
         return callback(null,{
             rua:'caminho estrelar',
             numero: 666
         })
     }, 3000);

}

main()
async function main() {
    try {
        const usuario = await getClient()
        const resultado = await Promise.all([
            
            getTelefhoneNumber(usuario.id),
            getAdressClientAsync(usuario.id)

        ])

        const telephone = resultado[0]
        const adress = resultado[1]

        console.log(`
            Nome:${usuario.name}
            Telefone:(${telephone.ddd}) ${telephone.telefone},
            Endereco:${adress.rua}
        `)

    } catch (error) {
        console.error('Erro', error)
    }
}

/* const userPromise = getClient()
userPromise
    .then((usuario) => {
        return getTelefhoneNumber(usuario.id)
            .then(function fecthTelefhone(result){
                return {
                    usuario:{
                        name:usuario.name,
                        id:usuario.id

                    },
                    telefone:result
                }
            })
    })
    .then((resultado) =>{
        const Adress = getAdressClientAsync(resultado.usuario.id)
        return Adress.then((result)=>{
            return {
                usuario:{
                    nome:resultado.usuario.name,
                    id:resultado.usuario.id,
                    telefone:result
                }
            }
        })
    })
    .then((resultado)=>{
        console.log('resultado:', resultado)
    })
    .catch((error)=>{
        console.error(`Deu errado : ${error}`)
    }) */