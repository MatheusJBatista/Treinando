module.exports.verificarEmail = function(app,req,res){
  res.render('verificarEmail',{
    verificarEmail:req.session.verificarEmail,
    entrarEmail:req.session.entrarEmail,
    tipoVerificacao:req.session.tipoVerificacao
  });
  if (req.session.verificarEmail) {
    app.app.controller.emailSend.confirmEmail(app,req,res,req.session.id)
  }
}

module.exports.validarConta = function(app,req,res){
  var key = req.query.validacao;
  var conexao = new app.config.dbConnection;
  var u = new app.app.controller.classes.Usuario();
  var uDAO = new app.app.controller.model.UsuarioDAO(conexao,key);
  res.send("a")
}
