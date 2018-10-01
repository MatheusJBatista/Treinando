module.exports.profile = function(app,req,res){
  // Heroku config
  // var uDAO = new app.model.UsuarioDAO();
  // var u = new app.controller.classes.usuario();
  var uDAO = new app.app.model.UsuarioDAO();
  var u = new app.app.controller.classes.Usuario();
  var connection = app.config.dbConnection;
  var operacao = "";

  if (req.params.profile.length == 24) {
    u._id = req.params.profile
    operacao = "findById";
  }else {
    u._username = req.params.profile;
    operacao = "findByProfileUsername";
  }
  uDAO._query = u.getQuery();
  uDAO._operacao = operacao;
  uDAO._conexao = connection;

  uDAO.findByProfile(function(err,result){
    if (err) {
      return console.log(err);
    }
    console.log(result);
    if (result.length == 1) {
      res.render('perfil',{
        pagina: "perfil",
        erro: "",
        sucesso: "",
        result:result,
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        dataNascimento:req.session.dataNascimento,
        email:req.session.email,
        nome:req.session.nome,
        id:req.session._id,
        username:req.session.username
      });
    }else {
      res.render('profileError',{
        pagina: "perfil",
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        dataNascimento:req.session.dataNascimento,
        email:req.session.email,
        nome:req.session.nome,
        id:req.session._id,
        username:req.session.username
      });
    }
  })
}

module.exports.config = function(app,req,res){
  // Heroku config
  // var uDAO = new app.model.UsuarioDAO();
  // var u = new app.controller.classes.usuario();
  var uDAO = new app.app.model.UsuarioDAO();
  var u = new app.app.controller.classes.Usuario();
  var connection = app.config.dbConnection;
  var operacao = "";

  if (req.params.profile.length == 24) {
    u._id = req.params.profile
    operacao = "findById";
  }else {
    u._username = req.params.profile;
    operacao = "findByProfileUsername";
  }
  uDAO._query = u.getQuery();
  uDAO._operacao = operacao;
  uDAO._conexao = connection;

  uDAO.findByProfile(function(err,result){
    if (err) {
      return console.log(err);
    }
    console.log(result);
    if (result[0]._id == req.session._id) {
      res.render('perfil',{
        pagina: "perfilConfig",
        erro: "",
        sucesso: "",
        result:result,
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        dataNascimento:req.session.dataNascimento,
        email:req.session.email,
        nome:req.session.nome,
        id:req.session._id,
        username:req.session.username
      });
    }
    else {
      res.redirect('/profile/'+req.params.profile);
    }
  })
}

module.exports.completarPerfil = function(app,req,res){
  if (!req.session.logado) {
    res.redirect('/');
    return;
  }
  if (req.session.username) {
    res.redirect('/');
    return;
  }
  if (req.session.vazar) {
    delete req.session.vazar
    res.redirect('meuPerfil');
    return;
  }
  req.assert('nome', 'Nome é obrigatório').notEmpty();
  req.assert('nome', 'Nome Deve ter entre 10 e 100 caracteres').len(10,100);
  req.assert('username', 'Username é obrigatório').notEmpty();
  req.assert('username', 'Username Deve ter entre 4 e 15 caracteres').len(4,15);
  req.assert('data', 'Data é obrigatório').notEmpty();
  req.assert('data', 'Data invalida').isISO8601();

  console.log(req.body);

  var erros = req.validationErrors();
  if (erros) {
    res.render('perfil',{
      pagina: "perfil",
      erro: erros,
      sucesso: "",
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      dataNascimento:req.session.dataNascimento,
      email:req.session.email,
      nome:req.session.nome,
      id:req.session._id,
      username:req.session.username
    });
    return;
  }
  var conexao = app.config.dbConnection;

  // Heroku config
  // var u = new app.controller.classes.Usuario();
  // var uDAO = new app.model.UsuarioDAO();
  var u = new app.app.controller.classes.Usuario();
  var uDAO = new app.app.model.UsuarioDAO();

  u._nomeCompleto = req.body.nome;
  u._username = req.body.username;
  u._dataNascimento = req.body.data;
  u._id = req.session._id;

  uDAO._operacao = "findByNick";
  uDAO._conexao = conexao;
  uDAO._query = u.getQuery();

  uDAO.findByNick(function(err,result){
    if (err) {
      return console.log(err);
    }
    if (result.length > 0) {
      res.render('perfil',{
        pagina: "perfil",
        erro: [{
          msg:"username já existe, favor criar outro"
        }],
        sucesso: "",
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        dataNascimento:req.session.dataNascimento,
        email:req.session.email,
        nome:req.session.nome,
        id:req.session._id,
        username:req.session.username
      });
      return
    }else {
      uDAO._operacao = "findAndUpdateCadastro";
      uDAO.findAndUpdateCadastro(function(err,result){
        if (err) {
          return console.log(err);
        }
        uDAO._operacao = "findById";
        uDAO.findById(function(err,result){
          if (err) {
            return console.log(err);
          }
          if (result.nome && result.username && result.dataNascimento) {
            req.session.logado = true;
            req.session.emailVerificado = result.emailVerificado;
            req.session.email = result.email;
            req.session.nome = result.nome;
            req.session.dataNascimento = result.dataNascimento;
            req.session.username = result.username;
            req.session.fotoPerfil = result.fotoPerfil;
            req.session._id = result._id;
            //sessao apenas para nao reenviar o formulario
            req.session.vazar = true;

            res.render('perfil',{
              pagina: "perfil",
              erro: "",
              sucesso: [{
                msg:'Atualizado com sucesso'
              }],
              logado:req.session.logado,
              fotoPerfil:req.session.fotoPerfil,
              dataNascimento:req.session.dataNascimento,
              email:req.session.email,
              nome:req.session.nome,
              id:req.session._id,
              username:req.session.username
            });

          }
        })
      })
    }
  })

}
