module.exports.index = function(app, req, res){
  delete req.session.verificarEmail;
  delete req.session.entrarEmail;
  delete req.session.tipoVerificacao;
  delete req.session.vazar;
  var conexao = app.config.dbConnection;
  // Heroku config
  // var n = new app.controller.classes.Noticia();
  // var nDAO = new app.model.NoticiaDAO();
  var n = new app.app.controller.classes.Noticia();
  var nDAO = new app.app.model.NoticiaDAO();

  nDAO._operacao = "findAllSortDesc";
  nDAO._conexao = conexao;
  nDAO._query = n.getQuery();

  var queryPagina = req.query.paginacao;
  if (!queryPagina) {
    queryPagina = 1;
  }
  nDAO.findAllSortDesc(function(err,result){
    if (err) {
      throw err;
    }
    res.render('index',{
      noticias:result,
      paginas: Math.ceil(result.length / 4),
      maximoItem : 4,
      queryPagina : queryPagina,
      pagina: "home",
      subPagina: "",
      logado:req.session.logado,
      fotoPerfil:req.session.fotoPerfil,
      username:req.session.username,
      id:req.session._id
    });
  })
}
