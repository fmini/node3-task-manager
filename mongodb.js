const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    const db = client.db(databaseName); //tells mongodb the name of the db to connect to

    db.collection("users").insertOne({
      //creates and name a collection for the db (users)
      name: "Frank", //data for the object document in the collection
      age: 50,
    });
  }
);
