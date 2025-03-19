const express = require("express");
const Router = express.Router();
const {Cuenta} = require("./cuentas");

const crypto = require('crypto');

Router.get("/", function(req,res){
    res.sendFile(__dirname + "/views/login.html");
});

Router.post("/", function(req, res) {
    const { usuario, contraseña } = req.body;
  
    Cuenta.findOne({ usuario: usuario })
      .then(cuenta => {
        if (cuenta) {
          const storedHash = cuenta.contraseña;
          const isMatch = verifyHash(contraseña, storedHash);
          if (isMatch) {
            // Contraseña coincidente, realizar acciones de inicio de sesión
            res.redirect("/chisme");
          } else {
            // Contraseña incorrecta
            res.status(401).send('Credenciales inválidas');
          }
        } else {
          // No se encontró la cuenta
          res.status(404).send('Cuenta no encontrada');
        }
      })
      .catch(error => {
        // Error en la búsqueda de la cuenta
        console.log(error);
        res.status(500).send('Error en la búsqueda de la cuenta');
      });
  });
  
function verifyHash(input, storedHash) {
    const inputHash = sha256Hash(input);
    return inputHash === storedHash;
  }

  function sha256Hash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = Router;