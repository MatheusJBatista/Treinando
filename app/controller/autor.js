module.exports.post = function (app,req,res) {
  console.log(req.body);
}
module.exports.validar = function (app,req,res) {
  res.render('validarAutor',{
    pagina:'validarAutor',
    logado:req.session.logado,
    id: req.session._id,
    logado:req.session.logado,
    fotoPerfil:req.session.fotoPerfil,
    username:req.session.username,
  });
}
module.exports.requisicao = function (app,req,res) {
  res.render('requisicaoAutor',{
    pagina:'validarAutor',
    logado:req.session.logado,
    id: req.session._id,
    logado:req.session.logado,
    fotoPerfil:req.session.fotoPerfil,
    username:req.session.username,
  });
}
