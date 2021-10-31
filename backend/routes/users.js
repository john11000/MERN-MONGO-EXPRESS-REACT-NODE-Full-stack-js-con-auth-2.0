const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../db/Schemas/usuario");
const GoogleUsers = require("../db/Schemas/google");
const fs = require("fs");
const privateKey = fs.readFileSync("env/private.key");
const jwt = require("jsonwebtoken");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  const token = req.headers["access-token"];
  if (token) {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida", estado: 0 });
      } else {
        Usuario.find({ _id: decoded.id_u._id })
          .then((data) => {
            console.log(data);
            return res.json({
              respuesta: {
                _id: data[0]._id,
                nombre: data[0].nombre,
                documento: data[0].documento,
                email: data[0].email,
                roles: data[0].role,
                estado: data[0].estado,
                fotoUrl: data[0].fotoUrl,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            return res.json({ respuesta: "error " });
          });
      }
    });
  } else {
    res.json({
      mensaje: "Token no proveída.",
      estado: 0,
    });
  }
});

/* POST users listing. */

router.post("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const { nombre, contraseña, documento, tipoD, email, role } = req.body;
  Usuario.find({ email: email }).then((r) => {
    console.log(r.length);
    if (r.length !== 0) {
      return res.json({
        respuesta: `El correo electronico : ${email} ya esta en uso`,
        estado: 0,
      });
    } else {
      if ((nombre, contraseña, email, role, documento, tipoD)) {
        const newUser = Usuario({
          documento,
          nombre,
          contraseña: bcrypt.hashSync(contraseña, 10),
          email,
          role,
          estado: "pendiente",
        });
        newUser.save().then((r) => {
          return res.json({
            respuesta: "su estado ha pasado a verificación.",
            estado: 0,
          });
        });
      } else {
        return res.json({
          respuesta: "Los datos no fueron enviados correctamente!",
          estado: 0,
        });
      }
    }
  });
});

router.post("/google", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const { nombre, email, documento, role, fotoUrl } = req.body.data;
  Usuario.find({ email: email }).then((r) => {
    console.log(r.length);
    if (r.length !== 0) {

      if (
        documento == r[0].documento &&
        r[0].estado == "autorizado"
      ) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            id_u: r[0],
          },
          privateKey
        );
        return res.json({ respuesta: token });
      }else{
        return res.json({
          respuesta: "su estado esta en pendiente",
          estado: 0,
        });
      }
      
      return res.json({
        respuesta: "El usuario o la contraseña son erroneos",
        estado: 0,
      });
    } else {
      if ((nombre, email, documento, role, fotoUrl)) {
        res.header("Access-Control-Allow-Origin", "*");
        console.log("si entro");
        const newGoogleUser = Usuario({
          nombre,
          email,
          documento,
          role,
          estado: "pendiente",
          fotoUrl,
        });
        newGoogleUser.save().then((r) => {
          return res.json({
            respuesta: "su estado ha pasado a verificación.",
            estado: 0,
          });
        });
      } else {
        return res.json({
          respuesta: "Los datos no fueron enviados correctamente!",
          estado: 0,
        });
      }
    }
  });
});

/* PUT users listing. */
router.put("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  const { id, id_usuario, role, estado } = req.body.data;
  console.log(req.body)
  
  if(id_usuario ){

    if(role){
        Usuario.updateOne(
          { _id: id_usuario },
          { $set: { role} },
          { multi: true, new: true }
        )
          .then((d) => {
            return res.json({ respuesta: d });
          })
          .catch((e) => {
            return res.json({ respuesta: "error" });
          });
     
    }else{
      if(estado){
        Usuario.updateOne(
          { _id: id_usuario },
          { $set: { estado} },
          { multi: true, new: true }
        )
          .then((d) => {
            return res.json({ respuesta: d });
          })
          .catch((e) => {
            return res.json({ respuesta: "error" });
          });
     
    }else{
      res.json({ respuesta: "no tiene permisos para ejecutar esta acción" });

    }
    }
    
   
   
  }else{
    res.json({respuesta:"error al consumir la api"})
  }

});

/* DELETE users listing. */
router.delete("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.body;
  Usuario.remove({ _id: id })
    .then((d) => {
      return res.json({ respuesta: d });
    })
    .catch((e) => {
      return res.json({ respuesta: "error" });
    });
});

/* export users routes. */
module.exports = router;
