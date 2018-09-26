module.exports.imageUploader = function(app,req,res){
  res.render('imageUploader',{
    err:"",
    resultado:""
  })
}
module.exports.fileupload = function(app,req,res){
  if (!req.files.imageUpload) {
    res.render('imageUploader',{
      err:[{msg:'Selecione uma imagem'}],
      resultado:""
    })
      return;
  }
  var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var nomeArquivo = "";
  for (var i = 0; i < 50; i++) {
      nomeArquivo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  switch (req.files.imageUpload.mimetype) {
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
  if (nomeArquivo) {
    req.files.imageUpload.mv('app/view/public/img/noticia/'+nomeArquivo,function(err){
      if (err) {
        return console.log(err);
      }
      res.render('imageUploader',{
        err:"",
        resultado:"http://localhost:5000/img/noticia/"+nomeArquivo
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
