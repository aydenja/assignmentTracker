var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var app = express();
var server = http.createServer(app);

var mysql = require('mysql');

var con = mysql.createConnection({
  host:'coms-319-g27.class.las.iastate.edu',
  user:'gp27',
  password:'Password@!1',
  database:'gp27',
  multipleStatements: true
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));
app.use(helmet());
app.use(limiter);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req,res){
  res.render("Login");
});

app.get('/CreateUser', function(req,res){
    res.render("CreateUser", {
                  usc: false,
                });
});

app.get('/edit', function(req,res){
    res.send("userId is set to " + req.query.uid)
});


// connection.query(sql, req.body.Email, req.body.password, req.body.Name, req.body.Name)

//use req.body to get data from forms

//need to 
app.post('/add',(req, res) => {

  var name = req.body.fname.split(' ');
  con.query("call addUser(?,?,?,?)", [req.body.username, req.body.phash[0].toString(), req.body.fname, req.body.lname], function (err, results, fields) {
    if (err) {
        console.log("err:", err);
        res.end('There was an error adding user');
    } else {
      console.log(results);
      res.render("CreateUser", {
                usc: true,
              });
    }
    res.end()

  });
});

app.post('/login',(req, res) => {
  console.log(req.body);
  con.query("call loginUser(?, ?, @output); select @output;", [req.body.Email, req.body.psw], function (err, results, fields) {
    if (err) {
        console.log("err:", err);
    } else {
      var rows = JSON.stringify(JSON.parse(JSON.stringify(results[1])));
      console.log(rows);
       if(rows.includes('Login Success')){
        con.query("select fname, UserID from users where username = ?;", [req.body.Email], function (err, results, fields){
          if (err) {
            console.log("err:", err);
          }
          else{
            var out = (Object.values(JSON.parse(JSON.stringify(results))));
            con.query("select * from assignments where UserID = ?;", out[0].UserID, function (err, data, fields){
            if (err) {
              console.log("err:", err);
            }
            else{
              res.render("Home", {
                name: out[0].fname,
                userData: data
              });
            }
            });
          }   
        });
      }
      else {
        res.end("Invalid login!");
      }  
  }
  });
});





server.listen(3000,function(){ 
    console.log("Server listening on port: 3000");
})