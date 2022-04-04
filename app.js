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
  database:'gp27'
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
app.set('view engine', 'html');

app.get('/', function(req,res){
  res.render("CreateUser")
});


// connection.query(sql, req.body.Email, req.body.password, req.body.Name, req.body.Name)

//use req.body to get data from forms
app.post('/add',(req, res) => {
  con.query("call addUser(?,?,?,?)", [req.body.username, req.body.phash[0], req.body.fname, ""], function (err) {
    if (err) {
        console.log("err:", err);
    } else {
        console.log("results:", req.body);
    }

});


  });
app.post('/login',(req, res) => {
  console.log(req.body);
  res.render('Home');
  });




server.listen(3000,function(){ 
    console.log("Server listening on port: 3000");
})
