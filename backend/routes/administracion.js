const router =  require('express').Router();
const usuario =  require('../db/Schemas/usuario');
const productos =  require('../db/Schemas/productos');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('env/private.key');

router.get('/obtener',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    let resultados = []
    usuario.find({})
    .then((data)=>{
        if(data.length!=0){
            data.map(n=>{
                console.log(n)
                resultados.push({_id:n._id, nombre : n.nombre, documento :  n.documento ,  role : n.role , estado : n.estado })
            })
            res.json({
                respuesta : resultados
            })
           
        }
    })
    .catch((err)=>{
      console.log(err);
      return res.json({respuesta :"error "})
    })
})




router.get('/obtener/productos',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    let resultados = []
    productos.find({})
    .then((data)=>{
        if(data.length!=0){
          
            res.json({
                respuesta : data
            })
           
        }
    })
    .catch((err)=>{
      console.log(err);
      return res.json({respuesta :"error "})
    })
})

module.exports = router;
