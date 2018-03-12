var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');


//var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var User = require('./model');

//app.use("/",router);

//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//app engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


mongoose.connect('mongodb://localhost:27017/UserSchema');

/*
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});*/

app.get("/",function(req,res){
  res.render('index');
});

app.post("/user",function (req, res) {
	var u = new User();
	 //console.log(req.body);
    u.email = req.body.email;
    u.name = req.body.name;
    u.password = req.body.password;
    //p.photo = req.body.photo;
    u.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.render('login');
});
   
});


app.get("/login",function (req, res) {
    res.render('login');

});

app.post("/Welcome", function(req,res){
    var e = req.body.email;
    var pas = req.body.password;
    User.findOne({email: e }, function (err, prod) {
        if (err)
            res.send("Wrong email id or Password");
        if(prod.password!=pas)
            res.send("Wrong email id or Password");
        if (prod.password==pas)
            //res.send("login");
            res.json(prod);
    });
});



app.get("/all",function (req, res) {
    User.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.send(products);
    });
});

/*
router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});


app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});
*/
app.listen(3000,function(){
  console.log("Live at Port 3000");
});
