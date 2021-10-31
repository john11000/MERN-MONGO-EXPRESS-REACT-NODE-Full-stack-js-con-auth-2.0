const router =  require('express').Router();
const productos =  require('../db/Schemas/productos');





/* GET users listing. */


router.get('/',(req,res,next)=>{
    productos.find({})
    .then((data)=>{
        res.json({respuesta : data});
           
        }
    )
    .catch((err)=>{
      console.log(err);
      return res.json({respuesta :"error "})
    })
})





  /* POST users listing. */
  
  router.post('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body)
    const {descripcion, valorUnitario, nombre, estado} = req.body;
   
    if((descripcion, valorUnitario, nombre)){
        const newproduct = productos({descripcion, valorUnitario, nombre, estado})
        newproduct.save().then(r=> {return res.json({respuesta : "prodducto ha sido agregado.", estado :0})})
    }else{
      return res.json({respuesta :  "Los datos no fueron enviados correctamente!" , estado :0})
    }
  });
  
  /* PUT users listing. */
  router.put('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    const {id, estado, valorUnitario, descripcion} =  req.body.data;
    console.log(req.body.data)
    if(id){
      if(estado){
        console.log(estado == "true")
        productos.updateOne({_id:id},{$set:{estado : estado == "true" ? true : false}},{multi:true,new:true})
        .then(d=> {
         return res.json({respuesta : d})
        })
        .catch(e=>{
         return res.json({respuesta : "error"})
        })
      }
      if(valorUnitario){
        productos.updateOne({_id:id},{$set:{valorUnitario}},{multi:true,new:true})
        .then(d=> {
         return res.json({respuesta : d})
        })
        .catch(e=>{
         return res.json({respuesta : "error"})
        })
      }

      if(descripcion){
        productos.updateOne({_id:id},{$set:{descripcion}},{multi:true,new:true})
        .then(d=> {
         return res.json({respuesta : d})
        })
        .catch(e=>{
         return res.json({respuesta : "error"})
        })
      }
    

    
    }else{
      res.json({respuesta : "error"})
    }
  
  });
  
  
  /* DELETE users listing. */
  router.delete('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    const {id} =  req.body;
  console.log("la id es : ", req)

    productos.remove({_id:id})
    .then(d=> {
     return res.json({respuesta : d})
    })
    .catch(e=>{
     return res.json({respuesta : "error"})
    })
  
  
  });
  
  /* export users routes. */
  module.exports = router;
  

module.exports = router;
