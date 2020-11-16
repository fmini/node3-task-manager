// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    // db.collection("users").findOne(
    //   { _id: ObjectID("5fb2bfd699c59c1e0806b137") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch");
    //     }
    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 50 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 50 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    db.collection("tasks").findOne(
      { _id: ObjectID("5fb2a3d1d9df320274cfe8ee") },
      (error, task) => {
        if (error) {
          return console.log("Unable to find task.");
        }
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, incompleteTasks) => {
        console.log(incompleteTasks);
      });
  }
);
