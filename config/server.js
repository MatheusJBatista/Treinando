var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/view');

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());

consign()
  .include('app/routes')
  .then('app/controller')
  .into(app);

app.use(express.static('app/view/public'));

module.exports = app;
