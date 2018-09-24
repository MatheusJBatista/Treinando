module.exports.verificarEmail = function(app,req,res){
  res.render('verificarEmail',{
    verificarEmail:req.session.verificarEmail,
    entrarEmail:req.session.entrarEmail,
    tipoVerificacao:req.session.tipoVerificacao,
    pagina: "home",
    subPagina: "",
    logado:req.session.logado,
    fotoPerfil:req.session.fotoPerfil,
    username:req.session.username
  });
  if (req.session.verificarEmail) {
    app.app.controller.emailSend.confirmEmail(app,req,res,req.session.idVerificacao);
    req.session.destroy();
  }
}

module.exports.validarConta = function(app,req,res){
  var key = req.query.validacao;
  var conexao = app.config.dbConnection;
  //Heroku config
  var uDAO = new app.model.UsuarioDAO();
  var u = new app.controller.classes.Usuario();
  // var uDAO = new app.app.model.UsuarioDAO();
  // var u = new app.app.controller.classes.Usuario();

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
        res.render('validarConta',{
          validar:"Já foi verificado",
          pagina: "home",
          subPagina: "",
          logado:req.session.logado,
          fotoPerfil:req.session.fotoPerfil,
          username:req.session.username
        })
      }
      else {
        uDAO._operacao = 'validarEmail';
        uDAO.validarEmail(function(err,result){
          if (err) {
            throw err;
          }
          if (result.ok) {
            res.render('validarConta',{
              validar:'Verificado com sucesso',
              pagina: "home",
              subPagina: "",
              logado:req.session.logado,
              fotoPerfil:req.session.fotoPerfil,
              username:req.session.username
            });
          }
          else {
            res.render('validarConta',{
              validar:'Ocorreu um erro',
              pagina: "home",
              subPagina: "",
              logado:req.session.logado,
              fotoPerfil:req.session.fotoPerfil,
              username:req.session.username
            });
          }
        })
      }
    }
    else {
      res.render('validarConta',{
        validar:"Validador inválido",
        pagina: "home",
        subPagina: "",
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        username:req.session.username
      });
    }
  })
}
