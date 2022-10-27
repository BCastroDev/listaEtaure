const express = require('express')
const pool = require('../db/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {jwtTokens} = require('./utils/jwt-helpers')

const router = express.Router()

router.post('/login', async (req,res)=>{
    try {
    const {email, pasword} = req.body;
    const users = await pool.query('SELECT * FROM users WHERE user_email =  $1',[email]);
    
    //verificação do email
    if (users.rows.length === 0) return res.status(401).json({error: "Email incorreto"})

    //verificação da senha
    const validPassword = await bcrypt.compare(password,users.rows[0].user_password)
    if(!validPassword) return  res.status(401).json({error: "Password incorreto"})
    return res.status(200).json("Tudo certo")


    } catch {
        res.status(401).json("Deu errado")
    }
})

module.exports = router