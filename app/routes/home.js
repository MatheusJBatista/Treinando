module.exports = function(app){
  app.get('/', function(req,res){
    app.controller.home.index(app, req, res);
  })
}
