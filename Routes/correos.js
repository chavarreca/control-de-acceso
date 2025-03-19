const nodemailer = require('nodemailer');

// Configuración del transporte
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'weissbuttler98@gmail.com', // Reemplaza con tu dirección de correo electrónico
    pass: 'skmhcvqpirwyajwb', // Reemplaza con tu contraseña de correo electrónico
  },
});

// Opciones del correo electrónico
const mailOptions = {
  from: 'weissbuttler98@gmail.com', // Reemplaza con tu dirección de correo electrónico
  to: 'salvador.arreca21@gmail.com', // Reemplaza con la dirección de correo electrónico del destinatario
  subject: 'Prueba de Node',
  text: 'Este correo solo es para probar el modulo Node Mailer, borralo al recibr',
};

// Envía el correo electrónico
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Error al enviar el correo:', error);
  } else {
    console.log('Correo enviado correctamente:', info.response);
  }
});
