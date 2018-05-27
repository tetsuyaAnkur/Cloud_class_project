var express = require('express');
var app = express();
app.use(express.static('/home/ubuntu'));
app.use(express.static(__dirname+'/public'));
var querystring = require('querystring');
var http = require('http');

var parser = require('body-parser');

var count = 0

var adminName = 'admin';

var adminPassword = 'admin';

var username;

var password;

var containerIP;

var containerPort;

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});



var upload = multer({storage: storage});


app.get('/', function(req, res){

    count+=1
    console.log(count)
    res.send("<http><head><title>Login Page</title><link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"/></head><body><section class=\"container\"><div class=\"login\"><h1>Login to BooKarts </h1><form action = \"/form_data\" method = \"POST\">User name:<br><input type = \"text\" name=\"username\"><br>Password:<br><input type = \"password\" name=\"password\"><br><input type=\"submit\" value=\"Submit\"></form></div></section></http>");
});


app.use(parser.urlencoded({extended:true}))
app.post('/form_data', function(req, res){

if(req.body.username == adminName){
        if(req.body.password == adminPassword){
            username = req.body.username;
            password = req.body.password;
        }
        else{
            res.send("Wrong admin password");
            return res.redirect('/');
        }
    }

    else{
        username = req.body.username;
        password = req.body.password;
    }


    if(count%3 == 0){
        containerIP = "10.0.3.27"
        containerPort = 4000
    }


    else if(count%3 == 1){
        containerIP = "10.0.3.24"
        containerPort = 4000
    }


    else if(count%3 == 2){
        containerIP = "10.0.3.111"
        containerPort = 4000
    }

    var html = "<http><head><title>Functionality</title><link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\"/></head><body><section class=\"container\"><div class=\"login\"><h1>What do you want to do ?</h1><form method=\"post\" enctype=\"multipart/form-data\" action=\"/upload\"><input type=\"file\" name=\"file\"><input type=\"submit\" value=\"Submit\"></form><br><br>" + "<form action = \"/searchBook\" method = \"POST\">Search for a book : <input type=\"text\" name=\"bookName\"><input type=\"submit\" value=\"Submit\"></form><br><br>" + "<form action = \"/searchImage\" method = \"POST\">Search for an image : <input type=\"text\" name=\"imageName\"><input type=\"submit\" value=\"Submit\"></form><br><br>" + "<form action = \"insertBook\" method = \"POST\"> ISBN : <input type=\"text\" name=\"isbn\"><br> Book Name : <input type=\"text\" name=\"bookName\"><br>Author : <input type=\"text\" name=\"author\"><br>Price : <input type=\"text\" name=\"price\"> <input type=\"submit\" value=\"Submit\"></form><br><br><br></http>";


    res.send(html);

});


app.post('/searchBook', function(req, res){

    var bookName = String(req.body.bookName);

    var options = {
        hostname: containerIP,
        port: containerPort,
        path: '/searchBook',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };


    var req = http.request(options, function(res) {
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
        console.log('Body: ' + body);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    var data = JSON.stringify({username : String(username), password : String(password), bookName : String(bookName)});

    console.log(data);
    req.write(data);
    req.end();

});


app.post('/searchImage', function(req, res){

    var imageName = String(req.body.imageName);

    var options = {
        hostname: containerIP,
        port: containerPort,
        path: '/searchImage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

var req = http.request(options, function(res) {
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
        console.log('Body: ' + body);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    var data = JSON.stringify({username : String(username), password : String(password), imageName : String(imageName)});

    console.log(data);
    req.write(data);
    req.end();

});

app.post('/upload',upload.single('file'), function(req, res, next){

    var path = req.file.path;
    var filename = req.file.filename;


    var options = {
        hostname: containerIP,
        port: containerPort,
        path: '/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

          var req = http.request(options, function(res) {
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
        console.log('Body: ' + body);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });


    var data = JSON.stringify({username : String(username), password : String(password), path : String(path), filename : String(filename)});

   console.log(data);
    req.write(data);
    req.end();
});

app.post('/insertBook', function(req, res){

    var isbn = req.body.isbn;
    var bookName = req.body.bookName;
    var author = req.body.author;
    var price = req.body.price;

    var options = {
        hostname: containerIP,
        port: containerPort,
        path: '/insertBook',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };


    var req = http.request(options, function(res) {
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
        console.log('Body: ' + body);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    var data = JSON.stringify({username : String(username), password : String(password), isbn : String(isbn), bookName : String(bookName), author : String(author), price : String(price)});

    console.log(data);
    req.write(data);
    req.end();

});
app.listen(3000);

