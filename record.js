const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("./conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const getProbabilities = require("./scripts/probabilities.js");
console.log(typeof getProbabilities);

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("boxes");
  db_connect
    .collection("mb1")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/find/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  console.log("starting");
  //  let myquery = { _id: ObjectId( req.body.lvl )};
  let boxLvl = "mb" + req.params.id.toString();
  console.log(boxLvl);
  db_connect
    .collection(boxLvl)
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      if (boxLvl == "mb1" || boxLvl == "mb2" || boxLvl == "mb3") {
        getProbabilities.getPr1(result).then((data) => {
          res.send(data);
        });
      }
      if (boxLvl == "mb4" || boxLvl == "mb5") {
        getProbabilities.getPr2(result).then((data) => {
          res.send(data);
        });
      }
      if (
        boxLvl == "mb6" ||
        boxLvl == "mb7" ||
        boxLvl == "mb8" ||
        boxLvl == "mb9" ||
        boxLvl == "mb10"
      ) {
        getProbabilities.getPr3(result).then((data) => {
          res.send(data);
        });
      }
    });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  // console.log(typeof req.body.gem1luck);
  // console.log(req.body);
  //  let gem1luck = req.body.gem1luck.toString()

  let myobj = {};
  if (req.body.mblvl == 1 || req.body.mblvl == 2) {
    myobj = {
      gem1luck: parseInt(req.body.gem1luck),
      gst: parseInt(req.body.gst),
      gem1efficiency: parseInt(req.body.gem1efficiency),
      gem1resillience: parseInt(req.body.gem1resillience),
      gem1comfort: parseInt(req.body.gem1comfort),
      commonScroll: parseInt(req.body.commonScroll),
      uncommonScroll: parseInt(req.body.uncommonScroll),
    };
  }
  if (req.body.mblvl == 3 || req.body.mblvl == 4 || req.body.mblvl == 5) {
    myobj = {
      gem1luck: parseInt(req.body.gem1luck),
      gst: parseInt(req.body.gst),
      gem1efficiency: parseInt(req.body.gem1efficiency),
      gem1resillience: parseInt(req.body.gem1resillience),
      gem1comfort: parseInt(req.body.gem1comfort),
      commonScroll: parseInt(req.body.commonScroll),
      uncommonScroll: parseInt(req.body.uncommonScroll),
      gem2efficiency: parseInt(req.body.gem2efficiency),
      gem2luck: parseInt(req.body.gem2luck),
      gem2resillience: parseInt(req.body.gem2resillience),
      gem2comfort: parseInt(req.body.gem2comfort),
      // gem3efficiency: parseInt(req.body.gem3efficiency),
      // gem3luck: parseInt(req.body.gem3luck),
      // gem3resillience: parseInt(req.body.gem3resillience),
      // gem3comfort: parseInt(req.body.gem3comfort),
      rareScroll: parseInt(req.body.rareScroll),
    };
  }

  if (
    req.body.mblvl == 6 ||
    req.body.mblvl == 7 ||
    req.body.mblvl == 8 ||
    req.body.mblvl == 9 ||
    req.body.mblvl == 10
  ) {
    console.log("in my obj");
    myobj = {
      gem1luck: parseInt(req.body.gem1luck),
      gst: parseInt(req.body.gst),
      gem1efficiency: parseInt(req.body.gem1efficiency),
      gem1resillience: parseInt(req.body.gem1resillience),
      gem1comfort: parseInt(req.body.gem1comfort),
      commonScroll: parseInt(req.body.commonScroll),
      uncommonScroll: parseInt(req.body.uncommonScroll),
      gem2efficiency: parseInt(req.body.gem2efficiency),
      gem2luck: parseInt(req.body.gem2luck),
      gem2resillience: parseInt(req.body.gem2resillience),
      gem2comfort: parseInt(req.body.gem2comfort),
      gem3efficiency: parseInt(req.body.gem3efficiency),
      gem3luck: parseInt(req.body.gem3luck),
      gem3resillience: parseInt(req.body.gem3resillience),
      gem3comfort: parseInt(req.body.gem3comfort),
      rareScroll: parseInt(req.body.rareScroll),
      epicScroll: parseInt(req.body.epicScroll),
    };
  }
  console.log("//");
  let mb = "mb" + req.body.mblvl.toString();
  console.log("creating mb");
  console.log(myobj);
  console.log(db_connect);
  db_connect.collection(mb).insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
    console.log(res);
  });
});

// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId( req.params.id )};
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      position: req.body.position,
//      level: req.body.level,
//    },
//   }
// });

// // This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId( req.params.id )};
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });

module.exports = recordRoutes;
