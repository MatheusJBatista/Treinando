module.exports = function(app){
  app.get('/inclusaoNoticia', function(req,res){
    app.app.controller.noticia.inclusaoNoticia(app,req,res);
  });
  app.post('/registerNoticia', function(req,res){
    app.app.controller.noticia.registerNoticia(app,req,res);
  })
  app.get('/noticia', function(req,res){
    app.app.controller.noticia.noticia(app,req,res);
  });
}
