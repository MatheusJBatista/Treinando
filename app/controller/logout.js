module.exports.sair = function(app,req,res){
  req.session.destroy();
  res.redirect('/');
}
