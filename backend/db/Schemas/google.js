const database = require("../mongo");

const GoogleUsers =  database.Schema({
    usuario : String,
    email : String,
    id_google : String,
    role : String,
    estado : Boolean,
    foto : String
})
const google = database.model("GoogleUsers", GoogleUsers);

module.exports = google;
