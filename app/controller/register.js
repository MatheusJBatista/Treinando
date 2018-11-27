const fs = require('fs');
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

  req.assert('txtUsername','E-mail é obrigatório').notEmpty();
  req.assert('txtUsername','E-mail deve conter entre 3 e 20 caracteres').len(3,20);

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

  var conexao = app.config.dbConnection;
  //Heroku config
  // var uDAO = new app.model.UsuarioDAO();
  // var u = new app.controller.classes.Usuario();
  var uDAO = new app.app.model.UsuarioDAO();
  var u = new app.app.controller.classes.Usuario();

  u._username = req.body.txtUsername;
  u._email = req.body.txtEmail;
  u._senha = req.body.txtPassword;
  u._dataRegistro = Date().toString();
  u._keyEmail = u.getKey();
  console.log(u.getQuery());
  var localEmail = u._email.split("@");

  uDAO._conexao = conexao;
  uDAO._query = u.getQuery();
  uDAO._operacao = "findByNick";
  uDAO.findByNick(function(err,result){
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.render("register",{
        error:[{
          msg: "Username já cadastrado, favor crie outro"
        }],
        dadosForm: req.body
      })
    }
    else {
      uDAO._operacao = "findByEmail";
      uDAO.findByEmail(function(err,result){
        if (err) {
          throw err;
        }
        if (result.length > 0) {
          res.render("login",{
            error:[{
              msg: "Usuário já cadastrado, favor fazer o login"
            }]
          })
        }
        else {
          uDAO._operacao = "insert";
          uDAO.insert(async function(err,result){
            if (err) {
              throw err;
            }

            if (!fs.existsSync('./app/view/public/jogadores/'+u._username+'/noticia')) {
              if (!fs.existsSync('./app/view/public/jogadores/')) {
                fs.mkdirSync('./app/view/public/jogadores/');
              }
              if (!fs.existsSync('./app/view/public/jogadores/'+u._username+'/')) {
                fs.mkdir('./app/view/public/jogadores/'+u._username+'/',function(err){
                  if (err) {
                    console.log(err);
                  }
                  fs.mkdirSync('./app/view/public/jogadores/'+u._username+'/noticia');
                });
              }
              else {
                fs.mkdirSync('./app/view/public/jogadores/'+u._username+'/noticia');
              }
            }
            req.session.idVerificacao = u._keyEmail;
            req.session.tipoVerificacao = "register";
            req.session.verificarEmail = true;
            req.session.email = u._email;
            req.session.entrarEmail = localEmail[1];
            res.redirect('/');
          })
        }
      })
    }
  })
}
