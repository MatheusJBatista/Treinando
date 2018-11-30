var moment = require('moment');
module.exports.post = function (app,req,res) {
  req.assert('titulo','Titulo é obrigatorio').notEmpty();
  req.assert('noticiaQuest','Crie uma noticia').notEmpty();
  req.assert('titulo','Titulo deve ter no maximo 100 caracteres').len(1,100);

  var erros =req.validationErrors();
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
      autor:req.session.autor,
      result: ''
    });
    return;
  }

  var conexao = app.config.dbConnection;

  var a = new app.app.controller.classes.Autor();
  var u = new app.app.controller.classes.Usuario();
  var c = new app.app.controller.classes.Comentario();

  var aDAO = new app.app.model.AutorDAO();
  var uDAO = new app.app.model.UsuarioDAO();
  var cDAO = new app.app.model.ComentarioDAO();

  a._titulo = req.body.titulo;
  a._noticia = req.body.noticiaQuest;
  a._dataRequisicao = moment().format();
  a._idUsuario = req.session._id;
  a._usernameUsuario = req.session.username;
  a._imgUsuario = req.session.fotoPerfil;

  u._id = req.session._id;

  c._idUsuario = req.session._id;

  aDAO._query = a.getQuery();
  aDAO._conexao = conexao;

  uDAO._query = u.getQuery();
  uDAO._conexao = conexao;

  cDAO._query = c.getQuery();
  cDAO._conexao = conexao;

  function insert() {
    aDAO._operacao = 'insert';
    return new Promise(function (resolve,reject) {
      aDAO.insert(function (err,result) {
        if (err) {
          throw err;
        }
        resolve(result);
      })
    })
  }

  function updateRequisicaoById() {
    uDAO._operacao = 'updateRequisicaoById';
    return new Promise(function (resolve,reject) {
      uDAO.updateRequisicaoById(function (err,result) {
        if (err) {
          throw err;
        }
        resolve(result);
      })
    })
  }

  function getAllById() {
    uDAO._operacao = "findById";
    return new Promise(function (resolve,reject) {
      uDAO.findById(function (err,result) {
        if (err) {
          throw err
        }
        resolve(result);
      })
    })
  }

  function findByJogadorComentario() {
    cDAO._operacao = "findByComentarioIdNoticia";
    return new Promise(function (resolve,reject) {
      cDAO.findByJogadorComentario(function (err,result) {
        if (err) {
          throw err
        }
        resolve(result);
      })
    })
  }

  function renderSucess(msg,result) {
    findByJogadorComentario().then(function (comentarios) {
      res.render('perfil',{
        pagina: "perfil",
        erro: "",
        sucesso: [{
          msg:msg
        }],
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        dataNascimento:req.session.dataNascimento,
        email:req.session.email,
        nome:req.session.nome,
        id:req.session._id,
        username:req.session.username,
        autor:req.session.autor,
        result: result,
        comentarios: comentarios,
        queryPagina:1,
        numPaginas:Math.ceil(comentarios.length/4)
      });
    })
  }

  insert().then(function (result) {
    updateRequisicaoById().then(function (result) {
      getAllById().then(function (result) {
        renderSucess('Requisicao feita com sucesso',result);
      })
    })
  })

}
module.exports.validar = function (app,req,res) {
  var a = new app.app.controller.classes.Autor();
  var aDAO = new app.app.model.AutorDAO();
  var conexao = app.config.dbConnection;

  aDAO._query = a.getQuery();
  aDAO._conexao = conexao;

  function getAll() {
    aDAO._operacao = "findByDataFimNull";
    return new Promise(function (resolve,reject) {
      aDAO.findByDataFimNull(function (err,result) {
        if (err) {
          throw err
        }
        resolve(result);
      })
    })
  }

  function render(findByDataFimNull) {
    res.render('validarAutor',{
      pagina:'validarAutor',
      logado:req.session.logado,
      id: req.session._id,
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      username:req.session.username,
      findAll:findByDataFimNull
    });
  }

  getAll().then(function (findByDataFimNull) {
    render(findByDataFimNull);
    console.log(findByDataFimNull);
  })

}
module.exports.requisicao = function (app,req,res) {
  var a = new app.app.controller.classes.Autor();
  var aDAO = new app.app.model.AutorDAO();
  var conexao = app.config.dbConnection;

  a._id = req.params.id;

  aDAO._conexao = conexao;
  aDAO._query = a.getQuery();

  if (req.params.id.length != 24) {
    if (!req.params.id.length == 12) {
      console.log('vazando');
      res.redirect('/validarAutor');
      return;
    }
  }

  function findById() {
    aDAO._operacao = 'findById';
    return new Promise(function (resolve,reject) {
      aDAO.findById(function (err,result) {
        if (err) {
          throw err
        }
        resolve(result);
      })
    })
  }

  function render(findById) {
    res.render('requisicaoAutor',{
      pagina:'validarAutor',
      logado:req.session.logado,
      id: req.session._id,
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      username:req.session.username,
      findById:findById
    });
  }

  findById().then(function (findById) {
    console.log(findById);
    render(findById);
  })

}

module.exports.requisicaoPost =function (app,req,res) {
  if (!req.body.aprovado) {
    res.sendStatus(400);
    return;
  }
  var a = new app.app.controller.classes.Autor();
  var u = new app.app.controller.classes.Usuario();
  var aDAO = new app.app.model.AutorDAO();
  var uDAO = new app.app.model.UsuarioDAO();
  var conexao = app.config.dbConnection;

  a._idAdmin = req.session._id;
  a._usernameAdmin = req.session.username;
  a._id = req.params.id;
  a._dataFim = moment().format();

  u._id = req.params.usuario;
  u._requisicao = true;
  u._autor = req.body.aprovado;

  aDAO._conexao = conexao;
  aDAO._query = a.getQuery();

  uDAO._conexao = conexao;
  uDAO._query = u.getQuery();

  function updateUsuarioAutorById() {
    uDAO.operacao = 'updateUsuarioAutorById';
    return new Promise(function(resolve, reject) {
      uDAO.updateUsuarioAutorById(function (err,result) {
        if (err) {
          throw err;
        }
        resolve(result);
      })
    });
  }

  function updateUsuarioAutorById() {
    uDAO._operacao = 'updateUsuarioAutorById';
    return new Promise(function (resolve,reject) {
      uDAO.updateUsuarioAutorById(function (err,result) {
        if (err) {
          throw err;
        }
        resolve(result)
      })
    })
  }

  function updateDataFim() {
    aDAO._operacao = 'updateDataFim';
    return new Promise(function (resolve,reject) {
      aDAO.updateDataFim(function (err,result) {
        if (err) {
          throw err;
        }
        resolve(result)
      })
    })
  }

  updateUsuarioAutorById().then(function (result) {
    updateDataFim().then(function (result) {
      res.sendStatus(200);
    })
  })

}
