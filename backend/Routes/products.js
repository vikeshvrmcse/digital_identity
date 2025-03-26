const ensureAuthentication=require('../Middlewares/auth')
const router = require('express').Router()

try{
    router.get('/',ensureAuthentication, (req, res)=>{
        res.status(200).json([{
            name:"mobile",
            price:10000
        },
    
        {
            name:"tv",
            price:20000
        }
    ])
    })
}catch(e){
    res.send(e)
}

module.exports=router