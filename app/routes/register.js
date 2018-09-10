module.exports = function(app){
  app.get('/register', function(req,res){
    // Heroku Config
    // app.controller.register.register(app, req,res)
    app.app.controller.register.register(app, req,res)
  });

  app.post('/postRegister', function(req,res){
    // Heroku Config
    // app.controller.register.postRegister(app,req,res);
    app.app.controller.register.postRegister(app,req,res);
  });
}
