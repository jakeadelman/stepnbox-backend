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
