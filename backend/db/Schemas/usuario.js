const database = require("../mongo");

const Usuario =  database.Schema({
    nombre : String,
    contraseña : String,
    tipoD: String,
    documento: String,
    email : String,
    role : String,
    estado : String,
    fotoUrl: String,
})

const usuario = database.model("usuario", Usuario);
module.exports = usuario;
