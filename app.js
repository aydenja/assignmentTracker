var sqlite3 = require('sqlite3').verbose();
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

// const dbPath = path.resolve(__dirname, '../assignment tracker/gp27.sql')
// var db = new sqlite3.Database(dbPath);


// var db = new sqlite3.Database('../assignment tracker/gp27.sql');
// var db = new sqlite3.Database( path.resolve('../assignment tracker/gp27.sql', 'db.sqlite') );


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join('/Users/akashsetti/Documents/COM S319 Project/assignment-tracker/gp27.sql','./public')));
app.use(helmet());
app.use(limiter);


app.post('/add', function(req,res){
    (()=>{
        con.adduser(Name, Email, psw, confPsw, function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New employee has been added");
        res.send("New employee has been added into the database with ID = "+req.body.id+ " and Name = "+req.body.name);
      });
  });
  });


//   con.run('CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)');
  app.get('/', function(req,res){
    res.sendFile(path.join('','/Users/akashsetti/Documents/COM S319 Project/assignment-tracker/CreateUser.html'));
  });


  app.get('/', function(req,res){
    res.sendFile(path.join('','/Users/akashsetti/Documents/COM S319 Project/assignment-tracker/StyleSheets/CreateUser.css'));

  });

  app.get('/close', function(req,res){
    con.close((err) => {
      if (err) {
        res.send('There is some error in closing the database');
        return console.error(err.message);
      }
      console.log('Closing the database connection.');
      res.send('Database connection successfully closed');
    });
  });

server.listen(3306,function(){ 
    console.log("Server listening on port: 3306");
})
