module.exports.verificarEmail = function(app,req,res){
  res.render('verificarEmail',{
    verificarEmail:req.session.verificarEmail,
    entrarEmail:req.session.entrarEmail,
    tipoVerificacao:req.session.tipoVerificacao
  });
  if (req.session.verificarEmail) {
    app.app.controller.emailSend.confirmEmail(app,req,res,req.session.idVerificacao);
    req.session.destroy();
  }
}

module.exports.validarConta = function(app,req,res){
  var key = req.query.validacao;
  var conexao = app.config.dbConnection;
  var u = new app.app.controller.classes.Usuario();

  var uDAO = new app.app.model.UsuarioDAO();

  u._keyEmail = key;

  uDAO._query = u.getQuery();
  uDAO._conexao = conexao;
  uDAO._operacao = 'findByKey';
  uDAO.findByKey(function(err,result){
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      if (result[0].emailVerificado) {
        res.render('validarConta',{validar:"Já foi verificado"})
      }
      else {
        uDAO._operacao = 'validarEmail';
        uDAO.validarEmail(function(err,result){
          if (err) {
            throw err;
          }
          if (result.ok) {
            res.render('validarConta',{validar:'Verificado com sucesso'});
          }
          else {
            res.render('validarConta',{validar:'Ocorreu um erro'});
          }
        })
      }
    }
    else {
      res.render('validarConta',{validar:"Validador inválido"});
    }
  })
}
