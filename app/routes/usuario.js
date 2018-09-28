module.exports = function(app){
  app.get('/meuPerfil',function(req,res){
    // Heroku config
    // app.controller.usuario.meuPerfil(app,req,res);
    app.app.controller.usuario.meuPerfil(app,req,res);
  })

  app.post('/completarPerfil',function(req,res){
    // Heroku config
    // app.controller.usuario.completarPerfil(app,req,res);
    app.app.controller.usuario.completarPerfil(app,req,res);
  })
}
