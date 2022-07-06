const {MongoClient} = require('mongodb');



async function main(){
    const uri = "mongodb+srv://manx:jakeadelman@cluster0.saxhjhz.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(uri);
    
    
    try {
        await client.connect();
        console.log("connected")
        const boxes = client.db("boxes").collection("mb1")
        let deleted = await boxes.deleteMany({})
        console.log(deleted)
    }catch(e){
        console.log(e)

    }
}
main()