const dotenv = require('dotenv')

const express  = require('express');
const app = express();

const bodyParser = require('body-parser') 

const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

dotenv.config();



app.use(bodyParser.urlencoded());

app.use('/user', userRouter)
//Assim estaremos dizendo que sempre que o caminho for /user iremos usar essa rota userRouter

app.use('/',userRouter)
app.use('/auth', authRouter)



app.listen(process.env.PORT, ()=>{console.log("Server running" )})