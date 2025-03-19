const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/control_de_acceso', { useNewUrlParser: true, useUnifiedTopology: true }); 

const db = mongoose.connection; 

db.on("open", _ =>{
    console.log("Conexion exitosa ^w^");
});

db.on("error", err =>{
    console.log(err);
});