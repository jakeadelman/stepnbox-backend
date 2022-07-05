const {MongoClient} = require('mongodb');



async function main(){
    const uri = "mongodb+srv://manx:jakeadelman@cluster0.saxhjhz.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(uri);
    
    
    try {
        await client.connect();
        const boxes = client.db("boxes").collection("mb1")
        const boxesGem1Luck = boxes.find({gem1luck: 1})
        // console.log(JSON.parse(JSON.stringify(boxesGem1Luck)))
        // console.log(boxesGem1Luck)
        boxesGem1Luck.forEach(box => console.log(box))

        // client.db().collection('boxes').find().each(function(error, item) {
        //     // console .log your item or do something else with it
        //    });
    }catch(e){
        console.log(e)

    }
}
main()