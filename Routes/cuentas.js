const { Schema, model } = require('mongoose');

const cuentaSchema = new Schema({
    usuario: {
        type:String,
        required: true,
        minlength: 8,
        maxlength: 30,
        unique:true
    },
    correo: {
        type:String,
        required: true,
        unique:true
    },
    contraseña: {
        type:String,
        required: true,
    }
});

const verificarSchema = new Schema({
    usuario: {
        type:String,
        required: true,
        unique:true
    },
    codigo: {
        type: String
    }
});

const Cuenta = model('Cuenta', cuentaSchema, 'cuentas');
const Verificar = model('Verificar', verificarSchema, 'verificacion');

module.exports = { Cuenta, Verificar };