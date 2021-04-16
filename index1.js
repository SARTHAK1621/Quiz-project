const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded())
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"EPORTAL"
  });
app.get("/", function(req,res){
    console.log("16429349271");
    
    res.sendFile(__dirname+"/index.html");
    // app.post("/", function(req,res){
    //     console.log("trc784t74b")
     //console.log(req.body);
    // });
    app.post("/", function(req,res){
                console.log("trc784t74b")
            
                console.log(req.body);
           });
    
   
    
});

// app.get("/register.html", function(req,res){
//     console.log("11");
//     res.sendFile(__dirname+"register.html");
//     console.log("22");
//     app.post("/register.html", function(req,res){
//         console.log("trc784t74b")
    
//         console.log(req.body);
//    });
   
// });

app.post("/submit",(req,res)=> {
    console.log("data submit")
    console.log(req.body.Name);
    res.sendFile(__dirname+"/acceptancepage.html");
    

})
app.get("/submit",(req,res)=> {
    console.log("data submission page needed");

})



app.listen(3002,function()
{
    console.log("urc4u");
});