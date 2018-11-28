const fs = require('fs');
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
        username:req.session.username,
        autor:req.session.autor
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
        username:req.session.username,
        autor:req.session.autor
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
        username:req.session.username,
        autor:req.session.autor
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
  if (req.session.vazar) {
    delete req.session.vazar
    res.redirect('meuPerfil');
    return;
  }
  req.assert('nome', 'Nome é obrigatório').notEmpty();
  req.assert('nome', 'Nome Deve ter entre 10 e 100 caracteres').len(10,100);
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
      username:req.session.username,
      autor:req.session.autor
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
  u._dataNascimento = req.body.data;
  u._id = req.session._id;

  uDAO._conexao = conexao;
  uDAO._query = u.getQuery();

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
      // Heroku Config
      // app.controller.imageUploader.fileupload(app,req,res)
      app.app.controller.imageUploader.fileupload(app,req,res)
      // if (req.session.nome) {
      //   fs.renameSync('./app/view/public/jogadores/'+req.session.nome+'/','./app/view/public/jogadores/'+result[0].nome+'/')
      // }
      // else if (!fs.existsSync('./app/view/public/jogadores/'+result[0].nome+'/')) {
      //   fs.mkdirSync('./app/view/public/jogadores/'+result[0].nome+'/');
      // }
      console.log(result);
      if (result[0].nome && result[0].username && result[0].dataNascimento) {
        req.session.logado = true;
        req.session.emailVerificado = result[0].emailVerificado;
        req.session.email = result[0].email;
        req.session.nome = result[0].nome;
        req.session.dataNascimento = result[0].dataNascimento;
        req.session.username = result[0].username;
        req.session.fotoPerfil = result[0].fotoPerfil;
        req.session._id = result[0]._id;
        //sessao apenas para nao reenviar o formulario
        req.session.vazar = true;

        res.redirect('/profile/'+req.session.username);

      }
    })
  })
}
