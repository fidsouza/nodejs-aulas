const http = require('http')

http.createServer((req,res)=>{
    res.end('Hello Node without framework')
})
.listen('4000',()=> console.log('servidor ok'))