docker ps 
docker exec -it b2f8b6c36670 mongo -u fidsouza -p minhasenhanode --authenticationDatabase herois

//db create

db.herois.insert({
    nome:'Aquaman',
    poder:'Agua'
})

//db read
db.herois.find()

//db update
db.herois.update({_id:ObjectId("5fc85118253d2de41ba86075")},{$set:{nome:"IromMan"}})

//delete
db.herois.remove({})

