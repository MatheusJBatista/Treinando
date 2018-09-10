module.exports = function(app){
  app.get('/login', function(req,res){
    // Heroku Config
    // app.controller.login.login(app,req,res);
    app.app.controller.login.login(app,req,res);
  });

  app.post('/postLogin',function(req,res){
    // Heroku Config
    // app.controller.login.postLogin(app,req,res);
    app.app.controller.login.postLogin(app,req,res);
  })
}
