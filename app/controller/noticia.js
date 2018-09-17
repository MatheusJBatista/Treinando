module.exports.noticia = function(app,req,res){
  var string = req.query;
  var conexao = app.config.dbConnection;
  var n = app.app.controller.classes.Noticia();
}

module.exports.inclusaoNoticia = function(app,req,res){
  res.render('inclusaoNoticia',{erro:"",sucesso:"",validarTituloResumo:""});
}

module.exports.registerNoticia = function(app,req,res){
  req.assert("noticia","Crie uma noticia").notEmpty();
  req.assert("titulo","Crie um Título").notEmpty();
  req.assert("sinopse","Crie uma sinopse").notEmpty();

  var erros = req.validationErrors();
  console.log(req.body);

  if (erros) {
    console.log(erros);
    res.render('inclusaoNoticia', {erro:erros,sucesso:"",validarTituloResumo:""});
    return;
  }
  var n = new app.app.controller.classes.Noticia();
  n._id = req.session.userId;
  n._autor = req.session.username;
  n._dataCriacao = Date().toString();
  n._titulo = "<h1 style='text-align: center;'><span style='font-family: Verdana,Geneva,sans-serif;'><strong>"+req.body.titulo+"</strong></span></h1>";
  n._sinopse = "<h6>"+req.body.sinopse+"</h6>";
  n._noticia = req.body.noticia;

  var validarTitulo = n._titulo;
  var validarResumo = n._sinopse;
  console.log(validarResumo.split(">"));

  var preValidacaoTitulo = validarTitulo.split(">")[3];
  var preValidacaoResumo = validarResumo.split(">")[1];
  var validarTitulo = "";
  var validarResumo = "";
  for (var i = 8; i > 0; i--) {
    validarTitulo += preValidacaoTitulo.charAt(preValidacaoTitulo.length-i)
  }
  for (var i = 4; i > 0; i--) {
    validarResumo += preValidacaoResumo.charAt(preValidacaoResumo.length-i)
  }
  console.log(validarTitulo);
  console.log(validarResumo);

  if (validarTitulo != "</strong") {
    var validarTituloResumo = [{msg:"Por favor inserir apenas títulos"}];
    res.render('inclusaoNoticia', {erro:"",sucesso:"",validarTituloResumo:validarTituloResumo});
    return;
  }
  if (validarResumo != "</h6") {
    var validarTituloResumo = [{msg:"Por favor inserir apenas sinopse"}];
    res.render('inclusaoNoticia', {erro:"",sucesso:"",validarTituloResumo:validarTituloResumo});
    return;
  }

  var connection = app.config.dbConnection;
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
        }], sucesso: "",validarTituloResumo:""
      })
    }else {
      nDAO._operacao = "insert";
      nDAO.insert(function(err,result){
        if (err) {
          throw err;
        }
        res.render('inclusaoNoticia',{sucesso:[{
          msg: "Notícia cadastrada com sucesso"
          }], erro:"",validarTituloResumo:""
        });
      })
    }
  })
}
