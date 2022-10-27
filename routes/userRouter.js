const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const pool = require('../db/db.js')
const bcrypt = require('bcrypt')


router.post('/register',userController.register)
router.post('/login', userController.login)

router.get('/users', async (req,res)=>{
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json({users : users.rows})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.post('/add', async (req,res)=>{
    console.log(req.body)
    try {
        const hashedPassword = bcrypt.hash(req.body.password,10);
        const newUser = await pool.query(
        'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING * ',
        [req.body.name,req.body.email,hashedPassword]);
        res.json({users:newUser.row[0]})  //esta dando erro aqui
    }
     catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router;