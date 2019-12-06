const MongoClient = require("mongodb").MongoClient;
const { connection_string, database } = require("./config");

const addToWaitinglist = (data, done) => {
  const keys = {
    user_fullname: "string",
    user_phone: "string",
    hospital_id: "number"
  };
  for (let key in keys) {
    if (data && !data.hasOwnProperty(key)) {
      return done(new Error(`${key} required`));
    }
    if (typeof data[key] != keys[key]) {
      return done(new Error(`invalid ${key}`));
    }
  }

  MongoClient.connect(
    connection_string,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    (err, client) => {
      if (err) {
        return new Error("database error");
      }

      const db = client.db(database);
      
      db.collection("waitinglist")
        .insertOne(data)
        .then(res => {
          db.collection("waitinglist").findOne(
            { _id: res.insertedId },
            (err, result) => {
              if (err) {
                return new Error("database error");
              }
              done(null, result);
            }
          );
        })
        .catch(err => done(err));
    }
  );
};
module.exports = {
  addToWaitinglist
};
