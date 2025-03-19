const express = require("express");
const Router = express.Router();

Router.get("/", function(req,res){
    res.sendFile(__dirname + "/views/error.html");
});


module.exports = Router;