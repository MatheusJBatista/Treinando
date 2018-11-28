function verificarLogin(req,res){
  if (!req.session.logado) {
    res.redirect('/login');
  }
}
module.exports.noticia = function(app,req,res){
  var id = req.query.artigo;
  var conexao = app.config.dbConnection;
  // Heroku config
  // var n = new app.controller.classes.Noticia();
  // var nDAO = new app.model.NoticiaDAO();
  var n = new app.app.controller.classes.Noticia();
  var nDAO = new app.app.model.NoticiaDAO();
  n._id = id;

  nDAO._operacao = "findById";
  nDAO._conexao = conexao;
  nDAO._query = n.getQuery();
  nDAO.findById(function(err,result){
    if (err) {
      return console.log(err);
    }
    if (result[0]) {
      res.render('noticia',{
        headTitle: result[0].tituloNoticia.split(">")[1].split("<")[0],
        noticia:result[0],
        erro:"",
        imageUpload: false,
        pagina: "home",
        subPagina: "",
        logado:req.session.logado,
        id:req.session._id,
        fotoPerfil:req.session.fotoPerfil,
        username:req.session.username
      })
    }
    else {
      res.render('noticia',{
        headTitle: Erro,
        noticia: "",
        imageUpload: false,
        erro:"Noticia não encontrada",
        pagina: "home",
        subPagina: "",
        id:req.session._id,
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        username:req.session.username
      })
    }
  })
}

module.exports.inclusaoNoticia = function(app,req,res){
  verificarLogin(req,res);
  if (!req.session.autor) {
    res.redirect('/');
    return;
  }
  res.render('inclusaoNoticia',{
    erro:"",
    sucesso:"",
    imageUpload: false,
    pagina: "home",
    subPagina: "",
    id: req.session._id,
    logado:req.session.logado,
    fotoPerfil:req.session.fotoPerfil,
    username:req.session.username,
    validarTituloResumo:""
  });
}

module.exports.registerNoticia = function(app,req,res){
  req.assert("capa","Coloque uma capa").notEmpty();
  req.assert("noticia","Crie uma noticia").notEmpty();
  req.assert("titulo","Crie um Título").notEmpty();
  req.assert("sinopse","Crie uma sinopse").notEmpty();
  req.assert("sinopse","sinopse deve ter no maximo 208 caracteres").len(0,208);

  var erros = req.validationErrors();

  if (erros) {
    console.log(erros);
    res.render('inclusaoNoticia', {
      erro:erros,sucesso:"",
      pagina: "home",
      subPagina: "",
      imageUpload: false,
      id: req.session._id,
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      username:req.session.username,
      validarTituloResumo:""
    });
    return;
  }
  //Heroku config
  // var n = new app.controller.classes.Noticia();
  var n = new app.app.controller.classes.Noticia();

  n._id = req.session.userId;
  n._autor = req.session.username;
  n._dataCriacao = Date().toString();
  n._titulo = "<h3 class='noticia-textos'>"+req.body.titulo+"</h3>";
  n._sinopse = "<h6 class='noticia-textos'>Sinopse: "+req.body.sinopse+"</h6>";
  n._noticia = req.body.noticia;
  n._capa = req.body.capa;
  n._idAutor = req.session._id;

  var validarTitulo = n._titulo;
  var validarResumo = n._sinopse;
  //console.log(validarResumo.split(">"));

  var preValidacaoTitulo = validarTitulo.split(">")[1];
  var preValidacaoResumo = validarResumo.split(">")[1];
  var validarTitulo = "";
  var validarResumo = "";
  for (var i = 4; i > 0; i--) {
    validarTitulo += preValidacaoTitulo.charAt(preValidacaoTitulo.length-i)
  }
  for (var i = 4; i > 0; i--) {
    validarResumo += preValidacaoResumo.charAt(preValidacaoResumo.length-i)
  }

  if (validarTitulo != "</h3") {
    var validarTituloResumo = [{msg:"Por favor inserir apenas títulos"}];
    res.render('inclusaoNoticia', {
      erro:"",
      pagina: "home",
      subPagina: "",
      imageUpload: false,
      id: req.session._id,
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      username:req.session.username,
      sucesso:"",
      validarTituloResumo:validarTituloResumo
    });
    return;
  }
  if (validarResumo != "</h6") {
    var validarTituloResumo = [{msg:"Por favor inserir apenas sinopse"}];
    res.render('inclusaoNoticia', {
      erro:"",
      logado:req.session.logado,
      sucesso:"",
      imageUpload: false,
      pagina: "home",
      subPagina: "",
      id: req.session._id,
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      username:req.session.username,
      validarTituloResumo:validarTituloResumo});
    return;
  }

  var connection = app.config.dbConnection;
  // Heroku config
  // var nDAO = new app.model.NoticiaDAO();
  var nDAO = new app.app.model.NoticiaDAO();

  nDAO._conexao = connection;
  nDAO._query = n.getQuery();
  nDAO._operacao = "findByTitulo";
  nDAO.findByTitulo(function(err,result){
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      console.log(result);
      res.render('inclusaoNoticia',{
        erro:[{
          msg: "Notícia com título já existente"
        }],
        imageUpload: false,
        sucesso: "",
        pagina: "home",
        subPagina: "",
        id: req.session._id,
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        username:req.session.username,
        validarTituloResumo:""
      })
    }else {
      nDAO._operacao = "insert";
      nDAO.insert(function(err,result){
        if (err) {
          throw err;
        }
        res.render('inclusaoNoticia',{
          imageUpload: false,
          sucesso:[{
          msg: "Notícia cadastrada com sucesso"
          }],
          erro:"",
          pagina: "home",
          subPagina: "",
          id: req.session._id,
          logado:req.session.logado,
          fotoPerfil:req.session.fotoPerfil,
          username:req.session.username,
          validarTituloResumo:""
        });
      })
    }
  })
}
