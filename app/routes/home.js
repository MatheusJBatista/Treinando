module.exports = function(app){
  app.get('/', function(req,res){
    //Heroku Config
    //app.controller.home.index(app, req, res);
    app.app.controller.home.index(app, req, res);
  })
}
