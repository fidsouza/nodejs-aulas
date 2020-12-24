docker run \
    --name postgres \
    -e POSTGRES_USER=fidsouza \
    -e POSTGRES_PASSWORD=minhasenhanova \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps
docker exec -it postgres /bin/bash

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## --- MONGODB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -d \
    mongo --auth

docker exec -it mongodb /bin/bash

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

##url para conectar no mongo
mongodb://fidsouza:minhasenhanode@mongodb:27017/herois

## para acessar o container
docker exec -it mongodb mongo admin

## criando o usuario no mongo
db.createUser({ user: "root", pwd: "root", roles: [{ role: "userAdminAnyDatabase", db: "admin" }]})

##criando um db
use herois

## criando usuario dentro do DB herois
db.createUser({ user: "userBanco", pwd: "userBanco", roles: [ "readWrite", "dbAdmin" ] })

