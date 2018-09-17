module.exports = function(app){
  app.get('/verificarEmail',function(req,res){
    app.app.controller.verificarEmail.verificarEmail(app,req,res);
  })
}
