module.exports = function (app) {
  app.post('/profile/serAutor',function (req,res) {
    app.app.controller.autor.post(app,req,res);
  });

  app.get('/validarAutor',function (req,res) {
    app.app.controller.autor.validar(app,req,res)
  })
  app.get('/validarAutor/teste',function (req,res) {
    app.app.controller.autor.requisicao(app,req,res)
  })
}
