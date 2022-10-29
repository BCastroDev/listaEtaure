const dotenv = require('dotenv')

const express  = require('express');
const app = express();

const bodyParser = require('body-parser') 

//importação dos arquivos
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

//definição motor/do tipo de renderização - EJS
app.set("view engine","ejs")

//inserção das configurações contidas no .ENV para usarmos aqui
dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));

//definição das rotas
app.use('/',userRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)


//Para importarmos o CSS pro EJS
const path = require("path")
app.use(express.static(path.join(__dirname, "public")));

//EJS
app.get('/', (req,res)=>{
    res.render("index")
})



app.listen(process.env.PORT, ()=>{console.log("Servidor rodando. http://localhost:" + process.env.PORT )})


