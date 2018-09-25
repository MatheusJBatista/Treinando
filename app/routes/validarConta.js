module.exports = function(app){
  app.get('/validarConta', function(req,res){
    // Heroku Config
    // app.controller.verificarEmail.validarConta(app,req,res);
    app.app.controller.verificarEmail.validarConta(app,req,res);
  });
}
