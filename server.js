require("./Routes/monConnect");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const registroRouter = require("./Routes/registro");
const loginRouter = require("./Routes/login");
const verificarRouter = require("./Routes/verificar");
const modificarRouter = require("./Routes/modificar");
const errorRouter = require("./Routes/error");
const succRouter = require("./Routes/success");
const chismeRouter = require("./Routes/chisme");

app.use(bodyParser.urlencoded({extended:true}));
app.use("/registro",registroRouter);
app.use("/verificar", verificarRouter);
app.use("/modificar", modificarRouter);
app.use("/error", errorRouter);
app.use("/success", succRouter);
app.use("/chisme",chismeRouter);
app.use("/",loginRouter);

app.post("/", function(req, res) {  
    res.send("POST request received at root route!");
  });
  
app.listen(3000,function() {
    console.log("server is running on 3000")
});