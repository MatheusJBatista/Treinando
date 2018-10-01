module.exports = function(app){
  app.get('/profile/:profile',function(req,res){
    // Heroku config
    // app.controller.usuario.meuPerfil(app,req,res);
    app.app.controller.usuario.profile(app,req,res);
  })
  app.get('/profile/:profile/config',function(req,res){
    // Heroku config
    // app.controller.usuario.meuPerfil(app,req,res);
    app.app.controller.usuario.config(app,req,res);
  })

  app.post('/completarPerfil',function(req,res){
    // Heroku config
    // app.controller.usuario.completarPerfil(app,req,res);
    app.app.controller.usuario.completarPerfil(app,req,res);
  })
}
