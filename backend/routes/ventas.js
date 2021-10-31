const router =  require('express').Router();
const ventas =  require('../db/Schemas/ventas');





/* GET users listing. */


router.get('/',(req,res,next)=>{
  
    ventas.find({})
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
    const { estado, fecha, cliente_documento, nombre_cliente, vendedor_id, productos} = req.body;
   
    if((estado, fecha, cliente_documento, nombre_cliente, vendedor_id, productos)){
        const newventa = ventas({estado, fecha, cliente_documento, nombre_cliente, vendedor_id, productos})
        newventa.save().then(r=> {return res.json({respuesta : "una venta ha sido agregado.", estado :0})})
    }else{
      return res.json({respuesta :  "Los datos no fueron enviados correctamente!" , estado :0})
    }
  });
  
  /* PUT users listing. */
  router.put('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    const {id, estado} =  req.body.data;
    if((id, estado)){
      ventas.updateOne({_id:id},{$set:{estado}},{multi:true,new:true})
      .then(d=> {
       return res.json({respuesta : d})
      })
      .catch(e=>{
       return res.json({respuesta : "error"})
      })
    }else{
      return res.json({respuesta : "nel"})
      
    }
 
  });
  
  
  /* DELETE users listing. */
  router.delete('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

  
    const {id} =  req.body;
    ventas.remove({_id:id})
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
