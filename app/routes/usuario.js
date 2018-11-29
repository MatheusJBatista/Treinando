module.exports = function(app){
  app.get('/profile/:profile',function(req,res){
    // Heroku config
    // app.controller.usuario.meuPerfil(app,req,res);
    app.app.controller.usuario.profile(app,req,res);
  })
  app.get('/profile/:profile/:pagina',function(req,res){
    // Heroku config
    // app.controller.usuario.meuPerfil(app,req,res);
    app.app.controller.usuario.pagina(app,req,res);
  })

  app.post('/profile/:profile/completarPerfil',function(req,res){
    // Heroku config
    // app.controller.usuario.completarPerfil(app,req,res);
    app.app.controller.usuario.completarPerfil(app,req,res);
  })
}
