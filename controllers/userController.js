const userController = {

    register:function (req,res){
        console.log('registrado')
        res.send('Usuário registrado')
    },

    login:function (req,res){
        console.log('logado')
        res.send('Usuário logado')
    }

}





module.exports = userController