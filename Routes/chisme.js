const express = require("express");
const Router = express.Router();

Router.get("/", function(req,res){
    res.sendFile(__dirname + "/views/chisme.html");
});


module.exports = Router;