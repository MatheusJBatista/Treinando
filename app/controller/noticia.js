module.exports.noticia = function(app,req,res){
  var id = req.query.artigo;
  var conexao = app.config.dbConnection;
  //Heroku config
  var uDAO = new app.model.UsuarioDAO();
  var u = new app.controller.classes.Usuario();
  // var uDAO = new app.app.model.UsuarioDAO();
  // var u = new app.app.controller.classes.Usuario();
  n._id = id;

  nDAO._operacao = "findById";
  nDAO._conexao = conexao;
  nDAO._query = n.getQuery();
  nDAO.findById(function(err,result){
    if (err) {
      return console.log(err);
    }
    if (result) {
      res.render('noticia',{
        headTitle: result.tituloNoticia.split(">")[1].split("<")[0],
        noticia:result,
        erro:"",
        pagina: "home",
        subPagina: "",
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        username:req.session.username
      })
    }
    else {
      res.render('noticia',{
        headTitle: Erro,
        noticia: "",
        erro:"Noticia não encontrada",
        pagina: "home",
        subPagina: "",
        logado:req.session.logado,
        fotoPerfil:req.session.fotoPerfil,
        username:req.session.username
      })
    }
  })
}

module.exports.inclusaoNoticia = function(app,req,res){
  res.render('inclusaoNoticia',{
    erro:"",
    sucesso:"",
    pagina: "inclusaoNoticia",
    subPagina: "",
    logado:req.session.logado,
    validarTituloResumo:""});
}

module.exports.registerNoticia = function(app,req,res){
  req.assert("noticia","Crie uma noticia").notEmpty();
  req.assert("titulo","Crie um Título").notEmpty();
  req.assert("sinopse","Crie uma sinopse").notEmpty();

  var erros = req.validationErrors();

  if (erros) {
    console.log(erros);
    res.render('inclusaoNoticia', {
      erro:erros,sucesso:"",
      pagina: "inclusaoNoticia",
      subPagina: "",
      logado:req.session.logado,
      validarTituloResumo:""});
    return;
  }
  //Heroku config
  var n = new app.controller.classes.Noticia();
  // var n = new app.app.controller.classes.Noticia();
  n._id = req.session.userId;
  n._autor = req.session.username;
  n._dataCriacao = Date().toString();
  n._titulo = "<h3 class='noticia-textos'>"+req.body.titulo+"</h3>";
  n._sinopse = "<h6 class='noticia-textos'>"+req.body.sinopse+"</h6>";
  n._noticia = req.body.noticia;

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
      pagina: "inclusaoNoticia",
      subPagina: "",
      logado:req.session.logado,
      sucesso:"",
      validarTituloResumo:validarTituloResumo});
    return;
  }
  if (validarResumo != "</h6") {
    var validarTituloResumo = [{msg:"Por favor inserir apenas sinopse"}];
    res.render('inclusaoNoticia', {
      erro:"",
      logado:req.session.logado,
      sucesso:"",
      pagina: "inclusaoNoticia",
      subPagina: "",
      validarTituloResumo:validarTituloResumo});
    return;
  }

  var connection = app.config.dbConnection;
  // Heroku config
  var nDAO = new app.model.NoticiaDAO();
  // var nDAO = new app.app.model.NoticiaDAO();

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
        sucesso: "",
        logado:req.session.logado,
        pagina: "inclusaoNoticia",
        subPagina: "",
        validarTituloResumo:""
      })
    }else {
      nDAO._operacao = "insert";
      nDAO.insert(function(err,result){
        if (err) {
          throw err;
        }
        res.render('inclusaoNoticia',{sucesso:[{
          msg: "Notícia cadastrada com sucesso"
          }],
          erro:"",
          logado:req.session.logado,
          pagina: "inclusaoNoticia",
          subPagina: "",
          validarTituloResumo:""
        });
      })
    }
  })
}
