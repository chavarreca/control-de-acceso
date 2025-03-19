const express = require("express");
const Router = express.Router();
const {Verificar, Cuenta} = require("./cuentas");

const crypto = require('crypto');

Router.get("/", function(req,res){
    res.sendFile(__dirname + "/views/modificar.html");
});

Router.post("/", function(req, res) {
    const filtro = { codigo: req.body.codigo };
  
    Verificar.findOne(filtro)
      .then(verificacion => {
        if (verificacion) {
          const usuario = verificacion.usuario;
          const newPass = sha256Hash(req.body.newPass);
  
          Cuenta.findOneAndUpdate({ usuario: usuario }, { contraseña: newPass }, { new: true })
            .then(updatedCuenta => {
              if (updatedCuenta) {
                // Eliminar la entrada de verificación
                Verificar.findOneAndDelete(filtro)
                  .then(() => {
                    res.redirect("/success"); // Redireccionar solo después de eliminar la entrada de verificación
                  })
                  .catch(error => {
                    res.status(500).json({ error: 'Error al eliminar la entrada de verificación' });
                  });
              } else {
                res.status(404).json({ error: 'No se encontró el documento para actualizar' });
                
              }
            })
            .catch(error => {
              res.status(500).json({ error: 'Error al actualizar el documento en "cuentas"' });
            });
        } else {
          res.status(404).json({ error: 'No se encontró el documento en "verificacion" para el código proporcionado' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Error en la búsqueda de la colección "verificacion"' });
      });
  });
  

module.exports = Router;

function sha256Hash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}