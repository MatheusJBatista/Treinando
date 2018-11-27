module.exports = function (app) {
  app.post('/noticia/comentario',function (req,res) {
    app.app.controller.comentario.post(app,req,res);
  });

  app.get('/noticia/comentario',function (req,res) {
    app.app.controller.comentario.get(app,req,res);
  })
}
