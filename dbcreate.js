var mongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/blogdb"

mongoClient.connect(url , function( err , db){

    if(err)
    {
        throw(err)
    }
    console.log("Database Created")
    db.close()
})