docker container run \
    --name postgres \
    -e POSTGRES_USER=fidsouza \
    -e POSTGRES_PASSWORD=minhasenhanova \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps
docker exec -it postgres /bin/bash

docker container run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer
    
## ------ MONGODB

docker container run \ 
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4.4

docker container run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin\
    --eval "db.getSiblingDB('herois').createUser({user: 'fidsouza', pwd: 'minhasenhanode', roles: [{role: 'readWrite', db:'herois'}]})"


