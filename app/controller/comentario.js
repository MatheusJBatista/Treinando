var moment = require('moment');
module.exports.post = function (app,req,res) {
  if (!req.body.comentario || !req.body.noticia) {
    res.sendStatus(412);
    return;
  }
  if (!req.session.username) {
    res.sendStatus(412);
    return;
  }
  var conexao = app.config.dbConnection;
  var c = new app.app.controller.classes.Comentario();
  var cDAO = new app.app.model.ComentarioDAO();

  c._idUsuario = req.session._id;
  c._username = req.session.username;
  c._comentario = req.body.comentario;
  c._dataComentario = moment().format();
  c._idNoticia = req.body.noticia;
  c._fotoUsuario = req.session.fotoPerfil;

  cDAO._query = c.getQuery();
  cDAO._conexao = conexao;
  cDAO._operacao = "insert";
  cDAO.insert(function (err,result) {
    if (err) {
      throw err;
    }
    res.sendStatus(200);
  })
}

module.exports.get = function (app,req,res) {
    var conexao = app.config.dbConnection;
    var c = new app.app.controller.classes.Comentario();
    var cDAO = new app.app.model.ComentarioDAO();

    c._idUsuario = req.query.usuario;
    c._idNoticia = req.query.noticia;

    cDAO._query = c.getQuery();
    cDAO._conexao = conexao;
    if (c._idUsuario) {
      cDAO._operacao = "findByJogadorComentario";
      cDAO.findByJogadorComentario(function (err,result) {
        if (err) {
          throw err;
        }
        console.log(result);
        res.send(result);
      })
    }else {
      if (!c._idNoticia) {
        res.sendStatus(412);
        return;
      }
      cDAO._operacao = "findByComentarioIdNoticia";
      cDAO.findByComentarioIdNoticia(function (err,result) {
        if (err) {
          throw err;
        }
        console.log(result);
        res.send(result);
      })
    }
}
