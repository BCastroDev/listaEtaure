const dotenv = require('dotenv')

const express  = require('express');
const app = express();

const bodyParser = require('body-parser') 

const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

app.set("view engine","ejs")

dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));

app.use('/', (req,res)=>{
    res.render("index")
})
app.use('/user', userRouter)
app.use('/auth', authRouter)



app.listen(process.env.PORT, ()=>{console.log("Servidor rodando. http://localhost:" + process.env.PORT )})