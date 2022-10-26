const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const pool = require('../db/db.js')

router.post('/register',userController.register)
router.post('/login', userController.login)

router.get('/', async (req,res)=>{
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json({users : users.rows})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router;