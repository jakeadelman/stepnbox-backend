const { MongoClient } = require("mongodb");
let Db = "";
if (process.env.db == "production") {
  Db = process.env.ATLAS_URI;
} else if (process.env.db == "staging") {
  Db = process.env.STAGING_ATLAS_URI;
}
const client = new MongoClient(Db, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("boxes");
        console.log("Successfully connected to db boxes");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};

// async function main(){
//     const uri = "mongodb+srv://manx:jakeadelman@cluster0.saxhjhz.mongodb.net/?retryWrites=true&w=majority"
//     const client = new MongoClient(uri);

// try {
//     await client.connect();
//     const db = client.db("boxes")

//     const col = db.collection("mb1")

//     let mb1document = {
//         "gem1luck": 1,
//         "gst": 5
//     }

//     const p = await col.insertOne(mb1document);

//     const myDoc = await col.findOne();

//     console.log(myDoc)

// } catch (e) {
//     console.error(e);
// } finally {
//     await client.close();
// }

// }

// main().catch(console.error);
