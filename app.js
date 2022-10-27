require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter')
const bodyParser = require('body-parser') 

app.use(bodyParser.urlencoded());

app.use('/user', userRouter)
//Assim estaremos dizend que sempre que o caminho for /user iremos usar essa rota userRouter

app.use('/',userRouter)



app.listen(process.env.PORT, ()=>{console.log("Server running" )})