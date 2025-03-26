const { signupValidatioin, loginValidatioin } = require('../Middlewares/authvalidation')
const {login, signup}=require('../Controllers/authcontrollers')


const authRouter=require('express').Router()

authRouter.post('/login',loginValidatioin,login)
authRouter.post('/signup', signupValidatioin, signup)


module.exports=authRouter