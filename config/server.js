var express = require('express');
var consign = require('consign');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/view');

consign()
  .include('app/routes')
  .then('app/controller')
  .into(app);

app.use(express.static('app/view/public'));

module.exports = app;
