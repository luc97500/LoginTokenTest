const mongoose = require('mongoose');

const mongo_Url = process.env.MONGO_CONN

mongoose.connect(mongo_Url).then(()=>{
    console.log("MongoDb Practice Connected")
}).catch((err)=>{
    console.log(err)
})