const express = require("express");
const Router = express.Router();
const {Verificar, Cuenta} = require("./cuentas");
const nodemailer = require('nodemailer');

Router.get("/", function(req,res){
    res.sendFile(__dirname + "/views/verificar.html");
});

Router.post("/", function(req, res) {
    Cuenta.findOne({ usuario: req.body.usuario })
    .then(result => {
      if (result) {
        const aleatorio = Math.floor(Math.random() * 900000) + 100000;
        const verificacion = aleatorio;

        const mailOptions = {
          from: 'weissbuttler98@gmail.com', // Reemplaza con tu dirección de correo electrónico
          to: result.correo, // Reemplaza con la dirección de correo electrónico del destinatario
          subject: 'Prueba de Node',
          text: "Tu código de verificación: " + verificacion,
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Correo electrónico enviado: ' + info.response);
          }
        });
        // El correo existe en la colección
        let verificar = new Verificar({
            usuario: req.body.usuario,
            codigo: verificacion
        });
        verificar.save();
        res.redirect("/modificar");
      } else {
        // El correo no existe en la colección
        res.redirect("/error");
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error en la búsqueda de la colección "cuentas"' });
    });
  });
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'weissbuttler98@gmail.com', // Reemplaza con tu dirección de correo electrónico
      pass: 'skmhcvqpirwyajwb', // Reemplaza con tu contraseña de correo electrónico
    },
  });

module.exports = Router;