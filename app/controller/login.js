module.exports.login = function(app, req, res){
  if (req.session.logado) {
    res.redirect('/');
    return
  }
  res.render('login', {error:''});
}

module.exports.postLogin = function(app, req, res){
  if (req.session.emailVerificado) {
    res.redirect('/');
    return
  }
  var post = req.body;

  req.assert('txtUsuario', 'Usuário é obrigatório').notEmpty();
  req.assert('txtSenha', 'Senha é obrigatório').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.render('login', {error:errors});
    return;
  }

  var conexao = app.config.dbConnection;
  var uDAO = new app.app.model.UsuarioDAO();
  var u = new app.app.controller.classes.Usuario();

  u._email = post.txtUsuario;
  u._senha = post.txtSenha;

  uDAO._conexao = conexao;
  uDAO._query = u.getQuery();
  uDAO._operacao = "findByLogin";

  uDAO.findByLogin(function(err,result){
    if (err) {
      throw err;
    }
    if (!result.length > 0) {
      res.render("login",{
        error:[{
          msg: "Usuário/Senha incorreto"
        }]
      })
    }
    else if (result[0].emailVerificado) {
      req.session.logado = true;
      req.session.emailVerificado = result[0].emailVerificado;
      req.session.email = result[0].email;
      req.session.username = result[0].username;
      req.session.fotoPerfil = result[0].fotoPerfil;
      req.session._id = result[0]._id;
      res.redirect('/');
    }
    else {
      var localEmail = result[0].email.split("@");
      req.session.idVerificacao = result[0].keyEmail;
      req.session.email = result[0].email;
      req.session.tipoVerificacao = "login";
      req.session.verificarEmail = true;
      req.session.entrarEmail = localEmail[1];
      res.redirect('verificarEmail');
    }
  })
}
