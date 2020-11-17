const api = require('./api') 

async function getPeoples(nome){
   const response = await api.get(`?search=${nome}&format=json`)
   return response.data

}



 module.exports = {
     getPeoples
 }