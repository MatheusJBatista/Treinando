module.exports.login = function(app, req, res){
  res.render('login', {error:''});
}

module.exports.postLogin = function(app, req, res){
  console.log(req.body);

  req.assert('txtUsuario', 'Usuário é obrigatório').notEmpty();
  req.assert('txtSenha', 'Senha é obrigatório').notEmpty();


  var errors = req.validationErrors();

  if (errors) {
    res.render('login', {error:errors});
    return;
  }

  res.redirect('login');
}
