module.exports.register = function(app,req,res){
  res.render('register', {error:"",dadosForm:""});
}

module.exports.postRegister = function(app,req,res){

  console.log(req.body);

  req.assert('txtEmail','E-mail é obrigatório').notEmpty();
  req.assert('txtEmailConfirm','Confirmação de e-mail é obrigatório').notEmpty();

  req.assert('txtEmail','Digite um e-mail válido').isEmail();
  req.assert('txtEmailConfirm','Confirmação de e-mail deve ser válido').isEmail();

  req.assert('txtPassword','Senha é obrigatório').notEmpty();
  req.assert('txtPasswordConfirm','Confirmação de senha é obrigatório').notEmpty();
  req.assert('txtPassword', 'Senha deve contar entre 8 e 30 caracteres').len(8,30);
  req.assert('txtPasswordConfirm','Senha e confirmção de senha deve ser iguais').equals(req.body.txtPassword,req.body.txtPasswordConfirm);

  var erros = req.validationErrors()

  if (erros) {
    res.render('register', {error:erros, dadosForm: req.body});
    return;
  }

  res.redirect('login');
}
