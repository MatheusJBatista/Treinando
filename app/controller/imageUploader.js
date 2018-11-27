function verificarLogin(req,res){
  if (!req.session.logado) {
    res.redirect('/login');
  }
}
module.exports.imageUploader = function(app,req,res){
  verificarLogin(req,res)
  res.render('imageUploader',{
    err:"",
    resultado:""
  })
}

module.exports.fileupload = function(app,req,res){
  verificarLogin(req,res)
  var mimetype = "";
  var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var nomeArquivo = "";
  if (!req.files.imageUpload) {
    if (!req.files.uploadPerfil) {
      res.render('imageUploader',{
        err:[{msg:'Selecione uma imagem'}],
        resultado:""
      })
      return;
    }
  }
  else {
    mimetype = req.files.imageUpload.mimetype;
    for (var i = 0; i < 50; i++) {
      nomeArquivo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
  }

  if (req.files.uploadPerfil) {
    mimetype = req.files.uploadPerfil.mimetype;
    nomeArquivo = req.session.username + '-' + Date.now();
  }

  // Heroku config
  // var u = new app.controller.classes.Usuario();
  // var uDAO = new app.model.UsuarioDAO
  var connection = app.config.dbConnection;
  var u = new app.app.controller.classes.Usuario();
  var uDAO = new app.app.model.UsuarioDAO();

  switch (mimetype) {
    case "image/png":
    nomeArquivo += '.png';
      break;
    case "image/jpeg":
    nomeArquivo += '.jpeg';
      break;
    case "image/jpg":
    nomeArquivo += '.jpg';
      break;
    case "image/gif":
    nomeArquivo += '.gif';
      break;
    default: nomeArquivo = ""; break;
  }
  if (req.files.uploadPerfil) {
    return req.files.uploadPerfil.mv('./app/view/public/jogadores/'+req.session.username+'/'+nomeArquivo,function(err){
      if (err) {
        return console.log(err);
      }
      u._imgPerfil = "jogadores/"+req.session.username+'/'+nomeArquivo;
      u._id = req.session._id;
      uDAO._conexao = connection;
      uDAO._query = u.getQuery();
      uDAO._operacao = "updateImg";

      uDAO.updateImg(function(err,result){
        if (err) {
          throw err;
        }
        console.log('Mudou a foto com sucesso');
      })
    })
  }
  if (nomeArquivo) {
    req.files.imageUpload.mv('./app/view/public/jogadores/'+req.session.username+'/noticia/'+nomeArquivo,function(err){
      if (err) {
        return console.log(err);
      }
      res.render('imageUploader',{
        err:"",
        resultado:"/jogadores/"+req.session.username+"/noticia/"+nomeArquivo
      })
    })
  }
  else {
    res.render('imageUploader',{
      err:[{msg:'Faça upload apenas de imagem'}],
      resultado: ""
    })
      return;
  }
}
