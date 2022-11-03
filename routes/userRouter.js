const express = require('express');
const router = express.Router();
const pool = require('../db/db.js')  //conexão com o DB
const bcrypt = require('bcrypt')
const loggedUser = require("./authRouter")
// const userController = require("../controllers/userController")

//EJS
router.get('/', async (req,res)=>{

    console.log(loggedUser)


    try {
        const users = await pool.query('SELECT * FROM users');
        res.render("index",{users : users.rows})


    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


router.get('/users', async (req,res)=>{
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json({users : users.rows})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/register', async (req,res)=>{
    console.log(req.body)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = await pool.query(
        'INSERT INTO users (user_name, user_email, user_cpf, user_password) VALUES ($1, $2, $3, $4) RETURNING * ',
        [req.body.name, req.body.email, req.body.cpf, hashedPassword ]);
        res.json({users:newUser.rows[0]})
    }
     catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router;