const fs = require('fs');
module.exports.profile = function(app,req,res){
  // Heroku config
  // var uDAO = new app.model.UsuarioDAO();
  // var u = new app.controller.classes.usuario();
  var uDAO = new app.app.model.UsuarioDAO();
  var u = new app.app.controller.classes.Usuario();
  var connection = app.config.dbConnection;
  var c = new app.app.controller.classes.Comentario();
  var cDAO = new app.app.model.ComentarioDAO();

  cDAO._conexao = connection;
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

  var queryPagina = req.query.paginacao;
  if (!queryPagina) {
    queryPagina = 1;
  }

  uDAO.findByProfile(function(err,result){
    if (err) {
      return console.log(err);
    }
    if (result.length == 1) {
      var findByProfile = result;
      c._idUsuario = result[0]._id.toString();
      cDAO._query = c.getQuery();
      cDAO._operacao = "findByJogadorComentario";

        cDAO.findByJogadorComentario(function (err,result) {
          if (err) {
            throw err;
          }
          res.render('perfil',{
            pagina: "perfil",
            erro: "",
            sucesso: "",
            result:findByProfile,
            comentarios:result,
            logado:req.session.logado,
            fotoPerfil:req.session.fotoPerfil,
            dataNascimento:req.session.dataNascimento,
            email:req.session.email,
            nome:req.session.nome,
            id:req.session._id,
            username:req.session.username,
            autor:req.session.autor,
            queryPagina:queryPagina,
            numPaginas:Math.ceil(result.length/4)
          });
        })
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

module.exports.pagina = function(app,req,res){
  // Heroku config
  // var uDAO = new app.model.UsuarioDAO();
  // var u = new app.controller.classes.usuario();
  var uDAO = new app.app.model.UsuarioDAO();
  var nDAO = new app.app.model.NoticiaDAO();
  var u = new app.app.controller.classes.Usuario();
  var n = new app.app.controller.classes.Noticia();
  var connection = app.config.dbConnection;
  var operacao = "";

  if (req.params.profile.length == 24) {
    u._id = req.params.profile;
    n._idAutor = req.params.profile;
    operacao = ["findById","findByIdAutor"];
  }else {
    u._username = req.params.profile;
    n._autor = req.params.profile;
    operacao = ["findByProfileUsername","findByUsernameAutor"];
  }

  if (!req.query.paginacao) {
    queryPagina = 1
  }
  else {
    queryPagina = req.query.paginacao;
  }
  uDAO._query = u.getQuery();
  uDAO._operacao = operacao[0];
  uDAO._conexao = connection;


  function getNoticiasByAutor() {
    nDAO._query = n.getQuery();
    nDAO._operacao = operacao[1];
    nDAO._conexao = connection;
    return new Promise(function (resolve,reject) {
      nDAO.findByProfile(function (err,result) {
        if (err) {
          throw err
        }
        resolve(result);
      })
    })
  }

  uDAO.findByProfile(function(err,result){
    if (err) {
      return console.log(err);
    }
    if (req.params.pagina == 'noticias') {
      getNoticiasByAutor().then(function (findNoticias) {
        res.render('perfil',{
          pagina: req.params.pagina,
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
          autor:req.session.autor,
          numPaginas:Math.ceil(findNoticias.length/4),
          queryPagina: queryPagina,
          findNoticias:findNoticias
        });
      })
    }
    else {
      res.render('perfil',{
        pagina: req.params.pagina,
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

  var erros = req.validationErrors();
  if (erros) {
    console.log(erros);
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
      autor:req.session.autor,
      result: ''
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
    app.app.controller.imageUploader.fileupload(app,req,res)
    uDAO._operacao = "findById";
    uDAO.findById(function(err,result){
      if (err) {
        return console.log(err);
      }
      // Heroku Config
      // app.controller.imageUploader.fileupload(app,req,res)
      // if (req.session.nome) {
      //   fs.renameSync('./app/view/public/jogadores/'+req.session.nome+'/','./app/view/public/jogadores/'+result[0].nome+'/')
      // }
      // else if (!fs.existsSync('./app/view/public/jogadores/'+result[0].nome+'/')) {
      //   fs.mkdirSync('./app/view/public/jogadores/'+result[0].nome+'/');
      // }
      if (result[0].nome && result[0].username && result[0].dataNascimento) {
        req.session.logado = true;
        req.session.emailVerificado = result[0].emailVerificado;
        req.session.email = result[0].email;
        req.session.nome = result[0].nome;
        req.session.dataNascimento = result[0].dataNascimento;
        req.session.username = result[0].username;
        req.session.fotoPerfil = result[0].imgPerfil;
        req.session._id = result[0]._id;
        //sessao apenas para nao reenviar o formulario
        req.session.vazar = true;

        res.redirect('/profile/'+req.session.username);

      }
    })
  })
}

module.exports.config = function (app,req,res) {
  var u = new app.app.controller.classes.Usuario();
  var uDAO = new app.app.model.UsuarioDAO();
  var conexao = app.config.dbConnection;

  u._senha = req.body.senhaAntiga;
  u._email = req.body.emailAntigo;
  u._id = req.session._id;

  uDAO._conexao = conexao;
  uDAO._query = u.getQuery();

  console.log(req.body);

  if (req.body.senhaAntiga || req.body.senhaNova) {
    req.assert('senhaAntiga','Senha antiga é um campo obrigatorio').notEmpty();
    req.assert('senhaNova','Senha nova é um campo obrigatorio').notEmpty();
    req.assert('senhaNova','Senha deve ter ao minimo 8 caracteres').len(8,50);
    findByProfile().then(function (profileUsuario) {
      validarErros(req.validationErrors(),profileUsuario).then(function (validado) {
        updateNovaSenha(req.body.senhaNova).then(function (result) {
          if (result.lastErrorObject.n) {
            renderSucess(profileUsuario,"Senha alterada com sucesso");
          }else {
            renderErro(profileUsuario,"Senha não coincide");
          }
        })
      })
    })
  }
  if (req.body.emailAntigo || req.body.emailNovo) {
    req.assert('emailAntigo','Email antigo é um campo obrigatorio').notEmpty();
    req.assert('emailNovo','Email novo é um campo obrigatorio').notEmpty();
    findByProfile().then(function (profileUsuario) {
      validarErros(req.validationErrors(),profileUsuario).then(function (validado) {
        findByEmail().then(function (result) {
          console.log('chegou aqui');
          console.log(result);
          if (!result) {
            updateNovoEmail(req.body.emailNovo).then(function (result) {
              if (result.lastErrorObject.n) {
                session.destroy();
                res.redirect('/login');
              }else {
                renderErro(profileUsuario,"Ocorreu um erro");
              }
            })
          }else {
            renderErro(profileUsuario,"Email já está sendo utilizado");
          }
        })
      })
    })
  }

  function validarErros(erros,result) {
    return new Promise(function(resolve, reject) {
      if (erros) {
        res.render('perfil',{
          pagina: "config",
          erro: erros,
          sucesso: "",
          logado:req.session.logado,
          fotoPerfil:req.session.fotoPerfil,
          dataNascimento:req.session.dataNascimento,
          email:req.session.email,
          nome:req.session.nome,
          id:req.session._id,
          username:req.session.username,
          autor:req.session.autor,
          result: result
        });
        return
      }
      resolve(true)
    });
  }

  function renderSucess(result,msg) {
    console.log("sucesso");
    res.render('perfil',{
      pagina: "config",
      erro: '',
      sucesso: [{msg:msg}],
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      dataNascimento:req.session.dataNascimento,
      email:req.session.email,
      nome:req.session.nome,
      id:req.session._id,
      username:req.session.username,
      autor:req.session.autor,
      result: result
    });
    return;
  }
  function renderErro(result,msg) {
    console.log('erro');
    res.render('perfil',{
      pagina: "config",
      erro: [{msg:msg}],
      sucesso: '',
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      dataNascimento:req.session.dataNascimento,
      email:req.session.email,
      nome:req.session.nome,
      id:req.session._id,
      username:req.session.username,
      autor:req.session.autor,
      result: result
    });
    return;
  }

  var erros = req.validationErrors();

  function updateNovaSenha(senhaNova) {
    uDAO._operacao = 'updateNovaSenha';
    return new Promise(function (resolve,reject) {
      uDAO.updateNovaSenha(senhaNova,function (err,result) {
        if (err) {
          throw err
        }
        resolve(result);
      })
    })
  }

  function updateNovoEmail(emailNovo) {
    uDAO._operacao = 'updateNovoEmail';
    return new Promise(function (resolve,reject) {
      uDAO.updateNovoEmail(emailNovo,function (err,result) {
        if (err) {
          throw err;
        }
      })
    })
  }

  function findByEmail(emailNovo){
    uDAO._operacao = "findByEmail";
    return new Promise(function (resolve,reject) {
      uDAO.findByEmail(emailNovo,function (err,result) {
        if (err) {
          throw err;
        }
        resolve(result);
      })
    })
  }

  function findByProfile() {
    uDAO._operacao = "findById";
    return new Promise(function (resolve,reject) {
      uDAO.findByProfile(function (err,result) {
        if (err) {
          throw err
        }
        resolve(result);
      })
    })
  }
}
