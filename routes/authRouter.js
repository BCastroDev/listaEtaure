//Este arquivo é dedicado apenas para o login

const express = require('express')
const pool = require('../db/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtTokens } = require('./utils/jwt-helpers.js')

const router = express.Router()

const loggedUser = ""



router.post('/login', async (req,res)=>{
    try {
    const {email, password} = req.body;
    const users = await pool.query('SELECT * FROM users WHERE user_email =  $1',[email]);
    
    //verificação do email
    if (users.rows.length === 0) return res.status(401).json({error: "Email incorreto"})

    //verificação da senha
    const validPassword = await bcrypt.compare(password,users.rows[0].user_password)
    if(!validPassword) return  res.status(401).json({error: "Password incorreto"});
    

    //tentando estabelecer um usuario logado
    else {const loggedUser = await users.rows[0].user_id}
    


    //jwt
    let tokens = jwtTokens(users.rows[0]);

    res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
    res.json(tokens)
    



    } catch (error) {
        res.status(401).json({error: error.message})
    }
})

module.exports = router, loggedUser
