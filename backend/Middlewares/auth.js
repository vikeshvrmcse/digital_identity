const jwt = require('jsonwebtoken')
require('dotenv').config()

const ensureAuthentication=(req, res, next)=>{
    const auth=req.headers['authorization']
    if(!auth){
        return res.status(403).json({
            message:"Unauthorized, JWT token is required"
        })

    }

    try{
        const decode=jwt.verify(auth, process.env.JWT_SECRET)
        req.user=decode
        next()
    }catch(e){
        console.log(e)
        res.send(e)
    }
}

module.exports=ensureAuthentication