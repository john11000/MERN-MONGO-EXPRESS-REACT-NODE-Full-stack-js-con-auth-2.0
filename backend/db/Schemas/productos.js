const database = require("../mongo");

const Productos =  database.Schema({
    nombre : String,
    descripcion : String,
    valorUnitario : Number,
    estado :  String
})

const productos = database.model("productos", Productos);
module.exports = productos;
