var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/view');

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(expressSession({
  saveUninitialized:true,
  secret: "tem segredo nao kkk",
  resave: false
}))

consign()
  .include('/routes')
  .then('/controller')
  .then('config/dbConnection.js')
  .then('/model')
  .into(app);

app.use(express.static('/view/public'));

module.exports = app;
