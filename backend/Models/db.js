const mongoose=require('mongoose')
require('dotenv').config()
const mongo_url=process.env.MONGODB_URI
mongoose.connect(mongo_url).then(()=>{
    console.log("Connection with mongodb compass")
}).catch((err)=>{
    console.log(`find error at : ${err}`)
})