const validation=require('joi')
const signupValidatioin=(req, res, next)=>{
    const schema=validation.object({
        name: validation.string().min(3).max(100).required(),
        email: validation.string().email().required(),
        password: validation.string().min(3).max(12).required()
    })

    const {error}=schema.validate(req.body)

    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}
const loginValidatioin=(req, res, next)=>{
    const schema=validation.object({
        email: validation.string().email().required(),
        password: validation.string().min(3).max(12).required()
    })

    const {error}=schema.validate(req.body)

    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}

module.exports={signupValidatioin, loginValidatioin}