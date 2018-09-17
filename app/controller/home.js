module.exports.index = function(app, req, res){
  delete req.session.verificarEmail;
  delete req.session.entrarEmail;
  delete req.session.tipoVerificacao;
  var conexao = app.config.dbConnection;
  var n = new app.app.controller.classes.Noticia();
  var nDAO = new app.app.model.NoticiaDAO();

  nDAO._operacao = "findAll";
  nDAO._conexao = conexao;
  nDAO._query = n.getQuery();

  nDAO.findAll(function(err,result){
    if (err) {
      throw err;
    }
    var titulo = result[0].tituloNoticia;
    titulo = titulo.split(">")[3];
    titulo = titulo.split("</strong")[0];
    console.log(titulo);
    res.render('index',{noticias:result});
  })
}
