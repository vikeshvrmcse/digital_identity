const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
require('./Models/db')
require('dotenv').config()
const authRouter=require('./Routes/authrouters')
const productRouter=require('./Routes/products')
const quizRouter = require('./Routes/quizeroutes')
const blogRouter = require('./Routes/blogroutes')
app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))
const PORT=8000 || process.env.PORT


app.get('/ping',(req, res)=>{
    res.send("Pong...")
})

app.use('/auth',authRouter)
app.use('/products', productRouter)
app.use('/quizzes', quizRouter)
app.use("/blogs", blogRouter);


app.get('/api/data', (req, res) => {
    const data = {
      message: 'Hello from the backend!',
      timestamp: new Date().toISOString(),
    };
    res.json(data);
});

app.listen(PORT,()=>{
    console.log("Server hearing...")
})

