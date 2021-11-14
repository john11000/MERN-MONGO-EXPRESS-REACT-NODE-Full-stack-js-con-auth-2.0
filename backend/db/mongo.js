const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://<su usuario>:<su contraseña>@cluster0.hykao.mongodb.net/test?retryWrites=true&w=majority");
}
module.exports = mongoose;
