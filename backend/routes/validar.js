const router =  require('express').Router();
const usuario =  require('../db/Schemas/usuario');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('env/private.key');

router.post('/user',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const {email, contraseña} =  req.body;
    usuario.find({email})
    .then((data)=>{
        if(data.length!=0){
            if(bcrypt.compareSync(contraseña, data[0].contraseña) && data[0].estado == "autorizado"){
                const token =jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    id_u: data[0]._id

                  }, privateKey);
              return  res.json({respuesta : token});
            }
            if(bcrypt.compareSync(contraseña, data[0].contraseña)){
                return res.json({respuesta : "su estado esta en pendiente" , estado :0})

            }
        }
            return res.json({respuesta : "El usuario o la contraseña son erroneos" , estado :0})
    })
    .catch((err)=>{
      console.log(err);
      return res.json({respuesta :"error "})
    })
})


router.post('/user/google',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const {email,documento , fotoUrl} =  req.body;
    usuario.find({email})
    .then((data)=>{
        if(data.length!=0){
            if(documento == data[0].documento && data[0].estado.toLowerCase() == "autorizado"){
                const token =jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    id_u:  data[0]._id

                  }, privateKey);
              return  res.json({respuesta : token});
            }
          
        }
            return res.json({respuesta : "El usuario o la contraseña son erroneos" , estado :0})
    })
    .catch((err)=>{
      console.log(err);
      return res.json({respuesta :"error "})
    })
})



module.exports = router;
