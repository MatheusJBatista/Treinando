module.exports = function(app){
  app.get('/login', function(req,res){
    app.app.controller.login.login(app,req,res);
  })
}
