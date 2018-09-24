module.exports.index = function(app, req, res){
  delete req.session.verificarEmail;
  delete req.session.entrarEmail;
  delete req.session.tipoVerificacao;
  var conexao = app.config.dbConnection;
  // Heroku config
  var n = new app.controller.classes.Noticia();
  var nDAO = new app.model.NoticiaDAO();
  // var n = new app.app.controller.classes.Noticia();
  // var nDAO = new app.app.model.NoticiaDAO();

  nDAO._operacao = "findAll";
  nDAO._conexao = conexao;
  nDAO._query = n.getQuery();

  nDAO.findAll(function(err,result){
    if (err) {
      throw err;
    }
    res.render('index',{
      noticias:result,
      pagina: "home",
      subPagina: "",
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      username:req.session.username
    });
  })
}
