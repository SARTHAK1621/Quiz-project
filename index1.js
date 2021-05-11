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
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
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
  
    con.query("SELECT * FROM LOGIN WHERE ID=' "+id+" '", function (err, result, fields) {
      if (err) throw err;
      if(result==" " || result[0].PASSWORD!=password)
      {
        console.log("Wrong credentials");
        res.sendFile(__dirname+"/invalidloginpage.html"); 

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
      res.sendFile(__dirname+"/acceptancepage.html");
      
    

})

app.get("/wall",(req,res)=> {
  res.render("wallpage",{Name:name,Userid:id,Email:emailid,Age:age,Gender:gender,Address:address,Branch:branch});
  
})
app.get("/exam",(req,res)=> {
  res.render("exam");
  
})
app.get("/dsa",(req,res)=> {
  
    con.query("SELECT * FROM DSA", function (err, result, fields) 
    {
      if (err) throw err;
      var qsn1=result[0].QUESTION;
      var qsn2=result[1].QUESTION;
      var qsn3=result[2].QUESTION;
      var qsn4=result[3].QUESTION;
      var qsn5=result[4].QUESTION;
      res.render("dsa",{qs1:qsn1,qs2:qsn2,qs3:qsn3,qs4:qsn4,qs5:qsn5});
    });
  
})
app.get("/dbms",(req,res)=> {
  con.query("SELECT * FROM DBMS", function (err, result, fields) {
    if (err) throw err;
    var qsn1=result[0].QUESTION;
    var qsn2=result[1].QUESTION;
    var qsn3=result[2].QUESTION;
    var qsn4=result[3].QUESTION;
    var qsn5=result[4].QUESTION;
    res.render("dbms",{qs1:qsn1,qs2:qsn2,qs3:qsn3,qs4:qsn4,qs5:qsn5});
  }); 
  
  
})
app.get("/os",(req,res)=> {
  con.query("SELECT * FROM OS", function (err, result, fields) {
    if (err) throw err;
    var qsn1=result[0].QUESTION;
    var qsn2=result[1].QUESTION;
    var qsn3=result[2].QUESTION;
    var qsn4=result[3].QUESTION;
    var qsn5=result[4].QUESTION;
    res.render("os",{qs1:qsn1,qs2:qsn2,qs3:qsn3,qs4:qsn4,qs5:qsn5});
  });
  
  
})
app.get("/cn",(req,res)=> {
  con.query("SELECT * FROM CN", function (err, result, fields) {
    if (err) throw err;
    var qsn1=result[0].QUESTION;
    var qsn2=result[1].QUESTION;
    var qsn3=result[2].QUESTION;
    var qsn4=result[3].QUESTION;
    var qsn5=result[4].QUESTION;
    res.render("cn",{qs1:qsn1,qs2:qsn2,qs3:qsn3,qs4:qsn4,qs5:qsn5});
  });
  

  
})
app.post("/cnanswer",(req,res)=> {
  console.log(req.body);
  var mark=0;
  con.query("SELECT * FROM CN", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if(result[0].ANSWER == req.body.qs1)
    {
      mark+=1;
    }
    if(result[1].ANSWER == req.body.qs2)
    {
      mark+=1;
    }
    if(result[2].ANSWER == req.body.qs3)
    {
      mark+=1;
    }
    if(result[3].ANSWER == req.body.qs4)
    {
      mark+=1;
    }
    if(result[4].ANSWER == req.body.qs5)
    {
      mark+=1;
    }
    console.log(mark);
    res.render("result",{Mark:mark,Subject:"ComputerNetwork"});
  });
  


})
app.post("/dsaanswer",(req,res)=> {
  console.log(req.body);
  var mark=0;
  con.query("SELECT * FROM DSA ", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if(result[0].ANSWER == req.body.qs1)
    {
      mark+=1;
    }
    if(result[1].ANSWER == req.body.qs2)
    {
      mark+=1;
    }
    if(result[2].ANSWER == req.body.qs3)
    {
      mark+=1;
    }
    if(result[3].ANSWER == req.body.qs4)
    {
      mark+=1;
    }
    if(result[4].ANSWER == req.body.qs5)
    {
      mark+=1;
    }
    console.log(mark);
    res.render("result",{Mark:mark,Subject:"DSA"});
  });

})
app.post("/dbmsanswer",(req,res)=> {
  console.log(req.body);
  var mark=0;
  con.query("SELECT * FROM DBMS ", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if(result[0].ANSWER == req.body.qs1)
    {
      mark+=1;
    }
    if(result[1].ANSWER == req.body.qs2)
    {
      mark+=1;
    }
    if(result[2].ANSWER == req.body.qs3)
    {
      mark+=1;
    }
    if(result[3].ANSWER == req.body.qs4)
    {
      mark+=1;
    }
    if(result[4].ANSWER == req.body.qs5)
    {
      mark+=1;
    }
    console.log(mark);
    res.render("result",{Mark:mark,Subject:"DBMS"});
  });

})
app.post("/openforum",(req,res)=>{
  console.log(req.body);
  var sql = "INSERT INTO OPENFORUM (TYPE,QUERY) VALUES (' "+req.body.type+" ','"+req.body.query+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.render("welcomepage",{Name:name});
});
app.post("/osanswer",(req,res)=> {
  console.log(req.body);
  var mark=0;
  con.query("SELECT * FROM OS ", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if(result[0].ANSWER == req.body.qs1)
    {
      mark+=1;
    }
    if(result[1].ANSWER == req.body.qs2)
    {
      mark+=1;
    }
    if(result[2].ANSWER == req.body.qs3)
    {
      mark+=1;
    }
    if(result[3].ANSWER == req.body.qs4)
    {
      mark+=1;
    }
    if(result[4].ANSWER == req.body.qs5)
    {
      mark+=1;
    }
    console.log(mark);
    res.render("result",{Mark:mark,Subject:"OS"});
  });

});
app.listen(3002,function()
{
    console.log("urc4u");
});