var mysql = require('mysql');

var express = require('express');
var app = express();


var parser = require('body-parser');
var username;
var password;
var sqlUser;
var sqlPass;

app.use(parser.json({extended:true}))
app.post('/insertBook', function(req, res){
    console.log(req.body)
    username = String(req.body.username);
    password = String(req.body.password);
    isbn = String(req.body.isbn);
    bookName = String(req.body.bookName);
    author = String(req.body.author);
    price = String(req.body.price);

if(username == "admin"){
   sqlUser = "admin";
   sqlPass = "admin";
}
else{
  console.log("Permission Denied");
}
/*else{
   sqlUser = "student";
   sqlPass = "student";
}
*/

var con = mysql.createConnection({
  host: "10.0.3.23",
  port: 3306,
  user: sqlUser,
  password:sqlPass,
  database: "book_karts"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "INSERT INTO books (ISBN_NO, TITLE, AUTHOR, PRICE) VALUES ("+isbn+",'"+bookName+"', '"+author+"', "+price+")";
  con.query(sql, function (err, result) {
    if (err) throw err;
    else console.log("1 record inserted");
  });

/* con.query("SELECT * FROM books", function(err, rows, fields)
{
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log(rows[1]);
 });*/
con.end();
});
});

app.post('/upload', function(req, res){
    console.log(req.body);
    username = String(req.body.username);
    password = String(req.body.password);
    path = String(req.body.path);
    filename = String(req.body.filename);


if(username == "admin"){
   sqlUser = "admin";
   sqlPass = "admin";
}
else{
   sqlUser = "student";
   sqlPass = "student";
}


var con = mysql.createConnection({
  host: "10.0.3.23",
  port: 3306,
  user: sqlUser,
  password:sqlPass,
  database: "book_karts"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
 // TODO : CAN YOU MAKE IT A PROPER QUERY WITH TABLE NAME AND FIELDS. AS OF NOW I HAVE DEFINED COLUMNS AS 'USERNAME' , 'PASSWORD', 'PATH', 'FILENAME'. MAY BE WE SHOULD CREATE TABLE SIMILAR TO THAT?? OR CHANGE THE FIELDS HERE.
//var sql= "insert into photo" 
/* con.query("insert into photos ("+username+','+filename+");", function(err, rows, fields)
{
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

        console.log(rows);
 });
*/
 var sql = "INSERT INTO photos VALUES ('"+username+"','"+filename+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

con.end();
});
});



app.post('/searchBook', function(req, res){
    console.log(req.body)
    username = String(req.body.username);
    password = String(req.body.password);
    bookname = String(req.body.bookName);

if(username == "admin"){
   sqlUser = "admin";
   sqlPass = "admin";
}
else{
   sqlUser = "student";
   sqlPass = "student";
}


var con = mysql.createConnection({
  host: "10.0.3.23",
  port: 3306,
  user: sqlUser,
  password:sqlPass,
  database: "book_karts"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

 con.query("SELECT * FROM books where TITLE = '"+bookname+"'", function(err, rows, fields)
{
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log(rows);
 });
con.end();
});
});

app.listen(4000);
