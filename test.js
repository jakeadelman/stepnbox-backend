const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://manx:jakeadelman@cluster0.saxhjhz.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("connected");
    const boxes = client.db("boxes");
    await boxes.collection("mb1").deleteMany({});
    await boxes.collection("mb2").deleteMany({});
    await boxes.collection("mb3").deleteMany({});
    await boxes.collection("mb4").deleteMany({});
    await boxes.collection("mb5").deleteMany({});
    await boxes.collection("mb6").deleteMany({});
    await boxes.collection("mb7").deleteMany({});
    await boxes.collection("mb8").deleteMany({});
    await boxes.collection("mb9").deleteMany({});
    await boxes.collection("mb10").deleteMany({});
  } catch (e) {
    console.log(e);
  }
}
main();
