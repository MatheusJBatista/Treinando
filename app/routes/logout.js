module.exports = function(app){
  app.get('/logout', function(req,res){
    // Heroku Config
    // app.cotroller.logout.sair(app,req,res);
    app.app.controller.logout.sair(app,req,res);
  })
}
