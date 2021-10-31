const database = require("../mongo");

const Ventas =  database.Schema({

    estado : String,
    fecha : Date,
    cliente_documento : String,
    nombre_cliente : String,
    vendedor_id : String,
    productos : Array
})


const ventas = database.model("ventas", Ventas);

module.exports = ventas;
