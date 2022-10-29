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
// app.use('/users', userRouter)  //esta duplicando users/users/
app.use('/auth', authRouter)


//Para importarmos o CSS pro EJS
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// const userController = require('./controllers/userController');

//EJS
app.get('/', (req,res)=>{
    // const teste2 = ["aaaa", "bbb", "ccc"]
    const teste = ()=>{

    }
    console.log(teste)
    res.render("index", {teste})
})



app.listen(process.env.PORT, ()=>{console.log("Servidor rodando. http://localhost:" + process.env.PORT )})


