const database = require("../mongo");

const Rol =  database.Schema({
    usuario : String,
    contrasena : String,
    email : String,
    role : String,
    estado : Boolean
})

module.exports = Rol;
