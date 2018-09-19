module.exports.register = function(app,req,res){
  if (req.session.logado) {
    res.redirect('/');
    return
  }
  res.render('register', {error:"",dadosForm:""});
}

module.exports.postRegister = function(app,req,res){
  if (req.session.emailVerificado) {
    res.redirect('/');
    return
  }

  req.assert('txtEmail','E-mail é obrigatório').notEmpty();
  req.assert('txtEmailConfirm','Confirmação de e-mail é obrigatório').notEmpty();

  req.assert('txtEmail','E-mail deve conter entre 11 e 150 caracteres').len(11,150);
  req.assert('txtEmailConfirm','Confirmação deve conter entre 11 e 150 caracteres').len(11,150);

  req.assert('txtEmail','Digite um e-mail válido').isEmail();
  req.assert('txtEmailConfirm','Confirmação de e-mail deve ser válido').isEmail();
  req.assert('txtEmailConfirm','Email e confirmção de email deve ser iguais').equals(req.body.txtEmail,req.body.txtEmailConfirm);

  req.assert('txtPassword','Senha é obrigatório').notEmpty();
  req.assert('txtPasswordConfirm','Confirmação de senha é obrigatório').notEmpty();
  req.assert('txtPassword', 'Senha deve contar entre 8 e 30 caracteres').len(8,30);
  req.assert('txtPasswordConfirm','Senha e confirmção de senha deve ser iguais').equals(req.body.txtPassword,req.body.txtPasswordConfirm);

  var erros = req.validationErrors()

  if (erros) {
    console.log(erros);
    res.render('register', {error:erros, dadosForm: req.body});
    return;
  }

  var u = new app.app.controller.classes.Usuario();
  var conexao = app.config.dbConnection;
  var uDAO = new app.app.model.UsuarioDAO();
  u._email = req.body.txtEmail;
  u._senha = req.body.txtPassword;
  u._dataRegistro = Date().toString();
  u._keyEmail = u.getKey();
  console.log(u.getQuery());
  var localEmail = u._email.split("@");

  uDAO._conexao = conexao;
  uDAO._query = u.getQuery();
  uDAO._operacao = "findByEmail";
  uDAO.findByEmail(function(err,result){
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.render("login",{
        error:[{
          msg: "Usuário já cadastrado, por favor fazer o login"
        }]
      })
    }
    else {
      uDAO._operacao = "insert";
      uDAO.insert(function(err,result){
        if (err) {
          throw err;
        }
        req.session.idVerificacao = u._keyEmail;
        req.session.tipoVerificacao = "register";
        req.session.verificarEmail = true;
        req.session.email = u._email;
        req.session.entrarEmail = localEmail[1];
        res.redirect('verificarEmail');
      })
    }
  })
}
