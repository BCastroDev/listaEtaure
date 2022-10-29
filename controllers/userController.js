//Aqui nos encapsulamos tudo com {...} porque na hora de exportar vai tudo junto
const userController = {
    

    register:function (req,res){
        console.log('registrado')
        res.send('Usuário registrado')
    },

    login:function (req,res){
        console.log('logado')
        res.send('Usuário logado')
    },

    users:function async (req,res){
        try {
            const users =  pool.query('SELECT * FROM users');
            res.json({users : users.rows})
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

}





module.exports = userController