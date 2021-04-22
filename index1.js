const express = require("express");
var id = "";
var password="";
var name="";
var emailid= "";
var age="";
var gender="";
var address="";
var branch="";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded())
app.set("view engine","ejs")
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
});
app.post("/", function(req,res){
  console.log("trc784t74b")

  id=req.body.userid;
  var password=req.body.password;
  console.log(id);
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM LOGIN WHERE ID=' "+id+" '", function (err, result, fields) {
      if (err) throw err;
      if(result==" " || result[0].PASSWORD!=password)
      {
        console.log("Wrong credentials");
      }
      else{
        console.log("Right credentials");
        con.query("SELECT * FROM INFO WHERE ID=' "+id+" '", function (err, result, fields) {
          if (err) throw err;
          name=result[0].NAME;
          emailid=result[0].EMAIL;
          age=result[0].AGE;
          gender=result[0].GENDER;
          address=result[0].ADDRESS;
          branch=result[0].BRANCH;
          res.render("welcomepage",{Name:name});
        });
      }
    });
    
  });
  


});
app.post("/submit",(req,res)=> {
    console.log("data submit")
    console.log(req.body);
    res.sendFile(__dirname+"/acceptancepage.html");
    var id=req.body.userid;
    var password=req.body.password;
    var name=req.body.Name;
    var emailid=req.body.emailid;
    var age=req.body.age;
    var gender=req.body.gender;
    var address=req.body.collegeaddress;
    var branch=req.body.Branch;

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO LOGIN (ID, Password) VALUES (' "+id+" ','"+password+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
        var sql1 = "INSERT INTO INFO (NAME,ID,EMAIL,AGE,GENDER,ADDRESS,BRANCH) VALUES (' "+name+" ',' "+id+" ','"+emailid+"',' "+age+" ',' "+gender+"' ,' "+address+" ',' "+branch+" ')";
        con.query(sql1, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });

      });
      res.sendFile(__dirname+"/acceptancepage.html");
      
    

})

app.get("/wall",(req,res)=> {
  res.render("wallpage",{Name:name,Userid:id,Email:emailid,Age:age,Gender:gender,Address:address,Branch:branch});
  
})



app.listen(3002,function()
{
    console.log("urc4u");
});