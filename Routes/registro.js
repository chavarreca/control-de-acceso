const crypto = require('crypto');
const express = require("express");
const Router = express.Router();

const {Verificar, Cuenta} = require("./cuentas");

Router.get("/", function(req,res){
    res.sendFile(__dirname + "/views/registro.html")
});


Router.post("/", function(req,res){
    let cuentaNueva = new Cuenta({
        usuario: req.body.usuario,
        correo: req.body.correo,
        contraseña: sha256Hash(req.body.contraseña)
    });
    cuentaNueva.save();
    console.log("Cuenta Guardada exitosamente!!!");
    res.redirect("/");
});

function sha256Hash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = Router;


